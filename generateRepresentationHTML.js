import screenSizes from './screenSizes.js';
import getRepresentations from './representations.js';

const buttonConfigs = {
    gbc: ['dpad', 'thumbstick', 'a', 'b', 'start', 'select', 'menu', 'quickSave', 'quickLoad', 'fastForward', 'toggleFastForward'],
    gba: ['dpad', 'thumbstick', 'a', 'b', 'start', 'select', 'l', 'r', 'menu', 'quickSave', 'quickLoad', 'fastForward', 'toggleFastForward'],
    nds: ['dpad', 'thumbstick', 'xy', 'a', 'b', 'x', 'y', 'start', 'select', 'l', 'r', 'menu', 'quickSave', 'quickLoad', 'fastForward', 'toggleFastForward'],
    nes: ['dpad', 'thumbstick', 'a', 'b', 'start', 'select', 'menu', 'quickSave', 'quickLoad', 'fastForward', 'toggleFastForward'],
    snes: ['dpad', 'thumbstick', 'a', 'b', 'x', 'y', 'start', 'select', 'menu', 'l', 'r', 'quickSave', 'quickLoad', 'fastForward', 'toggleFastForward'],
    n64: ['dpad', 'thumbstick', 'a', 'b', 'start', 'l', 'r', 'cUp', 'cDown', 'cLeft', 'cRight', 'z', 'menu', 'quickSave', 'quickLoad', 'fastForward', 'toggleFastForward']
};

