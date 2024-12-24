async function handleLogOut(e) {
    e.preventDefault();

    try {
        const response = await fetch(backendDomain + '/account/logout', {
            method: 'GET',
            credentials: 'include', // Đảm bảo cookie được gửi đi trong request
        });
        const result = await response.json();

        if (response.ok) {
            window.location.href='./login'
        }

        // const result = await response.json();
    } catch (error) {
        console.log(error.message);
    }
    
    // window.location.href='./login'
}