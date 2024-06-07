const tinyflowSlider = new Swiper('.tinyflow-slider', {
    slidesPerView: 2,
    loop: true,
    centeredSlides: true,
    virtualTranslate: true,
    loopPreventsSliding: false,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        waitForTransition: false,
        pauseOnMouseEnter: true,
    },
    keyboard: {
        enabled: true,
        onlyInViewport: true,
    },
    pagination: {
        el: '.tinyflow-slider__pagination',
        clickable: true,
        dynamicBullets: true,
        renderBullet: function (index, className) {
            return `<button type="button" aria-label="pagination ${index+1}" class="tinyflow-slider__pagination__btn ${className}" style="--_progress: 0%;"></button>`;
        },
    },
    navigation: {
        nextEl: '.arrow--next',
        prevEl: '.arrow--prev',
    },
    on: {
        beforeInit: function (swiper) {
            swiper.params.autoplay.delay = swiper.el.dataset.autoplayDelay * 1 || swiper.params.autoplay.delay;
        },
        autoplayTimeLeft(swiper, time, progress) {
            swiper.pagination.el.querySelector('.tinyflow-slider__pagination__btn.swiper-pagination-bullet-active').style.setProperty('--_progress', (1 - progress) * 100 + '%');
        },
        activeIndexChange: function (swiper){
            swiper.slides.forEach((eachSlide, index) => {
                if(index === swiper.activeIndex){
                    if(eachSlide.querySelector('[data-slide-media]').dataset.slideMedia == 'video'){
                        if(swiper.el.hasAttribute('data-dynamic-autoplay-delay') && swiper.el.dataset?.dynamicAutoplayDelay == 'true'){
                            swiper.params.autoplay.delay = eachSlide.querySelector('[data-slide-media="video"]').duration * 1000;
                        }
                        eachSlide.querySelector('[data-slide-media="video"]').currentTime = 0;
                        eachSlide.querySelector('[data-slide-media="video"]').play();
                    }else{
                        swiper.params.autoplay.delay = swiper.el.dataset.autoplayDelay * 1 || 5000;
                    }
                }else{
                    if(eachSlide.querySelector('[data-slide-media]').dataset.slideMedia == 'video'){
                        eachSlide.querySelector('[data-slide-media="video"]').pause()
                    }
                }
            });
        },
    },
});