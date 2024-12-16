const threadActionService = require("../services/thread_action");

const likeThread = async (req, res) => {
  const { thread_id } = req.body;
  const user_id = req.session.account.user_id;

  try {
    const likeThreadResponse = await threadActionService.likeThread(
      thread_id,
      user_id
    );
    res.status(200).json(likeThreadResponse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const unlikeThread = async (req, res) => {
  const { thread_id } = req.body;
  const user_id = req.session.account.user_id;

  try {
    const unlikeThreadResponse = await threadActionService.unlikeThread(
      thread_id,
      user_id
    );
    res.status(200).json(unlikeThreadResponse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const checkLikeStatus = async (req, res) => {
  const { thread_id } = req.body;
  const user_id = req.session.account.user_id;

  try {
    const checkLikeStatusResponse = await threadActionService.checkLikeStatus(
      thread_id,
      user_id
    );
    res.status(200).json(checkLikeStatusResponse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const followUser = async (req, res) => {
  const { follower_id } = req.body;
  const user_id = req.session.account.user_id;

  try {
    const followUserResponce = await threadActionService.followUser(user_id, follower_id);
    res.status(200).json( { message: followUserResponce});
  } catch(error) {
    res.status(500).json({ message: error.message});
  }
}

const unFollowUser = async (req, res) => {
  const user_id = req.session.account.user_id;
  const follower_id = req.params.user_id;

  try {
    const unFollowUserResponce = await threadActionService.unFollowUser(user_id, follower_id);
    res.status(200).json( { message: unFollowUserResponce});
  } catch(error) {
    res.status(500).json( { message: error.message});
  }
}

module.exports = {
  likeThread,
  unlikeThread,
  checkLikeStatus,
  followUser,
  unFollowUser,
};
