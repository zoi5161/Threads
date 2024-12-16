
const ProfileService = require('../services/profile.js')

// Lấy thông tin người dùng dựa trên user_id
const getAccountInfor = async (req, res) => {
  try {
    // Lấy user_id từ body request
    const { user_id } = req.body;

    const user = await ProfileService.getUser(user_id);

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
    const {new_name, new_bio, new_social_link, new_show_instagram } = req.body;
    const user_id = req.session.account.user_id;
    const updatedUser = await ProfileService.updateUser(user_id, new_name, new_bio, new_social_link, new_show_instagram);

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