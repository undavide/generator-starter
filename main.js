(function() {
  "use strict";
  const meta = require("./package.json");

  const MENU_ID = meta.menu.id,
    MENU_LABEL = meta.menu.label,
    PLUGIN_ERROR = "plugin_error";

  var _generator = null,
    _currentDocumentId = null,
    _config = null;

  /**
   * Evaluates a JSX String always in the same JSX Engine
   * @param {String} JSXString The string to evaluate
   */
  const jsx = function(JSXString) {
    // keeps it thenable
    return _generator.evaluateJSXString(JSXString, true);
  }

  /*********** INIT ***********/

  function init(generator, config) {

    _generator = generator;
    _config = config;

    console.log("initializing with config %j", _config);

    _generator.addMenuItem(MENU_ID, MENU_LABEL, true, true)
      .then(
        function() {
          console.log("Menu created", MENU_ID);
        },
        function() {
          console.error("Menu creation failed", MENU_ID);
        }
      );

    _generator.onPhotoshopEvent("generatorMenuChanged", handleGeneratorMenuClicked);

    // TO DEBUG: chrome://inspect/#devices

    function initLater() {}

    process.nextTick(initLater);

  }

  /*********** EVENTS ***********/

  function handleGeneratorMenuClicked(event) {
    // Just FYI
    var startingMenuState = _generator.getMenuState(MENU_ID);
    console.log("Menu event %s, starting state %s", stringify(event), stringify(startingMenuState));
    // could be made nicer, but...
    // If checked, uncheck
    if (startingMenuState.checked) {
      // !name:String, !enabled:Bool, !checked:Bool, ?displayName:String
      _generator.toggleMenu(MENU_ID, true, false).then(
        // Success
        function() {
          console.log("Disabling the menu item")
        },
        // Error
        function() {
          console.error("Can't toggle menu")
        }
      )
    } else {
      _generator.toggleMenu(MENU_ID, true, true).then(
        // Success
        function() {
          console.log("Enabling the menu item")
        },
        // Error
        function() {
          console.error("Can't toggle menu")
        }
      )
    }
  }

  /*********** HELPERS ***********/

  function stringify(object) {
    try {
      return JSON.stringify(object, null, "    ");
    } catch (e) {
      console.error(e);
    }
    return String(object);
  }

  exports.init = init;

}());
