async function changeAvatar(imageFile) {
  //console.log("Image File:", imageFile);

  if (imageFile && imageFile.size > 0) {
    if (imageFile.size > 10 * 1024 * 1024) {
      // Limit to 10 MB
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
        throw new Error(
          `Image upload failed with status code: ${response.status}`
        );
      }

      const result = await response.json(); // Parse JSON response
      //console.log("Image Upload Result:", result);

      // Update the user's avatar with the new image URL
      try {
        const response = await fetch(backendDomain + "/profile/update_avt", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            image: `/image/${result.imageId}`,
          }),
        });

        if (!response.ok) {
          throw new Error(
            `Update avatar failed with status: ${response.status}`
          );
        }

        const data = await response.json();
        //console.log("Update Avatar Result:", data);

        if (data.message) {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error updating avatar:", error);
        alert(`Update avatar failed: ${error.message}`);
      }
    } catch (error) {
      console.error("Error during image upload:", error);
      alert(`Image upload failed: ${error.message}`);
    }
  }
}
