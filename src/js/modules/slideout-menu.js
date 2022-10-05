import "../libs/slideout.min.js"

export default function startSlideout() {
    const panel = document.querySelector('.page');
    const menu = document.querySelector('.page-slideout-menu');

    const slideout = new Slideout({
        'panel': panel,
        'menu': menu,
        'padding': 256,
        'tolerance': 70,
        'side': 'right',
    });

    document.querySelector('.burger-btn').addEventListener('click', () => slideout.toggle());
    document.querySelector('.page-slideout-menu__close-btn').addEventListener('click', () => slideout.close());

    slideout.on('beforeopen', () => {
        document.querySelector('.page-blackout').classList.add('_blackout--visible')
        document.querySelector('.page-slideout-menu').classList.add('slideout-open');
    });

    slideout.on('close', () => {
        document.querySelector('.page-blackout').classList.remove('_blackout--visible')
        document.querySelector('.page-slideout-menu').classList.remove('slideout-open');
    });
}
