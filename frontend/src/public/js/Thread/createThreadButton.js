async function createThreadButton() {
    const form = document.getElementById("create_thread_form");

    let formData = new FormData(form);
    
    const threadData = {"user_id": "1111", "content": formData.get("content"), "image_url": "https://i.pinimg.com/736x/92/96/7e/92967ebe51c1965f2c5c779baae2fdc0.jpg"};

    try {
      const response = await fetch("http://localhost:10000/thread", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(threadData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Response:", result);
        window.location.reload(); // Reload sau khi dang bai moi
      } else {
        console.error("Error response:", response);
        alert("Đăng bài không thành công, lỗi: " + response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Đăng bài không thành công, lỗi: " + error);
    }
}
