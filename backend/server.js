const http = require("http");
const healthCheck = require("./routes/health");

const PORT = 3000;

const server = http.createServer((req, res) => {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle browser preflight requests
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // Health check route
  if (req.method === "GET" && req.url === "/api/health") {
    healthCheck(req, res);
    return;
  }

  // API root
  if (req.method === "GET" && req.url === "/api") {
    res.writeHead(200, {
      "Content-Type": "application/json"
    });

    res.end(
      JSON.stringify({
        success: true,
        name: "NewsFlow API",
        version: "1.0.0"
      })
    );

    return;
  }

  // 404
  res.writeHead(404, {
    "Content-Type": "application/json"
  });

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
