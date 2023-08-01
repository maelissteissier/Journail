FROM python:3.10-alpine

WORKDIR /journail_api

COPY . /journail_api

RUN pip3 install --no-cache-dir -r requirements.txt

EXPOSE 5000

CMD ["python", "app.py"]