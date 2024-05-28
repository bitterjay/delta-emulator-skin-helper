// generateJSON.js

import getRepresentations from './representations.js';
import screenSizes from './screenSizes.js';

export function generateJSON() {
    const name = document.getElementById('name').value;
    const consoleSelect = document.getElementById('console').value;
    const skinname = document.getElementById('skinname').value;
    const debug = document.getElementById('debug').checked;

    const identifier = `com.${name}.${consoleSelect}.${skinname}`;

    let gameTypeIdentifier = '';
    switch (consoleSelect) {
        case 'gbc':
            gameTypeIdentifier = 'com.rileytestut.delta.game.gbc';
            break;
        case 'gba':
            gameTypeIdentifier = 'com.rileytestut.delta.game.gba';
            break;
        case 'ds':
            gameTypeIdentifier = 'com.rileytestut.delta.game.ds';
            break;
        case 'nes':
            gameTypeIdentifier = 'com.rileytestut.delta.game.nes';
            break;
        case 'snes':
            gameTypeIdentifier = 'com.rileytestut.delta.game.snes';
            break;
        case 'n64':
            gameTypeIdentifier = 'com.rileytestut.delta.game.n64';
            break;
        default:
            gameTypeIdentifier = 'unknown';
    }

    const representations = getRepresentations(consoleSelect, screenSizes);

    const jsonObject = {
        name: name,
        identifier: identifier,
        gameTypeIdentifier: gameTypeIdentifier,
        debug: debug,
        representations: representations
    };

    document.getElementById('jsonOutput').textContent = JSON.stringify(jsonObject, null, 2);
}
