import urllib.request
import json
import re
import os

url = 'https://api.github.com/users/joadsonrocha/repos?per_page=100'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response:
        repos = json.loads(response.read().decode())
        
    index_path = 'index.html'
    with open(index_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find existing github repo URLs in the file (case-insensitive)
    existing_urls = set(re.findall(r'href="(https://github\.com/[^/]+/[^/"]+)"', content, re.IGNORECASE))
    existing_urls_lower = {u.lower() for u in existing_urls}

    html_to_add = ''
    for r in repos:
        repo_url = r.get('html_url')
        if repo_url.lower() in existing_urls_lower:
            continue
            
        name = r.get('name')
        desc = r.get('description') or 'Sem descrição.'
        lang = r.get('language')
        
        tech_span = f'<span>{lang}</span>' if lang else ''
        
        card = f'''        <div class="project-card" data-tilt data-tilt-max="5" data-tilt-speed="400" data-tilt-glare data-tilt-max-glare="0.2">
          <h3>{name}</h3>
          <p>{desc}</p>
          <div class="tech">
            {tech_span}
          </div>
          <div class="project-links">
            <a href="{repo_url}" class="btn" target="_blank"><i class="fab fa-github"></i> Ver no GitHub</a>
          </div>
        </div>\n'''
        html_to_add += card

    if html_to_add:
        # Find the end of projects-grid
        # We look for the closing div of projects-grid, which is right before </section>
        insertion_point = '      </div>\n    </section>'
        
        if insertion_point in content:
            new_content = content.replace(insertion_point, html_to_add + insertion_point)
            with open(index_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f'Successfully added new repositories to {index_path}')
        else:
            print('Could not find the insertion point in index.html')
    else:
        print('No new repositories to add.')
        
except Exception as e:
    print('Error:', e)
