/**
 * Dynamic project page renderer using HTML Templates
 */

// Helper to get and clone a template
function cloneTemplate(id) {
    const template = document.getElementById(id);
    if (!template) return null;
    return template.content.cloneNode(true);
}

function renderProject(project) {
    const container = document.getElementById('project-container');
    container.innerHTML = ''; // Clear container

    // Append Header
    container.appendChild(createHeader(project));

    // Append Overview
    if (project.overview) {
        container.appendChild(createOverview(project.overview));
    }

    // Append Sections
    if (project.sections) {
        project.sections.forEach(section => {
            container.appendChild(createSection(section));
        });
    }

    // Append Links
    if (project.links) {
        container.appendChild(createLinks(project.links));
    }
}

function createHeader(project) {
    const { title, subtitle, meta, techStack } = project;
    const fragment = cloneTemplate('tpl-header');

    fragment.querySelector('.project-title').textContent = title;
    
    const subtitleEl = fragment.querySelector('.project-subtitle');
    if (subtitle) {
        subtitleEl.textContent = subtitle;
    } else {
        subtitleEl.remove();
    }

    // Render Meta Items
    const metaContainer = fragment.querySelector('.project-meta');
    Object.entries(meta).forEach(([key, value]) => {
        const metaItem = cloneTemplate('tpl-meta-item');
        metaItem.querySelector('.meta-label').textContent = `${capitalizeFirst(key)}:`;
        metaItem.querySelector('.meta-value').textContent = value;
        metaContainer.appendChild(metaItem);
    });

    // Render Tech Badges
    const techContainer = fragment.querySelector('.tech-stack');
    techStack.forEach(tech => {
        const span = document.createElement('span');
        span.className = 'tech-badge';
        span.textContent = tech;
        techContainer.appendChild(span);
    });

    return fragment;
}

function createOverview(overview) {
    const fragment = cloneTemplate('tpl-overview');
    fragment.querySelector('.problem-text').textContent = overview.problem;
    fragment.querySelector('.solution-text').textContent = overview.solution;
    return fragment;
}

function createSection(sectionData) {
    const { title, type, content, metrics } = sectionData;
    const fragment = cloneTemplate('tpl-section');
    
    fragment.querySelector('.section-title').textContent = title;
    const contentArea = fragment.querySelector('.section-content');

    // Determine content type
    switch (type) {
        case 'approach':
            content.forEach(item => {
                const itemFrag = cloneTemplate('tpl-approach-item');
                itemFrag.querySelector('.approach-heading').textContent = item.heading;
                itemFrag.querySelector('.approach-description').textContent = item.description;
                const note = itemFrag.querySelector('.technical-note');
                item.technical_note ? (note.textContent = item.technical_note) : note.remove();
                contentArea.appendChild(itemFrag);
            });
            break;

        case 'challenges':
            const grid = document.createElement('div');
            grid.className = 'challenge-grid';
            content.forEach(item => {
                const itemFrag = cloneTemplate('tpl-challenge-item');
                itemFrag.querySelector('.challenge-title').textContent = item.challenge;
                itemFrag.querySelector('.solution-text').textContent = item.solution;
                grid.appendChild(itemFrag);
            });
            contentArea.appendChild(grid);
            break;

        case 'results':
            const metricsGrid = document.createElement('div');
            metricsGrid.className = 'metrics-grid';
            metrics.forEach(metric => {
                const metricFrag = cloneTemplate('tpl-metric-card');
                metricFrag.querySelector('.metric-value').textContent = metric.value;
                metricFrag.querySelector('.metric-label').textContent = metric.label;
                metricFrag.querySelector('.metric-description').textContent = metric.description;
                metricsGrid.appendChild(metricFrag);
            });
            contentArea.appendChild(metricsGrid);
            break;

        default:
            const list = Array.isArray(content) ? content : [content];
            list.forEach(text => {
                const p = document.createElement('p');
                p.textContent = text;
                contentArea.appendChild(p);
            });
    }

    return fragment;
}

function createLinks(links) {
    const wrapper = document.createElement('div');
    wrapper.className = 'project-links';

    Object.entries(links).forEach(([type, url]) => {
        if (!url) return;
        const linkFrag = cloneTemplate('tpl-link');
        const anchor = linkFrag.querySelector('.project-link');
        anchor.href = url;
        linkFrag.querySelector('.link-text').textContent = capitalizeFirst(type);
        linkFrag.querySelector('.link-icon').innerHTML = getLinkIcon(type);
        wrapper.appendChild(linkFrag);
    });

    return wrapper.children.length > 0 ? wrapper : document.createDocumentFragment();
}

function cloneTemplate(id) {
    const template = document.getElementById(id)
    if (!template) return null;
    return template.content.cloneNode(true);
}

// Utility functions
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getLinkIcon(type) {
    return `<svg>...</svg>`;
}

