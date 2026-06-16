import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return Response.json(
      { error: "Metodo nao permitido." },
      { status: 405, headers: corsHeaders },
    );
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const leadsServiceKey = Deno.env.get("LEADS_SERVICE_KEY");

  if (!supabaseUrl || !leadsServiceKey) {
    return Response.json(
      { error: "Variaveis do Supabase nao configuradas." },
      { status: 500, headers: corsHeaders },
    );
  }

  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return Response.json(
      { error: "Dados invalidos." },
      { status: 400, headers: corsHeaders },
    );
  }

  const click = {
    origem: String(body.origem || "").trim(),
    pagina_origem: String(body.pagina_origem || "").trim(),
    titulo_pagina: String(body.titulo_pagina || "").trim(),
    destino: String(body.destino || "whatsapp").trim(),
  };

  if (!click.origem) {
    return Response.json(
      { error: "Origem do clique obrigatoria." },
      { status: 400, headers: corsHeaders },
    );
  }

  const supabase = createClient(supabaseUrl, leadsServiceKey);
  const { error } = await supabase.from("cliques_whatsapp").insert(click);

  if (error) {
    return Response.json(
      { error: "Nao foi possivel registrar o clique." },
      { status: 500, headers: corsHeaders },
    );
  }

  return Response.json({ ok: true }, { headers: corsHeaders });
});
