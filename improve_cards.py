import re

file_path = 'index.html'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

replacements = [
    (
        '''          <h3>apoe-me</h3>
          <p>sistema de apoio financeiro a desenvovedor</p>
          <div class="tech">
            <span>HTML</span>''',
        '''          <h3>apoe-me</h3>
          <p>Sistema de apoio financeiro a desenvolvedores. Interface simples e direta.</p>
          <div class="tech">
            <span>HTML</span> <span>CSS</span>'''
    ),
    (
        '''          <h3>ColetaneaJA</h3>
          <p>Coletanea de Louvor Miltiplataforma</p>
          <div class="tech">
            <span>JavaScript</span>''',
        '''          <h3>ColetaneaJA</h3>
          <p>Coletânea de Louvor Multiplataforma rápida e de fácil acesso.</p>
          <div class="tech">
            <span>JavaScript</span> <span>HTML</span> <span>CSS</span>'''
    ),
    (
        '''          <h3>Contador-js</h3>
          <p>pequeno projeto em javascript </p>
          <div class="tech">
            <span>JavaScript</span>''',
        '''          <h3>Contador-js</h3>
          <p>Contador interativo desenvolvido para praticar lógicas básicas.</p>
          <div class="tech">
            <span>JavaScript</span> <span>HTML</span>'''
    ),
    (
        '''          <h3>Dados</h3>
          <p>jogo de dados</p>
          <div class="tech">
            <span>JavaScript</span>''',
        '''          <h3>Dados</h3>
          <p>Jogo de dados virtual. Um pequeno passatempo dinâmico no navegador.</p>
          <div class="tech">
            <span>JavaScript</span> <span>HTML</span>'''
    ),
    (
        '''          <h3>FlowHub</h3>
          <p>Programa de gerenciar tarefas do dia </p>
          <div class="tech">
            <span>TypeScript</span>''',
        '''          <h3>FlowHub</h3>
          <p>Aplicativo para gerenciamento eficiente de tarefas do dia a dia, focado em organização.</p>
          <div class="tech">
            <span>TypeScript</span> <span>Node.js</span>'''
    ),
    (
        '''          <h3>GUI-Tkinter</h3>
          <p>Abrir videos em pasta local- buscar de mp4</p>
          <div class="tech">
            <span>Python</span>''',
        '''          <h3>GUI-Tkinter</h3>
          <p>Interface gráfica para buscar e reproduzir vídeos locais no formato MP4.</p>
          <div class="tech">
            <span>Python</span> <span>Tkinter</span>'''
    ),
    (
        '''          <h3>Headers-Animados-CSS-e-JS</h3>
          <p>Headers animados html e css</p>
          <div class="tech">
            <span>CSS</span>''',
        '''          <h3>Headers-Animados-CSS-e-JS</h3>
          <p>Coleção de cabeçalhos responsivos e animados desenvolvidos em HTML, CSS e JS.</p>
          <div class="tech">
            <span>HTML</span> <span>CSS</span> <span>JavaScript</span>'''
    ),
    (
        '''          <h3>Html-e-CSS-GoogleGlass</h3>
          <p>Sem descrição.</p>
          <div class="tech">
            <span>HTML</span>''',
        '''          <h3>Html-e-CSS-GoogleGlass</h3>
          <p>Página estática informativa sobre o Google Glass.</p>
          <div class="tech">
            <span>HTML</span> <span>CSS</span>'''
    ),
    (
        '''          <h3>joadsonrocha.github.io</h3>
          <p>Site do meu gitHub</p>
          <div class="tech">
            <span>HTML</span>''',
        '''          <h3>joadsonrocha.github.io</h3>
          <p>Repositório do portfólio pessoal e página hospedada no GitHub Pages.</p>
          <div class="tech">
            <span>HTML</span> <span>CSS</span> <span>JavaScript</span>'''
    ),
    (
        '''          <h3>Logo-Instagran</h3>
          <p>Logo do Instagram  com HTML e CSS</p>
          <div class="tech">
            <span>CSS</span>''',
        '''          <h3>Logo-Instagran</h3>
          <p>Recriação visual do logo do Instagram utilizando apenas marcação e estilo.</p>
          <div class="tech">
            <span>HTML</span> <span>CSS</span>'''
    ),
    (
        '''          <h3>Modelo-Templates-dos-projetos</h3>
          <p>Modelo para criar projetos com uma pequena Formatação</p>
          <div class="tech">
            <span>HTML</span>''',
        '''          <h3>Modelo-Templates-dos-projetos</h3>
          <p>Template base pré-formatado para iniciar projetos web de forma ágil e padronizada.</p>
          <div class="tech">
            <span>HTML</span> <span>CSS</span>'''
    ),
    (
        '''          <h3>MultDowload_Web</h3>
          <p>Sem descrição.</p>
          <div class="tech">
            <span>HTML</span>''',
        '''          <h3>MultDowload_Web</h3>
          <p>Versão web da ferramenta MultDownload com interface amigável.</p>
          <div class="tech">
            <span>HTML</span> <span>CSS</span> <span>JavaScript</span>'''
    ),
    (
        '''          <h3>RochaFlamengo.ga</h3>
          <p>Projeto BlogFlamengo</p>
          <div class="tech">
            <span>HTML</span>''',
        '''          <h3>RochaFlamengo.ga</h3>
          <p>Blog temático dedicado ao time do Flamengo. Foco em estruturação web.</p>
          <div class="tech">
            <span>HTML</span> <span>CSS</span>'''
    ),
    (
        '''          <h3>Verificar-de-idade</h3>
          <p>javascript</p>
          <div class="tech">
            <span>JavaScript</span>''',
        '''          <h3>Verificar-de-idade</h3>
          <p>Aplicação em JavaScript para verificação e validação de faixa etária baseada no ano.</p>
          <div class="tech">
            <span>JavaScript</span> <span>HTML</span>'''
    )
]

for old, new in replacements:
    content = content.replace(old, new)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated descriptions and technologies.")
