const filterButtons = document.querySelectorAll(".filter-button");
const propertyCards = document.querySelectorAll(".property-card");
const categoryCards = document.querySelectorAll(".property-card[data-category]");
const currentPage = window.location.pathname.split("/").pop() || "index.html";
const navbar = document.querySelector(".navbar");
const menu = document.querySelector(".menu");

const propertyDetailHero = document.querySelector(".property-detail-hero");

const propertyPageDetails = {
    "americas-19.html": {
        address: "Avenida das Américas, 19000, Recreio dos Bandeirantes. Rio de Janeiro - RJ",
        coords: "-23.013846361933,-43.466591523501",
        youtube: "7vag76u9pBM"
    },
    "arcos-do-porto.html": {
        address: "Via Binário Porto, 778, Santo Cristo. Rio de Janeiro - RJ",
        coords: "-22.8972192,-43.2047220",
        videoSrc: "https://cury.net/storage/videos/products/gallery/phpaXwAJ5.mp4"
    },
    "caminhos-da-guanabara.html": {
        address: "Acesso Público, 226, Centro. Niterói - RJ",
        coords: "-22.889159,-43.125342",
        youtube: "pNx8yYhzS0g"
    },
    "ciata-residencial.html": {
        address: "Via Binário Porto, 778, Santo Cristo. Rio de Janeiro - RJ",
        coords: "-22.8972192,-43.2047220",
        youtube: "uxQW3cJIfGg"
    },
    "farol-da-guanabara.html": {
        address: "Via Binário Porto, 778, Santo Cristo. Rio de Janeiro - RJ",
        coords: "-22.8972192,-43.2047220",
        youtube: "pNx8yYhzS0g"
    },
    "luzes-do-rio-lamparina.html": {
        address: "Via Binário do Porto, 778, Santo Cristo. Rio de Janeiro - RJ",
        coords: "-22.89721,-43.20472",
        youtube: "-YeSvvyD2mU"
    },
    "luzes-do-rio.html": {
        address: "Via Binário do Porto, 778, Santo Cristo. Rio de Janeiro - RJ",
        coords: "-22.8972192,-43.2047220",
        youtube: "AkCKZ8Okibw"
    },
    "metropolitan-dream.html": {
        address: "Avenida Almirante Júlio de Sá Bierrenbach, 600, Barra Olímpica. Rio de Janeiro - RJ",
        coords: "-22.971899,-43.366272",
        youtube: "Tqm1AOAxX7g"
    },
    "my-jacarepagua-mood.html": {
        address: "Estrada Marechal Miguel Salazar Mendes de Moraes, Lote 3, Taquara. Rio de Janeiro - RJ",
        coords: "-22.941022,-43.366740",
        youtube: "O9En2bzUWQg"
    },
    "nova-norte-ginga.html": {
        address: "Rua Hannibal Porto, 450, Irajá. Rio de Janeiro - RJ",
        coords: "-22.8251991,-43.3253806",
        youtube: "YDTEncYgszc"
    },
    "nova-norte-raizes.html": {
        address: "Rua Hannibal Porto, 450, Irajá. Rio de Janeiro - RJ",
        coords: "-22.8251991,-43.3253806",
        youtube: "4qhS9zO-Er8"
    },
    "orla-central.html": {
        address: "Acesso Público, 226, Centro. Niterói - RJ",
        coords: "-22.889159,-43.125342",
        youtube: "h-ImsYMtJcg"
    },
    "parque-piedade.html": {
        address: "Rua Elias da Silva, 115, Piedade. Rio de Janeiro - RJ",
        coords: "-22.8886238,-43.3127408"
    },
    "pixinguinha.html": {
        address: "Via Binário do Porto, 778, Santo Cristo. Rio de Janeiro - RJ",
        coords: "-22.8972192,-43.2047220",
        youtube: "bJrqRxwy0NI"
    },
    "cartola.html": {
        address: "Via Binário do Porto, 778, Santo Cristo. Rio de Janeiro - RJ",
        coords: "-22.8972192,-43.2047220",
        youtube: "-k0RL5IDYPA"
    },
    "residencial-cartola.html": {
        address: "Via Binário Porto, 778, Santo Cristo. Rio de Janeiro - RJ",
        coords: "-22.8972192,-43.2047220",
        youtube: "8OhDUdRtwX0"
    },
    "residencial-nova-olaria.html": {
        address: "Rua Luis Câmara, 688, Olaria. Rio de Janeiro - RJ",
        coords: "-22.8439778,-43.2570838",
        youtube: "z3jUvHu5Dzo"
    },
    "residencial-pixinguinha.html": {
        address: "Via Binário Porto, 778, Santo Cristo. Rio de Janeiro - RJ",
        coords: "-22.8972192,-43.2047220",
        youtube: "ju5qxUvgewU"
    },
    "the-pier-residencial.html": {
        address: "Acesso Público, 226, Centro. Niterói - RJ",
        coords: "-22.889159,-43.125342",
        youtube: "Px5oHSzfU5E"
    },
    "vargas-1140.html": {
        address: "Avenida Presidente Vargas, 1140, Centro. Rio de Janeiro - RJ",
        coords: "-22.903321,-43.186492",
        youtube: "L1RbZZR1B68"
    }
};

