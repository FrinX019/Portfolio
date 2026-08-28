import { useTerminal } from '../hooks/useTerminal';
import './EasterEggFooter.css';

const EasterEggFooter = ({ variant = 'default' }) => {
    const {
        registerFooterClick,
        typedPrefix,
        remainingBlanks,
        sequenceShake,
        sequenceProgress,
    } = useTerminal();

    return (
        <footer
            className={`easter-egg-footer${variant === 'home' ? ' easter-egg-footer--home' : ''}`}
            onClick={registerFooterClick}
        >
            <p className="easter-egg-footer__main">
                Built with caffeine, questionable commits, and a few hidden commands.
            </p>

            <div
                className={`easter-egg-footer__puzzle${sequenceShake ? ' easter-egg-footer__puzzle--shake' : ''}${sequenceProgress > 0 ? ' easter-egg-footer__puzzle--active' : ''}`}
                aria-hidden="true"
            >
                <span className="easter-egg-footer__username">
                    <span className="easter-egg-footer__typed">{typedPrefix}</span>
                    <span className="easter-egg-footer__blanks">{remainingBlanks}</span>
                </span>
                <span className="easter-egg-footer__host">@portfolio:~$</span>
                <span className="easter-egg-footer__cursor">_</span>
            </div>

            <p className="easter-egg-footer__hint">
                {sequenceProgress > 0
                    ? 'keep going…'
                    : 'fill in the blanks — just start typing on your keyboard "Hint: it\'s MEE."'}
            </p>
        </footer>
    );
};

export default EasterEggFooter;
