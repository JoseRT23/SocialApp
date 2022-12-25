const router = require("express").Router();
const messageController = require("../controllers/messageController");

//Añadir mensaje
router.post("/social/messages", messageController.newMessage);
//Buscar mensajes de una conversación
router.get("/social/messages/:convesationId", messageController.getMessages);


module.exports = router;