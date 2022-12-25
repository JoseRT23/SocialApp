const router = require("express").Router();
const userController = require("../controllers/userController");

//Actualizar usuario
router.put("/social/users/:idUser", userController.updateUser);
//Eliminar usuario
router.delete("/social/users/:idUser", userController.deleteUser);
//Obtener usuario
router.get("/social/users/", userController.getUser);
//Segir usuario
router.put("/social/users/:id/follow", userController.followUser);
//Dejar de seguir usuario
router.put("/social/users/:id/unfollow", userController.unfollowUser);
//Buscar amigos de un usuario
router.get("/social/users/friends/:idUser", userController.getFriends);
//Buscar usuarios en la app
router.get("/social/users/search/", userController.searchUser);

module.exports = router;
