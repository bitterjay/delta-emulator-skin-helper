import screenSizes from './screenSizes.js';
import getRepresentations from './representations.js';

const buttonConfigs = {
    gbc: ['menu', 'dpad', 'thumbstick', 'a', 'b', 'start', 'select', 'quickSave', 'quickLoad', 'fastForward', 'toggleFastForward'],
    gba: ['menu', 'dpad', 'thumbstick', 'a', 'b', 'start', 'select', 'l', 'r', 'menu', 'quickSave', 'quickLoad', 'fastForward', 'toggleFastForward'],
    nds: ['menu', 'dpad', 'thumbstick', 'xy', 'a', 'b', 'x', 'y', 'start', 'select', 'l', 'r', 'menu', 'quickSave', 'quickLoad', 'fastForward', 'toggleFastForward'],
    nes: ['menu', 'dpad', 'thumbstick', 'a', 'b', 'start', 'select', 'menu', 'quickSave', 'quickLoad', 'fastForward', 'toggleFastForward'],
    snes: ['menu', 'dpad', 'thumbstick', 'a', 'b', 'x', 'y', 'start', 'select', 'menu', 'l', 'r', 'quickSave', 'quickLoad', 'fastForward', 'toggleFastForward'],
    n64: ['menu', 'dpad', 'thumbstick', 'a', 'b', 'start', 'l', 'r', 'cUp', 'cDown', 'cLeft', 'cRight', 'z', 'menu', 'quickSave', 'quickLoad', 'fastForward', 'toggleFastForward']
};

