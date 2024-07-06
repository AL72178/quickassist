document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the stored Identifier from localStorage, or set a default if not present
    let identifier = localStorage.getItem('identifier');
    if (!identifier) {
        identifier = ''; // Set an empty default value
    }

    // Set the initial value of the input field
    document.getElementById('identifier').value = identifier;

    document.getElementById('partialLogButton').addEventListener('click', function() {
        const adjustmentNote = document.getElementById('reason').value;
        const modeToggle = document.getElementById('modeToggle');
        const formattedText = modeToggle.checked ? formatLinesCIW(adjustmentNote, 74) : formatLinesWGS(adjustmentNote, 74);
        displayOutput(formattedText);
    });

    document.getElementById('completeLogButton').addEventListener('click', function(event) {
        event.preventDefault();
        const reqId = formatText(document.getElementById('req_id').value);
        const arc = formatText(document.getElementById('arc').value);
        const mlhGregorian = document.getElementById('mlh').value; // Get Gregorian date from input
        const mlhJulian = gregorianToJulianDate(mlhGregorian); // Convert Gregorian to Julian date
        const identifier = formatText(document.getElementById('identifier').value);

        // Store the updated identifier in localStorage
        localStorage.setItem('identifier', identifier);

        const reason = formatText(document.getElementById('reason').value);

        // Modify the template to include only the auto-converted Julian date
        const template = `Inquiry No.: ${reqId} | ARC Code: ${arc} | MLH: ${mlhJulian} | ${reason} | -- ${identifier}`;

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
        // No alert is needed
        // Change copy button appearance to indicate copy action completed
        const copyButton = document.querySelector('.copy-button');
        copyButton.innerHTML = 'Copied <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="white" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>';
        setTimeout(() => {
            copyButton.innerHTML = 'Copy';
        }, 2000); // Reset after 2 seconds
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

function gregorianToJulianDate(gregorianDate) {
    const dateParts = gregorianDate.split('/');
    const month = parseInt(dateParts[0]);
    const day = parseInt(dateParts[1]);
    const year = parseInt(dateParts[2]);

    // Calculate Julian day of the year
    let julianDay = day;
    for (let m = 1; m < month; m++) {
        switch (m) {
            case 4: case 6: case 9: case 11:
                julianDay += 30;
                break;
            case 2:
                julianDay += (isLeapYear(year) ? 29 : 28);
                break;
            default:
                julianDay += 31;
        }
    }

    // Calculate Julian year part (last two digits of year)
    const julianYear = year.toString().slice(-2);

    // Combine year part and day part
    const julianDate = julianYear + julianDay.toString().padStart(3, '0');

    return julianDate;
}

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