if (propertyDetailHero) {
    document.body.classList.add("property-detail-page");
}

const initHeroPropertyCarousels = () => {
    document.querySelectorAll(".hero-property-carousel").forEach((carousel) => {
        if (carousel.dataset.carouselReady === "true") return;

        const track = carousel.querySelector(".hero-property-track");
        const slides = Array.from(track?.querySelectorAll("img") || []);
        const previousButton = carousel.querySelector(".hero-carousel-button.prev");
        const nextButton = carousel.querySelector(".hero-carousel-button.next");
        let currentIndex = 0;

        if (!track || slides.length < 2) return;

        carousel.dataset.carouselReady = "true";

        const goToSlide = (index) => {
            currentIndex = (index + slides.length) % slides.length;
            track.scrollTo({
                left: track.clientWidth * currentIndex,
                behavior: "smooth"
            });
        };

        previousButton?.addEventListener("click", () => goToSlide(currentIndex - 1));
        nextButton?.addEventListener("click", () => goToSlide(currentIndex + 1));

        window.addEventListener("resize", () => goToSlide(currentIndex));

        setInterval(() => {
            if (!document.hidden) {
                goToSlide(currentIndex + 1);
            }
        }, 5200);
    });
};

const getAmenityClass = (text) => {
    const normalized = text.toLowerCase();

    if (normalized.includes("pisc")) return "amenity-pool";
    if (normalized.includes("academ") || normalized.includes("fitness")) return "amenity-gym";
    if (normalized.includes("pet")) return "amenity-pet";
    if (normalized.includes("festa") || normalized.includes("gourmet") || normalized.includes("churrasqueira")) return "amenity-party";
    if (normalized.includes("office") || normalized.includes("cowork") || normalized.includes("lavanderia") || normalized.includes("market") || normalized.includes("oficina")) return "amenity-office";
    if (normalized.includes("quadra") || normalized.includes("beach")) return "amenity-court";
    if (normalized.includes("play") || normalized.includes("brinquedoteca") || normalized.includes("baby")) return "amenity-baby";

    return "amenity-office";
};

const getLocationFromDescription = (description) => {
    if (description.includes("Porto Maravilha")) return "Porto Maravilha, Rio de Janeiro - RJ";
    if (description.includes("Niterói")) return "Niterói - RJ";
    if (description.includes("Recreio")) return "Recreio dos Bandeirantes, Rio de Janeiro - RJ";
    if (description.includes("Jacarepaguá")) return "Jacarepaguá, Rio de Janeiro - RJ";
    if (description.includes("Irajá")) return "Irajá, Rio de Janeiro - RJ";
    if (description.includes("Olaria")) return "Olaria, Rio de Janeiro - RJ";
    if (description.includes("São Cristóvão")) return "São Cristóvão, Rio de Janeiro - RJ";
    if (description.includes("Piedade")) return "Piedade, Rio de Janeiro - RJ";
    if (description.includes("Centro")) return "Centro, Rio de Janeiro - RJ";

    return "Rio de Janeiro - RJ";
};

const getPropertyVideoMarkup = (details) => {
    if (details.youtube) {
        return `
            <div class="property-video-embed">
                <iframe title="Apresentação do empreendimento" src="https://www.youtube.com/embed/${details.youtube}?rel=0" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
        `;
    }

    if (details.videoSrc) {
        return `
            <div class="property-video-embed">
                <video src="${details.videoSrc}" controls playsinline preload="metadata"></video>
            </div>
        `;
    }

    return "";
};

