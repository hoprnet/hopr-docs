document.addEventListener("DOMContentLoaded", () => {
    function openDetailsForHash() {
      const hash = window.location.hash.slice(1);
      if (hash) {
        const targetH3 = document.getElementById(hash);
        if (targetH3) {
          // Simulate a click on the h3 element.
          if (targetH3.tagName.toLowerCase() === "h3") {
            targetH3.click();
          }
          // Find and open the parent <details> element.
          const detailsParent = targetH3.closest("details");
          if (detailsParent) {
            detailsParent.open = true;
            detailsParent.scrollIntoView({ behavior: "smooth", block: "start" });
            return true; // The element was found and handled.
          }
        }
      }
      return false; // The target element isn't available yet.
    }
  
    // Try running the function immediately.
    if (!openDetailsForHash()) {
      // If not found, set up a MutationObserver to monitor the DOM.
      const observer = new MutationObserver(() => {
        if (openDetailsForHash()) {
          observer.disconnect();
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }
  });    