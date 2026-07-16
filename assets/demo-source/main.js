// SPA Hash Router
const pages = ["home", "demos", "pastwork", "cinematics", "contact"];
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
    if (page === "cinematics") renderCinematics();
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
document.addEventListener('DOMContentLoaded', () => {
    handleHash();
    loadAllData();
});

if (document.readyState !== 'loading') {
    loadAllData();
}

const dataDomain = "https://sinisterexp.github.io/"; // Base domain for data files
const dataUrls = {
    "about": dataDomain+"assets/data/about.json",
    "cinematics": dataDomain+"assets/data/cinematics.json",
    "collaborations": dataDomain+"assets/data/collaborations.json",
    "demos": dataDomain+"assets/data/demos.json",
    "pastwork": dataDomain+"assets/data/pastwork.json",
    "reviews": dataDomain+"assets/data/reviews.json"
};

let cinematicsData = [];
let demoData = [];
let aboutBlocks = [];
let pastWorkData = [];
let studioCollabsData = [];
let industryReviewsData = [];

let isDataLoading = false;
async function loadAllData() {
    if (isDataLoading) return;
    isDataLoading = true;
    try {
        const [aboutRes, cinematicsRes, collabsRes, demosRes, pastworkRes, reviewsRes] = await Promise.all([
            fetch(dataUrls.about).catch(() => null),
            fetch(dataUrls.cinematics).catch(() => null),
            fetch(dataUrls.collaborations).catch(() => null),
            fetch(dataUrls.demos).catch(() => null),
            fetch(dataUrls.pastwork).catch(() => null),
            fetch(dataUrls.reviews).catch(() => null)
        ]);

        if (aboutRes && aboutRes.ok) {
            const data = await aboutRes.json();
            aboutBlocks = data.abouts || data.about || [];
        }
        if (cinematicsRes && cinematicsRes.ok) {
            const data = await cinematicsRes.json();
            cinematicsData = data.cinematics || data.cinematic || [];
        }
        if (collabsRes && collabsRes.ok) {
            const data = await collabsRes.json();
            studioCollabsData = data.collaborations || data.collabs || [];
        }
        if (demosRes && demosRes.ok) {
            const data = await demosRes.json();
            demoData = data.demos || data.demo || [];
        }
        if (pastworkRes && pastworkRes.ok) {
            const data = await pastworkRes.json();
            pastWorkData = data.works || data.pastwork || data.work || [];
        }
        if (reviewsRes && reviewsRes.ok) {
            const data = await reviewsRes.json();
            industryReviewsData = data.reviews || data.review || [];
        }
    } catch (error) {
        console.error("Error loading JSON data:", error);
    } finally {
        const hash = location.hash.replace('#', '').toLowerCase();
        showPage(pages.includes(hash) ? hash : "home");
    }
}

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
            let embedUrl = '';
            const url = block.videoUrl;
            
            if (url.includes('/embed/')) {
                embedUrl = url;
            } else {
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
                let html = '';
                if (block.header) {
                    html += `<h3 class="about-header">${block.header}</h3>`;
                }
                html += `<iframe class="about-video" src="${embedUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
                div.innerHTML = html;
            }
        } else if (block.img || block.text) {
            if (block.img) {
                div.innerHTML = `<img class="about-img" src="${block.img}" alt="About Image"><div>${block.text}</div>`;
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
                        <div class="work-info">
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
            worksHtml = '<ul style="margin: 0.5em 0 0 1.5em; font-weight: bold;">';
            collab.work.forEach(w => {
                worksHtml += `<li>${w}</li>`;
            });
            worksHtml += '</ul>';
        }
        item.innerHTML = `<h3 style="margin: 0;">${collab.title}:</h3>${worksHtml}`;
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
            worksHtml = '<ul style="margin: 0.5em 0 0 1.5em; font-weight: bold;">';
            review.work.forEach(w => {
                worksHtml += `<li>${w}</li>`;
            });
            worksHtml += '</ul>';
        }
        item.innerHTML = `<h3 style="margin: 0;">${review.title}:</h3>${worksHtml}`;
        reviewsDiv.appendChild(item);
    });
}

// Render Cinematics & VFX Showcase
function renderCinematics() {
    const cinematicsDiv = document.getElementById('cinematics-list');
    if (!cinematicsDiv) return;
    cinematicsDiv.innerHTML = '';
    cinematicsData.forEach(item => {
        const card = document.createElement('div');
        card.className = 'cinematics-card';
        
        let mediaHTML = '';
        
        if (item.mediaType === 'tiktok') {
            mediaHTML = `<div class="cinematics-media">
                <blockquote class="tiktok-embed" cite="https://www.tiktok.com/@sinisterexp/video/${item.videoId}" data-video-id="${item.videoId}" style="max-width: -webkit-fill-available; border-radius: 8px;"><section></section></blockquote>
                <script async src="https://www.tiktok.com/embed.js"></script>
            </div>`;
        } else if (item.mediaType === 'youtube') {
            let embedUrl = '';
            const url = item.videoUrl;
            
            if (url.includes('/embed/')) {
                embedUrl = url;
            } else {
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
                mediaHTML = `<div class="cinematics-media"><iframe class="cinematics-video" src="${embedUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
            }
        } else if (item.mediaType === 'image') {
            mediaHTML = `<div class="cinematics-media"><img class="cinematics-image" src="${item.imageUrl}" alt="Cinematics" data-fullscreen="${item.imageUrl}"></div>`;
        }

        let descriptionHTML = "";

        if (item.mediaType === "tiktok") {
            card.innerHTML = mediaHTML;
        } else {
            const descriptionHTML = `<div class="cinematics-description">
                <h3 style="margin-top: 0;margin-bottom: 0.5rem;color: var(--color-1);">${item.title || "Cinematics"}</h3>
                <p>${item.description}</p>
            </div>`;
            card.innerHTML = mediaHTML + descriptionHTML;
        }

        cinematicsDiv.appendChild(card);
    });
    
    document.querySelectorAll('.cinematics-image[data-fullscreen]').forEach(img => {
        img.addEventListener('click', () => {
            openImageModal(img.getAttribute('data-fullscreen'));
        });
        img.style.cursor = 'pointer';
    });
    
    if (document.querySelector('.tiktok-embed')) {
        if (window.tiktok && window.tiktok.embed && window.tiktok.embed.lib) {
            window.tiktok.embed.lib.render(cinematicsDiv);
        } else {
            setTimeout(() => {
                if (window.tiktok && window.tiktok.embed && window.tiktok.embed.lib) {
                    window.tiktok.embed.lib.render(cinematicsDiv);
                } else {
                    console.warn('TikTok embed script not available. This may be due to CDN/CORS restrictions on GitHub Pages.');
                }
            }, 500);
        }
    }
}

// Image modal functions
function openImageModal(imageSrc) {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('image-modal-content');
    modalImg.src = imageSrc;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const modal = document.getElementById('image-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Image modal event listeners
document.addEventListener('DOMContentLoaded', () => {
    const imageModalClose = document.getElementById('image-modal-close');
    const imageModal = document.getElementById('image-modal');
    
    if (imageModalClose) {
        imageModalClose.addEventListener('click', closeImageModal);
    }
    
    if (imageModal) {
        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) {
                closeImageModal();
            }
        });
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeImageModal();
        }
    });
});

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
