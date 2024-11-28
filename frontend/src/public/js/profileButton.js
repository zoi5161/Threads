function createButtonHTML(user_id) {
  let html = "";
  let status = "";
  if (user_id === "1111") {
    html = `
        <div class="edit">
<button class="edit_btn" data-bs-toggle="modal" data-bs-target="#profileModal">Chỉnh sửa trang cá
  nhân</button>
</div>

<!--Edit Modal Structure -->
<div class="modal fade" id="profileModal" tabindex="-1" aria-labelledby="profileModalLabel"
aria-hidden="true">
<div class="modal-dialog modal-dialog-centered modal-dialog-profile modal-dialog-centered-profile">
  <div class="modal-content modal-custom-profile" id="modal-1">
    <div class="special_element_m">
      <div class="element_m">
        <div class="title_m">Tên</div>
        <span id="editName" class="edit_profile_m">Username</span>
        <hr class="line_m" />
      </div>
      <div class="avt_m">
        <img
          src="https://th.bing.com/th/id/OIP.U0D5JdoPkQMi4jhiriSVsgHaHa?w=181&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
          alt="User Avatar" />
      </div>
    </div>


    <div class="element_m">
      <div class="title_m">Tiểu sử</div>
      <span id="editBio" class="edit_profile_m">Xin chào Thread</span>
    </div>

    <hr class="line_m" />

    <div class="element_m">
      <div class="title_m">Liên kết</div>
      <span id="link_social_m" class="edit_profile_m">Facebook.com-link-to-fb-long-overflow</span>
    </div>

    <hr class="line_m" />

    <div class="special_element_m">
      <div class="element_m">
        <div class="title_m">Hiển thị biểu tượng Instagram</div>
        <p>Khi bạn tắt, huy hiệu Threads trên trang cá nhân Instagram cũng sẽ biến mất.</p>
      </div>
      <div class="switch_btn_m form-switch">
        <input class="form-check-input" type="checkbox" id="insta_btn_m">
        <label class="switch_label" for="insta_btn_m"></label>
      </div>

    </div>

    <hr class="line_m" />

    <div class="special_element_m">
      <div class="element_m">
        <div class="title_m">Trang cá nhân riêng tư</div>
        <p>Nếu chuyển sang chế độ riêng tư, bạn sẽ không thể trả lời người khác trừ khi họ theo dõi bạn.
        </p>
      </div>
      <div class="switch_btn_m form-switch">
        <input class="form-check-input" type="checkbox" id="private_btn_m">
        <label class="switch_label" for="private_btn_m"></label>
      </div>
    </div>
    <div class="done_btn_m">
      <button type="button" data-bs-toggle="modal" data-bs-target="#profileModal"
        onclick="update_User('1111')">Xong</button>
    </div>
  </div>
</div>
</div>

<!--Edit Extreme Modal Structure -->
<div class="modal fade" id="editProfileModal" tabindex="-1" aria-labelledby="editProfileModalLabel2"
aria-hidden="true">
<div class="modal-dialog modal-dialog-centered modal-dialog-profile modal-dialog-centered-profile">
  <div class="modal-content modal-custom-profile" id="modal-2">
    <div class="modal-header">
      <div class="modal-2-header-btn">
        <button type="button" class="btn" style="color: var(--white)" data-bs-dismiss="modal"
          aria-label="Close">Hủy</button>
      </div>
      <h5 class="modal-title" id="editProfileModalLabel2">Chỉnh sửa trang cá nhân</h5>
      <div class="modal-2-header-btn">
        <button id="finish_button" type="button" class="btn" style="color: var(--white)"
          data-bs-dismiss="modal" aria-label="Close">Xong</button>
      </div>
    </div>
    <div class="modal-body">
      <textarea name="profile_edit" id="profile_edit_m">Nhập thông tin bạn muốn thay đổi</textarea>
      <span>Thông tin của bạn hiển thị công khai.</span>
    </div>
    <div class="modal-footer">
      <a href="#">Nhập từ instagram</a>
    </div>
  </div>
</div>
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
