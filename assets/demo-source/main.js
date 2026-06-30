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
document.addEventListener('DOMContentLoaded', handleHash);

// Cinematics & VFX data: Add Your Videos or Images Here
const cinematicsData = [
    // TikTok Videos
    /*
    {
        mediaType: "tiktok",
        description: "Quite proud of this one! #knightedit #knightpov #medievalhistory #knightstemplar",
        videoId: "7657216603595099414"
    },

    // YouTube Videos
    {
        mediaType: "youtube",
        description: "Templar's Vigil",
        videoUrl: "https://youtube.com/shorts/-hmBJwi_MEM?si=6WLdVRftfQ51paJJ"
    },
    */
    {
        mediaType: "youtube",
        title: "Templar's Vigil",
        description: "Templars Vigil! #knightstemplar #knightedit #vfxartist Music by KevinMacLeod",
        videoUrl: "https://youtube.com/shorts/-hmBJwi_MEM?si=6WLdVRftfQ51paJJ"
    },

    // Images
    {
        mediaType: "image",
        title: "Celestial Twilight",
        description: "Fantasy Matte Painting",
        imageUrl: "https://sinisterexp.github.io/assets/images/gallery/vfx-01.jpg"
    },
    {
        mediaType: "image",
        title: "Kingdom of Valdyrra",
        description: "Digital Environment Composite",
        imageUrl: "https://sinisterexp.github.io/assets/images/gallery/vfx-02.jpg"
    },
    {
        mediaType: "image",
        title: "Twin Moons",
        description: "Fantasy Sky Replacement",
        imageUrl: "https://sinisterexp.github.io/assets/images/gallery/vfx-03.jpg"
    },
    {
        mediaType: "image",
        title: "The Forgotten Keep",
        description: "Cinematic Matte Painting",
        imageUrl: "https://sinisterexp.github.io/assets/images/gallery/vfx-04.jpg"
    },
    {
        mediaType: "image",
        title: "Moonlit Shores",
        description: "Fantasy Environment",
        imageUrl: "https://sinisterexp.github.io/assets/images/gallery/vfx-05.jpg"
    },
    {
        mediaType: "image",
        title: "The Templar's Vigil",
        description: "Cinematic Composite",
        imageUrl: "https://sinisterexp.github.io/assets/images/gallery/vfx-06.jpg"
    }
];

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
        header: "Sinister Tales - Narration Showcase",
        videoUrl: "https://www.youtube.com/embed/a3FAhxzjhnc?si=5OamHFpo0bMiFY9q"
    },
    {
        text: `SinisterEXP (Jason Perkins) is a UK-based voice actor specialising in character-driven and narrative performance.<br /><br />With a background in digital storytelling and games content, I provide expressive, reliable voice work with fast turnaround and strong creative communication.`,
        img: "assets/images/jason.png"
    },
    {
        text: `<div style="background-color: #d7c32542; color: #ffffff; padding: 1rem; border-radius: 5px;">Professional voice actor and cinematic creator delivering immersive narration, character performance, and atmospheric storytelling across games, VR, film, and digital media.<br /><br />Alongside voice acting, my original medieval and dark fantasy content has generated over 4 million views across social media in the past month alone, demonstrating strong audience engagement within the fantasy and historical storytelling niche.<br /><br />My work has also surpassed 1 million views on Peaky Blinders VR, and I've collaborated with indie and VR studios to bring distinctive characters and stories to life.</div>`,
        img: "assets/images/vabg-1.jpg"
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
    
    // Add click handlers for images
    document.querySelectorAll('.cinematics-image[data-fullscreen]').forEach(img => {
        img.addEventListener('click', () => {
            openImageModal(img.getAttribute('data-fullscreen'));
        });
        img.style.cursor = 'pointer';
    });
    
    // Process TikTok embeds with proper timing and error handling
    if (document.querySelector('.tiktok-embed')) {
        if (window.tiktok && window.tiktok.embed && window.tiktok.embed.lib) {
            window.tiktok.embed.lib.render(cinematicsDiv);
        } else {
            // Fallback: try again after delay if script isn't ready yet
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
