const { Resource } = require("@opentelemetry/resources");
const { SemanticResourceAttributes } = require("@opentelemetry/semantic-conventions");
const { SimpleSpanProcessor } = require("@opentelemetry/sdk-trace-base");
const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node");
const { trace } = require("@opentelemetry/api");

// Instrumentations
const { ExpressInstrumentation } = require("opentelemetry-instrumentation-express");
const { MongoDBInstrumentation } = require("@opentelemetry/instrumentation-mongodb");
const { HttpInstrumentation } = require("@opentelemetry/instrumentation-http");
const { registerInstrumentations } = require("@opentelemetry/instrumentation");

// Jaeger Exporter
const { JaegerExporter } = require("@opentelemetry/exporter-jaeger");

module.exports = (serviceName) => {
  // jaeger exporter instance
  const jaegerExporter = new JaegerExporter({
    endpoint: "http://localhost:14268/api/traces",
  });

  const provider = new NodeTracerProvider({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
    }),
  });

  // add the Jaeger exporter to the provider
  provider.addSpanProcessor(new SimpleSpanProcessor(jaegerExporter));
  
  // register provider so it becomes active
  provider.register();

  // register instrumentations to capture tracing data
  registerInstrumentations({
    instrumentations: [
      new HttpInstrumentation(),
      new ExpressInstrumentation(),
      new MongoDBInstrumentation(),
    ],
    tracerProvider: provider,
  });

  return trace.getTracer(serviceName);
};
const { Resource } = require("@opentelemetry/resources");
const { SemanticResourceAttributes } = require("@opentelemetry/semantic-conventions");
const { SimpleSpanProcessor } = require("@opentelemetry/sdk-trace-base");
const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node");
const { trace } = require("@opentelemetry/api");

// Instrumentations
const { ExpressInstrumentation } = require("opentelemetry-instrumentation-express");
const { MongoDBInstrumentation } = require("@opentelemetry/instrumentation-mongodb");
const { HttpInstrumentation } = require("@opentelemetry/instrumentation-http");
const { registerInstrumentations } = require("@opentelemetry/instrumentation");

// Jaeger Exporter
const { JaegerExporter } = require("@opentelemetry/exporter-jaeger");

module.exports = (serviceName) => {
  // jaeger exporter instance
  const jaegerExporter = new JaegerExporter({
    endpoint: "http://localhost:14268/api/traces",
  });

  const provider = new NodeTracerProvider({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
    }),
  });

  // add the Jaeger exporter to the provider
  provider.addSpanProcessor(new SimpleSpanProcessor(jaegerExporter));
  
  // register provider so it becomes active
  provider.register();

  // register instrumentations to capture tracing data
  registerInstrumentations({
    instrumentations: [
      new HttpInstrumentation(),
      new ExpressInstrumentation(),
      new MongoDBInstrumentation(),
    ],
    tracerProvider: provider,
  });

  return trace.getTracer(serviceName);
};
