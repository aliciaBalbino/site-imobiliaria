create table if not exists public.cliques_whatsapp (
  id bigint generated always as identity primary key,
  origem text not null,
  pagina_origem text,
  titulo_pagina text,
  destino text default 'whatsapp',
  criado_em timestamp with time zone default now()
);

alter table public.cliques_whatsapp enable row level security;

-- Sem policies publicas:
-- visitantes nao conseguem ler, alterar nem apagar os registros.
-- A Edge Function usa LEADS_SERVICE_KEY no servidor para inserir os cliques.
