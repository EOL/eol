function update_browser(e,t){$.ajax({url:"/navigation/browse",complete:function(){scroll(0,100)},success:function(e){$("#hierarchy_browser").html(e)},error:function(){$("#classification_browser").html("<p>Sorry, there was an error.</p>")},data:{id:e,expand:t}})}function update_browser_stats(e,t){$.ajax({url:"/navigation/browse_stats",complete:function(){scroll(0,100)},success:function(e){$("#hierarchy_browser").html(e)},error:function(){$("#classification_browser").html("<p>Sorry, there was an error.</p>")},data:{id:e,expand:t}})}function select_clade_of_clade_selector(e){EOL.clade_selector_input_field().val(e),unselect_all_clades_of_clade_selector(),$("li.value_"+e).addClass("selected")}function clear_clade_of_clade_selector(){EOL.clade_selector_input_field().val(""),unselect_all_clades_of_clade_selector()}function unselect_all_clades_of_clade_selector(){$("div#"+EOL.clade_selector_id+" ul.tree li.selected").removeClass("selected")}EOL||(EOL={}),EOL.clade_selector_input_name||(EOL.clade_selector_input_name="selected-clade-id"),EOL.clade_selector_id||(EOL.clade_selector_id="selected-clade-id"),EOL.clade_selector_id||(EOL.clade_selector_id='<img src="http://10.252.248.38:8081//assets/indicator_arrows_black-64c3fa4ca5da1de29e4cb6bfe7930e13.gif"/>'),EOL.clade_behavior_needs_load||(EOL.clade_behavior_needs_load="yes"),EOL.expand_clade_behavior||(EOL.expand_clade_behavior=function(){$(".browsable.classifications a.show_tree").unbind("click").on("click",function(){var e=$(this).closest(".browsable.classifications"),t="lang="+$("html").attr("lang");return EOL.ajax_submit($(this),{update:e,type:"GET",data:t}),!1}),"yes"==EOL.clade_behavior_needs_load&&(EOL.clade_behavior_needs_load="nope",EOL.expanding_clade_spinner||(EOL.expanding_clade_spinner=$("#orig-clade-spinner").html()),$("a.expand-clade").on("click",function(){$(this).append(EOL.expanding_clade_spinner),$("value_"+$(this).attr("clade_id")).html(EOL.indicator_arrows_html);var e="#"+EOL.clade_selector_id+"-inner ul.tree";return EOL.clade_behavior_needs_load="yes",$(e).load($(this).attr("href")+" "+e,"",function(){EOL.expand_clade_behavior(),$(".clade-spinner").remove()}),!1}))}),$(document).ready(function(){EOL.expand_clade_behavior()}),EOL.clade_selector_input_field||(EOL.clade_selector_input_field=function(){return $("#"+EOL.clade_selector_input_name.replace(/\]/,"").replace(/\[/,"_"))});