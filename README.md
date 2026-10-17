# prorider-midia

Imagens publicas de marketing do ProRider, servidas em https://midia.prorider.app.br/img/<arquivo>.

Regras: nomes sem espaco/acento, so .png/.jpg, nada com dados de aluno ou informacao interna.
Para publicar: coloque o arquivo em img/ e faca git push.


Publicacao: GitHub Action (.github/workflows/deploy.yml) envia para a Netlify (site prorider-midia) a cada push na main. Precisa do secret NETLIFY_AUTH_TOKEN no repositorio.


Pastas por video: crie img/<pasta>/ com as imagens (e opcionalmente titulo.txt com o titulo). Na publicacao, scripts/gerar-galerias.js cria img/<pasta>/index.html, entao https://midia.prorider.app.br/img/<pasta>/ mostra todas as imagens com o link de cada uma.
