async function update_User(userId) {
  // Lấy giá trị từ modal
  // const userId = '1111'; // Thay bằng user_id của user (lấy từ session hoặc database)
  const new_name = document.getElementById('editName').innerText;
  const new_bio = document.getElementById('editBio').innerText;
  const socialLink = document.getElementById('link_social_m').innerText;
  const privateProfile = document.getElementById('private_btn_m').checked;
  const showInstagram = document.getElementById('insta_btn_m').checked;

  try {
    // Gửi request tới API backend
    const response = await fetch('http://localhost:10000/profile/update_infor', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        new_name: new_name,
        new_bio: new_bio,
        new_social_link: socialLink,
        private_profile: privateProfile,
        show_instagram: showInstagram,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      alert('Cập nhật thành công!');
      console.log('Updated user:', result.user);
      // Cập nhật giao diện nếu cần
      location.reload();
    } else {
      alert(`Cập nhật thất bại: ${result.message}`);
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    alert('Có lỗi xảy ra khi cập nhật thông tin.');
  }
}

// document.querySelector('.done_btn_m button').addEventListener('click', update_User("1111"));