// LENIS SMOOTH SCROLL
let lenis;
function initializeLenis() {
  if (Webflow.env("editor") === undefined) {
    lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 0.7,
      gestureOrientation: "vertical",
      normalizeWheel: false,
      smoothTouch: false,
      prevent: (event, targetElement) => {
        // Prevent smooth scrolling when Feedbucket portal or help is open
        return document.documentElement.classList.contains('feedbucket-portal-open') ||
               document.documentElement.classList.contains('feedbucket-help-open');
      }
    });

    function raf(time) {
      if (lenis) {
        lenis.raf(time);
      }
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  $("[data-lenis-start]").on("click", function () {
    if (lenis) {
      lenis.start();
    }
  });

  $("[data-lenis-stop]").on("click", function () {
    if (lenis) {
      lenis.stop();
    }
  });

  $("[data-lenis-toggle]").on("click", function () {
    $(this).toggleClass("stop-scroll");
    if ($(this).hasClass("stop-scroll")) {
      if (lenis) {
        lenis.stop();
      }
    } else {
      if (lenis) {
        lenis.start();
      }
    }
  });

  // Listen for Feedbucket feature open and close events
  window.addEventListener('feedbucketopenedfeature', (event) => {
    if (event.detail.feature === 'portal' || event.detail.feature === 'help') {
      document.documentElement.classList.add(`feedbucket-${event.detail.feature}-open`); // Enable native scroll
    }
  });

  window.addEventListener('feedbucketclosedfeatures', () => {
    document.documentElement.classList.remove('feedbucket-portal-open'); // Enable Lenis smooth scroll for portal
    document.documentElement.classList.remove('feedbucket-help-open'); // Enable Lenis smooth scroll for help
  });

  // Event listener for dynamic resizing of the scrollable area within Lenis
  document.querySelectorAll('[data-lenis-resize]').forEach(element => {
    element.addEventListener('click', () => {
      setTimeout(() => {
        if (lenis) {
          lenis.resize();  // Recalculates the scrollable content area
        }
      }, 1000);  // Delay to ensure content changes have taken effect
    });
  });
}

// Ensure to add this CSS to manage smooth scrolling classes
const style = document.createElement('style');
style.innerHTML = `
.lenis-smooth {
  scroll-behavior: auto !important;
}`;
document.head.appendChild(style);

// Initialize Lenis after DOM content is loaded
document.addEventListener('DOMContentLoaded', initializeLenis);
