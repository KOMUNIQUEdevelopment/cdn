document.addEventListener('DOMContentLoaded', function() {
    (function() {
        // Function to retrieve a specific cookie by name
        function getCookie(name) {
            let cookieArr = document.cookie.split(";");
            for (let cookie of cookieArr) {
                let cookiePair = cookie.split("=");
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

            const body = document.body;

            body.addEventListener("click", function(event) {
                const target = event.target;
                if (target.matches("[data-lenis-start]")) {
                    lenis.start();
                } else if (target.matches("[data-lenis-stop]")) {
                    lenis.stop();
                } else if (target.matches("[data-lenis-toggle]")) {
                    target.classList.toggle("stop-scroll");
                    if (target.classList.contains("stop-scroll")) {
                        lenis.stop();
                    } else {
                        lenis.start();
                    }
                } else if (target.matches("[data-lenis-resize]")) {
                    setTimeout(() => {
                        lenis.resize();
                    }, 1000);
                }
            }, { passive: true });

            console.log('Lenis initialized as Feedbucket is not visible and no feedbucketKey detected.');
        } else {
            console.log("Feedbucket is active or in editor mode; Lenis initialization skipped.");
        }
    })();

    $(document).ready(function() {
        // Function to remove the anchor
        function removeAnchor() {
            history.replaceState("", document.title, window.location.origin + window.location.pathname + window.location.search);
        }

        removeAnchor();
    });
});
