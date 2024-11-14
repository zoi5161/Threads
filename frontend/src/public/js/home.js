//cmt thêm để thêm lại vào main
document.addEventListener('DOMContentLoaded', function() {
    console.log("home.js loaded");

    // Lấy tất cả các post trừ post có id #postTop
    const posts = document.querySelectorAll('.post:not(#postTop)');

    posts.forEach(post => {
        // Thiết lập con trỏ chuột cho vùng post
        post.style.cursor = 'pointer';

        // Tìm icon ba chấm (three dots) bên trong mỗi post
        const threeDotsIcon = post.querySelector('.three_dots_button'); // Thêm class "three-dots-icon" vào nút three dots
        const commentIcon = post.querySelector('.fa-comment');

        // Sự kiện chuyển tab khi click vào bất kỳ vùng nào của post, nhưng bỏ qua nếu click vào icon ba chấm
        post.addEventListener('click', function(event) {
            if(threeDotsIcon == null){
                window.location.href = '/Comment';
            }
            else
            {
                // Kiểm tra xem sự kiện click có phải từ icon ba chấm hay không
                if (event.target === threeDotsIcon || threeDotsIcon.contains(event.target) || event.target === commentIcon || commentIcon.contains(event.target)) {
                    // Nếu là icon ba chấm, ngăn chặn sự kiện chuyển tab của post
                    event.stopPropagation();
                    console.log("Three dots clicked - show menu");
                    // Thực hiện các hành động của icon ba chấm ở đây (hiển thị menu/modal)
                } else {
                    // Nếu không phải là icon ba chấm, thực hiện sự kiện chuyển tab
                    window.location.href = '/Comment';
                }
            }
        });
    });
});

function showUserInfo1(element) {
    const userInfoBox = element.nextElementSibling; // Tìm phần tử .small_box_infor_user bên trong .username-time
    if (userInfoBox) {
        userInfoBox.style.display = 'block'; // Hiển thị hộp thông tin
    }
}
function showUserInfo2(element) {
    element.style.display = 'block'; // Hiển thị phần tử
}


function hideUserInfo1(element) {
    const userInfoBox = element.nextElementSibling;
    if (userInfoBox) {
        userInfoBox.style.display = 'none'; // Ẩn hộp thông tin
    }
}
function hideUserInfo2(element) {
    element.style.display = 'none'; // Ẩn phần tử
}