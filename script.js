//version 1.0

const nameInput = document.getElementById('nameInput');
const consoleSelect = document.getElementById('consoleSelect');
const debugCheckbox = document.getElementById('debugCheckbox');
const generateBtn = document.getElementById('generateBtn');
const saveBtn = document.getElementById('saveBtn');
const jsonOutput = document.getElementById('jsonOutput');

const mappingSizes = {
  nes: {
    standard: { width: 320, height: 240 },
    edgeToEdge: { width: 320, height: 274 }
  },
  snes: {
    standard: { width: 320, height: 240 },
    edgeToEdge: { width: 320, height: 274 }
  },
  n64: {
    standard: { width: 320, height: 328 },
    edgeToEdge: { width: 320, height: 362 }
  },
  gbc: {
    standard: { width: 320, height: 240 },
    edgeToEdge: { width: 320, height: 274 }
  },
  gba: {
    standard: { width: 320, height: 240 },
    edgeToEdge: { width: 320, height: 274 }
  },
  nds: {
    standard: { width: 375, height: 667 },
    edgeToEdge: { width: 414, height: 896 }
  }
};

function getMappingSize(gameConsole, representation) {
  return (mappingSizes[gameConsole] && mappingSizes[gameConsole][representation]) || { width: 320, height: 240 }; // default size
}

// Add event listeners for name and console inputs
nameInput.addEventListener('input', updateButton);
consoleSelect.addEventListener('change', updateButton);
debugCheckbox.addEventListener('change', updateButton);

consoleSelect.addEventListener('change', updateButtonDivs);

let buttonsData = [];

function updateButton() {
  const name = nameInput.value.trim();
  const gameConsole = consoleSelect.value;
  const debug = debugCheckbox.checked;
  generateBtn.disabled = !(name && gameConsole);
}

function handleGenerateJson() {
  const name = nameInput.value.trim();
  const gameConsole = consoleSelect.value;
  const debug = debugCheckbox.checked;

  const identifier = `com.${name}.${gameConsole}.standard`;
  const gameTypeIdentifier = getGameTypeIdentifier(gameConsole);

  // iPhone inputs
  const iphoneStandardPortraitInput = document.getElementById('iphone-standard-portrait-asset');
  const iphoneEdgeToEdgePortraitInput = document.getElementById('iphone-edgetoedge-portrait-asset');

  const standardMappingSize = getMappingSize(gameConsole, 'standard');
  const edgeToEdgeMappingSize = getMappingSize(gameConsole, 'edgeToEdge');

  const deltaSkinJson = {
    name,
    identifier,
    gameTypeIdentifier,
    debug,
    representations: {
      iphone: {
        standard: {
          portrait: {
            assets: {
              resizable: iphoneStandardPortraitInput.value
            },
            items: buttonsData.filter(button => button.representation === 'iphone-standard-portrait-canvas').map(button => button.data),
            mappingSize: standardMappingSize,
            extendedEdges: {
              top: 7,
              bottom: 7,
              left: 7,
              right: 7
            }
          }
        },
        edgeToEdge: {
          portrait: {
            assets: {
              resizable: iphoneEdgeToEdgePortraitInput.value
            },
            items: buttonsData.filter(button => button.representation === 'iphone-edgetoedge-portrait-canvas').map(button => button.data),
            mappingSize: edgeToEdgeMappingSize,
            extendedEdges: {
              top: 7,
              bottom: 7,
              left: 7,
              right: 7
            }
          }
        }
      }
    }
  };

  const jsonString = JSON.stringify(deltaSkinJson, null, 2);
  jsonOutput.textContent = jsonString;

  // Enable the save button
  saveBtn.disabled = false;
}



function getGameTypeIdentifier(gameConsole) {
  const gameTypeIdentifiers = {
    nes: 'com.rileytestut.delta.game.nes',
    snes: 'com.rileytestut.delta.game.snes',
    n64: 'com.rileytestut.delta.game.n64',
    gbc: 'com.rileytestut.delta.game.gbc',
    gba: 'com.rileytestut.delta.game.gba',
    nds: 'com.rileytestut.delta.game.ds'
  };

  return gameTypeIdentifiers[gameConsole];
}

