import express from "express";
import Task from "../models/Task.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.user });
  res.json(tasks);
});

router.post("/", auth, async (req, res) => {
  const task = await Task.create({ userId: req.user, title: req.body.title });
  res.json(task);
});

router.put("/:id", auth, async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user },
    { $set: req.body },
    { new: true }
  );
  res.json(task);
});

router.delete("/:id", auth, async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, userId: req.user });
  res.json({ msg: "Deleted" });
});

export default router;