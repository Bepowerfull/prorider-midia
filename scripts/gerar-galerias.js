// Gera um index.html em cada subpasta de img/ dentro da pasta publicada,
// para que https://midia.prorider.app.br/img/<pasta>/ mostre todas as imagens
// com o link direto de cada uma (o que vai para o Runway).
// Titulo da pagina: primeira linha de titulo.txt na pasta, ou o nome da pasta.
const fs = require('fs');
const path = require('path');

const site = process.argv[2] || '_site';
const base = process.env.MIDIA_URL || 'https://midia.prorider.app.br';
const imgDir = path.join(site, 'img');
const ext = /\.(png|jpe?g)$/i;

const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

for (const pasta of fs.readdirSync(imgDir, { withFileTypes: true })) {
  if (!pasta.isDirectory()) continue;
  const dir = path.join(imgDir, pasta.name);
  const imagens = fs.readdirSync(dir).filter((f) => ext.test(f)).sort();
  if (!imagens.length) continue;

  const tituloTxt = path.join(dir, 'titulo.txt');
  const titulo = fs.existsSync(tituloTxt)
    ? fs.readFileSync(tituloTxt, 'utf8').split(/\r?\n/)[0].trim()
    : pasta.name;

  const cards = imagens.map((f) => {
    const url = `${base}/img/${pasta.name}/${f}`;
    return `    <figure>
      <a href="${esc(f)}" target="_blank"><img src="${esc(f)}" alt="${esc(f)}" loading="lazy"></a>
      <figcaption>
        <input readonly value="${esc(url)}" onclick="this.select()">
        <button onclick="copiar(this)" data-url="${esc(url)}">Copiar link</button>
      </figcaption>
    </figure>`;
  }).join('\n');

  const todos = imagens.map((f) => `${base}/img/${pasta.name}/${f}`).join('\n');

  const html = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${esc(titulo)} | ProRider</title>
<style>
  :root { color-scheme: dark; }
  body { margin: 0; background: #111; color: #eee; font: 15px/1.4 system-ui, sans-serif; }
  header { padding: 24px 16px 8px; max-width: 1200px; margin: 0 auto; }
  h1 { margin: 0 0 4px; font-size: 22px; color: #ff8a1f; }
  p { margin: 0 0 12px; color: #aaa; }
  main { display: grid; gap: 16px; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); padding: 8px 16px 32px; max-width: 1200px; margin: 0 auto; }
  figure { margin: 0; background: #1b1b1b; border: 1px solid #2a2a2a; border-radius: 10px; overflow: hidden; }
  figure img { display: block; width: 100%; height: 220px; object-fit: contain; background: #000; }
  figcaption { display: flex; gap: 8px; padding: 10px; }
  input { flex: 1; min-width: 0; background: #111; color: #ddd; border: 1px solid #333; border-radius: 6px; padding: 6px 8px; font-size: 12px; }
  button { background: #ff8a1f; color: #111; border: 0; border-radius: 6px; padding: 6px 10px; font-weight: 600; cursor: pointer; white-space: nowrap; }
  .todos { margin-top: 4px; }
</style>
</head>
<body>
<header>
  <h1>${esc(titulo)}</h1>
  <p>${imagens.length} imagens. Clique numa imagem para abrir em tamanho real.</p>
  <button class="todos" onclick="copiar(this)" data-url="${esc(todos)}">Copiar todos os links</button>
</header>
<main>
${cards}
</main>
<script>
function copiar(b) {
  navigator.clipboard.writeText(b.dataset.url).then(function () {
    var t = b.textContent; b.textContent = 'Copiado!';
    setTimeout(function () { b.textContent = t; }, 1500);
  });
}
</script>
</body>
</html>
`;
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  console.log(`galeria: img/${pasta.name}/ (${imagens.length} imagens)`);
}
