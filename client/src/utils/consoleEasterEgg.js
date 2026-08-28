let hasLogged = false;

export const logConsoleEasterEgg = () => {
    if (hasLogged || typeof window === 'undefined') return;
    hasLogged = true;

    console.log(
        '%c🔓 Layer 1',
        'color: #ffcc00; font-weight: bold; font-size: 14px;'
    );
    console.log(
        '%cSee the terminal prompt above the title?',
        'color: #ccc; font-size: 12px;'
    );
    console.log(
        '%c____@portfolio  →  fill in the 4-letter username.',
        'color: #7ee787; font-size: 12px; font-weight: bold;'
    );
    console.log(
        '%cHint: it\'s the developer\'s first name. Just type on your keyboard — the footer will react.',
        'color: #ccc; font-size: 12px;'
    );
};
