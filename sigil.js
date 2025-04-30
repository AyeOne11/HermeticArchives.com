console.log('sigil.js loaded successfully');

const sigilImage = document.getElementById('trident-sigil');
const psychicReadingDiv = document.getElementById('psychic-reading');

if (!sigilImage || !psychicReadingDiv) {
    console.error('Sigil image or psychic reading div not found');
    alert('Error: Page elements not loaded correctly. Please refresh the page.');
    throw new Error('Missing DOM elements');
}

const psychicInsights = [
    {
        message: 'Trust the unseen currents, like tides under moonlight. Your intuition guides you to hidden truths.',
        suggestion: 'Explore our <a href="art.html">Art</a> page to spark your inner vision.'
    },
    {
        message: 'The stars whisper secrets, veiled in mist. Pause and listen to the silence within.',
        suggestion: 'Dive into our <a href="history.html">History</a> page to uncover ancient wisdom.'
    },
    {
        message: 'As jasmine blooms in the dark, so too does clarity emerge from mystery. Seek the subtle signs.',
        suggestion: 'Visit our <a href="relics.html">Relics</a> page to connect with sacred artifacts.'
    },
    {
        message: 'The quartz hums with lunar echoes, urging you to flow with life’s unseen rhythms.',
        suggestion: 'Cast an oracle on our <a href="geomancy.html">Geomancy</a> page for deeper guidance.'
    },
    {
        message: 'Neptune’s veil parts, revealing dreams as truth. Embrace the fluid path ahead.',
        suggestion: 'Explore our <a href="art.html">Art</a> page to inspire your mystic journey.'
    }
];

sigilImage.addEventListener('click', () => {
    console.log('Sigil clicked');
    // Trigger ripple animation
    sigilImage.classList.remove('ripple');
    void sigilImage.offsetWidth; // Force reflow to restart animation
    sigilImage.classList.add('ripple');
    
    // Display random psychic insight
    const insight = psychicInsights[Math.floor(Math.random() * psychicInsights.length)];
    psychicReadingDiv.innerHTML = `
        <p><em>Luna-Neptuna, revela arcana</em> — ${insight.message}</p>
        <p>${insight.suggestion}</p>
    `;
});

// Accessibility: Allow keyboard activation
sigilImage.setAttribute('tabindex', '0');
sigilImage.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        console.log('Sigil activated via keyboard');
        sigilImage.click();
    }
});