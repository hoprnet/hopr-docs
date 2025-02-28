document.addEventListener("DOMContentLoaded", function () {
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
});