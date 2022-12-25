const router = require("express").Router();
const conversationController = require("../controllers/conversationController");

//Nueva conversación
router.post("/social/conversations", conversationController.newConversation);
//Obtener conversación de un usuario
router.get("/social/conversations/:userId", conversationController.getConversation);
//Obtener conversación de dos usuarios
router.get("/social/conversations/find/:firstUser/:secondUser", conversationController.getConversationOfTwo);

module.exports = router;