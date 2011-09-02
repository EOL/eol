$(function() {

  (function($media_list) {
    $media_list.find("a.play").each(function() {
      switch($(this).attr('data-mime_type')) {
        case 'audio/mpeg':
          var media = { mp3: $(this).attr('href') };
          var supplied = "mp3";
          break;
        default:
          // Mime type unknown so we remove redundant links
          $(this).parent("div").find("a.pause").remove();
          $(this).parent("div").find("a.stop").remove();
          var media = {};
      }
      $(this).parent('div').prev("div").jPlayer({
        swfPath: "/javascripts/jplayer/js",
        supplied: supplied,
        cssSelectorAncestor: "#" + $(this).parent('div').attr("id"),
        cssSelector: {
          play: ".play",
          pause: ".pause",
          stop: ".stop",
          currentTime: ".current_time",
          duration: ".duration"
        },
        ready: function () {
          $(this).jPlayer("setMedia", media);
        }
      }).bind($.jPlayer.event.play, function() {
        $(this).jPlayer("pauseOthers");
      });
    });
  })($("#media_list"));

});
