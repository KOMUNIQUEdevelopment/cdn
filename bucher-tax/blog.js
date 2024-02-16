 document.addEventListener('DOMContentLoaded', function() {
    const observerConfig = { childList: true, subtree: true };

    // Encapsulate the layout initialization logic
    async function initializeTeam8Layout() {
      const items = Array.from(document.querySelectorAll('.team8_item'));
      const numberOfRows = Math.ceil(items.length / 2);
      const backgroundTemplate = document.querySelector('.blog_background-wrapper');
      const grid = document.querySelector('.team8_list');

      grid.innerHTML = ''; // Clear the grid to start fresh
      grid.classList.add('display-block'); // Ensure the grid is visible

      const loadImage = (image) => new Promise((resolve) => {
        if (image.complete) {
          resolve();
        } else {
          image.addEventListener('load', resolve);
          image.addEventListener('error', resolve); // Resolve even on error
        }
      });

      const adjustRowBackgroundHeight = async (rowWrapperGrid, teamBackground) => {
        const images = Array.from(rowWrapperGrid.querySelectorAll('.team8_image'));
        await Promise.all(images.map(loadImage));

        let maxHeight = 0;
        images.forEach(img => {
          maxHeight = Math.max(maxHeight, img.clientHeight);
        });

        teamBackground.style.height = `${maxHeight}px`;
      };

      // Temporarily disconnect the observer to prevent an endless loop
      observer.disconnect();

      for (let i = 0; i < numberOfRows; i++) {
        const start = i * 2;
        const rowWrapperGrid = document.createElement('div');
        rowWrapperGrid.classList.add('row-wrapper-grid');
        const containerLarge = document.createElement('div');
        containerLarge.classList.add('container-large');
        const rowWrapper = document.createElement('div');
        rowWrapper.classList.add('row-wrapper');
        rowWrapper.style.position = 'relative';
        const cloneBackground = backgroundTemplate.cloneNode(true);
        const teamBackground = cloneBackground.querySelector('.team_background');

        for (let j = start; j < start + 2 && j < items.length; j++) {
          rowWrapperGrid.appendChild(items[j]);
        }

        containerLarge.appendChild(rowWrapperGrid);
        rowWrapper.appendChild(cloneBackground);
        rowWrapper.appendChild(containerLarge);
        grid.appendChild(rowWrapper);

        // Asynchronously adjust each row's background height
        await adjustRowBackgroundHeight(rowWrapperGrid, teamBackground);
      }

      // Reconnect the observer after changes are made
      observer.observe(document.querySelector('.team8_list'), observerConfig);
    }

    // MutationObserver to watch for changes in the `.team8_list`
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          initializeTeam8Layout();
          break; // Exit the loop after re-initialization to avoid unnecessary checks
        }
      }
    });

    // Initially observe the list for changes
    observer.observe(document.querySelector('.team8_list'), observerConfig);

    // Setup event listeners on filter buttons
    document.querySelectorAll('[load="list"]').forEach(button => {
      button.addEventListener('click', function() {
        // Delay initialization to allow for async content updates
        setTimeout(initializeTeam8Layout, 500); // Adjust this delay as necessary
      });
    });

    // Initial call to setup layout on page load
    initializeTeam8Layout();
  });


