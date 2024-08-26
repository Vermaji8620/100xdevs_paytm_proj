const express = require("express");
const router = express.Router();
const JWT_SECRET = require("../config.js");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const { User } = require("../paytm.model.js");

const userSchema = z.object({
  userName: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
});

router.post("/signup", async (req, res) => {
  try {
    const { userName, password, firstName, lastName } = req.body;
    if (!userName || !password || !firstName || !lastName) {
      return res.status(401).json({ message: "All fields are required" });
    }

    const validationResult = userSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ message: validationResult.error.errors });
    }

    const findDuplicate = await User.findOne({ userName: userName });
    if (findDuplicate)
      return res.status(401).json({ message: "User already exists" });

    const user = await User.create({
      userName: userName,
      firstName: firstName,
      lastName: lastName,
      password: password,
    });
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res
      .status(200)
      .json({ message: "user registered successfully", token: token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
