import screenSizes from './screenSizes.js';
import getRepresentations from './representations.js';
import { generateRepresentationHTML } from './generateRepresentationHTML.js';
import { generateJSON } from './generateJSON.js';
import {
    startInteraction,
    handleInteraction,
    endInteraction
} from './interactions.js';

var resizeHandleImage = new Image();
resizeHandleImage.src = './img/resize-handle.png';

// Ensure the image is loaded before drawing it
resizeHandleImage.onload = function() {
    console.log('Resize handle image loaded');
};

window.updateRepresentationFields = function updateRepresentationFields() {
    const consoleSelect = document.getElementById('console').value;
    const tabsContainer = document.getElementById('tabsContainer');
    const representationTabs = document.getElementById('representationTabs');
    const representationFields = document.getElementById('representationFields');

    if (consoleSelect) {
        tabsContainer.style.display = 'flex';

        // Clear existing tabs and fields
        representationTabs.innerHTML = '';
        representationFields.innerHTML = '';

        document.getElementById('console').disabled = true;

        const devices = Object.keys(screenSizes[consoleSelect]);

        devices.forEach(device => {
            const representations = Object.keys(screenSizes[consoleSelect][device]);
            representations.forEach(representation => {
                const layouts = Object.keys(screenSizes[consoleSelect][device][representation]);
                layouts.forEach(layout => {
                    const screens = screenSizes[consoleSelect][device][representation][layout];

                    // Create tab button
                    const tabButton = document.createElement('button');
                    tabButton.className = 'tablinks';
                    tabButton.innerText = `${device} ${representation} ${layout}`;
                    tabButton.setAttribute('data-device', device);
                    tabButton.setAttribute('data-representation', representation);
                    tabButton.setAttribute('data-layout', layout);
                    tabButton.addEventListener('click', () => {
                        console.log(`Tab clicked: ${device} ${representation} ${layout}`);
                        openTab(device, representation, layout);
                    });
                    representationTabs.appendChild(tabButton);

                    // Create input fields
                    const representationContainer = document.createElement('div');
                    representationContainer.classList.add('representation-container');
                    representationContainer.id = `${device}-${representation}-${layout}`;
                    representationContainer.style.display = 'none';
                    representationContainer.innerHTML = generateRepresentationHTML(consoleSelect, device, representation, layout, screens,);

                    representationFields.appendChild(representationContainer);
                });
            });
        });

        // Open the first tab by default
        if (representationTabs.firstChild) {
            console.log(`Opening first tab: ${representationTabs.firstChild.innerText}`);
            representationTabs.firstChild.click();
        }
    } else {
        tabsContainer.style.display = 'none';
    }
}

window.openTab = function openTab(device, representation, layout) {
    console.log(`Opening tab: ${device} ${representation} ${layout}`);
    const representationContainers = document.querySelectorAll('.representation-container');
    const tablinks = document.querySelectorAll('.tablinks');

    // Hide all representation containers
    representationContainers.forEach(container => container.style.display = 'none');

    // Remove 'active' class from all tabs
    tablinks.forEach(tab => tab.classList.remove('active'));

    // Show the current representation container and add 'active' class to the clicked tab
    const currentFieldset = document.getElementById(`${device}-${representation}-${layout}`);
    if (currentFieldset) {
        currentFieldset.style.display = 'grid';
        tablinks.forEach(tab => {
            if (tab.getAttribute('data-device') === device && tab.getAttribute('data-representation') === representation && tab.getAttribute('data-layout') === layout) {
                tab.classList.add('active');
            }
        });

        currentFieldset.querySelectorAll('canvas').forEach((canvas, index) => {
            console.log(`Drawing canvas: ${canvas.id}`);
            const screen = screenSizes[document.getElementById('console').value][device][representation][layout][index];
            const representations = getRepresentations(document.getElementById('console').value, screenSizes);
            const mappingSize = representations[device][representation][layout]?.mappingSize;

            drawCanvas(canvas, screen, mappingSize);

            // Add interactivity
            canvas.onmousedown = (e) => startInteraction(e, canvas, screen, buttons);
            canvas.onmousemove = (e) => handleInteraction(e, canvas, screen, buttons, drawCanvas, updateButtonFields, updateScreenFields);
            canvas.onmouseup = endInteraction;
            canvas.onmouseleave = endInteraction;
        });
    }

    document.getElementById('generateJsonButton').disabled = false;
}

