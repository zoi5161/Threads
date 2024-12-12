const notiService = require('../services/noti');

const createNoti = async (req, res) => {
    try {
        const { user_id, obj_id, type, msg } = req.body;

        if (!user_id || !obj_id || !type || !msg) {
            return res.status(400).json({ message: "User ID, Object ID, Type, and Message are required" });
        }

        const noti = await notiService.createNoti(user_id, obj_id, type, msg);
        res.status(201).json(noti);
    } catch (err) {
        res.status(400).json({ message: err.message });
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
        const { noti_id } = req.params;
        await notiService.seenNoti(noti_id);
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

module.exports = {
    createNoti,
    getAllNotiOfUser,
    getNotiById,
    seenNoti,
    deleteNoti,
};



