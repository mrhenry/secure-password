# Secure password

jQuery plugin that checks password safety by some predefined rules. Simpler characters used means longer password needed. Also allows for repeat password pattern.

If you want to check password strength on form submit, use `$('selector').data('securePassword').validate()` which returns a boolean.

It automatically renders progress on a `<progress class="js-progress">` element and shows hints in a `.js-error` div.

## Options

```
js
{
    targets: {
    error: '.js-error',
    match: '.js-match',
    strength: '.js-strength'
  },
  messages: {
    safe: 'Strong is the password.',
    length: 'Password is not long enough.',
    alphabetic: 'Password is not long enough for alphabetic characters only.',
    alphanumeric: 'Password is not long enough for numeric characters only.',
    match: 'Passwords don\'t match'
  }
}
```

## Rules

```
a-z A-Z + dash + space: min length 25
a-z A-Z 0-9 + dash + space: min length 10
a-z A-Z 0-9 + dash + space + special characters: min length 6
```