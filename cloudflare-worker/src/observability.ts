/**
 * Observability and Metrics
 * - Structured logging
 * - Prometheus-compatible metrics
 * - Cloudflare Logpush integration
 */

interface MetricLabels {
  [key: string]: string
}

interface Metric {
  name: string
  value: number
  labels: MetricLabels
  timestamp: number
}

interface LogEntry {
  timestamp: string
  level: 'info' | 'warn' | 'error'
  service: string
  event: string
  [key: string]: any
}

export class MetricsCollector {
  private kv: KVNamespace
  private metrics: Metric[] = []

  constructor(kv: KVNamespace) {
    this.kv = kv
  }

  /**
   * Increment counter metric
   */
  incrementCounter(name: string, labels: MetricLabels = {}): void {
    this.metrics.push({
      name: `${name}_total`,
      value: 1,
      labels,
      timestamp: Date.now(),
    })
  }

  /**
   * Set gauge metric
   */
  setGauge(name: string, value: number, labels: MetricLabels = {}): void {
    this.metrics.push({
      name,
      value,
      labels,
      timestamp: Date.now(),
    })
  }

  /**
   * Record histogram value
   */
  recordHistogram(name: string, value: number, labels: MetricLabels = {}): void {
    this.metrics.push({
      name: `${name}_bucket`,
      value,
      labels,
      timestamp: Date.now(),
    })
  }

  /**
   * Export metrics in Prometheus format
   */
  exportPrometheus(): string {
    const lines: string[] = []
    const metricGroups: Record<string, Metric[]> = {}

    // Group metrics by name
    for (const metric of this.metrics) {
      if (!metricGroups[metric.name]) {
        metricGroups[metric.name] = []
      }
      metricGroups[metric.name].push(metric)
    }

    // Format as Prometheus metrics
    for (const [name, metrics] of Object.entries(metricGroups)) {
      // Write metric type (if first occurrence)
      if (name.endsWith('_total')) {
        lines.push(`# TYPE ${name} counter`)
      } else if (name.endsWith('_bucket')) {
        lines.push(`# TYPE ${name} histogram`)
      } else {
        lines.push(`# TYPE ${name} gauge`)
      }

      // Write metric values
      for (const metric of metrics) {
        const labelStr = Object.entries(metric.labels)
          .map(([k, v]) => `${k}="${v}"`)
          .join(',')
        const labels = labelStr ? `{${labelStr}}` : ''
        lines.push(`${name}${labels} ${metric.value}`)
      }
    }

    return lines.join('\n') + '\n'
  }

  /**
   * Flush metrics to KV (for aggregation)
   */
  async flush(env: { METRICS_KV: KVNamespace }): Promise<void> {
    if (this.metrics.length === 0) {
      return
    }

    const timestamp = Date.now()
    const key = `metrics:${timestamp}:${Math.random().toString(36).substring(7)}`

    await env.METRICS_KV.put(key, JSON.stringify(this.metrics), {
      expirationTtl: 7 * 24 * 60 * 60, // 7 days
    })

    this.metrics = []
  }
}

/**
 * Structured logging
 */
export class StructuredLogger {
  private service: string

  constructor(service: string = 'qrsnap-api') {
    this.service = service
  }

  private createLogEntry(
    level: 'info' | 'warn' | 'error',
    event: string,
    data: Record<string, any> = {}
  ): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      service: this.service,
      event,
      ...data,
    }
  }

  info(event: string, data?: Record<string, any>): void {
    const entry = this.createLogEntry('info', event, data)
    console.log(JSON.stringify(entry))
  }

  warn(event: string, data?: Record<string, any>): void {
    const entry = this.createLogEntry('warn', event, data)
    console.warn(JSON.stringify(entry))
  }

  error(event: string, error?: Error | unknown, data?: Record<string, any>): void {
    const entry = this.createLogEntry('error', event, {
      ...data,
      error: error instanceof Error ? {
        message: error.message,
        stack: error.stack,
        name: error.name,
      } : String(error),
    })
    console.error(JSON.stringify(entry))
  }
}

/**
 * Request logging with metrics
 */
export async function logRequest(
  request: Request,
  response: Response,
  duration: number,
  metrics: MetricsCollector,
  logger: StructuredLogger,
  context?: {
    userId?: string
    ip?: string
    country?: string
  }
): Promise<void> {
  const method = request.method
  const path = new URL(request.url).pathname
  const status = response.status
  const ip = context?.ip || request.headers.get('CF-Connecting-IP') || 'unknown'
  const country = context?.country || (request.cf?.country as string | undefined) || 'unknown'

  // Increment request counter
  metrics.incrementCounter('http_requests', {
    method,
    status: status.toString(),
    path,
    country,
  })

  // Record response time
  metrics.recordHistogram('http_request_duration_ms', duration, {
    method,
    path,
  })

  // Log 429 (rate limit) events
  if (status === 429) {
    metrics.incrementCounter('rate_limit_hits', {
      ip,
      path,
    })
    logger.warn('rate_limit_exceeded', {
      ip,
      path,
      method,
      country,
    })
  }

  // Log 401/403 (auth failures)
  if (status === 401 || status === 403) {
    metrics.incrementCounter('auth_failures', {
      ip,
      path,
      status: status.toString(),
    })
    logger.warn('auth_failure', {
      ip,
      path,
      method,
      country,
      userId: context?.userId,
    })
  }

  // Log errors
  if (status >= 500) {
    metrics.incrementCounter('http_errors', {
      status: status.toString(),
      path,
    })
    logger.error('http_error', undefined, {
      ip,
      path,
      method,
      status,
      country,
    })
  }

  // Log successful requests (info level)
  if (status < 400) {
    logger.info('request_processed', {
      ip,
      path,
      method,
      status,
      duration,
      country,
      userId: context?.userId,
    })
  }
}

/**
 * Export metrics endpoint handler
 */
export async function handleMetricsExport(
  metrics: MetricsCollector
): Promise<Response> {
  const prometheus = metrics.exportPrometheus()

  return new Response(prometheus, {
    headers: {
      'Content-Type': 'text/plain; version=0.0.4',
      'Cache-Control': 'no-cache',
    },
  })
}

