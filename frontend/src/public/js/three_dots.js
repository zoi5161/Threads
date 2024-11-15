// Lấy tất cả các phần tử dropdown
const dropdownElements = document.querySelectorAll('.three_dots_button .dropdown-menu');
dropdownElements.forEach(dropdownElement => {
    const dropdown = new bootstrap.Dropdown(dropdownElement.parentElement.querySelector('button'));

    // Đóng dropdown khi người dùng cuộn trang
    window.addEventListener('scroll', () => {
        if (dropdownElement.classList.contains('show')) {
            dropdown.hide();
        }
    });
});