function updateButtonDivs() {
  const gameConsole = consoleSelect.value;
  const buttons = getButtonsForConsole(gameConsole);

  const iphoneStandardPortraitFields = document.getElementById('iphone-standard-portrait-button-fields');
  const iphoneEdgeToEdgePortraitFields = document.getElementById('iphone-edgetoedge-portrait-button-fields');

  iphoneStandardPortraitFields.innerHTML = '';
  iphoneEdgeToEdgePortraitFields.innerHTML = '';

  buttons.forEach(button => {
    const buttonDiv = document.createElement('div');
    buttonDiv.className = 'button-item';

    const buttonContentDiv = document.createElement('div');
    buttonContentDiv.className = 'button-content';

    const buttonNameDiv = document.createElement('div');
    buttonNameDiv.className = 'button-name';
    buttonNameDiv.innerText = button;

    const addButton = document.createElement('button');
    addButton.classList.add('button-add');
    addButton.innerHTML = '+';
    addButton.addEventListener('click', () => handleAddButton(button, buttonDiv, addButton, removeButton));

    const removeButton = document.createElement('button');
    removeButton.classList.add('button-remove');
    removeButton.innerHTML = '-';
    removeButton.disabled = true;
    removeButton.addEventListener('click', () => handleRemoveButton(button, buttonDiv, addButton, removeButton));

    buttonContentDiv.appendChild(buttonNameDiv);
    buttonContentDiv.appendChild(addButton);
    buttonContentDiv.appendChild(removeButton);
    buttonDiv.appendChild(buttonContentDiv);

    iphoneStandardPortraitFields.appendChild(buttonDiv);

    const clonedButtonDiv = buttonDiv.cloneNode(true);
    const clonedAddButton = clonedButtonDiv.querySelector('button');
    const clonedRemoveButton = clonedButtonDiv.querySelector('button:last-child');

    clonedAddButton.addEventListener('click', () => handleAddButton(button, clonedButtonDiv, clonedAddButton, clonedRemoveButton));
    clonedRemoveButton.addEventListener('click', () => handleRemoveButton(button, clonedButtonDiv, clonedAddButton, clonedRemoveButton));
    iphoneEdgeToEdgePortraitFields.appendChild(clonedButtonDiv);
  });

  // Call to update canvas size
  updateCanvasSize(gameConsole);
}




function getButtonsForConsole(gameConsole) {
  const buttonConfigs = {
    gbc: ['dpad', 'thumbstick', 'a', 'b', 'start', 'select', 'menu', 'quickSave', 'quickLoad', 'fastForward', 'toggleFastForward'],
    gba: ['dpad', 'thumbstick', 'a', 'b', 'start', 'select', 'l', 'r', 'menu', 'quickSave', 'quickLoad', 'fastForward', 'toggleFastForward'],
    nds: ['dpad', 'thumbstick', 'xy', 'a', 'b', 'x', 'y', 'start', 'select', 'l', 'r', 'menu', 'quickSave', 'quickLoad', 'fastForward', 'toggleFastForward'],
    nes: ['dpad', 'thumbstick', 'a', 'b', 'start', 'select', 'menu', 'quickSave', 'quickLoad', 'fastForward', 'toggleFastForward'],
    snes: ['dpad', 'thumbstick', 'a', 'b', 'x', 'y', 'start', 'select', 'menu', 'l', 'r', 'quickSave', 'quickLoad', 'fastForward', 'toggleFastForward'],
    n64: ['dpad', 'thumbstick', 'a', 'b', 'start', 'l', 'r', 'cUp', 'cDown', 'cLeft', 'cRight', 'z', 'menu', 'quickSave', 'quickLoad', 'fastForward', 'toggleFastForward']
  };
  
  return buttonConfigs[gameConsole] || [];
}

