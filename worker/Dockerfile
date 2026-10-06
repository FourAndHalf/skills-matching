# syntax=docker/dockerfile:1
FROM python:3.12-slim
WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
COPY worker ./worker
COPY shared ./shared
USER nobody
CMD ["python", "-m", "worker"]
