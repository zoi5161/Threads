const likeThreadSchema = require("../models/Like_Thread");
const Thread = require("../models/Thread");
const User = require("../models/User");

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

    return { message: "Thread liked successfully!", success: true, likeCnt: originalThread.like };
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

    return { message: "Thread unliked successfully!", success: true, likeCnt: originalThread.like };
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
    const originalThread = await Thread.findById(thread_id);
    return { liked, success: true, likeCnt: originalThread.like };
  } catch (error) {
    console.error("Error checking like status:", error);
    return { message: "Error checking like status.", liked: false, success: false, error };
  }
};



const followUser = async (account_id, follower_id) => {
  try {
    // Tìm người dùng chủ động (người muốn theo dõi)
    const userFollow = await User.findOne({ user_id: account_id });
    if (!userFollow) {
      return "User to follow not found";  // Nếu không tìm thấy người dùng chủ động
    }

    // Tìm người dùng bị theo dõi
    const userIsFollowed = await User.findOne({ user_id: follower_id });
    if (!userIsFollowed) {
      return "User to be followed not found";  // Nếu không tìm thấy người dùng bị theo dõi
    }

    // Kiểm tra xem người chủ động đã follow người bị động chưa
    if (userFollow.following.includes(follower_id)) {
      return "You are already following this user";  // Nếu đã theo dõi rồi thì không làm gì thêm
    }

    // Cập nhật mảng following của người chủ động (thêm vào người bị follow)
    userFollow.following.push(follower_id);
    await userFollow.save();

    // Cập nhật mảng followers của người bị follow (thêm vào người chủ động)
    userIsFollowed.followers.push(account_id);
    await userIsFollowed.save();

    return "Followed successfully";  // Trả về thông báo thành công
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while trying to follow the user");
  }
};

const unFollowUser = async (account_id, follower_id) => {
  try {
    // Tìm người dùng chủ động (người muốn theo dõi)
    const userFollow = await User.findOne({ user_id: account_id });
    if (!userFollow) {
      return "User to follow not found";  // Nếu không tìm thấy người dùng chủ động
    }

    // Tìm người dùng bị theo dõi
    const userIsFollowed = await User.findOne({ user_id: follower_id });
    if (!userIsFollowed) {
      return "User to be followed not found";  // Nếu không tìm thấy người dùng bị theo dõi
    }

    // Kiểm tra xem người chủ động đã follow người bị động chưa
    if (!userFollow.following.includes(follower_id)) {
      return "You are already un-following this user";  // Nếu không có theo dõi sẵn thì không làm gì thêm
    }
    

    // Cập nhật mảng following của người chủ động (thêm vào người bị follow)
    let idx = userFollow.following.indexOf(follower_id);
    if (idx !== -1) {
      userFollow.following.splice(idx, 1);
      await userFollow.save();
    }

    // Cập nhật mảng followers của người bị follow (thêm vào người chủ động)
    idx = userIsFollowed.followers.indexOf(account_id);
    if (idx !== -1) {
      userIsFollowed.followers.splice(idx, 1);
      await userIsFollowed.save();
    }

    return "Un Followed successfully";  // Trả về thông báo thành công
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while trying to un follow the user");
  }
}

module.exports = {
  likeThread,
  unlikeThread,
  checkLikeStatus,
  followUser,
  unFollowUser,
};
