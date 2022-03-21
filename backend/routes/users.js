const router = require("express").Router();
const userController = require("../controllers/userController");

//Actualizar usuario
router.put("/social/users/:idUser", userController.updateUser);
//Eliminar usuario
router.delete("/social/users/:idUser", userController.deleteUser);
//Obtener usuario
router.get("/social/users/:idUser", userController.getUser);
//Segir usuario
router.put("/social/users/:idUser/follow", userController.followUser);
//Dejar de seguir usuario
router.put("/social/users/:idUser/unfollow", userController.unfollowUser);

module.exports = router;
