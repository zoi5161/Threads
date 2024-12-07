const threadActionService = require("../services/thread_action");

const likeThread = async (req, res) => {
  const { thread_id, user_id } = req.body;
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
  const { thread_id, user_id } = req.body;
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
  const { thread_id, user_id } = req.body;
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
  // const urlParams = new URLSearchParams(window.location.search);
  // const account_id = urlParams.get('account_id');
  // const follower_id = urlParams.get('user_id');

  const { account_id, follower_id } = req.body;

  try {
    const followUserResponce = await threadActionService.followUser(account_id, follower_id);
    res.status(200).json( { message: followUserResponce});
  } catch(error) {
    res.status(500).json({ message: error.message});
  }
}

const unFollowUser = async (req, res) => {
  const account_id = req.body.account_id;
  const follower_id = req.params.user_id;

  try {
    const unFollowUserResponce = await threadActionService.unFollowUser(account_id, follower_id);
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