function handleAddButton(button, buttonDiv, addButton, removeButton) {
  const canvasId = buttonDiv.parentElement.id.replace('button-fields', 'canvas');
  //console.log(`Adding button to canvas: ${canvasId}`); // Debugging statement

  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    console.error(`Canvas with ID ${canvasId} not found.`);
    return;
  }

  const context = canvas.getContext('2d');

  let buttonData = {
    inputs: [button],
    frame: { x: 0, y: 0, width: 50, height: 50 },
    extendedEdges: { top: 7, bottom: 7, left: 7, right: 7 }
  };

  if (button === 'dpad') {
    buttonData = {
      inputs: {
        up: 'up',
        down: 'down',
        left: 'left',
        right: 'right'
      },
      frame: { x: 0, y: 0, width: 50, height: 50 },
      extendedEdges: { top: 7, bottom: 7, left: 7, right: 7 }
    };
  }

  if (button === 'xy') {
    buttonData = {
      inputs: {
        x: 'touchScreenX',
        y: 'touchScreenY'
      },
      frame: { x: 0, y: 0, width: 50, height: 50 },
      extendedEdges: { top: 0, bottom: 0, left: 0, right: 0 }
    };
  }

  if (button === 'thumbstick') {
    buttonData = {
        thumbstick: {
            name: "portrait_thumbstick.pdf",
            width: 85,
            height: 85
        },
        inputs: {
            up: "analogStickUp",
            down: "analogStickDown",
            left: "analogStickLeft",
            right: "analogStickRight"
        },
        frame: { x: 0, y: 0, width: 50, height: 49 },
        extendedEdges: { top: 7, bottom: 7, left: 7, right: 7 }
    };
  }

  const buttonObject = {
    representation: canvasId,
    data: buttonData
  };

  buttonsData.push(buttonObject);
  //console.log('Button Added:', JSON.stringify(buttonsData, null, 2));
  console.log(buttonsData);

  // Draw the button on the canvas
  drawAllButtonsOnCanvas(canvasId);

  // Create fields for button manipulation
  createButtonFields(button, buttonObject, buttonDiv, canvas, context);

  // Update button appearance and functionality
  buttonDiv.classList.add('active');
  addButton.disabled = true;
  addButton.innerHTML = '+';
  removeButton.disabled = false;
  addButton.style.display = 'none'; // Hide the add button
  removeButton.style.display = 'block';
}

function handleRemoveButton(button, buttonDiv, addButton, removeButton) {
  const canvasId = buttonDiv.parentElement.id.replace('button-fields', 'canvas');
  const canvas = document.getElementById(canvasId);

  // Find the button object in buttonsData
  const buttonObject = buttonsData.find(b => {
    if (button === 'dpad') {
      return b.representation === canvasId && b.data.inputs.up === 'up';
    } else if (button === 'xy') {
      return b.representation === canvasId && b.data.inputs.x === 'touchScreenX';
    } else if (button === 'thumbstick') {
      return b.representation === canvasId && b.data.inputs.up === 'analogStickUp';
    } else {
      return b.representation === canvasId && b.data.inputs[0] === button;
    }
    });

  if (buttonObject) {
    // Remove button data from the list
    buttonsData = buttonsData.filter(b => b !== buttonObject);

    // Clear and redraw all buttons on the canvas
    drawAllButtonsOnCanvas(canvasId);

    // Remove button fields
    const buttonFields = buttonDiv.querySelector('.button-fields');
    if (buttonFields) {
      buttonFields.remove();
    }

    // Update button appearance and functionality
    buttonDiv.classList.remove('active');
    addButton.disabled = false;
    addButton.innerHTML = '+';
    removeButton.disabled = true;
    removeButton.style.display = 'none';
    addButton.style.display = 'block';
  }
}

function drawAllButtonsOnCanvas(canvasId) {
  const canvas = document.getElementById(canvasId);
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

  // Ensure this function does not affect the PDF canvas
  drawButtons(context, canvasId);
}

function drawButtons(context, canvasId) {
  buttonsData.filter(button => button.representation === canvasId).forEach(button => {
    drawButtonOnCanvas(context, button.data);
  });
}

function drawButtonOnCanvas(context, buttonData) {
  // Draw the main button square
  context.strokeStyle = 'rgba(255, 0, 0, 0.5)';
  context.lineWidth = 2;
  context.strokeRect(buttonData.frame.x, buttonData.frame.y, buttonData.frame.width, buttonData.frame.height);

  context.fillStyle = 'rgba(255, 0, 0, 0.3)';
  context.fillRect(buttonData.frame.x, buttonData.frame.y, buttonData.frame.width, buttonData.frame.height);

  // Center the label inside the square
  context.font = '12px Arial';
  context.fillStyle = 'black';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  const centerX = buttonData.frame.x + buttonData.frame.width / 2;
  const centerY = buttonData.frame.y + buttonData.frame.height / 2;
   // Determine the label
  let label;
  if (buttonData.inputs.up == "up") {
    label = 'dpad';
  } else if (buttonData.inputs.x == "touchScreenX") {
    label = 'xy';
  } else if (buttonData.inputs.up == "analogStickUp") {
    label = 'thumbstick';
  } else if (buttonData.inputs.length > 0) {
    label = buttonData.inputs[0];
  } else {
    label = 'unknown';
  }
  context.fillText(label, centerX, centerY);

  // Draw the extended edges as a continuous rectangle
  context.strokeStyle = 'rgba(0, 0, 255, 0.5)';
  context.lineWidth = 1;
  const extendedX = buttonData.frame.x - buttonData.extendedEdges.left;
  const extendedY = buttonData.frame.y - buttonData.extendedEdges.top;
  const extendedWidth = buttonData.frame.width + buttonData.extendedEdges.left + buttonData.extendedEdges.right;
  const extendedHeight = buttonData.frame.height + buttonData.extendedEdges.top + buttonData.extendedEdges.bottom;

  context.strokeRect(extendedX, extendedY, extendedWidth, extendedHeight);
  context.fillStyle = 'rgba(0, 0, 255, 0.2)';
  context.fillRect(extendedX, extendedY, extendedWidth, extendedHeight);
}