export function generateRepresentationHTML(consoleSelect, device, representation, layout, screens, index) {
    const screen = screenSizes[document.getElementById('console').value][device][representation][layout][index];
    const representations = getRepresentations(document.getElementById('console').value, screenSizes);
    const mappingSize = representations[device][representation][layout]?.mappingSize;
    let html = '';
    screens.forEach((screen, index) => {
        const buttons = buttonConfigs[consoleSelect];
        html += `
            
                    
            <div class="container elements">
                <div class="element-item" style="grid-column: span 3; border:none;" </div>
                    <h2>Elements</h2>
                </div>
                <div class="element-item assets">
                    <div class="interactions-label">
                        <h3>Assets</h3>
                    </div>
                    <div class="interactions-container">
                        <div class="assets-block">
                            <label id="assetFileLabel-${device}-${representation}-${layout}-${index}" for="assetFileBtn-${device}-${representation}-${layout}-${index}" class="customButton noInput">Layout Asset</label>
                            <input id="assetFileBtn-${device}-${representation}-${layout}-${index}" type="file" accept=".pdf" onchange="updateAsset('${device}', '${representation}', '${layout}', ${index}, this)">
                            <span id="fileName-${device}-${representation}-${layout}-${index}">No file chosen</span>
                            <p style="font-style:italic">PDF Asset will be included in Deltaskin</p>
                        </div>
                        <div class="assets-block">
                            <label id="assetExampleLabel-${device}-${representation}-${layout}-${index}" for="assetExampleBtn-${device}-${representation}-${layout}-${index}" class="customButton noInput">Layout Background</label>
                            <input id="assetExampleBtn-${device}-${representation}-${layout}-${index}" type="file" accept=".png, .jpg, .jpeg" onchange="updateAssetExample('${device}', '${representation}', '${layout}', ${index}, this)">
                            <p style="font-style:italic">Layout Design (png, jpg, jpeg)</p>
                        </div>
                    </div>
                </div>
                <div class="element-item screen" id="screen-${device}-${representation}-${layout}-${index}">
                    <div class="interactions-label screen-button">
                        <h3>Screen</h3>
                    </div>
                    <div class="interactions-container">
                        <div class="interactions-block">
                                <label>X</label>
                                <input type="number" value="${screen.outputFrame.x}" onchange="updateScreenSize('${consoleSelect}', '${device}', '${representation}', '${layout}', ${index}, 'outputFrame', 'x', this.value)">
                        </div>
                        <div class="interactions-block">
                                <label>Y</label>
                                <input type="number" value="${screen.outputFrame.y}" onchange="updateScreenSize('${consoleSelect}', '${device}', '${representation}', '${layout}', ${index}, 'outputFrame', 'y', this.value)">
                        </div>
                        <div class="screen-container">
                            <div class="screen-inner">
                                <input type="number" value="${screen.outputFrame.width}" onchange="updateScreenSize('${consoleSelect}', '${device}', '${representation}', '${layout}', ${index}, 'outputFrame', 'width', this.value)">
                                <span class="by-char">&nbsp;x&nbsp</span>
                                <input type="number" value="${screen.outputFrame.height}" onchange="updateScreenSize('${consoleSelect}', '${device}', '${representation}', '${layout}', ${index}, 'outputFrame', 'height', this.value)">
                            </div>
                        </div>
                    </div>
                </div>
                
                ${buttons.map(button => `
                    <div class="element-item individual-buttons" id="button-${button}-${device}-${representation}-${layout}-${index}">
                        <div class="interactions-label">
                            <h3 for="${button}Label-${device}-${representation}-${layout}-${index}">${button}</h3>
                            <div class="addremove">
                                <button class="button-interaction" id="add${button}Button-${device}-${representation}-${layout}-${index}" onclick="addButton('${device}', '${representation}', '${layout}', ${index}, '${button}')">+</button>
                                <button class="button-interaction" id="remove${button}Button-${device}-${representation}-${layout}-${index}" onclick="removeButton('${device}', '${representation}', '${layout}', ${index}, '${button}')" disabled>-</button>
                            </div>
                        </div>
                        <div class="interactions-container not-active">
                            <div class="interactions-block">
                                <label for="${button}X-${device}-${representation}-${layout}-${index}">X</label>
                                <input type="number" id="${button}X-${device}-${representation}-${layout}-${index}" name="${button}" value="0" onchange="updateButtonProperties(event, '${device}', '${representation}', '${layout}', ${index}, 'x', this.value)">
                            </div>
                            <div class="interactions-block">
                                <label for="${button}Y-${device}-${representation}-${layout}-${index}">Y </label>
                                <input type="number" id="${button}Y-${device}-${representation}-${layout}-${index}" name="${button}" value="0" onchange="updateButtonProperties(event, '${device}', '${representation}', '${layout}', ${index}, 'y', this.value)">
                            </div>
                            <div class="square-test-container">
                                <div class="upper-left square-grid-item-container">
                                </div>
                                <div class="upper-middle square-grid-item-container">
                                        <input type="number" id="${button}ExtendedEdgesTop-${device}-${representation}-${layout}-${index}" name="${button}" value="0" onchange="updateButtonProperties(event, '${device}', '${representation}', '${layout}', ${index}, 'extendedEdgesTop', this.value)">
                                </div>
                                <div class="upper-right square-grid-item-container">
                                </div>

                                <div class="middle-left square-grid-item-container">
                                    <input type="number" id="${button}ExtendedEdgesLeft-${device}-${representation}-${layout}-${index}" name="${button}" value="0" onchange="updateButtonProperties(event, '${device}', '${representation}', '${layout}', ${index}, 'extendedEdgesLeft', this.value)">
                                </div>
                                <div class="middle-middle square-grid-item-container">
                                    <input type="number" id="${button}Width-${device}-${representation}-${layout}-${index}" name="${button}" value="50" onchange="updateButtonProperties(event, '${device}', '${representation}', '${layout}', ${index}, 'width', this.value)">
                                    <span class="by-char">&nbsp;x&nbsp</span>
                                    <input type="number" id="${button}Height-${device}-${representation}-${layout}-${index}" name="${button}" value="50" onchange="updateButtonProperties(event, '${device}', '${representation}', '${layout}', ${index}, 'height', this.value)">
                                </div>
                                <div class="middle-right square-grid-item-container">
                                    <input type="number" id="${button}ExtendedEdgesRight-${device}-${representation}-${layout}-${index}" name="${button}" value="0" onchange="updateButtonProperties(event, '${device}', '${representation}', '${layout}', ${index}, 'extendedEdgesRight', this.value)">
                                </div>

                                <div class="lower-left square-grid-item-container">
                                </div>
                                <div class="lower-middle square-grid-item-container">
                                    <input type="number" id="${button}ExtendedEdgesBottom-${device}-${representation}-${layout}-${index}" name="${button}" value="0" onchange="updateButtonProperties(event, '${device}', '${representation}', '${layout}', ${index}, 'extendedEdgesBottom', this.value)">
                                </div>
                                <div class="lower-right square-grid-item-container">
                                </div>

                            </div>
                        </div>
                    </div>
                    `).join('')}
                </div>
            </div>
            <div class="container layout">
                <h2>Layout</h2>
                <div class="canvas-container">
                    <canvas id="${device}-${representation}-${layout}-${index}-canvas" class="draggable"></canvas>
                    <p>Point Size: ${mappingSize.width}, ${mappingSize.height} </p>
                    <button type="button" class="exportPngButton">Export as PNG</button>
                </div>
             </div>
        `;
    });
    return html;
}
