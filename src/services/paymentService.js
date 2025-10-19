// Paystack Payment Integration Service
class PaystackService {
  constructor() {
    this.publicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY || 'pk_test_your_public_key_here';
    this.baseUrl = 'https://api.paystack.co';
  }

  // Initialize payment with Paystack
  async initializePayment(paymentData) {
    try {
      const response = await fetch(`${this.baseUrl}/transaction/initialize`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.publicKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: paymentData.amount * 100, // Convert to kobo (smallest currency unit)
          email: paymentData.email,
          currency: paymentData.currency || 'GHS',
          reference: paymentData.reference || this.generateReference(),
          callback_url: paymentData.callbackUrl || window.location.origin + '/payment/callback',
          metadata: {
            plan: paymentData.plan,
            billingCycle: paymentData.billingCycle,
            userId: paymentData.userId,
            ...paymentData.metadata
          }
        })
      });

      const data = await response.json();
      
      if (data.status) {
        return {
          success: true,
          data: data.data,
          authorizationUrl: data.data.authorization_url
        };
      } else {
        return {
          success: false,
          error: data.message || 'Payment initialization failed'
        };
      }
    } catch (error) {
      console.error('Paystack payment error:', error);
      return {
        success: false,
        error: 'Network error. Please try again.'
      };
    }
  }

  // Verify payment
  async verifyPayment(reference) {
    try {
      const response = await fetch(`${this.baseUrl}/transaction/verify/${reference}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.publicKey}`,
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      
      if (data.status && data.data.status === 'success') {
        return {
          success: true,
          data: data.data,
          amount: data.data.amount / 100, // Convert back from kobo
          currency: data.data.currency,
          reference: data.data.reference,
          customer: data.data.customer,
          metadata: data.data.metadata
        };
      } else {
        return {
          success: false,
          error: 'Payment verification failed'
        };
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      return {
        success: false,
        error: 'Network error during verification'
      };
    }
  }

  // Create customer
  async createCustomer(customerData) {
    try {
      const response = await fetch(`${this.baseUrl}/customer`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.publicKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: customerData.email,
          first_name: customerData.firstName,
          last_name: customerData.lastName,
          phone: customerData.phone,
          metadata: customerData.metadata || {}
        })
      });

      const data = await response.json();
      
      if (data.status) {
        return {
          success: true,
          data: data.data
        };
      } else {
        return {
          success: false,
          error: data.message || 'Customer creation failed'
        };
      }
    } catch (error) {
      console.error('Customer creation error:', error);
      return {
        success: false,
        error: 'Network error. Please try again.'
      };
    }
  }

  // Create subscription
  async createSubscription(subscriptionData) {
    try {
      const response = await fetch(`${this.baseUrl}/subscription`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.publicKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer: subscriptionData.customerId,
          plan: subscriptionData.planCode,
          authorization: subscriptionData.authorizationCode
        })
      });

      const data = await response.json();
      
      if (data.status) {
        return {
          success: true,
          data: data.data
        };
      } else {
        return {
          success: false,
          error: data.message || 'Subscription creation failed'
        };
      }
    } catch (error) {
      console.error('Subscription creation error:', error);
      return {
        success: false,
        error: 'Network error. Please try again.'
      };
    }
  }

  // Create plan
  async createPlan(planData) {
    try {
      const response = await fetch(`${this.baseUrl}/plan`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.publicKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: planData.name,
          interval: planData.interval, // daily, weekly, monthly, yearly
          amount: planData.amount * 100, // Convert to kobo
          currency: planData.currency || 'GHS',
          description: planData.description
        })
      });

      const data = await response.json();
      
      if (data.status) {
        return {
          success: true,
          data: data.data
        };
      } else {
        return {
          success: false,
          error: data.message || 'Plan creation failed'
        };
      }
    } catch (error) {
      console.error('Plan creation error:', error);
      return {
        success: false,
        error: 'Network error. Please try again.'
      };
    }
  }

  // Get banks for bank transfer
  async getBanks() {
    try {
      const response = await fetch(`${this.baseUrl}/bank`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.publicKey}`,
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      
      if (data.status) {
        return {
          success: true,
          data: data.data
        };
      } else {
        return {
          success: false,
          error: data.message || 'Failed to fetch banks'
        };
      }
    } catch (error) {
      console.error('Banks fetch error:', error);
      return {
        success: false,
        error: 'Network error. Please try again.'
      };
    }
  }

  // Generate unique reference
  generateReference() {
    return 'ref_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  }

  // Format amount for display
  formatAmount(amount, currency = 'GHS') {
    const currencySymbols = {
      'GHS': '₵',
      'USD': '$',
      'EUR': '€',
      'GBP': '£'
    };
    
    return `${currencySymbols[currency] || currency}${amount.toLocaleString()}`;
  }

  // Validate email
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validate phone number (Ghana)
  validatePhone(phone) {
    const phoneRegex = /^(\+233|0)[0-9]{9}$/;
    return phoneRegex.test(phone);
  }

  // Handle payment callback
  handlePaymentCallback(urlParams) {
    const reference = urlParams.get('reference');
    const status = urlParams.get('status');
    
    if (reference && status === 'success') {
      return {
        success: true,
        reference: reference
      };
    } else {
      return {
        success: false,
        error: 'Payment was not successful'
      };
    }
  }
}

// Arkesel SMS Service
class ArkeselService {
  constructor() {
    this.apiKey = process.env.REACT_APP_ARKESEL_API_KEY || 'your_arkesel_api_key_here';
    this.baseUrl = 'https://api.arkesel.com';
    this.senderId = process.env.REACT_APP_ARKESEL_SENDER_ID || 'EduLearn';
  }

  // Send SMS
  async sendSMS(smsData) {
    try {
      const response = await fetch(`${this.baseUrl}/sms/send`, {
        method: 'POST',
        headers: {
          'api-key': this.apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: this.senderId,
          message: smsData.message,
          recipients: Array.isArray(smsData.recipients) ? smsData.recipients : [smsData.recipients]
        })
      });

      const data = await response.json();
      
      if (data.code === 'ok') {
        return {
          success: true,
          data: data.data,
          messageId: data.data.message_id
        };
      } else {
        return {
          success: false,
          error: data.message || 'SMS sending failed'
        };
      }
    } catch (error) {
      console.error('Arkesel SMS error:', error);
      return {
        success: false,
        error: 'Network error. Please try again.'
      };
    }
  }

  // Send OTP
  async sendOTP(phoneNumber, otpCode) {
    const message = `Your EduLearn verification code is: ${otpCode}. This code expires in 10 minutes.`;
    
    return await this.sendSMS({
      recipients: phoneNumber,
      message: message
    });
  }

  // Send welcome message
  async sendWelcomeMessage(phoneNumber, userName, planName) {
    const message = `Welcome to EduLearn, ${userName}! You've successfully subscribed to the ${planName}. Start your learning journey today!`;
    
    return await this.sendSMS({
      recipients: phoneNumber,
      message: message
    });
  }

  // Send payment confirmation
  async sendPaymentConfirmation(phoneNumber, amount, planName) {
    const message = `Payment confirmed! You've successfully paid ${amount} for ${planName}. Your subscription is now active.`;
    
    return await this.sendSMS({
      recipients: phoneNumber,
      message: message
    });
  }

  // Send class reminder
  async sendClassReminder(phoneNumber, className, time, teacherName) {
    const message = `Reminder: You have a ${className} class with ${teacherName} at ${time}. Don't miss it!`;
    
    return await this.sendSMS({
      recipients: phoneNumber,
      message: message
    });
  }

  // Send assignment reminder
  async sendAssignmentReminder(phoneNumber, assignmentName, dueDate) {
    const message = `Reminder: Your assignment "${assignmentName}" is due on ${dueDate}. Submit it on time!`;
    
    return await this.sendSMS({
      recipients: phoneNumber,
      message: message
    });
  }

  // Send achievement notification
  async sendAchievementNotification(phoneNumber, achievementName) {
    const message = `Congratulations! You've earned the "${achievementName}" achievement. Keep up the great work!`;
    
    return await this.sendSMS({
      recipients: phoneNumber,
      message: message
    });
  }

  // Send parent notification
  async sendParentNotification(phoneNumber, childName, message) {
    const fullMessage = `Update about ${childName}: ${message}`;
    
    return await this.sendSMS({
      recipients: phoneNumber,
      message: fullMessage
    });
  }

  // Get SMS balance
  async getBalance() {
    try {
      const response = await fetch(`${this.baseUrl}/sms/balance`, {
        method: 'GET',
        headers: {
          'api-key': this.apiKey,
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      
      if (data.code === 'ok') {
        return {
          success: true,
          balance: data.data.balance
        };
      } else {
        return {
          success: false,
          error: data.message || 'Failed to fetch balance'
        };
      }
    } catch (error) {
      console.error('Balance fetch error:', error);
      return {
        success: false,
        error: 'Network error. Please try again.'
      };
    }
  }

  // Get SMS delivery status
  async getDeliveryStatus(messageId) {
    try {
      const response = await fetch(`${this.baseUrl}/sms/status/${messageId}`, {
        method: 'GET',
        headers: {
          'api-key': this.apiKey,
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      
      if (data.code === 'ok') {
        return {
          success: true,
          status: data.data.status
        };
      } else {
        return {
          success: false,
          error: data.message || 'Failed to fetch status'
        };
      }
    } catch (error) {
      console.error('Status fetch error:', error);
      return {
        success: false,
        error: 'Network error. Please try again.'
      };
    }
  }
}

// Export services
export const paystackService = new PaystackService();
export const arkeselService = new ArkeselService();

// Export classes for custom instances
export { PaystackService, ArkeselService };
