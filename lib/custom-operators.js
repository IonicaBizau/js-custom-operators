/*
 *  JavaScript Custom Operators
 *  ===========================
 *  Create your own operators in JavaScript
 *
 *  Methods
 *
 *      JsCustomOperators
 *      ├── _operators        (Array)
 *      ├── _operatorsNames   (Object)
 *      ├── _operatorHandlers (Object)
 *      ├── addOperators      (Method)
 *      └── removeOperator    (Method)
 *
 *  Example
 *
 *      <script src="./js/jquery.min.js"></script>
 *      <script src="./js/esprima.js"></script>
 *      <script src="./js/escodegen.browser.js"></script>
 *      <script src="./lib/custom-operators.js"></script>
 *      <script>
 *          // adding "#" operator
 *          JsCustomOperators.addOperators({
 *              "#": function (a, b) {
 *                  return a + b;
 *              }
 *          });
 *      </script>
 *      <script>
 *          console.log(1 # 10); // outputs `11`
 *      </script>
 *
 *  License:
 *
 *
 *      The MIT License (MIT)
 *
 *      Copyright (c) 2014 Ionică Bizău
 *
 *      Permission is hereby granted, free of charge, to any person obtaining a copy of
 *      this software and associated documentation files (the "Software"), to deal in
 *      the Software without restriction, including without limitation the rights to
 *      use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 *      the Software, and to permit persons to whom the Software is furnished to do so,
 *      subject to the following conditions:
 *
 *      The above copyright notice and this permission notice shall be included in all
 *      copies or substantial portions of the Software.
 *
 *      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 *      FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 *      COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 *      IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 *      CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * */
(function (window) {

    /*
     *  Visits a tree
     *
     * */
    function visitor(tree,visit){
        for(i in tree){
            visit(tree[i]);
            if(typeof tree[i] === "object" && tree[i] !== null){
                visitor(tree[i],visit);
            }
        }
    }

    /*
     *  This function evaluates a function that contains
     *  custom operators
     *
     * */
    function evalCode (input) {

        // parse input
        var syntax = esprima.parse(input);

        // start recursive vist
        visitor(syntax,function(el){

            if (el === null) { return; }

            // found a BinaryExpression
            if(el.type === "BinaryExpression") {

                // verify if this is a custom operator
                if (Object.keys(JsCustomOperators._operatorsNames).indexOf(el.operator) !== -1){

                    // set the custom operators
                    el.type = "CallExpression";
                    el.callee = {
                        name: JsCustomOperators._operatorsNames[el.operator],
                        type:"Identifier"
                    };
                    el.arguments = [el.left, el.right];

                    // delete old properties
                    delete el.operator;
                    delete el.left;
                    delete el.right;
                }
            }
        });

        // generate js code from syntax object using escodegen
        scriptToEvaluate = escodegen.generate(syntax)

        // and finally, eval it
        return eval(scriptToEvaluate);
    }

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
            JsCustomOperators._operatorsNames[op] = "JsCustomOperators._operatorHandlers." + opHandlerName;
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

    // onbeforescriptexecute is not supported
    if (typeof window.onbeforescriptexecute === "undefined") {
        // TODO XHR Request?

        // get all script elements on the page
        var allScriptEls = document.querySelectorAll("script");

        // for each
        for (var i = 0; i < allScriptEls.length; ++i) {

            // get the current script element
            var cScriptEl = allScriptEls[i]

                // create the div that will replace the script element
              , newDiv = document.createElement("div");

            // <script> ... </script>
            if (cScriptEl.innerHTML) {

                // set the <script> inner HTML to the new div
                newDiv.innerHTML = cScriptEl.innerHTML;

            // <script src="..."></script>
            } else if (cScriptEl.src) {

                // set data-src attribute
                newDiv.setAttribute("data-src", cScriptEl.src);
            }

            // set data-custom-script attribute
            newDiv.setAttribute("data-custom-script", "true");

            // replace the old script with a new one
            cScriptEl.parentNode.replaceChild(newDiv, cScriptEl);
        }

        // this is a hack for the browsers that don't have onbeforescriptexecute
        // handler. Errors will be thrown, but the code will be executed
        // successfully by this library.
        window.onload = function () {

            // get all script elements on the page
            var allScriptEls = document.querySelectorAll("script");

            // for each
            for (var i = 0; i < allScriptEls.length; ++i) {

                // execute this script element
                executeScriptElement(allScriptEls[i]);
            }
        };
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
            evalCode (scriptEl.innerHTML);

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

    // declare js customoperators
    var JsCustomOperators = {
        _operators:         []
      , addOperators:       addOperators
      , removeOperator:     removeOperator
      , _operatorHandlers:  {}
      , _operatorsNames:    {}
    };

    // export the library to the global scope
    window.JsCustomOperators = JsCustomOperators;

})(window);
