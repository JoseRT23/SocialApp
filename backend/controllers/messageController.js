const Messages = require("../models/messageModel");

exports.newMessage = async (req, res, next) => {
    const newMessage = await Messages(req.body);

    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
        
    } catch (err) {
        res.status(500).json(err);
        next();
    }
}

exports.getMessages = async (req, res, next) => {
    try {
        const messages = await Messages.find({
            conversationId: req.params.convesationId,
        })
        res.status(200).json(messages);

    } catch (err) {
        res.status(500).json(err);
        next();        
    }
}