async function createThreadButton() {
  const form = document.getElementById("create_thread_form");

  if (!form) {
    alert("Form not found. Please check your HTML.");
    return;
  }

  const formData = new FormData(form);

  // Validate content
  const content = formData.get("content");
  if (!content || content.trim() === "") {
    alert("Nội dung không được để trống.");
    return;
  }

  // Prepare thread data
  const threadData = {
    user_id: "1111",
    content: content.trim(),
    image_url: '',
    root_thread: null,
    media_type: null,
  };

  // Handle image upload
  const imageFile = formData.get("image");
  if (imageFile && imageFile.size > 0) {
    if (imageFile.size > 10 * 1024 * 1024) { // Limit to 10 MB
      alert("Kích thước ảnh không được vượt quá 10 MB.");
      return;
    }

    try {
      // Prepare FormData for the file upload
      const formData = new FormData();
      formData.append("image", imageFile);
  
      // Send POST request to the image upload API
      const response = await fetch("http://localhost:10000/image", {
        method: "POST",
        body: formData, // Send file in FormData
      });
  
      if (!response.ok) {
        throw new Error(`Image upload failed with status code: ${response.status}`);
      }
  
      const result = await response.json(); // Parse JSON response
      console.log("Image Upload Result:", result);
      threadData.image_url = `http://localhost:10000/image/${result.imageId}`;
      threadData.media_type = result.media_type; 
      
    } catch (error) {
      console.error("Error during image upload:", error);
      alert(`Image upload failed: ${error.message}`);
    }
  }

  console.log("Thread Data:", threadData);

  // Handle thread submission
  try {
    const response = await fetch("http://localhost:10000/thread", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(threadData),
    });

    if (!response.ok) {
      throw new Error(`Đăng bài không thành công. Mã lỗi: ${response.status}`);
    }

    const result = await response.json();
    console.log("Thread Submission Response:", result);

    alert("Đăng bài thành công!");
    form.reset(); // Clear the form
    window.location.reload(); // Reload the page (optional)
  } catch (error) {
    console.error("Thread Submission Error:", error);
    alert("Đăng bài không thành công: " + error.message);
  }
}
