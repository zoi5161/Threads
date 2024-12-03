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

function createPostHTML(post) {
    return `
    <div class="post" id="${post._id}">
        <div class="post-header">
            <div class="avatar">
                <img src="${post.user.avt_url}" />
            </div>
            <div class="username-time">
                <div class="username" onmouseover="showUserInfo1(this)" onmouseout="hideUserInfo1(this)" onclick="transferUser(${post.user.user_id})">${post.user.full_name}</div>
                <div class="small_box_infor_user" onmouseover="showUserInfo2(this)" onmouseout="hideUserInfo2(this)">
                    <div class="modal-content" style="background-color: inherit;">
                        <div class="modal-header" style="border: none;">
                            <div>
                                <div class="user-name" style="font-size: 125%; font-weight: bold;">${post.user.full_name}</div>
                                <div class="user-username">${post.user.tag}</div>
                            </div>
                            <img src="${post.user.avt_url}" alt="User Avatar" class="avatar" style="width: 60px; height: 60px;">
                        </div>
                        <div class="modal-body" style="border: none;">
                            <p>${post.user.bio}</p>
                            <p style="font-size: 85%; color: #888">${post.user.num_follow + " người theo dõi"}</p>
                        </div>
                        <div class="modal-footer" style="border: none;">
                            <button class="follow-btn" type="button" onclick="followUser(${post.user.user_id})">${post.user.follow_status}</button>
                        </div>
                    </div>
                </div>
                <div class="time">${formatPostTime(post.createdAt)}</div>
            </div>
            <div class="three_dots_button" style="color: var(--white); font-size: 100%; display: flex; justify-content: center; align-items: center; width: 10%; margin-left: 2rem">
                <button style="color: var(--white); border-color: var(--border); border-radius: 50%; background-color: var(--black); height: 1.5rem; width: 1.5rem;"
                    class="btn btn-secondary" type="button" data-bs-toggle="dropdown" aria-expanded="false" aria-label="...">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="12" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16" style="margin-bottom: 3px;">
                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
                    </svg>
                </button>
                <ul class="dropdown-menu dropdown-menu-end" style="margin-bottom: 10px; border-radius: 15px; background-color: var(--black); color: var(--white); width: 250px;">
                    <li style="display: flex; justify-content: center">
                        <div class="dot">
                            <div style="width: 2rem;">
                                <a href="#" style="text-decoration: none; color: inherit;">Lưu</a>
                            </div>
                            <div style="width: 2rem; display: flex; justify-content: center; align-items:center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark">
                                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/>
                                </svg>
                            </div>
                        </div>
                    </li>
                    <li style="display: flex; justify-content: center">
                        <div class="dot">
                            <div style="width: 8rem;">
                                <a href="#" style="text-decoration: none; color: inherit;">Không quan tâm</a>
                            </div>
                            <div style="width: 2rem; display: flex; justify-content: center; align-items:center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash">
                                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
                                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
                                    <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
                                </svg>
                            </div>
                        </div>
                    </li>
                    <li style="display: flex; justify-content: center">
                        <div class="dot">
                            <div style="width: 8rem;">
                                <a href="#" style="text-decoration: none; color: inherit;">Tắt thông báo</a>
                            </div>
                            <div style="width: 2rem; display: flex; justify-content: center; align-items:center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell-slash">
                                    <path d="M5.164 14H15c-.299-.199-.557-.553-.78-1-.9-1.8-1.22-5.12-1.22-6q0-.396-.06-.776l-.938.938c.02.708.157 2.154.457 3.58.161.767.377 1.566.663 2.258H6.164zm5.581-9.91a4 4 0 0 0-1.948-1.01L8 2.917l-.797.161A4 4 0 0 0 4 7c0 .628-.134 2.197-.459 3.742q-.075.358-.166.718l-1.653 1.653q.03-.055.059-.113C2.679 11.2 3 7.88 3 7c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0c.942.19 1.788.645 2.457 1.284zM10 15a2 2 0 1 1-4 0zm-9.375.625a.53.53 0 0 0 .75.75l14.75-14.75a.53.53 0 0 0-.75-.75z"/>
                                </svg>
                            </div>
                        </div>
                        <hr style="height: 1px; border: none; background-color: #ccc; margin: 5px 0;">
                    </li>

                    
                    <li style="display: flex; justify-content: center">
                        <div class="dot">
                            <div style="width: 2rem;">
                                <a href="#" style="text-decoration: none; color: inherit;">Chặn</a>
                            </div>
                            <div style="width: 2rem; display: flex; justify-content: center; align-items:center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-slash">
                                    <path d="M13.879 10.414a2.501 2.501 0 0 0-3.465 3.465zm.707.707-3.465 3.465a2.501 2.501 0 0 0 3.465-3.465m-4.56-1.096a3.5 3.5 0 1 1 4.949 4.95 3.5 3.5 0 0 1-4.95-4.95ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z"/>
                                </svg>
                            </div>
                        </div>
                    </li>
                    <li style="display: flex; justify-content: center">
                        <div class="dot">
                            <div style="width: 4rem;">
                                <a href="#" style="text-decoration: none; color: red;">Báo cáo</a>
                            </div>
                            <div style="width: 2rem; display: flex; justify-content: center; align-items:center; color: red">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                                </svg>
                            </div>
                        </div>
                        <hr style="height: 1px; border: none; background-color: #ccc; margin: 5px 0;">
                    </li>


                    <li style="display: flex; justify-content: center">
                        <div class="dot">
                            <div style="width: 10rem;">
                                <a href="#" style="text-decoration: none; color: inherit">Sao chép liên kết</a>
                            </div>
                            <div style="width: 2rem; display: flex; justify-content: center; align-items:center;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-link-45deg" viewBox="0 0 16 16">
                                    <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z"/>
                                    <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z"/>
                                </svg>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
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

async function followUser(user_id) {
    const account_id = localStorage.getItem('account_id'); // Lấy account_id từ localStorage

    // Đảm bảo rằng account_id và follower_id có giá trị
    if (!account_id || !user_id) {
        console.error("Missing account_id or follower_id");
        return;
    }

    const data = {
        account_id: account_id,
        follower_id: user_id
    };

    try {
        const response = await fetch('http://localhost:10000/thread_action/follow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            console.log(result.message);  // Đang theo dõi thành công
        } else {
            console.error(result.message); // Lỗi từ backend
        }
    } catch (error) {
        console.error('Error during follow action:', error);
    }
}