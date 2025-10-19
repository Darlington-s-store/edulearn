const axios = require('axios');

/**
 * AI Service for educational platform
 * Uses DeepSeek API for various AI-powered features
 */

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || process.env.OPENAI_API_KEY;
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

/**
 * Make a request to DeepSeek API
 */
async function callOpenAI(messages, options = {}) {
  try {
    if (!DEEPSEEK_API_KEY) {
      throw new Error('DeepSeek API key not configured');
    }

    const response = await axios.post(
      DEEPSEEK_API_URL,
      {
        model: options.model || 'deepseek-chat',
        messages,
        temperature: options.temperature || 0.7,
        max_tokens: options.maxTokens || 2000,
        ...options
      },
      {
        headers: {
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('DeepSeek API Error:', error.response?.data || error.message);
    throw new Error('AI service unavailable');
  }
}

/**
 * Generate quiz questions based on topic and difficulty
 */
async function generateQuizQuestions(topic, difficulty, gradeLevel, numQuestions = 5) {
  const prompt = `Generate ${numQuestions} multiple-choice quiz questions for the following:
Topic: ${topic}
Grade Level: ${gradeLevel}
Difficulty: ${difficulty}

For each question, provide:
1. The question text
2. Four answer options (A, B, C, D)
3. The correct answer (letter only)
4. A brief explanation

Format the response as a JSON array with this structure:
[
  {
    "question": "Question text here",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": "A",
    "explanation": "Brief explanation"
  }
]

Make sure questions are age-appropriate and educational.`;

  const messages = [
    {
      role: 'system',
      content: 'You are an expert educational content creator specializing in creating engaging and accurate quiz questions for students.'
    },
    {
      role: 'user',
      content: prompt
    }
  ];

  const response = await callOpenAI(messages, { temperature: 0.8 });
  
  try {
    // Extract JSON from response (handle markdown code blocks)
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return JSON.parse(response);
  } catch (error) {
    console.error('Failed to parse AI response:', error);
    throw new Error('Failed to generate quiz questions');
  }
}

/**
 * Provide feedback on student assignment submission
 */
async function generateAssignmentFeedback(assignmentTitle, assignmentInstructions, studentSubmission, totalPoints) {
  const prompt = `As an educational expert, provide constructive feedback on this student's assignment submission.

Assignment: ${assignmentTitle}
Instructions: ${assignmentInstructions}
Student Submission: ${studentSubmission}
Total Points: ${totalPoints}

Provide:
1. A suggested grade (0-${totalPoints})
2. Strengths of the submission (2-3 points)
3. Areas for improvement (2-3 points)
4. Specific constructive feedback
5. Encouragement and next steps

Format as JSON:
{
  "suggestedGrade": number,
  "strengths": ["strength1", "strength2"],
  "improvements": ["improvement1", "improvement2"],
  "feedback": "Detailed feedback text",
  "encouragement": "Encouraging message"
}`;

  const messages = [
    {
      role: 'system',
      content: 'You are a supportive and constructive teacher providing helpful feedback to students.'
    },
    {
      role: 'user',
      content: prompt
    }
  ];

  const response = await callOpenAI(messages, { temperature: 0.7 });
  
  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return JSON.parse(response);
  } catch (error) {
    console.error('Failed to parse AI response:', error);
    throw new Error('Failed to generate feedback');
  }
}

/**
 * Generate personalized content recommendations for students
 */
async function generateContentRecommendations(studentProfile, availableModules, recentActivity) {
  const prompt = `Based on this student's profile and activity, recommend the most suitable learning modules.

Student Profile:
- Grade Level: ${studentProfile.gradeLevel}
- Interests: ${studentProfile.interests?.join(', ') || 'General'}
- Strengths: ${studentProfile.strengths?.join(', ') || 'Not specified'}
- Learning Goals: ${studentProfile.goals?.join(', ') || 'General improvement'}

Recent Activity:
${recentActivity}

Available Modules:
${JSON.stringify(availableModules.map(m => ({ id: m.id, title: m.title, subject: m.subject, difficulty: m.difficulty })), null, 2)}

Recommend 3-5 modules with reasoning. Format as JSON:
{
  "recommendations": [
    {
      "moduleId": number,
      "reason": "Why this module is recommended",
      "priority": "high|medium|low"
    }
  ]
}`;

  const messages = [
    {
      role: 'system',
      content: 'You are an educational advisor helping students find the best learning content for their needs.'
    },
    {
      role: 'user',
      content: prompt
    }
  ];

  const response = await callOpenAI(messages, { temperature: 0.6 });
  
  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return JSON.parse(response);
  } catch (error) {
    console.error('Failed to parse AI response:', error);
    throw new Error('Failed to generate recommendations');
  }
}

/**
 * AI Study Assistant - Answer student questions
 */
async function answerStudentQuestion(question, context = {}) {
  const contextInfo = context.moduleContent 
    ? `\n\nRelevant course context (if applicable):\n${context.moduleContent}`
    : '';

  const prompt = `Answer this question directly and helpfully.

Question: ${question}${contextInfo}

Provide a clear, helpful answer to exactly what was asked. Be natural and conversational.`;

  const messages = [
    {
      role: 'system',
      content: 'You are a helpful, knowledgeable AI tutor and study companion. Answer questions naturally and directly, whether they are about specific subjects, study techniques, homework help, or general inquiries. Be supportive, clear, and encouraging. Adapt your tone and depth to match the question asked.'
    },
    {
      role: 'user',
      content: prompt
    }
  ];

  const response = await callOpenAI(messages, { temperature: 0.7, maxTokens: 600 });
  return response;
}

/**
 * Generate study tips based on student performance
 */
async function generateStudyTips(studentPerformance) {
  const prompt = `Based on this student's performance data, provide personalized study tips.

Performance Data:
- Average Quiz Score: ${studentPerformance.avgQuizScore}%
- Assignment Completion Rate: ${studentPerformance.completionRate}%
- Subjects: ${studentPerformance.subjects?.join(', ')}
- Struggling Areas: ${studentPerformance.strugglingAreas?.join(', ') || 'None identified'}
- Strong Areas: ${studentPerformance.strongAreas?.join(', ') || 'None identified'}

Provide 5 specific, actionable study tips. Format as JSON:
{
  "tips": [
    {
      "title": "Tip title",
      "description": "Detailed tip description",
      "category": "time_management|study_technique|subject_specific|motivation"
    }
  ]
}`;

  const messages = [
    {
      role: 'system',
      content: 'You are an educational coach providing personalized study strategies to help students succeed.'
    },
    {
      role: 'user',
      content: prompt
    }
  ];

  const response = await callOpenAI(messages, { temperature: 0.7 });
  
  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return JSON.parse(response);
  } catch (error) {
    console.error('Failed to parse AI response:', error);
    throw new Error('Failed to generate study tips');
  }
}

/**
 * Summarize module content for quick review
 */
async function summarizeContent(content, maxLength = 200) {
  const prompt = `Summarize the following educational content in ${maxLength} words or less. Focus on key concepts and main ideas.

Content:
${content}

Provide a clear, concise summary that captures the essential information.`;

  const messages = [
    {
      role: 'system',
      content: 'You are an expert at distilling educational content into clear, concise summaries.'
    },
    {
      role: 'user',
      content: prompt
    }
  ];

  const response = await callOpenAI(messages, { temperature: 0.5, maxTokens: 300 });
  return response;
}

module.exports = {
  generateQuizQuestions,
  generateAssignmentFeedback,
  generateContentRecommendations,
  answerStudentQuestion,
  generateStudyTips,
  summarizeContent
};
