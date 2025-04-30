console.log('geomancy.js loaded successfully');

const canvas = document.getElementById('geomancy-canvas');
const castingArea = document.getElementById('casting-area');
const geomanticChart = document.getElementById('geomantic-chart');
const interpretationDiv = document.getElementById('interpretation');
const startCastingBtn = document.getElementById('start-casting-btn');
const confirmLineBtn = document.getElementById('confirm-line-btn');
const confirmMotherBtn = document.getElementById('confirm-mother-btn');

let dots = [];
let currentLine = 0;
let mothers = [];
let currentMother = [];

const figures = {
    '1111': { name: 'Via', meaning: 'The open path, symbolizing change and new beginnings. Like a river carving its course, it urges bold steps forward.', latin: 'Iter aperit omnia' },
    '2222': { name: 'Populus', meaning: 'The multitude, reflecting community and collective will. As the stars align in the night sky, so too do people unite.', latin: 'Vox populi, vox dei' },
    '1122': { name: 'Fortuna Major', meaning: 'Great fortune, born of inner strength and cosmic favor. The sun rises, heralding triumph through resilience.', latin: 'Fortuna audaces iuvat' },
    '2211': { name: 'Fortuna Minor', meaning: 'Lesser fortune, swift success through adaptability. Like a breeze, it brings fleeting but vital opportunities.', latin: 'Celeritas vincit' },
    '1212': { name: 'Acquisitio', meaning: 'Gain and prosperity, the fruits of effort. As the earth yields its harvest, so too does diligence reward.', latin: 'Labor omnia vincit' },
    '2121': { name: 'Amissio', meaning: 'Loss or sacrifice, urging release. Like autumn leaves falling, letting go paves the way for renewal.', latin: 'Relinquere renovat' },
    '1221': { name: 'Laetitia', meaning: 'Joy and upliftment, a beacon of hope. The dawn breaks, casting light on the heart’s desires.', latin: 'Gaudium illuminat' },
    '2112': { name: 'Tristitia', meaning: 'Sorrow or restriction, a call for introspection. As winter stills the land, wisdom grows in silence.', latin: 'Silentium docet' },
    '1112': { name: 'Caput Draconis', meaning: 'The dragon’s head, a cycle’s start. Like spring’s first bloom, it heralds new ventures.', latin: 'Initium novum' },
    '2221': { name: 'Cauda Draconis', meaning: 'The dragon’s tail, an ending. As the old forest falls, space clears for rebirth.', latin: 'Finis renovat' },
    '1211': { name: 'Puer', meaning: 'Youthful energy, bold but reckless. The young stag charges, full of vigor yet untested.', latin: 'Audacia iuvenis' },
    '2122': { name: 'Puella', meaning: 'Harmony and receptivity, a gentle strength. Like the moon’s soft glow, it nurtures quietly.', latin: 'Luna lenit' },
    '1222': { name: 'Rubeus', meaning: 'Passion or danger, a fiery force. The volcano’s heat demands caution and respect.', latin: 'Ignis caveat' },
    '2111': { name: 'Albus', meaning: 'Wisdom and purity, clear insight. The still lake reflects truth for those who seek.', latin: 'Veritas lucet' },
    '1121': { name: 'Conjunctio', meaning: 'Union and connection, bridging divides. As rivers merge, so too do paths converge.', latin: 'Unio fortis' },
    '2212': { name: 'Carcer', meaning: 'Confinement or structure, a time of limits. The cave shelters but binds; seek balance within.', latin: 'Clausura temperat' }
};

if (!canvas || !castingArea || !geomanticChart || !interpretationDiv || !startCastingBtn || !confirmLineBtn || !confirmMotherBtn) {
    console.error('One or more DOM elements not found');
    alert('Error: Page elements not loaded correctly. Please refresh the page.');
    throw new Error('Missing DOM elements');
}

const ctx = canvas.getContext('2d');
if (!ctx) {
    console.error('Failed to get canvas context');
    alert('Error: Canvas not supported. Please use a modern browser.');
    throw new Error('Canvas context not available');
}

function startCasting() {
    console.log('startCasting called');
    const question = document.getElementById('question').value;
    if (!question) {
        alert('Please enter a question.');
        return;
    }
    castingArea.style.display = 'block';
    geomanticChart.innerHTML = '';
    interpretationDiv.innerHTML = '';
    dots = [];
    currentLine = 0;
    mothers = [];
    currentMother = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    castingArea.querySelector('p').textContent = `Cast dots for line 1 of Mother 1.`;
}

canvas.addEventListener('mousedown', (e) => {
    console.log('Canvas mousedown event');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    dots.push({ x, y });
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = '#D4A017';
    ctx.fill();
});

