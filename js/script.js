// Tab functionality
function showTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    // remove active class from all tab buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });

    // show the selected tab content
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    // add active class to the clicked button
    const clickedButton = event.target;
    clickedButton.classList.add('active');

    // store the active tab in localstorage for persistence
    localStorage.setItem('activeTab', tabName);
}

// initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // check if there's stored active tab
    const storedTab = localStorage.getItem('activeTab');

    if (storedTab) {
        showTabByName(storedTab);
    } else {
        showTabByName('profile');
    }

    // add click event listeners to tab buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('onclick').match(/showTab\('(.+)'\)/)[1];
            showTab(tabName);
        });
    });

    // add smooth scolling for any anchors links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // add animation to cards on scroll (optional enhancement)
    observeCards();
})

// helper function to show tab by name without event
function showTabByName(tabName) {
    // hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    // remove active class from all tab buttons
    const tabButtons = document.querySelectorAll('tab-button');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });

    // show the selected tab content
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    // add active class to the corresponding button
    const correspondingButton = document.querySelector(`[onclick="showTab('${tabName}')"]`);
    if (correspondingButton) {
        correspondingButton.classList.add('active');
    }
}

// observe cards for scroll animations
function observeCards() {
    const cards = document.querySelectorAll('card');

    if ('IntersectionObserver' in window) {
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entries.target.style.animation = 'fadeIn 0.6s ease-out';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        cards.forEach(card => {
            cardObserver.observe(card);
        });
    }
}

// add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.altKey) {
        const tabs = ['profile', 'education', 'projects', 'work', 'certifications', 'contact'];
        const numbers = ['1', '2', '3', '4', '5', '6'];

        const index = numbers.indexOf(e.key);
        if (index !== -1 && tabs[index]) {
            showTabByName(tabs[index]);
            e.preventDefault();
        }
    }
});

function printCV() {
    window.print();
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode'));
}

// initialize dark mode for localSorage
document.addEventListener('DOMContentLoaded', function() {
    const isDarkMode = localStorage.getItem('darkMode') === "true";
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}