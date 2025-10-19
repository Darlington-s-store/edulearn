# 🤖 AI Features Documentation

## Overview

The Edu-Learn platform now includes powerful AI features powered by OpenAI's GPT models to enhance the learning and teaching experience.

## 🔑 Setup

### 1. Get OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key

### 2. Configure Backend

Add your OpenAI API key to the backend `.env` file:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

### 3. Install Dependencies

The required dependencies are already included in `package.json`:
- `axios` - for API calls

## 🎯 AI Features

### 1. AI Quiz Generator (Teachers)

**Location:** Teacher Quiz Creation Page

**Features:**
- Automatically generate quiz questions based on topic
- Customize difficulty level and grade level
- Generate 3-20 questions at once
- Questions include explanations

**Usage:**
```javascript
import AIQuizGenerator from '../components/AIQuizGenerator';

<AIQuizGenerator 
  onQuestionsGenerated={(questions) => {
    // Handle generated questions
    setQuizQuestions(questions);
  }}
/>
```

**API Endpoint:**
```
POST /api/ai/generate-quiz
Body: {
  topic: string,
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  gradeLevel: string,
  numQuestions: number
}
```

### 2. AI Assignment Feedback (Teachers)

**Location:** Teacher Assignment Grading Page

**Features:**
- Generate intelligent feedback on student submissions
- Get suggested grades
- Identify strengths and areas for improvement
- Provide constructive, encouraging feedback

**Usage:**
```javascript
import AIAssignmentFeedback from '../components/AIAssignmentFeedback';

<AIAssignmentFeedback 
  submissionId={submission.id}
  onFeedbackGenerated={(feedback) => {
    // Handle generated feedback
    setGrade(feedback.grade);
    setFeedbackText(feedback.feedback);
  }}
/>
```

**API Endpoint:**
```
POST /api/ai/assignment-feedback/:submissionId
```

### 3. AI Study Assistant (Students)

**Location:** Available on all student pages (floating button)

**Features:**
- 24/7 AI tutor available
- Answer questions about coursework
- Context-aware responses based on current module
- Chat interface for natural conversation

**Usage:**
```javascript
import AIStudyAssistant from '../components/AIStudyAssistant';

// Add to any student page
<AIStudyAssistant moduleId={currentModuleId} />
```

**API Endpoint:**
```
POST /api/ai/study-assistant
Body: {
  question: string,
  moduleId?: number
}
```

### 4. AI Content Recommendations (Students)

**Location:** Student Dashboard

**Features:**
- Personalized module recommendations
- Based on learning history and performance
- Priority-ranked suggestions
- Reasoning for each recommendation

**Usage:**
```javascript
import AIRecommendations from '../components/AIRecommendations';

<AIRecommendations />
```

**API Endpoint:**
```
GET /api/ai/recommendations
```

### 5. AI Study Tips (Students)

**Location:** Student Dashboard

**Features:**
- Personalized study tips based on performance
- Categories: time management, study techniques, subject-specific, motivation
- Performance analytics
- Identifies strong and struggling areas

**Usage:**
```javascript
import AIStudyTips from '../components/AIStudyTips';

<AIStudyTips />
```

**API Endpoint:**
```
GET /api/ai/study-tips
```

### 6. AI Content Summarizer

**Location:** Module viewing pages

**Features:**
- Summarize long module content
- Quick review before quizzes
- Customizable summary length

**API Endpoint:**
```
POST /api/ai/summarize/:moduleId
```

## 🏗️ Architecture

### Backend Structure

```
backend/
├── utils/
│   └── aiService.js          # Core AI service functions
├── controllers/
│   └── aiController.js       # AI endpoint handlers
└── routes/
    └── aiRoutes.js           # AI route definitions
```

### Frontend Structure

```
src/
└── components/
    ├── AIStudyAssistant.jsx       # Chat interface
    ├── AIQuizGenerator.jsx        # Quiz generation
    ├── AIAssignmentFeedback.jsx   # Feedback generation
    ├── AIRecommendations.jsx      # Content recommendations
    └── AIStudyTips.jsx            # Study tips display
```

## 🔒 Security & Authorization

