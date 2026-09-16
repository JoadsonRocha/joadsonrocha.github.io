import json

with open('repos_and_releases.json', 'r', encoding='utf-8') as f:
    repos = json.load(f)

print('=== REPOSITORIES WITH RELEASES / ASSETS ===')
for r in repos:
    if r['releases']:
        print(f"Repo: {r['name']} ({r['html_url']})")
        for rel in r['releases']:
            print(f"  Release: {rel['tag_name']} - {rel['name']}")
            for a in rel['assets']:
                print(f"    Asset: {a['name']} ({a['size']} bytes)")
                print(f"    Download: {a['download_url']}")

print('\n=== ALL 32 REPOSITORIES (Sorted by pushed_at) ===')
for r in sorted(repos, key=lambda x: x.get('pushed_at') or '', reverse=True):
    print(f"Name: {r['name']:<30} Pushed: {r['pushed_at'][:10]} Lang: {str(r['language']):<12} Desc: {r['description']}")
