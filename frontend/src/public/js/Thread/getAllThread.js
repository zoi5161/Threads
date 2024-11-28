async function getAllThreads() {
  try {
    const params = new URLSearchParams(window.location.search);
    const filter = params.get("filter");

    // Construct the API URL
    const apiUrl = filter
      ? `http://localhost:10000/thread/${filter}`
      : "http://localhost:10000/thread";

    console.log("API URL:", apiUrl);
    
    // Make the API call
    const response = await fetch(apiUrl, { method: "GET"});

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      console.error("Error response:", response);
      return [];
    }
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}
