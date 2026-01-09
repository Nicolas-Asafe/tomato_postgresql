export function createContext(req, res, route,manifest) {
  return {
    req,
    res,
    route,
    manifest: manifest || null,
    body: req.body || {},
    query: req.query || {},
    params: req.params || {},
    headers: req.headers || {},
    statusCode: route.status,
    data: null,
    error: null,
    routeParams: route.params,
    metadata: {
      timestamp: new Date().toISOString(),
      path: route.path,
      method: route.method,
      base: route.base
    }
  }
}