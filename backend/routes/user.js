const express = require("express");
const router = express.Router();
const JWT_SECRET = require("../config.js");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const { User } = require("../paytm.model.js");
const authMiddleware = require("../middleware.js");

const userSchemasignup = z.object({
  userName: z.string().email(),
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

    const validationResult = userSchemasignup.safeParse(req.body);
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

const userSchemasignin = z.object({
  userName: z.string().email(),
  password: z.string(),
});

router.post("/signin", async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password)
      return res.status(401).json({ message: "All fields are required" });
    const validationResult = userSchemasignin.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ message: validationResult.error.errors });
    }

    const findUser = await User.findOne({ userName: userName });
    if (!findUser) {
      return res.status(401).json({ message: "invalid credentials" });
    }

    if (findUser.password != password)
      return res.status(401).json({ message: "invalid credentials" });

    const token = jwt.sign({ userId: findUser._id }, JWT_SECRET);

    res
      .status(200)
      .json({ message: "User logged in successfully", token: token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const userSchemaupdate = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  password: z.string().optional(),
});

router.post("/update", authMiddleware, async (req, res) => {
  try {
    const validationResult = userSchemaupdate.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ message: validationResult.error.errors });
    }

    const finduser = await User.findByIdAndUpdate({ _id: userId }, req.body);

    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/bulk", async (req, res) => {
  try {
    const filter = req.query.filter || "";
    const findUsers = await User.find({
      $or: [
        {
          firstName: { $regex: filter },
        },
        {
          lastName: { $regex: filter },
        },
      ],
    });

    res.json({
      message: "users fetched",
      filteredusers: findUsers.map((user) => ({
        _id: user._id,
        userName: user.userName,
        lastName: user.lastName,
        firstName: user.firstName,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: "Some eror occured" });
  }
});

module.exports = router;