const createHeroCarouselFromGallery = (hero) => {
    if (!hero || hero.querySelector(".hero-property-carousel")) return;

    const gallerySection = document.querySelector("#galeria");
    const galleryImages = Array.from(gallerySection?.querySelectorAll(".gallery-grid img") || []);

    if (!galleryImages.length) return;

    const title = hero.querySelector("h1")?.textContent.trim() || "empreendimento";
    const carousel = document.createElement("div");
    carousel.className = "hero-property-carousel";
    carousel.setAttribute("aria-label", `Fotos do ${title}`);

    const track = document.createElement("div");
    track.className = "hero-property-track";

    galleryImages.forEach((image, index) => {
        const slide = document.createElement("img");
        slide.src = image.getAttribute("src") || image.dataset.src || "";
        slide.alt = image.alt || `Foto ${index + 1} do ${title}`;
        slide.decoding = "async";

        if (index > 0) {
            slide.loading = "lazy";
        }

        if (slide.src) {
            track.appendChild(slide);
        }
    });

    if (!track.children.length) return;

    carousel.appendChild(track);

    if (track.children.length > 1) {
        const previousButton = document.createElement("button");
        previousButton.className = "hero-carousel-button prev";
        previousButton.type = "button";
        previousButton.setAttribute("aria-label", "Foto anterior");
        previousButton.textContent = "‹";

        const nextButton = document.createElement("button");
        nextButton.className = "hero-carousel-button next";
        nextButton.type = "button";
        nextButton.setAttribute("aria-label", "Próxima foto");
        nextButton.textContent = "›";

        carousel.append(previousButton, nextButton);
    }

    Array.from(hero.children)
        .filter((child) => child.tagName === "IMG")
        .forEach((image) => image.remove());

    hero.appendChild(carousel);
};

if (propertyDetailHero && !document.querySelector(".property-section-nav")) {
    const descriptionElement = propertyDetailHero.querySelector(".property-detail-copy p");
    const description = descriptionElement?.textContent.trim() || "";
    const propertyDetails = propertyPageDetails[currentPage] || {};
    const whatsappLink = propertyDetailHero.querySelector(".secondary-detail-button")?.href || "https://wa.me/5521998120374";
    const locationText = propertyDetails.address || getLocationFromDescription(description);
    const locationQuery = encodeURIComponent(propertyDetails.coords || locationText);
    const mapsHref = propertyDetails.coords
        ? `https://www.google.com/maps?daddr=${propertyDetails.coords}`
        : `https://www.google.com/maps/search/?api=1&query=${locationQuery}`;
    const propertyVideoMarkup = getPropertyVideoMarkup(propertyDetails);
    const contactCardClass = propertyVideoMarkup
        ? "overview-contact-card has-property-video"
        : "overview-contact-card compact-contact-card";

    createHeroCarouselFromGallery(propertyDetailHero);
    descriptionElement?.remove();
    propertyDetailHero.querySelector(".detail-actions")?.remove();

    const sectionNav = document.createElement("nav");
    sectionNav.className = "property-section-nav";
    sectionNav.setAttribute("aria-label", "Navegação do empreendimento");
    sectionNav.innerHTML = `
        <a href="#sobre">Sobre o imóvel</a>
        <a href="#diferenciais">Diferenciais</a>
        <a href="#localizacao">Localização</a>
    `;
    propertyDetailHero.insertAdjacentElement("afterend", sectionNav);

    const overviewSection = document.createElement("section");
    overviewSection.className = "detail-section property-overview";
    overviewSection.id = "sobre";
    overviewSection.innerHTML = `
        <div class="overview-layout">
            <div class="overview-copy">
                <p>${description}</p>
                <p>Fale com a Adriana para receber orientação personalizada, tirar dúvidas e simular as melhores condições para o seu perfil.</p>
            </div>
            <aside class="${contactCardClass}">
                ${propertyVideoMarkup}
                <a class="contact-whatsapp-button" href="${whatsappLink}" target="_blank" rel="noopener">Fale com a Adriana</a>
            </aside>
        </div>
    `;
    sectionNav.insertAdjacentElement("afterend", overviewSection);

    const amenitiesSection = Array.from(document.querySelectorAll(".detail-section")).find((section) => section.querySelector(".amenities-grid"));

    if (amenitiesSection) {
        const amenityTexts = Array.from(amenitiesSection.querySelectorAll(".amenities-grid article"))
            .map((item) => item.textContent.trim())
            .filter((text) => text && !/^\d|m²|quarto|Studio|Zona|Centro|Região|Foco|Av\.|Rua|Perto da|Próximo|Fácil|Vista|Localização|Modernidade|Excelente|Apartamentos/i.test(text))
            .slice(0, 7);

        const items = (amenityTexts.length ? amenityTexts : Array.from(amenitiesSection.querySelectorAll(".amenities-grid article")).map((item) => item.textContent.trim()).slice(0, 7))
            .map((text) => `<span class="amenity-list-item ${getAmenityClass(text)}">${text}</span>`)
            .join("");

        amenitiesSection.id = "diferenciais";
        amenitiesSection.innerHTML = `
            <div class="amenities-list-block">
                <h2>Diferenciais</h2>
                <div class="amenities-list">${items}</div>
            </div>
        `;
    }

    const gallerySection = document.querySelector("#galeria");
    const locationInsertionTarget = amenitiesSection || gallerySection || overviewSection;

    if (locationInsertionTarget && !document.querySelector("#localizacao")) {
        locationInsertionTarget.insertAdjacentHTML("afterend", `
            <section class="detail-section property-location" id="localizacao">
                <div class="location-content">
                    <div class="location-info">
                        <h2>Localização</h2>
                        <div class="location-address">
                            <span class="location-icon" aria-hidden="true">
                                <i class="bi bi-building"></i>
                            </span>
                            <div>
                                <p>Empreendimento</p>
                                <strong>${locationText}</strong>
                            </div>
                        </div>
                        <p class="location-directions-title">Veja como chegar</p>
                        <div class="location-actions">
                            <a href="${mapsHref}" target="_blank" rel="noopener">
                                <i class="bi bi-geo-alt" aria-hidden="true"></i>
                                Google Maps
                            </a>
                        </div>
                    </div>
                    <div class="location-map-card">
                        <iframe title="Mapa de ${locationText}" src="https://maps.google.com/maps?q=${locationQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed" loading="lazy"></iframe>
                        <a href="${mapsHref}" target="_blank" rel="noopener">Clique para exibir o mapa</a>
                    </div>
                </div>
            </section>
        `);
    }

    gallerySection?.remove();
}

