jQuery(document).ready(function(){$("input[type=checkbox]").uniform(),$("#auto-checkboxes li").tree({onCheck:{node:"expand"},onUncheck:{node:"collapse"},dnd:!1,selectable:!1}),$("#mainNode .checker").change(function(){var e=jQuery(this).attr("data-set"),t=jQuery(this).is(":checked");jQuery(e).each(function(){t?$(this).attr("checked",!0):$(this).attr("checked",!1)}),jQuery.uniform.update(e)})});var expandCollapseTree=function(e){return $("#"+e).hasClass("collapsed")?$("#auto-checkboxes li").tree("expand",$("#"+e)):$("#auto-checkboxes li").tree("collapse",$("#"+e)),event.stopImmediatePropagation(),!1};