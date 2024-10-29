document.addEventListener("DOMContentLoaded", function () {
    const box = document.getElementById("box_of_three_point");
    const three_point = document.getElementById("nav_item_3");

    // Hiển thị hoặc ẩn menu khi nhấn vào biểu tượng thumbtack
    three_point.addEventListener("click", function (event) {
        event.stopPropagation(); // Ngăn chặn sự kiện click lan ra ngoài
        if (box.style.display === "none" || pinMenu.style.display === "") {
            // Hiển thị menu dưới dạng fixed khi nhấn vào thumbtack-icon
            box.style.display = "flex";
            box.style.flexDirection = "row";
            box.style.position = "fixed";
        } else {
            // Ẩn menu khi nhấn lại vào thumbtack-icon
            box.style.display = "none";
        }
    });

    // Ẩn menu khi nhấn vào bất kỳ vùng nào khác
    document.addEventListener("click", function (event) {
        if (!box.contains(event.target) && event.target !== three_point) {
            box.style.display = "none";
        }
    });
});


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