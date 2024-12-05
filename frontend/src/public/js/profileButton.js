function createButtonHTML(user_id, account_id, follow_status) {
  let html = "";
  let status = "";
  if (user_id === account_id) {
    html = `
        <div class="edit">
<button class="edit_btn" data-bs-toggle="modal" data-bs-target="#profileModal">Chỉnh sửa trang cá
  nhân</button>
</div>
`,
status = 'edit';
  } else {
    html = `
        <div class="other_profile_wrapper" style="display: flex;">
<button class="follow">
  ${follow_status}
</button>
<button class="tag">
  Nhắc đến
</button>
</div>
`,
status = 'other';
  }
  return {html, status};
}


// button_follow = document.querySelector('.other_profile_wrapper button');

// if (button_follow.innerText.trim() === 'Đang theo dõi') {
//   button_follow.innerHTML = 'Đang theo dõi';
//   button_follow.style.backgroundColor = 'var(--red)';
//   button_follow.style.color = 'var(--white)';
//   button_follow.style.fontWeight = 'bold';
// } else {
//   button_follow.innerHTML = 'Theo dõi';
//   button_follow.style.backgroundColor = 'var(--white)';
//   button_follow.style.color = 'var(--post)'; 
//   button_follow.style.fontWeight = '500';
// }
