// const noti_list = [
//     {
//         obj: {
//                 user: {
//                   avt_url:
//                     "https://hapotravel.com/wp-content/uploads/2023/03/chon-loc-25-avatar-gai-xinh-dep-nhu-than-tien-ty-ty_7.jpg",
//                     full_name: "Huyền Thủy",
//                   tag: "@ngocne2744",
//                   bio: "Zui zẻ",
//                   follower: "299",
//                   follow_status: "Theo dõi",
//                 },
//                 createdAt: "1 giờ",
//                 content:
//                   "có b nào muốn đi xem venom ở rạp quốc gia kh a, nhóm mình có 3 người đi rồi muốn tìm thêm người nữa cho vui",
//                 img_url:
//                   "https://th.bing.com/th/id/OIP.U0D5JdoPkQMi4jhiriSVsgHaHa?w=181&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
//                   _id: '1'
//             },
//         type: 'post',
//         msg: 'Upload new post',
//         seen: true,
//     },
//     {
//         obj: {
//             user: {
//               avt_url:
//                 "https://hapotravel.com/wp-content/uploads/2023/03/chon-loc-25-avatar-gai-xinh-dep-nhu-than-tien-ty-ty_7.jpg",
//               full_name: "Huyền Thủy",
//               tag: "@ngocne2744",
//               bio: "Zui zẻ",
//               follower: "299",
//               follow_status: "Theo dõi",
//             },
//             createdAt: "1 giờ",
//             _id: '2'
//         },
//         type: 'follow',
//         msg: 'Followed you!',
//         seen: false,
//     },
//     {
//         obj: {
//             user: {
//                 avt_url:
//                   "https://hapotravel.com/wp-content/uploads/2023/03/chon-loc-25-avatar-gai-xinh-dep-nhu-than-tien-ty-ty_7.jpg",
//                 full_name: "Huyền Thủy",
//                 tag: "@ngocne2744",
//                 bio: "Zui zẻ",
//                 follower: "299",
//                 follow_status: "Theo dõi",
//             },
//             createdAt: "1 giờ",
//             post_id: "6746b6d650064ab7ecd5aaa0",
//             _id: '3'
//         },
//         type: 'like',
//         msg: 'Liked your post!',
//         seen: false,
//     }
// ]


async function getAllNotiOfUser() {
  try{
    const response = await fetch('http://localhost:10000/noti', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
  });
    if(!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  }
  catch(err){
    console.log('Error when getting all notifications:', err);
  }
}

async function createNoti(){
  checkNotifications("Loading...");
  const list_noti = await getAllNotiOfUser();
    const postContainer = document.querySelector(".container_post");
    list_noti.forEach(noti => {
        const notiHTML = createNotiHTML(noti);
        postContainer.insertAdjacentHTML('afterbegin', notiHTML);

        const current_noti = postContainer.querySelector('.noti_wrapper');
        const header_info_wrapper = current_noti.querySelector('.header_info_wrapper');

        const msg = document.createElement('div');
        msg.classList.add('msg');
        msg.innerHTML = noti.msg;

        header_info_wrapper.appendChild(msg);
    });

    console.log("List noti:", list_noti);

    if(list_noti == null)
    {
      checkNotifications("");
    }
    else
    {
      checkNotifications("Không có thông báo nào");
    }
}

