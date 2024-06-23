document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('partialLogButton').addEventListener('click', function() {
        const adjustmentNote = document.getElementById('reason').value;
        const log = `Adjustment note: ${adjustmentNote}`;
        const modeToggle = document.getElementById('modeToggle');
        const formattedText = modeToggle.checked ? formatLinesCIW(log, 74) : formatLinesWGS(log, 74);
        displayOutput(formattedText);
    });

    document.getElementById('completeLogButton').addEventListener('click', function(event) {
        event.preventDefault();
        const reqId = formatText(document.getElementById('req_id').value);
        const arc = formatText(document.getElementById('arc').value);
        const mlh = formatText(document.getElementById('mlh').value);
        const reason = formatText(document.getElementById('reason').value);
        const identifier = formatText(document.getElementById('identifier').value);

        const template = `Inquiry No.: ${reqId} | ARC Code: ${arc} | MLH: ${mlh} | ${reason} | -- ${identifier}`;

        const modeToggle = document.getElementById('modeToggle');
        const formattedText = modeToggle.checked ? formatLinesCIW(template, 74) : formatLinesWGS(template, 74);
        
        displayOutput(formattedText);
    });

    document.getElementById('modeToggle').addEventListener('change', function() {
        const modeLabel = document.getElementById('modeLabel');
        if (this.checked) {
            modeLabel.textContent = 'CIW';
        } else {
            modeLabel.textContent = 'WGS';
        }
    });
});

function formatText(text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

function formatLinesWGS(text, maxLength) {
    let lines = [];
    let line = '';
    const words = text.split(' ');

    words.forEach(word => {
        if ((line + word).length <= maxLength) {
            line += word + ' ';
        } else {
            lines.push(line.trim());
            line = word + ' ';
        }
    });

    // Push the last line
    lines.push(line.trim());

    return lines.join('\n');
}

function formatLinesCIW(text, maxLength) {
    let lines = [];
    let line = '';
    const words = text.split(' ');

    words.forEach(word => {
        if ((line + word).length <= maxLength) {
            line += word + ' ';
        } else {
            // Pad the line with '_' to reach maxLength
            line = line.trim().padEnd(maxLength, '_');
            lines.push(line);
            line = word + ' ';
        }
    });

    // Push the last line without padding if it's the identifier line
    if (line.includes('--')) {
        lines.push(line.trim());
    } else {
        lines.push(line.trim());
    }

    return lines.join('\n');
}

function displayOutput(text) {
    const outputContainer = document.querySelector('.output-container');
    const outputElement = document.getElementById('output');
    
    outputElement.textContent = text;
    outputContainer.style.display = 'block';
}

function copyToClipboard() {
    const output = document.getElementById('output').textContent;
    navigator.clipboard.writeText(output).then(() => {
        alert('Text copied to clipboard');
    }).catch(err => {
        alert('Failed to copy text: ', err);
    });
}
