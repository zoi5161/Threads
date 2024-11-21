async function getAllThreads() {
  try {
    const response = await fetch("http://localhost:10000/thread", {
      method: "GET",
    });

    if (response.ok) {
      const result = await response.json();
      console.log("Response:", result);
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

function formatPostTime(createdAt) {
  const now = new Date();
  const postTime = new Date(createdAt);
  const diffInMs = now - postTime;
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

  switch (true) {
    case diffInMinutes < 1:
      return "Vừa xong";
    case diffInMinutes < 60:
      return `${diffInMinutes} phút trước`;
    case diffInMinutes < 60 * 24:
      return `${Math.floor(diffInMinutes / 60)} giờ trước`;
    case diffInMinutes < 60 * 24 * 7:
      return `${Math.floor(diffInMinutes / (60 * 24))} ngày trước`;
    default:
      return postTime.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  //Vì chưa build API nên dùng setTimeout để giả lập việc lấy dữ liệu từ server thay vì await fetch()
  const posts_fetched = await getAllThreads();
  posts_fetched.forEach(function (post) {
    post.user = {
      avatar:
        "https://hapotravel.com/wp-content/uploads/2023/03/chon-loc-25-avatar-gai-xinh-dep-nhu-than-tien-ty-ty_7.jpg",
      username: "_10.nov_",
      fullName: "Huyền Thủy",
      tag: "@ngocne2744",
      bio: "Zui zẻ",
      follower: "299",
      follow_status: "Theo dõi",
    };
    post.createdAt = formatPostTime(post.createdAt);
  });

  window.onload = createPost(posts_fetched);

  const post_img = document.querySelectorAll(".post_img");
  post_img.forEach((img) => {
    img.style.cursor = "pointer";
    img.addEventListener("click", function (event) {
      event.stopPropagation(); // Ngăn chặn sự kiện click lan ra ngoài

      // Tạo modal Bootstrap để hiển thị hình ảnh với overlay opacity
      const modalHTML = `
            <div class="modal fade" id="imageModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal_img">
                    <div class="modal-content modal_img_content" style="background-color: rgb(0, 0, 0);">
                        <div class="modal-header border-0 modal_img_content_header">
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body modal_img_content_body">
                            <img src=${img.src}
                        </div>
                    </div>
                </div>
            </div>`;

      // Thêm modal vào body nếu chưa tồn tại
      if (!document.getElementById("imageModal")) {
        document.body.insertAdjacentHTML("beforeend", modalHTML);
        const imageModal = new bootstrap.Modal(
          document.getElementById("imageModal")
        );
        imageModal.show();
      } else {
        const existingModal = bootstrap.Modal.getOrCreateInstance(
          document.getElementById("imageModal")
        );
        existingModal.show();
      }
    });
  });

  // Lấy tất cả các post trừ post có id #postTop
  const posts = document.querySelectorAll(".post:not(#postTop)");

  posts.forEach((post) => {
    // Thiết lập con trỏ chuột cho vùng post
    post.style.cursor = "pointer";

    // Tìm icon ba chấm (three dots) bên trong mỗi post
    const threeDotsIcon = post.querySelector(".three_dots_button"); // Thêm class "three-dots-icon" vào nút three dots
    const commentIcon = post.querySelector(".fa-comment");

    // Sự kiện chuyển tab khi click vào bất kỳ vùng nào của post, nhưng bỏ qua nếu click vào icon ba chấm
    post.addEventListener("click", function (event) {
      // Kiểm tra xem sự kiện click có phải từ icon ba chấm hay không
      if (
        event.target === threeDotsIcon ||
        threeDotsIcon.contains(event.target) ||
        event.target === commentIcon ||
        commentIcon.contains(event.target)
      ) {
        // Nếu là icon ba chấm, ngăn chặn sự kiện chuyển tab của post
        event.stopPropagation();
        console.log("Three dots clicked - show menu");
        // Thực hiện các hành động của icon ba chấm ở đây (hiển thị menu/modal)
      } else {
        // Nếu không phải là icon ba chấm, thực hiện sự kiện chuyển tab
        // window.location.href = "/Comment";
        window.location.href = "./comment";
      }
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
});

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
