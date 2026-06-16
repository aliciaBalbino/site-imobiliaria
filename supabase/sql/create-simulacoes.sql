create table if not exists public.simulacoes (
  id bigint generated always as identity primary key,
  nome text not null,
  telefone text,
  email text,
  tipo text default 'Apartamento',
  regiao text,
  finalidade text,
  momento text,
  renda text,
  observacoes text,
  pagina_origem text,
  criado_em timestamp with time zone default now()
);

alter table public.simulacoes enable row level security;

drop policy if exists "Bloquear leitura publica de simulacoes" on public.simulacoes;
drop policy if exists "Permitir inserir simulacoes apenas pela funcao" on public.simulacoes;

-- Sem policy de select/update/delete: visitantes nao conseguem ler, alterar ou apagar.
-- A Edge Function usa service_role no servidor para inserir os dados com seguranca.