function confirmLine() {
    console.log('confirmLine called', { dots: dots.length, currentLine });
    if (dots.length === 0) {
        alert('Please cast at least one dot.');
        return;
    }
    const count = dots.length;
    const isOdd = count % 2 !== 0;
    currentMother.push(isOdd ? 1 : 2);
    dots = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    currentLine++;
    if (currentLine < 4) {
        castingArea.querySelector('p').textContent = `Cast dots for line ${currentLine + 1} of Mother ${mothers.length + 1}.`;
    } else {
        castingArea.querySelector('p').textContent = 'Confirm your Mother figure or cast another line.';
    }
}

function confirmMother() {
    console.log('confirmMother called', { currentMother });
    if (currentMother.length !== 4) {
        alert('Please complete all four lines.');
        return;
    }
    mothers.push(currentMother);
    displayFigure(mothers.length - 1, 'Mother', mothers[mothers.length - 1]);
    currentMother = [];
    currentLine = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (mothers.length < 4) {
        castingArea.querySelector('p').textContent = `Cast dots for line 1 of Mother ${mothers.length + 1}.`;
    } else {
        castingArea.style.display = 'none';
        generateChart();
    }
}

function displayFigure(index, type, figure) {
    console.log(`displayFigure called for ${type} ${index + 1}`, { figure });
    const figureKey = figure.join('');
    const figureData = figures[figureKey];
    if (!figureData) {
        console.error('Figure not found', { figureKey });
        return;
    }
    const figureDiv = document.createElement('div');
    figureDiv.className = 'geomantic-figure';
    figureDiv.innerHTML = `
        <h3>${type} ${index + 1}: ${figureData.name}</h3>
        <p>${figure.map(line => line === 1 ? '●' : '●●').join('<br>')}</p>
        <p>${figureData.meaning}</p>
    `;
    geomanticChart.appendChild(figureDiv);
}

function xorFigures(fig1, fig2) {
    return fig1.map((line, i) => (line === fig2[i] ? 2 : 1));
}

function generateChart() {
    console.log('generateChart called', { mothers });
    geomanticChart.innerHTML = ''; // Clear for full chart
    mothers.forEach((figure, index) => displayFigure(index, 'Mother', figure));

    // Generate Daughters
    const daughters = [[], [], [], []];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            daughters[j][i] = mothers[i][j];
        }
    }
    daughters.forEach((figure, index) => displayFigure(index, 'Daughter', figure));

    // Generate Nieces
    const nieces = [
        xorFigures(mothers[0], mothers[1]),
        xorFigures(mothers[2], mothers[3]),
        xorFigures(daughters[0], daughters[1]),
        xorFigures(daughters[2], daughters[3])
    ];
    nieces.forEach((figure, index) => displayFigure(index, 'Niece', figure));

    // Generate Witnesses
    const rightWitness = xorFigures(nieces[0], nieces[1]);
    const leftWitness = xorFigures(nieces[2], nieces[3]);
    displayFigure(0, 'Right Witness', rightWitness);
    displayFigure(0, 'Left Witness', leftWitness);

    // Generate Judge
    const judge = xorFigures(rightWitness, leftWitness);
    displayFigure(0, 'Judge', judge);

    // Generate Interpretation
    const judgeKey = judge.join('');
    const judgeData = figures[judgeKey];
    if (!judgeData) {
        console.error('Judge figure not found', { judgeKey });
        interpretationDiv.innerHTML = '<p>Error: Unable to interpret the Judge figure.</p>';
        return;
    }
    const question = document.getElementById('question').value;
    const pathSuggestions = {
        positive: { path: 'History', link: 'history.html' },
        neutral: { path: 'Art', link: 'art.html' },
        challenging: { path: 'Relics', link: 'relics.html' }
    };
    const outcomeType = ['Fortuna Major', 'Laetitia', 'Acquisitio', 'Caput Draconis', 'Albus', 'Conjunctio', 'Puella'].includes(judgeData.name)
        ? 'positive'
        : ['Fortuna Minor', 'Populus', 'Via'].includes(judgeData.name)
        ? 'neutral'
        : 'challenging';
    const suggestion = pathSuggestions[outcomeType];
    interpretationDiv.innerHTML = `
        <h3>Your Oracle: ${judgeData.name}</h3>
        <p><em>${judgeData.latin}</em> — ${judgeData.meaning.split('.')[0]}.</p>
        <p>${judgeData.meaning}</p>
        <p>Reflect on your question: "${question}" The Judge reveals a ${outcomeType} path. To deepen your journey, explore our <a href="${suggestion.link}">${suggestion.path}</a> page, where the wisdom of the ancients awaits.</p>
    `;
    console.log('Interpretation generated', { judge: judgeData.name, outcomeType });
}

// Attach event listeners
startCastingBtn.addEventListener('click', () => {
    console.log('Start Casting button clicked');
    startCasting();
});
confirmLineBtn.addEventListener('click', confirmLine);
confirmMotherBtn.addEventListener('click', confirmMother);

// Accessibility: Keyboard interaction
canvas.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        console.log('Enter key pressed on canvas');
        confirmLine();
    }
});

// Test canvas interaction
canvas.addEventListener('click', () => {
    console.log('Canvas clicked');
});