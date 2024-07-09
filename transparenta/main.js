document.addEventListener('DOMContentLoaded', function() {
    // Function to retrieve a specific cookie by name
    function getCookie(name) {
        let cookieArr = document.cookie.split(";");
        for (let i = 0; i < cookieArr.length; i++) {
            let cookiePair = cookieArr[i].split("=");
            if (name === cookiePair[0].trim()) {
                return decodeURIComponent(cookiePair[1]);
            }
        }
        return null;
    }

    // Function to check if URL contains a specific parameter
    function hasUrlParam(paramName) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.has(paramName);
    }

    // Only initialize Lenis if 'feedbucketKey' cookie or URL parameter does not exist
    if (Webflow.env("editor") === undefined && !getCookie("feedbucketKey") && !hasUrlParam("feedbucketKey")) {
        let lenis = new Lenis({
            lerp: 0.1,
            wheelMultiplier: 0.7,
            gestureOrientation: "vertical",
            normalizeWheel: false,
            smoothTouch: false
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Event handlers for controlling Lenis scroll behavior
        $("[data-lenis-start]").on("click", function() {
            lenis.start();
        });

        $("[data-lenis-stop]").on("click", function() {
            lenis.stop();
        });

        $("[data-lenis-toggle]").on("click", function() {
            $(this).toggleClass("stop-scroll");
            if ($(this).hasClass("stop-scroll")) {
                lenis.stop();
            } else {
                lenis.start();
            }
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

        console.log('Lenis initialized as Feedbucket is not visible and no feedbucketKey detected.');
    } else {
        console.log("Feedbucket is active or in editor mode; Lenis initialization skipped.");
    }
});

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
