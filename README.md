# Adriana Balbino Imobiliaria

Site estatico para apresentacao de imoveis, captacao de interesse e contato rapido pelo WhatsApp.

## Arquitetura

Esta estrutura segue um modelo simples e comprovado para sites estaticos: paginas principais na raiz, paginas de detalhe agrupadas por dominio e arquivos de interface dentro de `assets`.

```text
site-imobiliaria/
├── index.html
├── imoveis.html
├── simulacao.html
├── quemSomos.html
├── empreendimentos/
│   ├── orla-recreio-reserva.html
│   └── outros-empreendimentos.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   ├── images/
│   │   ├── logo-adriana-balbino-transparente.png
│   │   └── pastas-dos-empreendimentos/
│   └── videos/
│       └── redemerChrist.mp4
└── scripts/
    ├── check-local-paths.cjs
    └── reorganize-paths.cjs
```

## Como navegar

- `index.html`: pagina inicial.
- `imoveis.html`: listagem dos imoveis.
- `simulacao.html`: formulario de interesse.
- `quemSomos.html`: pagina institucional.
- `empreendimentos/`: paginas individuais dos empreendimentos.

## Convencoes de caminhos

Nas paginas principais, use:

```html
<link rel="stylesheet" href="assets/css/style.css">
<script src="assets/js/script.js"></script>
<img src="assets/images/nome-da-imagem.png" alt="">
```

Nas paginas dentro de `empreendimentos/`, use:

```html
<link rel="stylesheet" href="../assets/css/style.css">
<script src="../assets/js/script.js"></script>
<img src="../assets/images/nome-da-imagem.png" alt="">
```

## Manutencao

Se algum arquivo for movido novamente, rode:

```bash
node scripts/reorganize-paths.cjs
```

Esse script ajusta os caminhos de CSS, JavaScript, imagens, videos e links dos empreendimentos.

Para conferir se nenhum caminho local quebrou:

```bash
node scripts/check-local-paths.cjs
```

## Variaveis de ambiente e Supabase

O arquivo `.env` deve ficar apenas no computador local ou no painel da hospedagem. Ele ja esta ignorado pelo Git.

Use `.env.example` apenas como modelo, sem chaves reais.

```text
.env              -> nao vai para o GitHub
.env.example      -> pode ir para o GitHub, sem valores reais
```

Importante: em site 100% estatico, qualquer chave usada diretamente pelo navegador fica visivel para visitantes. Para esconder completamente as chaves do Supabase, use um backend, uma Edge Function do Supabase ou uma Serverless Function na hospedagem.

Nunca coloque `SUPABASE_SERVICE_ROLE_KEY` no HTML, CSS ou JavaScript publico.

## Supabase Edge Function

O formulario de simulacao envia os dados para:

```text
https://fofjktyycvdcifnbkwhr.supabase.co/functions/v1/salvar-simulacao
```

Arquivos criados:

```text
supabase/config.toml
supabase/functions/salvar-simulacao/index.ts
supabase/sql/create-simulacoes.sql
```

Ordem recomendada:

```bash
# 1. Rode o SQL de supabase/sql/create-simulacoes.sql no SQL Editor do Supabase.

# 2. Configure a chave secreta da Edge Function.
supabase secrets set LEADS_SERVICE_KEY=sua_secret_api_key

# 3. Publique a funcao.
supabase functions deploy salvar-simulacao
```

A chave secreta fica somente no Supabase, nunca no frontend.
