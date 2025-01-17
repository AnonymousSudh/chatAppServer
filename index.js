const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config({ path: "./.env" });

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000; // Use process.env.PORT (uppercase) for standard naming

// CORS Middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Use * to allow all origins or specify your frontend URL
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", true);

  if (req.method === "OPTIONS") {
    res.sendStatus(200); // Preflight request response
  } else {
    next();
  }
});

const apiRouter = require("./routes/index");
app.use("/api", apiRouter); // Define API routes here

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins
    methods: ["GET", "POST"],
    credentials: true
  },
});
// Socket.io configuration
const chatSocket = require("./socket/chatSocket");
chatSocket(io);


// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
