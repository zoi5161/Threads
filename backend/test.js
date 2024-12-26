const bcrypt = require('bcrypt');
bcrypt.hash('abcxyz', 10, function(err, hash) {
  //console.log(hash);
});

// $2b$10$FGEJ57.tv3FtqKtxt2iMOO6.1VV3Rd07hrJzxW1QPXIJI7tkLeFyK

// $2b$10$V3V9vnaDDiJyWbOoPZH2sOhcSmiGjaKyb.UgpytiahxOjD/hIRHzy
// const mongoose = require('mongoose');
// const User = require('./src/models/User'); // Đảm bảo rằng bạn đã import đúng model User

// // Kết nối MongoDB
// mongoose.connect('', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => //console.log('Connected to MongoDB'))
//   .catch(err => console.error('Could not connect to MongoDB:', err));


// const addUser = async (userData) => {
//   try {
//     const user = new User({
//       user_id: userData.user_id,
//       user_name: userData.user_name,
//       full_name: userData.full_name,
//       tag: userData.tag,
//       bio: userData.bio || '', // Nếu không có bio, có thể để là chuỗi rỗng
//       avt_url: userData.avt_url || '', // Nếu không có avatar, có thể để là chuỗi rỗng
//       num_follow: userData.num_follow || 0, // Mặc định số người theo dõi là 0
//       link_fb: userData.link_fb || '', // Nếu không có link fb, có thể để là chuỗi rỗng
//       follow_status: userData.follow_status || 'Not Following', // Mặc định là 'Not Following'
//       followers: userData.followers || [], // Mảng followers, mặc định là rỗng
//       following: userData.following || [] // Mảng following, mặc định là rỗng
//     });

//     // Lưu user vào database
//     await user.save();
//     //console.log('User added successfully!');
//   } catch (err) {
//     console.error('Error adding user:', err);
//   }
// };

// // Ví dụ sử dụng
// const newUser = {
//   user_id: '1118',
//   user_name: '_meowmeow',
//   full_name: 'Doraemon',
//   tag: 'không sợ chuột',
//   bio: 'Chong chóng tre nè Nobita :D',
//   avt_url: 'https://m.yodycdn.com/products/hinhanhdoremon15_m2li694oiv1s020yv8.jpg',
//   num_follow: 0,
//   link_fb: 'http://facebook.com/johndoe',
//   follow_status: 'Theo dõi',
//   followers: [],
//   following: []
// };

// addUser(newUser);
