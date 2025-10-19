# 🚀 AI Features Integration Guide

## Quick Start

### 1. Setup OpenAI API Key

Add to `backend/.env`:
```env
OPENAI_API_KEY=sk-your-api-key-here
```

### 2. Restart Backend Server

```bash
cd backend
npm start
```

## 📍 Where to Add AI Components

### For Students

#### Student Dashboard
Add AI Recommendations and Study Tips:

```javascript
// src/pages/dashboards/StudentDashboard.jsx
import AIRecommendations from '../../components/AIRecommendations';
import AIStudyTips from '../../components/AIStudyTips';
import AIStudyAssistant from '../../components/AIStudyAssistant';

function StudentDashboard() {
  return (
    <div>
      {/* Existing dashboard content */}
      
      {/* Add AI Recommendations */}
      <div className="mb-6">
        <AIRecommendations />
      </div>
      
      {/* Add AI Study Tips */}
      <div className="mb-6">
        <AIStudyTips />
      </div>
      
      {/* Add floating AI Assistant (appears on all pages) */}
      <AIStudyAssistant />
    </div>
  );
}
```

#### Module Learning Page
Add AI Study Assistant with context:

```javascript
// src/pages/student/ModuleView.jsx
import AIStudyAssistant from '../../components/AIStudyAssistant';

function ModuleView() {
  const { moduleId } = useParams();
  
  return (
    <div>
      {/* Module content */}
      
      {/* AI Assistant with module context */}
      <AIStudyAssistant moduleId={moduleId} />
    </div>
  );
}
```

### For Teachers

#### Quiz Creation Page
Add AI Quiz Generator:

```javascript
// src/pages/teacher/Quizzes.jsx
import AIQuizGenerator from '../../components/AIQuizGenerator';

function Quizzes() {
  const [questions, setQuestions] = useState([]);
  
  const handleAIQuestions = (generatedQuestions) => {
    // Add AI-generated questions to your quiz
    setQuestions([...questions, ...generatedQuestions]);
  };
  
  return (
    <div>
      {/* Existing quiz form */}
      
      {/* Add AI Quiz Generator button */}
      <div className="mb-4">
        <AIQuizGenerator onQuestionsGenerated={handleAIQuestions} />
      </div>
      
      {/* Display questions */}
      {questions.map((q, index) => (
        <div key={index}>
          {/* Question display */}
        </div>
      ))}
    </div>
  );
}
```

#### Assignment Grading Page
Add AI Feedback Generator:

```javascript
// src/pages/teacher/Assignments.jsx
import AIAssignmentFeedback from '../../components/AIAssignmentFeedback';

function GradeSubmission({ submission }) {
  const [grade, setGrade] = useState('');
  const [feedback, setFeedback] = useState('');
  
  const handleAIFeedback = (aiFeedback) => {
    setGrade(aiFeedback.grade);
    setFeedback(aiFeedback.feedback);
  };
  
  return (
    <div>
      {/* Submission details */}
      
      {/* Add AI Feedback button */}
      <AIAssignmentFeedback 
        submissionId={submission.id}
        onFeedbackGenerated={handleAIFeedback}
      />
      
      {/* Grade input */}
      <input 
        type="number" 
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
      />
      
      {/* Feedback textarea */}
      <textarea 
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
    </div>
  );
}
```

## 🎨 Example Implementations

### Complete Student Dashboard with AI

```javascript
import React from 'react';
import AIRecommendations from '../../components/AIRecommendations';
import AIStudyTips from '../../components/AIStudyTips';
import AIStudyAssistant from '../../components/AIStudyAssistant';

function StudentDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Your existing stats/progress */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            {/* Stats content */}
          </div>
          
          {/* AI Recommendations */}
          <AIRecommendations />
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          {/* Your existing content */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            {/* Other content */}
          </div>
          
          {/* AI Study Tips */}
          <AIStudyTips />
        </div>
      </div>
      
      {/* Floating AI Assistant */}
      <AIStudyAssistant />
    </div>
  );
}

export default StudentDashboard;
```

### Complete Quiz Creation with AI

```javascript
import React, { useState } from 'react';
import AIQuizGenerator from '../../components/AIQuizGenerator';

function CreateQuiz() {
  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    questions: []
  });
  
  const handleAIGeneration = (generatedQuestions) => {
    setQuizData({
      ...quizData,
      questions: [...quizData.questions, ...generatedQuestions]
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit quiz to backend
  };
  
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Create Quiz</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Quiz Title */}
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            value={quizData.title}
            onChange={(e) => setQuizData({...quizData, title: e.target.value})}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        
        {/* AI Generator */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Generate Questions with AI</h3>
          <AIQuizGenerator onQuestionsGenerated={handleAIGeneration} />
        </div>
        
        {/* Display Questions */}
        <div>
          <h3 className="font-semibold mb-4">Questions ({quizData.questions.length})</h3>
          {quizData.questions.map((q, index) => (
            <div key={index} className="bg-white border rounded-lg p-4 mb-4">
              <p className="font-medium mb-2">{index + 1}. {q.question}</p>
              <div className="space-y-1">
                {q.options.map((option, i) => (
                  <div key={i} className={`p-2 rounded ${q.correctAnswer === String.fromCharCode(65 + i) ? 'bg-green-50' : 'bg-gray-50'}`}>
                    {String.fromCharCode(65 + i)}. {option}
                  </div>
                ))}
              </div>
              {q.explanation && (
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Explanation:</strong> {q.explanation}
                </p>
              )}
            </div>
          ))}
        </div>
        
        <button type="submit" className="btn-primary">
          Create Quiz
        </button>
      </form>
    </div>
  );
}

export default CreateQuiz;
```

## 🔧 API Integration Examples

### Direct API Calls (if not using components)

```javascript
import axios from 'axios';

// Get AI recommendations
async function getRecommendations() {
  const token = localStorage.getItem('token');
  const response = await axios.get(
    'http://localhost:5000/api/ai/recommendations',
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data.data;
}

// Ask AI assistant
async function askAI(question, moduleId = null) {
  const token = localStorage.getItem('token');
  const response = await axios.post(
    'http://localhost:5000/api/ai/study-assistant',
    { question, moduleId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data.data.answer;
}

// Generate quiz
async function generateQuiz(topic, difficulty, gradeLevel, numQuestions) {
  const token = localStorage.getItem('token');
  const response = await axios.post(
    'http://localhost:5000/api/ai/generate-quiz',
    { topic, difficulty, gradeLevel, numQuestions },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data.data.questions;
}
```

## ✅ Testing Checklist

- [ ] OpenAI API key configured in backend `.env`
- [ ] Backend server restarted
- [ ] AI routes accessible at `/api/ai/*`
- [ ] Student can see AI Study Assistant button
- [ ] Student can ask questions and get responses
- [ ] Student dashboard shows recommendations
- [ ] Student dashboard shows study tips
- [ ] Teacher can generate quiz questions
- [ ] Teacher can get AI feedback on submissions
- [ ] Error handling works when API key is invalid
- [ ] Loading states display correctly

## 🎯 Next Steps

1. **Add to Student Pages:**
   - Import `AIStudyAssistant` component
   - Add `<AIStudyAssistant />` before closing div

2. **Add to Teacher Pages:**
   - Import `AIQuizGenerator` in quiz creation
   - Import `AIAssignmentFeedback` in grading

3. **Customize Styling:**
   - Modify component styles to match your theme
   - Adjust colors in gradient classes

4. **Monitor Usage:**
   - Check OpenAI dashboard for API usage
   - Implement rate limiting if needed

## 📞 Support

See `AI_FEATURES.md` for detailed documentation on each feature.
