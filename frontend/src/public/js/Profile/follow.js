async function followProcess(user_id) {
    const userId = user_id; // Replace with the actual user ID you want to fetch data for
    const userData = await getUserData(userId);

    // Assuming userData contains followers and following arrays
    const followersList = document.getElementById('followersList');
    const followingList = document.getElementById('followingList');

    // Clear previous lists
    followersList.innerHTML = '';
    followingList.innerHTML = '';

    // Add followers to the list
    for (const follower_id of userData.followers) {
        const follow_data = await getUserData(follower_id);

        const content = `<li class="list-group-item">
            <div class="user-info d-flex align-items-center">
                <img src="${follow_data.avt_url}" alt="Avatar" class="rounded-circle" style="width: 40px; height: 40px;">
                <div class="user-info-text">
                    <span class="user-name">${follow_data.user_name}</span>
                    <span class="full-name" style="font-size: 100%;
    font-weight: normal; color: #777777">${follow_data.full_name}</span>
                </div>
            </div>
            <button type="button" class="btn btn-dark post_btn"
                style="color: var(--white); background-color: var(--black); border-color: var(--border); padding: 10px; font-size:90%">
            Theo dõi lại
            </button>
        </li>`;

        followersList.innerHTML += content; // Correct way to append content
    }

    // Add following to the list
    for (const following_id of userData.following) {
        const follow_data = await getUserData(following_id);
        
        const content = `<li class="list-group-item">
            <div class="user-info d-flex align-items-center">
                <img src="${follow_data.avt_url}" alt="Avatar" class="rounded-circle" style="width: 40px; height: 40px;">
                <div class="user-info-text">
                    <span class="user-name">${follow_data.user_name}</span>
                    <span class="full-name" style="font-size: 100%;
    font-weight: normal; color: #777777">${follow_data.full_name}</span>
                </div>
            </div>
            <button type="button" class="btn btn-dark post_btn"
                style="color: var(--white); background-color: var(--black); border-color: var(--border); padding: 10px; font-size:90%">
            Hủy Theo dõi
            </button>
        </li>`;

        followingList.innerHTML += content; // Correct way to append content
    }
}
