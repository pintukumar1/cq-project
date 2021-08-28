const { check, validationResult } = require("express-validator");
const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcrpyt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must at least 6 characters").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: "Email already exist" });
      }

      user = new User({
        email,
        password,
        name
      });
      const salt = await bcrpyt.genSalt(10);
      user.password = await bcrpyt.hash(password, salt);
      await user.save();
      // create a payload
      const payload = {
        user: {
          id: user.id
        }
      };
      const sign = config.get("jwtSecret");
      jwt.sign(payload, sign, { expiresIn: 36000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
