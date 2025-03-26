import requests
import datetime
import time
import random

# Konfigurasi OpenObserve yang diperbaiki
OPENOBSERVE_URL = "http://localhost:5080/api/default/audit_trail/_json"  # Perhatikan path
USERNAME = "admin@example.com"
PASSWORD = "ComplexPass123!"  # Sesuaikan dengan docker-compose.yml
STREAM_NAME = "audit_trail"  # Pastikan stream ini sudah ada

def generate_audit_event(user_id, action, status):
    return {
        "timestamp": datetime.datetime.utcnow().isoformat() + "Z",
        "user_id": user_id,
        "action": action,
        "status": status,
        "ip_address": f"192.168.1.{random.randint(1, 100)}",
        "service": "research_app"  # Tambahkan field tambahan untuk penelitian
    }

def send_to_openobserve(logs):
    try:
        response = requests.post(
            OPENOBSERVE_URL,
            json=logs,
            auth=(USERNAME, PASSWORD),
            headers={"Content-Type": "application/json"},
            timeout=5
        )
        print(f"Status: {response.status_code}, Response: {response.json()}")
    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    # Tambahkan pengecekan koneksi terlebih dahulu
    print("Testing connection to OpenObserve...")
    try:
        health_check = requests.get("http://localhost:5080/ready", timeout=3)
        print(f"OpenObserve health status: {health_check.status_code}")
    except Exception as e:
        print(f"Failed to connect to OpenObserve: {str(e)}")
        exit(1)

    # Generate sample logs
    users = ["researcher_1", "researcher_2", "supervisor"]
    actions = ["data_access", "config_change", "auth_attempt"]
    
    print("Sending sample audit logs...")
    for i in range(10):
        log = generate_audit_event(
            user_id=random.choice(users),
            action=random.choice(actions),
            status="success" if random.random() > 0.3 else "failed"
        )
        send_to_openobserve([log])
        time.sleep(0.5)