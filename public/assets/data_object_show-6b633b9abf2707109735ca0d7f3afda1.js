/*
 * jPlayer Plugin for jQuery JavaScript Library
 * http://www.happyworm.com/jquery/jplayer
 *
 * Copyright (c) 2009 - 2010 Happyworm Ltd
 * Dual licensed under the MIT and GPL licenses.
 *  - http://www.opensource.org/licenses/mit-license.php
 *  - http://www.gnu.org/copyleft/gpl.html
 *
 * Author: Mark J Panaghiston
 * Version: 2.0.0
 * Date: 20th December 2010
 */
!function(t,e){t.fn.jPlayer=function(i){var n="string"==typeof i,s=Array.prototype.slice.call(arguments,1),o=this;return i=!n&&s.length?t.extend.apply(null,[!0,i].concat(s)):i,n&&"_"===i.charAt(0)?o:(n?this.each(function(){var n=t.data(this,"jPlayer"),a=n&&t.isFunction(n[i])?n[i].apply(n,s):n;return a!==n&&a!==e?(o=a,!1):void 0}):this.each(function(){var e=t.data(this,"jPlayer");e?(e.option(i||{})._init(),e.option(i||{})):t.data(this,"jPlayer",new t.jPlayer(i,this))}),o)},t.jPlayer=function(e,i){if(arguments.length){this.element=t(i),this.options=t.extend(!0,{},this.options,e);var n=this;this.element.bind("remove.jPlayer",function(){n.destroy()}),this._init()}},t.jPlayer.event={ready:"jPlayer_ready",resize:"jPlayer_resize",error:"jPlayer_error",warning:"jPlayer_warning",loadstart:"jPlayer_loadstart",progress:"jPlayer_progress",suspend:"jPlayer_suspend",abort:"jPlayer_abort",emptied:"jPlayer_emptied",stalled:"jPlayer_stalled",play:"jPlayer_play",pause:"jPlayer_pause",loadedmetadata:"jPlayer_loadedmetadata",loadeddata:"jPlayer_loadeddata",waiting:"jPlayer_waiting",playing:"jPlayer_playing",canplay:"jPlayer_canplay",canplaythrough:"jPlayer_canplaythrough",seeking:"jPlayer_seeking",seeked:"jPlayer_seeked",timeupdate:"jPlayer_timeupdate",ended:"jPlayer_ended",ratechange:"jPlayer_ratechange",durationchange:"jPlayer_durationchange",volumechange:"jPlayer_volumechange"},t.jPlayer.htmlEvent=["loadstart","abort","emptied","stalled","loadedmetadata","loadeddata","canplaythrough","ratechange"],t.jPlayer.pause=function(){t.each(t.jPlayer.prototype.instances,function(t,e){e.data("jPlayer").status.srcSet&&e.jPlayer("pause")})},t.jPlayer.timeFormat={showHour:!1,showMin:!0,showSec:!0,padHour:!1,padMin:!0,padSec:!0,sepHour:":",sepMin:":",sepSec:""},t.jPlayer.convertTime=function(e){e=new Date(1e3*e);var i=e.getUTCHours(),n=e.getUTCMinutes();return e=e.getUTCSeconds(),i=t.jPlayer.timeFormat.padHour&&10>i?"0"+i:i,n=t.jPlayer.timeFormat.padMin&&10>n?"0"+n:n,e=t.jPlayer.timeFormat.padSec&&10>e?"0"+e:e,(t.jPlayer.timeFormat.showHour?i+t.jPlayer.timeFormat.sepHour:"")+(t.jPlayer.timeFormat.showMin?n+t.jPlayer.timeFormat.sepMin:"")+(t.jPlayer.timeFormat.showSec?e+t.jPlayer.timeFormat.sepSec:"")},t.jPlayer.uaMatch=function(t){t=t.toLowerCase();var e=/(opera)(?:.*version)?[ \/]([\w.]+)/,i=/(msie) ([\w.]+)/,n=/(mozilla)(?:.*? rv:([\w.]+))?/;return t=/(webkit)[ \/]([\w.]+)/.exec(t)||e.exec(t)||i.exec(t)||t.indexOf("compatible")<0&&n.exec(t)||[],{browser:t[1]||"",version:t[2]||"0"}},t.jPlayer.browser={};var i=t.jPlayer.uaMatch(navigator.userAgent);i.browser&&(t.jPlayer.browser[i.browser]=!0,t.jPlayer.browser.version=i.version),t.jPlayer.prototype={count:0,version:{script:"2.0.0",needFlash:"2.0.0",flash:"unknown"},options:{swfPath:"js",solution:"html, flash",supplied:"mp3",preload:"metadata",volume:.8,muted:!1,backgroundColor:"#000000",cssSelectorAncestor:"#jp_interface_1",cssSelector:{videoPlay:".jp-video-play",play:".jp-play",pause:".jp-pause",stop:".jp-stop",seekBar:".jp-seek-bar",playBar:".jp-play-bar",mute:".jp-mute",unmute:".jp-unmute",volumeBar:".jp-volume-bar",volumeBarValue:".jp-volume-bar-value",currentTime:".jp-current-time",duration:".jp-duration"},idPrefix:"jp",errorAlerts:!1,warningAlerts:!1},instances:{},status:{src:"",media:{},paused:!0,format:{},formatType:"",waitForPlay:!0,waitForLoad:!0,srcSet:!1,video:!1,seekPercent:0,currentPercentRelative:0,currentPercentAbsolute:0,currentTime:0,duration:0},_status:{volume:e,muted:!1,width:0,height:0},internal:{ready:!1,instance:e,htmlDlyCmdId:e},solution:{html:!0,flash:!0},format:{mp3:{codec:'audio/mpeg; codecs="mp3"',flashCanPlay:!0,media:"audio"},m4a:{codec:'audio/mp4; codecs="mp4a.40.2"',flashCanPlay:!0,media:"audio"},oga:{codec:'audio/ogg; codecs="vorbis"',flashCanPlay:!1,media:"audio"},wav:{codec:'audio/wav; codecs="1"',flashCanPlay:!1,media:"audio"},webma:{codec:'audio/webm; codecs="vorbis"',flashCanPlay:!1,media:"audio"},m4v:{codec:'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',flashCanPlay:!0,media:"video"},ogv:{codec:'video/ogg; codecs="theora, vorbis"',flashCanPlay:!1,media:"video"},webmv:{codec:'video/webm; codecs="vorbis, vp8"',flashCanPlay:!1,media:"video"}},_init:function(){var i=this;if(this.element.empty(),this.status=t.extend({},this.status,this._status),this.internal=t.extend({},this.internal),this.formats=[],this.solutions=[],this.require={},this.htmlElement={},this.html={},this.html.audio={},this.html.video={},this.flash={},this.css={},this.css.cs={},this.css.jq={},this.status.volume=this._limitValue(this.options.volume,0,1),this.status.muted=this.options.muted,this.status.width=this.element.css("width"),this.status.height=this.element.css("height"),this.element.css({"background-color":this.options.backgroundColor}),t.each(this.options.supplied.toLowerCase().split(","),function(e,n){var s=n.replace(/^\s+|\s+$/g,"");if(i.format[s]){var o=!1;t.each(i.formats,function(t,e){return s===e?(o=!0,!1):void 0}),o||i.formats.push(s)}}),t.each(this.options.solution.toLowerCase().split(","),function(e,n){var s=n.replace(/^\s+|\s+$/g,"");if(i.solution[s]){var o=!1;t.each(i.solutions,function(t,e){return s===e?(o=!0,!1):void 0}),o||i.solutions.push(s)}}),this.internal.instance="jp_"+this.count,this.instances[this.internal.instance]=this.element,""===this.element.attr("id")&&this.element.attr("id",this.options.idPrefix+"_jplayer_"+this.count),this.internal.self=t.extend({},{id:this.element.attr("id"),jq:this.element}),this.internal.audio=t.extend({},{id:this.options.idPrefix+"_audio_"+this.count,jq:e}),this.internal.video=t.extend({},{id:this.options.idPrefix+"_video_"+this.count,jq:e}),this.internal.flash=t.extend({},{id:this.options.idPrefix+"_flash_"+this.count,jq:e,swf:this.options.swfPath+(""!==this.options.swfPath&&"/"!==this.options.swfPath.slice(-1)?"/":"")+"Jplayer.swf"}),this.internal.poster=t.extend({},{id:this.options.idPrefix+"_poster_"+this.count,jq:e}),t.each(t.jPlayer.event,function(t,n){i.options[t]!==e&&(i.element.bind(n+".jPlayer",i.options[t]),i.options[t]=e)}),this.htmlElement.poster=document.createElement("img"),this.htmlElement.poster.id=this.internal.poster.id,this.htmlElement.poster.onload=function(){(!i.status.video||i.status.waitForPlay)&&i.internal.poster.jq.show()},this.element.append(this.htmlElement.poster),this.internal.poster.jq=t("#"+this.internal.poster.id),this.internal.poster.jq.css({width:this.status.width,height:this.status.height}),this.internal.poster.jq.hide(),this.require.audio=!1,this.require.video=!1,t.each(this.formats,function(t,e){i.require[i.format[e].media]=!0}),this.html.audio.available=!1,this.require.audio&&(this.htmlElement.audio=document.createElement("audio"),this.htmlElement.audio.id=this.internal.audio.id,this.html.audio.available=!!this.htmlElement.audio.canPlayType),this.html.video.available=!1,this.require.video&&(this.htmlElement.video=document.createElement("video"),this.htmlElement.video.id=this.internal.video.id,this.html.video.available=!!this.htmlElement.video.canPlayType),this.flash.available=this._checkForFlash(10),this.html.canPlay={},this.flash.canPlay={},t.each(this.formats,function(t,e){i.html.canPlay[e]=i.html[i.format[e].media].available&&""!==i.htmlElement[i.format[e].media].canPlayType(i.format[e].codec),i.flash.canPlay[e]=i.format[e].flashCanPlay&&i.flash.available}),this.html.desired=!1,this.flash.desired=!1,t.each(this.solutions,function(e,n){if(0===e)i[n].desired=!0;else{var s=!1,o=!1;t.each(i.formats,function(t,e){i[i.solutions[0]].canPlay[e]&&("video"===i.format[e].media?o=!0:s=!0)}),i[n].desired=i.require.audio&&!s||i.require.video&&!o}}),this.html.support={},this.flash.support={},t.each(this.formats,function(t,e){i.html.support[e]=i.html.canPlay[e]&&i.html.desired,i.flash.support[e]=i.flash.canPlay[e]&&i.flash.desired}),this.html.used=!1,this.flash.used=!1,t.each(this.solutions,function(e,n){t.each(i.formats,function(t,e){return i[n].support[e]?(i[n].used=!0,!1):void 0})}),this.html.used||this.flash.used||this._error({type:t.jPlayer.error.NO_SOLUTION,context:"{solution:'"+this.options.solution+"', supplied:'"+this.options.supplied+"'}",message:t.jPlayer.errorMsg.NO_SOLUTION,hint:t.jPlayer.errorHint.NO_SOLUTION}),this.html.active=!1,this.html.audio.gate=!1,this.html.video.gate=!1,this.flash.active=!1,this.flash.gate=!1,this.flash.used){var n="id="+escape(this.internal.self.id)+"&vol="+this.status.volume+"&muted="+this.status.muted;if(t.browser.msie&&Number(t.browser.version)<=8){var s='<object id="'+this.internal.flash.id+'"';s+=' classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"',s+=' codebase="'+document.URL.substring(0,document.URL.indexOf(":"))+'://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab"',s+=' type="application/x-shockwave-flash"',s+=' width="0" height="0">',s+="</object>";var o=[];for(o[0]='<param name="movie" value="'+this.internal.flash.swf+'" />',o[1]='<param name="quality" value="high" />',o[2]='<param name="FlashVars" value="'+n+'" />',o[3]='<param name="allowScriptAccess" value="always" />',o[4]='<param name="bgcolor" value="'+this.options.backgroundColor+'" />',n=document.createElement(s),s=0;s<o.length;s++)n.appendChild(document.createElement(o[s]));this.element.append(n)}else o='<embed name="'+this.internal.flash.id+'" id="'+this.internal.flash.id+'" src="'+this.internal.flash.swf+'"',o+=' width="0" height="0" bgcolor="'+this.options.backgroundColor+'"',o+=' quality="high" FlashVars="'+n+'"',o+=' allowScriptAccess="always"',o+=' type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />',this.element.append(o);this.internal.flash.jq=t("#"+this.internal.flash.id),this.internal.flash.jq.css({width:"0px",height:"0px"})}this.html.used&&(this.html.audio.available&&(this._addHtmlEventListeners(this.htmlElement.audio,this.html.audio),this.element.append(this.htmlElement.audio),this.internal.audio.jq=t("#"+this.internal.audio.id)),this.html.video.available&&(this._addHtmlEventListeners(this.htmlElement.video,this.html.video),this.element.append(this.htmlElement.video),this.internal.video.jq=t("#"+this.internal.video.id),this.internal.video.jq.css({width:"0px",height:"0px"}))),this.html.used&&!this.flash.used&&window.setTimeout(function(){i.internal.ready=!0,i.version.flash="n/a",i._trigger(t.jPlayer.event.ready)},100),t.each(this.options.cssSelector,function(t,e){i._cssSelector(t,e)}),this._updateInterface(),this._updateButtons(!1),this._updateVolume(this.status.volume),this._updateMute(this.status.muted),this.css.jq.videoPlay.length&&this.css.jq.videoPlay.hide(),t.jPlayer.prototype.count++},destroy:function(){this._resetStatus(),this._updateInterface(),this._seeked(),this.css.jq.currentTime.length&&this.css.jq.currentTime.text(""),this.css.jq.duration.length&&this.css.jq.duration.text(""),this.status.srcSet&&this.pause(),t.each(this.css.jq,function(t,e){e.unbind(".jPlayer")}),this.element.removeData("jPlayer"),this.element.unbind(".jPlayer"),this.element.empty(),this.instances[this.internal.instance]=e},enable:function(){},disable:function(){},_addHtmlEventListeners:function(e,i){var n=this;e.preload=this.options.preload,e.muted=this.options.muted,e.addEventListener("progress",function(){i.gate&&!n.status.waitForLoad&&(n._getHtmlStatus(e),n._updateInterface(),n._trigger(t.jPlayer.event.progress))},!1),e.addEventListener("timeupdate",function(){i.gate&&!n.status.waitForLoad&&(n._getHtmlStatus(e),n._updateInterface(),n._trigger(t.jPlayer.event.timeupdate))},!1),e.addEventListener("durationchange",function(){i.gate&&!n.status.waitForLoad&&(n.status.duration=this.duration,n._getHtmlStatus(e),n._updateInterface(),n._trigger(t.jPlayer.event.durationchange))},!1),e.addEventListener("play",function(){i.gate&&!n.status.waitForLoad&&(n._updateButtons(!0),n._trigger(t.jPlayer.event.play))},!1),e.addEventListener("playing",function(){i.gate&&!n.status.waitForLoad&&(n._updateButtons(!0),n._seeked(),n._trigger(t.jPlayer.event.playing))},!1),e.addEventListener("pause",function(){i.gate&&!n.status.waitForLoad&&(n._updateButtons(!1),n._trigger(t.jPlayer.event.pause))},!1),e.addEventListener("waiting",function(){i.gate&&!n.status.waitForLoad&&(n._seeking(),n._trigger(t.jPlayer.event.waiting))},!1),e.addEventListener("canplay",function(){i.gate&&!n.status.waitForLoad&&(e.volume=n._volumeFix(n.status.volume),n._trigger(t.jPlayer.event.canplay))},!1),e.addEventListener("seeking",function(){i.gate&&!n.status.waitForLoad&&(n._seeking(),n._trigger(t.jPlayer.event.seeking))},!1),e.addEventListener("seeked",function(){i.gate&&!n.status.waitForLoad&&(n._seeked(),n._trigger(t.jPlayer.event.seeked))},!1),e.addEventListener("suspend",function(){i.gate&&!n.status.waitForLoad&&(n._seeked(),n._trigger(t.jPlayer.event.suspend))},!1),e.addEventListener("ended",function(){i.gate&&!n.status.waitForLoad&&(t.jPlayer.browser.webkit||(n.htmlElement.media.currentTime=0),n.htmlElement.media.pause(),n._updateButtons(!1),n._getHtmlStatus(e,!0),n._updateInterface(),n._trigger(t.jPlayer.event.ended))},!1),e.addEventListener("error",function(){i.gate&&!n.status.waitForLoad&&(n._updateButtons(!1),n._seeked(),n.status.srcSet&&(n.status.waitForLoad=!0,n.status.waitForPlay=!0,n.status.video&&n.internal.video.jq.css({width:"0px",height:"0px"}),n._validString(n.status.media.poster)&&n.internal.poster.jq.show(),n.css.jq.videoPlay.length&&n.css.jq.videoPlay.show(),n._error({type:t.jPlayer.error.URL,context:n.status.src,message:t.jPlayer.errorMsg.URL,hint:t.jPlayer.errorHint.URL})))},!1),t.each(t.jPlayer.htmlEvent,function(s,o){e.addEventListener(this,function(){i.gate&&!n.status.waitForLoad&&n._trigger(t.jPlayer.event[o])},!1)})},_getHtmlStatus:function(t,e){var i=0,n=0,s=0,o=0;i=t.currentTime,n=this.status.duration>0?100*i/this.status.duration:0,"object"==typeof t.seekable&&t.seekable.length>0?(s=this.status.duration>0?100*t.seekable.end(t.seekable.length-1)/this.status.duration:100,o=100*t.currentTime/t.seekable.end(t.seekable.length-1)):(s=100,o=n),e&&(n=o=i=0),this.status.seekPercent=s,this.status.currentPercentRelative=o,this.status.currentPercentAbsolute=n,this.status.currentTime=i},_resetStatus:function(){this.status=t.extend({},this.status,t.jPlayer.prototype.status)},_trigger:function(e,i,n){e=t.Event(e),e.jPlayer={},e.jPlayer.version=t.extend({},this.version),e.jPlayer.status=t.extend(!0,{},this.status),e.jPlayer.html=t.extend(!0,{},this.html),e.jPlayer.flash=t.extend(!0,{},this.flash),i&&(e.jPlayer.error=t.extend({},i)),n&&(e.jPlayer.warning=t.extend({},n)),this.element.trigger(e)},jPlayerFlashEvent:function(e,i){if(e!==t.jPlayer.event.ready||this.internal.ready||(this.internal.ready=!0,this.version.flash=i.version,this.version.needFlash!==this.version.flash&&this._error({type:t.jPlayer.error.VERSION,context:this.version.flash,message:t.jPlayer.errorMsg.VERSION+this.version.flash,hint:t.jPlayer.errorHint.VERSION}),this._trigger(e)),this.flash.gate)switch(e){case t.jPlayer.event.progress:this._getFlashStatus(i),this._updateInterface(),this._trigger(e);break;case t.jPlayer.event.timeupdate:this._getFlashStatus(i),this._updateInterface(),this._trigger(e);break;case t.jPlayer.event.play:this._seeked(),this._updateButtons(!0),this._trigger(e);break;case t.jPlayer.event.pause:this._updateButtons(!1),this._trigger(e);break;case t.jPlayer.event.ended:this._updateButtons(!1),this._trigger(e);break;case t.jPlayer.event.error:this.status.waitForLoad=!0,this.status.waitForPlay=!0,this.status.video&&this.internal.flash.jq.css({width:"0px",height:"0px"}),this._validString(this.status.media.poster)&&this.internal.poster.jq.show(),this.css.jq.videoPlay.length&&this.css.jq.videoPlay.show(),this.status.video?this._flash_setVideo(this.status.media):this._flash_setAudio(this.status.media),this._error({type:t.jPlayer.error.URL,context:i.src,message:t.jPlayer.errorMsg.URL,hint:t.jPlayer.errorHint.URL});break;case t.jPlayer.event.seeking:this._seeking(),this._trigger(e);break;case t.jPlayer.event.seeked:this._seeked(),this._trigger(e);break;default:this._trigger(e)}return!1},_getFlashStatus:function(t){this.status.seekPercent=t.seekPercent,this.status.currentPercentRelative=t.currentPercentRelative,this.status.currentPercentAbsolute=t.currentPercentAbsolute,this.status.currentTime=t.currentTime,this.status.duration=t.duration},_updateButtons:function(t){this.status.paused=!t,this.css.jq.play.length&&this.css.jq.pause.length&&(t?(this.css.jq.play.hide(),this.css.jq.pause.show()):(this.css.jq.play.show(),this.css.jq.pause.hide()))},_updateInterface:function(){this.css.jq.seekBar.length&&this.css.jq.seekBar.width(this.status.seekPercent+"%"),this.css.jq.playBar.length&&this.css.jq.playBar.width(this.status.currentPercentRelative+"%"),this.css.jq.currentTime.length&&this.css.jq.currentTime.text(t.jPlayer.convertTime(this.status.currentTime)),this.css.jq.duration.length&&this.css.jq.duration.text(t.jPlayer.convertTime(this.status.duration))},_seeking:function(){this.css.jq.seekBar.length&&this.css.jq.seekBar.addClass("jp-seeking-bg")},_seeked:function(){this.css.jq.seekBar.length&&this.css.jq.seekBar.removeClass("jp-seeking-bg")},setMedia:function(e){var i=this;this._seeked(),clearTimeout(this.internal.htmlDlyCmdId);var n=this.html.audio.gate,s=this.html.video.gate,o=!1;t.each(this.formats,function(a,r){var l="video"===i.format[r].media;return t.each(i.solutions,function(t,a){if(i[a].support[r]&&i._validString(e[r])){var c="html"===a;return l?c?(i.html.audio.gate=!1,i.html.video.gate=!0,i.flash.gate=!1):(i.html.audio.gate=!1,i.html.video.gate=!1,i.flash.gate=!0):c?(i.html.audio.gate=!0,i.html.video.gate=!1,i.flash.gate=!1):(i.html.audio.gate=!1,i.html.video.gate=!1,i.flash.gate=!0),i.flash.active||i.html.active&&i.flash.gate||n===i.html.audio.gate&&s===i.html.video.gate?i.clearMedia():n!==i.html.audio.gate&&s!==i.html.video.gate&&(i._html_pause(),i.status.video&&i.internal.video.jq.css({width:"0px",height:"0px"}),i._resetStatus()),l?(c?(i._html_setVideo(e),i.html.active=!0,i.flash.active=!1):(i._flash_setVideo(e),i.html.active=!1,i.flash.active=!0),i.css.jq.videoPlay.length&&i.css.jq.videoPlay.show(),i.status.video=!0):(c?(i._html_setAudio(e),i.html.active=!0,i.flash.active=!1):(i._flash_setAudio(e),i.html.active=!1,i.flash.active=!0),i.css.jq.videoPlay.length&&i.css.jq.videoPlay.hide(),i.status.video=!1),o=!0,!1}}),o?!1:void 0}),o?(this._validString(e.poster)?this.htmlElement.poster.src!==e.poster?this.htmlElement.poster.src=e.poster:this.internal.poster.jq.show():this.internal.poster.jq.hide(),this.status.srcSet=!0,this.status.media=t.extend({},e),this._updateButtons(!1),this._updateInterface()):(this.status.srcSet&&!this.status.waitForPlay&&this.pause(),this.html.audio.gate=!1,this.html.video.gate=!1,this.flash.gate=!1,this.html.active=!1,this.flash.active=!1,this._resetStatus(),this._updateInterface(),this._updateButtons(!1),this.internal.poster.jq.hide(),this.html.used&&this.require.video&&this.internal.video.jq.css({width:"0px",height:"0px"}),this.flash.used&&this.internal.flash.jq.css({width:"0px",height:"0px"}),this._error({type:t.jPlayer.error.NO_SUPPORT,context:"{supplied:'"+this.options.supplied+"'}",message:t.jPlayer.errorMsg.NO_SUPPORT,hint:t.jPlayer.errorHint.NO_SUPPORT}))},clearMedia:function(){this._resetStatus(),this._updateButtons(!1),this.internal.poster.jq.hide(),clearTimeout(this.internal.htmlDlyCmdId),this.html.active?this._html_clearMedia():this.flash.active&&this._flash_clearMedia()},load:function(){this.status.srcSet?this.html.active?this._html_load():this.flash.active&&this._flash_load():this._urlNotSetError("load")},play:function(t){t="number"==typeof t?t:0/0,this.status.srcSet?this.html.active?this._html_play(t):this.flash.active&&this._flash_play(t):this._urlNotSetError("play")},videoPlay:function(){this.play()},pause:function(t){t="number"==typeof t?t:0/0,this.status.srcSet?this.html.active?this._html_pause(t):this.flash.active&&this._flash_pause(t):this._urlNotSetError("pause")},pauseOthers:function(){var e=this;t.each(this.instances,function(t,i){e.element!==i&&i.data("jPlayer").status.srcSet&&i.jPlayer("pause")})},stop:function(){this.status.srcSet?this.html.active?this._html_pause(0):this.flash.active&&this._flash_pause(0):this._urlNotSetError("stop")},playHead:function(t){t=this._limitValue(t,0,100),this.status.srcSet?this.html.active?this._html_playHead(t):this.flash.active&&this._flash_playHead(t):this._urlNotSetError("playHead")},mute:function(){this.status.muted=!0,this.html.used&&this._html_mute(!0),this.flash.used&&this._flash_mute(!0),this._updateMute(!0),this._updateVolume(0),this._trigger(t.jPlayer.event.volumechange)},unmute:function(){this.status.muted=!1,this.html.used&&this._html_mute(!1),this.flash.used&&this._flash_mute(!1),this._updateMute(!1),this._updateVolume(this.status.volume),this._trigger(t.jPlayer.event.volumechange)},_updateMute:function(t){this.css.jq.mute.length&&this.css.jq.unmute.length&&(t?(this.css.jq.mute.hide(),this.css.jq.unmute.show()):(this.css.jq.mute.show(),this.css.jq.unmute.hide()))},volume:function(e){e=this._limitValue(e,0,1),this.status.volume=e,this.html.used&&this._html_volume(e),this.flash.used&&this._flash_volume(e),this.status.muted||this._updateVolume(e),this._trigger(t.jPlayer.event.volumechange)},volumeBar:function(t){if(!this.status.muted&&this.css.jq.volumeBar){var e=this.css.jq.volumeBar.offset();t=t.pageX-e.left,e=this.css.jq.volumeBar.width(),this.volume(t/e)}},volumeBarValue:function(t){this.volumeBar(t)},_updateVolume:function(t){this.css.jq.volumeBarValue.length&&this.css.jq.volumeBarValue.width(100*t+"%")},_volumeFix:function(t){var e=.001*Math.random();return t+(.5>t?e:-e)},_cssSelectorAncestor:function(e,i){this.options.cssSelectorAncestor=e,i&&t.each(this.options.cssSelector,function(t,e){self._cssSelector(t,e)})},_cssSelector:function(e,i){var n=this;"string"==typeof i?t.jPlayer.prototype.options.cssSelector[e]?(this.css.jq[e]&&this.css.jq[e].length&&this.css.jq[e].unbind(".jPlayer"),this.options.cssSelector[e]=i,this.css.cs[e]=this.options.cssSelectorAncestor+" "+i,this.css.jq[e]=i?t(this.css.cs[e]):[],this.css.jq[e].length&&this.css.jq[e].bind("click.jPlayer",function(i){return n[e](i),t(this).blur(),!1}),i&&1!==this.css.jq[e].length&&this._warning({type:t.jPlayer.warning.CSS_SELECTOR_COUNT,context:this.css.cs[e],message:t.jPlayer.warningMsg.CSS_SELECTOR_COUNT+this.css.jq[e].length+" found for "+e+" method.",hint:t.jPlayer.warningHint.CSS_SELECTOR_COUNT})):this._warning({type:t.jPlayer.warning.CSS_SELECTOR_METHOD,context:e,message:t.jPlayer.warningMsg.CSS_SELECTOR_METHOD,hint:t.jPlayer.warningHint.CSS_SELECTOR_METHOD}):this._warning({type:t.jPlayer.warning.CSS_SELECTOR_STRING,context:i,message:t.jPlayer.warningMsg.CSS_SELECTOR_STRING,hint:t.jPlayer.warningHint.CSS_SELECTOR_STRING})},seekBar:function(t){if(this.css.jq.seekBar){var e=this.css.jq.seekBar.offset();t=t.pageX-e.left,e=this.css.jq.seekBar.width(),this.playHead(100*t/e)}},playBar:function(t){this.seekBar(t)},currentTime:function(){},duration:function(){},option:function(i,n){var s=i;if(0===arguments.length)return t.extend(!0,{},this.options);if("string"==typeof i){var o=i.split(".");if(n===e){for(var a=t.extend(!0,{},this.options),r=0;r<o.length;r++){if(a[o[r]]===e)return this._warning({type:t.jPlayer.warning.OPTION_KEY,context:i,message:t.jPlayer.warningMsg.OPTION_KEY,hint:t.jPlayer.warningHint.OPTION_KEY}),e;a=a[o[r]]}return a}for(a=s={},r=0;r<o.length;r++)r<o.length-1?(a[o[r]]={},a=a[o[r]]):a[o[r]]=n}return this._setOptions(s),this},_setOptions:function(e){var i=this;return t.each(e,function(t,e){i._setOption(t,e)}),this},_setOption:function(e,i){var n=this;switch(e){case"cssSelectorAncestor":this.options[e]=i,t.each(n.options.cssSelector,function(t,e){n._cssSelector(t,e)});break;case"cssSelector":t.each(i,function(t,e){n._cssSelector(t,e)})}return this},resize:function(e){this.html.active&&this._resizeHtml(e),this.flash.active&&this._resizeFlash(e),this._trigger(t.jPlayer.event.resize)},_resizePoster:function(){},_resizeHtml:function(){},_resizeFlash:function(t){this.internal.flash.jq.css({width:t.width,height:t.height})},_html_initMedia:function(){this.status.srcSet&&!this.status.waitForPlay&&this.htmlElement.media.pause(),"none"!==this.options.preload&&this._html_load(),this._trigger(t.jPlayer.event.timeupdate)},_html_setAudio:function(e){var i=this;t.each(this.formats,function(t,n){return i.html.support[n]&&e[n]?(i.status.src=e[n],i.status.format[n]=!0,i.status.formatType=n,!1):void 0}),this.htmlElement.media=this.htmlElement.audio,this._html_initMedia()},_html_setVideo:function(e){var i=this;t.each(this.formats,function(t,n){return i.html.support[n]&&e[n]?(i.status.src=e[n],i.status.format[n]=!0,i.status.formatType=n,!1):void 0}),this.htmlElement.media=this.htmlElement.video,this._html_initMedia()},_html_clearMedia:function(){this.htmlElement.media&&(this.htmlElement.media.id===this.internal.video.id&&this.internal.video.jq.css({width:"0px",height:"0px"}),this.htmlElement.media.pause(),this.htmlElement.media.src="",t.browser.msie&&Number(t.browser.version)>=9||this.htmlElement.media.load())},_html_load:function(){if(this.status.waitForLoad){this.status.waitForLoad=!1,this.htmlElement.media.src=this.status.src;try{this.htmlElement.media.load()}catch(t){}}clearTimeout(this.internal.htmlDlyCmdId)},_html_play:function(t){var e=this;if(this._html_load(),this.htmlElement.media.play(),!isNaN(t))try{this.htmlElement.media.currentTime=t}catch(i){return this.internal.htmlDlyCmdId=setTimeout(function(){e.play(t)},100),void 0}this._html_checkWaitForPlay()},_html_pause:function(t){var e=this;if(t>0?this._html_load():clearTimeout(this.internal.htmlDlyCmdId),this.htmlElement.media.pause(),!isNaN(t))try{this.htmlElement.media.currentTime=t}catch(i){return this.internal.htmlDlyCmdId=setTimeout(function(){e.pause(t)},100),void 0}t>0&&this._html_checkWaitForPlay()},_html_playHead:function(t){var e=this;this._html_load();try{if("object"==typeof this.htmlElement.media.seekable&&this.htmlElement.media.seekable.length>0)this.htmlElement.media.currentTime=t*this.htmlElement.media.seekable.end(this.htmlElement.media.seekable.length-1)/100;else{if(!(this.htmlElement.media.duration>0)||isNaN(this.htmlElement.media.duration))throw"e";this.htmlElement.media.currentTime=t*this.htmlElement.media.duration/100}}catch(i){return this.internal.htmlDlyCmdId=setTimeout(function(){e.playHead(t)},100),void 0}this.status.waitForLoad||this._html_checkWaitForPlay()},_html_checkWaitForPlay:function(){this.status.waitForPlay&&(this.status.waitForPlay=!1,this.css.jq.videoPlay.length&&this.css.jq.videoPlay.hide(),this.status.video&&(this.internal.poster.jq.hide(),this.internal.video.jq.css({width:this.status.width,height:this.status.height})))},_html_volume:function(t){this.html.audio.available&&(this.htmlElement.audio.volume=t),this.html.video.available&&(this.htmlElement.video.volume=t)},_html_mute:function(t){this.html.audio.available&&(this.htmlElement.audio.muted=t),this.html.video.available&&(this.htmlElement.video.muted=t)},_flash_setAudio:function(e){var i=this;try{t.each(this.formats,function(t,n){if(i.flash.support[n]&&e[n]){switch(n){case"m4a":i._getMovie().fl_setAudio_m4a(e[n]);break;case"mp3":i._getMovie().fl_setAudio_mp3(e[n])}return i.status.src=e[n],i.status.format[n]=!0,i.status.formatType=n,!1}}),"auto"===this.options.preload&&(this._flash_load(),this.status.waitForLoad=!1)}catch(n){this._flashError(n)}},_flash_setVideo:function(e){var i=this;try{t.each(this.formats,function(t,n){if(i.flash.support[n]&&e[n]){switch(n){case"m4v":i._getMovie().fl_setVideo_m4v(e[n])}return i.status.src=e[n],i.status.format[n]=!0,i.status.formatType=n,!1}}),"auto"===this.options.preload&&(this._flash_load(),this.status.waitForLoad=!1)}catch(n){this._flashError(n)}},_flash_clearMedia:function(){this.internal.flash.jq.css({width:"0px",height:"0px"});try{this._getMovie().fl_clearMedia()}catch(t){this._flashError(t)}},_flash_load:function(){try{this._getMovie().fl_load()}catch(t){this._flashError(t)}this.status.waitForLoad=!1},_flash_play:function(t){try{this._getMovie().fl_play(t)}catch(e){this._flashError(e)}this.status.waitForLoad=!1,this._flash_checkWaitForPlay()},_flash_pause:function(t){try{this._getMovie().fl_pause(t)}catch(e){this._flashError(e)}t>0&&(this.status.waitForLoad=!1,this._flash_checkWaitForPlay())},_flash_playHead:function(t){try{this._getMovie().fl_play_head(t)}catch(e){this._flashError(e)}this.status.waitForLoad||this._flash_checkWaitForPlay()},_flash_checkWaitForPlay:function(){this.status.waitForPlay&&(this.status.waitForPlay=!1,this.css.jq.videoPlay.length&&this.css.jq.videoPlay.hide(),this.status.video&&(this.internal.poster.jq.hide(),this.internal.flash.jq.css({width:this.status.width,height:this.status.height})))},_flash_volume:function(t){try{this._getMovie().fl_volume(t)}catch(e){this._flashError(e)}},_flash_mute:function(t){try{this._getMovie().fl_mute(t)}catch(e){this._flashError(e)}},_getMovie:function(){return document[this.internal.flash.id]},_checkForFlash:function(e){var i,n=!1;if(window.ActiveXObject)try{new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+e),n=!0}catch(s){}else navigator.plugins&&navigator.mimeTypes.length>0&&(i=navigator.plugins["Shockwave Flash"])&&navigator.plugins["Shockwave Flash"].description.replace(/.*\s(\d+\.\d+).*/,"$1")>=e&&(n=!0);return t.browser.msie&&Number(t.browser.version)>=9?!1:n},_validString:function(t){return t&&"string"==typeof t},_limitValue:function(t,e,i){return e>t?e:t>i?i:t},_urlNotSetError:function(e){this._error({type:t.jPlayer.error.URL_NOT_SET,context:e,message:t.jPlayer.errorMsg.URL_NOT_SET,hint:t.jPlayer.errorHint.URL_NOT_SET})},_flashError:function(e){this._error({type:t.jPlayer.error.FLASH,context:this.internal.flash.swf,message:t.jPlayer.errorMsg.FLASH+e.message,hint:t.jPlayer.errorHint.FLASH})},_error:function(e){this._trigger(t.jPlayer.event.error,e),this.options.errorAlerts&&this._alert("Error!"+(e.message?"\n\n"+e.message:"")+(e.hint?"\n\n"+e.hint:"")+"\n\nContext: "+e.context)},_warning:function(i){this._trigger(t.jPlayer.event.warning,e,i),this.options.errorAlerts&&this._alert("Warning!"+(i.message?"\n\n"+i.message:"")+(i.hint?"\n\n"+i.hint:"")+"\n\nContext: "+i.context)},_alert:function(t){alert("jPlayer "+this.version.script+" : id='"+this.internal.self.id+"' : "+t)}},t.jPlayer.error={FLASH:"e_flash",NO_SOLUTION:"e_no_solution",NO_SUPPORT:"e_no_support",URL:"e_url",URL_NOT_SET:"e_url_not_set",VERSION:"e_version"},t.jPlayer.errorMsg={FLASH:"jPlayer's Flash fallback is not configured correctly, or a command was issued before the jPlayer Ready event. Details: ",NO_SOLUTION:"No solution can be found by jPlayer in this browser. Neither HTML nor Flash can be used.",NO_SUPPORT:"It is not possible to play any media format provided in setMedia() on this browser using your current options.",URL:"Media URL could not be loaded.",URL_NOT_SET:"Attempt to issue media playback commands, while no media url is set.",VERSION:"jPlayer "+t.jPlayer.prototype.version.script+" needs Jplayer.swf version "+t.jPlayer.prototype.version.needFlash+" but found "},t.jPlayer.errorHint={FLASH:"Check your swfPath option and that Jplayer.swf is there.",NO_SOLUTION:"Review the jPlayer options: support and supplied.",NO_SUPPORT:"Video or audio formats defined in the supplied option are missing.",URL:"Check media URL is valid.",URL_NOT_SET:"Use setMedia() to set the media URL.",VERSION:"Update jPlayer files."},t.jPlayer.warning={CSS_SELECTOR_COUNT:"e_css_selector_count",CSS_SELECTOR_METHOD:"e_css_selector_method",CSS_SELECTOR_STRING:"e_css_selector_string",OPTION_KEY:"e_option_key"},t.jPlayer.warningMsg={CSS_SELECTOR_COUNT:"The number of methodCssSelectors found did not equal one: ",CSS_SELECTOR_METHOD:"The methodName given in jPlayer('cssSelector') is not a valid jPlayer method.",CSS_SELECTOR_STRING:"The methodCssSelector given in jPlayer('cssSelector') is not a String or is empty.",OPTION_KEY:"The option requested in jPlayer('option') is undefined."},t.jPlayer.warningHint={CSS_SELECTOR_COUNT:"Check your css selector and the ancestor.",CSS_SELECTOR_METHOD:"Check your method name.",CSS_SELECTOR_STRING:"Check your css selector is a string.",OPTION_KEY:"Check your option name."}}(jQuery),EOL.init_curation_behaviours=function(){!function(t){var e={trusted:function(){this.closest("fieldset").find("ul").hide().end().find("select[name*=visibility]").prop("disabled",!1).trigger("change")},unreviewed:function(){this.closest("fieldset").find("ul").hide().end().find("select[name*=visibility]").prop("disabled",!1).trigger("change")},untrusted:function(){this.closest("fieldset").find("select[name*=visibility]").val("hidden").prop("disabled",!0).end().find("ul").hide().filter(".untrusted").show()},hide:function(){this.closest("fieldset").find("ul").hide().filter(".hidden").show()
},show:function(){this.closest("fieldset").find("ul").hide()}};t.find("select").change(function(){var t=$(this);t.is(":enabled")&&e[t.find(":selected").attr("class")].apply(t)}).trigger("change"),t.find("fieldset").each(function(){0===$(this).find("select").length&&$(this).find("ul").hide()})}($("form.review_status"))},$(function(){!function(t){t.find("a.jp-play").each(function(){var t,e;switch($(this).data("mime-type")){case"audio/mpeg":t={mp3:$(this).attr("href")},e="mp3";break;case"application/ogg":t={oga:$(this).attr("href")},e="oga";break;default:t={}}$("#player").jPlayer({swfPath:"http://10.252.248.38:8081//assets/jplayer/js",supplied:e,cssSelectorAncestor:"#player_interface",ready:function(){$(this).jPlayer("setMedia",t)}})})}($("#main")),EOL.init_curation_behaviours()}),$(document).ready(function(){var t=$("form.review_status .actions");t.length>0&&$("p.toc_items").insertBefore(t)});