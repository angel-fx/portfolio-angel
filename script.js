document.addEventListener("DOMContentLoaded", () => {

    // On s'assure que GSAP et ScrollTrigger sont bien présents
    if (typeof gsap !== "undefined") {
        
        // 1. TIMELINE D'ENTRÉE : Chargement orchestré de la page
        const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.2 } });

        tl.from(".logo", { y: -25, opacity: 0, duration: 0.8 })
          .from("nav a", { y: -25, opacity: 0, stagger: 0.1, duration: 0.8 }, "-=0.6")
          .from(".hero-tagline", { x: -20, opacity: 0, duration: 0.8 }, "-=0.8")
          .from(".reveal-text", { y: 70, opacity: 0 }, "-=0.6")
          .from(".fade-in-text", { y: 30, opacity: 0 }, "-=0.8")
          .from(".magnetic-btn", { scale: 0.9, opacity: 0 }, "-=0.8")
          .from(".hero-image-container", { 
              clipPath: "inset(0% 0% 100% 0%)", /* Effet de rideau haut en bas élégant */
              duration: 1.6, 
              ease: "power3.inOut" 
          }, "-=1.2");

        // 2. LOGIQUE DU CURSEUR LAG-FLUIDE INTERACTIF
        const cursor = document.querySelector(".custom-cursor");
        
        if (cursor) {
            document.addEventListener("mousemove", (e) => {
                gsap.to(cursor, {
                    x: e.clientX,
                    y: e.clientY,
                    duration: 0.08 // Effet d'amorti magnétique ultra fluide
                });
            });

            // Réactions du curseur au survol des composants actifs
            const targetElems = document.querySelectorAll("a, .bento-item, .skill-row");
            targetElems.forEach(elem => {
                elem.addEventListener("mouseenter", () => {
                    cursor.style.width = "60px";
                    cursor.style.height = "60px";
                    cursor.style.borderColor = "#ffb703";
                    cursor.style.backgroundColor = "rgba(255, 183, 3, 0.05)";
                });
                elem.addEventListener("mouseleave", () => {
                    cursor.style.width = "20px";
                    cursor.style.height = "20px";
                    cursor.style.borderColor = "#ffb703";
                    cursor.style.backgroundColor = "transparent";
                });
            });
        }

        // 3. EFFETS MAGNÉTIQUES SUR LES BOUTONS PRINCIPAUX
        const magneticButtons = document.querySelectorAll(".magnetic-btn");
        magneticButtons.forEach(btn => {
            btn.addEventListener("mousemove", (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                gsap.to(btn, {
                    x: x * 0.35, // Intensité de l'aimant
                    y: y * 0.35,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            btn.addEventListener("mouseleave", () => {
                gsap.to(btn, {
                    x: 0,
                    y: 0,
                    duration: 0.6,
                    ease: "elastic.out(1, 0.3)" // Effet ressort dynamique au relâchement
                });
            });
        });

        // 4. SCROLLTRIGGER : ANIMATIONS AU DEFILEMENT
        if (typeof ScrollTrigger !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);

            // Révélation en cascade de la Grille Bento (Créations)
            gsap.from(".animate-card", {
                scrollTrigger: {
                    trigger: ".projets-section",
                    start: "top 75%",
                    toggleActions: "play none none none"
                },
                y: 90,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: "power3.out"
            });

            // Parallaxe subtile sur l'image du Hero au scroll
            gsap.to(".hero-image", {
                scrollTrigger: {
                    trigger: ".hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                },
                yPercent: 15,
                ease: "none"
            });

            // Révélation de la section À Propos
            gsap.from(".animate-text", {
                scrollTrigger: {
                    trigger: ".about-section",
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power2.out"
            });
        }
    }
});