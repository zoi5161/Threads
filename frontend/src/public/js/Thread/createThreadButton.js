async function createThreadButton() {
  const form = document.getElementById("create_thread_form");

  let formData = new FormData(form);

  const threadData = {
    user_id: "1111",
    content: formData.get("content"),
    image_url: '',
  };

  const image_data = formData.get("image");
  if (image_data && image_data.size > 0) {
    try {
      const imageFormData = new FormData();
      imageFormData.append("image", image_data); // Include the file in a FormData object
  
      const response = await fetch("http://localhost:10000/image", {
        method: "POST",
        body: imageFormData, // Send the full FormData object
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log("Response:", result);
        threadData.image_url = 'http://localhost:10000/image/' + result._id;
      } else {
        console.error("Error response:", response);
        alert("Đăng ảnh không thành công, lỗi: " + response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Đăng ảnh không thành công, lỗi: " + error.message);
    }
  }
  

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
