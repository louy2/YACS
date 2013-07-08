// Generated by CoffeeScript 1.6.3
(function() {
  $.extend($.fn, {
    checked: function() {
      var checkboxes;
      checkboxes = this.filter('input[type=checkbox], input[type=radio]');
      if (arguments.length < 1) {
        return checkboxes.attr('checked') != null;
      }
      if (arguments[0]) {
        checkboxes.attr('checked', 'checked');
      } else {
        checkboxes.removeAttr('checked');
      }
      return this;
    }
  });

}).call(this);
