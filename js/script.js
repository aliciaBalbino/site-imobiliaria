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
        const finalidade = document.querySelector('input[name="finalidade"]:checked')?.value;
        const momento = document.querySelector('input[name="momento"]:checked')?.value;
        const renda = document.querySelector('input[name="renda"]:checked')?.value;
        const observacoes = document.querySelector("#observacoes").value.trim();

        const message = [
            `*Olá, sou* ${nome}.`,
            `*Tenho interesse em um imóvel do tipo:* ${tipo}.`,
            regiao ? `*Região desejada:* ${regiao}.` : "",
            finalidade ? `*Finalidade:* ${finalidade}.` : "",
            momento ? `*Momento da compra:* ${momento}.` : "",
            renda ? `*Renda familiar:* ${renda}.` : "",
            observacoes ? `*Observações:* ${observacoes}` : ""
        ].filter(Boolean).join("\n\n");

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

const floatingWhatsapp = document.createElement("a");
floatingWhatsapp.className = "floating-whatsapp";
floatingWhatsapp.href = "https://wa.me/5521998120374?text=Ol%C3%A1%2C%20tenho%20interesse%20em%20um%20im%C3%B3vel.";
floatingWhatsapp.target = "_blank";
floatingWhatsapp.rel = "noopener";
floatingWhatsapp.setAttribute("aria-label", "Falar com Adriana pelo WhatsApp");
floatingWhatsapp.innerHTML = `
    <svg viewBox="0 0 32 32" aria-hidden="true">
        <path fill="currentColor" d="M16.04 3C8.86 3 3.02 8.8 3.02 15.94c0 2.28.6 4.5 1.75 6.46L3 29l6.79-1.73a13.1 13.1 0 0 0 6.25 1.58C23.22 28.85 29 23.05 29 15.94S23.22 3 16.04 3Zm0 23.65c-1.93 0-3.82-.52-5.47-1.49l-.39-.23-4.03 1.03 1.08-3.9-.25-.4a10.55 10.55 0 0 1-1.62-5.72c0-5.92 4.8-10.74 10.68-10.74 5.89 0 10.68 4.82 10.68 10.74S21.93 26.65 16.04 26.65Zm5.86-8.04c-.32-.16-1.9-.94-2.2-1.05-.3-.1-.52-.16-.74.16-.22.32-.85 1.05-1.04 1.27-.19.22-.38.24-.7.08-.32-.16-1.36-.5-2.6-1.59-.96-.86-1.6-1.92-1.8-2.24-.18-.32-.02-.5.14-.66.14-.14.32-.38.48-.57.16-.19.22-.32.32-.54.1-.22.05-.4-.03-.57-.08-.16-.74-1.78-1.01-2.44-.27-.64-.54-.55-.74-.56h-.63c-.22 0-.57.08-.87.4-.3.32-1.14 1.11-1.14 2.7s1.17 3.14 1.33 3.36c.16.22 2.3 3.5 5.57 4.9.78.34 1.38.54 1.85.7.78.25 1.49.22 2.05.13.63-.1 1.9-.78 2.17-1.54.27-.76.27-1.4.19-1.54-.08-.14-.3-.22-.62-.38Z"/>
    </svg>
`;
document.body.appendChild(floatingWhatsapp);