initHeroPropertyCarousels();

if (navbar && menu) {
    const navToggle = document.createElement("button");
    navToggle.className = "nav-toggle";
    navToggle.type = "button";
    navToggle.setAttribute("aria-label", "Abrir menu");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.innerHTML = "<span></span><span></span><span></span>";
    navbar.insertBefore(navToggle, menu);

    navToggle.addEventListener("click", () => {
        const isOpen = navbar.classList.toggle("nav-open");
        navToggle.setAttribute("aria-expanded", String(isOpen));
        navToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    });
}

document.querySelectorAll(".menu a").forEach((link) => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
        link.classList.add("active");
    }
});

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

propertyCards.forEach((card) => {
    const cardLink = card.querySelector(".card-button");

    if (!cardLink) return;

    card.setAttribute("role", "link");
    card.setAttribute("tabindex", "0");

    card.addEventListener("click", (event) => {
        if (event.target.closest("a")) return;
        window.location.href = cardLink.href;
    });

    card.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        window.location.href = cardLink.href;
    });
});

document.querySelectorAll(".amenities-grid article").forEach((item) => {
    const text = item.textContent.trim();
    const metricMatch = text.match(/^([\d.,]+(?:\s*a\s*[\d.,]+)?|[\d.,]+m|[\d.,]+m²|Studio)(.*)$/i);

    if (!metricMatch) {
        item.classList.add("amenity-feature");
        return;
    }

    const metric = metricMatch[1].trim();
    const label = metricMatch[2].trim() || text.replace(metric, "").trim();

    item.classList.add("amenity-metric");
    item.innerHTML = `
        <strong>${metric}</strong>
        <span>${label}</span>
    `;
});

const leadForm = document.querySelector("#leadForm");
const simulationEndpoint = "https://fofjktyycvdcifnbkwhr.supabase.co/functions/v1/salvar-simulacao";
const whatsappClickEndpoint = "https://fofjktyycvdcifnbkwhr.supabase.co/functions/v1/registrar-clique-whatsapp";