function createButtonFields(button, buttonObject, buttonDiv, canvas, context) {
  const fieldsDiv = document.createElement('div');
  fieldsDiv.className = 'button-fields';

  const fieldsHTML = `
     <div class="field-wrapper">
      <div class="frame field-inner-wrapper">
            <label>Frame</label>
            <div class="pos-size">
                <div class="pos">X <input type="number" value="${buttonObject.data.frame.x}" data-key="x" data-button="${buttonObject.data.inputs[0]}" step="1"></div>
                <div class="pos">Y <input type="number" value="${buttonObject.data.frame.y}" data-key="y" data-button="${buttonObject.data.inputs[0]}" step="1"></div>
                <div class="size">W <input type="number" value="${buttonObject.data.frame.width}" data-key="width" data-button="${buttonObject.data.inputs[0]}" step="1"></div>
                <div class="size">H <input type="number" value="${buttonObject.data.frame.height}" data-key="height" data-button="${buttonObject.data.inputs[0]}" step="1"></div>
            </div>
        </div>
        <div class="edges field-inner-wrapper">
            <label>Edges</label>
            <div class="extended-edges">
                <div class="extended-edges__top"><input type="number" value="${buttonObject.data.extendedEdges.top}" data-key="top" data-button="${buttonObject.data.inputs[0]}" step="1"></div>
                <div class="extended-edges__left"><input type="number" value="${buttonObject.data.extendedEdges.left}" data-key="left" data-button="${buttonObject.data.inputs[0]}" step="1"> </div>
                <div class="extended-edges__right"><input type="number" value="${buttonObject.data.extendedEdges.right}" data-key="right" data-button="${buttonObject.data.inputs[0]}" step="1"></div>
                <div class="extended-edges__bottom"><input type="number" value="${buttonObject.data.extendedEdges.bottom}" data-key="bottom" data-button="${buttonObject.data.inputs[0]}" step="1"></div>
            </div>
        </div>
    </div>
    `;

  fieldsDiv.innerHTML = fieldsHTML;
  buttonDiv.appendChild(fieldsDiv);

  const inputs = fieldsDiv.querySelectorAll('input');
  inputs.forEach(input => {
    input.addEventListener('input', (event) => updateButtonData(event, buttonObject, context, canvas));
  });

  // const perfectSquareCheckbox = fieldsDiv.querySelector('.perfect-square');
  // if (perfectSquareCheckbox) {
  //   perfectSquareCheckbox.checked = buttonObject.data.frame.width === buttonObject.data.frame.height;
  //   perfectSquareCheckbox.addEventListener('change', () => handlePerfectSquareChange(buttonObject, context, canvas));
  // }

  addCanvasDragFunctionality(canvas, context, buttonObject);
}

function updateButtonData(event, buttonObject, context, canvas) {
  const key = event.target.dataset.key;
  const value = parseInt(event.target.value, 10);
  //const perfectSquareCheckbox = document.querySelector(`.perfect-square[data-button="${buttonObject.data.inputs[0]}"]`);

  if (!isNaN(value) && Number.isInteger(value)) {
    if (buttonObject.data.inputs.up) { // If it's a dpad
      if (['top', 'bottom', 'left', 'right'].includes(key)) {
        buttonObject.data.extendedEdges[key] = value;
      } else {
        buttonObject.data.frame[key] = value;
        // if (perfectSquareCheckbox && perfectSquareCheckbox.checked && (key === 'width' || key === 'height')) {
        //   if (key === 'width') {
        //     buttonObject.data.frame.height = value;
        //   } else {
        //     buttonObject.data.frame.width = value;
        //   }
        // }
      }
    } else { // For other buttons
      if (['top', 'bottom', 'left', 'right'].includes(key)) {
        buttonObject.data.extendedEdges[key] = value;
      } else {
        buttonObject.data.frame[key] = value;
        // if (perfectSquareCheckbox && perfectSquareCheckbox.checked && (key === 'width' || key === 'height')) {
        //   if (key === 'width') {
        //     buttonObject.data.frame.height = value;
        //   } else {
        //     buttonObject.data.frame.width = value;
        //   }
        // }
      }
    }
  } else {
    event.target.value = key in buttonObject.data.frame ? buttonObject.data.frame[key] : buttonObject.data.extendedEdges[key]; // Revert to the previous valid value
  }

  drawAllButtonsOnCanvas(canvas.id);
  updateInputFields(buttonObject);

  // Log the JSON associated with the updated button
  //console.log(JSON.stringify(buttonObject.data, null, 2));
}

