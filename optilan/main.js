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


//remove anchor hashtags from URL
$(document).ready(function() {
    
    // Function to remove the anchor
    function removeAnchor() {
        history.replaceState("", document.title, window.location.origin + window.location.pathname + window.location.search);
    }

    // Remove the anchor on page load
    removeAnchor();

    // Remove the anchor on clicking elements with anchor="remove"
    $("[anchor='remove']").click(() => {
        setTimeout(removeAnchor, 5);
    });
});


$(document).ready(function() {

  function updateLinkDisplay() {
    // Reset styles for all anchors
    $('nav a .is-current').addClass('hide');
    $('nav a .isnot-current').removeClass('hide');
  
    // Set styles for each current anchor
    $('.w--current').each(function() {
      $(this).find('.is-current').removeClass('hide');
      $(this).find('.isnot-current').addClass('hide');
    });
  }

  // Run the update function when scrolling
  $(document).scroll(function() {
    updateLinkDisplay();
  });

  // Run the function on initial load
  updateLinkDisplay();
});

// auto update copyright year
// when the DOM is ready
document.addEventListener("DOMContentLoaded", function() { 
  // get the the span element
  const yrSpan = document.querySelector('.copyright-year');
  // get the current year
  const currentYr = new Date().getFullYear();
  // set the year span element's text to the current year
  yrSpan.textContent = currentYr;
});
