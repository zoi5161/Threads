const Thread = require("../models/Thread");

const createThread = async (user_id, content, image_url = None) => {
  const thread = new Thread({
    user_id,
    content,
    image_url,
  });
  return await thread.save();
};

const getThread = async (thread_id) => {
    return await Thread.findById(thread_id);
};

const getAllThreads = async () => {
    return await Thread.find().sort({ createdAt: -1 }).limit(20);
};


module.exports = {
    createThread,
    getThread,
    getAllThreads,
};