function addCanvasDragFunctionality(canvas, context, buttonObject) {
  let isDragging = false;
  let isResizing = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;

  canvas.addEventListener('mousedown', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (x >= buttonObject.data.frame.x && x <= buttonObject.data.frame.x + buttonObject.data.frame.width &&
        y >= buttonObject.data.frame.y && y <= buttonObject.data.frame.y + buttonObject.data.frame.height) {

      if (x >= buttonObject.data.frame.x + buttonObject.data.frame.width - 10 && y >= buttonObject.data.frame.y + buttonObject.data.frame.height - 10) {
        isResizing = true;
      } else {
        isDragging = true;
        dragOffsetX = x - buttonObject.data.frame.x;
        dragOffsetY = y - buttonObject.data.frame.y;
      }
    }
  });

  canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    // const perfectSquareCheckbox = document.querySelector(`.perfect-square[data-button="${buttonObject.data.inputs[0]}"]`);
    if (isDragging) {
      let newX = event.clientX - rect.left - dragOffsetX;
      let newY = event.clientY - rect.top - dragOffsetY;

      // Boundary checks for dragging
      newX = Math.max(0, Math.min(newX, canvas.width - buttonObject.data.frame.width));
      newY = Math.max(0, Math.min(newY, canvas.height - buttonObject.data.frame.height));

      buttonObject.data.frame.x = newX;
      buttonObject.data.frame.y = newY;

      drawAllButtonsOnCanvas(canvas.id);
      updateInputFields(buttonObject);
      // Log the JSON associated with the updated button
      //console.log(JSON.stringify(buttonObject.data, null, 2));
    } else if (isResizing) {
      let newWidth = Math.round(event.clientX - rect.left - buttonObject.data.frame.x);
      let newHeight = Math.round(event.clientY - rect.top - buttonObject.data.frame.y);

      // Boundary checks for resizing
      newWidth = Math.max(10, Math.min(newWidth, canvas.width - buttonObject.data.frame.x));
      newHeight = Math.max(10, Math.min(newHeight, canvas.height - buttonObject.data.frame.y));

      buttonObject.data.frame.width = newWidth;
      buttonObject.data.frame.height = newHeight;

      drawAllButtonsOnCanvas(canvas.id);
      updateInputFields(buttonObject);
      // Log the JSON associated with the updated button
      //console.log(JSON.stringify(buttonObject.data, null, 2));
    }
  });

  canvas.addEventListener('mouseup', () => {
    isDragging = false;
    isResizing = false;
  });
}


function updateInputFields(buttonObject) {
  const buttonFields = document.querySelectorAll(`input[data-button="${buttonObject.data.inputs[0]}"], input[data-button="dpad"]`);

  buttonFields.forEach(input => {
    const key = input.dataset.key;
    if (buttonObject.data.frame[key] !== undefined) {
      input.value = buttonObject.data.frame[key];
    } else if (buttonObject.data.extendedEdges[key] !== undefined) {
      input.value = buttonObject.data.extendedEdges[key];
    }
  });
}

generateBtn.addEventListener('click', handleGenerateJson);
saveBtn.addEventListener('click', () => {
  const jsonString = jsonOutput.textContent;
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'info.json';
  a.click();
  URL.revokeObjectURL(url);
});

//document.getElementById('jsonFileInput').addEventListener('change', handleFileInput);

function handleFileInput(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const jsonData = JSON.parse(e.target.result);
      loadJsonData(jsonData);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      alert('Invalid JSON file.');
    }
  };
  reader.readAsText(file);
}

