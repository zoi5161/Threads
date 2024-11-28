async function getAllThreads(priority_filter) {
  try {
    const params = new URLSearchParams(window.location.search);
    let filter = params.get("filter");
    if (priority_filter) {
      filter = priority_filter;
    }

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
