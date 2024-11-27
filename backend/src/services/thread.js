const Thread = require("../models/Thread");

const createThread = async (user_id, content, image_url = null, root_thread = null, media_type = null) => {
  const thread = new Thread({
    user_id,
    content,
    image_url,
    root_thread,
    media_type,
  });
  return await thread.save();
};

const getThread = async (thread_id) => {
    return await Thread.findById(thread_id);
};

const getAllThreads = async () => {
    return await Thread.find().sort({ createdAt: -1 }).limit(20);
};

const createComment = async (user_id, content, image_url = null, root_thread = null, media_type = null) => {
    const thread = new Thread({
        user_id,
        content,
        image_url,
        root_thread,
        media_type,
    });
    await thread.save();

    original_thread = await Thread.findById(root_thread);
    original_thread.comment += 1;
    await original_thread.save();

    console.log("Comment created successfully for thread:", original_thread);
    return thread;
};

const getComment = async (thread_id) => {
    return await Thread.find({ root_thread: thread_id }).sort({ createdAt: -1 });
};

module.exports = {
    createThread,
    getThread,
    getAllThreads,
    createComment,
    getComment,
};