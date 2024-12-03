// Hàm gọi API để lấy dữ liệu user
async function fetchUserData(userId, edit_or_other_status) {
    try {
      // Gọi API tới backend
      const response = await fetch('http://localhost:10000/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId }), // Gửi user_id trong body
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse dữ liệu JSON từ response
      const userData = await response.json();

      // Cập nhật giao diện với dữ liệu user:
      document.querySelector('.user_name').innerText = userData.full_name || 'Unknown';
      document.querySelector('.user_handle').innerText = `@${userData.tag || 'unknown'}`;
      document.querySelector('.user_avatar').src = userData.avt_url || 'default-avatar-url.png';
      document.querySelector('.bio').innerText = userData.bio || 'No bio available';
      document.querySelector('.follower_count').innerText = userData.num_follow || '0';
      document.querySelector('.social_link_wrapper a').setAttribute('href', userData.link_fb);

      document.querySelector('.create_thread img').src = userData.avt_url || 'default-avatar-url.png';

      if (edit_or_other_status === 'edit') {
        //cập nhật giao diện update infor:
        document.querySelector('#editName').innerText = userData.full_name || "Username";
        document.querySelector('.avt_m img').src = userData.avt_url || 'default-avatar-url.png';
        document.querySelector('#editBio').innerText = userData.bio || 'No bio available';
        document.querySelector('#link_social_m').innerText = userData.link_fb;
      }
      return userData;
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  // window.onload = fetchUserData("1111");
  // Gọi hàm fetchUserData() khi trang tải
  // document.addEventListener('DOMContentLoaded', () => {
  //   const userId = '1111'; // Thay bằng user_id mà bạn muốn lấy từ backend
  //   fetchUserData(userId);
  // });
