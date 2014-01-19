var syntax = esprima.parse("5 + 5 # 10");

visitor(syntax,function(el){
    if(el.type === "BinaryExpression"){

        if(el.operator === "#"){
            el.type = "CallExpression";
            el.callee = {
                name:"operator_sharp",
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

function visitor(tree,visit){
    for(i in tree){
        visit(tree[i]);
        if(typeof tree[i] === "object" && tree[i] !== null){
            visitor(tree[i],visit);
        }
    }
}
