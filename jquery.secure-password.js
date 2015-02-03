// Example call: $('input[type="password"]').securePassword();
// See defaults for options

;(function ($, window, document, undefined) {

  var defaults = {
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
  };

  function SecurePassword (el, options) {
    this.el = el;
    this.$el = $(el);

    this.options = $.extend({}, defaults, options);

    this.targets = {
      $error: $(this.options.targets.error),
      $match: $(this.options.targets.match),
      $strength: $(this.options.targets.strength)
    };

    this.init().bind();
  }

  SecurePassword.prototype.init = function () {
    this.targets.$match.attr('disabled', 'disabled');

    return this;
  }

  SecurePassword.prototype.bind = function () {
    this.$el.on('keyup blur', $.proxy(function () {
      var res = this.checkPasswordStrength(this.$el.val());

      this.targets.$match.val('');

      if (!res.valid && !!res.error) {
        this.targets.$error.text(res.error);
        this.targets.$match.attr('disabled', 'disabled');
        this.targets.$match.val('');
      } else {
        this.targets.$error.text(this.options.messages.safe);
        this.targets.$match.removeAttr('disabled');
      }

      this.targets.$strength.attr('value', res.strength);

    }, this));

    this.targets.$match.on('keyup blur', $.proxy(function () {
      var res = this.checkMatch(this.$el.val());

      if (!res.valid && !!res.error) {
        this.targets.$error.text(res.error);
      } else {
        this.targets.$error.text(this.options.messages.safe);
      }

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

  SecurePassword.prototype.checkMatch = function (password) {
    var $match = $(this.options.targets.match);

    if (!!$match.length) {
      if ($match.val() === password) {
        return { valid: true };
      } else {
        return { valid: false, error: this.options.messages.match }
      }
    }

    return { valid: true };
  };

  SecurePassword.prototype.validate = function () {
    var password = this.$el.val();

    return (this.checkPasswordStrength(password).valid && this.checkMatch(password).valid);
  };

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
