async function getUserData(user_Id) {
    try {
        // Gọi API tới backend
        const response = await fetch(backendDomain + '/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: user_Id }), // Gửi user_id trong body
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse dữ liệu JSON từ response
        const userData = await response.json();
        if(userData.avt_url)
            userData.avt_url = backendDomain + userData.avt_url;
          else
            userData.avt_url = 'https://i.pinimg.com/736x/cd/4b/d9/cd4bd9b0ea2807611ba3a67c331bff0b.jpg';
        return userData;
    } catch (error) {
        console.error('Error fetching user data:', error, 'Khong tim thay user co id: ', user_Id);
    }
}