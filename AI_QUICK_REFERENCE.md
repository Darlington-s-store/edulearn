# 🚀 AI Features Quick Reference

## 🔧 Setup (One-Time)

```bash
# 1. Get API key from https://platform.openai.com/api-keys
# 2. Add to backend/.env:
OPENAI_API_KEY=sk-your-key-here

# 3. Restart backend
cd backend
npm start
```

## 📦 Import Components

```javascript
// Student components
import AIStudyAssistant from '../components/AIStudyAssistant';
import AIRecommendations from '../components/AIRecommendations';
import AIStudyTips from '../components/AIStudyTips';

// Teacher components
import AIQuizGenerator from '../components/AIQuizGenerator';
import AIAssignmentFeedback from '../components/AIAssignmentFeedback';
```

## 💻 Usage Examples

### Student Dashboard
```jsx
<AIRecommendations />
<AIStudyTips />
<AIStudyAssistant />
```

### Module/Learning Page
```jsx
<AIStudyAssistant moduleId={moduleId} />
```

### Quiz Creation (Teacher)
```jsx
<AIQuizGenerator 
  onQuestionsGenerated={(questions) => {
    setQuizQuestions([...quizQuestions, ...questions]);
  }}
/>
```

### Assignment Grading (Teacher)
```jsx
<AIAssignmentFeedback 
  submissionId={submission.id}
  onFeedbackGenerated={({ grade, feedback }) => {
    setGrade(grade);
    setFeedback(feedback);
  }}
/>
```

## 🌐 API Endpoints

| Endpoint | Method | Role | Description |
|----------|--------|------|-------------|
| `/api/ai/generate-quiz` | POST | Teacher | Generate quiz questions |
| `/api/ai/assignment-feedback/:id` | POST | Teacher | Get AI feedback |
| `/api/ai/study-assistant` | POST | Student | Ask AI questions |
| `/api/ai/recommendations` | GET | Student | Get recommendations |
| `/api/ai/study-tips` | GET | Student | Get study tips |
| `/api/ai/summarize/:moduleId` | POST | Both | Summarize content |

## 🎨 Component Props

### AIStudyAssistant
```jsx
<AIStudyAssistant 
  moduleId={number}  // Optional: for context
/>
```

### AIQuizGenerator
```jsx
<AIQuizGenerator 
  onQuestionsGenerated={(questions) => {}}  // Callback
/>
```

### AIAssignmentFeedback
```jsx
<AIAssignmentFeedback 
  submissionId={number}                    // Required
  onFeedbackGenerated={(feedback) => {}}   // Callback
/>
```

### AIRecommendations
```jsx
<AIRecommendations />  // No props needed
```

### AIStudyTips
```jsx
<AIStudyTips />  // No props needed
```

## 🔍 What Each Feature Does

| Feature | What It Does | Who Uses It |
|---------|--------------|-------------|
| **Study Assistant** | Answers any question (academic, study tips, general) | Students |
| **Quiz Generator** | Creates multiple-choice questions with explanations | Teachers |
| **Assignment Feedback** | Provides grades and constructive feedback | Teachers |
| **Recommendations** | Suggests personalized learning modules | Students |
| **Study Tips** | Gives performance-based study advice | Students |
| **Content Summarizer** | Creates concise summaries of modules | Both |

## ⚡ Quick Tips

- **Study Assistant responds to ANY question** - not just course content
- **AI-generated content is editable** - teachers can modify before using
- **All features require authentication** - JWT token needed
- **Costs are minimal** - ~$0.01 per request with GPT-3.5-turbo
- **Loading states included** - components show spinners automatically
- **Error handling built-in** - user-friendly error messages

## 🎯 Common Use Cases

### Student asks homework question
```javascript
// Student types: "How does photosynthesis work?"
// AI responds with clear explanation + examples
```

### Teacher needs quiz questions
```javascript
// Teacher inputs: Topic="World War II", Difficulty="intermediate"
// AI generates 5 questions with answers + explanations
```

### Student needs study advice
```javascript
// Based on quiz scores and completion rate
// AI provides personalized tips for improvement
```

### Teacher grading assignment
```javascript
// AI analyzes submission
// Suggests grade + identifies strengths + areas to improve
```

## 📱 Where to Add

| Page | Components to Add |
|------|-------------------|
| Student Dashboard | `AIRecommendations`, `AIStudyTips`, `AIStudyAssistant` |
| Module View | `AIStudyAssistant` (with moduleId) |
| Quiz Creation | `AIQuizGenerator` |
| Assignment Grading | `AIAssignmentFeedback` |
| Any Student Page | `AIStudyAssistant` (floating button) |

## 🛠️ Troubleshooting

| Issue | Solution |
|-------|----------|
| "AI service unavailable" | Check OPENAI_API_KEY in .env |
| No response from AI | Verify backend is running |
| "Not authorized" | Check user is logged in with correct role |
| Slow responses | Normal - AI takes 2-5 seconds |
| High costs | Monitor usage on OpenAI dashboard |

## 📚 Documentation Files

- **AI_FEATURES.md** - Complete feature documentation
- **AI_INTEGRATION_GUIDE.md** - Step-by-step integration
- **AI_IMPLEMENTATION_SUMMARY.md** - What was built
- **AI_QUICK_REFERENCE.md** - This file

## ✅ Testing Checklist

- [ ] API key added to .env
- [ ] Backend restarted
- [ ] Can see AI Study Assistant button
- [ ] Can ask questions and get responses
- [ ] Teacher can generate quiz questions
- [ ] Teacher can get assignment feedback
- [ ] Student sees recommendations
- [ ] Student sees study tips
- [ ] Loading states work
- [ ] Error messages display

---

**Need help?** Check the full documentation in `AI_FEATURES.md`
