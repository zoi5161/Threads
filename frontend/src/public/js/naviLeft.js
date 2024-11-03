document.addEventListener("DOMContentLoaded", function () {
    const pinMenu = document.getElementById("pin-menu");
    const setMenu = document.getElementById("setting-menu");
    const thumbtackIcon = document.getElementById("thumbtack-icon");
    const barsStaggeredIcon = document.getElementById("bars-staggered-icon");

    // Hàm hiển thị hoặc ẩn menu
    function togglePinMenu() {
        if (pinMenu.style.display === "none" || pinMenu.style.display === "") {
            pinMenu.style.display = "block";
            pinMenu.style.position = "fixed";
        } else {
            pinMenu.style.display = "none";
        }
    }

    // Hàm hiển thị hoặc ẩn setting-menu
    function toggleSettingMenu() {
        if (setMenu.style.display === "none" || setMenu.style.display === "") {
            setMenu.style.display = "block";
            setMenu.style.position = "fixed";
            pinMenu.style.display = "none"; // Ẩn pin-menu khi hiển thị setting-menu
        } else {
            setMenu.style.display = "none";
        }
    }

    // Hiển thị hoặc ẩn menu khi nhấn vào thumbtack-icon
    thumbtackIcon.addEventListener("click", function (event) {
        event.stopPropagation();
        togglePinMenu();
    });

    // Hiển thị hoặc ẩn menu khi nhấn vào bars-staggered-icon
    barsStaggeredIcon.addEventListener("click", function (event) {
        event.stopPropagation();
        toggleSettingMenu();
    });

    // Ẩn menu khi nhấn vào bất kỳ vùng nào khác
    document.addEventListener("click", function (event) {
        if (!pinMenu.contains(event.target) && event.target !== thumbtackIcon && event.target !== barsStaggeredIcon) {
            pinMenu.style.display = "none";
        }
    });

    document.addEventListener("click", function (event) {
        if (!setMenu.contains(event.target) && event.target !== thumbtackIcon && event.target !== barsStaggeredIcon) {
            setMenu.style.display = "none";
        }
    });
});