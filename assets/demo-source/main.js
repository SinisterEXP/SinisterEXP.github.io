// SPA Hash Router
const pages = ["home", "demos", "pastwork", "contact"];
function showPage(page) {
    pages.forEach(p => {
        document.getElementById(`page-${p}`).style.display = (p === page) ? "block" : "none";
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${page}`);
    });
    if (page === "home") renderAboutBlocks();
    if (page === "demos") renderDemos();
    if (page === "pastwork") {
        renderPastWork();
        renderStudioCollabs();
        renderIndustryReviews();
    }
}
function handleHash() {
    const hash = location.hash.replace('#', '').toLowerCase();
    if (pages.includes(hash)) {
        showPage(hash);
    } else {
        showPage("home");
    }
}
window.addEventListener('hashchange', handleHash);
document.addEventListener('DOMContentLoaded', handleHash);

// Demo data: Add Your YouTube Demos Here
const demoData = [
    {
        title: "Extended Orc Character Performance",
        description: "Primary showcase. Long-form character voice acting demonstrating grit, range, emotional control, and sustained performance.",
        url: "https://youtube.com/shorts/pWudx83pEO0?si=GLTMD0kfv1zQPhy4",
        thumb: "assets/images/demo-thumb-1.jpg"
    },
    {
        title: "Character Voice Acting Demo (2025)",
        description: "My official 2025 Voice Acting Demo — featuring 5 original characters across fantasy, horror, and cinematic genres.",
        url: "https://www.youtube.com/watch?v=WYjLp9mz4Ew",
        thumb: "assets/images/demo-thumb-2.jpg"
    }
];

// About blocks for Home Page
const aboutBlocks = [
    {
        videoUrl: "https://www.youtube.com/embed/a3FAhxzjhnc?si=5OamHFpo0bMiFY9q"
    },
    {
        text: `SinisterEXP (Jason Perkins) is a UK-based voice actor specialising in character-driven and narrative performance.<br /><br />With a background in digital storytelling and games content, I provide expressive, reliable voice work with fast turnaround and strong creative communication.`,
        img: "assets/images/jason.png"
    },
    {
        text: `Professional voice actor delivering immersive narrative, character, and atmospheric performances across games, VR, short films, and digital storytelling.<br /><br />My work has reached over 1.5 million impressions online, including over 1 million views on Peaky Blinders VR. I also collaborate with indie and VR studios to bring distinctive characters and stories to life.`,
        img: "assets/images/about.png"
    }
];

// Experience data: Add More Past Work Here
const pastWorkData = [
    {
        title: "Narrative Voiceover",
        subtitle: " Independent Film (Paid) 2nd February 2026",
        description: `Delivered a short-form narrative voiceover for an independent film project, completed and paid within 24 hours.`
    },
    {
        title: "Sinister Tales",
        subtitle: "Original Narration Series",
        description: `Creator, Writer & Lead Narrator for an original dark storytelling series focussed on immersive character-driven performance.<br><br>An expanding project that showcases range across horror, drama and myth-inspired narratives, while refining tone, pacing and emotional delivery for narrative and game-based roles.`
    }
];

// Experience data: Add More Studio Collaborations Here
const studioCollabsData = [
    {
        title: "Maze Theory",
        work: [
            "Ongoing creator partnership with early-access coverage and community engagement",
            "Active involvement in bug testing and QA feedback during development cycles",
            "Community moderator within the official Maze Theory Discord",
            "Voice acting demo submitted and under consideration for future casting opportunities",
            "Created high-performing content for Peaky Blinders VR, generating over 1,000,000+ views"
        ]
    },
    {
        title: "VRKiwi",
        work: [
            "Official partner via Xsolla influencer program",
            "Early-access coverage, reviews, and promotional content for VR titles",
            "Titles covered include Pirates VR: Jolly Roger and other upcoming releases",
            "Voice acting demo submitted for potential future collaboration"
        ]
    }
];

// Experience data: Add More Industry Reviews Here
const industryReviewsData = [
    {
        title: "Keymailer & Independent Coverage",
        work: [
            "Covered 15+ indie and VR titles across multiple platforms",
            "Selected to cover MAVRIX (Red Bull–affiliated project)",
            "Delivered structured developer feedback including gameplay analysis, usability insights, and player experience improvements",
            "Experience identifying bugs, balancing issues, and UX friction points during playtesting",
            "Created promotional and gameplay content aligned with both player engagement and developer visibility"
        ]
    }
];

function renderDemos() {
    const demoList = document.getElementById('demo-list');
    if (!demoList) return;
    demoList.innerHTML = '';
    demoData.forEach(demo => {
        const item = document.createElement('div');
        item.className = 'demo-item';
        item.innerHTML = `
                                <div class="demo-box">
                                    <img class="demo-thumb" src="${demo.thumb}" alt="${demo.title}">
                                    <a class="demo-link" href="${demo.url}" target="_blank">Watch Now</a>
                                </div>
                                <div class="demo-info">
                                    <div class="demo-title">${demo.title}</div>
                                    <div class="demo-description">${demo.description}</div>
                                </div>
                            `;
        demoList.appendChild(item);
    });
}

function renderAboutBlocks() {
    const aboutSection = document.getElementById('about-section');
    if (!aboutSection) return;
    aboutSection.innerHTML = '';
    aboutBlocks.forEach(block => {
        const div = document.createElement('div');
        div.className = 'about-block';
        
        if (block.videoUrl) {
            // Handle YouTube video embed
            let embedUrl = '';
            const url = block.videoUrl;
            
            // Check if URL is already an embed URL
            if (url.includes('/embed/')) {
                embedUrl = url;
            } else {
                // Extract video ID from different YouTube URL formats
                let videoId = '';
                if (url.includes('youtu.be/')) {
                    videoId = url.split('youtu.be/')[1].split('?')[0];
                } else if (url.includes('youtube.com/watch?v=')) {
                    videoId = url.split('v=')[1].split('&')[0];
                } else if (url.includes('youtube.com/shorts/')) {
                    videoId = url.split('shorts/')[1].split('?')[0];
                }
                
                if (videoId) {
                    embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;
                }
            }
            
            if (embedUrl) {
                div.innerHTML = `<iframe class="about-video" style="width: var(--wfa); height: var(--wfa); margin: 0;" src="${embedUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
            }
        } else if (block.img || block.text) {
            // Handle text + image block (original format)
            if (block.img) {
                div.innerHTML = `<img class=\"about-img\" src=\"${block.img}\" alt=\"About Image\"><div>${block.text}</div>`;
            } else {
                div.innerHTML = `<div>${block.text}</div>`;
            }
        }
        
        aboutSection.appendChild(div);
    });
}

