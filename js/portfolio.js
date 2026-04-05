(function () {
    const EMAILJS_PUBLIC_KEY = "0SNcJ4xyZlmGEwTct";
    const EMAILJS_SERVICE_ID = "service_ybrpukc";
    const EMAILJS_TEMPLATE_ID = "template_0fhi9em";
    const body = document.body;

    if (window.emailjs && EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
        window.emailjs.init({
            publicKey: EMAILJS_PUBLIC_KEY
        });
    }

    const scrollProgress = document.createElement("div");
    scrollProgress.className = "scroll-progress";
    body.appendChild(scrollProgress);

    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");
    const navbar = document.querySelector(".navbar");
    const navDropdown = navLinks ? navLinks.querySelector(".nav-dropdown") : null;
    const navParent = navDropdown ? navDropdown.querySelector(".nav-parent") : null;

    function closeNavDropdown() {
        if (!navDropdown || !navParent) {
            return;
        }

        navDropdown.classList.remove("open");
        navParent.setAttribute("aria-expanded", "false");
    }

    function closeMobileMenu() {
        if (!menuBtn || !navLinks) {
            return;
        }

        menuBtn.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        navLinks.classList.remove("open");
        closeNavDropdown();
    }

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", function () {
            const isOpen = menuBtn.classList.toggle("open");
            menuBtn.setAttribute("aria-expanded", String(isOpen));
            navLinks.classList.toggle("open");
        });

        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function (event) {
                if (link.classList.contains("nav-parent") && window.matchMedia("(max-width: 700px)").matches) {
                    event.preventDefault();
                    return;
                }
                closeMobileMenu();
            });
        });
    }

    if (navDropdown && navParent) {
        navParent.addEventListener("click", function (event) {
            if (!window.matchMedia("(max-width: 700px)").matches) {
                return;
            }

            event.preventDefault();
            const isOpen = navDropdown.classList.toggle("open");
            navParent.setAttribute("aria-expanded", String(isOpen));
        });

        navDropdown.querySelectorAll(".nav-submenu a").forEach(function (link) {
            link.addEventListener("click", closeNavDropdown);
        });

        document.addEventListener("click", function (event) {
            if (!navDropdown.contains(event.target)) {
                closeNavDropdown();
            }
        });
    }

    const navItems = navLinks
        ? Array.from(navLinks.querySelectorAll(':scope > a[href^="#"], :scope > .nav-dropdown > .nav-parent[href^="#"]'))
        : [];
    const observedSections = navItems
        .map(function (item) {
            return document.querySelector(item.getAttribute("href"));
        })
        .filter(Boolean);
    const sectionVisibility = new Map();

    function setActiveNavLink(activeId) {
        navItems.forEach(function (item) {
            const targetId = item.getAttribute("href").replace("#", "");
            item.classList.toggle("active", Boolean(activeId) && targetId === activeId);
        });
    }

    function updateScrollState() {
        const scrollTop = window.scrollY || window.pageYOffset;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollHeight > 0 ? Math.min(scrollTop / scrollHeight, 1) : 0;

        document.documentElement.style.setProperty("--scroll-progress", String(progress));

        if (navbar) {
            navbar.classList.toggle("is-scrolled", scrollTop > 18);
        }
    }

    document.querySelectorAll("[data-focus-target]").forEach(function (link) {
        link.addEventListener("click", function () {
            const targetId = link.getAttribute("data-focus-target");

            if (!targetId) {
                return;
            }

            window.setTimeout(function () {
                const targetCard = document.getElementById(targetId);
                if (!targetCard) {
                    return;
                }

                targetCard.classList.add("is-targeted");
                window.setTimeout(function () {
                    targetCard.classList.remove("is-targeted");
                }, 1300);
            }, 220);
        });
    });

    function createHeroParticles() {
        const heroParticles = document.getElementById("heroParticles");

        if (!heroParticles || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        const particleCount = window.innerWidth < 700 ? 18 : 30;

        for (let index = 0; index < particleCount; index += 1) {
            const particle = document.createElement("span");
            const size = (Math.random() * 5 + 2.5).toFixed(2) + "px";
            const duration = (Math.random() * 7 + 9).toFixed(2) + "s";
            const delay = (Math.random() * -8).toFixed(2) + "s";

            particle.className = "hero-particle";
            particle.style.setProperty("--x", (Math.random() * 100).toFixed(2) + "%");
            particle.style.setProperty("--y", (Math.random() * 100).toFixed(2) + "%");
            particle.style.setProperty("--size", size);
            particle.style.setProperty("--duration", duration);
            particle.style.setProperty("--delay", delay);

            heroParticles.appendChild(particle);
        }
    }

    function initHeroThreeScene() {
        const canvas = document.getElementById("heroThreeCanvas");
        const hero = document.getElementById("hero");

        if (
            !canvas ||
            !hero ||
            !window.THREE ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            return;
        }

        const isSmallScreen = window.matchMedia("(max-width: 700px)").matches;
        const THREE = window.THREE;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 100);
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: !isSmallScreen,
            powerPreference: "low-power"
        });
        const group = new THREE.Group();
        const clock = new THREE.Clock();
        const pointer = { x: 0, y: 0 };

        scene.add(group);
        camera.position.set(0, 0, 7.2);

        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isSmallScreen ? 1.25 : 1.75));
        renderer.setClearColor(0x000000, 0);

        const ambient = new THREE.AmbientLight(0xffffff, 0.75);
        const pointLight = new THREE.PointLight(0x57c9ff, 1.2, 18, 2);
        pointLight.position.set(3.5, 2.5, 5.5);
        scene.add(ambient);
        scene.add(pointLight);

        const orb = new THREE.Mesh(
            new THREE.IcosahedronGeometry(isSmallScreen ? 1.05 : 1.3, 1),
            new THREE.MeshBasicMaterial({
                color: 0x57c9ff,
                transparent: true,
                opacity: isSmallScreen ? 0.08 : 0.11,
                wireframe: true
            })
        );
        orb.position.set(isSmallScreen ? 0.1 : 0.8, isSmallScreen ? -1.05 : -0.55, -0.5);
        group.add(orb);

        const ring = new THREE.Mesh(
            new THREE.TorusGeometry(isSmallScreen ? 1.55 : 2.2, 0.03, 16, 100),
            new THREE.MeshBasicMaterial({
                color: 0x1fd997,
                transparent: true,
                opacity: isSmallScreen ? 0.18 : 0.24
            })
        );
        ring.rotation.x = 1.28;
        ring.rotation.y = 0.15;
        ring.position.set(isSmallScreen ? -0.15 : 0.85, isSmallScreen ? -1.35 : -0.95, -0.35);
        group.add(ring);

        const particleCount = isSmallScreen ? 55 : 95;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const colorA = new THREE.Color(0x57c9ff);
        const colorB = new THREE.Color(0x1fd997);

        for (let index = 0; index < particleCount; index += 1) {
            const base = index * 3;
            positions[base] = (Math.random() - 0.5) * (isSmallScreen ? 7.8 : 11.5);
            positions[base + 1] = (Math.random() - 0.5) * (isSmallScreen ? 5.6 : 7.8);
            positions[base + 2] = (Math.random() - 0.5) * 2.8;

            const mixed = colorA.clone().lerp(colorB, Math.random());
            colors[base] = mixed.r;
            colors[base + 1] = mixed.g;
            colors[base + 2] = mixed.b;
        }

        const particlesGeometry = new THREE.BufferGeometry();
        particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

        const particles = new THREE.Points(
            particlesGeometry,
            new THREE.PointsMaterial({
                size: isSmallScreen ? 0.038 : 0.052,
                transparent: true,
                opacity: isSmallScreen ? 0.62 : 0.75,
                vertexColors: true,
                blending: THREE.AdditiveBlending,
                depthWrite: false
            })
        );
        scene.add(particles);

        function resize() {
            const rect = hero.getBoundingClientRect();
            const width = Math.max(rect.width, 1);
            const height = Math.max(rect.height, 1);

            renderer.setSize(width, height, false);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        }

        function animate() {
            const elapsed = clock.getElapsedTime();
            const positionsAttr = particles.geometry.attributes.position;

            orb.rotation.y = elapsed * 0.22 + pointer.x * 0.18;
            orb.rotation.x = elapsed * 0.12 + pointer.y * 0.12;
            ring.rotation.z = elapsed * 0.14;
            group.rotation.y += (pointer.x * 0.18 - group.rotation.y) * 0.04;
            group.rotation.x += ((-pointer.y) * 0.1 - group.rotation.x) * 0.04;

            for (let index = 0; index < particleCount; index += 1) {
                const base = index * 3;
                const baseX = positions[base];
                const baseY = positions[base + 1];
                positionsAttr.array[base] = baseX + Math.sin(elapsed * 0.24 + index * 0.33) * 0.012;
                positionsAttr.array[base + 1] = baseY + Math.cos(elapsed * 0.28 + index * 0.27) * 0.018;
            }
            positionsAttr.needsUpdate = true;

            particles.rotation.y = elapsed * 0.02;
            renderer.render(scene, camera);
            window.requestAnimationFrame(animate);
        }

        hero.addEventListener("mousemove", function (event) {
            const rect = hero.getBoundingClientRect();
            pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
            pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
        });

        hero.addEventListener("mouseleave", function () {
            pointer.x = 0;
            pointer.y = 0;
        });

        resize();
        window.addEventListener("resize", resize);
        animate();
    }

    function enableSceneParallax() {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        const parallaxSections = Array.from(document.querySelectorAll(".parallax-section"));
        const depthLayers = Array.from(document.querySelectorAll("[data-depth]"));

        function updateParallax() {
            const viewportHeight = window.innerHeight || 1;

            parallaxSections.forEach(function (section) {
                const rect = section.getBoundingClientRect();
                const speed = Number(section.dataset.parallaxSpeed || 0);
                const distance = (viewportHeight / 2 - rect.top - rect.height / 2) * speed;
                section.style.setProperty("--parallax-shift", distance.toFixed(2) + "px");
            });

            depthLayers.forEach(function (layer) {
                const rect = layer.getBoundingClientRect();
                const depth = Number(layer.dataset.depth || 0);
                const centerOffset = ((viewportHeight / 2) - (rect.top + rect.height / 2)) * depth;
                layer.style.transform = "translate3d(0, " + centerOffset.toFixed(2) + "px, 0)";
            });
        }

        updateParallax();
        window.addEventListener("scroll", updateParallax, { passive: true });
        window.addEventListener("resize", updateParallax);
    }

    if ("IntersectionObserver" in window && observedSections.length) {
        const sectionObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                sectionVisibility.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
            });

            let currentId = "";
            let highestRatio = 0;

            sectionVisibility.forEach(function (ratio, id) {
                if (ratio > highestRatio) {
                    highestRatio = ratio;
                    currentId = id;
                }
            });

            setActiveNavLink(currentId || "");
        }, {
            threshold: [0, 0.2, 0.35, 0.55, 0.75],
            rootMargin: "-15% 0px -45% 0px"
        });

        observedSections.forEach(function (section) {
            sectionVisibility.set(section.id, 0);
            sectionObserver.observe(section);
        });
    }

    function enableMagneticButtons() {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        document.querySelectorAll(".btn, .cert-btn, .contact-submit").forEach(function (button) {
            button.addEventListener("mousemove", function (event) {
                const rect = button.getBoundingClientRect();
                const offsetX = event.clientX - rect.left - rect.width / 2;
                const offsetY = event.clientY - rect.top - rect.height / 2;
                const moveX = Math.max(Math.min(offsetX / 9, 9), -9);
                const moveY = Math.max(Math.min(offsetY / 9, 7), -7);
                button.style.transform = "translate(" + moveX + "px, " + moveY + "px)";
            });

            button.addEventListener("mouseleave", function () {
                button.style.transform = "";
            });
        });
    }

    function enableTiltEffects() {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        document.querySelectorAll(".project-image, .profile-photo, .about-photo-frame").forEach(function (element) {
            element.classList.add("interactive-tilt");

            element.addEventListener("mousemove", function (event) {
                const rect = element.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width;
                const y = (event.clientY - rect.top) / rect.height;
                const rotateY = (x - 0.5) * 10;
                const rotateX = (0.5 - y) * 10;

                element.classList.add("is-tilting");
                element.style.setProperty("--tilt-x", rotateX.toFixed(2) + "deg");
                element.style.setProperty("--tilt-y", rotateY.toFixed(2) + "deg");
                element.style.setProperty("--img-scale", "1.02");
            });

            element.addEventListener("mouseleave", function () {
                element.classList.remove("is-tilting");
                element.style.removeProperty("--tilt-x");
                element.style.removeProperty("--tilt-y");
                element.style.removeProperty("--img-scale");
            });
        });
    }

    function enableInteractiveCards() {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        document.querySelectorAll(".skill-row, .cert-card").forEach(function (card) {
            card.classList.add("interactive-card");

            card.addEventListener("mousemove", function (event) {
                const rect = card.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width;
                const y = (event.clientY - rect.top) / rect.height;
                const rotateY = (x - 0.5) * 10;
                const rotateX = (0.5 - y) * 10;

                card.classList.add("is-tilting");
                card.style.setProperty("--card-tilt-x", rotateX.toFixed(2) + "deg");
                card.style.setProperty("--card-tilt-y", rotateY.toFixed(2) + "deg");
            });

            card.addEventListener("mouseleave", function () {
                card.classList.remove("is-tilting");
                card.style.removeProperty("--card-tilt-x");
                card.style.removeProperty("--card-tilt-y");
            });
        });

        slides.forEach(function (slide) {
            slide.addEventListener("mousemove", function (event) {
                if (!slide.classList.contains("is-active")) {
                    return;
                }

                const rect = slide.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width;
                const y = (event.clientY - rect.top) / rect.height;
                const rotateY = (x - 0.5) * 7;
                const rotateX = (0.5 - y) * 5;

                slide.style.setProperty("--card-tilt-x", rotateX.toFixed(2) + "deg");
                slide.style.setProperty("--card-tilt-y", rotateY.toFixed(2) + "deg");
            });

            slide.addEventListener("mouseleave", function () {
                slide.style.removeProperty("--card-tilt-x");
                slide.style.removeProperty("--card-tilt-y");
            });
        });
    }

    function enableHeroSceneMotion() {
        const hero = document.getElementById("hero");
        const heroCopy = hero ? hero.querySelector(".hero-copy") : null;
        const profileWrap = hero ? hero.querySelector(".profile-wrap") : null;
        const heroScene = hero ? hero.querySelector(".hero-scene") : null;

        if (!hero || !heroCopy || !profileWrap || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        hero.addEventListener("mousemove", function (event) {
            const rect = hero.getBoundingClientRect();
            const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
            const offsetY = (event.clientY - rect.top) / rect.height - 0.5;

            heroCopy.style.transform = "translate3d(" + (offsetX * -22).toFixed(2) + "px, " + (offsetY * -18).toFixed(2) + "px, 0)";
            profileWrap.style.transform = "translate3d(" + (offsetX * 28).toFixed(2) + "px, " + (offsetY * 22).toFixed(2) + "px, 0)";

            if (heroScene) {
                heroScene.style.transform = "translate3d(" + (offsetX * 16).toFixed(2) + "px, " + (offsetY * 10).toFixed(2) + "px, 0)";
            }
        });

        hero.addEventListener("mouseleave", function () {
            heroCopy.style.transform = "";
            profileWrap.style.transform = "";
            if (heroScene) {
                heroScene.style.transform = "";
            }
        });
    }

    const certModal = document.getElementById("certModal");
    const openCertModal = document.getElementById("openCertModal");
    const closeCertModal = document.getElementById("closeCertModal");
    const certImageModal = document.getElementById("certImageModal");
    const closeCertImageModal = document.getElementById("closeCertImageModal");
    const certImagePreview = document.getElementById("certImagePreview");
    const certImageTitle = document.getElementById("certImageTitle");

    function showCertModal() {
        if (!certModal) {
            return;
        }

        certModal.classList.add("open");
        certModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function hideCertModal() {
        if (!certModal) {
            return;
        }

        certModal.classList.remove("open");
        certModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    if (openCertModal) {
        openCertModal.addEventListener("click", showCertModal);
    }

    if (closeCertModal) {
        closeCertModal.addEventListener("click", hideCertModal);
    }

    if (certModal) {
        certModal.addEventListener("click", function (event) {
            if (event.target.hasAttribute("data-close-cert")) {
                hideCertModal();
            }
        });
    }

    function showCertImageModal(src, title) {
        if (!certImageModal || !certImagePreview) {
            return;
        }

        certImagePreview.src = src;
        certImagePreview.alt = title || "Certificate preview";
        if (certImageTitle) {
            certImageTitle.textContent = title || "Certificate";
        }
        certImageModal.classList.add("open");
        certImageModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function hideCertImageModal() {
        if (!certImageModal || !certImagePreview) {
            return;
        }

        certImageModal.classList.remove("open");
        certImageModal.setAttribute("aria-hidden", "true");
        certImagePreview.src = "";
        document.body.style.overflow = certModal && certModal.classList.contains("open") ? "hidden" : "";
    }

    document.querySelectorAll(".cert-card").forEach(function (card) {
        const image = card.querySelector("img");
        const title = card.querySelector("h4");

        if (!image) {
            return;
        }

        const action = document.createElement("button");
        action.type = "button";
        action.className = "cert-view-btn";
        action.textContent = "View full image";
        action.addEventListener("click", function () {
            showCertImageModal(image.src, title ? title.textContent : "Certificate");
        });

        card.appendChild(action);
    });

    if (closeCertImageModal) {
        closeCertImageModal.addEventListener("click", hideCertImageModal);
    }

    if (certImageModal) {
        certImageModal.addEventListener("click", function (event) {
            if (event.target.hasAttribute("data-close-cert-image")) {
                hideCertImageModal();
            }
        });
    }

    document.addEventListener("keydown", function (event) {
        if (event.key !== "Escape") {
            return;
        }

        if (certImageModal && certImageModal.classList.contains("open")) {
            hideCertImageModal();
        } else if (certModal && certModal.classList.contains("open")) {
            hideCertModal();
        } else {
            closeMobileMenu();
        }
    });

    let revealObserver = null;

    function initScrollAnimations() {
        const revealGroups = [
            [".hero-grid > div", "reveal-left"],
            [".hero-grid > aside", "reveal-right"],
            ["#about .about-photo-wrap", "reveal-left"],
            ["#about .about-content", "reveal-right"],
            ["#projects .section-head", "reveal-left"],
            ["#projects .projects-carousel", "reveal-zoom"],
            ["#skills .section-head", "reveal-left"],
            ["#skills .skill-bars", "reveal-right"],
            ["#contact .section-head", "reveal-left"],
            ["#contact .form-alert", "reveal-zoom"],
            ["#contact .contact-form", "reveal-right"],
            ["footer .container", "reveal-zoom"]
        ];

        const revealElements = new Set();

        revealGroups.forEach(function (group) {
            const selector = group[0];
            const variant = group[1];
            document.querySelectorAll(selector).forEach(function (el) {
                el.classList.add("scroll-reveal");
                if (variant) {
                    el.classList.add(variant);
                }
                revealElements.add(el);
            });
        });

        document.querySelectorAll("section").forEach(function (section) {
            const staggerTargets = Array.from(section.querySelectorAll(".card, .interest-item, .skill-row, .carousel-slide, .pill"));
            staggerTargets.forEach(function (el, index) {
                if (!el.classList.contains("scroll-reveal")) {
                    el.classList.add("scroll-reveal");
                }
                el.style.setProperty("--reveal-delay", (index % 8) * 65 + "ms");
                revealElements.add(el);
            });
        });

        if (!("IntersectionObserver" in window)) {
            revealElements.forEach(function (el) {
                el.classList.add("is-visible");
            });
            return;
        }

        if (revealObserver) {
            revealObserver.disconnect();
        }

        revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                } else {
                    entry.target.classList.remove("is-visible");
                }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

        revealElements.forEach(function (el) {
            el.classList.remove("is-visible");
            revealObserver.observe(el);
        });
    }

    const carousel = document.getElementById("projectsCarousel");
    const slides = carousel ? Array.from(carousel.querySelectorAll(".carousel-slide")) : [];
    const stage = carousel ? carousel.querySelector(".carousel-stage") : null;
    const dots = carousel ? Array.from(carousel.querySelectorAll(".dot")) : [];
    const prevBtn = carousel ? carousel.querySelector(".carousel-btn.prev") : null;
    const nextBtn = carousel ? carousel.querySelector(".carousel-btn.next") : null;
    const totalSlides = slides.length;
    let currentSlide = 0;
    let autoPlayTimer = null;
    let touchStartX = 0;
    let touchEndX = 0;

    function getCircularOffset(index, active, length) {
        let offset = index - active;
        if (offset > length / 2) {
            offset -= length;
        }
        if (offset < -length / 2) {
            offset += length;
        }
        return offset;
    }

    function renderCarousel() {
        if (!totalSlides) {
            return;
        }

        slides.forEach(function (slide, index) {
            const offset = getCircularOffset(index, currentSlide, totalSlides);
            slide.style.setProperty("--offset", offset);
            slide.classList.remove("is-active", "is-side");

            if (offset === 0) {
                slide.classList.add("is-active");
            } else if (Math.abs(offset) === 1) {
                slide.classList.add("is-side");
            }
        });

        dots.forEach(function (dot, index) {
            dot.classList.toggle("active", index === currentSlide);
        });

        window.requestAnimationFrame(function () {
            const activeSlide = slides[currentSlide];
            if (activeSlide && stage) {
                stage.style.height = activeSlide.offsetHeight + 8 + "px";
            }
        });
    }

    function goToSlide(index) {
        if (!totalSlides) {
            return;
        }
        currentSlide = (index + totalSlides) % totalSlides;
        renderCarousel();
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    function startAutoplay() {
        if (!totalSlides) {
            return;
        }
        stopAutoplay();
        autoPlayTimer = window.setInterval(nextSlide, 4500);
    }

    function stopAutoplay() {
        if (autoPlayTimer) {
            window.clearInterval(autoPlayTimer);
            autoPlayTimer = null;
        }
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", function () {
            prevSlide();
            startAutoplay();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", function () {
            nextSlide();
            startAutoplay();
        });
    }

    dots.forEach(function (dot, index) {
        dot.addEventListener("click", function () {
            goToSlide(index);
            startAutoplay();
        });
    });

    if (carousel) {
        carousel.addEventListener("mouseenter", stopAutoplay);
        carousel.addEventListener("mouseleave", startAutoplay);
        carousel.addEventListener("focusin", stopAutoplay);
        carousel.addEventListener("focusout", startAutoplay);

        carousel.addEventListener("touchstart", function (event) {
            touchStartX = event.changedTouches[0].clientX;
        }, { passive: true });

        carousel.addEventListener("touchend", function (event) {
            touchEndX = event.changedTouches[0].clientX;
            const swipeDistance = touchEndX - touchStartX;

            if (Math.abs(swipeDistance) > 50) {
                if (swipeDistance < 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
                startAutoplay();
            }
        }, { passive: true });
    }

    window.addEventListener("resize", renderCarousel);
    window.addEventListener("scroll", updateScrollState, { passive: true });

    const skillRows = Array.from(document.querySelectorAll("#skills .skill-row"));

    function animateSkillRing(ring) {
        if (!ring || ring.classList.contains("animated")) {
            return;
        }

        const targetLevel = Number(ring.dataset.level || "0");
        const radius = Number(ring.getAttribute("r")) || 40;
        const circumference = 2 * Math.PI * radius;
        const normalizedLevel = Math.max(0, Math.min(100, targetLevel));
        const dashOffset = circumference - (normalizedLevel / 100) * circumference;

        ring.style.strokeDasharray = circumference.toFixed(2);
        ring.style.strokeDashoffset = dashOffset.toFixed(2);
        ring.classList.add("animated");
    }

    function animateAllSkillRings() {
        document.querySelectorAll("#skills .skill-circle-progress").forEach(function (ring) {
            animateSkillRing(ring);
        });
    }

    if ("IntersectionObserver" in window && skillRows.length) {
        const skillObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const ring = entry.target.querySelector(".skill-circle-progress");
                    animateSkillRing(ring);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        skillRows.forEach(function (row) {
            skillObserver.observe(row);
        });
    } else {
        animateAllSkillRings();
    }

    const contactForm = document.getElementById("contactForm");
    const toastStack = document.getElementById("toastStack");
    const contactSubmit = document.getElementById("contactSubmit");
    const formFields = contactForm ? Array.from(contactForm.querySelectorAll("input, textarea")) : [];
    let activeToast = null;
    let activeToastTimer = null;

    function removeToast(toast) {
        if (!toast) {
            return;
        }

        toast.classList.remove("show");
        toast.classList.add("hide");

        window.setTimeout(function () {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 320);
    }

    function showFormAlert(type, message) {
        if (!toastStack) {
            return;
        }

        if (activeToastTimer) {
            window.clearTimeout(activeToastTimer);
            activeToastTimer = null;
        }

        if (activeToast) {
            removeToast(activeToast);
        }

        const toast = document.createElement("div");
        const title = type === "success" ? "Message Sent" : "Sending Failed";
        const icon = type === "success" ? "bi-check2-circle" : "bi-exclamation-circle";

        toast.className = "toast " + type;
        toast.setAttribute("role", "status");
        toast.innerHTML = ""
            + '<div class="toast-head">'
            + '  <span class="toast-icon"><i class="bi ' + icon + '" aria-hidden="true"></i></span>'
            + '  <div>'
            + '      <p class="toast-title">' + title + "</p>"
            + '      <p class="toast-message">' + message + "</p>"
            + "  </div>"
            + "</div>";

        toastStack.appendChild(toast);
        activeToast = toast;

        window.requestAnimationFrame(function () {
            toast.classList.add("show");
        });

        activeToastTimer = window.setTimeout(function () {
            removeToast(toast);
            if (activeToast === toast) {
                activeToast = null;
            }
            activeToastTimer = null;
        }, 4000);
    }

    function markInvalidField(field, isInvalid) {
        if (!field) {
            return;
        }
        field.classList.toggle("invalid", isInvalid);
    }

    function validateContactForm() {
        if (!contactForm) {
            return false;
        }

        let isValid = true;

        formFields.forEach(function (field) {
            const trimmedValue = field.value.trim();
            let fieldIsValid = true;

            if (!trimmedValue) {
                fieldIsValid = false;
            } else if (field.type === "email") {
                fieldIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue);
            } else if (field.name === "phone_number") {
                fieldIsValid = /^[0-9+\-()\s]{7,20}$/.test(trimmedValue);
            }

            markInvalidField(field, !fieldIsValid);
            if (!fieldIsValid) {
                isValid = false;
            }
        });

        return isValid;
    }

    formFields.forEach(function (field) {
        field.addEventListener("input", function () {
            markInvalidField(field, false);
        });
    });

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!validateContactForm()) {
                showFormAlert("error", "Please complete all required fields correctly.");
                return;
            }

            if (!window.emailjs) {
                showFormAlert("error", "Email service is unavailable right now. Please try again later.");
                return;
            }

            if (
                EMAILJS_PUBLIC_KEY === "YOUR_PUBLIC_KEY" ||
                EMAILJS_SERVICE_ID === "YOUR_SERVICE_ID" ||
                EMAILJS_TEMPLATE_ID === "YOUR_TEMPLATE_ID"
            ) {
                showFormAlert("error", "Set your EmailJS public key, service ID, and template ID in js/portfolio.js before sending messages.");
                return;
            }

            if (contactSubmit) {
                contactSubmit.disabled = true;
                contactSubmit.classList.add("is-loading");
                contactSubmit.textContent = "Sending...";
            }

            window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
                full_name: contactForm.full_name.value.trim(),
                email: contactForm.email.value.trim(),
                phone_number: contactForm.phone_number.value.trim(),
                subject: contactForm.subject.value.trim(),
                message: contactForm.message.value.trim()
            }).then(function () {
                contactForm.reset();
                formFields.forEach(function (field) {
                    markInvalidField(field, false);
                });
                showFormAlert("success", "Your message has been sent successfully.");
            }).catch(function () {
                showFormAlert("error", "Something went wrong while sending your message. Please try again.");
            }).finally(function () {
                if (contactSubmit) {
                    contactSubmit.disabled = false;
                    contactSubmit.classList.remove("is-loading");
                    contactSubmit.textContent = "Send Message";
                }
            });
        });
    }

    initScrollAnimations();
    renderCarousel();
    startAutoplay();

    window.addEventListener("pageshow", function () {
        initScrollAnimations();
    });

    const year = document.getElementById("year");
    if (year) {
        year.textContent = String(new Date().getFullYear());
    }

    updateScrollState();
    createHeroParticles();
    initHeroThreeScene();
    enableSceneParallax();
    enableMagneticButtons();
    enableTiltEffects();
    enableInteractiveCards();
    enableHeroSceneMotion();

    window.requestAnimationFrame(function () {
        body.classList.add("is-ready");
    });
}());
