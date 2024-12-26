function mediaInteract(media_element, img, video)
{
  media_element.style.cursor = "pointer";
  media_element.addEventListener("click", function (event) {

    const modalHTML = `
      <div class="modal fade" id="imageModal" tabindex="-1" aria-hidden="true" >
        <div class="modal-dialog modal-dialog-centered modal_img">
          <div class="modal-content modal_img_content" style="background-color: rgb(0, 0, 0);">
            <div class="modal-header border-0 modal_img_content_header">
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body modal_img_content_body">
            ${
              img ? `<img src="${img.src}" class="img-fluid" alt="Post image">` : `<video src="${video.src}"  controls style="max-width: 100%; max-height: 500px; border-radius: 10px;"></video>`
            }
            </div>
          </div>
        </div>
      </div>`;

    let existingModal = document.getElementById("imageModal");
    if (existingModal) {
      existingModal.remove();
    }

    // Insert the new modal into the DOM
    document.body.insertAdjacentHTML("beforeend", modalHTML);

    const newModal = new bootstrap.Modal(
      document.getElementById("imageModal")
    );
    const modalElement = document.getElementById("imageModal");

    modalElement.addEventListener("shown.bs.modal", () => {
      modalElement.removeAttribute("aria-hidden");

      const closeButton = modalElement.querySelector(".btn-close");
      if (closeButton) {
        closeButton.focus();
      }
    });

    newModal.show();

    // Ensure that when modal is closed, it gets hidden properly with aria-hidden
    modalElement.addEventListener("hidden.bs.modal", () => {
      modalElement.setAttribute("aria-hidden", "true");
    });
  });
}

