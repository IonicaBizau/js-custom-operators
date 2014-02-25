/*
 *  TODO
 *
 * */
(function (window) {

    /*
     *  Adds a new operator
     *
     *  Pass an object containing the operator
     *  names and them handlers.
     *
     *  e.g.
     *  {
     *      "⋂": function (x, y) {
     *          ...
     *          return ...;
     *      }
     *    , "#": function (x, y) {
     *          ...
     *          return ...;
     *      }
     *  }
     * */
    function addOperators (operators) {

        // processing operator functions
        for (var op in operators) {

            // generate a random function name
            var opHandlerName = "_" + Math.random().toString(36).substring(4).toUpperCase();

            // save the operator handlers in the jscustomoperators object
            JsCustomOperators._operatorHandlers[opHandlerName] = operators[op];

            // update the current operator value
            //  (function -> object)
            operators[op] = {
                name: "JsCustomOperators._operatorHandlers." + fooName
            };
        }

        // get the Esprima tokens
        var tokens = esprima.FnExprTokens

            // get the custom operator array
          , customOperators = Object.keys(operators);

        // each custom operator
        for (var i = 0; i < customOperators.length; ++i) {

            // get the current operator
            var cOp = customOperators[i];

            // the current operator doesn't exist in token array
            if (tokens.indexOf(cOp) === -1) {

                // push it
                tokens.push(cOp);
            }

            // the current operator doesn't exist in operator array
            if (esprima.JohnnysProps.operators.indexOf(cOp) === -1) {

                // push it
                esprima.JohnnysProps.operators.push(cOp);
            }

            // the current operator doesn't exist in custom array
            if (esprima.JohnnysProps.custom.indexOf(cOp) === -1) {

                // push it
                esprima.JohnnysProps.custom.push(cOp);
            }
        }
    }

    function removeOperator (op) {
        // TODO
    }

    var JsCustomOperators = {
        _operators: []
      , addOperator: addOperator
      , removeOperator: removeOperator
      , _operatorHandlers: {}
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
