// document.addEventListener('DOMContentLoaded', function() {
//     console.log("home.js loaded");
//     const posts = document.querySelectorAll('.post:not(#postTop)');
//     posts.forEach(post => {
        
//         post.style.cursor = 'pointer';
//         post.addEventListener('click', function() {
//             // Update the path to match your server routing
//             window.location.href = '/Comment';
//         });
//     });
// });

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

        // Sự kiện chuyển tab khi click vào bất kỳ vùng nào của post, nhưng bỏ qua nếu click vào icon ba chấm
        post.addEventListener('click', function(event) {
            // Kiểm tra xem sự kiện click có phải từ icon ba chấm hay không
            if (event.target === threeDotsIcon || threeDotsIcon.contains(event.target)) {
                // Nếu là icon ba chấm, ngăn chặn sự kiện chuyển tab của post
                event.stopPropagation();
                console.log("Three dots clicked - show menu");
                // Thực hiện các hành động của icon ba chấm ở đây (hiển thị menu/modal)
            } else {
                // Nếu không phải là icon ba chấm, thực hiện sự kiện chuyển tab
                window.location.href = '/Comment';
            }
        });
    });
});
