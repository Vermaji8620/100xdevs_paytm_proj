const express = require("express");
const { User, Account } = require("../paytm.model.js");
const authMiddleware = require("../middleware.js");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  const account = await Account.findOne({ userId: req.body.userId });
  res.status(200).json({ balance: account.balance });
});




module.exports = router;
