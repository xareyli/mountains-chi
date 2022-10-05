export default function dynamicAdaptiveInit() {
    const DAItems = document.querySelectorAll('[data-da]');

    const breakpoints = [];

    DAItems.forEach(item => {
        const [moveAfter, maxWidth] = item.dataset.da.split(',');

        breakpoints.push({
            toMove: item,
            moveAfter, maxWidth
        })
    });

    let mediaQueries = breakpoints.map(item =>
        '(max-width: ' + item.maxWidth + 'px),' + item.maxWidth + ',' + 'max'
    );

    mediaQueries = mediaQueries.filter((item, index, self) =>
        self.indexOf(item) === index
    );

    mediaQueries.forEach(breakpoint => {
        const paramsArray = breakpoint.split(',');
        const mediaBreakpoint = paramsArray[1];
        const matchMedia = window.matchMedia(paramsArray[0]);

        const elements = breakpoints.filter(item =>
            item.maxWidth  === mediaBreakpoint
        );

        const moveElements = () =>
            elements.forEach(element => {
                const moveAfter = document.querySelector(element.moveAfter);

                moveAfter.after(element.toMove);
            });

        matchMedia.addListener(moveElements);
        
        if (matchMedia.matches) {
            moveElements();
        }
    })
}
