const express = require("express");
const { User, Account } = require("../paytm.model.js");
const authMiddleware = require("../middleware.js");
const { default: mongoose } = require("mongoose");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  const account = await Account.findOne({ userId: req.body.userId });
  res.status(200).json({ balance: account.balance });
});

// bad solution for transaction
// router.post("/transfer", authMiddleware, async (req, res) => {
//   const { to, amount } = req.body;
//   const toaccount = await User.findById({ _id: to });
//   if (!toaccount) {
//     return res.status(401).json({ message: "invalid account " });
//   }
//   const account = await Account.findOne({ userId });
//   if (amount > account.balance) {
//     return res.status(403).json({ message: "Insufficient amount" });
//   }

//   await Account.updateOne(
//     { userId: to },
//     {
//       $inc: {
//         balance: amount,
//       },
//     }
//   );

//   await Account.updateOne(
//     {
//       userId: userId,
//     },
//     {
//       $inc: {
//         balance: amount,
//       },
//     }
//   );

//   res.status(200).json({ message: "TRANSACTION success!" });
// });

// better approach
router.post("/transfer", async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const { amount, to } = req.body;
  const account = await Account.findOne({ userId: req.userId }).session(
    session
  );
  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "insufficient balance",
    });
  }
  const toaccount = await Account.findOne({ userId: to }).session(session);
  if (!toaccount) {
    await session.abortTransaction();
    return res.status(401).json({ message: "invalid account" });
  }

  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);

  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(session);

  await session.commitTransaction();
  res.json({ message: "transaction successful" });
});

module.exports = router;
