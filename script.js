function sendMessage() {
  // 🔥 FIRST: check if rules are loaded
  if (!rulesLoaded) {
    alert("Bot is still loading...");
    return;
  }

  let inputField = document.getElementById("userInput");
  let message = inputField.value;

  if (message.trim() === "") return;

  let chatBox = document.getElementById("chatBox");

  // user message
  let userMsg = document.createElement("div");
  userMsg.className = "user-msg";
  userMsg.innerText = message;
  chatBox.appendChild(userMsg);

  // bot response (with delay if you added it)
  setTimeout(() => {
    let botMsg = document.createElement("div");
    botMsg.className = "bot-msg";
    botMsg.innerText = getResponse(message);
    chatBox.appendChild(botMsg);

    chatBox.scrollTop = chatBox.scrollHeight;
  }, 500);

  inputField.value = "";
}
