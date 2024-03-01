'use strict';

const opentelemetry = require('@opentelemetry/api');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
const { SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-grpc');
const grpc = require('@grpc/grpc-js');
const { ZipkinExporter } = require('@opentelemetry/exporter-zipkin');
const { GrpcInstrumentation } = require('@opentelemetry/instrumentation-grpc');
const { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-base')

const EXPORTER = process.env.OTEL_TRACES_EXPORTER || 'otlp';
const OTEL_EXPORTER_OTLP_ENDPOINT = process.env.OTEL_EXPORTER_OTLP_ENDPOINT
module.exports = (serviceName) => {
  const provider = new NodeTracerProvider({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
    }),
  });
  let otlpConfig = {
    url: OTEL_EXPORTER_OTLP_ENDPOINT
  };
  let exporter;
  switch (EXPORTER.toLowerCase()) {
    case 'zipkin':
      exporter = new ZipkinExporter();
      break;
    case 'jaeger':
      exporter = new OTLPTraceExporter(otlpConfig);
      break;
    
    default:
      exporter = new OTLPTraceExporter(otlpConfig);
      break;
  }

  provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
  provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
  

  // Initialize the OpenTelemetry APIs to use the NodeTracerProvider bindings
  provider.register();

  registerInstrumentations({
    instrumentations: [
      new GrpcInstrumentation(),
    ],
  });

  return opentelemetry.trace.getTracer('cart');
};