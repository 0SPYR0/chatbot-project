let rules = [];

async function loadRules() {
  const res = await fetch("rules.json");
  const data = await res.json();

  // sort by priority (high → low)
  rules = data.rules.sort((a, b) => b.priority - a.priority);
}

function preprocess(text) {
  return text.toLowerCase().trim();
}

function getResponse(input) {
  input = preprocess(input);

  for (let rule of rules) {
    for (let pattern of rule.patterns) {
      let regex = new RegExp(pattern, "i");

      if (regex.test(input)) {
        let responses = rule.responses;
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }
  }

  return "Something went wrong.";
}

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

  // bot response
  let botMsg = document.createElement("div");
  botMsg.className = "bot-msg";
  botMsg.innerText = getResponse(message);
  chatBox.appendChild(botMsg);

  inputField.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;
}

// load rules when page loads
loadRules();
