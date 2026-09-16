import json
import re

with open('repos_and_releases.json', 'r', encoding='utf-8') as f:
    repos = json.load(f)

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# match href="https://github.com/JoadsonRocha/<repo>"
existing_repos = set(re.findall(r'github\.com/JoadsonRocha/([^/"\s]+)', html, re.IGNORECASE))
existing_lower = {r.lower() for r in existing_repos}

print("=== REPOSITORIES IN GITHUB BUT NOT IN INDEX.HTML ===")
for r in sorted(repos, key=lambda x: x.get('pushed_at') or '', reverse=True):
    name = r['name']
    if name.lower() not in existing_lower and name.lower() != 'joadsonrocha.github.io':
        print(f"NEW: {name:<30} | {r['pushed_at'][:10]} | {str(r['language']):<12} | {r['description']}")

print("\n=== REPOSITORIES ALREADY IN INDEX.HTML ===")
for r in sorted(repos, key=lambda x: x.get('pushed_at') or '', reverse=True):
    name = r['name']
    if name.lower() in existing_lower:
        print(f"EXISTING: {name:<30} | {r['pushed_at'][:10]} | {str(r['language']):<12}")
