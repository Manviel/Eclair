(function($) {
    $.fn.fancy_select = function() {
        return this.each(function() {
            if ($(this).attr("tagName").toLowerCase() !== 'select') {
                return;
            }
            var val = null;
            var val_html = '-';
            $(this).children(':selected').each(function() {
                val = $(this).val();
                val_html = $(this).text();
            });
            var html = '';
            $(this).children().each(function() {
                if ($(this).attr("tagName").toLowerCase() === 'option') {
                    html += '\
                        <div data="' + $(this).val().replace(/"/, '&quot;') + '"' + ($(this).text() !== $(this).val() ? ' data-html="' + $(this).text() + '"' : '') + '" class="fancy_select_item' + ($(this).val() == val ? ' active' : '') + '">' + $(this).text() + '</div>\
                    ';
                } else {
                    html += '\
                        <div class="fancy_select_item">' + $(this).text() + '</div>\
                    ';
                }
            });
            html = '\
                <span class="fancy_select_data">' + val_html.replace(/"/, '&quot;') + '</span>\
                <div class="fancy_select_button"></div>\
                <div class="fancy_select_menu">\
                    ' + html + '\
                </div>\
                ' + ($(this).attr('name') !== 'undefined' ? '<input type="hidden" value="' + (val === null ? '' : val.replace(/"/, '&quot;')) + '" name="' + $(this).attr('name').replace(/"/, '&quot;') + '" />' : '') + '\
            ';
            var style = $(this).attr('style');
            $(this)
                    .wrapAll('<div class="fancy_select"' + (style ? ' style="' + style + '"' : '') + '></div>')
                    .parent()
                    .html(html)
                    .unbind('click')
                    .click(function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        var current = this;
                        $('.fancy_select > .fancy_select_button.active').each(function() {
                            if ($(this).parent()[0] != current) {
                                $(this).removeClass('active');
                                $(this).siblings('.fancy_select_menu').slideUp(100);
                            }
                        });
                        if (!$(this).children('.fancy_select_button').hasClass('active')) {
                            e.preventDefault();
                            e.stopPropagation();
                            $(this).children('.fancy_select_button').addClass('active');
                            $(this).children('.fancy_select_menu').css({'opacity': 0}).slideDown(1, function() {
                                $(this).children('.fancy_select_item').each(function() {
                                    $(this).attr('data-height', $(this).outerHeight());
                                });
                                $(this).slideUp(1, function() {
                                    $(this).css({'opacity': 1});
                                    var scroll_pos = 0, i = 0;
                                    $(this).children('.fancy_select_item').each(function() {
                                        if ($(this).hasClass('active')) {
                                            scroll_pos = i;
                                            return false;
                                        }
                                        i += parseInt($(this).attr('data-height'));
                                    });
                                    var max = ($('#content').offset().top + $('#content').outerHeight()) - ($(this).parent().offset().top + $(this).parent().outerHeight()) - 8;
                                    $(this).css({'max-height': (max > 225 ? 225 : max)});
                                    $(this).slideDown(100).scrollTop(scroll_pos);
                                });
                            });
                        } else {
                            $(this)
                                    .children('.fancy_select_button')
                                    .removeClass('active')
                                    .siblings('.fancy_select_menu')
                                    .slideUp(100);
                        }
                    })
                    .children('.fancy_select_menu')
                    .children('.fancy_select_item')
                    .unbind('click')
                    .click(function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        $(this).parent().children('.fancy_select_item').each(function() {
                            $(this).removeClass('active');
                        });
                        $(this).addClass('active');
                        $(this)
                                .parent()
                                .parent()
                                .children('.fancy_select_data')
                                .html(typeof ($(this).attr('data-html')) != "undefined" ? $(this).attr('data-html') : $(this).attr('data'))
                                .parent()
                                .children('input')
                                .val($(this).attr('data'));
                        $(this).parent().parent().children('.fancy_select_button').removeClass('active');
                        $(this).parent().parent().children('.fancy_select_menu').slideUp(100);
                    });
        });
    };
})(jQuery);

jQuery(document).ready(function($) {
    $(document).unbind('click').click(function(e) {
        $('.fancy_select > .fancy_select_button.active').each(function() {
            $(this)
                    .removeClass('active')
                    .siblings('.fancy_select_menu')
                    .slideUp(100);
        });
    });
    $('select.fancy_select').fancy_select();
});
