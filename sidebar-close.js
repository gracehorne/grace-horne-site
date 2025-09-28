// sidebar close functionality - all three options

document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('quarto-sidebar');
    const toggleButton = document.querySelector('.quarto-btn-toggle');
    
    // function to close the sidebar
    function closeSidebar() {
        if (sidebar) {
            sidebar.classList.remove('show');
            // update the toggle button aria-expanded attribute
            if (toggleButton) {
                toggleButton.setAttribute('aria-expanded', 'false');
            }
        }
    }
    
    // option 1: close button in top-right corner
    function addCloseButton() {
        // only add close button on mobile when sidebar is shown
        if (window.innerWidth <= 768 && sidebar && sidebar.classList.contains('show')) {
            // remove existing close button first
            const existingCloseBtn = sidebar.querySelector('.sidebar-close-btn');
            if (existingCloseBtn) {
                existingCloseBtn.remove();
            }
            
            // create new close button
            const closeBtn = document.createElement('button');
            closeBtn.className = 'sidebar-close-btn';
            closeBtn.innerHTML = '✕';
            closeBtn.setAttribute('aria-label', 'Close sidebar');
            closeBtn.addEventListener('click', closeSidebar);
            
            // add to sidebar
            sidebar.appendChild(closeBtn);
        }
    }
    
    // option 2: click outside menu items to close (click on background)
    function handleBackgroundClick(event) {
        if (window.innerWidth <= 768 && sidebar && sidebar.classList.contains('show')) {
            // check if click was on the sidebar background (not on menu items)
            const menuContainer = sidebar.querySelector('.sidebar-menu-container');
            const closeButton = sidebar.querySelector('.sidebar-close-btn');
            
            // close if clicked on sidebar background but not on menu items or close button
            if (event.target === sidebar || 
                (!menuContainer.contains(event.target) && 
                 event.target !== closeButton)) {
                closeSidebar();
            }
        }
    }
    
    // option 3: escape key to close
    function handleEscapeKey(event) {
        if (event.key === 'Escape' && 
            window.innerWidth <= 768 && 
            sidebar && 
            sidebar.classList.contains('show')) {
            closeSidebar();
        }
    }
    
    // event listeners
    document.addEventListener('keydown', handleEscapeKey);
    
    // monitor sidebar state changes to add/remove close button and background click
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const target = mutation.target;
                if (target.id === 'quarto-sidebar') {
                    if (target.classList.contains('show')) {
                        // sidebar opened
                        addCloseButton();
                        setTimeout(() => {
                            document.addEventListener('click', handleBackgroundClick);
                        }, 100); // small delay to prevent immediate closing
                    } else {
                        // sidebar closed
                        document.removeEventListener('click', handleBackgroundClick);
                        // remove close button
                        const closeBtn = target.querySelector('.sidebar-close-btn');
                        if (closeBtn) {
                            closeBtn.remove();
                        }
                    }
                }
            }
        });
    });
    
    // start observing sidebar for class changes
    if (sidebar) {
        observer.observe(sidebar, { 
            attributes: true, 
            attributeFilter: ['class'] 
        });
    }
    
    // handle window resize to manage mobile vs desktop behavior
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // remove mobile-specific functionality on desktop
            document.removeEventListener('click', handleBackgroundClick);
            const closeBtn = sidebar?.querySelector('.sidebar-close-btn');
            if (closeBtn) {
                closeBtn.remove();
            }
        }
    });
    
    // initialize if sidebar is already open on page load
    if (sidebar && sidebar.classList.contains('show') && window.innerWidth <= 768) {
        addCloseButton();
        setTimeout(() => {
            document.addEventListener('click', handleBackgroundClick);
        }, 100);
    }
});