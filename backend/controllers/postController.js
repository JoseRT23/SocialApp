const Post = require("../models/postModel");
const User = require("../models/userModel");

exports.createPost = async (req, res, next) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json(error);
        next();
    }
}

exports.updatePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.idPost);
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json({ message : "Post has been updated" });
        }else {
            res.status(403).json({ message : "You can update only your post" });
            next();
        }        
    } catch (error) {
        res.status(500).json(error);
        next();
    }
}

exports.deletePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.idPost);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json({ message : "Post has been deleted" });
        }else {
            res.status(403).json({ message : "You can delete only your post" });
            next();
        }        
    } catch (error) {
        res.status(500).json(error);
        next();
    }
}

exports.likeAndDislikePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.idPost);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId }});
            res.status(200).json({ message : "The post has been liked" });
        }else {
            await post.updateOne({ $pull: { likes: req.body.userId }});
            res.status(200).json({ message : "The post has been disliked" });
        }
    } catch (error) {
        res.status(500).json(error);
        next();
    }
}

exports.getPost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.idPost);
        res.status(200).json(post);        
    } catch (error) {
        res.status(500).json(error);
        next();
    }
}

exports.getTimeline = async (req, res, next) => {
    try {
        //Buscar el usuario actual
        //Buscar todas las publicaciones de este usuario
        const currentUser = await User.findById(req.params.idUser);
        const userPosts = await Post.find({ userId: currentUser._id });
        //Buscar las publicaciones de las personas seguidas
        const friendPost = await Promise.all(
            currentUser.followings.map(friendId => {
                return Post.find({ userId: friendId })
            })
        );
        res.json(userPosts.concat(...friendPost));
    } catch (error) {
        res.status(500).json(error);
        next();
    }
}

exports.getUserPosts = async (req, res, next) => {
    try {
        const user = await User.findOne({username : req.params.username});
        const posts = await Post.find({userId : user._id});
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error);
        next();
    }
}