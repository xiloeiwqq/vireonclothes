(function () {
    const modal = document.getElementById("imageZoomModal");
    if (!modal) return;

    const modalImg = document.getElementById("imageZoomModalImg");
    const btnPrev = modal.querySelector(".image-zoom-modal__nav--prev");
    const btnNext = modal.querySelector(".image-zoom-modal__nav--next");
    const counterEl = document.getElementById("imageZoomCounter");
    const titleEl = document.getElementById("imageZoomProductTitle");
    const priceEl = document.getElementById("imageZoomProductPrice");
    const descEl = document.getElementById("imageZoomProductDesc");
    const btnClose = modal.querySelector(".image-zoom-modal__close");
    const backdrop = modal.querySelector(".image-zoom-modal__backdrop");

    let sources = [];
    let currentIndex = 0;

    function setImageWithFade(newSrc) {
        modalImg.classList.add("switching");
        
        setTimeout(() => {
            modalImg.src = newSrc;
            modalImg.onload = () => {
                modalImg.classList.remove("switching");
            };
        }, 150);
    }

    function updateModalContent() {
        if (!sources.length) return;

        setImageWithFade(sources[currentIndex]);
        
        if (counterEl) {
            counterEl.textContent = `${currentIndex + 1} / ${sources.length}`;
        }

        const isMulti = sources.length > 1;
        if (btnPrev) btnPrev.style.display = isMulti ? "flex" : "none";
        if (btnNext) btnNext.style.display = isMulti ? "flex" : "none";
    }

    function openModal(wrapper) {
        const raw = wrapper.dataset.gallery;
        sources = raw ? raw.split("|").map(s => s.trim()).filter(Boolean) : [];
        currentIndex = 0;

        if (titleEl) titleEl.textContent = wrapper.dataset.title || "";
        if (descEl) descEl.textContent = wrapper.dataset.description || "Описание отсутствует";
        if (priceEl) priceEl.textContent = wrapper.dataset.price || "";

        modal.classList.add("image-zoom-modal--visible");
        document.body.classList.add("image-zoom-open");

        updateModalContent();
    }

    function closeModal() {
        modal.classList.remove("image-zoom-modal--visible");
        document.body.classList.remove("image-zoom-open");
    }

    document.querySelectorAll(".product__img").forEach((img) => {
        img.addEventListener("click", (e) => {
            const wrapper = e.target.closest(".product__img-wrapper");
            if (wrapper) openModal(wrapper);
        });
    });

    if (btnClose) btnClose.addEventListener("click", closeModal);
    if (backdrop) backdrop.addEventListener("click", closeModal);

    const goNext = (e) => { e?.stopPropagation(); currentIndex = (currentIndex + 1) % sources.length; updateModalContent(); };
    const goPrev = (e) => { e?.stopPropagation(); currentIndex = (currentIndex - 1 + sources.length) % sources.length; updateModalContent(); };

    if (btnNext) btnNext.addEventListener("click", goNext);
    if (btnPrev) btnPrev.addEventListener("click", goPrev);

    document.addEventListener("keydown", (e) => {
        if (!modal.classList.contains("image-zoom-modal--visible")) return;
        if (e.key === "Escape") closeModal();
        if (sources.length > 1) {
            if (e.key === "ArrowRight") goNext();
            if (e.key === "ArrowLeft") goPrev();
        }
    });
})();

document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.about-brand__slider-track');
    const slides = document.querySelectorAll('.about-brand__slider-img');
    
    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    const slideCount = slides.length;
    const intervalTime = 5000;

    function nextSlide() {
        currentIndex++;
        
        if (currentIndex >= slideCount) {
            currentIndex = 0;
        }
        
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    setInterval(nextSlide, intervalTime);
});

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const fullMenu = document.getElementById('fullMenu');
    const menuLinks = document.querySelectorAll('.full-menu__link');

    const toggleMenu = () => {
        menuToggle.classList.toggle('menu-toggle--active');
        fullMenu.classList.toggle('full-menu--open');
        document.body.classList.toggle('menu-open');
    };

    menuToggle.addEventListener('click', toggleMenu);

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (fullMenu.classList.contains('full-menu--open')) {
                toggleMenu();
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const sections = document.querySelectorAll('[data-theme]');

    const observerOptions = {
        rootMargin: "-30px 0px -90% 0px", 
        threshold: 0
    };

    const themeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const theme = entry.target.getAttribute('data-theme');
                
                if (theme === 'dark') {
                    menuToggle.classList.add('menu-toggle--light');
                } else {
                    menuToggle.classList.remove('menu-toggle--light');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => themeObserver.observe(section));
});

document.addEventListener('DOMContentLoaded', () => {
    const menuLinks = document.querySelectorAll('.full-menu__link');
    const menuToggle = document.getElementById('menuToggle');
    const fullMenu = document.getElementById('fullMenu');

    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                menuToggle.classList.remove('menu-toggle--active');
                fullMenu.classList.remove('full-menu--open');
                document.body.classList.remove('menu-open');

                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});