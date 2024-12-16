const Noti = require('../models/Noti');
const Thread = require('../models/Thread');
const User = require('../models/User');

const createNoti = async (user_id, post_id, user_make_noti, type, msg) => {
    const noti = new Noti({
        user_id,
        post_id,
        user_make_noti,
        type,
        msg,
    });
    return await noti.save();
};

const getAllNotiOfUser = async (user_id) => {
    const noti_list = await Noti.find({ user_id }).sort({ createdAt: 1 });
    let result = [];
    for(const noti of noti_list){
        const obj = await getNotiById(noti._id);
        result.push(obj);
    }
    return result;
};

const getNotiById = async (noti_id) => {
    const noti = await Noti.findById(noti_id);
    if (!noti) {
        throw new Error("Notification not found");
    }

    let result = {
        _id: noti._id,
        post: {}, 
        user: {},
        type: noti.type,
        msg: noti.msg,
        seen: noti.seen,
        createdAt: noti.createdAt,
    };

    if (noti.type === 'post') {
        const thread = await Thread.findById(noti.post_id);
        if (thread) {
            result.post = thread; 
        }
    }

    if (noti.post_id)
        result.post._id = noti.post_id;

    const user = await User.findOne({ user_id: noti.user_make_noti });
    if (user) {
        result.user = user;
    } else {
        result.user = null;
    }
    console.log("result", result);
    return result;
};


const seenNoti = async (noti_id, seen = true) => {
    return await Noti.findByIdAndUpdate(noti_id, { seen: seen });
};

const deleteNoti = async (noti_id) => {
    return await Noti.findByIdAndDelete(noti_id);
};

const deleteAllNotifications = async (user_id) => {
    return await Noti.deleteMany({ user_id });
};

module.exports = {
    createNoti,
    getAllNotiOfUser,
    getNotiById,
    seenNoti,
    deleteNoti,
    deleteAllNotifications,
};