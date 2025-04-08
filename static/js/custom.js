(function() {
  let currentHash = '';


  function handleHash() {
    setTimeout(function () {
      const hash = window.location.hash.slice(1);
      if (hash && hash !== currentHash) {
        currentHash = hash;
        const targetElement = document.getElementById(hash);
        if (targetElement) {
          if (targetElement.tagName.toLowerCase() === "h3") {
            targetElement.click();
          }
          const detailsParent = targetElement.closest("details");
          if (detailsParent) {
            detailsParent.open = true;
            detailsParent.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      }
    }, 500);
  }
  document.addEventListener("DOMContentLoaded", handleHash);
  // When a click occurs inside a <details> element, find its <h3> (inside its <summary>).
  // If the <h3>'s id differs from the current URL hash, remove all query parameters and update the hash.
  document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(e) {
      const detailsEl = e.target.closest('details');
      if (detailsEl) {
        console.log('Details clicked, target:', e.target);
        const summaryEl = detailsEl.querySelector('summary');
        if (summaryEl) {
          const h3 = summaryEl.querySelector('h3');
          if (h3 && h3.id) {
            // If the h3 id is different from the current URL hash, update the URL.
            if (h3.id !== window.location.hash.slice(1)) {
              currentHash = h3.id;
              const url = new URL(window.location.href);
              // Remove all query parameters.
              url.search = '';
              // Set the hash to the new h3 id.
              url.hash = '#' + currentHash;
              history.replaceState(null, '', url.toString());
              console.log('Summary click updated hash and removed query: ', url.toString());
            }
          }
        }
      }
    }, true);
  });

  // --- Tab Click Listener ---
  // We assume Docusaurus updates the query string automatically when a tab is clicked.
  // Here we simply wait a bit and then check if the URL still has a hash.
  // If not, we restore it from currentHash.
  document.addEventListener('DOMContentLoaded', function() {
    // Adjust the selector below if necessary.
    document.querySelectorAll('.tab').forEach(function(tab) {
      tab.addEventListener('click', function(e) {
        // Allow Docusaurus to update the URL.
        setTimeout(function() {
          // If the URL hash is missing, restore it from currentHash.
          if (!window.location.hash && currentHash) {
            const url = new URL(window.location.href);
            url.hash = '#' + currentHash;
            history.replaceState(null, '', url.toString());
            console.log('Tab click restored hash to:', '#' + currentHash);
          }
        }, 100);
      });
    });
  });
  // --- End of Tab Click Listener ---

  // Patch history methods to dispatch a custom 'locationchange' event.
  (function(history) {
    const pushState = history.pushState;
    const replaceState = history.replaceState;
    history.pushState = function() {
      const ret = pushState.apply(history, arguments);
      window.dispatchEvent(new Event('locationchange'));
      return ret;
    };
    history.replaceState = function() {
      const ret = replaceState.apply(history, arguments);
      window.dispatchEvent(new Event('locationchange'));
      return ret;
    };
  })(window.history);

  // Listen for our custom 'locationchange' event.
  window.addEventListener('locationchange', function() {
    if (!window.location.hash && currentHash) {
      const url = new URL(window.location.href);
      url.hash = '#' + currentHash;
      history.replaceState(null, '', url.toString());
      console.log('Restored hash to:', '#' + currentHash);
    }
  });

  // (Optional) Listen for native hashchange to keep currentHash in sync.
  window.addEventListener('hashchange', function() {
    if (window.location.hash.slice(1)) {
      currentHash = window.location.hash.slice(1);
    }
  });
})();