export function generateRepresentationHTML(consoleSelect, device, representation, layout, screens, index) {
    const screen = screenSizes[document.getElementById('console').value][device][representation][layout][index];
    const representations = getRepresentations(document.getElementById('console').value, screenSizes);
    const mappingSize = representations[device][representation][layout]?.mappingSize;
    let html = '';
    screens.forEach((screen, index) => {
        const buttons = buttonConfigs[consoleSelect];
        html += `
            <div class="container layout">
                <h2>Layout</h2>
                <div class="canvas-container">
                    <canvas id="${device}-${representation}-${layout}-${index}-canvas" class="draggable"></canvas>
                    <p>Point Size: ${mappingSize.width}, ${mappingSize.height} </p>
                    <button type="button" class="exportPngButton">Export as PNG</button>
                </div>
             </div>
                    
            <div class="container elements">
                <h2>Elements</h2>
                <div class="element-item screen" id="screen-${device}-${representation}-${layout}-${index}">
                    <div class="interactions-label screen-button">
                        <h3>Screen</h3>
                    </div>
                    <div class="interactions-container">
                        <!-- <div class="interactions-block">
                            <label>
                                <p>Input Frame X:</p>
                                <input type="number" value="${screen.inputFrame.x}" onchange="updateScreenSize('${consoleSelect}', '${device}', '${representation}', '${layout}', ${index}, 'inputFrame', 'x', this.value)">
                            </label>
                        </div>
                        <div class="interactions-block">
                            <label>
                                <p>Input Frame Y:</p>
                                <input type="number" value="${screen.inputFrame.y}" onchange="updateScreenSize('${consoleSelect}', '${device}', '${representation}', '${layout}', ${index}, 'inputFrame', 'y', this.value)">
                            </label>
                        </div> 
                        <div class="interactions-block">
                            <label>
                                <p>Input Frame Width:</p>
                                <input type="number" value="${screen.inputFrame.width}" onchange="updateScreenSize('${consoleSelect}', '${device}', '${representation}', '${layout}', ${index}, 'inputFrame', 'width', this.value)">
                            </label>
                        </div>
                        <div class="interactions-block">
                            <label>
                                <p>Input Frame Height:</p>
                                <input type="number" value="${screen.inputFrame.height}" onchange="updateScreenSize('${consoleSelect}', '${device}', '${representation}', '${layout}', ${index}, 'inputFrame', 'height', this.value)">
                            </label>
                        </div> -->
                        <div class="interactions-block">
                                <p>X</p>
                                <input type="number" value="${screen.outputFrame.x}" onchange="updateScreenSize('${consoleSelect}', '${device}', '${representation}', '${layout}', ${index}, 'outputFrame', 'x', this.value)">
                        </div>
                        <div class="interactions-block">
                                <p>Y</p>
                                <input type="number" value="${screen.outputFrame.y}" onchange="updateScreenSize('${consoleSelect}', '${device}', '${representation}', '${layout}', ${index}, 'outputFrame', 'y', this.value)">
                        </div>
                        <div class="interactions-block">
                                <p>Width</p>
                                <input type="number" value="${screen.outputFrame.width}" onchange="updateScreenSize('${consoleSelect}', '${device}', '${representation}', '${layout}', ${index}, 'outputFrame', 'width', this.value)">
                        </div>
                        <div class="interactions-block">
                                <p>Height</p>
                                <input type="number" value="${screen.outputFrame.height}" onchange="updateScreenSize('${consoleSelect}', '${device}', '${representation}', '${layout}', ${index}, 'outputFrame', 'height', this.value)">
                        </div>
                    </div>
                </div>
                <div class="element-item assets">
                    <div class="interactions-label">
                        <h3>Assets</h3>
                    </div>
                    <div class="interactions-container">
                        <div class="interactions-block">
                            <p>Asset File (use pdf)</p>
                            <input type="file" accept=".pdf" onchange="updateAsset('${device}', '${representation}', '${layout}', ${index}, this)">
                        </div>
                        <div class="interactions-block">
                            <p>Asset Example (use png)</p>
                            <input type="file" accept=".png" onchange="updateAssetExample('${device}', '${representation}', '${layout}', ${index}, this)">
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
                            <div class="interactions-container">
                                <div class="interactions-block">
                                    <label for="${button}X-${device}-${representation}-${layout}-${index}">X</label>
                                    <input type="number" id="${button}X-${device}-${representation}-${layout}-${index}" name="${button}" value="0" onchange="updateButtonProperties(event, '${device}', '${representation}', '${layout}', ${index}, 'x', this.value)">
                                </div>
                                <div class="interactions-block">
                                    <label for="${button}Y-${device}-${representation}-${layout}-${index}">Y </label>
                                    <input type="number" id="${button}Y-${device}-${representation}-${layout}-${index}" name="${button}" value="0" onchange="updateButtonProperties(event, '${device}', '${representation}', '${layout}', ${index}, 'y', this.value)">
                                </div>
                                <div class="interactions-block">
                                    <label for="${button}Width-${device}-${representation}-${layout}-${index}">Width</label>
                                    <input type="number" id="${button}Width-${device}-${representation}-${layout}-${index}" name="${button}" value="50" onchange="updateButtonProperties(event, '${device}', '${representation}', '${layout}', ${index}, 'width', this.value)">
                                </div>
                                <div class="interactions-block">
                                    <label for="${button}Height-${device}-${representation}-${layout}-${index}">Height</label>
                                    <input type="number" id="${button}Height-${device}-${representation}-${layout}-${index}" name="${button}" value="50" onchange="updateButtonProperties(event, '${device}', '${representation}', '${layout}', ${index}, 'height', this.value)">
                                </div>
                                <div class="extended-edges-container">
                                    <div class="extended-edges-label">
                                        <h4>Extended Edges</h4>
                                    </div>
                                    <div class="extended-edges-inner">
                                    
                                        <div class="interactions-block">
                                            <label for="${button}ExtendedEdgesTop-${device}-${representation}-${layout}-${index}">Top</label>
                                            <input type="number" id="${button}ExtendedEdgesTop-${device}-${representation}-${layout}-${index}" name="${button}" value="0" onchange="updateButtonProperties(event, '${device}', '${representation}', '${layout}', ${index}, 'extendedEdgesTop', this.value)">
                                        </div>
                                        <div class="interactions-block">
                                            <label for="${button}ExtendedEdgesLeft-${device}-${representation}-${layout}-${index}">Left</label>
                                            <input type="number" id="${button}ExtendedEdgesLeft-${device}-${representation}-${layout}-${index}" name="${button}" value="0" onchange="updateButtonProperties(event, '${device}', '${representation}', '${layout}', ${index}, 'extendedEdgesLeft', this.value)">
                                        </div>
                                        <div class="interactions-block">
                                            <label for="${button}ExtendedEdgesRight-${device}-${representation}-${layout}-${index}">Right</label>
                                            <input type="number" id="${button}ExtendedEdgesRight-${device}-${representation}-${layout}-${index}" name="${button}" value="0" onchange="updateButtonProperties(event, '${device}', '${representation}', '${layout}', ${index}, 'extendedEdgesRight', this.value)">
                                        </div>
                                        <div class="interactions-block">
                                            <label for="${button}ExtendedEdgesBottom-${device}-${representation}-${layout}-${index}">Bottom</label>
                                            <input type="number" id="${button}ExtendedEdgesBottom-${device}-${representation}-${layout}-${index}" name="${button}" value="0" onchange="updateButtonProperties(event, '${device}', '${representation}', '${layout}', ${index}, 'extendedEdgesBottom', this.value)">
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                    `).join('')}
                </div>
            </div>
        `;
    });
    return html;
}
