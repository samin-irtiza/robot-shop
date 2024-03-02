FROM golang:1.20

ENV OTEL_METRICS_EXPORTER=none
ENV OTEL_TRACES_EXPORTER=otlp
ENV OTEL_EXPORTER_OTLP_PROTOCOL=grpc
ENV OTEL_SERVICE_NAME=dispatch-service
ENV OTEL_EXPORTER_OTLP_ENDPOINT=otelcol:4317
ENV OTEL_EXPORTER_OTLP_INSECURE=true

WORKDIR /go/src/app

COPY *.go .

RUN go mod init dispatch && go get
RUN go install
RUN go get -u go.opentelemetry.io/otel

CMD dispatch
