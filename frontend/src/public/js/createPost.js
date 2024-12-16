// Dữ liệu mẫu
// const posts = [
//   {
//     user: {
//       avatar:
//         "https://hapotravel.com/wp-content/uploads/2023/03/chon-loc-25-avatar-gai-xinh-dep-nhu-than-tien-ty-ty_7.jpg",
//       username: "_10.nov_",
//       fullName: "Huyền Thủy",
//       tag: "@ngocne2744",
//       bio: "Zui zẻ",
//       follower: "299",
//       follow_status: "Theo dõi",
//     },
//     createdAt: "1 giờ",
//     content:
//       "có b nào muốn đi xem venom ở rạp quốc gia kh a, nhóm mình có 3 người đi rồi muốn tìm thêm người nữa cho vui",
//     img_url:
//       "https://th.bing.com/th/id/OIP.U0D5JdoPkQMi4jhiriSVsgHaHa?w=181&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
//   },
// ];
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

function dot(text, onclickFunction, i_tag, color = "inherit") {
  return `
      <li style="display: flex; justify-content: center">
          <div class="dot" style="cursor: pointer;" onclick="${onclickFunction}">
              <div style="width: ${text.length > 8 ? "10rem" : "8rem"}; color: ${color};">
                  ${text}
              </div>
              <div style="width: 2rem; display: flex; justify-content: center; align-items:center">
                  <i class="bi ${i_tag}" style="color: ${color};"></i>
              </div>
          </div>
      </li>
    `;
}

const three_dots_HTML = `
      <div class="three_dots_button" style="color: var(--white); font-size: 100%; display: flex; justify-content: center; align-items: center; width: 10%;">
          <button style="color: var(--white); border-color: var(--border); border-radius: 50%; background-color: var(--black); height: 1.5rem; width: 1.5rem;" class="btn btn-secondary" type="button" data-bs-toggle="dropdown" aria-expanded="false" aria-label="...">
              <i class="bi bi-three-dots" style="margin-bottom: 3px;"></i>
          </button>
          <ul class="dropdown-menu dropdown-menu-end" style="margin-bottom: 10px; border-radius: 15px; background-color: var(--black); color: var(--white); width: 250px;">
              ${dot("Lưu", "dot_click()", "bi-bookmark")}
              ${dot("Không quan tâm", "dot_click()", "bi-eye-slash")}
              ${dot("Tắt thông báo", "dot_click()", "bi-bell-slash")}
              <hr style="height: 1px; border: none; background-color: #ccc; margin: 5px 0;">
              ${dot("Chặn", "dot_click()", "bi-slash-circle", "red")}
              <hr style="height: 1px; border: none; background-color: #ccc; margin: 5px 0;">
              ${dot("Báo cáo", "dot_click()", "bi-exclamation-circle")}
              <hr style="height: 1px; border: none; background-color: #ccc; margin: 5px 0;">
              ${dot("Sao chép liên kết", "dot_click()", "bi-link-45deg")}
          </ul>
      </div>
`;

const noti_HTML = `
      <div class="three_dots_button" style="color: var(--white); font-size: 100%; display: flex; justify-content: center; align-items: center; width: 10%; margin-right: 1rem;">
          <button style="color: var(--white); font: 1rem; border-color: var(--border); border-radius: 5px; background-color: var(--black); padding: 5px" class="btn btn-secondary" type="button" data-bs-toggle="dropdown" aria-expanded="false" aria-label="...">
            Xem
          </button>
          <ul class="dropdown-menu dropdown-menu-end" style="margin-bottom: 10px; border-radius: 15px; background-color: var(--black); color: var(--white); width: 250px;">
              ${dot("Xem chi tiết", "Detail(this)", "bi-eye")}
              ${dot("Đánh dấu đã đọc", "Seen(this)", "bi-check2")}
              ${dot("Đánh dấu chưa đọc", "UnSeen(this)", "bi-bell")}
              <hr style="height: 1px; border: none; background-color: #ccc; margin: 5px 0;">
              ${dot("Xóa", "DeleteNoti(this)", "bi-trash", "red")}
          </ul>
      </div>
`;

function dot_click(button) {
  console.log("dot clicked");
}

function createPostHeaderHTML(user, createdAt, isNoti) {
  //Need fix user_id to ._id
  return `
    <div class="post-header" id="${user.user_id}"> 
        <div class="avatar">
            <img src="${user.avt_url}" />
        </div>
        <div class="header_info_wrapper">
            <div class="username-time">
                <div class="username" onmouseover="showUserInfo1(this)" onmouseout="hideUserInfo1(this)" onclick="transferUser(${user.user_id})">${user.full_name}</div>
                <div class="small_box_infor_user" onmouseover="showUserInfo2(this)" onmouseout="hideUserInfo2(this)">
                    <div class="modal-content" style="background-color: inherit;">
                        <div class="modal-header" style="border: none;">
                            <div>
                                <div class="user-name" style="font-size: 125%; font-weight: bold;">${user.full_name}</div>
                                <div class="user-username">${user.tag}</div>
                            </div>
                            <img src="${user.avt_url}" alt="User Avatar" class="avatar" style="width: 60px; height: 60px;">
                        </div>
                        <div class="modal-body" style="border: none;">
                            <p>${user.bio}</p>
                            <p style="font-size: 85%; color: #888">${user.num_follow + " người theo dõi"}</p>
                        </div>
                        <div class="modal-footer" style="border: none;">
                            <button class="follow-btn" type="button" onclick="followProcess(${user.user_id}, '${user.follow_status}')">${user.follow_status}</button>
                        </div>
                    </div>
                </div>
                <div class="time">${formatPostTime(createdAt)}</div>
            </div>
        </div>
        ${isNoti ? noti_HTML : three_dots_HTML}
    </div>
    `;
}

