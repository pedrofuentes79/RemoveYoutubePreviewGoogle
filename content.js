function hideVideoElements(elements) {
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const elementClass = element.className;
    const elementStyle = element.style;

    // Hide divs that have jscontroller="Dq2Yjb" as attribute
    if (element.getAttribute("jscontroller") === "Dq2Yjb") {
      elementStyle.visibility = "hidden";
      console.log("jscontroller");
    }
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

hideVideoElements(document.querySelectorAll(".html5-main-video"));
observeDOM();