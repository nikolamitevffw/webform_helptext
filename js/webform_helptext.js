(function ($) {
  Drupal.behaviors.webformHelptext = {
    attach: function (context, settings) {
      var webform_uuid = settings.webform_uuid;
      $('#webform-uuid-' + webform_uuid, context).once(function(){
        var helpText = settings.webformHelptext.helpText;
        for (var field in helpText) {
          if (helpText[field].value.length > 0) {
            // Build info icon.
            var infoIcon = $('<span></span>', {'class' : 'help-text-info-icon', 'id' : field}).text("i");
            infoIcon.attr('help-text', helpText[field].value);
            var webform_component = $('*[data-info-icon="info-icon-' + field + '"]');

            // Adjust icon attachment depending on webform component type.
            if (webform_component.parents('.webform-datepicker').length > 0) {
              var datepicker_container = webform_component.closest('.webform-datepicker');
              datepicker_container.append(infoIcon);
            }
            else if (webform_component.is(':checkbox')) {
              var checkbox_container = webform_component.closest('.form-checkboxes');
              checkbox_container.append(infoIcon);
            }
            else if (webform_component.is(':radio')) {
              var radios_container = webform_component.closest('.form-radios');
              radios_container.append(infoIcon);
            }
            else {
              webform_component.parent().append(infoIcon);
            }
          }
        }

        // Show help text block on mouse enter.
        $('.help-text-info-icon', context).mouseenter(function (e) {
          var infoBlock = $('<span></span>', {'class' : 'help-text-info-block'}).text($(this).attr('help-text'));
          $(this).parent().append(infoBlock);
        });

        // Remove the help text block on mouse leave.
        $('.help-text-info-icon', context).mouseleave( function (e) {
          $('.help-text-info-block').remove();
        });

      });
    }
  }
}(jQuery));
