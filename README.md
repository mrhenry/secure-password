# Secure password

jQuery plugin that checks password safety by some rules. Simpler characters used means longer password needed.

It automatically renders progress on a `<progress class="js-progress">` element and shows hints in a `.js-error` div.

## Options

```
{
  targets: {
    error: '.js-error',
    strength: '.js-strength'
  },
  messages: {
    safe: 'Strong is the password.',
    length: 'Password is not long enough.',
    lengthAlphaNum: 'Password is not long enough for lowercase alphanumeric.',
    lengthAlphaNumMixed: 'Password is not long enough for mixed case alphanumeric.',
    whitespace: 'Password should not contain whitespace'
  }
}
```

## Rules

```
a-z 0-9 + dash: min length 18
a-z A-Z 0-9 + dash: min length 12
a-z A-Z 0-9 + dash + special characters: min length 8
```