function loadJsonData(jsonData) {
  // Show the loaded JSON content in the jsonOutput element
  const jsonString = JSON.stringify(jsonData, null, 2);
  jsonOutput.textContent = jsonString;

  // Load basic info
  nameInput.value = jsonData.name || '';
  const consoleType = jsonData.identifier.split('.')[2] || '';
  consoleSelect.value = consoleType;
  debugCheckbox.checked = jsonData.debug || false;

  // Update button options for the selected console
  updateButtonDivs();

  // Load representation data
  const iphoneStandardPortraitData = jsonData.representations.iphone.standard.portrait;
  const iphoneEdgeToEdgePortraitData = jsonData.representations.iphone.edgeToEdge.portrait;

  document.getElementById('iphone-standard-portrait-asset').value = iphoneStandardPortraitData.assets.resizable || '';
  document.getElementById('iphone-edgetoedge-portrait-asset').value = iphoneEdgeToEdgePortraitData.assets.resizable || '';

  // Clear existing buttons data and redraw
  buttonsData = [];
  clearCanvas('iphone-standard-portrait-canvas');
  clearCanvas('iphone-edgetoedge-portrait-canvas');

  // Load button data into respective canvases
  loadButtonsData(iphoneStandardPortraitData.items, 'iphone-standard-portrait-canvas');
  loadButtonsData(iphoneEdgeToEdgePortraitData.items, 'iphone-edgetoedge-portrait-canvas');

  generateBtn.disabled = !(nameInput.value && consoleSelect.value);
}

function clearCanvas(canvasId) {
  const canvas = document.getElementById(canvasId);
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function loadButtonsData(items, canvasId) {
  const canvas = document.getElementById(canvasId);
  const context = canvas.getContext('2d');
  const buttonFieldsContainer = document.getElementById(canvasId.replace('canvas', 'button-fields'));

  items.forEach(item => {
    const button = item.inputs[0] || 'dpad';
    const buttonData = {
      representation: canvasId,
      data: item
    };
    buttonsData.push(buttonData);
    drawButtonOnCanvas(context, item);

    // Find the existing button div
    const buttonDiv = Array.from(buttonFieldsContainer.children).find(div => div.textContent.includes(button));
    if (buttonDiv) {
      // Update the fields of the existing button div with the loaded data
      updateButtonFields(button, buttonData, buttonDiv, canvas, context);
    }
  });
}

document.getElementById('iphone-standard-portrait-pdf').addEventListener('change', (event) => handlePdfUpload(event, 'iphone-standard-portrait-canvas'));
document.getElementById('iphone-edgetoedge-portrait-pdf').addEventListener('change', (event) => handlePdfUpload(event, 'iphone-edgetoedge-portrait-canvas'));

let pdfBackgrounds = {}; // Store the PDF background images

async function handlePdfUpload(event, canvasId) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async function(e) {
    const pdfData = new Uint8Array(e.target.result);
    const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
    const page = await pdf.getPage(1);

    // Get the original canvas and the new canvas for the PDF background
    const originalCanvas = document.getElementById(canvasId);
    const pdfCanvas = document.getElementById(canvasId + '-pdf');

    const viewport = page.getViewport({ scale: 1 });
    pdfCanvas.width = viewport.width;
    pdfCanvas.height = viewport.height;

    // Set willReadFrequently to true
    const context = pdfCanvas.getContext('2d', { willReadFrequently: true });
    const renderContext = {
      canvasContext: context,
      viewport: viewport
    };
    
    // Updated rendering to match pdf.js version
    const renderTask = page.render(renderContext);
    await renderTask.promise;

    // Store the PDF background data URL if needed
    pdfBackgrounds[canvasId] = pdfCanvas.toDataURL();
  };
  reader.readAsArrayBuffer(file);
}

document.addEventListener('DOMContentLoaded', (event) => {
  const consoleSelect = document.getElementById('consoleSelect');
  const tabsContainer = document.getElementById('tabsContainer');

  consoleSelect.addEventListener('change', function() {
    if (this.value !== "") {
      this.disabled = true;
      updateButtonDivs(); // Call the function to update button divs based on the selected console
      updateCanvasSize(this.value); // Update the canvas size based on the selected console
    }

    if (consoleSelect.value) {
      tabsContainer.classList.remove('hide');
      document.querySelector('.tablinks').click(); // Open the default tab
    } else {
      tabsContainer.classList.add('hide');
    }
  });
});

