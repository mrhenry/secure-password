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
      lengthAlphaNum: 'Password is not long enough for lowercase alphanumeric.',
      lengthAlphaNumMixed: 'Password is not long enough for mixed case alphanumeric.',
      whitespace: 'Password should not contain whitespace'
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
    if (!!password.match(/\s+/g)) {
      return { valid: false, error: this.options.messages.whitespace };
    }

    // Check if password only contains a-z and dash

    var hasLowercaseOnly = password.match(/^[a-z0-9\-]+$/);

    if (!!hasLowercaseOnly && hasLowercaseOnly[0] === password) {
      if (password.length < 18) {
        return { valid: false, strength: password.length / 18, error: this.options.messages.lengthAlphaNum }
      } else {
        return { valid: true, strength: password.length / 18 }
      }
    }

    var hasUppercase = password.match(/^[a-zA-Z0-9\-]+$/);

    if (!!hasUppercase && hasUppercase[0] === password) {
      if (password.length < 12) {
        return { valid: false, strength: password.length / 12, error: this.options.messages.lengthAlphaNumMixed }
      } else {
        return { valid: true, strength: password.length / 12 }
      }
    }

    // If the password didn't match any regex until here,
    // there are special characters inside
    // so we just check for length

    if (password.length < 8) {
      return { valid: false, strength: password.length / 8, error: this.options.messages.length }
    } else {
      return { valid: true, strength: password.length / 8 }
    }

  }

  $.fn['securePassword'] = function (options) {
    return this.each(function () {
      if (!$.data(this, 'securePassword')) {
        $.data(this, 'securePassword', new SecurePassword(this, options));
      }
    });
  }

}(jQuery, window, document));