function renderPastWork() {
    const workList = document.getElementById('work-list');
    if (!workList) return;
    workList.innerHTML = '';
    pastWorkData.forEach(work => {
        const item = document.createElement('div');
        item.className = 'work-item';
        let imgHtml = '';
        item.innerHTML = `
                        ${imgHtml}
                        <div class=\"work-info\">
                            <h3>${work.title}</h3>
                            <p>${work.description}</p>
                        </div>
                    `;
        workList.appendChild(item);
    });
}

function renderStudioCollabs() {
    const collabDiv = document.getElementById('studio-collabs');
    if (!collabDiv) return;
    collabDiv.innerHTML = '<h2>Studio Collaborations</h2>';
    studioCollabsData.forEach(collab => {
        const item = document.createElement('div');
        item.className = 'collab-item';
        let worksHtml = '';
        if (Array.isArray(collab.work) && collab.work.length > 0) {
            worksHtml = '<ul style="margin:0.5em 0 0 1.5em;">';
            collab.work.forEach(w => {
                worksHtml += `<li>${w}</li>`;
            });
            worksHtml += '</ul>';
        }
        item.innerHTML = `<strong>${collab.title}</strong>:${worksHtml}`;
        collabDiv.appendChild(item);
    });
}

function renderIndustryReviews() {
    const reviewsDiv = document.getElementById('industry-reviews');
    if (!reviewsDiv) return;
    reviewsDiv.innerHTML = '<h2>Industry Reviews</h2>';
    industryReviewsData.forEach(review => {
        const item = document.createElement('div');
        item.className = 'review-item';
        let worksHtml = '';
        if (Array.isArray(review.work) && review.work.length > 0) {
            worksHtml = '<ul style="margin:0.5em 0 0 1.5em;">';
            review.work.forEach(w => {
                worksHtml += `<li>${w}</li>`;
            });
            worksHtml += '</ul>';
        }
        item.innerHTML = `<strong>${review.title}</strong>${worksHtml}`;
        reviewsDiv.appendChild(item);
    });
}

// Modal menu logic
const menuBtn = document.getElementById('menu-btn');
const navModal = document.getElementById('nav-modal');
const navModalClose = document.getElementById('nav-modal-close');
menuBtn.addEventListener('click', () => {
    navModal.classList.add('active');
});
navModalClose.addEventListener('click', () => {
    navModal.classList.remove('active');
});
navModal.addEventListener('click', (e) => {
    if (e.target === navModal) navModal.classList.remove('active');
});

navModal.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navModal.classList.remove('active');
    });
});
