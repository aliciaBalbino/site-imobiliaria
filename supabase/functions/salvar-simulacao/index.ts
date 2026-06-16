import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const MIN_FILL_TIME_MS = 2500;
const MAX_FIELD_LENGTH = 500;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isTooLong = (value: string) => value.length > MAX_FIELD_LENGTH;

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
  const supabaseServiceRoleKey = Deno.env.get("LEADS_SERVICE_KEY");

  if (!supabaseUrl || !supabaseServiceRoleKey) {
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

  const lead = {
    nome: String(body.nome || "").trim(),
    telefone: String(body.telefone || "").trim(),
    email: String(body.email || "").trim(),
    tipo: String(body.tipo || "Apartamento").trim(),
    regiao: String(body.regiao || "").trim(),
    finalidade: String(body.finalidade || "").trim(),
    momento: String(body.momento || "").trim(),
    renda: String(body.renda || "").trim(),
    observacoes: String(body.observacoes || "").trim(),
    pagina_origem: String(body.pagina_origem || "").trim(),
  };
  const honeypot = String(body.empresa || "").trim();
  const fillTime = Number(body.tempo_preenchimento_ms || 0);

  if (honeypot || fillTime < MIN_FILL_TIME_MS) {
    return Response.json(
      { error: "Envio recusado." },
      { status: 400, headers: corsHeaders },
    );
  }

  if (!lead.nome || !lead.telefone || !lead.email || !lead.finalidade || !lead.momento || !lead.renda) {
    return Response.json(
      { error: "Preencha os campos obrigatorios." },
      { status: 400, headers: corsHeaders },
    );
  }

  if (
    !emailPattern.test(lead.email) ||
    lead.telefone.replace(/\D/g, "").length < 10 ||
    Object.values(lead).some((value) => isTooLong(String(value)))
  ) {
    return Response.json(
      { error: "Dados invalidos." },
      { status: 400, headers: corsHeaders },
    );
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
  const { error } = await supabase.from("simulacoes").insert(lead);

  if (error) {
    return Response.json(
      { error: "Nao foi possivel salvar a simulacao." },
      { status: 500, headers: corsHeaders },
    );
  }

  return Response.json({ ok: true }, { headers: corsHeaders });
});
