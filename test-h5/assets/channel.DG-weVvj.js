import { U as Utils, F as Color } from './markdown-manager.C2BSpKoz.js';

/* IMPORT */
/* MAIN */
const channel = (color, channel) => {
    return Utils.lang.round(Color.parse(color)[channel]);
};

export { channel as c };