let buttons = {}; // Array to store buttons
let assets = {}; // Object to store asset filenames

let buttonProperties = {
    label: 'button',
    x: 0,
    y: 0,
    width: 50,
    height: 50,
    extendedEdgesTop: 7,
    extendedEdgesLeft: 7,
    extendedEdgesRight: 7,
    extendedEdgesBottom: 7
};

let backgroundImages = {}; // Cache for background images

function drawCanvas(canvas, screen, mappingSize) {
    const context = canvas.getContext('2d');

    if (mappingSize) {
        // Adjust canvas size to fit the original size
        canvas.width = mappingSize.width;
        canvas.height = mappingSize.height;

        // Draw background image if available
        const canvasId = canvas.id;
        if (backgroundImages[canvasId]) {
            context.drawImage(backgroundImages[canvasId], 0, 0, canvas.width, canvas.height);
        }

        drawScreen(context, screen, mappingSize.width, mappingSize.height);
        // Draw all buttons for this canvas
        const canvasButtons = buttons[canvas.id] || [];
        canvasButtons.forEach(button => drawButton(context, button));
    } else {
        console.error('Mapping size is undefined');
    }
}


function drawButton(context, button) {
    // Draw the button
    context.fillStyle = 'rgba(255,0,0,0.5)';
    context.fillRect(button.x, button.y, button.width, button.height);
    context.fillStyle = 'black';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.font = '12px Arial';
    context.fillText(button.label, button.x + button.width / 2, button.y + button.height / 2);
    
    // Calculate extended edges dimensions
    const extendedX = button.x - button.extendedEdgesLeft;
    const extendedY = button.y - button.extendedEdgesTop;
    const extendedWidth = button.width + button.extendedEdgesLeft + button.extendedEdgesRight;
    const extendedHeight = button.height + button.extendedEdgesTop + button.extendedEdgesBottom;

    // Draw extended edges
    context.fillStyle = 'rgba(0,0,255,.2)'
    context.lineWidth = 2;
    context.fillRect(extendedX, extendedY, extendedWidth, extendedHeight);

    const handleSize = 15;
    
    // Specify the coordinates and dimensions for the image
    var x = button.x + button.width - handleSize; // x-coordinate
    var y = button.y + button.height - handleSize; // y-coordinate
    var width = handleSize; // width of the image
    var height = handleSize; // height of the image

    // Draw resize handle
    context.drawImage(resizeHandleImage, x, y, width, height);
}

window.addButton = function addButton(device, representation, layout, index, buttonType) {
    const newButton = { ...buttonProperties, label: buttonType, device, representation, layout, index };
    const canvasId = `${device}-${representation}-${layout}-${index}-canvas`;

    if (!buttons[canvasId]) {
        buttons[canvasId] = [];
    }
    buttons[canvasId].push(newButton);

    const canvas = document.getElementById(canvasId);
    const screen = screenSizes[document.getElementById('console').value][device][representation][layout][index];
    const representations = getRepresentations(document.getElementById('console').value, screenSizes);
    const mappingSize = representations[device][representation][layout]?.mappingSize;

    drawCanvas(canvas, screen, mappingSize);

    // Toggle button states
    document.getElementById(`add${buttonType}Button-${device}-${representation}-${layout}-${index}`).disabled = true;
    document.getElementById(`remove${buttonType}Button-${device}-${representation}-${layout}-${index}`).disabled = false;
    document.getElementById(`button-${buttonType}-${device}-${representation}-${layout}-${index}`).classList.add('active');

    updateButtonFields(newButton);
    console.log(buttons);
}

