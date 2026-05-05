let rules = [];

async function loadRules() {
  const res = await fetch("rules.json");
  const data = await res.json();
  rules = data.rules;
}

function getResponse(input) {
  input = input.toLowerCase();

  for (let rule of rules) {
    for (let pattern of rule.patterns) {
      if (input.includes(pattern.toLowerCase())) {
        return rule.responses[
          Math.floor(Math.random() * rule.responses.length)
        ];
      }
    }
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

loadRules();
