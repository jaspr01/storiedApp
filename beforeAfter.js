storiedApp.directive('n2BeforeAfter', function($window) {
    function link() {
        var beforeAfter = $('.beforeAfter');
        var firstImg = $('.beforeAfter-slider img').eq(0);
        var draggable = $('#draggable');
        var divider = $('.divider');

        var url = firstImg.attr('src');

        var img = new Image();
        img.onload = function(){
            var width = firstImg.width();
            var height = firstImg.height();
            var initialWidth = width - (width * 0.25);
            console.log('full width: ' + width);
            console.log('75% width: ' + initialWidth);

            firstImg.css('clip', 'rect(0px,' + initialWidth + 'px,600px,0px)');
            divider.css('height', height + 'px');
            divider.css('top', '-' + (height + 4) + 'px');
            divider.css('left', initialWidth + 'px');
            draggable.css('height', height + 'px');

            var position = firstImg.position();
            console.log(position);
            draggable.draggable({
                axis: "x",
                containment: [position.left + 8, position.top, position.left + width + 3, position.top + height]
            });
        };
        img.src = url;
    }

    return {
        link: link
    }
});

storiedApp.directive('draggable', function($window) {

    function mouseDown() {
        $(window).bind('mousemove', divMove);
    }

    function divMove() {
        var newWidth = $('#draggable').offset().left;
        console.log(newWidth);
        $('.beforeAfter-slider img').eq(0).css('clip', 'rect(0px,' + newWidth + 'px,1080px,0px)');
    }

    function link(scope, element, attr) {
        element.bind('mousedown', mouseDown);
    }

    return {
        link: link
    }
});