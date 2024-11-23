const threadService = require("../services/thread");

const createThread = async (req, res) => {
  const { user_id, content, image_url, root_thread, media_type } = req.body;
  try {
    const newThread = await threadService.createThread(
      user_id,
      content,
      image_url,
      root_thread,
      media_type
    );
    console.log('Created thread:', newThread);
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

const createComment = async (req, res) => {
  const { user_id, content, image_url, root_thread, media_type } = req.body;
  try {
    const newComment = await threadService.createComment(
      user_id,
      content,
      image_url,
      root_thread,
      media_type
    );
    res.status(201).json(newComment);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

const getComment = async (req, res) => {
  const { thread_id } = req.params;
  try {
    const comments = await threadService.getComment(thread_id);
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createThread,
  getThread,
  getAllThreads,
};
