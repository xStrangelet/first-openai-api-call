import express from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize OpenAI client only if API key is provided
let openai;
if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here') {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Health check endpoint
app.get('/api', (req, res) => {
  res.json({ message: 'OpenAI Chat Server is running!' });
});

// Chat endpoint
app.post('/chat', async (req, res) => {
  try {
    const { userPrompt } = req.body;

    // Validate input
    if (!userPrompt || typeof userPrompt !== 'string') {
      return res.status(400).json({
        error: 'Invalid request. Please provide a "userPrompt" string in the request body.'
      });
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
      return res.status(500).json({
        error: 'OpenAI API key not configured. Please set OPENAI_API_KEY environment variable.'
      });
    }

    if (!openai) {
      return res.status(500).json({
        error: 'OpenAI client not initialized. Please check your API key configuration.'
      });
    }

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant.'
        },
        {
          role: 'user',
          content: userPrompt
        }
      ],
    });

    const assistantReply = completion.choices[0].message.content;
    const tokenUsage = completion.usage;

    // Log token usage to console
    console.log('Token Usage:', {
      prompt_tokens: tokenUsage.prompt_tokens,
      completion_tokens: tokenUsage.completion_tokens,
      total_tokens: tokenUsage.total_tokens
    });

    // Return response
    res.json({
      reply: assistantReply,
      tokenUsage: {
        prompt_tokens: tokenUsage.prompt_tokens,
        completion_tokens: tokenUsage.completion_tokens,
        total_tokens: tokenUsage.total_tokens
      }
    });

  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    
    // Handle specific OpenAI errors
    if (error.status === 401) {
      return res.status(401).json({
        error: 'Invalid OpenAI API key. Please check your OPENAI_API_KEY environment variable.'
      });
    }
    
    if (error.status === 429) {
      return res.status(429).json({
        error: 'OpenAI API rate limit exceeded. Please try again later.'
      });
    }

    res.status(500).json({
      error: 'Internal server error while processing your request.'
    });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log('Available endpoints:');
  console.log('  GET  / - Frontend interface');
  console.log('  GET  /api - Health check');
  console.log('  POST /chat - Chat with OpenAI');
  console.log('\nMake sure to set your OPENAI_API_KEY environment variable!');
  
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
    console.log('\n⚠️  WARNING: OpenAI API key not configured!');
    console.log('   Please update the OPENAI_API_KEY in your .env file');
  }
});