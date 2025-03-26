import logging
import graypy
import json

logger = logging.getLogger('audit')
logger.setLevel(logging.INFO)

# Pastikan menggunakan format GELF yang valid
handler = graypy.GELFUDPHandler('localhost', 12201)
logger.addHandler(handler)

# Gunakan format ini untuk log
log_message = {
    "short_message": "Audit event",
    "full_message": json.dumps({
        "event_type": "audit",
        "action": "debug",
        "user": "admin"
    }),
    "level": 6,
    "_event_type": "audit_debug",  # Field khusus Graylog
    "_user": "debug_user"
}

logger.info(log_message)
