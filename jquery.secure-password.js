// Example call: $('input[type="password"]').securePassword();
// See defaults for options

;(function ($, window, document, undefined) {

  var defaults = {
    targets: {
      error: '.js-error',
      strength: '.js-strength'
    },
    messages: {
      safe: 'Strong is the password.',
      length: 'Password is not long enough.',
      alphabetic: 'Password is not long enough for alphabetic characters only.',
      alphanumeric: 'Password is not long enough for numeric characters only.'
    }
  };

  function SecurePassword (el, options) {
    this.el = el;
    this.$el = $(el);

    this.options = $.extend({}, defaults, options);

    this.init().bind();
  }

  SecurePassword.prototype.init = function () {
    return this;
  }

  SecurePassword.prototype.bind = function () {
    this.$el.on('keyup blur', $.proxy(function () {
      var res = this.checkPasswordStrength(this.$el.val());

      if (!res.valid && !!res.error) {
        $(this.options.targets.error).text(res.error);
      } else {
        $(this.options.targets.error).text(this.options.messages.safe);
      }

      $(this.options.targets.strength).attr('value', res.strength);

    }, this));

    return this;
  }

  SecurePassword.prototype.checkPasswordStrength = function (password) {
    var alphabetic, alphanumeric, length;

    password = new Password(password);

    alphabetic = password.checkAlphabetic();
    if (!!alphabetic) { return $.extend(alphabetic, { error: this.options.messages.alphabetic }); }

    alphanumeric = password.checkAlphaNumeric();
    if (!!alphanumeric) { return $.extend(alphanumeric, { error: this.options.messages.alphanumeric }); }

    length = password.checkLength();
    if (!!length) { return $.extend(length, { error: this.options.messages.length }); }
  }

  function Password (password) {
    this.password = password;
  }

  Password.prototype.checkAlphabetic = function (minLength) {
    var matched = this.password.match(/^[a-zA-Z\- ]+$/);
    minLength = minLength || 25;

    if (!!matched && matched[0] === this.password) {
      return { valid: (this.password.length >= minLength), strength: this.password.length / minLength }
    }

    return false;
  }

  Password.prototype.checkAlphaNumeric = function (minLength) {
    var matched = this.password.match(/^[a-zA-Z0-9\- ]+$/);
    minLength = minLength || 10;

    if (!!matched && matched[0] === this.password) {
      return { valid: (this.password.length >= minLength), strength: this.password.length / minLength }
    }

    return false;
  }

  Password.prototype.checkLength = function (minLength) {
    minLength = minLength || 6;

    return { valid: (this.password.length >= minLength), strength: this.password.length / minLength }
  }

  $.fn['securePassword'] = function (options) {
    return this.each(function () {
      if (!$.data(this, 'securePassword')) {
        $.data(this, 'securePassword', new SecurePassword(this, options));
      }
    });
  }

}(jQuery, window, document));
