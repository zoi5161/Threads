async function getLikePost(thread_id) {
    try {
        const response = await fetch(backendDomain + `/thread/likeOfThread/${thread_id}`, {
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
