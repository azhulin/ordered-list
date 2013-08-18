(function($) {
  $(function() {
    var widgets = $('.field-type-ordered-list');
    widgets.each(function() {
      var target = $(this)
        , input = $('input', target)
        , left = $('a.button-left', target)
        , right = $('a.button-right', target)
        , available = $('.items-available .item-list ul', target)
        , selected = $('.items-selected .item-list ul', target);
      !selected.length && (selected = $('<ul/>').appendTo('.items-selected .item-list'));
      available.add(selected).find('li').click(function() {
        $(this).toggleClass('selected');
      });
      left.click(function() {
        $('li.selected', available).removeClass('selected').appendTo(selected);
        return false;
      });
      right.click(function() {
        $('li.selected', selected).each(function() {
          var self = $(this).removeClass('selected').detach()
            , index = $(this).attr('index')
            , items = $('li', available);
          items.each(function() {
            if (index < $(this).attr('index')) {
              self.insertBefore($(this));
              return false;
            }
          });
          !self.parent().length && self.appendTo(available);
        });
        return false;
      });
      left.add(right).click(function() {
        var value = [];
        $('li', selected).each(function() {
          value.push($(this).attr('key'));
        });
        input.val(value.join('|'));
      });
    });
  });
})(jQuery);
