document.addEventListener("DOMContentLoaded", () => {
    const inputs = document.querySelectorAll('.code-input');
    const confirmButton = document.querySelector('.confirm');

    inputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            if (e.target.value.length === 1 && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === "Backspace" && index > 0 && e.target.value === "") {
                inputs[index - 1].focus();
            }
        });
    });

    confirmButton.addEventListener('click', async () => {
        const code = Array.from(inputs).map(input => input.value).join('');
        if (code.length !== 4) {
            alert('Vui lòng nhập đủ 4 ký tự.');
            return;
        }

        try {
            const email = new URLSearchParams(window.location.search).get('email');
            const response = await fetch('http://localhost:10000/gmail/verifycode', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, code }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Xác minh thành công!');
                window.location.href = '/Resetpassword';
            } else {
                alert(data.message || 'Mã xác minh không đúng. Vui lòng thử lại.');
            }
        } catch (error) {
            alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
        }
    });
});
