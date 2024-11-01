document.addEventListener("DOMContentLoaded", function () {
    const pinMenu = document.getElementById("pin-menu");
    const thumbtackIcon = document.getElementById("thumbtack-icon");

    // Hiển thị hoặc ẩn menu khi nhấn vào biểu tượng thumbtack
    thumbtackIcon.addEventListener("click", function (event) {
        event.stopPropagation(); // Ngăn chặn sự kiện click lan ra ngoài
        if (pinMenu.style.display === "none" || pinMenu.style.display === "") {
            // Hiển thị menu dưới dạng fixed khi nhấn vào thumbtack-icon
            pinMenu.style.display = "block";
            pinMenu.style.position = "fixed";
        } else {
            // Ẩn menu khi nhấn lại vào thumbtack-icon
            pinMenu.style.display = "none";
        }
    });

    // Ẩn menu khi nhấn vào bất kỳ vùng nào khác
    document.addEventListener("click", function (event) {
        if (!pinMenu.contains(event.target) && event.target !== thumbtackIcon) {
            pinMenu.style.display = "none";
        }
    });
});