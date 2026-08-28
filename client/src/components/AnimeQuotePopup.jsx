import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './AnimeQuotePopup.css';

const ANIME_QUOTES = [
    { quote: 'The only thing we\'re allowed to do is believe that we won\'t regret the choice we made.', source: 'Levi Ackerman · Attack on Titan' },
    { quote: 'Those who do not understand true pain can never understand true peace.', source: 'Pain · Naruto' },
    { quote: 'People live their lives bound by what they accept as correct and true.', source: 'Itachi Uchiha · Naruto' },
    { quote: 'If you don\'t take risks, you can\'t create a future.', source: 'Monkey D. Luffy · One Piece' },
    { quote: 'Inherited will, the destiny of the age, and the dreams of its people…', source: 'Gol D. Roger · One Piece' },
    { quote: 'Risking your life and doing something that could easily rob you of your life are exact opposites.', source: 'L · Death Note' },
    { quote: 'There\'s one thing a Saiyan always keeps: his pride!', source: 'Vegeta · Dragon Ball Z' },
    { quote: 'Set your heart ablaze.', source: 'Rengoku · Demon Slayer' },
    { quote: 'Throughout heaven and earth, I alone am the honored one.', source: 'Satoru Gojo · Jujutsu Kaisen' },
    { quote: 'You have no enemies.', source: 'Thors · Vinland Saga' },
    { quote: 'A lesson without pain is meaningless.', source: 'Edward Elric · Fullmetal Alchemist' },
    { quote: 'When I say it doesn\'t hurt me, that means I can bear it.', source: 'Killua · Hunter × Hunter' },
    { quote: 'If fate is a millstone, then we are the grist.', source: 'Ichigo Kurosaki · Bleach' },
    { quote: 'If you\'re always worried about crushing the ants beneath you, you won\'t be able to walk.', source: 'Guts · Berserk' },
    { quote: 'The only ones who should kill are those prepared to be killed.', source: 'Lelouch · Code Geass' },
    { quote: 'Sometimes good people make bad choices.', source: 'Kaneki · Tokyo Ghoul' },
    { quote: 'The future belongs to those who believe in the beauty of their dreams.', source: 'Hinata · Haikyuu!!' },
    { quote: 'It\'s okay to run away.', source: 'Reigen · Mob Psycho 100' },
    { quote: 'Sometimes you need a little wishful thinking just to keep on living.', source: 'Misato · Neon Genesis Evangelion' },
    { quote: 'Whatever happens, happens.', source: 'Spike Spiegel · Cowboy Bebop' },
    { quote: 'Believe it!', source: 'Naruto' },
    { quote: 'Plus Ultra!', source: 'My Hero Academia' },
    { quote: 'I want to be the Pirate King!', source: 'Monkey D. Luffy · One Piece' },
];

const ACCENT_COLORS = [
    'var(--primary-color)',
    'var(--secondary-color)',
    'var(--accent-color)',
];

const MAX_QUOTES = 2;
const SPAWN_DELAY_MIN = 5000;
const SPAWN_DELAY_MAX = 10000;
const QUOTE_LIFETIME_MIN = 8000;
const QUOTE_LIFETIME_MAX = 12000;

const getRandomPosition = () => {
    const margin = 8;
    const blocked = { xMin: 25, xMax: 75, yMin: 30, yMax: 70 };

    let x;
    let y;
    let attempts = 0;

    do {
        x = margin + Math.random() * (100 - margin * 2);
        y = margin + Math.random() * (100 - margin * 2);
        attempts++;
    } while (
        attempts < 20 &&
        x > blocked.xMin && x < blocked.xMax &&
        y > blocked.yMin && y < blocked.yMax
    );

    return {
        x,
        y,
        rotation: -12 + Math.random() * 24,
        accent: ACCENT_COLORS[Math.floor(Math.random() * ACCENT_COLORS.length)],
    };
};

const AnimeQuotePopup = () => {
    const [quotes, setQuotes] = useState([]);
    const activeQuotesRef = useRef(new Set());
    const prefersReducedMotion = useRef(
        typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );

    useEffect(() => {
        if (prefersReducedMotion.current) return;

        const spawnTimeoutRef = { current: null };

        const scheduleNextSpawn = (spawnQuote) => {
            const delay = SPAWN_DELAY_MIN + Math.random() * (SPAWN_DELAY_MAX - SPAWN_DELAY_MIN);
            spawnTimeoutRef.current = setTimeout(spawnQuote, delay);
        };

        const spawnQuote = () => {
            const available = ANIME_QUOTES.filter((q) => !activeQuotesRef.current.has(q.quote));
            const pool = available.length > 0 ? available : ANIME_QUOTES;
            const picked = pool[Math.floor(Math.random() * pool.length)];
            const position = getRandomPosition();
            const id = crypto.randomUUID();

            activeQuotesRef.current.add(picked.quote);
            setQuotes((prev) => [...prev.slice(-(MAX_QUOTES - 1)), { id, ...picked, ...position }]);

            const lifetime = QUOTE_LIFETIME_MIN + Math.random() * (QUOTE_LIFETIME_MAX - QUOTE_LIFETIME_MIN);
            setTimeout(() => {
                activeQuotesRef.current.delete(picked.quote);
                setQuotes((prev) => prev.filter((q) => q.id !== id));
            }, lifetime);

            scheduleNextSpawn(spawnQuote);
        };

        spawnTimeoutRef.current = setTimeout(spawnQuote, 2000);

        return () => {
            clearTimeout(spawnTimeoutRef.current);
        };
    }, []);

    if (prefersReducedMotion.current) return null;

    return (
        <div className="anime-quotes-layer" aria-hidden="true">
            <AnimatePresence>
                {quotes.map((item) => (
                    <motion.div
                        key={item.id}
                        className="anime-quote-bubble"
                        style={{
                            left: `${item.x}%`,
                            top: `${item.y}%`,
                            '--quote-accent': item.accent,
                            rotate: item.rotation,
                        }}
                        initial={{ opacity: 0, scale: 0, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.6, y: -30, rotate: item.rotation + 8 }}
                        transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 18,
                        }}
                    >
                        <span className="anime-quote-text">"{item.quote}"</span>
                        <span className="anime-quote-source">— {item.source}</span>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default AnimeQuotePopup;
