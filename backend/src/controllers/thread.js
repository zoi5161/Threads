const threadService = require("../services/thread");

const createThread = async (req, res) => {
  const { user_id, content, image_url } = req.body;
  try {
    const newThread = await threadService.createThread(
      user_id,
      content,
      image_url
    );
    res.status(201).json(newThread);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

const getThread = async (req, res) => {
  const { thread_id } = req.params;
  try {
    const thread = await threadService.getThread(thread_id);
    res.status(200).json(thread);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllThreads = async (req, res) => {
  try {
    const threads = await threadService.getAllThreads();
    res.status(200).json(threads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createThread,
  getThread,
  getAllThreads,
};