All AI endpoints are protected with JWT authentication:

- **Teachers only:** Quiz generation, Assignment feedback
- **Students only:** Study assistant, Recommendations, Study tips
- **Both:** Content summarization (with enrollment check)

## 💰 Cost Considerations

OpenAI API usage is billed based on tokens used:

- **GPT-3.5-turbo:** ~$0.002 per 1K tokens
- **GPT-4:** ~$0.03 per 1K tokens (if upgraded)

**Estimated costs per request:**
- Quiz generation (5 questions): ~$0.01-0.02
- Assignment feedback: ~$0.005-0.01
- Study assistant answer: ~$0.003-0.008
- Recommendations: ~$0.01-0.02
- Study tips: ~$0.01-0.02

**Cost optimization tips:**
1. Use GPT-3.5-turbo (default) for most features
2. Implement rate limiting
3. Cache common responses
4. Set reasonable token limits

## 🎨 Customization

### Adjust AI Temperature

In `backend/utils/aiService.js`, modify the `temperature` parameter:

```javascript
const response = await callOpenAI(messages, { 
  temperature: 0.7  // 0.0 = deterministic, 1.0 = creative
});
```

### Change AI Model

```javascript
const response = await callOpenAI(messages, { 
  model: 'gpt-4'  // or 'gpt-3.5-turbo'
});
```

### Customize Prompts

Edit the prompt strings in `backend/utils/aiService.js` to adjust AI behavior and response format.

## 🧪 Testing

### Test AI Features

1. **Start backend with API key:**
   ```bash
   cd backend
   npm start
   ```

2. **Test endpoints with curl:**
   ```bash
   # Quiz generation
   curl -X POST http://localhost:5000/api/ai/generate-quiz \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"topic":"Photosynthesis","difficulty":"intermediate","gradeLevel":"high","numQuestions":5}'
   ```

3. **Test in frontend:**
   - Login as teacher → Create quiz → Click "Generate with AI"
   - Login as student → Open study assistant → Ask a question

## 🐛 Troubleshooting

### "AI service unavailable"
- Check if `OPENAI_API_KEY` is set in `.env`
- Verify API key is valid on OpenAI platform
- Check OpenAI API status

### "Failed to parse AI response"
- AI response format may vary
- Check console logs for raw response
- Adjust JSON parsing in `aiService.js`

### Rate limit errors
- OpenAI has rate limits based on your plan
- Implement request queuing
- Add retry logic with exponential backoff

### High costs
- Monitor usage on OpenAI dashboard
- Implement usage limits per user
- Cache frequent queries
- Use GPT-3.5-turbo instead of GPT-4

## 📊 Monitoring

Track AI feature usage:

```javascript
// Add to aiController.js
console.log('AI Request:', {
  feature: 'quiz-generation',
  user: req.user.id,
  timestamp: new Date()
});
```

## 🚀 Future Enhancements

Potential additions:
- [ ] AI essay grading with rubrics
- [ ] Automated quiz difficulty adjustment
- [ ] Learning path generation
- [ ] Voice-based study assistant
- [ ] Image-based question generation
- [ ] Plagiarism detection
- [ ] Personalized practice problems
- [ ] AI-powered flashcard generation

## 📝 Best Practices

1. **Always validate AI responses** before showing to users
2. **Provide edit options** for AI-generated content
3. **Show loading states** during AI processing
4. **Handle errors gracefully** with user-friendly messages
5. **Log AI interactions** for debugging and improvement
6. **Set reasonable timeouts** for AI requests
7. **Implement rate limiting** to prevent abuse
8. **Cache responses** when appropriate

## 🤝 Contributing

To add new AI features:

1. Add function to `backend/utils/aiService.js`
2. Create controller in `backend/controllers/aiController.js`
3. Add route to `backend/routes/aiRoutes.js`
4. Create React component in `src/components/`
5. Update this documentation

## 📚 Resources

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [GPT Best Practices](https://platform.openai.com/docs/guides/gpt-best-practices)
- [Prompt Engineering Guide](https://www.promptingguide.ai/)

---

**Note:** AI features require an active OpenAI API key. Free tier has limited requests. Consider upgrading for production use.
