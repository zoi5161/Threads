async function getAllThreads() {
    try {
      const response = await fetch("http://localhost:10000/thread", {
        method: "GET",
      });
  
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