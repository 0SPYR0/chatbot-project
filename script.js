let rules = [];
let rulesLoaded = false;

async function loadRules() {
  const res = await fetch("rules.json");
  const data = await res.json();

  rules = data.rules.map(rule => ({
    ...rule,
    compiledPatterns: rule.patterns.map(p => new RegExp(p, "i"))
  })).sort((a, b) => b.priority - a.priority);

  rulesLoaded = true;
}
