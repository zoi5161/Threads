// const backendDomain = "<%= host_backend %>";
//console.log("Backend Domain:", backendDomain);

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
        const code_input = Array.from(inputs).map(input => input.value).join('');
        if (code_input.length !== 4) {
            alert('Vui lòng nhập đủ 4 ký tự.');
            return;
        }

        try {
            // const email = new URLSearchParams(window.location.search).get('email');
            
            const response = await fetch(backendDomain + '/gmail/verifycode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    code: code_input,
                }),
                credentials: 'include',
            });
            if (response.ok) {
                alert('Đăng ký thành công!');
                window.location.href = '/Login';
            } else {
                const data = await response.json();
                alert(data.message || 'Mã xác minh không đúng. Vui lòng thử lại.');
            }
        } catch (error) {
            alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
        }
    });
});
