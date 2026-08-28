import {
    DEVELOPER_PROFILE,
    SKILLS,
    PROJECTS,
    CONTACT,
    TERMINAL_ANIME_QUOTES,
} from '../data/portfolioData';

const HELP_TEXT = [
    'AVAILABLE COMMANDS',
    '',
    'whoami       About the developer',
    'skills       View technical skills',
    'projects     Explore featured projects',
    'anime        Get some motivation',
    'contact      Contact Frin',
    'resume       Download resume PDF',
    'history      Command history',
    'clear        Clear terminal',
    'exit         Close terminal',
    '',
    'There may be one more command hidden…',
];

const HIRE_SEQUENCE = [
    { text: '', delay: 0 },
    { text: '[sudo] verifying candidate…', delay: 500 },
    { text: '', delay: 200 },
    { text: 'Running candidate checks…', delay: 400 },
    { text: '', delay: 200 },
    { text: 'Projects ……………… PASS', delay: 350 },
    { text: 'Backend Development ….. PASS', delay: 350 },
    { text: 'Full-Stack Development .. PASS', delay: 350 },
    { text: 'Problem Solving ……… PASS', delay: 350 },
    { text: 'Coffee Dependency ……. CRITICAL', delay: 400 },
    { text: '', delay: 200 },
    { text: 'Candidate verification complete.', delay: 500 },
    { text: '', delay: 100 },
    { type: 'access-granted', text: 'ACCESS GRANTED', delay: 300 },
    { text: '', delay: 100 },
    { text: 'Recruiter protocol activated.', delay: 300 },
    { type: 'hire-actions', delay: 200 },
];

export function getInitialOutput() {
    return [
        { id: 'init-1', type: 'output', lines: ['FrinOS v1.0', 'Portfolio Terminal', '', "Type 'help' to explore."] },
    ];
}

export function executeCommand(rawInput, sessionHistory) {
    const input = rawInput.trim();
    const cmd = input.toLowerCase();

    if (!cmd) {
        return { type: 'noop' };
    }

    switch (cmd) {
        case 'help':
            return { type: 'output', lines: HELP_TEXT };

        case 'whoami':
            return {
                type: 'output',
                lines: [
                    DEVELOPER_PROFILE.name,
                    DEVELOPER_PROFILE.title,
                    '',
                    ...DEVELOPER_PROFILE.summary,
                ],
            };

        case 'skills': {
            const lines = [];
            Object.entries(SKILLS).forEach(([category, items]) => {
                lines.push(category);
                items.forEach((skill) => lines.push(skill));
                lines.push('');
            });
            return { type: 'output', lines: lines.slice(0, -1) };
        }

        case 'projects': {
            const lines = [];
            PROJECTS.forEach((project, index) => {
                if (index > 0) lines.push('');
                lines.push(project.name);
                lines.push(project.description);
                lines.push(`Tech: ${project.technologies.join(', ')}`);
                if (project.github) lines.push({ type: 'link', label: 'GitHub', url: project.github });
                if (project.live) lines.push({ type: 'link', label: 'Live', url: project.live });
            });
            return { type: 'output', lines };
        }

        case 'anime': {
            const quote = TERMINAL_ANIME_QUOTES[Math.floor(Math.random() * TERMINAL_ANIME_QUOTES.length)];
            return {
                type: 'output',
                lines: [`"${quote.quote}"`, `— ${quote.author}`],
            };
        }

        case 'contact':
            return {
                type: 'output',
                lines: [
                    'CONTACT',
                    '',
                    { type: 'link', label: 'Email', url: `mailto:${CONTACT.email}`, display: CONTACT.email },
                    `Phone       ${CONTACT.phone}`,
                    { type: 'link', label: 'LinkedIn', url: CONTACT.linkedin },
                    { type: 'link', label: 'GitHub', url: CONTACT.github },
                    '',
                    "Let's build something.",
                ],
            };

        case 'resume':
            return {
                type: 'download',
                url: CONTACT.resume,
                filename: 'Frin_Patel_Resume.pdf',
                lines: ['Fetching resume…', 'Download started.'],
            };

        case 'history': {
            if (sessionHistory.length === 0) {
                return { type: 'output', lines: ['No commands in history yet.'] };
            }
            return {
                type: 'output',
                lines: sessionHistory.map((entry, i) => `  ${i + 1}  ${entry}`),
            };
        }

        case 'clear':
            return { type: 'clear' };

        case 'exit':
            return { type: 'close' };

        case 'sudo hire frin':
            return { type: 'async', steps: HIRE_SEQUENCE };

        default:
            return {
                type: 'output',
                lines: [
                    `command not found: ${input}`,
                    "Type 'help' for available commands.",
                ],
            };
    }
}

export function getHireActions() {
    return [
        { label: 'Email Frin', url: `mailto:${CONTACT.email}` },
        { label: 'LinkedIn', url: CONTACT.linkedin },
        { label: 'Resume', url: CONTACT.resume },
        { label: 'Contact Me', url: CONTACT.contactPath, internal: true },
    ];
}