async function postInteract() {
  const posts = document.querySelectorAll(".post:not(#postTop)");

  //console.log(posts);

  posts.forEach(async (post) => {
    const img = post.querySelector(".post-content img");
    const video = post.querySelector(".post-content video");
    if(img || video) {
      media_element = img ? img : video;
      mediaInteract(media_element, img, video);
    }
    

    const post_content = post.querySelector(".post-content p");
    post.addEventListener('mouseover', function(event) {
      if(event.target === post || post_content.contains(event.target)) {
        post.style.cursor = 'pointer';
      }
      else {
        post.style.cursor = 'default';
      }
    });
    post.addEventListener("click", function (event) {
      if (event.target === post || post_content.contains(event.target)) {
        window.location.href = `./comment?thread_id=${post.id}`;
      } else {
        event.stopPropagation();
      }
    });

    const likeButton = post.querySelector(".like_btn");
    const likeIcon = likeButton.querySelector(".likeBtn");
    const likeCount = likeButton.querySelector(".likeCnt");
    
    // Check if the user has already liked the post
    let liked = false;
    
    try {
      const checkLikeResponse = await fetch(backendDomain + "/thread_action/check_like", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({thread_id: post.id }),
      });
    
      if (checkLikeResponse.ok) {
        const checkLikeResult = await checkLikeResponse.json();
        liked = checkLikeResult.liked;
        // Set initial state based on the 'liked' status
        if (liked) {
          likeIcon.classList.add("fas");
          likeIcon.classList.remove("far");
        } else {
          likeIcon.classList.add("far");
          likeIcon.classList.remove("fas");
        }
        likeCount.textContent = checkLikeResult.likeCnt || 0;
      } else {
        console.error("Failed to fetch like status:", checkLikeResponse);
      }
    } catch (error) {
      console.error("Error fetching like status:", error);
    }
    
    // Add click event listener for the like button
    likeButton.addEventListener("click", async function (event) {
      event.stopPropagation(); // Prevent other click handlers from firing
      event.preventDefault(); // Prevent the default form submission behavior
    
      const like_api = liked
        ? backendDomain + "/thread_action/unlike"
        : backendDomain + "/thread_action/like";
    
      try {
        const response = await fetch(like_api, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({thread_id: post.id }),
        });
    
        if (response.ok) {
          const result = await response.json();

          // Toggle the like state
          liked = !liked;
    
          // Update the UI based on the new state
          if (liked) {
            //console.log("Liked post:", post.id);
            likeIcon.classList.add("fas");
            likeIcon.classList.remove("far");
            likeCount.textContent = result.likeCnt;
          } else {
            //console.log("Unliked post:", post.id);
            likeIcon.classList.add("far");
            likeIcon.classList.remove("fas");
            likeCount.textContent = result.likeCnt;
          }
        } else {
          console.error("Error updating like status:", response);
        }
      } catch (error) {
        console.error("Error sending like/unlike request:", error);
      }

      if(liked){
        const user_id = post.querySelector('.post-header').id;
        await fetchCreateNoti({
          user_id: user_id,
          post_id: post.id,
          type: "like",
          msg: "Liked your post!",
        });
      }
    });

    const commentButton = post.querySelector(".comment_btn");
    const commentIcon = commentButton.querySelector(".commentBtn");
    const commentCount = commentButton.querySelector(".commentCnt");

    commentButton.addEventListener("click", function (event) {
      //console.log("Comment button clicked");
      //console.log("Post :", post)
      const container_post_comment = document.querySelector(
        ".container_post_comment"
      );
      container_post_comment.innerHTML = post.innerHTML;

      const post_commnet_footer = container_post_comment.querySelector(".post-footer");
      post_commnet_footer.style.display = "none";

      const three_dots_button = container_post_comment.querySelector(".three_dots_button");
      three_dots_button.style.display = "none";

      const post_btn_comment = document.querySelector("#post-btn-comment");
      post_btn_comment.addEventListener("click", async(event) => {
        event.preventDefault();
        //console.log(post.id);
        const post_comment_id = await createThreadButton('_comment', post.id)

        const user_id = post.querySelector('.post-header').id;

        await fetchCreateNoti({
          user_id: user_id,
          post_id: post_comment_id,
          type: "comment",
          msg: "Commented on your post!",
        });
      });
    });

  });

  const new_post = document.querySelector("#post_status");
  const post_btn = document.querySelector(".post_btn");
  const plus_box_short_profile = document.getElementById(
    "plus_box_short_profile"
  );
  const tag = document.querySelector(".tag");

  const plusBox = document.getElementById("plus_box");
  const overlay = document.getElementById("overlay");
  const plusSmall = document.querySelector('.add-button');
  const cancelBtn = document.querySelector(".cancel-btn");

  // Show modal function
  function showModal() {
    overlay.classList.remove("hidden");
    plusBox.classList.remove("hidden");
    // Prevent scrolling when modal is open
    document.body.style.overflow = "hidden";
  }

  // Hide modal function
  function hideModal() {
    overlay.classList.add("hidden");
    plusBox.classList.add("hidden");
    // Re-enable scrolling
    document.body.style.overflow = "auto";
  }

  cancelBtn.addEventListener("click", hideModal);
  overlay.addEventListener("click", hideModal);

  if (new_post) new_post.addEventListener("click", showModal);
  if (post_btn) post_btn.addEventListener("click", showModal);
  if (plus_box_short_profile)
    plus_box_short_profile.addEventListener("click", showModal);
  if (tag) tag.addEventListener("click", showModal);
  if (plusSmall) plusSmall.addEventListener("click", showModal);

}

function showUserInfo1(element) {
  const userInfoBox = element.nextElementSibling; // Tìm phần tử .small_box_infor_user bên trong .username-time
  if (userInfoBox) {
    userInfoBox.style.display = "block"; // Hiển thị hộp thông tin
  }
}
function showUserInfo2(element) {
  element.style.display = "block"; // Hiển thị phần tử
}

function hideUserInfo1(element) {
  const userInfoBox = element.nextElementSibling;
  if (userInfoBox) {
    userInfoBox.style.display = "none"; // Ẩn hộp thông tin
  }
}
function hideUserInfo2(element) {
  element.style.display = "none"; // Ẩn phần tử
}
