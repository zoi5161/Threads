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

document.addEventListener("DOMContentLoaded", function () {
    // JS cho phần plusModal:
    // Get DOM elements
    const plusIcon = document.querySelector('#plus_icon'); // Your plus icon button
    const new_post = document.querySelector('#post_status');
    const plusBox = document.getElementById('plus_box');
    const plusSmall = document.querySelector('.add-button');
    const overlay = document.getElementById('overlay');
    const cancelBtn = document.querySelector('.cancel-btn');
    const plus_box_short_profile = document.getElementById('plus_box_short_profile');
    const tag = document.querySelector('.tag');

    // Show modal function
    function showModal() {
        overlay.classList.remove('hidden');
        plusBox.classList.remove('hidden');
        // Prevent scrolling when modal is open
        document.body.style.overflow = 'hidden';
    }

    // Hide modal function
    function hideModal() {
        overlay.classList.add('hidden');
        plusBox.classList.add('hidden');
        // Re-enable scrolling
        document.body.style.overflow = 'auto';
    }

    // Event listeners
    plusIcon.addEventListener('click', showModal);
    if(new_post)
        new_post.addEventListener('click', showModal);
    plusSmall.addEventListener('click', showModal);
    plus_box_short_profile.addEventListener('click', showModal);
    tag.addEventListener('click', showModal);
    cancelBtn.addEventListener('click', hideModal);
    overlay.addEventListener('click', hideModal);

    // Prevent modal from closing when clicking inside it
    plusBox.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // JS cho phần plusModal:
    // Get DOM elements
    const plusIcon = document.querySelector('#plus_icon'); // Your plus icon button
    const plusBox = document.getElementById('plus_box');
    const plusSmall = document.querySelector('.add-button');
    const overlay = document.getElementById('overlay');
    const cancelBtn = document.querySelector('.cancel-btn');

    // Show modal function
    function showModal() {
        overlay.classList.remove('hidden');
        plusBox.classList.remove('hidden');
        // Prevent scrolling when modal is open
        document.body.style.overflow = 'hidden';
    }

    // Hide modal function
    function hideModal() {
        overlay.classList.add('hidden');
        plusBox.classList.add('hidden');
        // Re-enable scrolling
        document.body.style.overflow = 'auto';
    }

    // Event listeners
    plusIcon.addEventListener('click', showModal);
    plusSmall.addEventListener('click', showModal);
    cancelBtn.addEventListener('click', hideModal);
    overlay.addEventListener('click', hideModal);

    // Prevent modal from closing when clicking inside it
    plusBox.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});