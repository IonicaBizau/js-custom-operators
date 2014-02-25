/*
 *  TODO
 *
 * */
(function (window) {

    var JsCustomOperators = {
        _operators: []
      , addOperator: function (op) {
            // TODO
        }
      , removeOperator: function (op) {
            // TODO
        }
    };

    // onbeforescriptexecute is not supported
    if (typeof window.onbeforescriptexecute === "undefined") {
        // TODO XHR Request?
    } else {

        // attach onbeforescriptexecute handler
        window.onbeforescriptexecute = function (e) {

            // execute this script element
            executeScriptElement(e.target);

            // prevent default script executing
            return false;
        };
    }

    /*
     *  This function executes the code from a script element or loads its
     *  contents and executes it.
     *
     * */
    function executeScriptElement (scriptEl, callback) {

        // callback is not provided
        callback = callback || function () {};

        // the script contains HTML
        // <script>...</script>
        if (scriptEl.innerHTML) {

            // execute its code
            eval (scriptEl.innerHTML);

            // and callback
            callback(null, scriptEl.innerHTML);

        // The script contains a src attribute
        // <script src="foo"></script>
        } else if (scriptEl.src) {
            // TODO Run a XHR request, execute its content and callback
            callback (null, null);
        } else {

            // no src and no code
            callback (null, null);
        }
    }

    // export the library to the global scope
    window.JsCustomOperators = JsCustomOperators;

})(window);
