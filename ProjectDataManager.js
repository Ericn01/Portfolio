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
    if (!project) {
        console.error('Project not found:', projectId);
        return;
    }

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

    // Populate tech stack
    const techStack = document.querySelector('.tech-stack');
    if (techStack && project.tech_stack) {
        techStack.innerHTML = project.tech_stack
        .map(tech => `<span class="tech-tag">${tech}</span>`)
        .join('');
    }

    // Populate stats
    const statItems = document.querySelectorAll('.stat-item');
    if (statItems.length >= 4) {
        statItems[0].querySelector('.stat-number').textContent = project.stats.months;
        statItems[1].querySelector('.stat-number').textContent = project.stats.features || 0;
        statItems[2].querySelector('.stat-number').textContent = project.stats.lines_of_code >= 1000 ? 
        Math.floor(project.stats.lines_of_code / 1000) + 'K+' : project.stats.lines_of_code;
        statItems[3].querySelector('.stat-number').textContent = project.stats.iterations || 0;
    }

    // Populate timeline
    const timelineCard = document.querySelector('.timeline-card');
    if (timelineCard && project.timeline) {
        let timelineHTML = '<h3>// Timeline</h3>';
        if (project.timeline.started) timelineHTML += `<p><strong>Started:</strong> ${project.timeline.started}</p>`;
        if (project.timeline.mvp) timelineHTML += `<p><strong>MVP:</strong> ${project.timeline.mvp}</p>`;
        if (project.timeline.beta) timelineHTML += `<p><strong>Beta:</strong> ${project.timeline.beta}</p>`;
        if (project.timeline.launch) timelineHTML += `<p><strong>Launch:</strong> ${project.timeline.launch}</p>`;
        timelineCard.innerHTML = timelineHTML;
    }

    // Populate key features
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

    // Populate challenges & solutions
    const challengesSection = document.querySelector('.challenges-content');
    if (challengesSection && project.challenges_solutions) {
        challengesSection.innerHTML = project.challenges_solutions
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
    }

// Populate code highlights
const codeSection = document.querySelector('.code-snippet');
if (codeSection && project.code_highlights) {
    const codeTitle = codeSection.querySelector('.code-title');
    const codeBlock = codeSection.querySelector('code');
    
    if (codeTitle) codeTitle.textContent = project.code_highlights.file_name;
    if (codeBlock) codeBlock.textContent = project.code_highlights.code_highlight;
}

// Populate lessons learned
const lessonsSection = document.querySelector('.lessons-list');
if (lessonsSection && project.lessons_learned) {
    lessonsSection.innerHTML = project.lessons_learned
    .map(lesson => `<li>${lesson}</li>`)
    .join('');
}

    // Populate future enhancements
    const enhancementsGrid = document.querySelector('.enhancements-grid');
    if (enhancementsGrid && project.future_enhancements) {
        enhancementsGrid.innerHTML = project.future_enhancements
        .map(enhancement => `
            <div class="feature-item">
            <h4>${enhancement.name}</h4>
            <p>${enhancement.description}</p>
            </div>
        `)
        .join('');
    }
}

