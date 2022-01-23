FROM python:3
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

COPY . .

RUN pip install -r requirements.txt

WORKDIR ./Source

CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 main:app