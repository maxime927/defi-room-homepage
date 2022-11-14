
const $ = require('jquery');

// Main JS
$(document).ready(function () {

  // Menu
  let btnMenu = $('.btn-menu');
  btnMenu.click(function() {
    $('.header-wrap').toggleClass('opened');
    //$('html, body').toggleClass('overflow');
    $('.header-nav').toggleClass('opened');

    $('.has-children').removeClass('active');
  });


  // Slick slider
  // debounce from underscore.js
  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  // use x and y mousewheel event data to navigate flickity
  function slick_handle_wheel_event(e, slick_instance, slick_is_animating) {
    // do not trigger a slide change if another is being animated
    if (!slick_is_animating) {
      // pick the larger of the two delta magnitudes (x or y) to determine nav direction
      var direction =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

      console.log("wheel scroll ", e.deltaX, e.deltaY, direction);

      if (direction > 0) {
        // next slide
        slick_instance.slick("slickNext");
      } else {
        // prev slide
        slick_instance.slick("slickPrev");
      }
    }
  }

  // debounce the wheel event handling since trackpads can have a lot of inertia
  var slick_handle_wheel_event_debounced = debounce(
    slick_handle_wheel_event
    , 100, true
  );


  // slider #1
  const slick_1 = $(".slider-pictures ul");
  slick_1.slick({
    dots: false,
    fade: true,
    asNavFor: '.slider-texts ul',
    focusOnSelect: true
  });
  var slick_1_is_animating = false;

  slick_1.on("afterChange", function(index) {
    console.log("Slide settle " + index);
    slick_1_is_animating = false;
  });

  slick_1.on("beforeChange", function(index) {
    console.log("Slide selected " + index);
    slick_1_is_animating = true;
  });

  slick_1.on("wheel", function(e) {
    slick_handle_wheel_event_debounced(e.originalEvent, slick_1, slick_1_is_animating);
  });


  // slider #2
  const slick_2 = $(".slider-texts ul");
  slick_2.slick({
    dots: false,
    fade: true,
    asNavFor: '.slider-pictures ul',
    focusOnSelect: true
  });
  var slick_2_is_animating = false;

  slick_2.on("afterChange", function(index) {
    console.log("Slide after change " + index);
    slick_2_is_animating = false;
  });

  slick_2.on("beforeChange", function(index) {
    console.log("Slide before change " + index);
    slick_2_is_animating = true;
  });

  slick_2.on("wheel", function(e) {
    slick_handle_wheel_event_debounced(e.originalEvent, slick_2, slick_2_is_animating);
  });

});

// Passive event listeners
jQuery.event.special.touchstart = {
    setup: function( _, ns, handle ) {
        this.addEventListener("touchstart", handle, { passive: !ns.includes("noPreventDefault") });
    }
};
jQuery.event.special.touchmove = {
    setup: function( _, ns, handle ) {
        this.addEventListener("touchmove", handle, { passive: !ns.includes("noPreventDefault") });
    }
};
