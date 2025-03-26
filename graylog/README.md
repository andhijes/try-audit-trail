# Graylog Audit Trail Implementation Guide

https://go2docs.graylog.org/current/home.htm

## Overview
This project demonstrates how to implement an audit trail system using Graylog, Python, and Docker for local development.

## Prerequisites
- Docker and Docker Compose
- Python 3.x
- Python library: `graypy`

## Setup Instructions

### 1. Start Services with Docker
```bash
chmod +x start.sh

./start.sh
```

Wait 2-5 minutes for all containers to initialize.

### 2. Access Services
- **Elasticsearch**: http://localhost:9200
- **Graylog UI**: http://localhost:9000 (login: admin/admin)

## Configuration

### Graylog Input Setup
1. Navigate to: **System → Inputs**
2. Select **GELF UDP**
3. Configure:
   - Title: `GELF UDP Audit`
   - Port: `12201`
   - Bind address: `0.0.0.0`

### Create Audit Stream
1. Go to **Streams → Create stream**
2. Name: `Audit Trail Stream`
3. Add rule:
   ```
   Field: event_type
   Condition: exists
   ```

## Running the Audit Logger

### Install Dependencies
```bash
pip install graypy
```

### Execute Python Script
```bash
python audit_logger.py
```

Sample output:
```python
{"event_type": "audit_debug", "message": "TEST CONNECTION", "user": "debug_user"}
Log sent successfully!
```

## Verifying Logs
1. Open **Search** in Graylog UI
2. Use query:
   ```
   event_type:"audit_debug"
   ```
3. Logs should appear within seconds

## Troubleshooting Guide

| Issue | Solution |
|-------|----------|
| Graylog inaccessible | Check `docker logs graylog` |
| Logs not appearing | Verify GELF UDP input and Python connection |
| Elasticsearch errors | Run `docker-compose restart` |

## Project Structure
```
graylog-audit-trail/
├── docker-compose.yml      # Graylog + Elasticsearch config
├── audit_logger.py         # Python audit log script
└── README.md
```

## Customization Options
- Modify log fields by editing `audit_logger.py`
- Add database storage (MongoDB/SQL) to the Python script

## Sample Python Code
```python
import logging
import graypy

# Configure logger
logger = logging.getLogger('audit_logger')
logger.setLevel(logging.INFO)

# Setup GELF UDP handler
handler = graypy.GELFUDPHandler('localhost', 12201)
logger.addHandler(handler)

# Sample audit log
log_data = {
    "event_type": "user_login",
    "message": "Authentication successful",
    "_user": "admin",
    "_ip": "192.168.1.1"
}

logger.info(log_data)
print("Audit log sent to Graylog!")
```

## Important Notes
- For production environments, enable authentication and HTTPS
- Adjust memory allocation in `docker-compose.yml` for limited resources

## License
MIT

**For support:** [your-contact@email.com]