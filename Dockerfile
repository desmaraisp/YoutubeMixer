FROM python:3
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

COPY . .

RUN python -m pip install -r requirements.txt

WORKDIR ./Source

CMD exec python manage.py collectstatic
CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 1500 YoutubeMixer_project.wsgi