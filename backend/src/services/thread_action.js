const likeThreadSchema = require("../models/Like_Thread");
const Thread = require("../models/Thread");

const likeThread = async (thread_id, user_id) => {
  try {
    const originalThread = await Thread.findById(thread_id);
    if (!originalThread) {
      return { message: "Thread not found.", success: false };
    }

    // Check if the user has already liked the thread
    const thread = await likeThreadSchema.findOne({ thread_id });

    if (thread && thread.user_id.includes(user_id)) {
      return { message: "User has already liked this thread.", success: false };
    }

    // Add user_id to the like schema
    await likeThreadSchema.findOneAndUpdate(
      { thread_id },
      { $addToSet: { user_id } }, // Ensures no duplicate user_id
      { new: true, upsert: true }
    );

    // Increment the like count
    originalThread.like += 1;
    await originalThread.save();

    return { message: "Thread liked successfully!", success: true };
  } catch (error) {
    console.error("Error liking thread:", error);
    return { message: "Error liking thread.", success: false, error };
  }
};

const unlikeThread = async (thread_id, user_id) => {
  try {
    const originalThread = await Thread.findById(thread_id);
    if (!originalThread) {
      return { message: "Thread not found.", success: false };
    }

    const thread = await likeThreadSchema.findOne({ thread_id });

    if (!thread || !thread.user_id.includes(user_id)) {
      return { message: "User has not liked this thread.", success: false };
    }

    // Remove user_id from the like schema
    await likeThreadSchema.findOneAndUpdate(
      { thread_id },
      { $pull: { user_id } }, // Remove the user_id
      { new: true }
    );

    // Decrement the like count but ensure it doesn't go below zero
    originalThread.like = Math.max(originalThread.like - 1, 0);
    await originalThread.save();

    return { message: "Thread unliked successfully!", success: true };
  } catch (error) {
    console.error("Error unliking thread:", error);
    return { message: "Error unliking thread.", success: false, error };
  }
};

const checkLikeStatus = async (thread_id, user_id) => {
  try {
    const thread = await likeThreadSchema.findOne({ thread_id });

    if (!thread) {
      return { message: "Thread not found.", liked: false };
    }

    const liked = thread.user_id.includes(user_id);
    return { liked, success: true };
  } catch (error) {
    console.error("Error checking like status:", error);
    return { message: "Error checking like status.", liked: false, success: false, error };
  }
};

module.exports = {
  likeThread,
  unlikeThread,
  checkLikeStatus,
};
