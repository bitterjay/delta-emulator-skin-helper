import getRepresentations from './representations.js';
import screenSizes from './screenSizes.js';

export function generateJSON(buttons, assets) {

    const name = document.getElementById('name').value;
    const consoleSelect = document.getElementById('console').value;
    const skinname = document.getElementById('skinname').value;
    const debug = document.getElementById('debug').checked;
    const screenData = screenSizes[consoleSelect];

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

    if (!screenData) {
        console.error(`No screen data found for console: ${consoleSelect}`);
        return;
    }

    const representations = getRepresentations(consoleSelect, screenSizes);

    let jsonOutput = {
        name,
        identifier,
        gameTypeIdentifier,
        debug,
        representations: {}
    };

    Object.keys(screenData).forEach(device => {
        jsonOutput.representations[device] = {};
        Object.keys(screenData[device]).forEach(representation => {
            jsonOutput.representations[device][representation] = {};
            Object.keys(screenData[device][representation]).forEach(layout => {
                jsonOutput.representations[device][representation][layout] = screenData[device][representation][layout].map((screen, index) => {
                    const canvasId = `${device}-${representation}-${layout}-${index}-canvas`;
                    console.log(buttons);
                    const canvasButtons = buttons[canvasId] || [];
                    let items = [];

                    if (canvasButtons.length === 0) {
                        console.warn(`No buttons found for canvas: ${canvasId}`);
                    }

                    canvasButtons.forEach(button => {
                        const item = {
                            inputs: button.label,
                            frame: {
                                x: button.x,
                                y: button.y,
                                width: button.width,
                                height: button.height
                            },
                            extendedEdges: {
                                top: button.extendedEdgesTop,
                                bottom: button.extendedEdgesBottom,
                                left: button.extendedEdgesLeft,
                                right: button.extendedEdgesRight
                            }
                        };

                        if (button.label === 'dpad') {
                            item.inputs = {
                                up: 'up',
                                down: 'down',
                                left: 'left',
                                right: 'right'
                            };
                        } else if (button.label === 'thumbstick') {
                            item.thumbstick = {
                                name: 'portrait_thumbstick.pdf',
                                width: 85,
                                height: 85
                            };
                            item.inputs = {
                                up: 'analogStickUp',
                                down: 'analogStickDown',
                                left: 'analogStickLeft',
                                right: 'analogStickRight'
                            };
                        } else {
                            item.inputs = [button.label];
                        }

                        items.push(item);
                    });

                    return {
                        assets: assets[canvasId] || { resizable: "default.pdf" },
                        screen: {
                            inputFrame: screen.inputFrame,
                            outputFrame: screen.outputFrame
                        },
                        items: items
                    };
                });
            });
        });
    });

    document.getElementById('jsonOutput').textContent = JSON.stringify(jsonOutput, null, 2);
}
