import screenSizes from './screenSizes.js';
import getRepresentations from './representations.js';
import { generateRepresentationHTML } from './generateRepresentationHTML.js';
import { generateJSON } from './generateJSON.js';

let isDragging = false;
let isResizing = false;
let dragStartX, dragStartY;
let resizeStartX, resizeStartY;
let initialWidth, initialHeight;
let aspectRatio;

window.updateRepresentationFields = function updateRepresentationFields() {
    const consoleSelect = document.getElementById('console').value;
    const tabsContainer = document.getElementById('tabsContainer');
    const representationTabs = document.getElementById('representationTabs');
    const representationFields = document.getElementById('representationFields');

    if (consoleSelect) {
        tabsContainer.style.display = 'block';

        // Clear existing tabs and fields
        representationTabs.innerHTML = '';
        representationFields.innerHTML = '';

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
                    representationContainer.innerHTML = generateRepresentationHTML(consoleSelect, device, representation, layout, screens);

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
        currentFieldset.style.display = 'block';
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
            canvas.onmousedown = (e) => startInteraction(e, canvas, screen);
            canvas.onmousemove = (e) => handleInteraction(e, canvas, screen);
            canvas.onmouseup = endInteraction;
            canvas.onmouseleave = endInteraction;
        });
    }
}

function drawCanvas(canvas, screen, mappingSize) {
    const context = canvas.getContext('2d');

    if (mappingSize) {
        // Adjust canvas size to fit the original size
        canvas.width = mappingSize.width;
        canvas.height = mappingSize.height;

        drawScreen(context, screen, mappingSize.width, mappingSize.height);
    } else {
        console.error('Mapping size is undefined');
    }
}

function drawScreen(context, screen, canvasWidth, canvasHeight) {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.fillStyle = 'rgba(0,0,255,.3)';
    context.fillRect(screen.outputFrame.x, screen.outputFrame.y, screen.outputFrame.width, screen.outputFrame.height);

    // Draw resize handle
    const handleSize = 10;
    context.fillStyle = 'black';
    context.fillRect(screen.outputFrame.x + screen.outputFrame.width - handleSize, screen.outputFrame.y + screen.outputFrame.height - handleSize, handleSize, handleSize);

    // Label the screen in the center
    context.fillStyle = 'black';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.font = '20px Arial';
    context.fillText('Screen', screen.outputFrame.x + screen.outputFrame.width / 2, screen.outputFrame.y + screen.outputFrame.height / 2);
}

function startInteraction(e, canvas, screen) {
    const handleSize = 10;
    const mouseX = e.offsetX;
    const mouseY = e.offsetY;

    if (
        mouseX >= screen.outputFrame.x + screen.outputFrame.width - handleSize &&
        mouseX <= screen.outputFrame.x + screen.outputFrame.width &&
        mouseY >= screen.outputFrame.y + screen.outputFrame.height - handleSize &&
        mouseY <= screen.outputFrame.y + screen.outputFrame.height
    ) {
        // Start resizing
        isResizing = true;
        resizeStartX = e.clientX;
        resizeStartY = e.clientY;
        initialWidth = screen.outputFrame.width;
        initialHeight = screen.outputFrame.height;
        aspectRatio = initialWidth / initialHeight;
    } else if (
        mouseX >= screen.outputFrame.x &&
        mouseX <= screen.outputFrame.x + screen.outputFrame.width &&
        mouseY >= screen.outputFrame.y &&
        mouseY <= screen.outputFrame.y + screen.outputFrame.height
    ) {
        // Start dragging
        isDragging = true;
        dragStartX = e.clientX - screen.outputFrame.x;
        dragStartY = e.clientY - screen.outputFrame.y;
    }
}

function handleInteraction(e, canvas, screen) {
    if (isDragging) {
        screen.outputFrame.x = Math.round(e.clientX - dragStartX);
        screen.outputFrame.y = Math.round(e.clientY - dragStartY);
        drawCanvas(canvas, screen, { width: canvas.width, height: canvas.height });

        updateScreenFields(screen);
    }

    if (isResizing) {
        const deltaX = e.clientX - resizeStartX;
        const newWidth = Math.round(initialWidth + deltaX);
        const newHeight = Math.round(newWidth / aspectRatio);

        screen.outputFrame.width = newWidth;
        screen.outputFrame.height = newHeight;

        drawCanvas(canvas, screen, { width: canvas.width, height: canvas.height });

        updateScreenFields(screen);
    }
}

function endInteraction() {
    isDragging = false;
    isResizing = false;
}

function updateScreenFields(screen) {
    document.querySelector(`#screen input[onchange*='x']`).value = screen.outputFrame.x;
    document.querySelector(`#screen input[onchange*='y']`).value = screen.outputFrame.y;
    document.querySelector(`#screen input[onchange*='width']`).value = screen.outputFrame.width;
    document.querySelector(`#screen input[onchange*='height']`).value = screen.outputFrame.height;
}

window.updateScreenSize = function updateScreenSize(consoleSelect, device, representation, layout, index, frameType, property, value) {
    screenSizes[consoleSelect][device][representation][layout][index][frameType][property] = parseInt(value, 10);
    const canvas = document.getElementById(`${device}-${representation}-${layout}-${index}-canvas`);
    const screen = screenSizes[consoleSelect][device][representation][layout][index];
    const representations = getRepresentations(consoleSelect, screenSizes);
    const mappingSize = representations[device][representation][layout]?.mappingSize;
    drawCanvas(canvas, screen, mappingSize); // Redraw the canvas
}

window.generateJSON = generateJSON;
