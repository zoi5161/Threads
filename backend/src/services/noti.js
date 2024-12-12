const Noti = require('../models/Noti');
const Thread = require('../models/Thread');
const User = require('../models/User');

const createNoti = async (user_id, obj_id, type, msg) => {
    const noti_obj = new Noti({
        user_id,
        obj_id,
        type,
        msg,
    });

    return await noti_obj.save();
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
    console.log("get notiById service", noti_id);

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

    let user_id_var = noti.obj_id;

    if (noti.type === 'post') {
        const thread = await Thread.findById(noti.obj_id);
        if (thread) {
            result.post = thread; 
            user_id_var = thread.user_id;
        }
    }

    const user = await User.findOne({ user_id: user_id_var });
    if (user) {
        result.user = user;
    } else {
        result.user = null;
    }

    return result;
};


const seenNoti = async (noti_id) => {
    return await Noti.findByIdAndUpdate(noti_id, { seen: true });
};

const deleteNoti = async (noti_id) => {
    return await Noti.findByIdAndDelete(noti_id);
};

module.exports = {
    createNoti,
    getAllNotiOfUser,
    getNotiById,
    seenNoti,
    deleteNoti,
};