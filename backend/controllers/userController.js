const User = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.updateUser = async (req, res, next) => {
  if (req.body._id === req.params.idUser || req.body.isAdmin) {
    //Si el usuario solo intenta actualizar su contraseña
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(12);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        return res.status(500).json(error);
      }
    }
    //Si el usuario  intenta actualizar su informaciòn
      try {
        let user = await User.findByIdAndUpdate( req.params.idUser, {
            $set: req.body,
        });

        res.status(200).send({message : "Acount has been updated"});

      } catch (error) {
        res.status(500).json(error);
        next();
      }
  } else {
    return res.status(403).send({ message: "You can update only your acount!" });
  }
};

exports.deleteUser = async (req, res, next) => {
  if (req.body._id === req.params.idUser || req.body.isAdmin) {
    //Si el usuario intenta eliminar su informaciòn
      try {
        let user = await User.findByIdAndDelete({  _id : req.params.idUser })
        res.status(200).send({message : "Acount has been deleted"});
      
      } catch (error) {
        res.status(500).json(error);
        next();
      }
  } else {
    return res.status(403).send({ message: "You can delete only your acount!" });
  }
};

exports.getUser = async (req, res, next) => {
    const userId = req.query.userId;
    const username = req.query.username;
  try {
    const user = userId 
      ? await User.findById({ _id : userId })
      : await User.findOne({username : username});
    const { password, updatedAt, ...other } = user._doc
    res.status(200).json(other);
  } catch (error) {
    res.status(500).send({ message : "This user don't exist"});
    next();
  }
};

exports.followUser = async (req, res, next) => {
    //verificar que el usuario no sea el mismo
    if (req.body.idUser !== req.params.id) {
      try {
        //Usuario al que se va a seguir
        const user = await User.findById(req.params.id);
        //Usuario que esta tratando de seguir
        const currentUser = await User.findById(req.body.idUser);
        //Verificar si el usuario que vamos a seguir no esta seguido ya
        if (!user.followers.includes(req.body.idUser)) {
          await user.updateOne({ $push : { followers: req.body.idUser } });
          await currentUser.updateOne({ $push : { followings: req.params.id } });
          res.status(200).json({ message : "User has been followed" });
        }else {
          res.status(403).json({ message : "You allready follow this user" });
        }
      } catch (error) {
        res.status(500).json(error);
        next();
      }
    }else {
      res.status(403).json({ message : "You can't follow yourself" });      
    }
};

exports.unfollowUser = async (req, res, next) => {
      //verificar que el usuario no sea el mismo
      if (req.body.idUser !== req.params.id) {
        try {
          //Usuario al que se va a seguir
          const user = await User.findById(req.params.id);
          //Usuario que esta tratando de seguir
          const currentUser = await User.findById(req.body.idUser);
          //Verificar si el usuario que vamos a seguir no esta seguido ya
          if (user.followers.includes(req.body.idUser)) {
            await user.updateOne({ $pull : { followers: req.body.idUser } });
            await currentUser.updateOne({ $pull : { followings: req.params.id } });
            res.status(200).json({ message : "User has been unfollowed" });
          }else {
            res.status(403).json({ message : "You allready unfollow this user" });
          }
        } catch (error) {
          res.status(500).json(error);
          next();
        }
      }else {
        res.status(403).json({ message : "You can't unfollow yourself" });      
      }
};

  exports.getFriends = async (req, res, next) => {
    try {
      const user = await User.findById(req.params.idUser);
      const friends = await Promise.all(
        user.followings.map((friendId) => {
          return User.findById(friendId);
        })
      );
      let friendList = [];
      friends.map((friend) => {
        const {_id, username, profilePicture} = friend;
        friendList.push({_id, username, profilePicture});
      });
      res.status(200).json(friendList);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  exports.searchUser = async (req, res, next) => {
    const username = req.query.username;
    try {
      const user = await User.find({username : new RegExp(username, 'i')});
      res.status(200).json(user);
      
    } catch (error) {
      console.log(error);
      next();
    }
  }