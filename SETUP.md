# English Grammar Tenses - Setup Instructions

## OpenAI API Configuration

This application uses OpenAI's API to generate custom grammar examples based on any topic you choose.

### Setup Steps:

1. **Get an OpenAI API Key:**
   - Visit [OpenAI Platform](https://platform.openai.com/api-keys)
   - Create an account or sign in
   - Generate a new API key

2. **Configure the API Key:**
   - Open the `.env.local` file in the root directory
   - Replace `your_openai_api_key_here` with your actual API key:
   ```
   NEXT_PUBLIC_OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxx
   ```

3. **Restart the Development Server:**
   - Stop the current server (Ctrl+C)
   - Run `npm run dev` again

### Usage:

1. Enter any topic in the input field (e.g., "ordering coffee", "booking a hotel", "playing soccer")
2. Click "Generate" button
3. Wait for the AI to generate examples (skeleton loading will show)
4. View your personalized grammar table with highlighted pronouns and verbs!

### Features:

- ✅ Custom topic input
- ✅ OpenAI GPT-4 integration
- ✅ Skeleton loading animation
- ✅ Automatic pronoun and verb highlighting
- ✅ Structured JSON responses from LLM
- ✅ All 12 English tenses with examples
- ✅ Concise, practical sentences
