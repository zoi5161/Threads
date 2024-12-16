const User = require('../models/User'); // Import model User

// Hàm lấy thông tin người dùng theo user_id
const getUser = async (user_id) => {
  try {
    // Tìm người dùng trong cơ sở dữ liệu
    const user = await User.findOne({ user_id }); // Truy vấn bằng user_id
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};

// Hàm cập nhật thông tin người dùng
const updateUser = async (user_id, new_name, new_bio, new_social_link, new_show_instagram) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
        { user_id }, // Điều kiện tìm user theo user_id
        {
            full_name: new_name,
            bio: new_bio,
            link_fb: new_social_link,
        }, // Dữ liệu cần cập nhật
        { new: true } // Trả về user đã cập nhật
    );
    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    return null;
  }
};

const getAllUser = async () => {
  try {
    const userList = await User.find().limit(20).exec();
    return userList
  } catch (error) {
    console.error('Error when get user', error);
    return null;
  }
}

module.exports = { getUser, updateUser, getAllUser };
