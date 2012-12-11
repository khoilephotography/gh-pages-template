$(function(){
$( 'div.b-sidebar a')
    .click(function() {
        $("#fotorama").empty().append('<img src="http://farm5.static.flickr.com/4148/4967746406_427d761e2e_b.jpg"/>');
        $("#fotorama").prepend('<img src="http://farm5.static.flickr.com/4148/4967746406_427d761e2e_b.jpg"/>');
        return false;
    });​
}