window.removeButton = function removeButton(device, representation, layout, index, buttonType) {
    const canvasId = `${device}-${representation}-${layout}-${index}-canvas`;

    if (buttons[canvasId] && buttons[canvasId].length > 0) {
        buttons[canvasId] = buttons[canvasId].filter(button => button.label !== buttonType);
    }

    const canvas = document.getElementById(canvasId);
    const screen = screenSizes[document.getElementById('console').value][device][representation][layout][index];
    const representations = getRepresentations(document.getElementById('console').value, screenSizes);
    const mappingSize = representations[device][representation][layout]?.mappingSize;

    drawCanvas(canvas, screen, mappingSize);

    // Toggle button states
    document.getElementById(`add${buttonType}Button-${device}-${representation}-${layout}-${index}`).disabled = false;
    document.getElementById(`remove${buttonType}Button-${device}-${representation}-${layout}-${index}`).disabled = true;
    document.getElementById(`button-${buttonType}-${device}-${representation}-${layout}-${index}`).classList.remove('active');
}

window.updateButtonProperties = function updateButtonProperties(device, representation, layout, index, property, value) {
    const canvasId = `${device}-${representation}-${layout}-${index}-canvas`;

    // Update the property of the button
    const canvasButtons = buttons[canvasId] || [];
    canvasButtons.forEach(button => {
        if (button.device === device && button.representation === representation && button.layout === layout && button.index === index) {
            button[property] = property === 'label' ? value : parseInt(value, 10);
        }
    });

    const canvas = document.getElementById(canvasId);
    const screen = screenSizes[document.getElementById('console').value][device][representation][layout][index];
    const representations = getRepresentations(document.getElementById('console').value, screenSizes);
    const mappingSize = representations[device][representation][layout]?.mappingSize;

    drawCanvas(canvas, screen, mappingSize);
}

function drawScreen(context, screen, canvasWidth, canvasHeight) {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.fillStyle = 'rgba(0,0,255,.3)';
    context.fillRect(screen.outputFrame.x, screen.outputFrame.y, screen.outputFrame.width, screen.outputFrame.height);

    const handleSize = 15;
    
    // Specify the coordinates and dimensions for the image
    var x = screen.outputFrame.x + screen.outputFrame.width - handleSize; // x-coordinate
    var y = screen.outputFrame.y + screen.outputFrame.height - handleSize; // y-coordinate
    var width = handleSize; // width of the image
    var height = handleSize; // height of the image

    // Draw resize handle
    context.drawImage(resizeHandleImage, x, y, width, height);

    // Label the screen in the center
    context.fillStyle = 'black';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.font = '20px Arial';
    context.fillText('Screen', screen.outputFrame.x + screen.outputFrame.width / 2, screen.outputFrame.y + screen.outputFrame.height / 2);


}

function updateButtonFields(button) {
    if (button) {
        const labelField = document.querySelector(`#${button.label}Label-${button.device}-${button.representation}-${button.layout}-${button.index}`);
        const xField = document.querySelector(`#${button.label}X-${button.device}-${button.representation}-${button.layout}-${button.index}`);
        const yField = document.querySelector(`#${button.label}Y-${button.device}-${button.representation}-${button.layout}-${button.index}`);
        const widthField = document.querySelector(`#${button.label}Width-${button.device}-${button.representation}-${button.layout}-${button.index}`);
        const heightField = document.querySelector(`#${button.label}Height-${button.device}-${button.representation}-${button.layout}-${button.index}`);
        const extendedEdgesTopField = document.querySelector(`#${button.label}ExtendedEdgesTop-${button.device}-${button.representation}-${button.layout}-${button.index}`);
        const extendedEdgesLeftField = document.querySelector(`#${button.label}ExtendedEdgesLeft-${button.device}-${button.representation}-${button.layout}-${button.index}`);
        const extendedEdgesRightField = document.querySelector(`#${button.label}ExtendedEdgesRight-${button.device}-${button.representation}-${button.layout}-${button.index}`);
        const extendedEdgesBottomField = document.querySelector(`#${button.label}ExtendedEdgesBottom-${button.device}-${button.representation}-${button.layout}-${button.index}`);

        if (labelField) labelField.value = button.label;
        if (xField) xField.value = button.x;
        if (yField) yField.value = button.y;
        if (widthField) widthField.value = button.width;
        if (heightField) heightField.value = button.height;
        if (extendedEdgesTopField) extendedEdgesTopField.value = button.extendedEdgesTop;
        if (extendedEdgesLeftField) extendedEdgesLeftField.value = button.extendedEdgesLeft;
        if (extendedEdgesRightField) extendedEdgesRightField.value = button.extendedEdgesRight;
        if (extendedEdgesBottomField) extendedEdgesBottomField.value = button.extendedEdgesBottom;
    }
}

