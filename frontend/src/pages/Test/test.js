const form = document.querySelector('#testForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();  // Prevent the default form submission behavior
    console.log('Form submitted');

    // Use FormData to gather all input values
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());  // Convert FormData to an object

    // POST request to send data to the server
    const response = await fetch('http://localhost:3000/test', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)  // Send the collected data as JSON
    });

    const responseData = await response.json();
    console.log(responseData);  // Log the response from the server

    // Clear the form fields after submission
    form.reset();
});

const fetchButton = document.querySelector('#fetchData');
const dataContainer = document.querySelector('#dataContainer');

// Function to fetch data from the server
fetchButton.addEventListener('click', async () => {
    const response = await fetch('http://localhost:3000/test');
    const data = await response.json();

    // Clear previous data
    dataContainer.innerHTML = '';

    // Display fetched data
    data.forEach(item => {
        const div = document.createElement('div');
        div.textContent = `Name: ${item.name}, Age: ${item.age}`;
        dataContainer.appendChild(div);
    });
});
