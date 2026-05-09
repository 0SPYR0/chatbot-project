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

  // 👇 LOADING MESSAGE
  let loadingMsg = document.createElement("div");
  loadingMsg.className = "bot-msg";
  loadingMsg.innerText = "Typing...";
  chatBox.appendChild(loadingMsg);

  chatBox.scrollTop = chatBox.scrollHeight;

  // call backend
  fetch("http://192.168.1.12:5001/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: message })
  })
  .then(res => res.json())
  .then(data => {
    chatBox.removeChild(loadingMsg); // remove "Typing..."

    // 👇 typing animation
    typeMessage(data.reply, chatBox);
  });
}
