!function(t){t.widget("custom.combobox",{_create:function(){this.wrapper=t("<span>").addClass("custom-combobox").insertAfter(this.element),this.element.hide(),this._createAutocomplete(),this._createShowAllButton()},_createAutocomplete:function(){var e=this.element.children(":selected"),i=e.val()?e.text():"";this.input=t("<input>").appendTo(this.wrapper).val(i).attr("title","").addClass("custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left").autocomplete({delay:0,minLength:0,source:t.proxy(this,"_source")}).tooltip({tooltipClass:"ui-state-highlight"}),this._on(this.input,{autocompleteselect:function(t,e){e.item.option.selected=!0,this._trigger("select",t,{item:e.item.option})},autocompletechange:"_removeIfInvalid"})},_createShowAllButton:function(){var e=this.input,i=!1;t("<a>").appendTo(this.wrapper).button({icons:{primary:"ui-icon-triangle-1-s"},text:!1}).removeClass("ui-corner-all").addClass("custom-combobox-toggle ui-corner-right").mousedown(function(){i=e.autocomplete("widget").addClass("combobox").is(":visible")}).click(function(){e.focus(),i||e.autocomplete("search","")})},_source:function(e,i){var n=new RegExp(t.ui.autocomplete.escapeRegex(e.term),"i");i(this.element.children("option").map(function(){var i=t(this).text();return!this.value||e.term&&!n.test(i)?void 0:{label:i,value:i,option:this}}))},_removeIfInvalid:function(e,i){if(!i.item){var n=this.input.val(),s=n.toLowerCase(),o=!1;this.element.children("option").each(function(){return t(this).text().toLowerCase()===s?(this.selected=o=!0,!1):void 0}),o||(this.input.val("").attr("title").tooltip("open"),this.element.val(""),this._delay(function(){this.input.tooltip("close").attr("title","")},2500))}},_destroy:function(){this.wrapper.remove(),this.element.show()}})}(jQuery),$(function(){$("#combobox").children("#attribute").combobox(),$("#toggle").click(function(){$("#combobox").toggle()})});