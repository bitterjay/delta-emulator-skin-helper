// generateRepresentationHTML.js

export function generateRepresentationHTML(consoleSelect, device, representation, layout, screens) {
    let html = '';
    screens.forEach((screen, index) => {
        html += `
            <div class="interactions-container">
                <div class="interactions-inner interactions-right">
                    <div class="canvas-container" style="position:relative;">
                        <canvas id="${device}-${representation}-${layout}-${index}-canvas" class="draggable"></canvas>
                    </div>
                </div>
                <div class="interactions-inner interactions-right">
                    <div class="button" id="screen">
                        <div class="interactions-block interactions-label">
                            <legend>Screen</legend>
                        </div>
                        <div class="interactions-block">
                            <label>
                                <p>Input Frame X:</p>
                                <input type="number" value="${screen.inputFrame.x}" onchange="updateScreenSize('${consoleSelect}', '${device}', '${representation}', '${layout}', ${index}, 'inputFrame', 'x', this.value)">
                            </label>
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
                            <label>
                                <p>Input Frame Height:</p>
                                <input type="number" value="${screen.inputFrame.height}" onchange="updateScreenSize('${consoleSelect}', '${device}', '${representation}', '${layout}', ${index}, 'inputFrame', 'height', this.value)">
                            </label>
                        </div>
                        <div class="interactions-block">
                            <label>
                                <p>Output Frame X:</p>
                                <input type="number" value="${screen.outputFrame.x}" onchange="updateScreenSize('${consoleSelect}', '${device}', '${representation}', '${layout}', ${index}, 'outputFrame', 'x', this.value)">
                            </label>
                            <label>
                                <p>Output Frame Y:</p>
                                <input type="number" value="${screen.outputFrame.y}" onchange="updateScreenSize('${consoleSelect}', '${device}', '${representation}', '${layout}', ${index}, 'outputFrame', 'y', this.value)">
                            </label>
                        </div>
                        <div class="interactions-block">
                            <label>
                                <p>Output Frame Width:</p>
                                <input type="number" value="${screen.outputFrame.width}" onchange="updateScreenSize('${consoleSelect}', '${device}', '${representation}', '${layout}', ${index}, 'outputFrame', 'width', this.value)">
                            </label>
                            <label>
                                <p>Output Frame Height:</p>
                                <input type="number" value="${screen.outputFrame.height}" onchange="updateScreenSize('${consoleSelect}', '${device}', '${representation}', '${layout}', ${index}, 'outputFrame', 'height', this.value)">
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    return html;
}