function createPostContentHTML(post) {
  return `
    <div class="post-content">
            <p style="word-wrap: break-word; word-break: break-word">
                ${post.content}
            </p>
            ${post.image_url
      ? `
                    <div style="text-align: center; margin-bottom: 1rem;">
                        ${post.media_type?.startsWith("video")
        ? `<video src="${post.image_url}"  controls style="max-width: 100%; max-height: 500px; border-radius: 10px;"></video>`
        : post.media_type?.startsWith("image")
          ? `<img src="${post.image_url}"  alt="post media" style="max-width: 100%; max-height: 500px; border-radius: 10px;">`
          : `<p>Unsupported media type</p>`
      }
                    </div>
                    `
      : ""
    }
    </div>
    `;
}

function createPostFooterHTML(post) {
  return `
            <div class="post-footer">
            <div class="like_btn">
                <i class="far fa-heart likeBtn"></i>
                <span class="likeCnt">Loading...</span>
            </div>

            <div class="comment_btn" data-bs-toggle="modal" data-bs-target="#commentModal">
                <i class="far fa-comment commentBtn"></i>
                <span class="commentCnt">${post.comment}</span>
            </div>
            <div><i class="fas fa-share"></i></div>
        </div>
    `;
}

const newNotiSign = `
    <div class="new_noti_sign">
      <i class="bi bi-dot"></i>
    </div>
`;

// function createPostHTML(obj, type = "post", seen = true, isNoti = false) {
//   return `
//     <div class="${isNoti ?  seen ? "noti_wrapper" : "noti_wrapper un_seen" : "post"}" id="${obj._id}" data-type="${type}">
//         ${createPostHeaderHTML(obj.user, obj.createdAt, isNoti)}
//         ${seen ? "" : newNotiSign}
//         ${type === "post" ? createPostContentHTML(obj) : ""}
//         ${isNoti ? "" : createPostFooterHTML(obj)}
//     </div>`;
// }

function createPostHTML(post) {
  return `
    <div class="post" id="${post._id}">
        ${createPostHeaderHTML(post.user, post.createdAt)}
        ${createPostContentHTML(post)}
        ${createPostFooterHTML(post)}
    </div>
    `;
}

function createNotiHTML(noti) {
  return `
    <div class="${noti.seen ? "noti_wrapper" : "noti_wrapper un_seen"}" id="${noti._id}" data-id="${noti.post._id ? noti.post._id : noti.user.user_id}" data-type="${noti.type}">
        ${createPostHeaderHTML(noti.user, noti.createdAt, true)}
        ${noti.seen ? "" : newNotiSign}
        ${noti.type === "post" ? createPostContentHTML(noti.post) : ""}
    </div>`;
}

async function createPost(posts) {
  const postContainer = document.querySelector(".container_post");
  posts.forEach((post) => {
    postContainer.innerHTML += createPostHTML(post);
  });
}

function transferUser(user_id) {
  // Chuyển hướng đến trang profile_user và truyền user_id qua query string
  window.location.href = `/Profile?user_id=${user_id}`;
}

async function unFollowUser(user_id) {
  try {
    const response = await fetch(
      `http://localhost:10000/thread_action/unfollow/${user_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ account_id: account_id }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      alert(`Complete to un follow user ${user_id}`);
    } else {
      alert(`Can not un follow user ${user_id}`);
      console.log(result.message);
    }
  } catch (error) {
    alert(`Error during follow action:`, error);
  }
}

async function followUser(user_id) {
  const data = {
    follower_id: user_id,
  };

  try {
    const response = await fetch(
      "http://localhost:10000/thread_action/follow",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    if (response.ok) {
      alert(`Complete to follow user`);
      console.log(result.message); // Đang theo dõi thành công

      await fetchCreateNoti({
        user_id: user_id,
        type: "follow",
        msg: "Followed you!",
      });

    } else {
      alert(`Follow user failed!`);
      console.error(result.message); // Lỗi từ backend
    }
  } catch (error) {
    console.error("Error during follow action:", error);
  }
}

async function followProcess(user_id, follow_status) {
  if (follow_status === "Theo dõi" || follow_status === "Theo dõi lại") {
    await followUser(user_id);
  } else if (follow_status === "Hủy theo dõi") {
    await unFollowUser(user_id);
  }
}