if (leadForm) {
    const formStartedAt = document.querySelector("#formStartedAt");
    if (formStartedAt) {
        formStartedAt.value = Date.now().toString();
    }

    leadForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const empresa = document.querySelector("#empresa")?.value.trim() || "";
        const tempoPreenchimentoMs = Date.now() - Number(formStartedAt?.value || Date.now());
        const nome = document.querySelector("#nome").value.trim();
        const telefone = document.querySelector("#telefone").value.trim();
        const email = document.querySelector("#email").value.trim();
        const tipo = "Apartamento";
        const regiao = document.querySelector("#regiao").value.trim();
        const finalidade = document.querySelector('input[name="finalidade"]:checked')?.value;
        const momento = document.querySelector('input[name="momento"]:checked')?.value;
        const renda = document.querySelector('input[name="renda"]:checked')?.value;
        const observacoes = document.querySelector("#observacoes").value.trim();
        const leadData = {
            nome,
            telefone,
            email,
            tipo,
            regiao,
            finalidade,
            momento,
            renda,
            observacoes,
            pagina_origem: window.location.pathname,
            empresa,
            tempo_preenchimento_ms: tempoPreenchimentoMs
        };

        const message = [
            `*Ola, sou* ${nome}.`,
            `*Telefone:* ${telefone}.`,
            `*E-mail:* ${email}.`,
            `*Tenho interesse em um imovel do tipo:* ${tipo}.`,
            regiao ? `*Regiao desejada:* ${regiao}.` : "",
            finalidade ? `*Finalidade:* ${finalidade}.` : "",
            momento ? `*Momento da compra:* ${momento}.` : "",
            renda ? `*Renda familiar:* ${renda}.` : "",
            observacoes ? `*Observacoes:* ${observacoes}` : ""
        ].filter(Boolean).join("\n\n");

        try {
            const response = await fetch(simulationEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(leadData)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || "Envio recusado pela protecao anti-spam.");
            }
        } catch (error) {
            console.error("Nao foi possivel salvar a simulacao no momento.", error);
            alert("Nao foi possivel enviar sua simulacao agora. Tente novamente em alguns segundos.");
            return;
        }

        const url = `https://wa.me/5521998120374?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank", "noopener");
    });
}

document.querySelectorAll(".gallery-grid").forEach((gallery) => {
    gallery.querySelectorAll(".gallery-extra").forEach((image) => {
        if (!image.getAttribute("src") && image.dataset.src) {
            image.src = image.dataset.src;
        }

        image.classList.remove("hidden");
    });

    const shell = document.createElement("div");
    shell.className = "gallery-carousel-shell";
    gallery.parentNode.insertBefore(shell, gallery);
    shell.appendChild(gallery);

    const previousButton = document.createElement("button");
    previousButton.className = "gallery-carousel-button prev";
    previousButton.type = "button";
    previousButton.setAttribute("aria-label", "Foto anterior");
    previousButton.textContent = "‹";

    const nextButton = document.createElement("button");
    nextButton.className = "gallery-carousel-button next";
    nextButton.type = "button";
    nextButton.setAttribute("aria-label", "Próxima foto");
    nextButton.textContent = "›";

    shell.append(previousButton, nextButton);

    const scrollGallery = (direction) => {
        gallery.scrollBy({
            left: direction * gallery.clientWidth * 0.82,
            behavior: "smooth"
        });
    };

    previousButton.addEventListener("click", () => scrollGallery(-1));
    nextButton.addEventListener("click", () => scrollGallery(1));
});

document.querySelectorAll("[data-load-gallery]").forEach((button) => button.remove());

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

const registerWhatsappClick = (source) => {
    const payload = {
        origem: source,
        pagina_origem: window.location.pathname,
        titulo_pagina: document.title,
        destino: "whatsapp"
    };

    const body = JSON.stringify(payload);

    fetch(whatsappClickEndpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body,
        keepalive: true
    }).catch((error) => {
        console.error("Nao foi possivel registrar o clique no WhatsApp.", error);
    });
};

document.querySelectorAll(".whatsapp-link").forEach((link) => {
    const source = window.location.pathname.includes("/empreendimentos/")
        ? "empreendimento_navbar_fale_comigo"
        : "navbar_fale_comigo";

    link.addEventListener("click", () => registerWhatsappClick(source));
});

document.querySelectorAll(".contact-whatsapp-button").forEach((link) => {
    link.addEventListener("click", () => registerWhatsappClick("empreendimento_fale_com_adriana"));
});

floatingWhatsapp.addEventListener("click", () => {
    registerWhatsappClick("botao_flutuante_whatsapp");
});
