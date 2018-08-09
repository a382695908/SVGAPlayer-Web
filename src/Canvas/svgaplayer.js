import {AutoLoader} from './autoLoader';
import {Parser} from '../parser';
import {Player} from './player';

module.exports = {
    Parser,
    Player,
    autoload: AutoLoader.autoload,
}
AutoLoader.autoload();

console.log("svgaplayer.js init");