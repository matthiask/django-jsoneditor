function init_editor(element) {
    // Check if editor was initialized before
    if (element.innerHTML.length) {
      return;
    }

    var config = JSON.parse(element.dataset.config);
    var field = django.jQuery(element)
      .parent('.jsoneditor-wrapper')
      .find('.datafield textarea').get(0);
    var field_toggle = django.jQuery(element)
      .parent('.jsoneditor-wrapper')
      .find('.datafield .toggle-datafield').get(0);

    // Initialize editor
    var editor = new JSONEditor(element, config);

    // Save field element on editor object for easier access in event
    // handler
    editor.field = field;

    if (field.value) {
      editor.setValue(JSON.parse(field.value));
    }

    // Add click event to toggle datafield containing actual json data
    django.jQuery(field_toggle).on('click', function() {
      django.jQuery(this).siblings('textarea').toggle();
      return false;
    });
    django.jQuery(field_toggle).click();

    return editor;
}

function updateValues(instances) {
  for (var i=0; i<instances.length; i++) {
    var editor = instances[i];
    editor.field.value = JSON.stringify(editor.getValue());
  }
}