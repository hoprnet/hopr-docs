(function() {
  // Define the function that handles the hash
  function handleHash() {
    setTimeout(function () {
      const hash = window.location.hash.slice(1);
      if (hash) {
        const targetH3 = document.getElementById(hash);
        if (targetH3) {
          if (targetH3.tagName.toLowerCase() === "h3") {
            targetH3.click();
          }
          const detailsParent = targetH3.closest("details");
          if (detailsParent) {
            detailsParent.open = true;
            detailsParent.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      }
    }, 500);
  }

  // Listen for the DOMContentLoaded event (for initial page load)
  document.addEventListener("DOMContentLoaded", handleHash);

  // Listen for standard hash change events (when the hash portion changes)
  window.addEventListener("hashchange", handleHash);

  // Monkey-patch pushState and replaceState to fire a custom 'locationchange' event
  (function(history) {
    const pushState = history.pushState;
    const replaceState = history.replaceState;
    history.pushState = function() {
      const ret = pushState.apply(history, arguments);
      window.dispatchEvent(new Event("locationchange"));
      return ret;
    };
    history.replaceState = function() {
      const ret = replaceState.apply(history, arguments);
      window.dispatchEvent(new Event("locationchange"));
      return ret;
    };
  })(window.history);

  // Listen for the custom 'locationchange' event
  window.addEventListener("locationchange", handleHash);
})();