const notiService = require('../services/noti');

const createNoti = async (req, res) => {
    try {
        const { user_id, post_id, user_make_noti, type, msg } = req.body;
        await notiService.createNoti(user_id, post_id, user_make_noti, type, msg);
        res.status(201).json({ message: "Notification created" });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

const getAllNotiOfUser = async (req, res) => {
    try {
        const user_id = '1111';
        const noti_list = await notiService.getAllNotiOfUser(user_id);
        res.status(200).json(noti_list);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

const getNotiById = async (req, res) => {
    try {
        const { noti_id } = req.params;
        const noti = await notiService.getNotiById(noti_id);
        res.status(200).json(noti);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

const seenNoti = async (req, res) => {
    try {
        const { noti_id, seen } = req.body;
        await notiService.seenNoti(noti_id, seen);
        res.status(200).json({ message: "Notification seen" });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

const deleteNoti = async (req, res) => {
    try {
        const { noti_id } = req.params;
        await notiService.deleteNoti(noti_id);
        res.status(200).json({ message: "Notification deleted" });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

const deleteAllNotifications = (req, res) => {
    try {
        const user_id = '1111';
        notiService.deleteAllNotifications(user_id);
        res.status(200).json({ message: "All notifications deleted" });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

module.exports = {
    createNoti,
    getAllNotiOfUser,
    getNotiById,
    seenNoti,
    deleteNoti,
    deleteAllNotifications,
};



