JavaScript Custom Operators
===========================

Create your own operators in JavaScript

> ![](http://i.imgur.com/15IaZnT.png)

## Introduction

During the Math classes we learned how to define new operators. For example:

#### `(ℝ, ∘), x ∘ y = x + 2y`

This defines `∘` law. For any real numbers *x* and *y*, *x ∘ y* is *x + 2y*. e.g: `2 ∘ 2 = 2 + 4 = 6`.

## Custom operators in JavaScript?

This projects finally bring this feature in the JavaScript world! :-) Using [**esprima**](http://esprima.org/) - which takes JS code and generates the syntax tree for it - and [**escodegen**](https://github.com/Constellation/escodegen) - which does the other direction, generating JS code from the syntax tree esprima spits - we can create new JavaScript operators.

## Example
Having two arrays:

```js
var x = [1, 2, 3, 4, 5]
  , y = [3, 5, 6, 1];
```

we want to find the intersection of them (that is `[1, 3, 5]`).

We can easily create a function `function foo (x, y) { ... }`, but why not create an operator instead?

Then `x ⋂ y` will return the same thing. :-)

## Live demo
You can try this application online [clicking here](http://ionicabizau.github.io/JavaScript-custom-operators/).

## Thanks!
 - [@benjamingr](https://github.com/benjamingr) posted this great [answer](http://stackoverflow.com/a/20764137/1420197) to my [question on StackOverflow](http://stackoverflow.com/q/20762338/1420197)
 - [**esprima**](http://esprima.org/)
 - [**escodegen**](https://github.com/Constellation/escodegen)

## License
See [LICENSE](/LICENSE) file.
