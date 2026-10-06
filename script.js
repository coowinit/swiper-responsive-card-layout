(function () {
  function initDemo(section) {
    const slider = section.querySelector('.slider');
    const tabs = Array.from(section.querySelectorAll('.tab'));
    const marker = section.querySelector('.marker');
    const slides = section.querySelectorAll('.swiper-slide');

    if (!slider || !slides.length) return;

    if (tabs.length && tabs.length !== slides.length) {
      console.warn(
        `Demo "${section.id || '(no id)'}": slide 数量 (${slides.length}) 与 tab 数量 (${tabs.length}) 不一致。`
      );
    }

    const swiper = new Swiper(slider, {
      speed: 500,
      slidesPerView: 1.16,
      spaceBetween: 16,
      watchOverflow: true,
      grabCursor: true,
      breakpoints: {
        768: {
          slidesPerView: 1,
          spaceBetween: 0,
          grabCursor: false
        }
      }
    });

    function updateTabs(index) {
      if (!tabs.length) return;

      tabs.forEach((tab, i) => {
        const active = i === index;
        tab.classList.toggle('active', active);
        tab.setAttribute('aria-selected', String(active));
      });

      updateMarker(index);
    }

    function updateMarker(index) {
      if (!marker || !tabs[index]) return;

      const activeTab = tabs[index];
      marker.style.width = `${activeTab.offsetWidth}px`;
      marker.style.transform = `translateX(${activeTab.offsetLeft}px)`;
    }

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => swiper.slideTo(index));
    });

    swiper.on('slideChange', () => {
      updateTabs(swiper.activeIndex);
    });

    updateTabs(swiper.activeIndex);

    if ('ResizeObserver' in window) {
      const observer = new ResizeObserver(() => {
        updateMarker(swiper.activeIndex);
      });
      observer.observe(section);
    } else {
      window.addEventListener('resize', () => {
        updateMarker(swiper.activeIndex);
      });
    }
  }

  document.querySelectorAll('.demo').forEach(initDemo);
})();
