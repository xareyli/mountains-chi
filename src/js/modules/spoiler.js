export default function spoilersInit() {
    const spoilers = document.querySelectorAll('[data-spoilers]');

    if (spoilers.length > 0) {
        const regularSpoilers = Array.from(spoilers).filter((item, index, self) =>
            !item.dataset.spoilers.split(',')[0]
        );

        if (regularSpoilers.length) {
            initSpoilers(regularSpoilers);
        }

        const mediaSpoilers = Array.from(spoilers).filter((item, index, self) =>
            item.dataset.spoilers.split(',')[0]
        );

        if (mediaSpoilers.length) {
            const breakpoints = [];

            mediaSpoilers.forEach(item => {
                const params = item.dataset.spoilers;
                const breakpoint = {};
                const paramsArray = params.split(',');

                breakpoint.value = paramsArray[0];
                breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : 'max';
                breakpoint.item = item;

                breakpoints.push(breakpoint);
            });

            let mediaQueries = breakpoints.map(item =>
                '(' + item.type + '-width: ' + item.value + 'px),' + item.value + ',' + item.type
            );

            mediaQueries = mediaQueries.filter((item, index, self) =>
                self.indexOf(item) === index
            );

            mediaQueries.forEach(breakpoint => {
                const paramsArray = breakpoint.split(',');
                const mediaBreakpoint = paramsArray[1];
                const mediaType = paramsArray[2];
                const matchMedia = window.matchMedia(paramsArray[0]);

                const spoilers = breakpoints.filter(item =>
                    item.value  === mediaBreakpoint && item.type === mediaType
                );

                matchMedia.addListener(() =>
                    initSpoilers(spoilers, matchMedia)
                );

                initSpoilers(spoilers, matchMedia);
            })
        }

        function initSpoilers(spoilers, matchMedia = false) {
            spoilers.forEach(spoilerBlock => {
                spoilerBlock = matchMedia ? spoilerBlock.item : spoilerBlock;

                if (matchMedia.matches || !matchMedia) {
                    spoilerBlock.classList.add('_init');
                    initSpoilerBody(spoilerBlock);
                    spoilerBlock.addEventListener('click', setSpoilerAction);
                } else {
                    spoilerBlock.classList.remove('_init');
                    initSpoilerBody(spoilerBlock, false);
                    spoilerBlock.removeEventListener('click', setSpoilerAction);
                }
            })
        }

        function initSpoilerBody(spoilerBlock, hideSpoilerBody = true) {
            const spoilerTitles = spoilerBlock.querySelectorAll('[data-spoiler]');

            if (spoilerTitles.length) {
                spoilerTitles.forEach(spoilerTitle => {
                    if (hideSpoilerBody) {
                        spoilerTitle.removeAttribute('tabindex');

                        if (!spoilerTitle.classList.contains('_active')) {
                            spoilerTitle.nextElementSibling.hidden = true;
                        }
                    } else {
                        spoilerTitle.setAttribute('tabindex', '-1');
                        spoilerTitle.nextElementSibling.hidden = false;
                    }
                })
            }
        }

        function setSpoilerAction(e) {
            const el = e.target;

            if (el.nextElementSibling.classList.contains('_slide')) {
                return;
            }

            if (el.hasAttribute('data-spoiler') || el.closest('[data-spoiler]')) {
                const spoilerTitle = el.hasAttribute('data-spoiler') ? el : el.closest('[data-spoiler]');
                const spoilerBlock = spoilerTitle.closest('[data-spoilers]');
                const oneSpoiler = spoilerBlock.hasAttribute('data-one-spoiler');

                if (!spoilerBlock.querySelectorAll('._slider').length) {
                    if (oneSpoiler && !spoilerTitle.classList.contains('_active')) {
                        hideSpoilerBody(spoilerBlock);
                    }

                    spoilerTitle.classList.toggle('_active');
                    _slideToggle(spoilerTitle.nextElementSibling, 1500);
                }

                e.preventDefault();
            }
        }

        function hideSpoilerBody(spoilerBlock) {
            const spoilerActiveTitle = spoilerBlock.querySelector('[data-spoiler]._active');

            if (spoilerActiveTitle) {
                spoilerActiveTitle.classList.remove('_active');
                _slideUp(spoilerActiveTitle.nextElementSibling, 500);
            }
        }
    }

    // =========================================================================================================
    let _slideUp = (target, duration = 500) => {
        if (!target.classList.contains('_slide')) {
            target.classList.add('_slide');
            target.style.transitionProperty = 'height, margin, padding';
            target.style.transitionDuration = duration + 'ms';
            target.style.height = target.offsetHeight + 'px';
            target.style.overflow = 'hidden';
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;

            window.setTimeout(() => {
                target.style.height = 0;
            }, 1);

            window.setTimeout(() => {
                target.hidden = true;
                target.style.removeProperty('height');
                target.style.removeProperty('padding-top');
                target.style.removeProperty('padding-bottom');
                target.style.removeProperty('margin-top');
                target.style.removeProperty('margin-bottom');
                target.style.removeProperty('overflow');
                target.style.removeProperty('transition-duration');
                target.style.removeProperty('transition-property');
                target.classList.remove('_slide');
            }, duration);
        }
    };

    let _slideDown = (target, duration = 500) => {
        if (!target.classList.contains('_slide')) {
            target.classList.add('_slide');

            if (target.hidden)
                target.hidden = false;

            let height = target.offsetHeight;

            target.style.overflow = 'hidden';
            target.style.height = 0;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;

            setTimeout(() => {
                target.style.transitionProperty = 'height, margin, padding';
                target.style.transitionDuration = duration + 'ms';
                target.style.height = height + 'px';
                target.style.removeProperty('padding-top');
                target.style.removeProperty('padding-bottom');
                target.style.removeProperty('margin-top');
                target.style.removeProperty('margin-bottom');
            });

            window.setTimeout(() => {
                target.style.removeProperty('height');
                target.style.removeProperty('overflow');
                target.style.removeProperty('transition-duration');
                target.style.removeProperty('transition-property');
                target.classList.remove('_slide');
            }, duration);
        }
    };

    let _slideToggle = (target, duration = 500) =>
        target.hidden ? _slideDown(target, duration) : _slideUp(target, duration);
}
