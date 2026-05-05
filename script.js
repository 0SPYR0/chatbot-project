function sendMessage() {
  let input = document.getElementById("userInput");
  let message = input.value;

  if (message.trim() === "") return;

  let chatBox = document.getElementById("chatBox");

  let userMsg = document.createElement("div");
  userMsg.className = "user-msg";
  userMsg.innerText = message;

  chatBox.appendChild(userMsg);

  // fake bot reply
  let botMsg = document.createElement("div");
  botMsg.className = "bot-msg";
  botMsg.innerText = "I'm just a basic bot 😅";

  chatBox.appendChild(botMsg);

  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;
}
