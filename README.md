JavaScript Custom Operators
===========================

Create your own operators in JavaScript

## Introduction

During the Math classes we learned how to define new operators. For example:

#### `(ℝ, ∘), x ∘ y = x + 2y`

This defines `∘` law. For any real numbers *x* and *y*, *x ∘ y* is *x + 2y*. e.g: `2 ∘ 2 = 2 + 4 = 6`.

## Custom operators in JavaScript?

This projects finally bring this feature in the JavaScript world! :-) Using [**esprima**](http://esprima.org/) - which takes JS code and generates the syntax tree for it - and [**escodegen**](https://github.com/Constellation/escodegen) - which does the other direction, generating JS code from the syntax tree esprima spits - we can create new JavaScript operators.

## Thanks!
 - [@benjamingr](https://github.com/benjamingr) posted this great [answer](http://stackoverflow.com/a/20764137/1420197) to my [question on StackOverflow](http://stackoverflow.com/q/20762338/1420197)
 - [**esprima**](http://esprima.org/)
 - [**escodegen**](https://github.com/Constellation/escodegen)

## License
See [LICENSE](https://github.com/IonicaBizau/JavaScript-custom-operators/blob/master/LICENSE) file.
