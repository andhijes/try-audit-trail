#!/bin/bash
# stop.sh - Script untuk menghentikan Graylog dan Elasticsearch cluster

echo "🛑 Menghentikan semua service..."

docker compose down

echo "🧹 Membersihkan jaringan..."

read -p "Hapus semua volume data? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    docker volume prune -f
fi

echo "✅ Semua service telah dihentikan"