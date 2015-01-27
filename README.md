# Secure password

jQuery plugin that checks password safety by some predefined rules. Simpler characters used means longer password needed.

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
a-z A-Z + dash + space: min length 25
a-z A-Z 0-9 + dash + space: min length 10
a-z A-Z 0-9 + dash + space + special characters: min length 6
```