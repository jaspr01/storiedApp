/*
 * beforeAfter.js - Image comparison slider script for Storied Assignment
 * @author: Jasper Verschuere <verschuere.jasper@gmail.com>
 */

/**
 * Directive for the initial setup of the image comparison slider
 */
storiedApp.directive('n2BeforeAfter', function($rootScope) {
    function link() {
        // Get the necessary elements
        $rootScope.firstImg = $('[n2-before-after] img').eq(0);
        $rootScope.draggable = $('.draggable');
        $rootScope.divider = $('.divider');
        $rootScope.icon = $('.divider .icon');
        var url = $rootScope.firstImg.attr('src');

        // Let the images load before getting the values
        var img = new Image();
        img.onload = function(){
            // Get width, height, top and left of first image in div
            $rootScope.firstImgWidth = $rootScope.firstImg.width();
            $rootScope.firstImgHeight = $rootScope.firstImg.height();
            $rootScope.firstImgTop = $rootScope.firstImg.offset().top;
            $rootScope.firstImgLeft = $rootScope.firstImg.offset().left;

            // Calculate the initial position of the divider (now at 90% if first image)
            $rootScope.initialDividerXPosition = $rootScope.firstImgWidth * 0.9;

            // Set the initial position of the divider
            $rootScope.divider.css('left', $rootScope.initialDividerXPosition + 'px');
            $rootScope.divider.css('height', $rootScope.firstImgHeight);
            $rootScope.divider.css('top', '-' + ($rootScope.firstImgHeight + 4) + 'px');

            // Set the icon in the middle of the divider
            $rootScope.icon.css('margin-top', ($rootScope.divider.height() / 2) + 'px');

            // Set the height of the draggable div
            $rootScope.draggable.css('height', $rootScope.firstImgHeight + 'px');

            // Make the divider draggable
            $rootScope.divider.draggable({
                axis: "x",
                containment: [$rootScope.firstImgLeft, $rootScope.firstImgTop, $rootScope.firstImgLeft + $rootScope.firstImgWidth, $rootScope.firstImgTop + $rootScope.firstImgHeight]
            });

            // Clip the first image to the initial position of the divider
            $rootScope.firstImg.css('clip', 'rect(0px,' + $rootScope.initialDividerXPosition +'px,' + $rootScope.firstImgHeight + 'px,0px)');

            // Set the slideWithScroll on true => the slider will only move on scroll when this is set
            $rootScope.slideWithScroll = true;
        };
        img.src = url;
    }

    // Return the function
    return {
        link: link
    }
});

/**
 * Directive for sliding the divider when scrolling
 */
storiedApp.directive('slideWithScroll', function($rootScope) {
    function scroll() {
        if ($rootScope.slideWithScroll) {
            // Calculate the needed values
            var maxScrollPosition = $(document).height() - $(window).height();
            var currentScrollPosition = $(document).scrollTop();
            var currentScrollPercentage = currentScrollPosition / maxScrollPosition;
            var firstImgHalfWidth = $rootScope.firstImgWidth * 0.8;
            var extraLeft = firstImgHalfWidth * currentScrollPercentage;

            // Calculate the new divider position
            var newDividerXPosition = $rootScope.initialDividerXPosition - extraLeft;

            // Set the new divider position
            $rootScope.divider.css('left', newDividerXPosition + 'px');

            // Set the clip of the first image to the new position of the divider
            $rootScope.firstImg.css('clip', 'rect(0px,' + newDividerXPosition +'px,' + $rootScope.firstImgHeight + 'px,0px)');
        }
    }

    function link() {
        $(window).bind('scroll', scroll);
    }

    return {
        link: link
    }
});

/**
 * Directive for manual sliding
 */
storiedApp.directive('draggable', function($rootScope) {

    function mouseDown() {
        $(window).bind('mousemove', divMove);
    }

    function divMove() {
        // Get the position of the divider
        var dividerXPosition = $rootScope.divider.offset().left;

        // Calculate the new clip position of the first image
        var newFirstImgClipPosition = dividerXPosition - $rootScope.firstImgLeft;

        // Set the new clip position of the first image
        $rootScope.firstImg.css('clip', 'rect(0px,' + newFirstImgClipPosition +'px,' + $rootScope.firstImgHeight + 'px,0px)');

        // Set the slideWithScroll on false => slider wil not move on scroll
        $rootScope.slideWithScroll = false;
    }

    function link(scope, element, attr) {
        element.bind('mousedown', mouseDown);
    }

    return {
        link: link
    }
});
