if(!EOL)var EOL={};var _TOOLTIP_OPEN=!1;EOL.max_meta_rows=10,EOL.switch_subtab=function(t){$(".about_subtab").hide(),$(".glossary_subtab").hide(),$(".ranges_subtab").hide(),$(".info").hide(),t.parent().hasClass("about")||t.parent().hasClass("glossary")||t.parent().hasClass("ranges")?(EOL.hide_data_tables($("table.data")),$("#taxon_data .empty").hide(),$(".glossary_subtab").hide(),$(".help_text").hide(),$(".filters").hide(),t.parent().hasClass("about")?$(".about_subtab").show():t.parent().hasClass("glossary")?($(".glossary_subtab").show(),$(".glossary_subtab .help_text").show()):t.parent().hasClass("ranges")&&($(".ranges_subtab").show(),$(".ranges_subtab .help_text").show())):t.parent().hasClass("all")?($(".filters").show(),$("#taxon_data .empty").show(),$("#taxon_data > .help_text").show(),EOL.show_data_tables($("table.data"))):($(".filters").show(),EOL.hide_data_tables($("table.data")),EOL.show_data_tables($('table.data[data-toc-id="'+t.data("toc-id")+'"]')),$("#taxon_data > .help_text").show()),t.parent().parent().find("li").removeClass("active"),t.parent().addClass("active"),$("table.data tr.open").removeClass("open"),$("table.data .fold img").attr("src","http://160.111.248.28/assets/arrow_fold_right.png"),$("table.meta").hide(),EOL.limit_data_rows()},EOL.create_info_dialog=function(t){var e=$(t).closest("[id]"),n=e.attr("id");$(t).parent().children(".info_icon").remove(),$(t).attr("id","info_"+n).before('<a id="tip_'+n+'" class="info_icon def" data-info="'+n+'">&emsp;</a>').addClass("tip").prepend('<a href="#" class="close">&nbsp;</a>'),EOL.enable_info_dialogs($("#tip_"+n),$("table.data tr.data, table.meta tr")),EOL.enable_data_tab_glossary_links($(t)),$(t).appendTo(document.body)},EOL.create_info_dialog_for_data_search=function(t){var e=$(t).closest("[id]"),n=e.attr("id");$(t).parent().children(".info_icon").remove(),$(t).attr("id","info_"+n).before('<a id="tip_'+n+'" class="info_icon def" data-info="'+n+'">&emsp;</a>').addClass("tip").prepend('<a href="#" class="close">&nbsp;</a>'),EOL.enable_info_dialogs($("#tip_"+n)),EOL.enable_data_tab_glossary_links($(t)),$(t).appendTo(document.body)},EOL.create_info_ranges_dialog=function(t){var e=$(t).closest("[id]"),n=e.attr("id");$(t).attr("id","info_"+n).addClass("tip").prepend('<a href="#" class="close">&nbsp;</a>').append($(t).parent().parent().children("ul.glossary")),$(t).parent().parent().append('<a id="tip_'+n+'" class="info_icon def" data-info="'+n+'">&emsp;</a>'),EOL.enable_info_dialogs($("#tip_"+n),$("table.ranges tr")),EOL.enable_data_tab_glossary_links($(t)),$(t).parent().parent().children("ul.glossary").remove(),$(t).appendTo(document.body)},EOL.create_collection_taxon_info_dialog=function(t){var e=$(t).closest("[id]"),n=e.attr("id");$(t).attr("id","info_"+n).addClass("tip").prepend('<a href="#" class="close">&nbsp;</a>'),$(t).parent().parent().append('<a id="tip_'+n+'" class="info_icon def" data-info="'+n+'">&emsp;</a>'),EOL.enable_collection_taxa_info_dialogs($("#tip_"+n),$("table.taxon_collection tr")),$(t).parent().parent().children("ul.glossary").remove(),$(t).appendTo(document.body)},EOL.enable_collection_taxa_info_dialogs=function(t,e){t.unbind("click").on("click",function(){$(".site_column").unbind("click");var t=($(this),$("#info_"+$(this).data("info")));if(t.is(":visible"))t.hide("fast");else{$(".info_icon.tip").hide("fast");var e=$(this).offset();t.css({top:e.top+$(this).height()+26,left:e.left+$(this).width()}),$.ajax({url:"/collections/get_uri_name",type:"GET",data:{id:$(this).data("info").split(/[_]+/).pop()},complete:function(){},success:function(e){t.show("fast",function(){$(".site_column").on("click",function(){$(".info_icon").hide("fast"),$(".site_column").unbind("click")})}).find("a.close").on("click",function(){return $(".info_icon").hide("fast"),!1}),t.html('<div style="color:#616e7a; font-size:1.1em">'+e.name+'</div><div style="color:#93a4b0">'+e.uri+"</div>")},error:function(){}})}}),EOL.info_icon_mouse_hover(e)},EOL.enable_data_tab_glossary_links=function(t){t.closest("#taxon_data.main_container").length>0&&(t.find("a.glossary").each(function(){$(this).text($(this).data("tab_link_message"))}),t.find("a.glossary").on("click",function(t){t.preventDefault();var e=$(this);e.closest(".info").hide(),$("#tabs_sidebar li.glossary a").trigger("click"),setTimeout(function(){$("html,body").animate({scrollTop:$("#"+e.data("anchor")).offset().top},500)},100)}))},EOL.enable_info_dialogs=function(t,e){t.unbind("click").on("click",function(t){t.stopPropagation(),$(".site_column").unbind("click");var e=($(this),$("#info_"+$(this).data("info")));if(e.is(":visible"))e.hide("fast");else{$(".info.tip").hide("fast");var n=$(this).offset();e.css({top:n.top+$(this).height()+26,left:n.left+$(this).width()}),e.show("fast",function(){$(".site_column").on("click",function(){$(".info").hide("fast"),$(".site_column").unbind("click")})}).find("a.close").on("click",function(){return $(".info").hide("fast"),!1})}}),EOL.info_icon_mouse_hover(e)},EOL.info_icon_mouse_hover=function(t){$(t).hover(function(){$(this).find(".info_icon.def").addClass("active")},function(){$(this).find(".info_icon").removeClass("active")})},EOL.enable_button=function(t){t.is(":disabled")&&t.removeAttr("disabled").fadeTo(225,1)},EOL.disable_button=function(t){t.is(":disabled")||t.attr("disabled",!0).fadeTo(225,.3)},EOL.attribute_is_not_okay=function(){$("input.predicate_autocomplete").addClass("problems"),$("#new_uri_warning").show(),EOL.disable_measurement_input()},EOL.attribute_is_okay=function(){$("input.predicate_autocomplete").removeClass("problems"),$("#new_uri_warning").hide(),"measurement"==$("#predicate_uri_type").val()&&""!==$(".predicate_autocomplete").val()?$("fieldset.unit_of_measure").fadeIn(100):EOL.disable_measurement_input()},EOL.disable_measurement_input=function(){$("fieldset.unit_of_measure").fadeOut(100),$("fieldset.unit_of_measure input").val("")},EOL.hide_data_tables=function(t){t.hide(),t.prev("div.header_underlined").hide()},EOL.show_data_tables=function(t){t.show(),t.prev("div.header_underlined").show(),t.find("tr.data").show(),t.find("tr.actions").hide(),$("#curation_legend.help_text").show()},EOL.toggle_actions_row=function(t){var e=t.find(".fold img"),n=t.next(),i=n.children("td"),a=t.next().find("table.meta");if(e.parent().attr({title:"translation missing: en.data_row_additional_detail_assistive_js"}),n.is(":visible"))e.attr({src:"http://160.111.248.28/assets/arrow_fold_right.png",alt:"translation missing: en.data_row_additional_detail_show_alt"}),n.hide(),a.hide();else{var o=t.attr("id");t.data("loading")!==!0&&t.data("loaded")!==!0?(e.attr({src:"http://160.111.248.28/assets/indicator_arrows_black.gif",alt:"translation missing: en.data_row_additional_detail_loading_alt"}),t.data("loading",!0),$.ajax({url:"/data_point_uris/"+o.replace("data_point_","")+"/show_metadata",dataType:"html",success:function(t){var e=i.prepend(t);e.find(".info").each(function(){var t=$(this).find("ul.glossary > li")[0].outerHTML,e=$(this).find(".uri").text();EOL.create_info_dialog(this),$('.glossary_subtab ul.glossary:not(:contains("'+e+'"))').append(t)}),$(".glossary_subtab ul.glossary > li").sort(EOL.sort_glossary).appendTo(".glossary_subtab ul.glossary"),EOL.enable_hover_list_items()},error:function(t,e){n.html("<p>Sorry, there was an error: "+e+"</p>")},complete:function(){e.attr({src:"http://160.111.248.28/assets/arrow_fold_down.png",alt:"translation missing: en.data_row_additional_detail_hide_alt"}),n.show(),EOL.yank_glossary_terms(n),a.show(),t.data("loading",!1),t.data("loaded",!0),e.attr("src","http://160.111.248.28/assets/arrow_fold_down.png")}})):t.data("loading")!==!0&&(e.attr({src:"http://160.111.248.28/assets/arrow_fold_down.png",alt:"translation missing: en.data_row_additional_detail_hide_alt"}),n.show(),a.show())}},EOL.sort_glossary=function(t,e){return $(e).find("dt").text()<$(t).find("dt").text()?1:-1},EOL.enable_suggestions_hover=function(){$("input.predicate_autocomplete").parent().hover(function(){$("ul.ui-autocomplete").is(":visible")||""!==$("input.predicate_autocomplete").val()?$("div#suggestions").hide():$("div#suggestions").show()},function(){$("div#suggestions").hide()})},EOL.disable_suggestions_hover=function(){$("input.predicate_autocomplete").parent().unbind("hover")},EOL.update_input_id_and_name=function(t,e){t.find("input").each(function(){$(this).attr("id",$(this).attr("id").replace(/\d+/,e)),$(this).attr("name",$(this).attr("name").replace(/\d+/,e)),$(this).data("id-element")&&$(this).data("id-element",$(this).data("id-element").replace(/\d+/,e)),$(this).data("include-predicate_known_uri_id")&&$(this).data("include-predicate_known_uri_id",$(this).data("include-predicate_known_uri_id").replace(/\d+/,e)),$(this).attr("data-update-elements")&&$(this).attr("data-update-elements",$(this).attr("data-update-elements").replace(/\d+/,e))})},EOL.limit_data_rows=function(){$("table.data tr.more").remove(),$("table.data tr.data.first_of_type:visible").each(function(){var t=$(this).data("type"),e=$(this).closest("table").find('tr[data-type="'+t+'"]:visible');if(e.length>EOL.max_meta_rows){var n=1;e.each(function(){n>EOL.max_meta_rows&&$(this).hide(),n++}),e.filter(":last").after('<tr data-type="'+t+'" class="data nested more"><th></th><td><a href="#" class="more">'+$("table.data").data("more").replace("NNN",e.length-EOL.max_meta_rows)+"</a></td><td></td><td></td></tr>"),$("tr.more a.more").unbind("click").on("click",function(){var t=$(this).closest("tr");return $('tr.data[data-type="'+t.data("type")+'"]').show(),t.remove(),!1})}})},EOL.yank_glossary_terms=function(){},EOL.enable_hover_list_items=function(){$("ul.glossary li").hover(function(){$(this).find("li.hover").show()},function(){$(this).find("li.hover").hide()})},EOL.update_unit_select_options=function(t){$.ajax({url:"/known_uris/autocomplete_known_uri_units?predicate_known_uri_id="+t,dataType:"json",success:function(t){$("select#unit").find("option:gt(0)").remove(),$.each(t,function(t,e){$("select#unit").append($("<option></option>").attr("value",e.uri).text(e.value))})}})},$(function(){if($(".has_many").each(function(){var t=$(this).clone();t.find(".once").remove();var e=$(this).closest("form").find("input[id^=user_added_data_user_added_data_metadata_attributes]").filter(":last"),n=parseInt(e.attr("id").match(/(\d+)/)[1]);EOL.update_input_id_and_name(t,n+=1),t.appendTo($(this)).addClass("subform").hide(),$(this).append('<span class="add"><a href="#">'+$(this).data("another")+"</a></span>"),$(this).find(".add a").on("click",function(){t.clone().insertBefore($(this).parent()).show(),EOL.update_input_id_and_name(t,n+=1);var e=$(".has_many_expandable").height();return $(".has_many_expandable").height(e+t.height()),!1})}),$("div#suggestions").appendTo($("input.predicate_autocomplete").parent()),$("input.predicate_autocomplete").keyup(function(t){var e=t.keyCode||t.which;if(13!==e){var n=$(this);""!==n.val()&&$("div#suggestions").hide(),""!==$("input.predicate_known_uri_id").val()&&($("input.predicate_known_uri_id").val(""),EOL.attribute_is_not_okay()),""===n.val()||""!==$("input.predicate_known_uri_id").val()?EOL.attribute_is_okay():EOL.attribute_is_not_okay()}}).focus(function(){""===$(this).val()&&$("div#suggestions").show()}),EOL.enable_suggestions_hover(),$("fieldset.unit_of_measure").hide(),$("table.data .fold a").on("click",function(){return $(this).closest("tr").click(),!1}),$("table.data tr.actions").hide().prev().find(".fold img").attr("src","http://160.111.248.28/assets/arrow_fold_right.png"),$("table.data tr.data").on("click",function(t){var e;return t.target?e=$(t.target):t.srcElement&&(e=$(t.srcElement)),e.is("tr")||(e=e.closest("tr")),e.hasClass("hidden")&&e.closest("table.search").length>0?void 0:$(t.target).is("a")?(t.stopPropagation(),void 0):(EOL.toggle_actions_row(e),void 0)}),$("table.data tr.actions td .metadata").live("click",function(t){$(t.target).closest("a").length||EOL.toggle_actions_row($(this).closest("tr").prev())}),$("#recently_used_category a").on("click",function(){$("#suggestions").find(".child").hide();for(var t=$(this).parent().next();t.hasClass("child");)t.show(),t=t.next();return!1}),$("li.attribute").live("click",function(){var t=$(this).find(".name");$("input.predicate_autocomplete").val(t.text()),$("input.predicate_known_uri_id").val(t.data("id")),$("#predicate_uri_type").val(t.data("uri_type")),$("#user_added_data_has_values").val(t.data("has_values")),EOL.attribute_is_okay(),$("div#suggestions").hide()}),$("input.predicate_autocomplete").bind("railsAutocomplete.select",function(){EOL.attribute_is_okay()}),$("input[data-autocomplete]").live("focus",function(){if($(this).data("autocomplete").match(/known_uri_values/)){var t=$(this).closest("div").find('input[id*="has_values"]:first');t.length>0&&("1"===t.val()?$(this).autocomplete("enable"):$(this).autocomplete("disable"))}$(this).hasClass("predicate_autocomplete")?$(this).autocomplete("search",$(this).val()):$(this).autocomplete("search"," ")}),$("input[data-autocomplete]").keyup(function(t){var e=t.keyCode||t.which;37!==e&&38!==e&&39!==e&&40!==e&&""===$(this).val()&&($(this).hasClass("predicate_autocomplete")?$("div#suggestions").show():$(this).autocomplete("search"," "))}),$("#tabs_sidebar.data ul.subtabs a").on("click",function(){return EOL.switch_subtab($(this)),!1}),EOL.limit_data_rows(),""!==location.hash){var t=location.hash.replace(/\?.*$/,""),e=$(t);if(e.click(),void 0!==e.offset()){var n=e.offset().top-200;$("html, body").animate({scrollTop:n})}}$("#data_summary table").hover(function(){$("span.remove").show()},function(){$("span.remove").hide()}).find("span.remove").hide(),$("a.button.hidden").hide(),$("#sortable.standard.uris").sortable({placeholder:"placeholder",items:"tr:not(.headers)",helper:"clone",tolerance:"pointer",update:function(t,e){$.post("/known_uris/sort",{known_uris:$("#sortable").sortable("toArray"),moved_id:e.item.attr("id")})}}).disableSelection(),$("#sortable a.to_top").on("click",function(){return $.post("/known_uris/sort",{to:"top",moved_id:$(this).closest("tr").attr("id")}),!1}),$("#sortable a.to_bottom").on("click",function(){return $.post("/known_uris/sort",{to:"bottom",moved_id:$(this).closest("tr").attr("id")}),!1}),$("#sortable a.to_top_p_harvest").on("click",function(){return $.post("/pending_harvests/sort",{to:"top",moved_id:$(this).closest("tr").attr("id")}),!1}),$("#sortable a.to_bottom_p_harvest").on("click",function(){return $.post("/pending_harvests/sort",{to:"bottom",moved_id:$(this).closest("tr").attr("id")}),!1}),$("#sortable.standard.pending_harvests").sortable({placeholder:"placeholder",items:"tr:not(.headers)",helper:"clone",tolerance:"pointer",update:function(t,e){$.post("/pending_harvests/sort",{pending_harvests:$("#sortable").sortable("toArray"),moved_id:e.item.attr("id")})}}).disableSelection(),$("#pause_p_harvest").on("click",function(){return document.getElementById("pause_pending_harvests").style.display="none",document.getElementById("resume_pending_harvests").style.display="block",$.post("/pending_harvests/pause_harvesting"),!1}),$("#resume_p_harvest").on("click",function(){return document.getElementById("resume_pending_harvests").style.display="none",document.getElementById("pause_pending_harvests").style.display="block",$.post("/pending_harvests/resume_harvesting"),!1}),$("table.data tr .info, table.data.search tr .info").each(function(){EOL.create_info_dialog(this)}),$("form.copy .vital li .info, form.copy .vital.search li .info").each(function(){EOL.create_info_dialog_for_data_search(this)}),$("table.ranges tr .info, table.ranges.search tr .info").each(function(){EOL.create_info_ranges_dialog(this)}),$("table.taxon_collection tr .info_icon, table.taxon_collection.search tr .info_icon").each(function(){EOL.create_collection_taxon_info_dialog(this)}),$(".add_content .article").hide(),$(".add_content .add_data a").on("click",function(){var t=$(".add_content .article");return t.is(":visible")?($(this).removeClass("open"),$(".add_content .article").hide()):($(this).addClass("open"),$(".add_content .article").show()),!1}),EOL.enable_hover_list_items(),$(".page_actions .data_download a").on("click",function(){window.alert($(this).parent().data("alert").replace(/<\/?[^>]+>/g,""))}),$("#known_uris.glossary ul.chapters li").find("a, input").on("click",function(t){t.preventDefault();var e=$(this).closest("li"),n=e.find("input"),i=$("#known_uris.glossary ul.chapters");return e.hasClass("selected")?(e.removeClass("selected"),setTimeout(function(){n.prop("checked",!1)},5),0===i.find("li.selected").length?$("ul.glossary > li").show():$('ul.glossary li[data-toc-id~="'+e.data("toc-id")+'"]').hide()):(0===i.find("li.selected").length&&$("ul.glossary > li").hide(),e.addClass("selected"),setTimeout(function(){n.prop("checked",!0)},5),$('ul.glossary li[data-toc-id~="'+e.data("toc-id")+'"]').show()),!1}),$("#data_search select#attribute").on("change",function(){EOL.update_unit_select_options($(this).find(":selected").data("known_uri_id"))})});