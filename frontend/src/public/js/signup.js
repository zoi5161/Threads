// const backendDomain = "<%= host_backend %>";
//console.log("Backend Domain:", backendDomain);

async function handleSignup(event) {
    event.preventDefault();

    const form = document.getElementById('signup_form');
    const username = form.elements['username'].value;
    const email = form.elements['email'].value;
    const password = form.elements['password'].value;
    const confirmPassword = form.elements['confirm_password'].value;

    // Kiểm tra các điều kiện của mật khẩu
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,}$/;
    if (!passwordRegex.test(password)) {
        const errorElement = document.getElementById('error_message');
        errorElement.textContent = 'Mật khẩu phải có ít nhất 5 ký tự, bao gồm ít nhất 1 chữ hoa, 1 chữ thường và 1 số';
        errorElement.style.display = 'block';
        return;
    }

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
        const response = await fetch(backendDomain + '/gmail/sendcode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Khai báo type là JSON
            },
            body: JSON.stringify({ toEmail: email,
                password: password,
                username: username }),
            credentials: 'include',
        });

        const result = await response.json();

        if (response.ok) {
            //console.log(sessionStorage);
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
