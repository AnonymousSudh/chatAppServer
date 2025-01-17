const { Op } = require("sequelize");
const { Message } = require("../models/index")


const getPrevMessage = async (req, res) => {
    const { senderId, receiverId } = req.query;
    console.log("senderId",senderId)
    console.log("receiverId",receiverId)

    try {
        // Fetch messages where sender and receiver are the same (in both directions)
        const messages = await Message.findAll({
            where: {
                [Op.or]: [
                    {
                        senderId: senderId,
                        receiverId: receiverId,
                    },
                    {
                        senderId: receiverId,
                        receiverId: senderId,
                    },
                ],
            },
            order: [['createdAt', 'ASC']], // Orders messages by their creation time in ascending order
        });

        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { getPrevMessage }