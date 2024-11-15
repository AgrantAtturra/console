document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("input");
    const outputDiv = document.getElementById("output");
    const inputLine = document.getElementById("input-line");

    const maxLines = 18; // Adjust this based on the terminal's height and font size

    // Initially position the input field below the welcome message
    outputDiv.appendChild(inputLine);

    // Set caret (cursor) color to green for the terminal look
    inputField.style.caretColor = "green";

    // Focus the input field as soon as the page loads
    inputField.focus();

    inputField.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            const command = inputField.value;
            if (command.trim()) {
                processCommand(command);
                inputField.value = ""; // Clear input field after processing
            }
        }
    });

    function processCommand(command) {
        // Create a new line in the output
        const newLine = document.createElement("div");
        newLine.innerHTML = `<span class="prompt">[SNORP]:</span> ${command}`;
        outputDiv.appendChild(newLine);

        // Simple command responses
        if (command === "help") {
            appendOutput("Available commands: help, clear");
        } else if (command === "clear") {
            outputDiv.innerHTML = ""; // Clear all output
        } else {
            appendOutput(`${command}: command not found`);
        }

        // Remove the oldest line if the line limit is exceeded
        while (outputDiv.childElementCount > maxLines) {
            outputDiv.removeChild(outputDiv.firstChild);
        }

        // Re-insert the input field at the bottom of the output div
        insertInputLine();

        // Ensure the input field is always focused and the cursor is visible
        inputField.focus();
    }

    function appendOutput(text) {
        const outputLine = document.createElement("div");
        outputLine.textContent = text;
        outputDiv.appendChild(outputLine);

        // Add an extra blank line for spacing
        const blankLine = document.createElement("div");
        blankLine.innerHTML = "&nbsp;";
        outputDiv.appendChild(blankLine);
    }

    // Function to insert the input line right after the latest output
    function insertInputLine() {
        outputDiv.appendChild(inputLine); // Always append input-line after output
    }
});
