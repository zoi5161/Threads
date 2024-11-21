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

module.exports = {
  likeThread,
  unlikeThread,
  checkLikeStatus,
};
