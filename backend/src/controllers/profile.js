const User = require('../models/User.js'); // Import model User

// Lấy thông tin người dùng dựa trên user_id
const getAccountInfor = async (req, res) => {
  try {
    // Lấy user_id từ body request
    const { user_id } = req.body;

    // Kiểm tra xem user_id có được cung cấp không
    if (!user_id) {
      return res.status(400).json({ message: 'user_id is required' });
    }

    // Tìm thông tin user từ MongoDB dựa vào user_id
    const user = await User.findOne({ user_id }); // Truy vấn bằng user_id

    // Nếu không tìm thấy user
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Trả về thông tin user
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


// Hàm cập nhật thông tin user
const updateProfile = async (req, res) => {
  try {
    // Lấy dữ liệu từ body request
    const { user_id, new_name, new_bio, new_social_link, new_show_instagram } = req.body;

    // Kiểm tra xem user_id có được cung cấp không
    if (!user_id) {
      return res.status(400).json({ message: 'user_id is required' });
    }

    // Tìm user và cập nhật thông tin
    const updatedUser = await User.findOneAndUpdate(
      { user_id }, // Điều kiện tìm user theo user_id
      {
        full_name: new_name,
        bio: new_bio,
        link_fb: new_social_link,
      }, // Dữ liệu cần cập nhật
      { new: true } // Trả về user đã cập nhật
    );

    // Nếu user không tồn tại
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Trả về kết quả thành công
    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = { getAccountInfor, updateProfile }