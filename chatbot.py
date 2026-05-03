
import json
import re
import random
from pathlib import Path

RULES_FILE = Path(__file__).with_name("rules.json")

def preprocess(text: str) -> str:
    text = text.lower().strip()
    # keep letters, numbers and spaces
    text = re.sub(r"[^a-z0-9\s]", "", text)
    # collapse spaces
    text = re.sub(r"\s+", " ", text)
    return text

class Rule:
    def __init__(self, data: dict):
        self.name = data.get("name", "unnamed")
        self.patterns = [re.compile(p, re.IGNORECASE) for p in data.get("patterns", [])]
        self.responses = data.get("responses", [""])
        # higher priority value = checked earlier
        self.priority = data.get("priority", 0)

    def matches(self, text: str) -> bool:
        for pat in self.patterns:
            if pat.search(text):
                return True
        return False

    def choose_response(self) -> str:
        return random.choice(self.responses)

class RuleBot:
    def __init__(self, rules_path: Path = RULES_FILE, fallback: str = None):
        self.rules_path = rules_path
        self.fallback = fallback or "Sorry, I did not understand. Can you rephrase?"
        self.rules = []
        self.load_rules()

    def load_rules(self):
        if not self.rules_path.exists():
            raise FileNotFoundError(f"Rules file not found: {self.rules_path}")
        with open(self.rules_path, "r", encoding="utf8") as f:
            data = json.load(f)
        rules_raw = data.get("rules", [])
        # create Rule objects
        self.rules = [Rule(r) for r in rules_raw]
        # sort by priority descending (higher priority first), then by order
        self.rules.sort(key=lambda r: r.priority, reverse=True)

    def get_response(self, user_input: str) -> str:
        text = preprocess(user_input)
        # check rules in order
        for rule in self.rules:
            if rule.matches(text):
                return rule.choose_response()
        return self.fallback

def main():
    print("RuleBot (type 'quit' or 'exit' to stop)\n")
    bot = RuleBot()
    while True:
        try:
            user = input("You: ").strip()
        except (KeyboardInterrupt, EOFError):
            print("\nBye.")
            break
        if not user:
            continue
        if user.lower() in ("quit","exit","bye"):
            print("Bot: Goodbye.")
            break
        resp = bot.get_response(user)
        print("Bot:", resp)

if __name__ == "__main__":
    main()
