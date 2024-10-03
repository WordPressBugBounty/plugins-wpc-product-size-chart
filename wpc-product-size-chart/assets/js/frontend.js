'use strict';

(function($) {
  $(document).on('click touch', '.wpcsc-btn', function(e) {
    e.preventDefault();

    var $btn = $(this);
    var $popup = null;
    var pid = $btn.attr('data-pid');
    var cid = $btn.attr('data-cid');
    var ajax_url = null;
    var data = null;

    if (pid !== undefined) {
      // get combined charts
      data = {
        action: 'wpcsc_get_charts', id: pid, nonce: wpcsc_vars.nonce,
      };

      ajax_url = wpcsc_vars.wc_ajax_url.toString().
          replace('%%endpoint%%', 'wpcsc_get_charts');

      if ($('.wpcsc-popup-pid-' + pid).length) {
        $popup = $('.wpcsc-popup-pid-' + pid);
        wpcsc_popup($popup);
      }
    } else if (cid !== undefined) {
      // get singular chart
      data = {
        action: 'wpcsc_get_chart', id: cid, nonce: wpcsc_vars.nonce,
      };

      ajax_url = wpcsc_vars.wc_ajax_url.toString().
          replace('%%endpoint%%', 'wpcsc_get_chart');

      if ($('.wpcsc-popup-cid-' + cid).length) {
        $popup = $('.wpcsc-popup-cid-' + cid);
        wpcsc_popup($popup);
      }
    } else {
      return false;
    }

    if ($popup === null) {
      $btn.addClass('wpcsc-btn-loading');

      $.post(ajax_url, data, function(response) {
        $btn.removeClass('wpcsc-btn-loading');

        if (pid !== undefined) {
          $('<div class="wpcsc-popup wpcsc-popup-pid-' + pid +
              ' mfp-with-anim"></div>').insertAfter($('.wpcsc-popup-initial'));
          $('.wpcsc-popup-pid-' + pid).html(response);
          wpcsc_popup($('.wpcsc-popup-pid-' + pid));
        } else if (cid !== undefined) {
          $('<div class="wpcsc-popup wpcsc-popup-cid-' + cid +
              ' mfp-with-anim"></div>').insertAfter($('.wpcsc-popup-initial'));
          $('.wpcsc-popup-cid-' + cid).html(response);
          wpcsc_popup($('.wpcsc-popup-cid-' + cid));
        }
      });
    }
  });

  function wpcsc_popup($popup) {
    if (wpcsc_vars.library === 'magnific') {
      $.magnificPopup.open({
        items: {
          src: $popup, type: 'inline',
        }, mainClass: 'mfp-wpcsc', callbacks: {
          beforeOpen: function() {
            this.st.mainClass = 'mfp-wpcsc ' + wpcsc_vars.effect;
          }, open: function() {
            $('body').addClass('wpcsc-magnific');
          }, afterClose: function() {
            $('body').removeClass('wpcsc-magnific');
          },
        },
      });
    } else {
      $.featherlight($popup);
    }
  }
})(jQuery);