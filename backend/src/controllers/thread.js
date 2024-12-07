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

const getNewestThreads = async (req, res) => {
  try {
    const threads = await threadService.getNewestThreads();
    res.status(200).json(threads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getReplyThreads = async (req, res) => {
  try {
    const threads = await threadService.getReplyThreads();
    res.status(200).json(threads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getLikeThreads = async (req, res) => {
  try {
    const threads = await threadService.getLikeThreads();
    res.status(200).json(threads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCommentThreads = async (req, res) => {
  try {
    const threads = await threadService.getCommentThreads();
    res.status(200).json(threads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getThreadByUser = async (req, res) => {
  const { user_id } = req.params;
  try {
    const threads = await threadService.getThreadByUser(user_id);
    res.status(200).json(threads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getLikedThreads = async (req, res) => {
  // const { user_id } = req.params;
  const user_id = "1111";
  try {
    const threads = await threadService.getLikedThreads(user_id);
    res.status(200).json(threads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCommentedThreads = async (req, res) => {
  // const { user_id } = req.params;
  const user_id = "1111";
  try {
    const threads = await threadService.getCommentedThreads(user_id);
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

const getLikePost = async (req, res) => {
  const {thread_id} = req.params;
  console.log(">> CHECK BE thread_id: ", thread_id);
  try {
    const likePost = await threadService.getLikePost(thread_id);
    console.log(likePost);
    res.status(200).json(likePost);
  } catch(error) {
    res.status(500).json({ message: error.message});
  }
}

module.exports = {
  createThread,
  getThread,
  getAllThreads,

  getNewestThreads,
  getReplyThreads,
  getLikeThreads,
  getCommentThreads,
  getThreadByUser,
  getLikedThreads,
  getCommentedThreads,
  
  createComment,
  getComment,

  getLikePost,
};
