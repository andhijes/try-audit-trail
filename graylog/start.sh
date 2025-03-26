#!/bin/bash

# 1. Setup jaringan
docker network inspect graylog_elastic_network >/dev/null 2>&1 || docker network create graylog_elastic_network

docker compose up -d

# 2. Verifikasi input GELF UDP
echo "Memastikan GELF UDP input aktif..."
sleep 20  # Tunggu Graylog inisialisasi

# 3. Auto-create GELF UDP input jika belum ada
docker exec graylog curl -u admin:admin -X POST \
  http://localhost:9000/api/system/inputs \
  -H 'Content-Type: application/json' \
  -d '{
    "title": "GELF UDP",
    "type": "org.graylog2.inputs.gelf.udp.GELFUDPInput",
    "configuration": {
      "bind_address": "0.0.0.0",
      "port": 12201,
      "recv_buffer_size": 1048576
    },
    "global": true
  }' 2>/dev/null || echo "Input mungkin sudah ada"

echo -e "\n✅ Sistem siap!"
echo "Graylog UI: http://localhost:9000"
echo "Test kirim log: echo '{\"version\":\"1.1\",\"message\":\"Test\"}' | nc -w1 -u localhost 12201"

