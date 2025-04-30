function showResult() {
    const answer = document.querySelector('input[name="element"]:checked');
    const resultDiv = document.getElementById('quiz-result');
    
    if (!answer) {
        resultDiv.innerHTML = "<p>Please select an element!</p>";
        return;
    }

    const element = answer.value;
    let symbol = "";
    if (element === "fire") {
        symbol = "The Sun ☉ - You’re a fiery seeker of truth, radiating energy and enlightenment.";
    } else if (element === "water") {
        symbol = "The Moon ☽ - You’re intuitive and reflective, diving deep into the mysteries of the soul.";
    } else if (element === "air") {
        symbol = "Mercury ☿ - You’re a communicator, always seeking knowledge and connection.";
    } else if (element === "earth") {
        symbol = "Saturn ♄ - You’re grounded and disciplined, building wisdom through structure.";
    }

    resultDiv.innerHTML = `<p>Your Hermetic Symbol is: <strong>${symbol}</strong></p>`;
}

function showRelicResult() {
    const answer = document.querySelector('input[name="path"]:checked');
    const resultDiv = document.getElementById('quiz-result');
    
    if (!answer) {
        resultDiv.innerHTML = "<p>Please select a path!</p>";
        return;
    }

    const path = answer.value;
    let relic = "";
    if (path === "wisdom") {
        relic = "The Holy Grail - Your destiny lies in the pursuit of spiritual enlightenment and divine knowledge.";
    } else if (path === "power") {
        relic = "The Spear of Destiny - You seek to control fate and wield the power to shape the world.";
    } else if (path === "mystery") {
        relic = "The Voynich Manuscript - Your path is one of unraveling the unknown, embracing the enigma of the universe.";
    }

    resultDiv.innerHTML = `<p>Your Relic is: <strong>${relic}</strong></p>`;
}

function showPathResult() {
    const answer = document.querySelector('input[name="path"]:checked');
    const resultDiv = document.getElementById('quiz-result');
    
    if (!answer) {
        resultDiv.innerHTML = "<p>Please select a path!</p>";
        return;
    }

    const path = answer.value;
    let message = "";
    if (path === "history") {
        message = "Journey through time—uncover the origins of Hermeticism, from the ancient *Corpus Hermeticum* to the Renaissance revival. <a href='history.html'>Start Exploring</a>";
    } else if (path === "art") {
        message = "Gaze into the visions of esoteric masters—discover hidden symbols in works like Bosch’s *Garden of Earthly Delights*. <a href='art.html'>Start Discovering</a>";
    } else if (path === "relics") {
        message = "Seek the artifacts of legend—unravel the mysteries of the Holy Grail and the Voynich Manuscript. <a href='relics.html'>Start Uncovering</a>";
    }

    resultDiv.innerHTML = `<p>${message}</p>`;
}