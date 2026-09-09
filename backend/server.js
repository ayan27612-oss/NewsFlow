```javascript
const http = require("http");

const PORT = 3000;

const server = http.createServer((req, res) => {
  // Allow JSON responses
  res.setHeader("Content-Type", "application/json");

  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle browser preflight requests
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // Health check
  if (req.method === "GET" && req.url === "/api/health") {
    res.writeHead(200);
    res.end(
      JSON.stringify({
        success: true,
        message: "NewsForge backend is running",
        status: "healthy",
        timestamp: new Date().toISOString()
      })
    );
    return;
  }

  // API root
  if (req.method === "GET" && req.url === "/api") {
    res.writeHead(200);
    res.end(
      JSON.stringify({
        success: true,
        name: "NewsForge API",
        version: "1.0.0"
      })
    );
    return;
  }

  // 404
  res.writeHead(404);
  res.end(
    JSON.stringify({
      success: false,
      error: "Route not found"
    })
  );
});

server.listen(PORT, () => {
  console.log(`NewsForge backend running at http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
```