function updateCanvasSize(gameConsole) {
  const standardSize = getMappingSize(gameConsole, 'standard');
  const edgeToEdgeSize = getMappingSize(gameConsole, 'edgeToEdge');

  const standardCanvas = document.getElementById('iphone-standard-portrait-canvas');
  const edgeToEdgeCanvas = document.getElementById('iphone-edgetoedge-portrait-canvas');
  const standardCanvasPdf = document.getElementById('iphone-standard-portrait-canvas-pdf');
  const edgeToEdgeCanvasPdf = document.getElementById('iphone-edgetoedge-portrait-canvas-pdf');
  const standardDimensions = document.querySelector('#StandardPortrait .dimensions');
  const edgeToEdgeDimensions = document.querySelector('#EdgeToEdgePortrait .dimensions');

  [standardCanvas, standardCanvasPdf].forEach(canvas => {
    if (canvas) {
      canvas.width = standardSize.width;
      canvas.height = standardSize.height;
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    }
  });

  [edgeToEdgeCanvas, edgeToEdgeCanvasPdf].forEach(canvas => {
    if (canvas) {
      canvas.width = edgeToEdgeSize.width;
      canvas.height = edgeToEdgeSize.height;
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    }
  });

  // Update the displayed dimensions
  standardDimensions.textContent = `${standardSize.width} x ${standardSize.height}`;
  edgeToEdgeDimensions.textContent = `${edgeToEdgeSize.width} x ${edgeToEdgeSize.height}`;

  changeGridTemplateColumns(edgeToEdgeSize);

}

// Function to change the 'grid-template-columns' of all elements with the class '.content-container'
function changeGridTemplateColumns(edgeToEdgeSize) {
  // Select all elements with the class '.content-container'
  document.querySelectorAll('.content-container').forEach(container => {
    container.style.gridTemplateColumns = `calc(${edgeToEdgeSize.width}px + 50px) 1fr`;
  });
}

// Initial call to update canvas size and displayed dimensions on page load
document.addEventListener('DOMContentLoaded', () => {
  updateCanvasSize(consoleSelect.value);
});

// Function to open tabs
function openTab(evt, tabName) {
  const tabcontent = document.querySelectorAll('.tabcontent');
  tabcontent.forEach(tab => {
    tab.style.display = 'none';
  });

  const tablinks = document.querySelectorAll('.tablinks');
  tablinks.forEach(link => {
    link.classList.remove('active');
  });

  document.getElementById(tabName).style.display = 'block';
  evt.currentTarget.classList.add('active');
}

// Open the default tab
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.tablinks').click();
});

// Function to save a canvas as a scaled PNG image
function saveCanvasAsScaledPNG(canvasId, scaleFactor = 8) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    console.error(`Canvas with ID ${canvasId} not found.`);
    return;
  }

  // Create an off-screen canvas
  const scaledCanvas = document.createElement('canvas');
  scaledCanvas.width = canvas.width * scaleFactor;
  scaledCanvas.height = canvas.height * scaleFactor;
  const ctx = scaledCanvas.getContext('2d');

  // Draw the original canvas content onto the scaled canvas
  ctx.drawImage(canvas, 0, 0, scaledCanvas.width, scaledCanvas.height);

  // Create a download link
  const link = document.createElement('a');
  link.href = scaledCanvas.toDataURL('image/png');
  link.download = `image.png`;
  link.click();
}

function updateButtonFields(button, buttonObject, buttonDiv, canvas, context) {
  let fieldsDiv = buttonDiv.querySelector('.button-fields');
  if (!fieldsDiv) {
    fieldsDiv = document.createElement('div');
    fieldsDiv.className = 'button-fields';
    buttonDiv.appendChild(fieldsDiv);
  }

  const fieldsHTML = `
     <div class="field-wrapper">
      <div class="frame field-inner-wrapper">
            <label>Frame</label>
            <div class="pos-size">
                <div class="pos">X <input type="number" value="${buttonObject.data.frame.x}" data-key="x" data-button="${buttonObject.data.inputs[0]}" step="1"></div>
                <div class="pos">Y <input type="number" value="${buttonObject.data.frame.y}" data-key="y" data-button="${buttonObject.data.inputs[0]}" step="1"></div>
                <div class="size">W <input type="number" value="${buttonObject.data.frame.width}" data-key="width" data-button="${buttonObject.data.inputs[0]}" step="1"></div>
                <div class="size">H <input type="number" value="${buttonObject.data.frame.height}" data-key="height" data-button="${buttonObject.data.inputs[0]}" step="1"></div>
            </div>
        </div>
        <div class="edges field-inner-wrapper">
            <label>Edges</label>
            <div class="extended-edges">
                <div class="extended-edges__top"><input type="number" value="${buttonObject.data.extendedEdges.top}" data-key="top" data-button="${buttonObject.data.inputs[0]}" step="1"></div>
                <div class="extended-edges__left"><input type="number" value="${buttonObject.data.extendedEdges.left}" data-key="left" data-button="${buttonObject.data.inputs[0]}" step="1"> </div>
                <div class="extended-edges__right"><input type="number" value="${buttonObject.data.extendedEdges.right}" data-key="right" data-button="${buttonObject.data.inputs[0]}" step="1"></div>
                <div class="extended-edges__bottom"><input type="number" value="${buttonObject.data.extendedEdges.bottom}" data-key="bottom" data-button="${buttonObject.data.inputs[0]}" step="1"></div>
            </div>
        </div>
    </div>
    `;

  fieldsDiv.innerHTML = fieldsHTML;
  buttonDiv.appendChild(fieldsDiv);

  // Add event listeners to the input fields
  const inputs = fieldsDiv.querySelectorAll('input');
  inputs.forEach(input => {
    input.addEventListener('input', (event) => updateButtonData(event, buttonObject, context, canvas));
  });

  // Add drag and resize functionality to the canvas
  addCanvasDragFunctionality(canvas, context, buttonObject);
}

