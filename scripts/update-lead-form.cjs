const fs = require("fs");
const path = require("path");

const filePath = path.resolve(__dirname, "..", "assets", "js", "script.js");
const content = fs.readFileSync(filePath, "utf8");
const start = content.indexOf('const leadForm = document.querySelector("#leadForm");');
const end = content.indexOf('document.querySelectorAll(".gallery-grid")', start);

if (start === -1 || end === -1) {
  throw new Error("Nao foi possivel localizar o bloco leadForm.");
}

const replacement = `const leadForm = document.querySelector("#leadForm");
const simulationEndpoint = "https://fofjktyycvdcifnbkwhr.supabase.co/functions/v1/salvar-simulacao";

if (leadForm) {
    leadForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const nome = document.querySelector("#nome").value.trim();
        const tipo = "Apartamento";
        const regiao = document.querySelector("#regiao").value.trim();
        const finalidade = document.querySelector('input[name="finalidade"]:checked')?.value;
        const momento = document.querySelector('input[name="momento"]:checked')?.value;
        const renda = document.querySelector('input[name="renda"]:checked')?.value;
        const observacoes = document.querySelector("#observacoes").value.trim();
        const leadData = {
            nome,
            tipo,
            regiao,
            finalidade,
            momento,
            renda,
            observacoes,
            pagina_origem: window.location.pathname
        };

        const message = [
            \`*Ola, sou* \${nome}.\`,
            \`*Tenho interesse em um imovel do tipo:* \${tipo}.\`,
            regiao ? \`*Regiao desejada:* \${regiao}.\` : "",
            finalidade ? \`*Finalidade:* \${finalidade}.\` : "",
            momento ? \`*Momento da compra:* \${momento}.\` : "",
            renda ? \`*Renda familiar:* \${renda}.\` : "",
            observacoes ? \`*Observacoes:* \${observacoes}\` : ""
        ].filter(Boolean).join("\\n\\n");

        try {
            await fetch(simulationEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(leadData)
            });
        } catch (error) {
            console.error("Nao foi possivel salvar a simulacao no momento.", error);
        }

        const url = \`https://wa.me/5521998120374?text=\${encodeURIComponent(message)}\`;
        window.open(url, "_blank", "noopener");
    });
}

`;

fs.writeFileSync(filePath, content.slice(0, start) + replacement + content.slice(end));
