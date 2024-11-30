function createButtonHTML(user_id) {
  let html = "";
  let status = "";
  if (user_id === "1111") {
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
<button class="follow" onclick="
if (this.innerHTML.trim() === 'Theo dõi') {
  this.innerHTML = 'Đang theo dõi';
  this.style.backgroundColor = 'var(--black)';
  this.style.color = 'var(--white)';
  this.style.fontWeight = 'bold';
} else {
  this.innerHTML = 'Theo dõi';
  this.style.backgroundColor = 'var(--white)';
  this.style.color = 'var(--post)'; 
  this.style.fontWeight = '500';
}
">
  Theo dõi
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
