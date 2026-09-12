import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

// Increase JSON limit to handle base64 compressed camera frames
app.use(express.json({ limit: '10mb' }));

// Lazy initialization of GoogleGenAI
let aiClient: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is missing.');
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'face-to-wild' });
});

// Config status check (informs client whether an API key is present)
app.get('/api/config', (_req: Request, res: Response) => {
  res.json({
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
  });
});

// Primary Face Matching Endpoint
app.post('/api/match', async (req: Request, res: Response): Promise<void> => {
  try {
    const { image } = req.body;

    if (!image || typeof image !== 'string') {
      res.status(400).json({
        success: false,
        error: 'INVALID_IMAGE',
        message: 'No image frame provided for analysis.',
      });
      return;
    }

    if (!process.env.GEMINI_API_KEY) {
      res.status(500).json({
        success: false,
        error: 'MISSING_API_KEY',
        message:
          'GEMINI_API_KEY is not configured. Please add your Gemini API key to .env or the Settings > Secrets panel.',
      });
      return;
    }

    // Extract base64 payload and mimeType
    let base64Data = image;
    let mimeType = 'image/jpeg';

    const match = image.match(/^data:([^;]+);base64,(.+)$/);
    if (match) {
      mimeType = match[1];
      base64Data = match[2];
    }

    const ai = getGemini();

    const promptText = `You are the Face to Wild AI matching assistant.
Analyze this captured camera image.
First, check if there is a clear human face in the frame:
- If NO clear face is visible, return: {"hasClearFace": false, "rejectionReason": "no_face"} (or "multiple_faces" / "blurry").
- If a clear face IS visible:
  Playfully match their broad visible facial contours, smile, or eye expression to an animal, bird, or insect (e.g. Fox, Lion, Panda, Tiger, Owl, Eagle, Butterfly, Rabbit, Monkey, Frog, Koala, Deer, Wolf, Cat, Dog, Parrot, Peacock, Turtle, Bee, Lizard, Cheetah, Otter).
  PRIVACY MANDATE: Do NOT identify the person. Never classify race, ethnicity, nationality, gender, age, health, or sensitive traits.
  Return valid JSON format:
  {
    "hasClearFace": true,
    "match": "Fox",
    "category": "Animal",
    "score": 88,
    "reason": "Your quick, playful gaze and poised smile share the clever charm of a wild red fox.",
    "features": ["Alert, expressive eyes", "Clever smiling posture"]
  }
Ensure score is an integer between 50 and 99.`;

    const imagePart = {
      inlineData: {
        mimeType,
        data: base64Data,
      },
    };

    const textPart = {
      text: promptText,
    };

    const candidateModels = ['gemini-3-flash-preview', 'gemini-3.1-flash-lite', 'gemini-flash-latest'];
    let responseText: string | undefined;
    let lastError: Error | null = null;

    for (const modelName of candidateModels) {
      try {
        console.log(`[FaceToWild] Calling model ${modelName} (${base64Data.length} bytes)...`);
        const response = await ai.models.generateContent({
          model: modelName,
          contents: { parts: [imagePart, textPart] },
          config: {
            responseMimeType: 'application/json',
          },
        });
        responseText = response.text;
        if (responseText) {
          break;
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`[FaceToWild] Model ${modelName} failed or busy, trying next fallback...`, err.message);
      }
    }

    if (!responseText) {
      throw lastError || new Error('No response received from any Gemini models.');
    }

    let cleanText = responseText.trim();
    if (cleanText.startsWith('```json')) {
      cleanText = cleanText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleanText.startsWith('```')) {
      cleanText = cleanText.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    let parsed: any;
    try {
      parsed = JSON.parse(cleanText);
    } catch (parseErr) {
      console.error('Failed to parse Gemini response:', cleanText);
      throw new Error('Invalid JSON format returned by AI.');
    }

    if (parsed.hasClearFace === false) {
      let clientMsg = 'No clear face found. Please move into the camera frame and try again.';
      if (parsed.rejectionReason === 'multiple_faces') {
        clientMsg = 'Multiple faces detected. Please make sure only one face is in the camera frame.';
      } else if (parsed.rejectionReason === 'blurry') {
        clientMsg = 'The image is too dark or blurry. Please adjust your lighting and hold still.';
      }

      res.json({
        success: false,
        hasClearFace: false,
        error: parsed.rejectionReason || 'no_face',
        message: clientMsg,
      });
      return;
    }

    // Ensure score is constrained between 50 and 99
    let score = Number(parsed.score) || 78;
    if (score < 50) score = 50 + (score % 40);
    if (score > 99) score = 98;

    // Validate category
    let category = parsed.category || 'Animal';
    if (!['Animal', 'Bird', 'Insect'].includes(category)) {
      category = 'Animal';
    }

    res.json({
      success: true,
      hasClearFace: true,
      match: parsed.match || 'Fox',
      category,
      score,
      reason:
        parsed.reason ||
        "Your playful expressions and balanced facial contours give this result a natural wild vibe.",
      features: parsed.features || ['Expressive eye shape', 'Gentle facial symmetry'],
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error in /api/match:', err.message || err);

    res.status(500).json({
      success: false,
      error: 'ANALYSIS_ERROR',
      message:
        err.message?.includes('GEMINI_API_KEY')
          ? 'Gemini API key is not configured or invalid.'
          : 'Unable to analyze image. Please ensure your camera has good lighting and try again.',
      details: err.message,
    });
  }
});

async function startServer() {
  // Vite integration for development or production static serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Face to Wild server running on http://localhost:${PORT}`);
  });
}

startServer();
