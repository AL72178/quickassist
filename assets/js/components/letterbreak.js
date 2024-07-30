// Cache frequently accessed DOM elements
const inputTextElement = document.getElementById('inputText');
const outputBoxesElement = document.getElementById('outputBoxes');
const charCountElement = document.getElementById('charCount');

// Attach event listeners programmatically
inputTextElement.addEventListener('input', countCharacters);
document.getElementById('divideButton').addEventListener('click', divideText);
document.getElementById('resetButton').addEventListener('click', resetText);

function divideText() {
    const inputText = inputTextElement.value;
    outputBoxesElement.innerHTML = '';

    let start = 0;
    let end = 0;
    const CHUNK_SIZE = 63; // Define the chunk size

    let boxCount = Math.ceil(inputText.length / CHUNK_SIZE);

    for (let i = 0; i < boxCount; i++) {
        let textBoxContainer = document.createElement('div');
        textBoxContainer.className = 'textBoxContainer';

        let textBox = document.createElement('textarea');
        textBox.className = 'textBox';
        textBox.setAttribute('readonly', true);

        let copyButton = document.createElement('button');
        copyButton.className = 'button primaryButton';
        copyButton.innerText = 'Copy';
        copyButton.addEventListener('click', function() {
            copyText(textBox);
        });

        end = start + CHUNK_SIZE;
        while (end < inputText.length && inputText.charAt(end) !== ' ' && inputText.charAt(end) !== '\n') {
            end--;
        }
        if (end === start) {
            end = start + CHUNK_SIZE;
        }
        textBox.value = inputText.substring(start, end).trim();
        textBoxContainer.appendChild(textBox);

        // Add outline to output text
        textBox.addEventListener('copy', function() {
            textBox.style.outline = '2px solid rgba(76, 175, 80, 0.8)';
            setTimeout(function() {
                textBox.style.outline = 'none';
            }, 1000); // Reset outline after 1 second
        });

        // Add spacing between output box and copy button
        const spacer = document.createElement('div');
        spacer.style.height = '5px';
        textBoxContainer.appendChild(spacer);

        textBoxContainer.appendChild(copyButton);
        outputBoxesElement.appendChild(textBoxContainer);

        start = end;
    }
}

function copyText(textElement) {
    textElement.select();
    textElement.setSelectionRange(0, 99999); /* For mobile devices */
    document.execCommand('copy');
    showCopiedMessage();
}

function showCopiedMessage() {
    const copiedMessage = document.createElement('div');
    copiedMessage.className = 'copied';
    copiedMessage.innerText = 'Copied';
    document.body.appendChild(copiedMessage);
    setTimeout(function() {
        copiedMessage.remove();
    }, 1000);
}

function resetText() {
    inputTextElement.value = '';
    outputBoxesElement.innerHTML = '';
    countCharacters(); // Reset character count
}

function countCharacters() {
    charCountElement.innerText = 'Characters: ' + inputTextElement.value.length; // Update label with character count
}