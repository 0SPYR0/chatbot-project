function getResponse(input) {
  input = input.toLowerCase();

  if (input.includes("hello") || input.includes("hi")) {
    return "Hello! 👋";
  }

  if (input.includes("how are you")) {
    return "I'm just code, but I'm doing great 😄";
  }

  if (input.includes("bye")) {
    return "Goodbye! 👋";
  }

  return "Sorry, I didn't understand.";
}

function sendMessage() {
  let input = document.getElementById("userInput");
  let message = input.value;

  if (message.trim() === "") return;

  let chatBox = document.getElementById("chatBox");

  let userMsg = document.createElement("div");
  userMsg.className = "user-msg";
  userMsg.innerText = message;
  chatBox.appendChild(userMsg);

  let botMsg = document.createElement("div");
  botMsg.className = "bot-msg";
  botMsg.innerText = getResponse(message);
  chatBox.appendChild(botMsg);

  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;
}
