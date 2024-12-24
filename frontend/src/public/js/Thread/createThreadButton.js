async function createThreadButton(thread_type = '', root_thread_id = null) {
  const form = document.getElementById("create_thread_form" + thread_type);
  console.log("Form:", form);
  if (!form) {
    alert("Form not found. Please check your HTML.");
    return;
  }

  const formData = new FormData(form);

  // Validate content
  const content = formData.get("content" + thread_type);
  if (!content || content.trim() === "") {
    alert("Nội dung không được để trống.");
    return;
  }

  // Prepare thread data
  const threadData = {
    user_id: "1111",
    content: content.trim(),
    image_url: '',
    root_thread: root_thread_id,
    media_type: null,
  };

  // Handle image upload
  const imageFile = formData.get("image" + thread_type);
  console.log("Image File:", imageFile);

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
      const response = await fetch(backendDomain + "/image", {
        method: "POST",
        credentials: "include",
        body: formData, // Send file in FormData
      });
  
      if (!response.ok) {
        throw new Error(`Image upload failed with status code: ${response.status}`);
      }
  
      const result = await response.json(); // Parse JSON response
      console.log("Image Upload Result:", result);
      threadData.image_url = backendDomain + `/image/${result.imageId}`;
      threadData.media_type = result.media_type; 
      
    } catch (error) {
      console.error("Error during image upload:", error);
      alert(`Image upload failed: ${error.message}`);
    }
  }

  console.log("Thread Data:", threadData);
  const create_thread_route = thread_type === '' ? backendDomain + "/thread" : backendDomain + "/thread/comment";

  console.log("Create Thread Route:", create_thread_route);

  // Handle thread submission
  try {
    const response = await fetch(create_thread_route, {
      method: "POST",
      credentials: "include",
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
    const newThreadId = result._id;

    alert("Đăng bài thành công!");
    form.reset(); // Clear the form
    window.location.href = `/comment?thread_id=${newThreadId}`; // Redirect to the new thread
    return result;
  } catch (error) {
    console.error("Thread Submission Error:", error);
    alert("Đăng bài không thành công: " + error.message);
  }
}
