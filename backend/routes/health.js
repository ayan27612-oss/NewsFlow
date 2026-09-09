function healthCheck(req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");

  res.end(
    JSON.stringify({
      success: true,
      service: "NewsFlow API",
      status: "healthy",
      timestamp: new Date().toISOString()
    })
  );
}

module.exports = healthCheck;
