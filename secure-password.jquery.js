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

    // Check if password only contains a-z, space and dash

    var alphabetic = password.match(/^[a-zA-Z\- ]+$/);

    if (!!alphabetic && alphabetic[0] === password) {
      if (password.length < 25) {
        return { valid: false, strength: password.length / 25, error: this.options.messages.alphabetic }
      } else {
        return { valid: true, strength: password.length / 25 }
      }
    }

    var alphanumeric = password.match(/^[a-zA-Z0-9\- ]+$/);

    if (!!alphanumeric && alphanumeric[0] === password) {
      if (password.length < 10) {
        return { valid: false, strength: password.length / 10, error: this.options.messages.alphanumeric }
      } else {
        return { valid: true, strength: password.length / 10 }
      }
    }

    // If the password didn't match any regex until here,
    // there are special characters inside
    // so we just check for length

    if (password.length < 6) {
      return { valid: false, strength: password.length / 6, error: this.options.messages.length }
    } else {
      return { valid: true, strength: password.length / 6 }
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
