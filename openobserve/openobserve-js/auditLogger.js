const axios = require('axios');
require('dotenv').config();

class OpenObserveLogger {
  constructor() {
    this.baseURL = `${process.env.OPENOBSERVE_URL}/api/default/${process.env.STREAM_NAME}/_json`;
    this.auth = {
      username: process.env.OPENOBSERVE_USER,
      password: process.env.OPENOBSERVE_PASSWORD
    };
  }

  async sendLog(logData) {
    try {
      const response = await axios.post(this.baseURL, [logData], {
        auth: this.auth,
        headers: { 'Content-Type': 'application/json' }
      });
      console.log('Log sent:', response.status);
      return response.data;
    } catch (error) {
      console.error('Error sending log:', error.response?.data || error.message);
    }
  }

  generateAuditLog(user, action, metadata = {}) {
    return {
      timestamp: new Date().toISOString(),
      user,
      action,
      status: 'success', // atau 'failed'
      ...metadata,
      environment: process.env.NODE_ENV || 'development'
    };
  }
}

// Contoh penggunaan
const logger = new OpenObserveLogger();

// Simulasi log
logger.sendLog(
  logger.generateAuditLog('user123', 'login', {
    ip: '192.168.1.1',
    device: 'mobile'
  })
);