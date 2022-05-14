const router = require("express").Router();
const postController = require("../controllers/postController");

    //Crear posts
    router.post("/social/posts", postController.createPost);
    //Actualizar posts
    router.put("/social/posts/:idPost", postController.updatePost);
    //Eliminar posts
    router.delete("/social/posts/:idPost", postController.deletePost);
    //Me gusta/no me gusta posts
    router.put("/social/posts/:idPost/reaction", postController.likeAndDislikePost);
    //Obtener posts
    router.get("/social/posts/:idPost", postController.getPost);
    //Obtener post de las personas que seguimos
    router.get("/social/posts/timeline/:idUser", postController.getTimeline);
    //Obtener posts de cierta persona
    router.get("/social/profile/:username", postController.getUserPosts);

module.exports = router;
