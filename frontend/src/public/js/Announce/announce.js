async function Detail(button)
{
    var notiWrapper = button.closest(".noti_wrapper");
    var notiId = notiWrapper.getAttribute("data-id"); // Lấy giá trị data-id của noti_wrapper
    var notiType = notiWrapper.getAttribute("data-type"); // Lấy giá trị data-type của noti_wrapper
    if (notiType === "follow")
    {
      window.location.href = `/Profile?user_id=${notiId}`;
    }
    else
    {
      window.location.href = `/comment?thread_id=${notiId}`;
    }
    await Seen(button);
}

async function Seen(button)
{
    //console.log("Seen");
    var notiWrapper = button.closest(".noti_wrapper");
    //console.log(notiWrapper);
    const un_seen_class = "un_seen";
    if (notiWrapper.classList.contains(un_seen_class))
    {
      notiWrapper.classList.remove(un_seen_class);
    }
    const new_noti_sign = notiWrapper.querySelector(".new_noti_sign");
    if (new_noti_sign)
    {
      new_noti_sign.remove();
    }
    var noti_id = notiWrapper.id;
    await fetchSeen(noti_id, true);
}

async function UnSeen(button){
    //console.log("UnSeen");
    var notiWrapper = button.closest(".noti_wrapper");
    const un_seen_class = "un_seen";
    if (!notiWrapper.classList.contains(un_seen_class))
    {
      notiWrapper.classList.add(un_seen_class);
    }
    const new_noti_sign = document.createElement("div");
    new_noti_sign.classList.add("new_noti_sign");
    const dot_icon_HTML = `<i class="bi bi-dot"></i>`
    if (notiWrapper.querySelector(".new_noti_sign"))
    {
      return;
    }
    new_noti_sign.innerHTML = dot_icon_HTML;
    notiWrapper.appendChild(new_noti_sign);
    await fetchSeen(notiWrapper.id, false);
}

function DeleteNoti(button)
{
    //console.log("Delete");
    var notiWrapper = button.closest(".noti_wrapper");
    if (notiWrapper)
    {
      notiWrapper.remove();
      fetchDeleteNoti(notiWrapper.id);
      checkNotifications("Không có thông báo nào");
    }
}

async function fetchSeen(noti_id, seen)
{
  try{
    fetch(backendDomain + `/noti/seen/`, {
      method: "PUT",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({noti_id: noti_id ,seen: seen}),
    });
  }
  catch(err)
  {
    //console.log(err);
  }
}


async function fetchDeleteNoti(noti_id){
  try{
    fetch(backendDomain + `/noti/${noti_id}`, {
      method: "DELETE",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  catch(err)
  {
    //console.log(err);
  }
}

function checkNotifications(msg) {
  const notiWrappers = document.querySelectorAll(".noti_wrapper");

  const existingNoNotiMessage = document.querySelector(".no-notifications");
  if (existingNoNotiMessage) {
      existingNoNotiMessage.remove();
  }

  if (notiWrappers.length === 0) {
      const noNotiMessage = document.createElement("div");
      noNotiMessage.className = "no-notifications";
      noNotiMessage.textContent = msg;
      const container = document.querySelector(".container-fluid");
      container.appendChild(noNotiMessage);
  }
}

async function fetchCreateNoti(obj){
  try{
    fetch(backendDomain + `/noti/`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
  }
  catch(err)
  {
    //console.log(err);
  }
}