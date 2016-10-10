
# js-custom-operators

 [![Patreon](https://img.shields.io/badge/Support%20me%20on-Patreon-%23e6461a.svg)][paypal-donations] [![PayPal](https://img.shields.io/badge/%24-paypal-f39c12.svg)][paypal-donations] [![AMA](https://img.shields.io/badge/ask%20me-anything-1abc9c.svg)](https://github.com/IonicaBizau/ama) [![Version](https://img.shields.io/npm/v/js-custom-operators.svg)](https://www.npmjs.com/package/js-custom-operators) [![Downloads](https://img.shields.io/npm/dt/js-custom-operators.svg)](https://www.npmjs.com/package/js-custom-operators) [![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/johnnyb?utm_source=github&utm_medium=button&utm_term=johnnyb&utm_campaign=github)

> Create your own operators in JavaScript

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
  , y = [3, 5, 6, 1]
  ;
```

we want to find the intersection of them (that is `[1, 3, 5]`).

We can easily create a function `function foo (x, y) { ... }`, but why not create an operator instead?

Then `x ⋂ y` will return the same thing. :-)

## Live demo

You can try this application online [clicking here](http://ionicabizau.github.io/JavaScript-custom-operators/).


[![js-custom-operators](http://i.imgur.com/15IaZnT.png)](#)

## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].

## :moneybag: Donations

Another way to support the development of my open-source modules is
to [set up a recurring donation, via Patreon][patreon]. :rocket:

[PayPal donations][paypal-donations] are appreciated too! Each dollar helps.

Thanks! :heart:

## :cake: Thanks

 - [@benjamingr](https://github.com/benjamingr) posted this great [answer](http://stackoverflow.com/a/20764137/1420197) to my [question on StackOverflow](http://stackoverflow.com/q/20762338/1420197)
 - [**esprima**](http://esprima.org/)
 - [**escodegen**](https://github.com/Constellation/escodegen)



## :scroll: License

[MIT][license] © [Ionică Bizău][website]

[patreon]: https://www.patreon.com/ionicabizau
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(http%3A%2F%2Fionicabizau.net)&year=2014#license-mit
[website]: http://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
