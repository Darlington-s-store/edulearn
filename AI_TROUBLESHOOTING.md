# 🔧 AI Troubleshooting Guide

## Common Issues & Solutions

### Issue 1: AI Not Responding At All

**Symptoms:**
- Click send, but no response appears
- Loading spinner keeps spinning
- Error message appears

**Solutions:**

#### ✅ Check 1: Backend Running?
```bash
cd backend
npm start
```
Should see: `🚀 Server running on port 5000`

#### ✅ Check 2: API Key in .env?
Open `backend/.env` (NOT .env.example) and verify:
```env
DEEPSEEK_API_KEY=sk-19526f7b812c4cf58e30b9f4246d3162
```

If file doesn't exist, create it:
```bash
cd backend
# Copy from example
cp .env.example .env
# Then add the API key
```

#### ✅ Check 3: Logged In?
- Must be logged in as a student
- Check if you have a valid JWT token
- Try logging out and back in

#### ✅ Check 4: Check Browser Console
Open browser DevTools (F12) → Console tab
Look for errors like:
- `401 Unauthorized` → Not logged in
- `500 Server Error` → Backend issue
- `Network Error` → Backend not running

---

### Issue 2: AI Gives Wrong/Irrelevant Answers

**Symptoms:**
- AI responds but answer doesn't match question
- Generic responses instead of specific answers
- Responses seem off-topic

**I just simplified the AI prompt to be more direct!**

**What I Changed:**
- Removed complex instructions
- Made prompt simpler: "Answer this question directly"
- AI will now respond more naturally to what you ask

**Test it:**
1. Restart backend: `cd backend && npm start`
2. Ask a simple question: "What is 2+2?"
3. Should get direct answer: "4" or "2+2 equals 4"

---

### Issue 3: "AI service unavailable" Error

**Cause:** DeepSeek API key issue

**Solutions:**

#### Option 1: Verify API Key
Check if key is correct:
```env
DEEPSEEK_API_KEY=sk-19526f7b812c4cf58e30b9f4246d3162
```

#### Option 2: Check DeepSeek API Status
- Visit https://platform.deepseek.com/
- Check if service is online
- Verify your API key is active

#### Option 3: Check Backend Logs
Look at terminal where backend is running:
```
DeepSeek API Error: [error details]
```

---

### Issue 4: Slow Responses

**Normal Behavior:**
- AI takes 2-5 seconds to respond
- This is expected with AI APIs

**If taking longer than 10 seconds:**
- Check internet connection
- DeepSeek API might be slow
- Try again

---

### Issue 5: Component Not Showing

**Symptoms:**
- No floating AI button appears
- Can't find the chat interface

**Solutions:**

#### ✅ Check 1: Component Imported?
```javascript
import AIStudyAssistant from '../../components/AIStudyAssistant';
```

#### ✅ Check 2: Component Added to JSX?
```javascript
<AIStudyAssistant />
```

#### ✅ Check 3: On Student Page?
- Component only shows for students
- Check if you're logged in as student role

#### ✅ Check 4: Check CSS/Styling
Button is positioned at bottom-right:
```css
position: fixed;
bottom: 24px;
right: 24px;
```

---

## 🧪 Quick Test

### Test Backend API Directly

```bash
# Get a JWT token first (login as student)
# Then test the AI endpoint:

curl -X POST http://localhost:5000/api/ai/study-assistant \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"question":"What is 2+2?"}'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Answer generated successfully",
  "data": {
    "question": "What is 2+2?",
    "answer": "2+2 equals 4...",
    "timestamp": "2025-10-04T..."
  }
}
```

---

## 📋 Complete Setup Checklist

- [ ] Backend running (`npm start` in backend folder)
- [ ] `.env` file exists in backend folder
- [ ] `DEEPSEEK_API_KEY=sk-19526f7b812c4cf58e30b9f4246d3162` in `.env`
- [ ] Frontend running (`npm run dev` in root)
- [ ] Logged in as student
- [ ] `AIStudyAssistant` component imported
- [ ] `<AIStudyAssistant />` added to page
- [ ] Can see floating button in bottom-right
- [ ] Browser console shows no errors

---

## 🔍 Debug Mode

### Enable Detailed Logging

Add to `backend/controllers/aiController.js`:

```javascript
exports.studyAssistant = async (req, res) => {
  try {
    const { question, moduleId } = req.body;
    
    // ADD THIS
    console.log('=== AI REQUEST ===');
    console.log('Question:', question);
    console.log('User:', req.user.id);
    console.log('Module:', moduleId);
    
    // ... rest of code
    
    // ADD THIS
    console.log('=== AI RESPONSE ===');
    console.log('Answer:', answer);
    
  } catch (error) {
    // ADD THIS
    console.error('=== AI ERROR ===');
    console.error(error);
  }
};
```

Then check backend terminal for detailed logs.

---

## 💡 What Questions Can I Ask?

The AI can answer **ANY question**:

### ✅ Academic Questions
- "What is photosynthesis?"
- "Explain Newton's laws"
- "How do you solve quadratic equations?"

### ✅ Study Help
- "How do I study for exams?"
- "What are good note-taking methods?"
- "How can I improve my memory?"

### ✅ Homework Help
- "Can you help me with this math problem?"
- "Explain this concept to me"
- "What does this mean?"

### ✅ General Questions
- "What is the capital of France?"
- "How does the internet work?"
- "What is climate change?"

### ✅ Motivation
- "I'm feeling unmotivated, help!"
- "How do I stay focused?"
- "Tips for managing stress?"

---

## 🚨 Still Not Working?

### Step-by-Step Reset

1. **Stop all servers**
   ```bash
   # Press Ctrl+C in both terminals
   ```

2. **Verify .env file**
   ```bash
   cd backend
   cat .env  # or type .env on Windows
   ```
   Should contain:
   ```env
   DEEPSEEK_API_KEY=sk-19526f7b812c4cf58e30b9f4246d3162
   ```

3. **Restart backend**
   ```bash
   npm start
   ```
   Wait for: `🚀 Server running on port 5000`

4. **Restart frontend**
   ```bash
   cd ..
   npm run dev
   ```

5. **Clear browser cache**
   - Press Ctrl+Shift+Delete
   - Clear cache and cookies
   - Refresh page

6. **Login fresh**
   - Logout completely
   - Login as student
   - Navigate to dashboard

7. **Test AI**
   - Click floating AI button
   - Ask: "Hello"
   - Should respond within 5 seconds

---

## 📞 Get More Help

If still not working, check:

1. **Backend terminal** - Any error messages?
2. **Browser console** (F12) - Any errors?
3. **Network tab** (F12 → Network) - Is request being sent?
4. **DeepSeek API status** - Is service online?

**Share these details:**
- Error messages from backend
- Error messages from browser console
- What question you asked
- What response (if any) you got

---

## ✨ Recent Fix

**I just simplified the AI prompt** to make it more responsive:

**Before:**
- Complex instructions
- Multiple conditions
- Might confuse the AI

**After:**
- Simple: "Answer this question directly"
- Clear and concise
- AI responds naturally

**Restart your backend to apply this fix!**

```bash
cd backend
# Press Ctrl+C to stop
npm start  # Start again
```
