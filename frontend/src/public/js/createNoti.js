async function getAllNotiOfUser() {
  try{
    const response = await fetch(backendDomain + '/noti', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
  });
    if(!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  }
  catch(err){
    //console.log('Error when getting all notifications:', err);
  }
}

async function createNoti(){
  checkNotifications("Loading...");
  const list_noti = await getAllNotiOfUser();
    const postContainer = document.querySelector(".container_post");
    list_noti.forEach(noti => {
        if (noti.user.avt_url)
          noti.user.avt_url = backendDomain + noti.user.avt_url
        else
          noti.user.avt_url = null;
        const notiHTML = createNotiHTML(noti);
        postContainer.insertAdjacentHTML('afterbegin', notiHTML);

        const current_noti = postContainer.querySelector('.noti_wrapper');
        const header_info_wrapper = current_noti.querySelector('.header_info_wrapper');

        const msg = document.createElement('div');
        msg.classList.add('msg');
        msg.innerHTML = noti.msg;

        header_info_wrapper.appendChild(msg);
    });

    //console.log("List noti:", list_noti);

    if(list_noti == null)
    {
      checkNotifications("");
    }
    else
    {
      checkNotifications("Không có thông báo nào");
    }
}

