const http = require("http");

const PORT = 3000;

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === "GET" && req.url === "/api/health") {
    res.writeHead(200);
    res.end(
      JSON.stringify({
        success: true,
        message: "NewsFlow backend is running",
        status: "healthy",
        timestamp: new Date().toISOString()
      })
    );
    return;
  }

  if (req.method === "GET" && req.url === "/api") {
    res.writeHead(200);
    res.end(
      JSON.stringify({
        success: true,
        name: "NewsFlow API",
        version: "1.0.0"
      })
    );
    return;
  }

  res.writeHead(404);
  res.end(
    JSON.stringify({
      success: false,
      error: "Route not found"
    })
  );
});

server.listen(PORT, () => {
  console.log(`NewsFlow backend running at http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
