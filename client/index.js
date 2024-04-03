const socket = io();
let msgContainer = document.getElementById("msgContainer");
let form = document.getElementById("chatForm");
let msgInput = document.getElementById("msgInput");
let sendBtn = document.getElementById("sendBtn");
let exiBtn = document.getElementById("exit");
const date = new Date(2011, 0, 1);

let uName = prompt("What is your name?");
console.log(uName);
if (uName != null && uName != "") {
  socket.emit("new-user", uName);
  socket.on("user-connected", (name) => {

    sendMessage("other", `joined to conversion`, name);
  });

  socket.on("recive-message", (data) => {
    console.log("data");
    sendMessage("other", `${data.msg}`, `${data.username}`);
    console.log(data);
  });
  socket.on("user-disconnected", (name) => {
    sendMessage("other", `${name} disconnected`);
  });

  socket.on("exit", function (name) {
    sendMessage("other", "left the conversation", name);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let message = msgInput.value;
    sendMessage("me", `${message}`, "You");
    var data = {
      msg: message,
      username: uName,
    };
    socket.emit("send-message", data);
    msgInput.value = "";
  });

  exiBtn.addEventListener("click", function () {
    socket.emit("exit-user", uName);
    window.location.href = window.location.href;
  });
} else {
  window.location.href = window.location.href;
}

function sendMessage(type, message, senderName) {
  let msg = document.createElement("div");
  msg.id = "msgDiv";
  if (type == "me") {
    msg.classList = "d-flex flex-row justify-content-start";
    msg.innerHTML = `<img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
        alt="avatar 1" style="width: 45px; height: 100%;">
        <div >
        <p class="small p-2 ms-3 mb-1 rounded-3" style="background-color: #EFEFEF;">
        <span class="text-muted opacity-75 ">${senderName}</span><br>
           ${message}</p>
        </div>`;
  } else {
    msg.classList = "d-flex flex-row justify-content-end";
    msg.innerHTML = ` 
        <div>
        <p class="small p-2 ms-3 mb-1 rounded-3" style="background-color: #F6F7C1;">
        <span class="text-muted opacity-75 ">${senderName}</span><br>
           ${message}</p>
        </div>
    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
        alt="avatar 1" style="width: 45px; height: 100%;">`;
  }
  msgContainer.append(msg);

  msgContainer.scrollTop = msgContainer.scrollHeight;
}
