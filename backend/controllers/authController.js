const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  const newUser = new User(req.body);
  newUser.password = await bcrypt.hash(req.body.password, 12);

  try {
    await newUser.save();
    res.status(200).json({ message: "New user created" });
  } catch (error) {
    console.log(error);
    res.json({ message: "An error has ocurred" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    await res.status(401).send({ message: "Incorrect email" });
    next();
  } else {
    if (!bcrypt.compareSync(password, user.password)) {
      await res.status(401).send({ message: "Incorrect password" });
      next();
    } else {
      //Firmar token si todo es correcto
      const token = jwt.sign(
        {
          email: user.email,
          username: user.username,
          id: user._id,
        },
        "SECRET_KEY"
      ); //se puede añadir fecha de caoudicidad al token

      res.send({ token });
    }
  }
};
