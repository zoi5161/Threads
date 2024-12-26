// const backendDomain = "<%= host_backend %>";
//console.log("Backend Domain:", backendDomain);

async function handleRecover(event) {
    event.preventDefault();
    const email_from_url = new URLSearchParams(window.location.search).get('email');
    var email = '';

    if(email_from_url)
    {
        email = email_from_url.toString();
    }
    else {
        const form = document.getElementById('recover_form');
        if(form) {
            email = form.elements['email'].value;
        }
        else{
            alert('Please enter your email');
            return;
        }
    }

    const loadingScreen = document.getElementById("loadingScreen");
    loadingScreen.style.display = "block";

    try {
        const response = await fetch(backendDomain + '/gmail/sendcode-reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Khai báo type là JSON
            },
            body: JSON.stringify({ toEmail: email }),
            credentials: 'include',
        });

        const result = await response.json();

        if (response.ok) {
            window.location.replace(`/UpdatePass?email=${email}`);
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

    loadingScreen.style.display = "none";
}