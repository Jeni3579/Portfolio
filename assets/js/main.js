/* ============================================
   JENI KADARIYA - Cybersecurity Portfolio
   Main JavaScript File
   ============================================ */

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'light') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Sticky Navbar
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'var(--bg-primary)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'var(--bg-primary)';
        navbar.style.boxShadow = 'none';
    }
});

// Scroll Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card, .project-card, .skill-category, .about-grid').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Project Modal
const modal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');

const projectDetails = {
    1: {
        title: 'Web Application Security Audit',
        problem: 'The web application had multiple security vulnerabilities that could lead to data breaches and system compromise.',
        approach: 'Conducted comprehensive security assessment using Nmap, WPScan, Hydra, SQLMap, and Metasploit. Followed NIST and OWASP frameworks.',
        tools: 'Nmap, WPScan, Hydra, SQLMap, Metasploit, Burp Suite, Snort/Suricata',
        result: 'Identified weak MySQL credentials, outdated plugins, input validation flaws, and privilege escalation vectors. Provided detailed remediation plan.'
    },
    2: {
        title: 'AI-Powered Healthcare Security System',
        problem: 'Healthcare institutions need proactive threat detection to protect patient data from ransomware and unauthorized access.',
        approach: 'Built Random Forest classifier on security event logs. Implemented RSA+AES hybrid encryption for patient records. Created dual-portal Flask application.',
        tools: 'Python, Flask, scikit-learn, Random Forest, RSA, AES, Chart.js',
        result: 'Achieved 98.5% detection accuracy with 0.5% false positive rate. System successfully classifies malware, ransomware, and unauthorized access.'
    },
    3: {
        title: 'Digital Forensic Investigation',
        problem: 'Suspicious activity reported on a startup company computer requiring forensic examination.',
        approach: 'Analyzed EnCase image files using Autopsy. Performed malware hash verification via VirusTotal. Analyzed file entropy for encrypted content.',
        tools: 'Autopsy, EnCase E01, VirusTotal, SHA256, Entropy Analysis',
        result: 'Confirmed Trojan malware downloads from MalwareBazaar. Identified encrypted files and evidence deletion patterns. Reconstructed attack timeline.'
    },
    4: {
        title: 'UFW Firewall Management Tool',
        problem: 'Users need an intuitive interface to manage firewall rules without memorizing complex iptables commands.',
        approach: 'Built Tkinter GUI that abstracts UFW commands. Implemented functions for enabling/disabling firewall, adding rules, and blocking ports.',
        tools: 'Python, Tkinter, UFW, subprocess, unittest',
        result: 'User-friendly firewall management tool that simplifies network access control for non-technical users.'
    },
    5: {
        title: 'Multi-Threaded Port Scanner',
        problem: 'Network administrators need efficient port scanning for vulnerability assessment.',
        approach: 'Implemented TCP connect scanning with concurrent threading for performance. Built Tkinter GUI with real-time updates and results export.',
        tools: 'Python, Tkinter, Socket Programming, Threading',
        result: 'Fast, multi-threaded port scanner that automates vulnerability assessment phase.'
    }
};

document.querySelectorAll('.view-details').forEach(button => {
    button.addEventListener('click', () => {
        const projectId = button.getAttribute('data-project');
        const project = projectDetails[projectId];
        
        if (project && modal) {
            modalBody.innerHTML = `
                <h2 style="color: var(--accent-green); margin-bottom: 20px;">${project.title}</h2>
                <div style="margin-bottom: 20px;"><h3 style="color: var(--accent-green); margin-bottom: 10px;">Problem</h3><p style="color: var(--text-secondary);">${project.problem}</p></div>
                <div style="margin-bottom: 20px;"><h3 style="color: var(--accent-green); margin-bottom: 10px;">Approach</h3><p style="color: var(--text-secondary);">${project.approach}</p></div>
                <div style="margin-bottom: 20px;"><h3 style="color: var(--accent-green); margin-bottom: 10px;">Tools Used</h3><div style="display: flex; flex-wrap: wrap; gap: 8px;">${project.tools.split(', ').map(tool => `<span style="background: var(--bg-hover); padding: 4px 12px; border-radius: 4px; font-size: 0.8rem;">${tool}</span>`).join('')}</div></div>
                <div><h3 style="color: var(--accent-green); margin-bottom: 10px;">Result / Learning</h3><p style="color: var(--text-secondary);">${project.result}</p></div>
            `;
            modal.classList.add('active');
        }
    });
});

const modalClose = document.querySelector('.modal-close');
if (modalClose) {
    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
    });
}

window.addEventListener('click', (e) => {
    if (modal && e.target === modal) {
        modal.classList.remove('active');
    }
});

// Active Navigation Link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// Console Welcome
console.log('%c╔═══════════════════════════════════════════════════════════╗\n║                                                           ║\n║   🔐 JENI KADARIYA | Cybersecurity Portfolio              ║\n║   Kali Linux Themed Portfolio                             ║\n║                                                           ║\n║   Contact: kadariyajennie3579@gmail.com                  ║\n║   GitHub: https://github.com/Jeni3579                    ║\n║                                                           ║\n╚═══════════════════════════════════════════════════════════╝', 'color: #00cc00; font-family: monospace;');