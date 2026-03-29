(function () {
    const EMAILJS_PUBLIC_KEY = "0SNcJ4xyZlmGEwTct";
    const EMAILJS_SERVICE_ID = "service_ybrpukc";
    const EMAILJS_TEMPLATE_ID = "template_0fhi9em";

    if (window.emailjs && EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
        window.emailjs.init({
            publicKey: EMAILJS_PUBLIC_KEY
        });
    }

    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    function closeMobileMenu() {
        if (!menuBtn || !navLinks) {
            return;
        }

        menuBtn.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        navLinks.classList.remove("open");
    }

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", function () {
            const isOpen = menuBtn.classList.toggle("open");
            menuBtn.setAttribute("aria-expanded", String(isOpen));
            navLinks.classList.toggle("open");
        });

        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", closeMobileMenu);
        });
    }

    const navItems = navLinks ? Array.from(navLinks.querySelectorAll('a[href^="#"]')) : [];
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

    const skillsSection = document.getElementById("skills");
    const skillFills = Array.from(document.querySelectorAll("#skills .skill-fill"));

    function animateSkillBars() {
        skillFills.forEach(function (fill) {
            const targetLevel = fill.dataset.level || "0";
            fill.style.width = targetLevel + "%";
            fill.classList.add("animated");
        });
    }

    if ("IntersectionObserver" in window) {
        const skillObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.35 });

        if (skillsSection) {
            skillObserver.observe(skillsSection);
        }
    } else {
        animateSkillBars();
    }

    const contactForm = document.getElementById("contactForm");
    const formAlert = document.getElementById("formAlert");
    const contactSubmit = document.getElementById("contactSubmit");
    const formFields = contactForm ? Array.from(contactForm.querySelectorAll("input, textarea")) : [];

    function showFormAlert(type, message) {
        if (!formAlert) {
            return;
        }

        formAlert.hidden = false;
        formAlert.className = "form-alert " + type;
        formAlert.textContent = message;
    }

    function clearFormAlert() {
        if (!formAlert) {
            return;
        }

        formAlert.hidden = true;
        formAlert.className = "form-alert";
        formAlert.textContent = "";
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
            if (formAlert && !formAlert.hidden) {
                clearFormAlert();
            }
        });
    });

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();
            clearFormAlert();

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
}());
