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

  document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(e) {
      const detailsEl = e.target.closest('details');
      if (detailsEl) {
        const summaryEl = detailsEl.querySelector('summary');
        if (summaryEl) {
          const h3 = summaryEl.querySelector('h3');
          if (h3 && h3.id && h3.id !== window.location.hash.slice(1)) {
            currentHash = h3.id;
            const url = new URL(window.location.href);
            url.search = '';
            url.hash = '#' + currentHash;
            history.replaceState(null, '', url.toString());
          }
        }
      }
// also catch any Docusaurus tab click
    const tabEl = e.target.closest('li.tabs__item');
    if (tabEl) {
      // allow the tab’s own click-handler to finish (adds ?external_ip=…)
      setTimeout(function() {
        const detailsParent = tabEl.closest('details');
        const h3 = detailsParent?.querySelector('summary h3');
        if (!h3 || !h3.id) return;
        const url = new URL(window.location.href);
        url.hash = '#' + h3.id;
        history.replaceState(null, '', url.toString());
        console.log('Tab click updated URL to:', url.toString());
      }, 100);
    }
    }, true);
  });

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

  window.addEventListener('locationchange', handleHash);

  window.addEventListener('hashchange', function() {
    if (window.location.hash.slice(1)) {
      currentHash = window.location.hash.slice(1);
    }
  });
})();