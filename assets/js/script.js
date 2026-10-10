const filterButtons = document.querySelectorAll(".filter-button");
const propertyCards = document.querySelectorAll(".property-card");
const categoryCards = document.querySelectorAll(".property-card[data-category]");
const currentPage = window.location.pathname.split("/").pop() || "index.html";
const navbar = document.querySelector(".navbar");
const menu = document.querySelector(".menu");

const propertyDetailHero = document.querySelector(".property-detail-hero");

const propertyPageDetails = {
   "americas-19.html": {
        address: "Av. das Américas, 19040 - Recreio dos Bandeirantes, Rio de Janeiro - RJ, 22790-701",
        coords: "-23.02021306909606,-43.493974916424044", 
        youtube: "7vag76u9pBM"
    },

    "orla-recreio-reserva.html": {
        address: "R. Escritor Rodrigo Melo Franco, 1020 - Barra da Tijuca, Rio de Janeiro - RJ, 22783-124",
        coords: "-22.988433558194007, -43.41886467116488",
        youtube: "8KHBMhFtDb8"
    },

    "arcos-do-porto.html": {
        address: "Av. Cidade de Lima, 263 - Santo Cristo, Rio de Janeiro - RJ, 20220-710",
        coords: "-22.89963467232977,-43.204999996014074",
        videoSrc: "https://cury.net/storage/videos/products/gallery/phpaXwAJ5.mp4"
    },
    "caminhos-da-guanabara.html": {
        address: "R. Jorn. Rogério Coelho Neto, 103 - Centro, Niterói - RJ, 24020-010",
        coords: "-22.886822974475194,-43.12643936466633",
        youtube: "pNx8yYhzS0g"
    },
    "ciata-residencial.html": {
        address: "Avenida Cidade de Lima, 340, Santo Cristo. Rio de Janeiro - RJ",
        coords: "-22.899769500399522,-43.206699477427314",
        youtube: "uxQW3cJIfGg"
    },
    "farol-da-guanabara.html": {
        address: "Rua Cordeiro da Graça, 25, Santo Cristo. Rio de Janeiro - RJ",
        coords: "-22.90018926757331,-43.20497703185534",
        youtube: "pNx8yYhzS0g"
    },
    "luzes-do-rio-lamparina.html": {
        address: "R. São Cristóvão, 921 - Imperial de São Cristóvão",
        coords: "-22.89988516182122,-43.21574031589325",
        youtube: "-YeSvvyD2mU"
    },
    "luzes-do-rio.html": {
        address: "R. São Cristóvão - Imperial de São Cristóvão, Rio de Janeiro - RJ, 20940-001",
        coords: "-22.899769278459548,-43.215512387302326",
        youtube: "AkCKZ8Okibw"
    },
    "metropolitan-dream.html": {
        address: "Avenida 6, 650, Barra Olímpica. Rio de Janeiro - RJ",
        coords: "-22.967661965897392,-43.36697001426192",
        youtube: "Tqm1AOAxX7g"
    },
    "my-jacarepagua-mood.html": {
        address: "Estrada Marechal Miguel Salazar Mendes de Moraes, Lote 3, Taquara. Rio de Janeiro - RJ",
        coords: "-22.941022,-43.366740",
        youtube: "O9En2bzUWQg"
    },
    "nova-norte-ginga.html": {
        address: "R Hannibal Porto, 8 - Irajá, Rio de Janeiro - RJ, 21230-043",
        coords: "-22.826247426588143,-43.3254304867312",
        youtube: "YDTEncYgszc"
    },
    "nova-norte-raizes.html": {
        address: "Rua Hannibal Porto, Lote 3, Irajá. Rio de Janeiro - RJ",
        coords: "-22.82497499403652,-43.325451819018745",
        youtube: "4qhS9zO-Er8"
    },
    "orla-central.html": {
        address: "R. Jorn. Rogério Coelho Neto, 86-168 - Centro - Centro, Niterói - RJ",
        coords: "-22.887775413640163,-43.12706424707318",
        youtube: "h-ImsYMtJcg"
    },
    "parque-piedade.html": {
        address: "Rua Gomes Serpa, Lote 1, Piedade. Rio de Janeiro - RJ",
        coords: "-22.89153244915025,-43.31085248910474"
    },
    "pixinguinha.html": {
        address: "R. Gen. Luís Mendes de Morais - Santo Cristo, Rio de Janeiro - RJ, 20220-260",
        coords: "-22.902656498227984,-43.20773991112846",
        youtube: "bJrqRxwy0NI"
    },
    "cartola.html": {
        address: "AV. Francisco Eugênio, 319, São Cristóvão. Rio de Janeiro - RJ",
        coords: "-22.907493564587334,-43.218976583268685",
        youtube: "-k0RL5IDYPA"
    },
    "residencial-cartola.html": {
        address: "AV. Francisco Eugênio, 319, São Cristóvão. Rio de Janeiro - RJ",
        coords: "-22.907488065773236,-43.218970862141205",
        youtube: "8OhDUdRtwX0"
    },
    "residencial-nova-olaria.html": {
        address: "Rua Luis Câmara, 688, Olaria. Rio de Janeiro - RJ",
        coords: "-22.8439778,-43.2570838",
        youtube: "z3jUvHu5Dzo"
    },
    "residencial-pixinguinha.html": {
        address: "R. Gen. Luís Mendes de Morais - Santo Cristo, Rio de Janeiro - RJ, 20220-260",
        coords: "-22.902665370534308,-43.20775344102183",
        youtube: "ju5qxUvgewU"
    },
    "the-pier-residencial.html": {
        address: "Acesso Público, 226, Centro. Niterói - RJ",
        coords: "-22.889125014595464,-43.125407076686976",
        youtube: "Px5oHSzfU5E"
    },
    "vargas-1140.html": {
        address: "Avenida Presidente Vargas, 1140, Centro. Rio de Janeiro - RJ",
        coords: "-22.903174766612906,-43.18643608236824",
        youtube: "L1RbZZR1B68"
    },

    "pura-artefacto.html": {
        address: "R. Escritor Rodrigo Melo Franco, 830 - Barra da Tijuca, Rio de Janeiro - RJ, 22783-124",
        coords: "-22.98739201921349, -43.41762403899274",
        youtube: "3aNJrCdjj1E"
    },

    "oro.html": {
        address: "R. Escritor Rodrigo Melo Franco, 1020 - Barra da Tijuca, Rio de Janeiro - RJ, 22783-124",
        coords: "-22.988433558194007, -43.41886467116488",
        youtube: "8KHBMhFtDb8"
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
    if (normalized.includes("academ") || normalized.includes("fitness") || normalized.includes("pilates") || normalized.includes("crossfit")) return "amenity-gym";
    if (normalized.includes("pet") || normalized.includes("animal") || normalized.includes("cão")|| normalized.includes("pet care")) return "amenity-paw-print";
    if (normalized.includes("festa") || normalized.includes("gourmet") || normalized.includes("churrasqueira")) return "amenity-party";
    if (normalized.includes("office") || normalized.includes("market") || normalized.includes("oficina")|| normalized.includes("rooftop")) return "amenity-office";
    if (normalized.includes("cowork")) return "amenity-laptop";
    if (normalized.includes("quadra") || normalized.includes("beach")) return "amenity-court";
    if (normalized.includes("play") || normalized.includes("baby")) return "amenity-baby";
    if (normalized.includes("valorização")) return "amenity-circle-dollar-sign";
    if (normalized.includes("parque") || normalized.includes("praça")) return "amenity-shrub";
    if (normalized.includes("colégio") || normalized.includes("escola") || normalized.includes("educação")) return "amenity-school";
    if ((normalized.includes("localização") || normalized.includes("barra olímpica") || normalized.includes("centro rio") || normalized.includes("recreio dos bandeirantes") || normalized.includes("barra da tijuca") || normalized.includes("próximo") || normalized.includes("jacarepaguá") || normalized.includes("irajá") || normalized.includes("olaria") || normalized.includes("centro do rio") || normalized.includes("porto maravilha") || normalized.includes("são cristóvão") || normalized.includes("niterói")) && !normalized.includes("trem") && !normalized.includes("metrô")) return "amenity-map-pin";    if (normalized.includes("praia")) return "amenity-parasol";
    if (normalized.includes("vista")) return "amenity-mountain";
    if (normalized.includes("metrô") || normalized.includes("trem")) return "amenity-train-front";
    if (normalized.includes("rodoviária") || normalized.includes("ônibus")) return "amenity-bus";
    if (normalized.includes("podcast") || normalized.includes("microfone") || normalized.includes("estúdio de música")) return "amenity-mic";
    if (normalized.includes("quarto") || normalized.includes("suíte") || normalized.includes("dormitório")) return "amenity-bed";
    if (normalized.includes("m²") || normalized.includes("metros") || normalized.includes("área") || normalized.includes("tamanho")) return "amenity-ruler";
    if (normalized.includes("alto padrão") || normalized.includes("luxo") || normalized.includes("premium") || normalized.includes("exclusivo")) return "amenity-gem";
    if (normalized.includes("mercado")) return "amenity-shopping-basket";
    if (normalized.includes("baverage bar") || normalized.includes("drink")) return "amenity-martini";
    if (normalized.includes("home ateliê") || normalized.includes("artes")) return "amenity-palette";
    if (normalized.includes("home theater") || normalized.includes("cinema")) return "amenity-popcorn";
    if (normalized.includes("gamer") || normalized.includes("jogos")) return "amenity-gamepad";
    if (normalized.includes("móveis")) return "amenity-armchair";
    if (normalized.includes("bicicleta") || normalized.includes("bicicletário")) return "amenity-bike";
    if (normalized.includes("lev")) return "amenity-zap";
    if (normalized.includes("vias")|| normalized.includes("acesso")) return "amenity-road";
    if (normalized.includes("laundry")|| normalized.includes("lavanderia")) return "amenity-washing-machine";
    if (normalized.includes("portaria")) return "amenity-door-closed-locked";
    if (normalized.includes("brinquedoteca")) return "amenity-toy-brick";
    if (normalized.includes("sauna")) return "amenity-sauna";
    if (normalized.includes("sol")) return "amenity-sun";
    if (normalized.includes("futmesa")|| normalized.includes("estádio") || normalized.includes("maracanã")) return "amenity-volleyball";
    if (normalized.includes("samba")) return "amenity-drum";
    if (normalized.includes("sport")) return "amenity-whistle";
    if (normalized.includes("shopping")) return "amenity-shopping-bag";
    if (normalized.includes("relax")) return "amenity-leaf"
    if (normalized.includes("garden")) return "amenity-house"
    if (normalized.includes("horta")) return "amenity-salad";
    if (normalized.includes("museu")) return "amenity-landmark";
    if (normalized.includes("hospital")) return "amenity-hospital";
    if (normalized.includes("beleza")) return "amenity-sparkles";
    

}
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
                <p>Agende sua visita com a Adriana para conhecer de perto esta experiência.</p>
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
            .slice(0, 20);

        // Gera o HTML final para cada item
        const items = amenityTexts
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

document.querySelectorAll(".hero-video-bg").forEach((video) => {
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const playPromise = video.play();

    if (playPromise !== undefined) {
        playPromise.catch(() => {
            // O navegador bloqueou o autoplay.
        });
    }
});
