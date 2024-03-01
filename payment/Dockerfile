FROM python:3.9

EXPOSE 8080
USER root

ENV INSTANA_SERVICE_NAME=payment
# Set OpenTelemetry agent configuration via environment variables

ENV OTEL_METRICS_EXPORTER=none
ENV OTEL_TRACES_EXPORTER=otlp
ENV OTEL_EXPORTER_OTLP_PROTOCOL=grpc
ENV OTEL_SERVICE_NAME=payment-service
ENV OTEL_EXPORTER_OTLP_ENDPOINT=otel-collector.badhansaha.tech:4317
ENV OTEL_EXPORTER_OTLP_INSECURE=true

WORKDIR /app

COPY requirements.txt /app/

RUN pip install -r requirements.txt

COPY *.py /app/
COPY payment.ini /app/
RUN opentelemetry-bootstrap -a install
#CMD ["python", "payment.py"]
CMD ["opentelemetry-instrument", "uwsgi", "--ini", "payment.ini"]

