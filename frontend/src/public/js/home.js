document.addEventListener('DOMContentLoaded', function() {
    console.log("home.js loaded");
    const posts = document.querySelectorAll('.post:not(#postTop)');
    posts.forEach(post => {
        post.style.cursor = 'pointer';
        post.addEventListener('click', function() {
            // Update the path to match your server routing
            window.location.href = '/Comment';
        });
    });
});

//cmt thêm để thêm lại vào main