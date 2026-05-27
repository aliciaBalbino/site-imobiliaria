const filterButtons = document.querySelectorAll(".filter-button");
const propertyCards = document.querySelectorAll(".property-card");
const categoryCards = document.querySelectorAll(".property-card[data-category]");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        filterButtons.forEach((item) => item.classList.remove("active"));
        button.classList.add("active");

        categoryCards.forEach((card) => {
            const categories = card.dataset.category.split(" ");
            const shouldShow = filter === "todos" || categories.includes(filter);
            card.classList.toggle("hidden", !shouldShow);
        });
    });
});


const regionSelect = document.querySelector('select[name="regiao"]');
const bedroomSelect = document.querySelector('select[name="quartos"]');
const searchParams = new URLSearchParams(window.location.search);
const selectedRegion = searchParams.get("regiao");
const selectedBedrooms = searchParams.get("quartos")?.match(/\d/)?.[0];

if (regionSelect && selectedRegion) {
    regionSelect.value = selectedRegion;
}

if (bedroomSelect && selectedBedrooms) {
    bedroomSelect.value = `${selectedBedrooms}+`;
}

if ((selectedRegion || selectedBedrooms) && propertyCards.length) {
    propertyCards.forEach((card) => {
        const matchesRegion = !selectedRegion || card.dataset.region === selectedRegion;
        const bedrooms = card.dataset.bedrooms ? card.dataset.bedrooms.split(" ") : [];
        const matchesBedrooms = !selectedBedrooms || bedrooms.includes(selectedBedrooms);
        const shouldShow = matchesRegion && matchesBedrooms;
        card.classList.toggle("hidden", !shouldShow);
    });
}

const leadForm = document.querySelector("#leadForm");

if (leadForm) {
    leadForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const nome = document.querySelector("#nome").value.trim();
        const tipo = "Apartamento";
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

const loadGalleryButton = document.querySelector("[data-load-gallery]");

if (loadGalleryButton) {
    loadGalleryButton.addEventListener("click", () => {
        const hiddenImages = document.querySelectorAll(".gallery-extra");

        hiddenImages.forEach((image) => {
            if (!image.getAttribute("src")) {
                image.src = image.dataset.src;
            }

            image.classList.remove("hidden");
        });

        loadGalleryButton.remove();
    });
}
