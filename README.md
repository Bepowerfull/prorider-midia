# prorider-midia

Imagens publicas de marketing do ProRider, servidas em https://midia.prorider.app.br/img/<arquivo>.

Regras: nomes sem espaco/acento, so .png/.jpg, nada com dados de aluno ou informacao interna.
Para publicar: coloque o arquivo em img/ e faca git push.


Publicacao: GitHub Action (.github/workflows/deploy.yml) envia para a Netlify (site prorider-midia) a cada push na main. Precisa do secret NETLIFY_AUTH_TOKEN no repositorio.
