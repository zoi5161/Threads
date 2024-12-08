async function handleSignup(event) {
    event.preventDefault();

    const form = document.getElementById('signup_form');
    // const username = form.elements['username'].value;
    const email = form.elements['email'].value;
    const password = form.elements['password'].value;
    const confirmPassword = form.elements['confirm_password'].value;

    if (password !== confirmPassword) {
        const errorElement = document.getElementById('error_message');
        errorElement.textContent = 'Mật khẩu không trùng khớp';
        errorElement.style.display = 'block';
        return;
    }

    const signupData = {
        toEmail: email,
        password: password
    };

    try {
        const response = await fetch('http://localhost:10000/gmail/sendcode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Khai báo type là JSON
            },
            body: JSON.stringify({ toEmail: email }),
            credentials: 'include',
        });

        const result = await response.json();

        if (response.ok) {
            window.location.href = '/Sendcode';
        } else {
            const errorElement = document.getElementById('error_message');
            errorElement.textContent = result.message || 'Đã xảy ra lỗi khi đăng ký';
            errorElement.style.display = 'block';
        }
    } catch (error) {
        console.error('Error during signup:', error);
        const errorElement = document.getElementById('error_message');
        errorElement.textContent = 'Đã xảy ra lỗi. Vui lòng thử lại sau.';
        errorElement.style.display = 'block';
    }
}
