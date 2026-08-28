import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTerminal } from '../hooks/useTerminal';
import { TERMINAL_COMMANDS } from '../data/portfolioData';
import {
    executeCommand,
    getHireActions,
    getInitialOutput,
} from '../utils/terminalCommands';
import './SecretTerminal.css';

const PROMPT = 'frin@portfolio:~$';

const renderLine = (line, key) => {
    if (typeof line === 'string') {
        return <div key={key} className="terminal-line">{line || '\u00A0'}</div>;
    }

    if (line.type === 'link') {
        return (
            <div key={key} className="terminal-line">
                <a
                    href={line.url}
                    target={line.url.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="terminal-link"
                >
                    {line.label}{line.display ? `: ${line.display}` : `: ${line.url}`}
                </a>
            </div>
        );
    }

    return null;
};

const TerminalSession = ({ onClose }) => {
    const [entries, setEntries] = useState(getInitialOutput);
    const [inputValue, setInputValue] = useState('');
    const [commandHistory, setCommandHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [isProcessing, setIsProcessing] = useState(false);

    const inputRef = useRef(null);
    const bodyRef = useRef(null);
    const sessionIdRef = useRef(0);

    const scrollToBottom = useCallback(() => {
        if (bodyRef.current) {
            bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
        }
    }, []);

    const appendEntry = useCallback((entry) => {
        setEntries((prev) => [...prev, { ...entry, id: `${Date.now()}-${Math.random()}` }]);
    }, []);

    const runAsyncCommand = useCallback(async (steps) => {
        const session = sessionIdRef.current;
        setIsProcessing(true);

        for (const step of steps) {
            if (session !== sessionIdRef.current) return;

            if (step.delay) {
                await new Promise((resolve) => setTimeout(resolve, step.delay));
            }

            if (step.type === 'access-granted') {
                appendEntry({ type: 'access-granted', text: step.text });
            } else if (step.type === 'hire-actions') {
                appendEntry({ type: 'hire-actions', actions: getHireActions() });
            } else if (step.text !== undefined) {
                appendEntry({ type: 'output', lines: [step.text] });
            }
        }

        if (session === sessionIdRef.current) {
            setIsProcessing(false);
        }
    }, [appendEntry]);

    const processCommand = useCallback(async (rawInput) => {
        const trimmed = rawInput.trim();
        if (!trimmed || isProcessing) return;

        appendEntry({ type: 'input', text: `${PROMPT} ${trimmed}` });

        if (trimmed.toLowerCase() !== 'clear') {
            setCommandHistory((prev) => [...prev, trimmed]);
        }
        setHistoryIndex(-1);
        setInputValue('');

        const result = executeCommand(trimmed, [...commandHistory, trimmed]);

        if (result.type === 'noop') return;

        if (result.type === 'clear') {
            setEntries([]);
            return;
        }

        if (result.type === 'close') {
            onClose();
            return;
        }

        if (result.type === 'async') {
            await runAsyncCommand(result.steps);
            return;
        }

        if (result.type === 'download') {
            const link = document.createElement('a');
            link.href = result.url;
            link.download = result.filename;
            link.rel = 'noopener';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            appendEntry({ type: 'output', lines: result.lines });
            return;
        }

        appendEntry({ type: 'output', lines: result.lines });
    }, [appendEntry, commandHistory, isProcessing, onClose, runAsyncCommand]);

    const handleSubmit = (e) => {
        e.preventDefault();
        processCommand(inputValue);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const partial = inputValue.trim().toLowerCase();
            if (!partial) return;
            const matches = TERMINAL_COMMANDS.filter((cmd) => cmd.startsWith(partial));
            if (matches.length === 1) {
                setInputValue(matches[0]);
            } else if (matches.length > 1) {
                appendEntry({ type: 'output', lines: matches });
            }
            return;
        }

        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length === 0) return;
            const newIndex = historyIndex < 0
                ? commandHistory.length - 1
                : Math.max(0, historyIndex - 1);
            setHistoryIndex(newIndex);
            setInputValue(commandHistory[newIndex]);
            return;
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < 0) return;
            const newIndex = historyIndex + 1;
            if (newIndex >= commandHistory.length) {
                setHistoryIndex(-1);
                setInputValue('');
            } else {
                setHistoryIndex(newIndex);
                setInputValue(commandHistory[newIndex]);
            }
        }
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const timer = setTimeout(() => inputRef.current?.focus(), 100);

        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEscape);

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleEscape);
            sessionIdRef.current += 1;
        };
    }, [onClose]);

    useEffect(() => {
        scrollToBottom();
    }, [entries, scrollToBottom]);

    return (
        <motion.div
            className="terminal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            role="presentation"
        >
            <motion.div
                className="terminal-window"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                onClick={(e) => {
                    e.stopPropagation();
                    inputRef.current?.focus();
                }}
                role="dialog"
                aria-modal="true"
                aria-label="Developer terminal"
            >
                <div className="terminal-header">
                    <div className="terminal-controls">
                        <button
                            type="button"
                            className="terminal-control terminal-control--close"
                            onClick={onClose}
                            aria-label="Close terminal"
                        />
                        <span className="terminal-control terminal-control--minimize" aria-hidden="true" />
                        <span className="terminal-control terminal-control--maximize" aria-hidden="true" />
                    </div>
                    <span className="terminal-title">frin@portfolio</span>
                    <button
                        type="button"
                        className="terminal-mobile-close"
                        onClick={onClose}
                        aria-label="Close terminal"
                    >
                        ✕
                    </button>
                </div>

                <div className="terminal-body" ref={bodyRef}>
                    {entries.map((entry) => {
                        if (entry.type === 'input') {
                            return (
                                <div key={entry.id} className="terminal-line terminal-line--input">
                                    {entry.text}
                                </div>
                            );
                        }

                        if (entry.type === 'access-granted') {
                            return (
                                <div key={entry.id} className="terminal-line terminal-line--granted">
                                    {entry.text}
                                </div>
                            );
                        }

                        if (entry.type === 'hire-actions') {
                            return (
                                <div key={entry.id} className="terminal-actions">
                                    {entry.actions.map((action) =>
                                        action.internal ? (
                                            <Link
                                                key={action.label}
                                                to={action.url}
                                                className="terminal-action-btn"
                                                onClick={onClose}
                                            >
                                                [ {action.label} ]
                                            </Link>
                                        ) : (
                                            <a
                                                key={action.label}
                                                href={action.url}
                                                target={action.url.startsWith('mailto:') ? undefined : '_blank'}
                                                rel="noopener noreferrer"
                                                className="terminal-action-btn"
                                                download={action.label === 'Resume' ? 'Frin_Patel_Resume.pdf' : undefined}
                                            >
                                                [ {action.label} ]
                                            </a>
                                        )
                                    )}
                                </div>
                            );
                        }

                        return (
                            <div key={entry.id} className="terminal-block">
                                {entry.lines.map((line, index) => renderLine(line, `${entry.id}-${index}`))}
                            </div>
                        );
                    })}

                    <form className="terminal-input-row" onSubmit={handleSubmit}>
                        <label htmlFor="terminal-input" className="terminal-prompt">{PROMPT}</label>
                        <input
                            id="terminal-input"
                            ref={inputRef}
                            type="text"
                            className="terminal-input"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={isProcessing}
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="off"
                            spellCheck={false}
                            aria-label="Terminal command input"
                        />
                    </form>
                </div>
            </motion.div>
        </motion.div>
    );
};

const SecretTerminal = () => {
    const { isOpen, terminalSession, closeTerminal } = useTerminal();

    return (
        <AnimatePresence>
            {isOpen && (
                <TerminalSession key={terminalSession} onClose={closeTerminal} />
            )}
        </AnimatePresence>
    );
};

export default SecretTerminal;
