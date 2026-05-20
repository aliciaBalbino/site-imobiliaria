const filterButtons = document.querySelectorAll(".filter-button");
const propertyCards = document.querySelectorAll(".property-card[data-category]");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        filterButtons.forEach((item) => item.classList.remove("active"));
        button.classList.add("active");

        propertyCards.forEach((card) => {
            const categories = card.dataset.category.split(" ");
            const shouldShow = filter === "todos" || categories.includes(filter);
            card.classList.toggle("hidden", !shouldShow);
        });
    });
});

const leadForm = document.querySelector("#leadForm");

if (leadForm) {
    leadForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const nome = document.querySelector("#nome").value.trim();
        const tipo = document.querySelector("#tipo").value;
        const regiao = document.querySelector("#regiao").value.trim();
        const valor = document.querySelector("#valor").value;
        const observacoes = document.querySelector("#observacoes").value.trim();

        const message = [
            `Olá, sou ${nome}.`,
            `Tenho interesse em um imóvel do tipo: ${tipo}.`,
            regiao ? `Região desejada: ${regiao}.` : "",
            `Faixa de investimento: ${valor}.`,
            observacoes ? `Observações: ${observacoes}` : ""
        ].filter(Boolean).join("\n");

        const url = `https://wa.me/5521998120374?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank", "noopener");
    });
}