document.getElementById('jsonFileInput').addEventListener('change', handleFileInput);

function handleFileInput(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const jsonData = JSON.parse(e.target.result);
      loadJsonData(jsonData);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      alert('Invalid JSON file.');
    }
  };
  reader.readAsText(file);
}

function loadJsonData(jsonData) {
  // Show the loaded JSON content in the jsonOutput element
  const jsonString = JSON.stringify(jsonData, null, 2);
  jsonOutput.textContent = jsonString;

  // Load basic info
  nameInput.value = jsonData.name || '';
  const consoleType = jsonData.identifier.split('.')[2] || '';
  consoleSelect.value = consoleType;
  debugCheckbox.checked = jsonData.debug || false;

  // Update button options for the selected console
  updateButtonDivs();

  // Load representation data
  const iphoneStandardPortraitData = jsonData.representations.iphone.standard.portrait;
  const iphoneEdgeToEdgePortraitData = jsonData.representations.iphone.edgeToEdge.portrait;

  // document.getElementById('iphone-standard-portrait-asset').value = iphoneStandardPortraitData.assets.resizable || '';
  // document.getElementById('iphone-edgetoedge-portrait-asset').value = iphoneEdgeToEdgePortraitData.assets.resizable || '';

  // Clear existing buttons data and redraw
  buttonsData = [];
  clearCanvas('iphone-standard-portrait-canvas');
  clearCanvas('iphone-edgetoedge-portrait-canvas');

  // Load button data into respective canvases
  loadButtonsData(iphoneStandardPortraitData.items, 'iphone-standard-portrait-canvas');
  loadButtonsData(iphoneEdgeToEdgePortraitData.items, 'iphone-edgetoedge-portrait-canvas');

  generateBtn.disabled = !(nameInput.value && consoleSelect.value);


}

function loadButtonsData(items, canvasId) {
  const canvas = document.getElementById(canvasId);
  const context = canvas.getContext('2d');
  const buttonFieldsContainer = document.getElementById(canvasId.replace('canvas', 'button-fields'));

  items.forEach(item => {
    let buttonName = 'unknown'; // Default to 'unknown'
    console.log(item);
    // Determine buttonName based on input values
    if (item.inputs.up === 'up') {
      buttonName = 'dpad';
    } else if (item.inputs.up === 'analogStickUp') {
      buttonName = 'thumbstick';
    } else if (item.inputs[0]) {
      buttonName = item.inputs[0];
    }

    const buttonData = {
      representation: canvasId,
      data: item
    };


    //console.log(buttonName);
    //console.log(buttonData);
    buttonsData.push(buttonData);
    drawButtonOnCanvas(context, item);

    // Find the existing button div based on the button-name
    const buttonDiv = Array.from(buttonFieldsContainer.children).find(div => {
      const buttonNameDiv = div.querySelector('.button-name');
      return buttonNameDiv && buttonNameDiv.textContent === buttonName; 
    });

    if (buttonDiv) {
      // Update the fields of the existing button div with the loaded data
      updateButtonFields(buttonName, buttonData, buttonDiv, canvas, context);
      buttonDiv.classList.add('active');

      // Hide the button-add in the div
      const addButton = buttonDiv.querySelector('.button-add');
      if (addButton) {
        addButton.style.display = 'none';
      }

      // Show and enable the removeButton in the div
      const removeButton = buttonDiv.querySelector('.button-remove');
      if (removeButton) {
        removeButton.style.display = 'block';
        removeButton.disabled = false;
      }
    }
  });
  tabsContainer.classList.remove('hide');
}

