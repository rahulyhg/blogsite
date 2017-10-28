var json_encode=function(e){"use strict";return"undefined"==typeof e&&(e=null),JSON.stringify(e)},json_decode=function(e,t){"use strict";if("string"==typeof e){var a;try{a=$.parseJSON(e)}catch(r){a=t}return a}return e},UseCustomFields=function(e){var t=e("body"),a=(e(window),e(document),e("#custom_fields_container")),r=e("#custom_fields_json"),i=json_decode(r.val(),[]),l=function(){var r=0,l={fieldGroup:e("#_render_customfield_field_group_template").html(),globalSkeleton:e("#_render_customfield_global_skeleton_template").html(),text:e("#_render_customfield_text_template").html(),number:e("#_render_customfield_number_template").html(),email:e("#_render_customfield_email_template").html(),password:e("#_render_customfield_password_template").html(),textarea:e("#_render_customfield_textarea_template").html(),checkbox:e("#_render_customfield_checkbox_template").html(),radio:e("#_render_customfield_radio_template").html(),select:e("#_render_customfield_select_template").html(),image:e("#_render_customfield_image_template").html(),file:e("#_render_customfield_file_template").html(),wysiwyg:e("#_render_customfield_wysiswg_template").html(),repeater:e("#_render_customfield_repeater_template").html(),repeaterItem:e("#_render_customfield_repeater_item_template").html(),repeaterFieldLine:e("#_render_customfield_repeater_line_template").html()},n=function(t,a){t.forEach(function(t,r){var i=l.globalSkeleton;i=i.replace(/__type__/gi,t.type||""),i=i.replace(/__title__/gi,t.title||""),i=i.replace(/__instructions__/gi,t.instructions||"");var n=e(i);n.find(".meta-box-wrap").append(c(t)),n.data("lcf-registered-data",t),a.append(n)})},c=function(t){var a=l[t.type],i=e('<div class="lcf-'+t.type+'-wrapper"></div>');switch(i.data("lcf-registered-data",t),t.type){case"text":case"number":case"email":case"password":a=a.replace(/__placeholderText__/gi,t.options.placeholderText||""),a=a.replace(/__value__/gi,t.value||t.options.defaultValue||"");break;case"textarea":a=a.replace(/__rows__/gi,t.options.rows||3),a=a.replace(/__placeholderText__/gi,t.options.placeholderText||""),a=a.replace(/__value__/gi,t.value||t.options.defaultValue||"");break;case"image":a=a.replace(/__value__/gi,t.value||t.options.defaultValue||"");break;case"file":var n=null;null!=t.value?(a=a.replace(/__value__/gi,t.value.id||t.options.defaultValue||""),n='<a href="'+Botble.routes.home+t.value.public_url+'" target="_blank">'+t.value.name+"</a>"):a=a.replace(/__value__/gi,t.value||t.options.defaultValue||""),a=a.replace(/__detail__/gi,n||"No file selected");break;case"select":var c=e(a),u=s(t.options.selectChoices);return u.forEach(function(e,t){c.append('<option value="'+e[0]+'">'+e[1]+"</option>")}),c.val(array_get(t,"value",t.options.defaultValue)),i.append(c),i;case"checkbox":var u=s(t.options.selectChoices),p=json_decode(t.value);return u.forEach(function(t,r){var l=a.replace(/__value__/gi,t[0]||"");l=l.replace(/__title__/gi,t[1]||""),l=l.replace(/__checked__/gi,e.inArray(t[0],p)!=-1?"checked":""),i.append(e(l))}),i;case"radio":var u=s(t.options.selectChoices),_=!1;return u.forEach(function(l,n){var c=a.replace(/__value__/gi,l[0]||"");c=c.replace(/__id__/gi,t.id+t.slug+r),c=c.replace(/__title__/gi,l[1]||""),c=c.replace(/__checked__/gi,t.value===l[0]?"checked":""),i.append(e(c)),t.value===l[0]&&(_=!0)}),_===!1&&i.find("input[type=radio]:first").prop("checked",!0),i;case"repeater":var c=e(a);return c.data("lcf-registered-data",t),c.find("> .repeater-add-new-field").html(t.options.buttonLabel||"Add new item"),c.find("> .sortable-wrapper").sortable(),d(t.items,t.value||[],c.find("> .field-group-items")),c;case"wysiwyg":a=a.replace(/__value__/gi,t.value||""),a=a.replace(/__id__/gi,"editor_"+o()),a=a.replace(/__type__/gi,t.options.wysiwygToolbar)}return i.append(e(a)),i},o=function(){for(var e="",t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",a=0;a<5;a++)e+=t.charAt(Math.floor(Math.random()*t.length));return e},d=function(t,a,r){return r.data("lcf-registered-data",t),a.forEach(function(a,i){var n=r.find("> .ui-sortable-handle").length+1,c=l.repeaterItem;c=c.replace(/__position__/gi,n);var o=e(c);o.data("lcf-registered-data",t),u(t,a,o.find("> .field-line-wrapper > .field-group")),r.append(o)}),r},u=function(t,a,i){return a.forEach(function(t,a){r++;var n=l.repeaterFieldLine;n=n.replace(/__title__/gi,t.title||""),n=n.replace(/__instructions__/gi,t.instructions||"");var o=e(n);o.data("lcf-registered-data",t),o.find("> .repeater-item-input").append(c(t)),i.append(o)}),i},s=function(e){var t=[];return e.split("\n").forEach(function(e,a){var r=e.split(":");r[0]&&r[1]&&(r[0]=r[0].trim(),r[1]=r[1].trim()),t.push(r)}),t};t.on("click",".remove-field-line",function(t){t.preventDefault();var a=e(this);a.parent().animate({opacity:.1},300,function(){a.parent().remove()})}),t.on("click",".collapse-field-line",function(t){t.preventDefault();var a=e(this);a.toggleClass("collapsed-line")}),t.on("click",".repeater-add-new-field",function(t){t.preventDefault();var a=e.extend(!0,{},e(this).prev(".field-group-items")),i=a.data("lcf-registered-data");r++,d(i,[i],a)}),i.forEach(function(t,r){var i=l.fieldGroup;i=i.replace(/__title__/gi,t.title||"");var c=e(i);n(t.items,c.find(".meta-boxes-body")),c.data("lcf-field-group",t),a.append(c)})},n=function(){var t=function(){var t=[];return e("#custom_fields_container").find("> .meta-boxes").each(function(){var r=e(this),i=r.data("lcf-field-group"),l=r.find("> .meta-boxes-body > .meta-box");i.items=a(l),t.push(i)}),t},a=function(t){var a=[];return t.each(function(){a.push(i(e(this)))}),a},i=function(t){var a=e.extend(!0,{},t.data("lcf-registered-data"));switch(a.type){case"text":case"number":case"email":case"password":case"image":case"file":a.value=t.find("> .meta-box-wrap input").val();break;case"wysiwyg":case"textarea":a.value=t.find("> .meta-box-wrap textarea").val();break;case"checkbox":a.value=[],t.find("> .meta-box-wrap input:checked").each(function(){a.value.push(e(this).val())});break;case"radio":a.value=t.find("> .meta-box-wrap input:checked").val();break;case"select":a.value=t.find("> .meta-box-wrap select").val();break;case"repeater":a.value=[];var r=t.find("> .meta-box-wrap > .lcf-repeater > .field-group-items > li");r.each(function(){var t=e(this),r=t.find("> .field-line-wrapper > .field-group");a.value.push(l(r.find("> li")))});break;default:a=null}return a},l=function(t){var a=[];return t.each(function(){var t=e(this);a.push(n(t))}),a},n=function(t){var a=e.extend(!0,{},t.data("lcf-registered-data"));switch(a.type){case"text":case"number":case"email":case"password":case"image":case"file":a.value=t.find("> .repeater-item-input input").val();break;case"wysiwyg":case"textarea":a.value=t.find("> .repeater-item-input textarea").val();break;case"checkbox":a.value=[],t.find("> .repeater-item-input input:checked").each(function(){a.value.push(e(this).val())});break;case"radio":a.value=t.find("> .repeater-item-input input:checked").val();break;case"select":a.value=t.find("> .repeater-item-input select").val();break;case"repeater":a.value=[];var r=t.find("> .repeater-item-input > .lcf-repeater > .field-group-items > li");r.each(function(){var t=e(this),r=t.find("> .field-line-wrapper > .field-group");a.value.push(l(r.find("> li")))});break;default:a=null}return a};r.closest("form").on("submit",function(e){r.val(JSON.stringify(t()))})},c=function(e){"use strict";var t=e.data("type"),a={height:200};"basic"==t&&(a.toolbar=[["mode","Source","Image","TextColor","BGColor","Styles","Format","Font","FontSize","CreateDiv","PageBreak","Bold","Italic","Underline","Strike","Subscript","Superscript","RemoveFormat"]]),BEditor.initEditor(e,a)};return{init:function(){"undefined"!=typeof i&&(l(),n(),c(e(document).find(".wysiwyg-editor")))}}}(jQuery);!function(e){e(document).ready(function(){UseCustomFields.init()})}(jQuery);