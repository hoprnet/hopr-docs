document.addEventListener("DOMContentLoaded", function () {
      const hash = window.location.hash.slice(1);
      if (hash) {
        const targetH3 = document.getElementById(hash);
        if (targetH3) {
          // If the target element is an <h3>, trigger its click event.
          if (targetH3.tagName.toLowerCase() === "h3") {
            targetH3.click();
          }
          // Then, find the closest parent <details> element.
          const detailsParent = targetH3.closest("details");
          if (detailsParent) {
            detailsParent.open = true;
            detailsParent.scrollIntoView({ behavior: "smooth", block: "start" });
          } else {
            console.warn("No parent <details> element found for the target <h3> element.");
          }
        } else {
          console.warn("No element found with ID:", hash);
        }
      }
  });  