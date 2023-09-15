FROM python:3.10-slim-buster

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /hacks_ai

COPY requirements.txt /tmp/
RUN pip install --upgrade pip \
    && apt-get update \
    && pip install -r /tmp/requirements.txt
    

COPY . /hacks_ai