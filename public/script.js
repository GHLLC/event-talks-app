document.addEventListener('DOMContentLoaded', () => {
    const scheduleContainer = document.getElementById('schedule');
    const searchInput = document.getElementById('categorySearch');
    let talks = [];

    // Configuration
    const START_TIME = '10:00';
    const TALK_DURATION = 60; // minutes
    const TRANSITION_TIME = 10; // minutes
    const LUNCH_DURATION = 60; // minutes
    const LUNCH_AFTER_TALK = 3; // Index

    async function fetchTalks() {
        try {
            const response = await fetch('talks.json');
            talks = await response.json();
            renderSchedule();
        } catch (error) {
            console.error('Error loading talks:', error);
            scheduleContainer.innerHTML = '<p>Error loading schedule. Please try again later.</p>';
        }
    }

    function addMinutes(time, mins) {
        const [hours, minutes] = time.split(':').map(Number);
        const date = new Date();
        date.setHours(hours, minutes, 0);
        date.setMinutes(date.getMinutes() + mins);
        return date.toTimeString().slice(0, 5);
    }

    function renderSchedule() {
        let currentTime = START_TIME;
        let html = '';

        talks.forEach((talk, index) => {
            const endTime = addMinutes(currentTime, TALK_DURATION);
            
            // Render Talk
            html += createTalkCard(talk, currentTime, endTime);

            // Update Time
            currentTime = endTime;

            // Check if Lunch follows
            if (index + 1 === LUNCH_AFTER_TALK) {
                const lunchEnd = addMinutes(currentTime, LUNCH_DURATION);
                html += createLunchCard(currentTime, lunchEnd);
                currentTime = lunchEnd;
            } else if (index < talks.length - 1) {
                // Add 10m transition between talks (but not after the last one or before lunch)
                currentTime = addMinutes(currentTime, TRANSITION_TIME);
            }
        });

        scheduleContainer.innerHTML = html;
        applyHighlighting();
    }

    function createTalkCard(talk, start, end) {
        const categoriesHtml = talk.categories
            .map(cat => `<span class="category-tag" data-category="${cat.toLowerCase()}">${cat}</span>`)
            .join('');

        const speakersHtml = talk.speakers
            .map(s => `<span class="speaker-name" data-speaker="${s.toLowerCase()}">${s}</span>`)
            .join(' & ');

        return `
            <div class="schedule-item talk-card" id="talk-${talk.id}" 
                 data-categories="${talk.categories.join(',').toLowerCase()}"
                 data-speakers="${talk.speakers.join(',').toLowerCase()}">
                <div class="time-slot">
                    <span class="time-start">${start}</span>
                    <span class="time-end">${end}</span>
                </div>
                <div class="content">
                    <div class="categories">${categoriesHtml}</div>
                    <h2 class="talk-title">${talk.title}</h2>
                    <p class="speakers">${speakersHtml}</p>
                    <p class="description">${talk.description}</p>
                </div>
            </div>
        `;
    }

    function createLunchCard(start, end) {
        return `
            <div class="schedule-item is-lunch">
                <div class="time-slot">
                    <span class="time-start">${start}</span>
                    <span class="time-end">${end}</span>
                </div>
                <div class="content">
                    <h2 class="talk-title">🍱 Lunch Break</h2>
                    <p class="description">Networking and food in the main hall.</p>
                </div>
            </div>
        `;
    }

    function applyHighlighting() {
        const query = searchInput.value.trim().toLowerCase();
        const talkCards = document.querySelectorAll('.talk-card');

        talkCards.forEach(card => {
            const categories = card.getAttribute('data-categories');
            const speakers = card.getAttribute('data-speakers');
            const catTags = card.querySelectorAll('.category-tag');
            const speakerSpans = card.querySelectorAll('.speaker-name');
            
            if (query === '') {
                card.classList.remove('highlighted');
                catTags.forEach(tag => tag.classList.remove('match'));
                speakerSpans.forEach(s => s.classList.remove('match'));
                return;
            }

            const catMatch = categories.includes(query);
            const speakerMatch = speakers.includes(query);

            if (catMatch || speakerMatch) {
                card.classList.add('highlighted');
                
                // Highlight Category Tags
                catTags.forEach(tag => {
                    if (tag.getAttribute('data-category').includes(query)) {
                        tag.classList.add('match');
                    } else {
                        tag.classList.remove('match');
                    }
                });

                // Highlight Speaker Names
                speakerSpans.forEach(s => {
                    if (s.getAttribute('data-speaker').includes(query)) {
                        s.classList.add('match');
                    } else {
                        s.classList.remove('match');
                    }
                });
            } else {
                card.classList.remove('highlighted');
                catTags.forEach(tag => tag.classList.remove('match'));
                speakerSpans.forEach(s => s.classList.remove('match'));
            }
        });
    }

    searchInput.addEventListener('input', applyHighlighting);

    scheduleContainer.addEventListener('click', (e) => {
        const tag = e.target.closest('.category-tag');
        const speaker = e.target.closest('.speaker-name');
        
        if (tag) {
            searchInput.value = tag.getAttribute('data-category');
            applyHighlighting();
            searchInput.focus();
        } else if (speaker) {
            searchInput.value = speaker.getAttribute('data-speaker');
            applyHighlighting();
            searchInput.focus();
        }
    });

    fetchTalks();
});
