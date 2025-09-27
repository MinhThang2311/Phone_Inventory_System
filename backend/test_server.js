const express = require("express");
const app = express();

// Test route  
app.get("/test", (req, res) => {
  res.json({ message: "API is working!", timestamp: new Date() });
});

const PORT = 5002;
app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
});