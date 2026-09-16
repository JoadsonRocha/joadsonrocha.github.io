import urllib.request
import json
import os

url = 'https://api.github.com/users/joadsonrocha/repos?per_page=100&sort=updated'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})

try:
    with urllib.request.urlopen(req) as resp:
        repos = json.loads(resp.read().decode())
    
    print(f"Total repos: {len(repos)}")
    result = []
    for r in repos:
        name = r.get('name')
        desc = r.get('description')
        html_url = r.get('html_url')
        homepage = r.get('homepage')
        pushed_at = r.get('pushed_at')
        archived = r.get('archived')
        fork = r.get('fork')
        lang = r.get('language')
        topics = r.get('topics', [])
        
        # Check releases
        rel_url = f"https://api.github.com/repos/joadsonrocha/{name}/releases"
        rel_req = urllib.request.Request(rel_url, headers={'User-Agent': 'Mozilla/5.0'})
        releases_info = []
        try:
            with urllib.request.urlopen(rel_req) as rel_resp:
                releases = json.loads(rel_resp.read().decode())
                for rel in releases:
                    assets = []
                    for a in rel.get('assets', []):
                        assets.append({
                            'name': a.get('name'),
                            'download_url': a.get('browser_download_url'),
                            'size': a.get('size')
                        })
                    releases_info.append({
                        'tag_name': rel.get('tag_name'),
                        'name': rel.get('name'),
                        'html_url': rel.get('html_url'),
                        'assets': assets
                    })
        except Exception as e:
            pass
            
        result.append({
            'name': name,
            'description': desc,
            'html_url': html_url,
            'homepage': homepage,
            'pushed_at': pushed_at,
            'archived': archived,
            'fork': fork,
            'language': lang,
            'topics': topics,
            'releases': releases_info
        })
        
    with open('repos_and_releases.json', 'w', encoding='utf-8') as f:
        json.dump(result, f, indent=2, ensure_ascii=False)
        
    print("Saved repos_and_releases.json successfully.")

except Exception as e:
    print("Error:", e)
