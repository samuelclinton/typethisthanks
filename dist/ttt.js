const settings = {
    "containerClass": "ttt-container",
    "cursorClass": "ttt-cursor",
    "cursorBlinkSpeed": 400,
    "initialDelay": 150,
    "typeDelay": 50,
    "eraseDelay": 50,
    "readTime": 3000,
    "timeBetweenWords": 1000,
    "strings": []
}

const container = document.querySelector('.' + settings.containerClass);
const cursorHTML = '<span class="' + settings.cursorClass + '">|</span>';

const ttt = {
    word: '',
    i: 0,
    x: 0,

    blinkCursor() {
        let cursor = document.querySelector('.' + settings.cursorClass);
        if (cursor === null) {
            container.innerHTML = cursorHTML;
            cursor = document.querySelector('.' + settings.cursorClass);
        }
        if (cursor.style.opacity == 1) {
            cursor.style.opacity = 0;
        } else {
            cursor.style.opacity = 1;
        }
    },

    clearCursor(interval) {
        clearInterval(interval);
        container.innerHTML = '';
    },

    type(string) {
        if (i < string.length) {
            word += string.charAt(i);
            container.innerHTML = word + cursorHTML;
            i++;
            setTimeout(ttt.type, settings.typeDelay, string)
        }
    },

    erase(string) {
        if (x < string.length) {
            word = word.slice(0, -1);
            container.innerHTML = word + cursorHTML;
            x++;
            setTimeout(ttt.erase, settings.eraseDelay, string)
        }
    },

    typeAndEraseWord(string) {
        word = '';
        i = 0;
        x = 0;
        ttt.type(string)
        const eraseTimeout = string.length * settings.typeDelay + settings.readTime;
        setTimeout(ttt.erase, eraseTimeout, string)
    },

    typeAndEraseArray(array) {
        let timeout = settings.initialDelay;
        for (let index = 0; index < array.length; index++) {
            const word = array[index];
            let previousWord;
            if (index === 0) {
                previousWord = array[array.length-1];
                setTimeout(ttt.typeAndEraseWord, timeout, word)
            } else {
                previousWord = array[index-1];
                timeout += calculateWordTimeout(previousWord);
                setTimeout(ttt.typeAndEraseWord, timeout, word)
            }
        }
    },

    start(loop) {
        if (loop) {
            ttt.typeAndEraseArray(settings.strings);
            setInterval(ttt.blinkCursor, settings.cursorBlinkSpeed);
            const arrayTimeout = calculateArrayTimeout(settings.strings);
            setInterval(ttt.typeAndEraseArray, arrayTimeout, settings.strings);
        } else {
            ttt.typeAndEraseArray(settings.strings);
            const timer = setInterval(ttt.blinkCursor, settings.cursorBlinkSpeed);
            const cursorTimeout = calculateArrayTimeout(settings.strings) - settings.cursorBlinkSpeed;
            setTimeout(this.clearCursor, cursorTimeout, timer);
        }
    }
}

function calculateWordTimeout(string) {
    const typeTime = string.length * settings.typeDelay;
    const eraseTime = string.length * settings.eraseDelay;
    const timeout = typeTime + settings.readTime + eraseTime + settings.timeBetweenWords;
    return timeout;
}

function calculateArrayTimeout(array) {
    let timeout = 0;
    array.forEach(string => {
        timeout += calculateWordTimeout(string);
    });
    return timeout;
}
