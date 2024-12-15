async function handleRecover(event) {
    event.preventDefault();

    const form = document.getElementById('recover_form');
    const email = form.elements['email'].value;

    try {
        const response = await fetch('http://localhost:10000/gmail/sendcode-reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Khai báo type là JSON
            },
            body: JSON.stringify({ toEmail: email }),
            credentials: 'include',
        });

        const result = await response.json();

        if (response.ok) {
            window.location.href = `/UpdatePass?email=${email}`
        } else {
            const errorElement = document.getElementById('error_message');
            errorElement.textContent = result.message || 'Đã xảy ra lỗi khi cập nhật mật khẩu';
            errorElement.style.display = 'block';
        }
    } catch (error) {
        console.error('Error during recover:', error);
        const errorElement = document.getElementById('error_message');
        errorElement.textContent = 'Đã xảy ra lỗi. Vui lòng thử lại sau.';
        errorElement.style.display = 'block';
    }
}