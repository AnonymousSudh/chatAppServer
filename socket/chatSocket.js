const { Op } = require('sequelize');
// const User = require('../models/user');
const { User, Message } = require("../models/index")

const chatSocket = (io) => {
  const onlineUser = {};
  io.on('connection', (socket) => {
    console.log('A user connected: ' + socket.id);
    console.log(socket.handshake.query.userId, "socket.handshake.query")
    const userId = socket?.handshake?.query?.userId;

    if (userId !== "undefined") {
      onlineUser[userId] = socket.id;
      console.log(onlineUser, "online user")
      io.emit('onlineUsers', Object.keys(onlineUser));
    }
    // Listen for messages
    socket.on('sendMessage', async ({ senderId, receiverMobileNumber, content, receiverId }) => {
      console.log("Message send from id ", senderId, " to Mobile number", receiverMobileNumber, content, receiverId);
      const recieverSocketId = onlineUser[receiverId]
      console.log(recieverSocketId, "reciever socket id")


      if (recieverSocketId) {
        console.log("sent a  message")
        console.log("Receiver Socket ID:", recieverSocketId);

        io.to(recieverSocketId).emit("receiveMessage", { senderId, receiverId, content });

        // Save the message to the database
        const messageData = { senderId, receiverId, content };
        const savedMessage = await Message.create(messageData);
      } else {
        console.log("Receiver is not online, saving message to database only");
        // Save the message for later delivery
        const messageData = { senderId, receiverId, content };
        await Message.create(messageData);
      }

    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('A user disconnected: ' + socket.id);
      const userId = Object.keys(onlineUser).find(key => onlineUser[key] === socket.id);
      if (userId) {
        delete onlineUser[userId];
        
        // Notify all clients about the updated online user list
        io.emit('onlineUsers', Object.keys(onlineUser));
        console.log(`User ${userId} removed from online users`);
      }
      // onlineUser.delete(socket.id)
    });
  });
};

module.exports = chatSocket;
