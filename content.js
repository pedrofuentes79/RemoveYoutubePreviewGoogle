function hideVideoElements(elements) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.display = "none";
  }
}

function observeDOM() {
  const target = document.body;
  const config = { attributes: true, subtree: true, attributeFilter: ["class"] };

  const observer = new MutationObserver(function (mutationsList, observer) {
    const affectedElements = [];

    // Check for class attribute changes and new elements
    for (const mutation of mutationsList) {
      if (mutation.type === "attributes" && mutation.attributeName === "class") {
        const targetElement = mutation.target;
        affectedElements.push(targetElement);
      } else if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
        affectedElements.push(...mutation.addedNodes);
      }
    }

    // Hide elements with class changes and new elements
    hideVideoElements(affectedElements);
  });

  observer.observe(target, config);
}

hideVideoElements(document.querySelectorAll(".video-stream, .html5-main-video"));
observeDOM();