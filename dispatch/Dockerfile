FROM golang:1.20

# Set environment variables for OpenTelemetry configuration
ENV OTEL_METRICS_EXPORTER=none
ENV OTEL_TRACES_EXPORTER=otlp
ENV OTEL_EXPORTER_OTLP_PROTOCOL=grpc
ENV OTEL_SERVICE_NAME=cart-service-1
ENV OTEL_EXPORTER_OTLP_ENDPOINT=otelcol:4317
ENV OTEL_EXPORTER_OTLP_INSECURE=true

WORKDIR /go/src/app

# Copy your Go application files into the container
COPY *.go .

# Install otel-launcher-go
RUN go get -u github.com/open-telemetry/opentelemetry-go-contrib/instrumentation/auto-instrumentation/otel-launcher-go

# Build the Go application with automatic instrumentation
RUN otel-launcher-go build

# CMD to run the application
CMD ["./main"]