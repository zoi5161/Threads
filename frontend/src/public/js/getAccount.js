async function getAccountData() {
    try {
        const response = await fetch(backendDomain + '/account/getAccount', {
            method: 'GET',
            credentials: 'include', // Đảm bảo cookie được gửi đi trong request
        });

        const result = await response.json();
        console.log("CHECK Result: ", result);

        if (response.ok) {
           return result;
        }

        // const result = await response.json();
    } catch (error) {
        console.log(error.message);
    }
}