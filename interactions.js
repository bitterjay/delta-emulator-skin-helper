export let isDragging = false;
export let isResizing = false;
export let isDraggingButton = false;
export let isResizingButton = false;
export let dragStartX, dragStartY;
export let resizeStartX, resizeStartY;
export let initialWidth, initialHeight;
export let aspectRatio;
export let currentButton;

export function startInteraction(e, canvas, screen, buttons) {
    const handleSize = 10;
    const mouseX = e.offsetX;
    const mouseY = e.offsetY;

    // Check if the mouse is over a button
    const canvasButtons = buttons[canvas.id] || [];
    for (let i = 0; i < canvasButtons.length; i++) {
        const button = canvasButtons[i];
        if (
            mouseX >= button.x + button.width - handleSize &&
            mouseX <= button.x + button.width &&
            mouseY >= button.y + button.height - handleSize &&
            mouseY <= button.y + button.height
        ) {
            // Start resizing button
            isResizingButton = true;
            currentButton = button;
            resizeStartX = e.clientX;
            resizeStartY = e.clientY;
            initialWidth = button.width;
            initialHeight = button.height;
            return;
        } else if (
            mouseX >= button.x &&
            mouseX <= button.x + button.width &&
            mouseY >= button.y &&
            mouseY <= button.y + button.height
        ) {
            // Start dragging button
            isDraggingButton = true;
            currentButton = button;
            dragStartX = e.clientX - button.x;
            dragStartY = e.clientY - button.y;
            return;
        }
    }

    if (
        mouseX >= screen.outputFrame.x + screen.outputFrame.width - handleSize &&
        mouseX <= screen.outputFrame.x + screen.outputFrame.width &&
        mouseY >= screen.outputFrame.y + screen.outputFrame.height - handleSize &&
        mouseY <= screen.outputFrame.y + screen.outputFrame.height
    ) {
        // Start resizing screen
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
        // Start dragging screen
        isDragging = true;
        dragStartX = e.clientX - screen.outputFrame.x;
        dragStartY = e.clientY - screen.outputFrame.y;
    }
}

export function handleInteraction(e, canvas, screen, buttons, drawCanvas, updateButtonFields, updateScreenFields) {
    if (isDraggingButton || isResizingButton) {
        if (isDraggingButton && currentButton) {
            currentButton.x = Math.round(e.clientX - dragStartX);
            currentButton.y = Math.round(e.clientY - dragStartY);
        }

        if (isResizingButton && currentButton) {
            const deltaX = e.clientX - resizeStartX;
            const deltaY = e.clientY - resizeStartY;
            const newWidth = Math.round(initialWidth + deltaX);
            const newHeight = Math.round(initialHeight + deltaY);

            currentButton.width = newWidth;
            currentButton.height = newHeight;
        }

        drawCanvas(canvas, screen, { width: canvas.width, height: canvas.height });
        updateButtonFields(currentButton);
    }

    if (isDragging || isResizing) {
        if (isDragging) {
            screen.outputFrame.x = Math.round(e.clientX - dragStartX);
            screen.outputFrame.y = Math.round(e.clientY - dragStartY);
        }

        if (isResizing) {
            const deltaX = e.clientX - resizeStartX;
            const newWidth = Math.round(initialWidth + deltaX);
            const newHeight = Math.round(newWidth / aspectRatio);

            screen.outputFrame.width = newWidth;
            screen.outputFrame.height = newHeight;
        }

        drawCanvas(canvas, screen, { width: canvas.width, height: canvas.height });
        updateScreenFields(screen, canvas.id);
    }
}

export function endInteraction() {
    isDragging = false;
    isResizing = false;
    isDraggingButton = false;
    isResizingButton = false;
    currentButton = null;
}
