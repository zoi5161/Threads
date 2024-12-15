const express = require('express');
const router = express.Router();

const notiController = require('../controllers/noti');

router.post('/', notiController.createNoti);
router.get('/get/:noti_id', notiController.getNotiById);
router.get('/', notiController.getAllNotiOfUser);
router.put('/seen', notiController.seenNoti);
router.delete('/all', notiController.deleteAllNotifications);
router.delete('/:noti_id', notiController.deleteNoti);

module.exports = router;