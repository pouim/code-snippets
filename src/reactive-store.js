/**
 * Creates a simple reactive store using a JS Proxy.
 * @param {object} initialState - The initial state object.
 * @param {function} onUpdate - The callback function to run on any state change.
 * @returns {Proxy} A proxy-wrapped state object.
 */
function createReactiveStore(initialState, onUpdate) {
  return new Proxy(initialState, {
    set(target, property, value) {
      // First, update the actual value in the target object
      target[property] = value;

      // Then, trigger the callback to notify of the change
      console.log(`State updated: ${property} is now`, value);
      onUpdate(target);

      // Return true to indicate the assignment was successful
      return true;
    },
  });
}

// --- Example Usage ---

// Let's say we have an element to display our user's name
// <h1 id="user-name"></h1>
const userNameElement = document.getElementById("user-name");

// A function to update our UI
const render = (state) => {
  if (userNameElement) {
    userNameElement.textContent = state.name;
  }
};

// Create our reactive store
const userState = createReactiveStore({ name: "Alex" }, render);

// Initially render the UI
render(userState); // Renders "Alex"

// Now, whenever we update the state, the UI updates automatically! ✨
setTimeout(() => {
  userState.name = "Jordan"; // Console logs the update and re-renders the h1 to "Jordan"
}, 2000);
