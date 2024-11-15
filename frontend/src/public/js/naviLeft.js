document.addEventListener("DOMContentLoaded", function () {
    const root = document.documentElement;
    const lightButton = document.querySelector('.light');
    const darkButton = document.querySelector('.dark');

    // Hàm đặt chế độ dark
    function setDarkMode() {
        root.style.setProperty('--white', '#FAFAFA');
        root.style.setProperty('--black', 'black');
        root.style.setProperty('--post', '#171717');
        root.style.setProperty('--border', '#3b3a3a');
        root.style.setProperty('--hover', '#222222');
        root.style.setProperty('--iconInPost', '#888');
        root.style.setProperty('--taskbar-bot', '#0e0d0d8a');
        root.style.setProperty('--navibot', '#0e0d0d00');
        root.style.setProperty('--hover-navibot', '#191919');
        root.style.setProperty('--scroll-btn', '#222222');
        root.style.setProperty('--scroll-btn-hover', '#555');
        localStorage.setItem('theme', 'light'); // Lưu trạng thái là light
    }

    // Hàm đặt chế độ dark
    function setLightMode() {
        root.style.setProperty('--white', 'black');
        root.style.setProperty('--black', '#FAFAFA');
        root.style.setProperty('--post', 'white');
        root.style.setProperty('--border', '#DDDDDD');
        root.style.setProperty('--hover', '#D7D7D7');
        root.style.setProperty('--iconInPost', '#555');
        root.style.setProperty('--taskbar-bot', '#F0F0F0');
        root.style.setProperty('--navibot', '#F0F0F0');
        root.style.setProperty('--hover-navibot', '#E6E6E6');
        root.style.setProperty('--scroll-btn', '#E1E1E1');
        root.style.setProperty('--scroll-btn-hover', '#ccc');
        localStorage.setItem('theme', 'dark'); // Lưu trạng thái là dark
    }

    // Gắn sự kiện click vào lightButton (để chọn chế độ light)
    lightButton.addEventListener('click', setLightMode);

    // Gắn sự kiện click vào darkButton (để chọn chế độ dark)
    darkButton.addEventListener('click', setDarkMode);

    // Kiểm tra trạng thái lưu trong localStorage và áp dụng khi trang được load
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'dark') {
        setLightMode();
    } else {
        setDarkMode();
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const pinMenu = document.getElementById("pin-menu");
    const setMenu = document.getElementById("setting-menu");
    const setTrans = document.getElementById('setting-trans');
    const thumbtackIcon = document.getElementById("thumbtack-icon");
    const barsStaggeredIcon = document.getElementById("bars-staggered-icon");
    const returnMenu = document.getElementById('return-setting-menu');

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
            pinMenu.style.display = "none";
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

    returnMenu.addEventListener("click", function (event) {
        event.stopPropagation();
        toggleSettingMenu();

        setTrans.classList.add('setting-trans-active');
        setTrans.style.display = "none";
    });

    // Ẩn menu khi nhấn vào bất kỳ vùng nào khác
    document.addEventListener("click", function (event) {
        if (!pinMenu.contains(event.target) && event.target !== thumbtackIcon && event.target !== barsStaggeredIcon) {
            pinMenu.style.display = "none";
        }
        if (!setMenu.contains(event.target) && event.target !== thumbtackIcon && event.target !== barsStaggeredIcon) {
            setMenu.style.display = "none";
        }
    });

    document.addEventListener("click", function (event) {
        if (!setMenu.contains(event.target) && !setTrans.contains(event.target)) {
            setTrans.classList.remove('setting-trans-active');
            setTrans.style.display = "none";
        }
    });

    document.querySelector('.setting-UI').addEventListener('click', function() {
        setMenu.style.display = "none";
        setTrans.style.display = 'block';
        setTrans.classList.add('setting-trans-active');
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