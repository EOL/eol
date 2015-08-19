/*
Copyright (c) 2003-2012, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/
CKEDITOR.dialog.add("scaytcheck",function(e){function t(){return"undefined"!=typeof document.forms["optionsbar_"+h]?document.forms["optionsbar_"+h].options:[]}function i(){return"undefined"!=typeof document.forms["languagesbar_"+h]?document.forms["languagesbar_"+h].scayt_lang:[]}function n(e,t){if(e){var i=e.length;if(void 0==i)return e.checked=e.value==t.toString(),void 0;for(var n=0;i>n;n++)e[n].checked=!1,e[n].value==t.toString()&&(e[n].checked=!0)}}function a(e){p.getById("dic_message_"+h).setHtml('<span style="color:red;">'+e+"</span>")}function o(e){p.getById("dic_message_"+h).setHtml('<span style="color:blue;">'+e+"</span>")}function r(e){e=String(e);for(var t=e.split(","),i=0,n=t.length;n>i;i+=1)p.getById(t[i]).$.style.display="inline"}function s(e){e=String(e);for(var t=e.split(","),i=0,n=t.length;n>i;i+=1)p.getById(t[i]).$.style.display="none"}function l(e){p.getById("dic_name_"+h).$.value=e}{var c,d,u=!0,p=CKEDITOR.document,h=e.name,m=CKEDITOR.plugins.scayt.getUiTabs(e),g=[],f=0,v=["dic_create_"+h+",dic_restore_"+h,"dic_rename_"+h+",dic_delete_"+h],b=["mixedCase","mixedWithDigits","allCaps","ignoreDomainNames"],y=e.lang.scayt,k=[{id:"options",label:y.optionsTab,elements:[{type:"html",id:"options",html:'<form name="optionsbar_'+h+'"><div class="inner_options">	<div class="messagebox"></div>	<div style="display:none;">		<input type="checkbox" name="options"  id="allCaps_'+h+'" />		<label for="allCaps" id="label_allCaps_'+h+'"></label>	</div>	<div style="display:none;">		<input name="options" type="checkbox"  id="ignoreDomainNames_'+h+'" />		<label for="ignoreDomainNames" id="label_ignoreDomainNames_'+h+'"></label>	</div>	<div style="display:none;">	<input name="options" type="checkbox"  id="mixedCase_'+h+'" />		<label for="mixedCase" id="label_mixedCase_'+h+'"></label>	</div>	<div style="display:none;">		<input name="options" type="checkbox"  id="mixedWithDigits_'+h+'" />		<label for="mixedWithDigits" id="label_mixedWithDigits_'+h+'"></label>	</div></div></form>'}]},{id:"langs",label:y.languagesTab,elements:[{type:"html",id:"langs",html:'<form name="languagesbar_'+h+'"><div class="inner_langs">	<div class="messagebox"></div>	   <div style="float:left;width:45%;margin-left:5px;" id="scayt_lcol_'+h+'" ></div>   <div style="float:left;width:45%;margin-left:15px;" id="scayt_rcol_'+h+'"></div></div></form>'}]},{id:"dictionaries",label:y.dictionariesTab,elements:[{type:"html",style:"",id:"dictionaries",html:'<form name="dictionarybar_'+h+'"><div class="inner_dictionary" style="text-align:left; white-space:normal; width:320px; overflow: hidden;">	<div style="margin:5px auto; width:80%;white-space:normal; overflow:hidden;" id="dic_message_'+h+'"> </div>	<div style="margin:5px auto; width:80%;white-space:normal;">        <span class="cke_dialog_ui_labeled_label" >Dictionary name</span><br>		<span class="cke_dialog_ui_labeled_content" >			<div class="cke_dialog_ui_input_text">				<input id="dic_name_'+h+'" type="text" class="cke_dialog_ui_input_text"/>		</div></span></div>		<div style="margin:5px auto; width:80%;white-space:normal;">			<a style="display:none;" class="cke_dialog_ui_button" href="javascript:void(0)" id="dic_create_'+h+'">				</a>			<a  style="display:none;" class="cke_dialog_ui_button" href="javascript:void(0)" id="dic_delete_'+h+'">				</a>			<a  style="display:none;" class="cke_dialog_ui_button" href="javascript:void(0)" id="dic_rename_'+h+'">				</a>			<a  style="display:none;" class="cke_dialog_ui_button" href="javascript:void(0)" id="dic_restore_'+h+'">				</a>		</div>	<div style="margin:5px auto; width:95%;white-space:normal;" id="dic_info_'+h+'"></div></div></form>'}]},{id:"about",label:y.aboutTab,elements:[{type:"html",id:"about",style:"margin: 5px 5px;",html:'<div id="scayt_about_'+h+'"></div>'}]}],w={title:y.title,minWidth:360,minHeight:220,onShow:function(){var t=this;if(t.data=e.fire("scaytDialog",{}),t.options=t.data.scayt_control.option(),t.chosed_lang=t.sLang=t.data.scayt_control.sLang,!t.data||!t.data.scayt||!t.data.scayt_control)return alert("Error loading application service"),t.hide(),void 0;var i=0;u?t.data.scayt.getCaption(e.langCode||"en",function(e){i++>0||(c=e,C.apply(t),T.apply(t),u=!1)}):T.apply(t),t.selectPage(t.data.tab)},onOk:function(){var e=this.data.scayt_control;e.option(this.options);var t=this.chosed_lang;e.setLang(t),e.refresh()},onCancel:function(){var e=t();for(var a in e)e[a].checked=!1;n(i(),"")},contents:g};CKEDITOR.plugins.scayt.getScayt(e)}for(d=0;d<m.length;d++)1==m[d]&&(g[g.length]=k[d]);1==m[2]&&(f=1);var C=function(){function e(e){var t=p.getById("dic_name_"+h).getValue();if(!t)return a(" Dictionary name should not be empty. "),!1;try{var i=e.data.getTarget().getParent(),n=/(dic_\w+)_[\w\d]+/.exec(i.getId())[1];D[n].apply(null,[i,t,v])}catch(o){a(" Dictionary error. ")}return!0}var t,i=this,n=i.data.scayt.getLangList(),d=["dic_create","dic_delete","dic_rename","dic_restore"],u=[],g=[],y=b;if(f){for(t=0;t<d.length;t++)u[t]=d[t]+"_"+h,p.getById(u[t]).setHtml('<span class="cke_dialog_ui_button">'+c["button_"+d[t]]+"</span>");p.getById("dic_info_"+h).setHtml(c.dic_info)}if(1==m[0])for(t in y){var k="label_"+y[t],w=k+"_"+h,C=p.getById(w);if("undefined"!=typeof C&&"undefined"!=typeof c[k]&&"undefined"!=typeof i.options[y[t]]){C.setHtml(c[k]);var T=C.getParent();T.$.style.display="block"}}var _='<p><img src="'+window.scayt.getAboutInfo().logoURL+'" /></p><p>'+c.version+window.scayt.getAboutInfo().version.toString()+"</p><p>"+c.about_throwt_copy+"</p>";p.getById("scayt_about_"+h).setHtml(_);var S=function(e,t){var n=p.createElement("label");n.setAttribute("for","cke_option"+e),n.setHtml(t[e]),i.sLang==e&&(i.chosed_lang=e);var a=p.createElement("div"),o=CKEDITOR.dom.element.createFromHtml('<input id="cke_option'+e+'" type="radio" '+(i.sLang==e?'checked="checked"':"")+' value="'+e+'" name="scayt_lang" />');return o.on("click",function(){this.$.checked=!0,i.chosed_lang=e}),a.append(o),a.append(n),{lang:t[e],code:e,radio:a}};if(1==m[1]){for(t in n.rtl)g[g.length]=S(t,n.ltr);for(t in n.ltr)g[g.length]=S(t,n.ltr);g.sort(function(e,t){return t.lang>e.lang?-1:1});var x=p.getById("scayt_lcol_"+h),E=p.getById("scayt_rcol_"+h);for(t=0;t<g.length;t++){var A=t<g.length/2?x:E;A.append(g[t].radio)}}var D={};D.dic_create=function(e,t,i){var n=i[0]+","+i[1],l=c.err_dic_create,d=c.succ_dic_create;window.scayt.createUserDictionary(t,function(e){s(n),r(i[1]),d=d.replace("%s",e.dname),o(d)},function(e){l=l.replace("%s",e.dname),a(l+"( "+(e.message||"")+")")})},D.dic_rename=function(e,t){var i=c.err_dic_rename||"",n=c.succ_dic_rename||"";window.scayt.renameUserDictionary(t,function(e){n=n.replace("%s",e.dname),l(t),o(n)},function(e){i=i.replace("%s",e.dname),l(t),a(i+"( "+(e.message||"")+" )")})},D.dic_delete=function(e,t,i){var n=i[0]+","+i[1],d=c.err_dic_delete,u=c.succ_dic_delete;window.scayt.deleteUserDictionary(function(e){u=u.replace("%s",e.dname),s(n),r(i[0]),l(""),o(u)},function(e){d=d.replace("%s",e.dname),a(d)})},D.dic_restore=i.dic_restore||function(e,t,i){var n=i[0]+","+i[1],l=c.err_dic_restore,d=c.succ_dic_restore;window.scayt.restoreUserDictionary(t,function(e){d=d.replace("%s",e.dname),s(n),r(i[1]),o(d)},function(e){l=l.replace("%s",e.dname),a(l)})};var L,I=(v[0]+","+v[1]).split(",");for(t=0,L=I.length;L>t;t+=1){var F=p.getById(I[t]);F&&F.on("click",e,this)}},T=function(){var e=this;if(1==m[0])for(var i=t(),a=0,l=i.length;l>a;a++){var c=i[a].id,d=p.getById(c);d&&(i[a].checked=!1,1==e.options[c.split("_")[0]]&&(i[a].checked=!0),u&&d.on("click",function(){e.options[this.getId().split("_")[0]]=this.$.checked?1:0}))}if(1==m[1]){var g=p.getById("cke_option"+e.sLang);n(g.$,e.sLang)}f&&(window.scayt.getNameUserDictionary(function(e){var t=e.dname;s(v[0]+","+v[1]),t?(p.getById("dic_name_"+h).setValue(t),r(v[1])):r(v[0])},function(){p.getById("dic_name_"+h).setValue("")}),o(""))};return w});