async function getThread(thread_id) {
    try {
      const response = await fetch(backendDomain + "/thread/" + thread_id, {
        method: "GET",
      });
  
      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        console.error("Error response:", response);
        return { error: "Failed to fetch thread" };
      }
    } catch (error) {
      console.error("Error:", error);
      return { error: "Failed to fetch thread" };
    }
}