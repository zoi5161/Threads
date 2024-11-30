async function handleLogin(event) {
    event.preventDefault();

    const form = document.getElementById('login_form');
    const emailOrUsername = form.elements[0].value;
    const password = form.elements[1].value;

    const loginData = {
        email: emailOrUsername,
        password: password
    };

    try {
        const response = await fetch('http://localhost:10000/account/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        const result = await response.json();

        if (response.ok) {
            //lưu account_user đang truy cập đó vào localStorage để dễ truy cập trong toàn bộ frontend:
            localStorage.setItem('account_id', result.account.user_id);
            
            window.location.href = '/';
        } else {
            const errorElement = document.getElementById('error_message');
            errorElement.style.display = 'block';
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại.');
    }
}
