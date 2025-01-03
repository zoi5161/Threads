async function getAllThreads(priority_filter) {
  try {
    const params = new URLSearchParams(window.location.search);
    let filter = params.get("filter");
    if (priority_filter) {
      filter = priority_filter;
    }

    // Construct the API URL
    const apiUrl = filter
      ? backendDomain + `/thread/${filter}`
      : backendDomain + "/thread";

    //console.log("API URL:", apiUrl);
    const needCookies = filter === "liked" || filter === "commented" || filter === "following" || filter === "self";
    // Make the API call
    const response = await fetch(apiUrl, { 
      credentials: needCookies ? "include" : "same-origin",
      method: "GET",
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result);
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
