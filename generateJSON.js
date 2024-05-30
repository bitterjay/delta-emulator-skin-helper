import getRepresentations from './representations.js';
import screenSizes from './screenSizes.js';

export function generateJSON(buttons, assets) {

    const name = document.getElementById('name').value;
    const consoleSelect = document.getElementById('console').value;
    const skinname = document.getElementById('skinname').value;
    const debug = document.getElementById('debugCheckbox').checked;
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
        representations: {},
    };

    Object.keys(screenData).forEach(device => {
        jsonOutput.representations[device] = {}; // Ensure this is an object
        Object.keys(screenData[device]).forEach(representation => {
            jsonOutput.representations[device][representation] = {}; // Ensure this is an object
            Object.keys(screenData[device][representation]).forEach(layout => {
                jsonOutput.representations[device][representation][layout] = {}; // Ensure this is an object to hold multiple layout configurations
                screenData[device][representation][layout].forEach((screen, index) => {
                    const canvasId = `${device}-${representation}-${layout}-${index}-canvas`;
                    const canvasButtons = buttons[canvasId] || [];
                    let items = [];

                    const mappingSize = representations[device][representation][layout].mappingSize;

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

                    const layoutConfig = {
                        assets: assets[canvasId] || { resizable: "default.pdf" },
                        items: items,
                        screens: [
                            {
                                inputFrame: screen.inputFrame,
                                outputFrame: screen.outputFrame
                            }
                        ],
                        mappingSize: mappingSize,
                        extendedEdges: {
                            "top" : 7,
                            "bottom" : 7,
                            "left" : 7,
                            "right" : 7
                        }
                    };

                    jsonOutput.representations[device][representation][layout] = layoutConfig; // Assign the layoutConfig directly to the layout
                });
            });
        });
    });

    document.getElementById('jsonOutput').textContent = JSON.stringify(jsonOutput, null, 2);
}
