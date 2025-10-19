const axios = require('axios');
const jwt = require('jsonwebtoken');

/**
 * Zoom API Service for Live Classes
 * Handles Zoom meeting creation, management, and authentication
 */

const ZOOM_API_KEY = process.env.ZOOM_API_KEY;
const ZOOM_API_SECRET = process.env.ZOOM_API_SECRET;
const ZOOM_ACCOUNT_ID = process.env.ZOOM_ACCOUNT_ID;
const ZOOM_API_BASE_URL = 'https://api.zoom.us/v2';

/**
 * Generate Zoom OAuth token (Server-to-Server OAuth)
 */
async function getZoomAccessToken() {
  try {
    if (!ZOOM_ACCOUNT_ID || !ZOOM_API_KEY || !ZOOM_API_SECRET) {
      throw new Error('Zoom credentials not configured');
    }

    const credentials = Buffer.from(`${ZOOM_API_KEY}:${ZOOM_API_SECRET}`).toString('base64');
    
    const response = await axios.post(
      `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${ZOOM_ACCOUNT_ID}`,
      {},
      {
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error('Zoom OAuth Error:', error.response?.data || error.message);
    throw new Error('Failed to authenticate with Zoom');
  }
}

/**
 * Create a Zoom meeting
 */
async function createZoomMeeting(meetingData) {
  try {
    const accessToken = await getZoomAccessToken();
    
    const meetingConfig = {
      topic: meetingData.title,
      type: 2, // Scheduled meeting
      start_time: meetingData.startTime, // ISO 8601 format
      duration: meetingData.duration || 60, // Duration in minutes
      timezone: 'UTC',
      agenda: meetingData.description || '',
      settings: {
        host_video: true,
        participant_video: true,
        join_before_host: false,
        mute_upon_entry: true,
        watermark: false,
        use_pmi: false,
        approval_type: 0, // Automatically approve
        audio: 'both',
        auto_recording: meetingData.recordSession ? 'cloud' : 'none',
        waiting_room: meetingData.waitingRoom || false,
        meeting_authentication: false,
        allow_multiple_devices: true
      },
      password: meetingData.password || undefined
    };

    const response = await axios.post(
      `${ZOOM_API_BASE_URL}/users/me/meetings`,
      meetingConfig,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return {
      meetingId: response.data.id,
      meetingNumber: response.data.id.toString(),
      joinUrl: response.data.join_url,
      startUrl: response.data.start_url,
      password: response.data.password,
      hostEmail: response.data.host_email,
      settings: response.data.settings
    };
  } catch (error) {
    console.error('Zoom Create Meeting Error:', error.response?.data || error.message);
    throw new Error('Failed to create Zoom meeting');
  }
}

/**
 * Update a Zoom meeting
 */
async function updateZoomMeeting(meetingId, updateData) {
  try {
    const accessToken = await getZoomAccessToken();
    
    const updateConfig = {
      topic: updateData.title,
      start_time: updateData.startTime,
      duration: updateData.duration,
      agenda: updateData.description,
      settings: {
        host_video: true,
        participant_video: true,
        waiting_room: updateData.waitingRoom || false,
        auto_recording: updateData.recordSession ? 'cloud' : 'none'
      }
    };

    await axios.patch(
      `${ZOOM_API_BASE_URL}/meetings/${meetingId}`,
      updateConfig,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return { success: true };
  } catch (error) {
    console.error('Zoom Update Meeting Error:', error.response?.data || error.message);
    throw new Error('Failed to update Zoom meeting');
  }
}

/**
 * Delete a Zoom meeting
 */
async function deleteZoomMeeting(meetingId) {
  try {
    const accessToken = await getZoomAccessToken();
    
    await axios.delete(
      `${ZOOM_API_BASE_URL}/meetings/${meetingId}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );

    return { success: true };
  } catch (error) {
    console.error('Zoom Delete Meeting Error:', error.response?.data || error.message);
    throw new Error('Failed to delete Zoom meeting');
  }
}

/**
 * Get Zoom meeting details
 */
async function getZoomMeeting(meetingId) {
  try {
    const accessToken = await getZoomAccessToken();
    
    const response = await axios.get(
      `${ZOOM_API_BASE_URL}/meetings/${meetingId}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );

    return {
      meetingId: response.data.id,
      topic: response.data.topic,
      startTime: response.data.start_time,
      duration: response.data.duration,
      joinUrl: response.data.join_url,
      status: response.data.status,
      participants: response.data.participants_count || 0
    };
  } catch (error) {
    console.error('Zoom Get Meeting Error:', error.response?.data || error.message);
    throw new Error('Failed to get Zoom meeting details');
  }
}

/**
 * Generate Zoom SDK JWT for client-side meeting join
 */
function generateZoomSDKJWT(meetingNumber, role) {
  try {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 60 * 60 * 2; // 2 hours expiration

    const payload = {
      sdkKey: ZOOM_API_KEY,
      mn: meetingNumber,
      role: role, // 0 = participant, 1 = host
      iat: iat,
      exp: exp,
      appKey: ZOOM_API_KEY,
      tokenExp: exp
    };

    return jwt.sign(payload, ZOOM_API_SECRET);
  } catch (error) {
    console.error('Zoom SDK JWT Error:', error.message);
    throw new Error('Failed to generate Zoom SDK token');
  }
}

/**
 * Get meeting participants
 */
async function getMeetingParticipants(meetingId) {
  try {
    const accessToken = await getZoomAccessToken();
    
    const response = await axios.get(
      `${ZOOM_API_BASE_URL}/metrics/meetings/${meetingId}/participants`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );

    return response.data.participants || [];
  } catch (error) {
    console.error('Zoom Get Participants Error:', error.response?.data || error.message);
    return [];
  }
}

/**
 * Get meeting recordings
 */
async function getMeetingRecordings(meetingId) {
  try {
    const accessToken = await getZoomAccessToken();
    
    const response = await axios.get(
      `${ZOOM_API_BASE_URL}/meetings/${meetingId}/recordings`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );

    return response.data.recording_files || [];
  } catch (error) {
    console.error('Zoom Get Recordings Error:', error.response?.data || error.message);
    return [];
  }
}

module.exports = {
  createZoomMeeting,
  updateZoomMeeting,
  deleteZoomMeeting,
  getZoomMeeting,
  generateZoomSDKJWT,
  getMeetingParticipants,
  getMeetingRecordings
};
