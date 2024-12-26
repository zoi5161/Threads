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
        userData.avt_url = backendDomain + userData.avt_url
        // console.log('userData:', userData); 
        return userData;
    } catch (error) {
        console.error('Error fetching user data:', error, 'Khong tim thay user co id: ', user_Id);
    }
}