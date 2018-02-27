Curly braces
---

[![Build Status](https://travis-ci.org/LucianBuzzo/curly-braces.svg?branch=master)](https://travis-ci.org/LucianBuzzo/curly-braces)

Exports a function called `validBraces` that takes a string of braces, and 
determines if the order of the braces is valid. `validBraces` will return true 
if the string is valid, and false if it's invalid.

All input strings should be nonempty, and should only consist of open 
parentheses '(' , closed parentheses ')', open brackets '[', closed brackets ']'
, open curly braces '{' and closed curly braces '}'.

What is considered Valid?
---
---

A string of braces is considered valid if all braces are matched with the correct brace. For example:

'(){}[]' and '([{}])' would be considered valid, while '(}', '[(])', and '[({})](]' would be considered invalid.

Usage
---

```js
const isValid = validBraces('()[]{()}');
```

