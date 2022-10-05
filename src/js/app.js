import turnWebp from "./modules/functions.js"
import spoilersInit from "./modules/spoiler.js"
import dynamicAdaptiveInit from "./modules/dynamic-adaptive.js"
import turnIbgOn from "./modules/ibg.js"
import startSlideout from "./modules/slideout-menu.js"
import userScripts from "./modules/script.js"


function onDocumentLoaded() {
    document.querySelector('body').classList.remove('_preload');

    turnWebp();
    spoilersInit();
    turnIbgOn();
    dynamicAdaptiveInit();
    userScripts();
}

window.onload = onDocumentLoaded;
