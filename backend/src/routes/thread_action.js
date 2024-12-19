const express = require("express");
const router = express.Router();
const threadActionController = require("../controllers/thread_action");

router.post("/like", threadActionController.likeThread);

router.post("/unlike", threadActionController.unlikeThread);

router.post("/check_like", threadActionController.checkLikeStatus);

router.post("/follow", threadActionController.followUser);

router.put("/unfollow/:user_id", threadActionController.unFollowUser);

module.exports = router;
