PLACEHOLDER_IMAGE = "/img/placeholder.png";

 var placeholder = "<img class='placeholder' src='"+PLACEHOLDER_IMAGE+"' />";



var img = new Image(PLACEHOLDER_IMAGE);

 fadeImages = function(element) {
  if (element === undefined) element = $('.cover:not(.load-check)');
  element.each(function() {

    var $this = $(this);
    $this.append(placeholder);
    var img = $this.find("img:not(.placeholder)");
    if (img[0].complete) {
      img.animate({opacity:1});
      $this.find(".placeholder").animate({opacity:0});
    }
    else {
      img.on("load", function() {
        img.animate({opacity:1});
        $this.find(".placeholder").animate({opacity:0});
      });
    }
    $this.addClass("load-check");
  });
}

$(document).ready(function() {
  fadeImages(); 


});



