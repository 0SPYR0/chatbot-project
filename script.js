function sendMessage() {
  let inputField = document.getElementById("userInput");
  let message = inputField.value;

  if (message.trim() === "") return;

  let chatBox = document.getElementById("chatBox");

  // user message
  let userMsg = document.createElement("div");
  userMsg.className = "user-msg";
  userMsg.innerText = message;
  chatBox.appendChild(userMsg);

  inputField.value = "";

  // 🔥 CALL BACKEND
  fetch("http://192.168.1.12:5000/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: message })
  })
  .then(res => res.json())
  .then(data => {
    let botMsg = document.createElement("div");
    botMsg.className = "bot-msg";
    botMsg.innerText = data.reply;
    chatBox.appendChild(botMsg);

    chatBox.scrollTop = chatBox.scrollHeight;
  });
}
