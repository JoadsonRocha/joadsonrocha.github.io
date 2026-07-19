import urllib.request
import json
import os

url = 'https://api.github.com/users/joadsonrocha/repos?per_page=100'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response:
        repos = json.loads(response.read().decode())
        
    html = ''
    for r in repos:
        name = r.get('name')
        desc = r.get('description') or 'Sem descrição.'
        lang = r.get('language')
        url_repo = r.get('html_url')
        
        tech_span = f'<span>{lang}</span>' if lang else ''
        
        card = f'''        <div class="project-card" data-tilt data-tilt-max="5" data-tilt-speed="400" data-tilt-glare data-tilt-max-glare="0.2">
          <h3>{name}</h3>
          <p>{desc}</p>
          <div class="tech">
            {tech_span}
          </div>
          <div class="project-links">
            <a href="{url_repo}" class="btn" target="_blank"><i class="fab fa-github"></i> GitHub</a>
          </div>
        </div>\n'''
        html += card
    
    with open('repos_cards.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print('Generated repos_cards.html')
except Exception as e:
    print('Error:', e)
