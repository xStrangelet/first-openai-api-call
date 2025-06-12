# OpenAI Chat Interface

A simple Node.js Express server with a web interface that allows users to interact with OpenAI's GPT-3.5-turbo model. Users can enter prompts through a clean web interface and receive AI-generated responses along with token usage statistics.

## What This Application Does

- **Backend Server**: Express.js server that handles chat requests and communicates with OpenAI's API
- **Frontend Interface**: Clean, responsive web interface for entering prompts and viewing responses
- **OpenAI Integration**: Uses GPT-3.5-turbo model with a helpful assistant system prompt
- **Token Tracking**: Displays detailed token usage information (prompt tokens, completion tokens, total tokens)
- **Error Handling**: Comprehensive error handling for API issues, rate limits, and configuration problems
- **Security**: Environment variable-based API key management with .gitignore protection

## Features

- 🤖 Chat with OpenAI's GPT-3.5-turbo model
- 📊 Real-time token usage tracking
- 🎨 Modern, responsive web interface
- 🔒 Secure API key management
- ⚡ Fast and lightweight
- 📱 Mobile-friendly design

## Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)
- OpenAI API key

## Setup Instructions

### 1. Clone or Download the Project

```bash
# If using git
git clone <repository-url>
cd openai-chat-interface

# Or download and extract the project files
```

### 2. Install Dependencies

```bash
npm install
```

This will install the required packages:
- `express` - Web server framework
- `openai` - Official OpenAI API client
- `dotenv` - Environment variable loader

### 3. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_actual_openai_api_key_here
   PORT=3000
   ```

### 4. Get Your OpenAI API Key

1. Visit [OpenAI's website](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to the [API Keys section](https://platform.openai.com/api-keys)
4. Create a new API key
5. Copy the key and paste it into your `.env` file

## Running the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

## Usage

1. **Start the server** using one of the commands above
2. **Open your browser** and navigate to `http://localhost:3000`
3. **Enter a prompt** in the text area (e.g., "Explain quantum computing in simple terms")
4. **Click "Send Message"** to get an AI response
5. **View the response** and token usage statistics below

## API Endpoints

### GET `/`
Serves the main web interface

### GET `/api`
Health check endpoint that returns server status

### POST `/chat`
Main chat endpoint that accepts prompts and returns AI responses

**Request Body:**
```json
{
  "userPrompt": "Your question or prompt here"
}
```

**Response:**
```json
{
  "reply": "AI assistant's response",
  "tokenUsage": {
    "prompt_tokens": 15,
    "completion_tokens": 25,
    "total_tokens": 40
  }
}
```

## Project Structure

```
├── index.js              # Main server file
├── package.json          # Dependencies and scripts
├── .env                  # Environment variables (not in git)
├── .env.example          # Example environment file
├── .gitignore           # Git ignore rules
├── README.md            # This file
└── public/
    └── index.html       # Frontend web interface
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key | Yes |
| `PORT` | Server port (default: 3000) | No |

## Error Handling

The application includes comprehensive error handling for:

- Missing or invalid API keys
- OpenAI API rate limits
- Network connectivity issues
- Invalid request formats
- Server errors

## Security Notes

- The `.env` file is automatically excluded from git commits
- API keys are never exposed to the frontend
- All API calls are made server-side
- Input validation is performed on all requests

## Troubleshooting

### "OpenAI API key not configured" Error
- Make sure you've created a `.env` file
- Verify your API key is correctly set in the `.env` file
- Ensure there are no extra spaces or quotes around the API key

### "Rate limit exceeded" Error
- You've hit OpenAI's rate limits
- Wait a few minutes before trying again
- Consider upgrading your OpenAI plan for higher limits

### Server won't start
- Check if port 3000 is already in use
- Try changing the PORT in your `.env` file
- Make sure all dependencies are installed with `npm install`

## License

This project is open source and available under the MIT License.