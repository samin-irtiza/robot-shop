FROM node:14

ENV INSTANA_AUTO_PROFILE true
ENV OTEL_METRICS_EXPORTER=none
ENV OTEL_TRACES_EXPORTER=otlp
ENV OTEL_EXPORTER_OTLP_PROTOCOL=grpc
ENV OTEL_SERVICE_NAME=catalogue-service
ENV OTEL_EXPORTER_OTLP_ENDPOINT=otel-collector.badhansaha.tech:4317
ENV OTEL_EXPORTER_OTLP_INSECURE=true

EXPOSE 8080

WORKDIR /opt/server

COPY package.json /opt/server/

RUN npm install

COPY server.js /opt/server/

CMD ["node", "--require", "@opentelemetry/auto-instrumentations-node/register", "server.js"]


