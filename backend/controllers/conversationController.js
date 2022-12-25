const Conversation = require("../models/conversationModel")

exports.newConversation = async (req, res, next) => {
    const newConversation = new Conversation({ 
        members: [req.body.senderId, req.body.receiverId],
     });

     try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
         
     } catch (err) {
         res.status(500).json(err);
         next();
     }
}

exports.getConversation = async (req, res, next) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] },
        });
        res.status(200).json(conversation);

    } catch (err) {
        res.status(500).json(err);
        next();
    }

}

exports.getConversationOfTwo = async (req, res, next) => {
    try {
        const conversation = await Conversation.findOne({
            members: {$all: [req.params.firstUser, req.params.secondUser]},
        })
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json(error);
        next();
    }
}
