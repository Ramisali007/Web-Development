const form = document.getElementById('string-form');
const inputString = document.getElementById('input-string');
const rollNumber = document.getElementById('roll-number');
const skipInterval = document.getElementById('skip-interval');
const resultsList = document.getElementById('results-list');

const reverseStringWithSkip = (str, skip) => {
    if (skip <= 0 || skip > str.length) return str;
    const chars = str.split('');
    const reversed = chars.filter((_, i) => (i + 1) % skip !== 0).reverse();
    let result = '';
    let reversedIndex = 0;
    for (let i = 0; i < chars.length; i++) {
        if ((i + 1) % skip === 0) {
            result += chars[i];
        } else {
            result += reversed[reversedIndex++];
        }
    }
    return result;
};

const displayResult = (original, transformed) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>Original:</strong> ${original}<br><strong>Transformed:</strong> ${transformed}`;
    resultsList.appendChild(li);
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const str = inputString.value.trim();
    const roll = rollNumber.value.trim();
    const skip = skipInterval.value.trim() ? Number(skipInterval.value.trim()) : roll.split('').reduce((sum, digit) => sum + Number(digit), 0);
    if (!str || !roll || isNaN(skip) || skip <= 0) return;
    const transformed = reverseStringWithSkip(str, skip);
    displayResult(str, transformed);
    inputString.value = '';
    rollNumber.value = '';
    skipInterval.value = '';
});
