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

    // Get DOM elements
    const plusIcon = document.querySelector('#plus_icon'); // Your plus icon button
    const plusBox = document.getElementById('plus_box');
    const plusSmall = document.querySelector('.add_small');
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




