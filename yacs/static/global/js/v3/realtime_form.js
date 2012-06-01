// Generated by CoffeeScript 1.3.1
(function() {

  window.realtime_form = function(form, target, options) {
    var event_callback, perform_search;
    options = $.extend({
      delay: 500,
      request_start: $.noop,
      event_start: $.noop,
      success: $.noop,
      error: $.noop,
      cancel: $.noop,
      complete: $.noop,
      serializer: function(form, method) {
        return form.serialize();
      },
      binder: function(form, callback) {
        var $form;
        $form = $(form).submit(callback);
        $form.find('input, textarea').keyup(callback);
        $form.find('select').change(callback);
        return $form.find('input[type=search]').bind('search', callback);
      }
    }, options);
    form = $(form);
    target = $(target);
    if (!(target.data('original-html') != null)) {
      target.data('original-html', target.html());
    }
    perform_search = delayfn(options.delay, function() {
      var request;
      options.request_start();
      if (form.data('realtime_form_request') != null) {
        form.data('realtime_form_request').abort();
        Logger.info('cancelled prior ajax request.');
      }
      request = $.ajax(form.attr('action'), {
        type: form.attr('method'),
        data: options.serializer(form),
        success: function(data) {
          target.html(data);
          return options.success();
        },
        error: function() {
          return options.error();
        },
        complete: function() {
          form.data('realtime_form_request', null);
          return options.complete();
        }
      });
      return form.data('realtime_form_request', request);
    });
    event_callback = function() {
      options.event_start();
      return perform_search();
    };
    return options.binder(form, event_callback);
  };

}).call(this);