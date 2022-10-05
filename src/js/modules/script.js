import Swiper, { Navigation } from 'swiper';

Swiper.use([Navigation]);

export default function userScripts() {
    const headerElement = document.querySelector('.main-header');

    const callback = (entries, observer) => {
        if (entries[0].isIntersecting) {
            headerElement.classList.remove('_scroll')
        } else {
            headerElement.classList.add('_scroll')
        }
    }

    const headerObserver = new IntersectionObserver(callback);

    headerObserver.observe(headerElement);


    const swiper = new Swiper('.slider-main-block', {
        navigation: {
            nextEl: '.slider-block__nav-arrow--right',
            prevEl: '.slider-block__nav-arrow--left',
        },

        spaceBetween: 0,

        breakpoints: {
            610: {
                spaceBetween: 70,
            }
        }
    });

    swiper.on('transitionStart', () => {
        const allSlides = document.querySelectorAll('.slider-main-block__slide');

        let afterActive = false;

        for (const slide of allSlides) {
            if (slide.classList.contains('swiper-slide-active')) {
                afterActive = true;
            }

            if (afterActive) {
                slide.classList.remove('slider-main-block__slide--hidden');
            } else {
                slide.classList.add('slider-main-block__slide--hidden');
            }
        }
    });

    const burgerBtn = document.querySelector('.burger-btn');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (mobileMenu) {
        burgerBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('mobile-menu--visible');
        });
    }

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.mobile-menu') && !e.target.closest('.burger-btn')) {
            mobileMenu.classList.remove('mobile-menu--visible');
        }
    })
}
