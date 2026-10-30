/**
 * Web Technology Lab - Practical Record Portal
 * Application Controller Script
 */

(function () {
    'use strict';

    // Application State
    let currentExpId = 1;
    let selectedCategory = 'ALL';
    let searchQuery = '';
    let currentTab = 'code';

    // DOM Elements
    const elements = {
        themeToggleBtn: document.getElementById('themeToggleBtn'),
        themeIconSun: document.getElementById('themeIconSun'),
        themeIconMoon: document.getElementById('themeIconMoon'),
        searchInput: document.getElementById('searchInput'),
        searchClearBtn: document.getElementById('searchClearBtn'),
        categoryFilterBar: document.getElementById('categoryFilterBar'),
        experimentsListContainer: document.getElementById('experimentsListContainer'),
        
        // Experiment Hero elements
        expNumberBadge: document.getElementById('expNumberBadge'),
        expCategoryBadge: document.getElementById('expCategoryBadge'),
        expCounterBadge: document.getElementById('expCounterBadge'),
        expTitle: document.getElementById('expTitle'),
        expAim: document.getElementById('expAim'),
        activeExpStat: document.getElementById('activeExpStat'),
        fileInfoBadge: document.getElementById('fileInfoBadge'),

        // Action Buttons
        copyFullProgramBtn: document.getElementById('copyFullProgramBtn'),
        copyBtnText: document.getElementById('copyBtnText'),
        copyAimTitleBtn: document.getElementById('copyAimTitleBtn'),
        downloadHtmlBtn: document.getElementById('downloadHtmlBtn'),
        downloadBtnText: document.getElementById('downloadBtnText'),
        openExternalBtn: document.getElementById('openExternalBtn'),
        reloadPreviewBtn: document.getElementById('reloadPreviewBtn'),

        // Tabs & Content
        tabs: document.querySelectorAll('.tab-btn'),
        tabContents: document.querySelectorAll('.tab-content'),
        codeBlock: document.getElementById('codeBlock'),
        previewIframe: document.getElementById('previewIframe'),
        sampleOutputBlock: document.getElementById('sampleOutputBlock'),

        // Navigation
        prevExpBtn: document.getElementById('prevExpBtn'),
        nextExpBtn: document.getElementById('nextExpBtn'),
        prevExpTitle: document.getElementById('prevExpTitle'),
        nextExpTitle: document.getElementById('nextExpTitle'),

        // Mobile Sidebar
        mobileMenuBtn: document.getElementById('mobileMenuBtn'),
        appSidebar: document.getElementById('appSidebar'),
        sidebarBackdrop: document.getElementById('sidebarBackdrop'),

        // Toast Container
        toastContainer: document.getElementById('toastContainer'),

        // Modal
        exportModal: document.getElementById('exportModal'),
        openExportModalBtn: document.getElementById('openExportModalBtn'),
        closeExportModalBtn: document.getElementById('closeExportModalBtn'),
        closeModalFooterBtn: document.getElementById('closeModalFooterBtn'),
        modalExpPills: document.getElementById('modalExpPills'),
        allProgramsTextArea: document.getElementById('allProgramsTextArea'),
        copyAllCombinedBtn: document.getElementById('copyAllCombinedBtn')
    };

    /**
     * Initialize Application
     */
    function init() {
        initTheme();
        checkHashRoute();
        renderSidebar();
        loadExperiment(currentExpId, false);
        initEventListeners();
        initModalContent();
    }

    /**
     * Handle Theme (Dark / Light)
     */
    function initTheme() {
        const savedTheme = localStorage.getItem('gowtham_lab_theme') || 'dark';
        applyTheme(savedTheme);
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('gowtham_lab_theme', theme);

        if (theme === 'light') {
            elements.themeIconSun.style.display = 'none';
            elements.themeIconMoon.style.display = 'block';
        } else {
            elements.themeIconSun.style.display = 'block';
            elements.themeIconMoon.style.display = 'none';
        }
    }

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
        showToast('Theme Updated', `Switched to ${nextTheme === 'dark' ? 'Dark' : 'Light'} theme`);
    }

    /**
     * URL Hash Routing (#exp1, #exp2, etc.)
     */
    function checkHashRoute() {
        const hash = window.location.hash.toLowerCase();
        const match = hash.match(/#exp(\d+)/);
        if (match) {
            const expNum = parseInt(match[1], 10);
            if (expNum >= 1 && expNum <= EXPERIMENTS.length) {
                currentExpId = expNum;
            }
        }
    }

    function updateHashRoute(id) {
        if (history.replaceState) {
            history.replaceState(null, null, `#exp${id}`);
        } else {
            window.location.hash = `#exp${id}`;
        }
    }

    /**
     * Render the Sidebar List of Experiments
     */
    function renderSidebar() {
        const query = searchQuery.toLowerCase().trim();
        const filtered = EXPERIMENTS.filter(exp => {
            const matchesCategory = selectedCategory === 'ALL' || exp.category === selectedCategory;
            const matchesSearch = !query ||
                exp.id.toString() === query ||
                exp.title.toLowerCase().includes(query) ||
                exp.aim.toLowerCase().includes(query) ||
                exp.tags.some(tag => tag.toLowerCase().includes(query));
            return matchesCategory && matchesSearch;
        });

        elements.experimentsListContainer.innerHTML = '';

        if (filtered.length === 0) {
            elements.experimentsListContainer.innerHTML = `
                <div style="padding: 2rem 1rem; text-align: center; color: var(--text-muted);">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin: 0 auto 0.5rem; display: block; opacity: 0.5;">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <p style="font-size: 0.88rem; font-weight: 500;">No experiments found</p>
                    <p style="font-size: 0.75rem; margin-top: 0.25rem;">Try adjusting your search query or filter</p>
                </div>
            `;
            return;
        }

        filtered.forEach(exp => {
            const isActive = exp.id === currentExpId;
            const item = document.createElement('div');
            item.className = `exp-item ${isActive ? 'active' : ''}`;
            item.dataset.id = exp.id;

            const padNum = String(exp.id).padStart(2, '0');

            item.innerHTML = `
                <div class="exp-number-badge">${padNum}</div>
                <div class="exp-info">
                    <div class="exp-info-title">${exp.id}. ${escapeHtml(exp.shortTitle || exp.title)}</div>
                    <div class="exp-info-category">
                        <span>${escapeHtml(exp.category)}</span>
                    </div>
                </div>
                <button class="exp-quick-copy" title="Quick copy program code" aria-label="Copy code for experiment ${exp.id}">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                </button>
            `;

            // Click on the item row loads the experiment
            item.addEventListener('click', (e) => {
                // If quick copy button was clicked
                if (e.target.closest('.exp-quick-copy')) {
                    e.stopPropagation();
                    copyExperimentCode(exp);
                    return;
                }
                loadExperiment(exp.id);
                closeMobileSidebar();
            });

            elements.experimentsListContainer.appendChild(item);
        });
    }

    /**
     * Load Experiment Details into Main Viewer
     */
    function loadExperiment(id, scrollContent = true) {
        const exp = EXPERIMENTS.find(e => e.id === id);
        if (!exp) return;

        currentExpId = id;
        updateHashRoute(id);

        // Update active class in sidebar items
        document.querySelectorAll('.exp-item').forEach(el => {
            if (parseInt(el.dataset.id, 10) === id) {
                el.classList.add('active');
            } else {
                el.classList.remove('active');
            }
        });

        // Update Hero Details
        const padNum = String(exp.id).padStart(2, '0');
        elements.expNumberBadge.textContent = `EXPERIMENT ${padNum}`;
        elements.expCategoryBadge.textContent = exp.category;
        elements.expCounterBadge.textContent = `${exp.id} of ${EXPERIMENTS.length}`;
        elements.expTitle.textContent = `${exp.id}. ${exp.title}`;
        elements.expAim.textContent = exp.aim;
        elements.activeExpStat.innerHTML = `Current: <strong>#${exp.id}</strong>`;

        // Calculate lines of code & file name badge
        const lineCount = exp.code.split('\n').length;
        elements.fileInfoBadge.textContent = `${exp.fileName} • ${lineCount} lines`;

        // Update Code View
        renderCodeView(exp.code);

        // Update Live Interactive Preview
        renderLivePreview(exp.code);

        // Update Expected Sample Output
        elements.sampleOutputBlock.textContent = exp.sampleOutput || "No specific sample output formatted.";

        // Update Previous / Next Navigation Buttons
        updateNavigationButtons(id);

        // Reset copy button visual state
        resetCopyButton();

        // Scroll main content to top smoothly if requested
        if (scrollContent) {
            elements.expTitle.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    /**
     * Render Code with formatting & line numbers
     */
    function renderCodeView(codeText) {
        // Simple and resilient syntax highlighting generator
        const lines = codeText.split('\n');
        const formatted = lines.map((line, idx) => {
            const lineNum = String(idx + 1).padStart(2, ' ');
            const escaped = escapeHtml(line);
            return `<span style="color:var(--text-muted); user-select:none; margin-right:1.2rem; display:inline-block; width:22px; text-align:right;">${lineNum}</span>${highlightSyntax(escaped)}`;
        }).join('\n');

        elements.codeBlock.innerHTML = formatted;
    }

    /**
     * Subtle Syntax Highlighting helper
     */
    function highlightSyntax(line) {
        // Highlight HTML tags <tag> and </tag>
        line = line.replace(/(&lt;\/?[a-zA-Z0-9\-]+)(.*?)(&gt;)/g, (match, p1, p2, p3) => {
            return `<span class="hl-tag">${p1}</span>${p2}<span class="hl-tag">${p3}</span>`;
        });
        // Highlight attributes: id="", class="", etc.
        line = line.replace(/(\b[a-zA-Z\-]+)=(&quot;.*?&quot;)/g, '<span class="hl-attr">$1</span>=<span class="hl-str">$2</span>');
        // Highlight JavaScript keywords
        const keywords = ['function', 'let', 'const', 'var', 'if', 'else', 'switch', 'case', 'break', 'return', 'for', 'new'];
        keywords.forEach(kw => {
            const regex = new RegExp(`\\b(${kw})\\b`, 'g');
            line = line.replace(regex, '<span class="hl-kw">$1</span>');
        });
        return line;
    }

    /**
     * Inject code safely into the Sandboxed Preview iframe
     */
    function renderLivePreview(codeText) {
        // Enhance internal experiment styling slightly so it looks neat in the preview box
        const previewEnhancement = `
            <style>
                body {
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                    padding: 24px;
                    line-height: 1.5;
                    color: #1e293b;
                }
                button {
                    cursor: pointer;
                    padding: 6px 14px;
                    background: #2563eb;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    font-weight: 500;
                    margin: 4px 2px;
                    transition: opacity 0.2s;
                }
                button:hover {
                    opacity: 0.9;
                }
                input, select {
                    padding: 6px 10px;
                    border: 1px solid #cbd5e1;
                    border-radius: 6px;
                    margin: 4px 2px;
                }
                table {
                    border-collapse: collapse;
                    margin-top: 10px;
                    width: 100%;
                    max-width: 400px;
                }
                th, td {
                    border: 1px solid #cbd5e1;
                    padding: 8px 12px;
                    text-align: left;
                }
                th {
                    background: #f1f5f9;
                }
                pre {
                    background: #f8fafc;
                    padding: 12px;
                    border-radius: 6px;
                    border: 1px solid #e2e8f0;
                    font-family: Consolas, monospace;
                }
            </style>
        `;

        let enrichedCode = codeText;
        if (enrichedCode.includes('</head>')) {
            enrichedCode = enrichedCode.replace('</head>', `${previewEnhancement}</head>`);
        } else {
            enrichedCode = previewEnhancement + enrichedCode;
        }

        elements.previewIframe.srcdoc = enrichedCode;
    }

    /**
     * Update Next/Previous buttons
     */
    function updateNavigationButtons(id) {
        // Prev button
        if (id <= 1) {
            elements.prevExpBtn.disabled = true;
            elements.prevExpTitle.textContent = "Start of Record";
        } else {
            elements.prevExpBtn.disabled = false;
            const prevExp = EXPERIMENTS.find(e => e.id === id - 1);
            elements.prevExpTitle.textContent = prevExp ? `${prevExp.id}. ${prevExp.shortTitle}` : "";
        }

        // Next button
        if (id >= EXPERIMENTS.length) {
            elements.nextExpBtn.disabled = true;
            elements.nextExpTitle.textContent = "End of Record";
        } else {
            elements.nextExpBtn.disabled = false;
            const nextExp = EXPERIMENTS.find(e => e.id === id + 1);
            elements.nextExpTitle.textContent = nextExp ? `${nextExp.id}. ${nextExp.shortTitle}` : "";
        }
    }

    /**
     * Copy Helper with universal fallback
     */
    async function copyToClipboard(text, successTitle, successMsg) {
        let copied = false;
        if (navigator.clipboard && window.isSecureContext) {
            try {
                await navigator.clipboard.writeText(text);
                copied = true;
            } catch (err) {
                copied = false;
            }
        }

        if (!copied) {
            // Fallback via textarea
            const textArea = document.createElement("textarea");
            textArea.value = text;
            textArea.style.position = "fixed";
            textArea.style.left = "-999999px";
            textArea.style.top = "-999999px";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                copied = true;
            } catch (err) {
                console.error('Fallback copy failed', err);
            }
            document.body.removeChild(textArea);
        }

        if (copied) {
            showToast(successTitle, successMsg);
        } else {
            showToast('Copy Notice', 'Please copy manually from the code viewer', 'info');
        }
        return copied;
    }

    /**
     * Copy Current Experiment's Code
     */
    async function copyCurrentExperimentCode() {
        const exp = EXPERIMENTS.find(e => e.id === currentExpId);
        if (!exp) return;

        const success = await copyToClipboard(
            exp.code,
            `Copied Experiment ${exp.id}!`,
            `Program code for "${exp.shortTitle || exp.title}" is ready to paste.`
        );

        if (success) {
            elements.copyFullProgramBtn.classList.add('copied');
            elements.copyBtnText.textContent = "Copied to Clipboard!";
            setTimeout(resetCopyButton, 2200);
        }
    }

    /**
     * Copy specific experiment code from sidebar quick action
     */
    function copyExperimentCode(exp) {
        copyToClipboard(
            exp.code,
            `Copied Experiment ${exp.id}!`,
            `Code for "${exp.shortTitle || exp.title}" copied.`
        );
    }

    function resetCopyButton() {
        elements.copyFullProgramBtn.classList.remove('copied');
        elements.copyBtnText.textContent = "Copy Program Code";
    }

    /**
     * Copy Aim & Title for record write-up
     */
    function copyCurrentAimAndTitle() {
        const exp = EXPERIMENTS.find(e => e.id === currentExpId);
        if (!exp) return;

        const recordText = `Experiment ${exp.id}: ${exp.title}\nAim: ${exp.aim}`;
        copyToClipboard(
            recordText,
            `Title & Aim Copied!`,
            `Details for Experiment ${exp.id} copied to clipboard.`
        );
    }

    /**
     * Download Current Program as a Standalone .html File
     */
    function downloadCurrentProgram() {
        const exp = EXPERIMENTS.find(e => e.id === currentExpId);
        if (!exp) return;

        const blob = new Blob([exp.code], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = exp.fileName || `experiment_${exp.id}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        showToast("Download Started", `Saved ${exp.fileName}`);
    }

    /**
     * Open Current Experiment Standalone in New Tab
     */
    function openCurrentProgramInNewTab() {
        const exp = EXPERIMENTS.find(e => e.id === currentExpId);
        if (!exp) return;

        // Either navigate to local experiments/ folder or create Blob URL
        const localPath = `experiments/${exp.fileName}`;
        window.open(localPath, '_blank');
    }

    /**
     * Toast Notification
     */
    function showToast(title, message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = 'toast';

        const iconSvg = type === 'success'
            ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`
            : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;

        toast.innerHTML = `
            <div class="toast-icon">${iconSvg}</div>
            <div class="toast-body">
                <div class="toast-title">${escapeHtml(title)}</div>
                <div class="toast-message">${escapeHtml(message)}</div>
            </div>
        `;

        elements.toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'toastSlideOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards';
            setTimeout(() => {
                if (toast.parentElement) toast.parentElement.removeChild(toast);
            }, 300);
        }, 3000);
    }

    /**
     * Modal logic for compiling all programs
     */
    function initModalContent() {
        // Generate compile text
        let combined = `========================================================================\n`;
        combined += `            WEB TECHNOLOGY LABORATORY - PRACTICAL RECORD\n`;
        combined += `               10 Complete HTML & JavaScript Programs\n`;
        combined += `========================================================================\n\n`;

        EXPERIMENTS.forEach(exp => {
            combined += `------------------------------------------------------------------------\n`;
            combined += `EXPERIMENT ${exp.id}: ${exp.title.toUpperCase()}\n`;
            combined += `AIM: ${exp.aim}\n`;
            combined += `------------------------------------------------------------------------\n\n`;
            combined += `${exp.code}\n\n`;
            if (exp.sampleOutput) {
                combined += `SAMPLE OUTPUT:\n${exp.sampleOutput}\n\n`;
            }
            combined += `\n`;
        });

        elements.allProgramsTextArea.value = combined;

        // Generate fast jump pills in modal
        elements.modalExpPills.innerHTML = '';
        EXPERIMENTS.forEach(exp => {
            const pill = document.createElement('button');
            pill.className = 'filter-chip';
            pill.textContent = `Exp ${exp.id}`;
            pill.addEventListener('click', () => {
                loadExperiment(exp.id);
                closeModal();
            });
            elements.modalExpPills.appendChild(pill);
        });
    }

    function openModal() {
        elements.exportModal.classList.add('open');
    }

    function closeModal() {
        elements.exportModal.classList.remove('open');
    }

    /**
     * Mobile Sidebar Drawer Controls
     */
    function toggleMobileSidebar() {
        elements.appSidebar.classList.toggle('mobile-open');
        elements.sidebarBackdrop.classList.toggle('active');
    }

    function closeMobileSidebar() {
        elements.appSidebar.classList.remove('mobile-open');
        elements.sidebarBackdrop.classList.remove('active');
    }

    /**
     * Event Listeners Setup
     */
    function initEventListeners() {
        // Theme toggle
        elements.themeToggleBtn.addEventListener('click', toggleTheme);

        // Search Input
        elements.searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            elements.searchClearBtn.style.display = searchQuery ? 'block' : 'none';
            renderSidebar();
        });

        elements.searchClearBtn.addEventListener('click', () => {
            elements.searchInput.value = '';
            searchQuery = '';
            elements.searchClearBtn.style.display = 'none';
            elements.searchInput.focus();
            renderSidebar();
        });

        // Category Filter Chips
        elements.categoryFilterBar.addEventListener('click', (e) => {
            const chip = e.target.closest('.filter-chip');
            if (!chip) return;

            document.querySelectorAll('#categoryFilterBar .filter-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');

            selectedCategory = chip.dataset.category;
            renderSidebar();
        });

        // Copy Full Program Button
        elements.copyFullProgramBtn.addEventListener('click', copyCurrentExperimentCode);

        // Copy Aim & Title Button
        elements.copyAimTitleBtn.addEventListener('click', copyCurrentAimAndTitle);

        // Download Program Button
        elements.downloadHtmlBtn.addEventListener('click', downloadCurrentProgram);

        // Open in new tab
        elements.openExternalBtn.addEventListener('click', openCurrentProgramInNewTab);

        // Reload Preview Button
        elements.reloadPreviewBtn.addEventListener('click', () => {
            const exp = EXPERIMENTS.find(e => e.id === currentExpId);
            if (exp) {
                renderLivePreview(exp.code);
                showToast('Preview Reset', 'Interactive environment reloaded');
            }
        });

        // Tabs Switching
        elements.tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.dataset.tab;
                elements.tabs.forEach(t => t.classList.remove('active'));
                elements.tabContents.forEach(tc => tc.classList.remove('active'));

                tab.classList.add('active');
                const targetContent = document.getElementById(`tab-${targetTab}`);
                if (targetContent) targetContent.classList.add('active');
                currentTab = targetTab;
            });
        });

        // Next & Prev Buttons
        elements.prevExpBtn.addEventListener('click', () => {
            if (currentExpId > 1) {
                loadExperiment(currentExpId - 1);
            }
        });

        elements.nextExpBtn.addEventListener('click', () => {
            if (currentExpId < EXPERIMENTS.length) {
                loadExperiment(currentExpId + 1);
            }
        });

        // Mobile Drawer
        elements.mobileMenuBtn.addEventListener('click', toggleMobileSidebar);
        elements.sidebarBackdrop.addEventListener('click', closeMobileSidebar);

        // Modal triggers
        elements.openExportModalBtn.addEventListener('click', openModal);
        elements.closeExportModalBtn.addEventListener('click', closeModal);
        elements.closeModalFooterBtn.addEventListener('click', closeModal);
        elements.exportModal.addEventListener('click', (e) => {
            if (e.target === elements.exportModal) closeModal();
        });

        elements.copyAllCombinedBtn.addEventListener('click', () => {
            copyToClipboard(
                elements.allProgramsTextArea.value,
                'All 10 Programs Copied!',
                'The complete consolidated laboratory record has been copied.'
            );
        });

        // Keyboard Shortcuts
        document.addEventListener('keydown', (e) => {
            // Avoid when typing in inputs or textareas
            if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
                return;
            }

            if (e.key === 'ArrowLeft') {
                if (currentExpId > 1) loadExperiment(currentExpId - 1);
            } else if (e.key === 'ArrowRight') {
                if (currentExpId < EXPERIMENTS.length) loadExperiment(currentExpId + 1);
            } else if (e.key.toLowerCase() === 'c') {
                copyCurrentExperimentCode();
            } else if (e.key >= '1' && e.key <= '9') {
                const num = parseInt(e.key, 10);
                if (num <= EXPERIMENTS.length) loadExperiment(num);
            } else if (e.key === '0') {
                if (EXPERIMENTS.length >= 10) loadExperiment(10);
            } else if (e.key === 'Escape') {
                closeModal();
                closeMobileSidebar();
            }
        });
    }

    /**
     * Escape HTML characters helper
     */
    function escapeHtml(str) {
        if (!str) return '';
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // Launch
    window.addEventListener('DOMContentLoaded', init);

})();
