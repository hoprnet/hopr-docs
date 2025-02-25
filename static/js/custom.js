document.addEventListener("DOMContentLoaded", () => {
    // Extract the fragment identifier (without the '#' character)
    const hash = window.location.hash.slice(1);
    if (hash) {
      // Find the element with the matching ID
      const element = document.getElementById(hash);
      // Check if the element is a <details> element
      if (element && element.tagName.toLowerCase() === "details") {
        // Open the details element to show its content
        element.open = true;
        // Optionally scroll the details element into view
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });  