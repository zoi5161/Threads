window.MyApp = window.MyApp || {};
window.MyApp.isRedirecting = false;

async function getAccountData() {
    try {
        const response = await fetch(backendDomain + '/account/getAccount', {
            method: 'GET',
            credentials: 'include',
        });

        const result = await response.json();
        //console.log(response);
        //console.log(result);
        if (response.status === 200 && result) {
            return result;
        }

        if (!window.MyApp.isRedirecting) {
            window.MyApp.isRedirecting = true;
            alert("Please login again");
            window.location.href = "/login";
        }
    } catch {
        if (!window.MyApp.isRedirecting) {
            window.MyApp.isRedirecting = true;
            window.location.href = "/login";
        }
    }
}
