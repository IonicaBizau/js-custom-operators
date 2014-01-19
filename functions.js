function operator_sharp (x, y) {
    return x + 2 * y;
}

var operators = {
    available: ["#"],
    "#": {
        name: "operator_sharp",
    }
};


function visitor(tree,visit){
    for(i in tree){
        visit(tree[i]);
        if(typeof tree[i] === "object" && tree[i] !== null){
            visitor(tree[i],visit);
        }
    }
}

function evalThis (input) {
    var syntax = esprima.parse(input);
    visitor(syntax,function(el){
        if(el.type === "BinaryExpression"){

            if (operators.available.indexOf(el.operator) !== -1){
                el.type = "CallExpression";
                el.callee = {
                    name: operators[el.operator].name,
                    type:"Identifier"
                };
                el.arguments = [el.left, el.right];
                delete el.operator;
                delete el.left;
                delete el.right;
            }
        }
    });

    scriptToEvaluate = escodegen.generate(syntax)
    return eval(scriptToEvaluate);
}
