var firstImg = $('.beforeAfter-slider img').eq(0);
var draggable = $('.draggable');
var divider = $('.divider');

var firstImgWidth;
var firstImgHeight;
var firstImgTop;
var firstImgLeft;

storiedApp.directive('n2BeforeAfter', function() {
    function link() {
        var url = firstImg.attr('src');

        var img = new Image();
        img.onload = function(){
            firstImgWidth = firstImg.width();
            firstImgHeight = firstImg.height();
            firstImgTop = firstImg.offset().top;
            firstImgLeft = firstImg.offset().left;

            var initialDividerXPosition = firstImgWidth * 0.75;
            divider.css('left', initialDividerXPosition + 'px');
            divider.css('height', firstImgHeight);
            divider.css('top', '-' + (firstImgHeight + 4) + 'px');
            draggable.css('height', firstImgHeight + 'px');

            divider.draggable({
                axis: "x",
                containment: [firstImgLeft, firstImgTop, firstImgLeft + firstImgWidth, firstImgTop + firstImgHeight]
            });

            firstImg.css('clip', 'rect(0px,' + initialDividerXPosition +'px,' + firstImgHeight + 'px,0px)');
        };
        img.src = url;
    }

    return {
        link: link
    }
});

storiedApp.directive('draggable', function() {

    function mouseDown() {
        $(window).bind('mousemove', divMove);
    }

    function divMove() {
        var dividerXPosition = divider.offset().left;
        var newDividerXPosition = dividerXPosition - firstImgLeft;
        firstImg.css('clip', 'rect(0px,' + newDividerXPosition +'px,' + firstImgHeight + 'px,0px)');
    }

    function link(scope, element, attr) {
        element.bind('mousedown', mouseDown);
    }

    return {
        link: link
    }
});