function updateScreenFields(screen, canvasId) {
    if (!canvasId) {
        console.error("Canvas ID is undefined");
        return;
    }
    const parts = canvasId.split('-');
    if (parts.length < 4) {
        console.error("Canvas ID does not have enough parts:", canvasId);
        return;
    }
    const device = parts[0];
    const representation = parts[1];
    const layout = parts[2];
    const index = parts[3];
    const xField = document.querySelector(`#screen-${device}-${representation}-${layout}-${index} input[onchange*='outputFrame'][onchange*='x']`);
    const yField = document.querySelector(`#screen-${device}-${representation}-${layout}-${index} input[onchange*='outputFrame'][onchange*='y']`);
    const widthField = document.querySelector(`#screen-${device}-${representation}-${layout}-${index} input[onchange*='outputFrame'][onchange*='width']`);
    const heightField = document.querySelector(`#screen-${device}-${representation}-${layout}-${index} input[onchange*='outputFrame'][onchange*='height']`);

    if (xField) xField.value = screen.outputFrame.x;
    if (yField) yField.value = screen.outputFrame.y;
    if (widthField) widthField.value = screen.outputFrame.width;
    if (heightField) heightField.value = screen.outputFrame.height;
}

window.updateScreenSize = function updateScreenSize(consoleSelect, device, representation, layout, index, frameType, property, value) {
    screenSizes[consoleSelect][device][representation][layout][index][frameType][property] = parseInt(value, 10);
    const canvas = document.getElementById(`${device}-${representation}-${layout}-${index}-canvas`);
    const screen = screenSizes[consoleSelect][device][representation][layout][index];
    const representations = getRepresentations(consoleSelect, screenSizes);
    const mappingSize = representations[device][representation][layout]?.mappingSize;
    drawCanvas(canvas, screen, mappingSize); // Redraw the canvas
}

window.updateAsset = function updateAsset(device, representation, layout, index, input) {
    const file = input.files[0];
    if (file) {
        const canvasId = `${device}-${representation}-${layout}-${index}-canvas`;
        if (!assets[canvasId]) {
            assets[canvasId] = {};
        }
        assets[canvasId].resizable = file.name;
    }
}

window.updateAssetExample = function updateAssetExample(device, representation, layout, index, input) {
    const file = input.files[0];
    if (file && file.type.startsWith('image/')) {
        const canvasId = `${device}-${representation}-${layout}-${index}-canvas`;
        const fileURL = URL.createObjectURL(file);

        const canvas = document.getElementById(canvasId);
        canvas.style.background = `linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)), url(${fileURL})`;
        canvas.style.backgroundSize = 'cover';
        canvas.style.backgroundPosition = 'center';
        canvas.style.backgroundRepeat = 'no-repeat';

        const screen = screenSizes[document.getElementById('console').value][device][representation][layout][index];
        const representations = getRepresentations(document.getElementById('console').value, screenSizes);
        const mappingSize = representations[device][representation][layout]?.mappingSize;

        drawCanvas(canvas, screen, mappingSize);
    }
}

document.getElementById('generateJsonButton').onclick = function() {
    document.getElementById('popup').style.display = "flex";
    const jsonOutput = generateJSON(buttons, assets);
    console.log(jsonOutput);
};

document.getElementById('close').onclick = function() {
    document.getElementById('popup').style.display = "none";
};

document.getElementById('save-button').addEventListener('click', function() {
    // Get the text from the textarea
    var textToSave = document.getElementById('jsonOutput').value;

    // Create a blob with the text content
    var blob = new Blob([textToSave], { type: 'application/json' });

    // Create a link element
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'info.json';

    // Programmatically click the link to trigger the download
    link.click();

    // Clean up the URL object
    URL.revokeObjectURL(link.href);
});
