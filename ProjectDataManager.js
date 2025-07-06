// Fetches all project data from a single endpoint and populates HTML
export class ProjectDataManager {
    constructor() {
        this.apiUrl = "https://api.npoint.io/dd81fdb503bd19557a5e";
        this.projects = null;
    }

    // Simple fetch function
    async fetchProjects() {
        try {
            const response = await fetch(this.apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            this.projects = await response.json();

            return this.projects;
            } catch (error) {
                console.error('Failed to fetch projects:', error);
            }
    }

    // Get single project by ID
    getProject(projectId) {
        if (!this.projects || this.projects.length === 0) {
            console.error('Projects not loaded. Call fetchProjects() first.');
            return null;
        }
        if (!projectId) {
            console.error('Project ID is required to fetch a project.');
            return null;
        }
        // Find the project by ID
        const project = Object.values(this.projects).find(project => project.project_id.toLowerCase().trim() === projectId.toLowerCase().trim());

        if (!project) {
            console.error('Project not found:', projectId);
        }
        
        return project;
    }

    // Get all projects
    getAllProjects() {
        return this.projects || [];
    }
}

// Simple function to populate the HTML with project data
export async function populateProjectPage(projectId, dataManager) {
    // Fetch all projects
    await dataManager.fetchProjects();

    // Get specific project
    const project = dataManager.getProject(projectId);
    if (!project) return;

    // Populate header
    const title = document.querySelector('.project-header h1');
    const tagline = document.querySelector('.project-tagline');
    const status = document.querySelector('.project-status');
    const navTitle = document.querySelector('.project-title-nav');

    // Update header elements
    if (title) title.textContent = project.project_name;
    if (tagline) tagline.textContent = project.tagline;
    if (status) status.textContent = `Status: ${project.status.charAt(0).toUpperCase() + project.status.slice(1)}`;
    if (navTitle) navTitle.textContent = project.project_name;

    // Populate quick actions
    const demoLink = document.querySelector('.action-button.demo');
    const sourceLink = document.querySelector('.action-button.source');
    const docLink = document.querySelector('.action-button.documentation');

    if (demoLink && project.links.demo) demoLink.href = project.links.demo;
    if (sourceLink && project.links.source_code) sourceLink.href = project.links.source_code;
    if (docLink && project.links.documentation) docLink.href = project.links.documentation;

    // Populate overview
    const overview = document.querySelector('.project-overview');
    if (overview) {
        overview.innerHTML = `<p>${project.description}</p>`;
    }

    // Populate tech stack (required)
    const techStack = document.querySelector('.tech-stack');
    if (techStack && project.tech_stack) {
        techStack.innerHTML = project.tech_stack
        .map(tech => `<span class="tech-tag">${tech}</span>`)
        .join('');
    }

    // Populate stats
    const statsCard = document.querySelector('.stats-card');
    if (statsCard && project.stats && Object.keys(project.stats).length > 0) {
        statsCard.style.display = '';
        statsCard.innerHTML = `
            <h3>// Project Stats</h3>
            <div class="project-stats">
                ${project.stats.months ? `<div class="stat-item"><div class="stat-number">${project.stats.months}</div><div class="stat-label">Months</div></div>` : ''}
                ${project.stats.features ? `<div class="stat-item"><div class="stat-number">${project.stats.features}</div><div class="stat-label">Features</div></div>` : ''}
                ${project.stats.lines_of_code ? `<div class="stat-item"><div class="stat-number">${project.stats.lines_of_code >= 1000 ? Math.floor(project.stats.lines_of_code / 1000) + 'K+' : project.stats.lines_of_code}</div><div class="stat-label">Lines of Code</div></div>` : ''}
                ${project.stats.iterations ? `<div class="stat-item"><div class="stat-number">${project.stats.iterations}</div><div class="stat-label">Iterations</div></div>` : ''}
            </div>
        `;
    } else if (statsCard) {
        statsCard.style.display = 'none';
    }

    // Populate timeline
    const timelineCard = document.querySelector('.timeline-card');
    if (timelineCard && project.timeline && Object.keys(project.timeline).length > 0) {
        timelineCard.style.display = '';
        let timelineHTML = '<h3>// Timeline</h3>';
        if (project.timeline.started) timelineHTML += `<p><strong>Started:</strong> ${project.timeline.started}</p>`;
        if (project.timeline.mvp) timelineHTML += `<p><strong>MVP:</strong> ${project.timeline.mvp}</p>`;
        if (project.timeline.beta) timelineHTML += `<p><strong>Beta:</strong> ${project.timeline.beta}</p>`;
        if (project.timeline.launch) timelineHTML += `<p><strong>Launch:</strong> ${project.timeline.launch}</p>`;
        timelineCard.innerHTML = timelineHTML;
    } else if (timelineCard) {
        timelineCard.style.display = 'none';
    }

    // Populate key features (required)
    const featureGrid = document.querySelector('.feature-grid');
    if (featureGrid && project.key_features) {
        featureGrid.innerHTML = project.key_features
            .map(feature => `
                <div class="feature-item">
                    <h4>${feature.name}</h4>
                    <p>${feature.description}</p>
                </div>
            `)
            .join('');
    }
    const featureDesc = document.querySelector('.feature-description');
    if (featureDesc && project.features_description) {
        featureDesc.textContent = project.features_description;
    }
    
    // Challenges & Solutions (optional)
    const challengesSection = document.querySelector('.challenges-section');
    const challengesContent = document.querySelector('.challenges-content');
    if (challengesSection && challengesContent && project.challenges_solutions && project.challenges_solutions.length > 0) {
        challengesSection.style.display = '';
        challengesContent.innerHTML = project.challenges_solutions
            .map(item => `
                <div class="challenge-item">
                    <h4>${item.challenge}</h4>
                    <p>${item.challenge_description}</p>
                    <div class="solution">
                        <div class="solution-label">SOLUTION:</div>
                        <p>${item.solution}</p>
                    </div>
                </div>
            `)
            .join('');
    } else if (challengesSection) {
        challengesSection.style.display = 'none';
    }

    // Code Highlights (optional)
    const codeSection = document.querySelector('.code-section');
    const codeTitle = document.querySelector('.code-title');
    const codeBlock = document.querySelector('.code-content');
    const codeOverview = document.querySelector('.section-overview');
    const codeDesc = document.querySelector('.code-description');

    if (codeSection && project.code_highlights) {
        codeSection.style.display = '';
        if (codeTitle) codeTitle.textContent = project.code_highlights.file_name || '';
        if (codeBlock) codeBlock.textContent = project.code_highlights.code_highlight || '';
        if (codeOverview) codeOverview.textContent = project.code_highlights.overview || '';
        if (codeDesc) codeDesc.textContent = project.code_highlights.description || '';
    } else if (codeSection) {
        codeSection.style.display = 'none';
    }

    // Lessons Learned (optional)
    const lessonsSection = document.querySelector('.lessons-section');
    const lessonsList = document.querySelector('.lessons-list');
    if (lessonsSection && lessonsList && project.lessons_learned && project.lessons_learned.length > 0) {
        lessonsSection.style.display = '';
        lessonsList.innerHTML = project.lessons_learned
            .map(lesson => `<li>${lesson}</li>`)
            .join('');
    } else if (lessonsSection) {
        lessonsSection.style.display = 'none';
    }

    // Future Enhancements (optional)
    const enhancementsSection = document.querySelector('.enhancements-section');
    const enhancementsGrid = document.querySelector('.enhancements-grid');
    if (enhancementsSection && enhancementsGrid && project.future_enhancements && project.future_enhancements.length > 0) {
        enhancementsSection.style.display = '';
        enhancementsGrid.innerHTML = project.future_enhancements
            .map(enhancement => `
                <div class="feature-item">
                    <h4>${enhancement.name}</h4>
                    <p>${enhancement.description}</p>
                </div>
            `)
            .join('');
    } else if (enhancementsSection) {
        enhancementsSection.style.display = 'none';
    }
}

