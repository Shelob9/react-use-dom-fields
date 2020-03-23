var listeners: Array<{
  selector: string;
  fn: (el: HTMLElement) => void;
}> = [];
let doc = window.document;

/**
 * Add an element to whatch for
 * @param {string} selector
 * @param {function} fn
 */
function addListener(selector: string, fn: (el: HTMLElement) => void) {
  // Store the selector and callback to be monitored
  listeners.push({
    selector: selector,
    fn: fn,
  });

  // Watch for changes in the document
  let observer = new MutationObserver(check);
  observer.observe(doc.documentElement, {
    childList: true,
    subtree: true,
  });

  // Check if the element is currently in the DOM
  check();
}

function check() {
  // Check the DOM for elements matching a stored selector
  for (var i = 0, len = listeners.length, listener, elements; i < len; i++) {
    listener = listeners[i];
    // Query for elements matching the specified selector
    elements = doc.querySelectorAll(listener.selector);
    for (var j = 0, jLen = elements.length, element; j < jLen; j++) {
      element = elements[j];
      // Make sure the callback isn't invoked with the
      // same element more than once
      if (!element.ready) {
        element.ready = true;
        // Invoke the callback with the element
        listener.fn.call(element, element);
      }
    }
  }
}
/**
 * Hook that allows you to observe when an element enters the DOM
 */
const useObserveExistance = () => {
  return {
    addListener,
  };
};

export default useObserveExistance;
