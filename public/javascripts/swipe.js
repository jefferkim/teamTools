/*
 * Swipe 1.0
 *
 * Brad Birdsall, Prime
 * Copyright 2011, Licensed GPL & MIT
 *
*/

window.Swipe = function(element, options) {

  // return immediately if element doesn't exist
  if (!element) return null;

  var _this = this;

  // retreive options
  this.options = options || {};
  this.index = this.options.startSlide || 0;
  this.speed = this.options.speed || 300;
  this.callback = this.options.callback || function() {};
  this.delay = this.options.auto || 0;
  this.vertical = !!this.options.vertical;
  this.preload = this.options.preload;
  this.lazyloadClass = this.options.lazyloadClass || 'lazy';
  this.lazyloadDataAttr = this.options.lazyloadDataAttr || 'src';
  this.fixWidth = this.options.fixWidth;  //not to calculate the container width

  // reference dom elements
  this.container = element;
  this.element = this.container.children[0]; // the slide pane

  // static css
  this.container.style.overflow = 'hidden';
  this.element.style.listStyle = 'none';
  this.element.style.marginLeft = "0px";

  // trigger slider initialization
  this.setup();

  // begin auto slideshow
  this.begin();

  // add event listeners
  if (this.element.addEventListener) {
    this.element.addEventListener('touchstart', this, false);
    this.element.addEventListener('touchmove', this, false);
    this.element.addEventListener('touchend', this, false);
    this.element.addEventListener('webkitTransitionEnd', this, false);
    this.element.addEventListener('msTransitionEnd', this, false);
    this.element.addEventListener('oTransitionEnd', this, false);
    this.element.addEventListener('transitionend', this, false);
    window.addEventListener('resize', this, false);
  }

};

Swipe.prototype = {

  setup: function() {

    // get and measure amt of slides
    this.slides = this.element.children;
    this.length = this.slides.length;

    // return immediately if their are less than two slides
    if (this.length < 2) return null;

    // determine width of each slide

    this.width = this.fixWidth || (Math.ceil(("getBoundingClientRect" in this.container) ? this.container.getBoundingClientRect().width : this.container.offsetWidth));

    // return immediately if measurement fails
    if (!this.width) return null;

    // hide slider element but keep positioning during setup
    this.container.style.visibility = 'hidden';

    // dynamic css
    if (this.vertical) {
      this.element.style.height = Math.ceil(this.slides.length * 60) + 'px';
    } else {
      this.element.style.width = Math.ceil(this.slides.length * this.width) + 'px';
      var index = this.slides.length;
      while (index--) {
        var el = this.slides[index];
        el.style.width = this.width + 'px';
        el.style.display = 'table-cell';
        el.style.verticalAlign = 'top';
      }
    }


    // set start position and force translate to remove initial flickering
    this.slide(this.index, 0);

    // show slider element
    this.container.style.visibility = 'visible';

  },

  slide: function(index, duration) {

    var style = this.element.style;

    // fallback to default speed
    if (duration == undefined) {
        duration = this.speed;
    }

    // set duration speed (0 represents 1-to-1 scrolling)
    style.webkitTransitionDuration = style.MozTransitionDuration = style.msTransitionDuration = style.OTransitionDuration = style.transitionDuration = duration + 'ms';

    // translate to given index position
    if (this.vertical) {
      style.MozTransform = style.webkitTransform = 'translate3d(0, ' + -(index * 60) + 'px,0)';
      //style.msTransform = style.OTransform = 'translateX(' + -(index * this.width) + 'px)';
    } else {
      style.MozTransform = style.webkitTransform = 'translate3d(' + -(index * this.width) + 'px,0,0)';
      style.msTransform = style.OTransform = 'translateX(' + -(index * this.width) + 'px)';
    }

    // set new index to allow for expression arguments
    this.index = index;

    if (this.vertical) {
      if (this.index < 0) this.index = 0;
      if (this.index > this.length - 4) this.index = this.length - 4;
      style.MozTransform = style.webkitTransform = 'translate3d(0, ' + -(this.index * 60) + 'px,0)';
    }

  },

  getPos: function() {

    // return current index position
    return this.index;

  },

  prev: function(delay) {

    // cancel next scheduled automatic transition, if any
    this.delay = delay || 0;
    clearTimeout(this.interval);

    // if not at first slide
    if (this.index) this.slide(this.index-1, this.speed);

  },

  next: function(delay) {

    // cancel next scheduled automatic transition, if any
    this.delay = delay || 0;
    clearTimeout(this.interval);

    if (this.index < this.length - 1) this.slide(this.index+1, this.speed); // if not last slide
    else this.slide(0, this.speed); //if last slide return to start

  },

  begin: function() {

    var _this = this;

    this.interval = (this.delay)
      ? setTimeout(function() {
        _this.next(_this.delay);
      }, this.delay)
      : 0;

  },

  stop: function() {
    this.delay = 0;
    clearTimeout(this.interval);
  },

  resume: function() {
    this.delay = this.options.auto || 0;
    this.begin();
  },

  load: function() {
    if (!this.preload) return;
    var self = this;

    for (var i = 0; i < this.preload; i++) {
      (function() {
        if (self.index + i < self.length) {
          var slide = self.slides[self.index + i];
          if (!slide.getAttribute('loaded')) self._loadImages(slide);
        }
      })()
    }
  },

  _loadImages: function(slide) {
    var images = slide.querySelectorAll('img.' + this.lazyloadClass);
    for (var i = 0; i < images.length; i++) {
      (function() {
        var j = i, img = new Image;
        img.onload = function() {
          images[j].src = this.src;
          slide.setAttribute('loaded', true);
        };
        // TODO img.onerror for 404s
        img.src = images[i].getAttribute('data-' + this.lazyloadDataAttr);
      }).call(this);
    }
  },

  handleEvent: function(e) {
    switch (e.type) {
      case 'touchstart': this.onTouchStart(e); break;
      case 'touchmove': this.onTouchMove(e); break;
      case 'touchend': this.onTouchEnd(e); break;
      case 'webkitTransitionEnd':
      case 'msTransitionEnd':
      case 'oTransitionEnd':
      case 'transitionend': this.transitionEnd(e); break;
      case 'resize': this.setup(); break;
    }
  },

  transitionEnd: function(e) {

    if (this.preload) this.load();

    if (this.delay) this.begin();

    this.callback(e, this.index, this.slides[this.index]);

  },

  onTouchStart: function(e) {

    this.start = {

      // get touch coordinates for delta calculations in onTouchMove
      pageX: e.touches[0].pageX,
      pageY: e.touches[0].pageY,

      // set initial timestamp of touch sequence
      time: Number( new Date() )

    };

    // used for testing first onTouchMove event
    this.isScrolling = undefined;

    // reset deltaX
    this.deltaX = 0;
    this.deltaY = 0;

    // set transition time to 0 for 1-to-1 touch movement
    this.element.style.MozTransitionDuration = this.element.style.webkitTransitionDuration = 0;

    e.stopPropagation();
  },

  onTouchMove: function(e) {

    // ensure swiping with one touch and not pinching
    if(e.touches.length > 1 || e.scale && e.scale !== 1) return;

    this.deltaX = e.touches[0].pageX - this.start.pageX;
    this.deltaY = e.touches[0].pageY - this.start.pageY;

    // determine if scrolling test has run - one time test
    if ( typeof this.isScrolling == 'undefined') {
      this.isScrolling = !!( this.isScrolling || Math.abs(this.deltaX) < Math.abs(e.touches[0].pageY - this.start.pageY) );
    }

    // if user is not trying to scroll vertically
    if (!this.isScrolling && !this.vertical) {

      // prevent native scrolling
      e.preventDefault();

      // cancel slideshow
      clearTimeout(this.interval);

      // increase resistance if first or last slide
      this.deltaX =
        this.deltaX /
          ( (!this.index && this.deltaX > 0               // if first slide and sliding left
            || this.index == this.length - 1              // or if last slide and sliding right
            && this.deltaX < 0                            // and if sliding at all
          ) ?
          ( Math.abs(this.deltaX) / this.width + 1 )      // determine resistance level
          : 1 );                                          // no resistance if false

      // translate immediately 1-to-1
      this.element.style.MozTransform = this.element.style.webkitTransform = 'translate3d(' + (this.deltaX - this.index * this.width) + 'px,0,0)';

      e.stopPropagation();

    }

    if (this.vertical) {

      e.preventDefault();

      clearTimeout(this.interval);

      this.deltaY =
        this.deltaY /
          ( (!this.index && this.deltaY > 0               // if first slide and sliding left
            || this.index == this.length - 4              // or if last slide and sliding right
            && this.deltaY < 0                           // and if sliding at all
          ) ?
          ( Math.abs(this.deltaY) / 60 + 1 )      // determine resistance level
          : 1 );                                          // no resistance if false

      // translate immediately 1-to-1
      this.element.style.MozTransform = this.element.style.webkitTransform = 'translate3d(0, ' + (this.deltaY - this.index * 60) + 'px,0)';

      e.stopPropagation();
    }

  },

  onTouchEnd: function(e) {

    // determine if slide attempt triggers next/prev slide
    var isValidSlide =
          Number(new Date()) - this.start.time < 250      // if slide duration is less than 250ms
          && Math.abs(this.deltaX) > 20                   // and if slide amt is greater than 20px
          || Math.abs(this.deltaX) > this.width/2,        // or if slide amt is greater than half the width

    // determine if slide attempt is past start and end
        isPastBounds =
          !this.index && this.deltaX > 0                          // if first slide and slide amt is greater than 0
          || this.index == this.length - 1 && this.deltaX < 0;    // or if last slide and slide amt is less than 0

    if (this.vertical) {
      isValidSlide = Number(new Date()) - this.start.time < 250
          && Math.abs(this.deltaY) > 20
          || Math.abs(this.deltaY) > this.width/2;

      isPastBounds =
          !this.index && this.deltaY > 0
          || this.index == this.length - 4 && this.deltaY < 0;
    }

    // if not scrolling vertically
    if (!this.isScrolling && !this.vertical) {

      // call slide function with slide end value based on isValidSlide and isPastBounds tests
      this.slide( this.index + ( isValidSlide && !isPastBounds ? (this.deltaX < 0 ? 1 : -1) : 0 ), this.speed );

    }

    if (this.vertical) {

      var deltai = Math.ceil(Math.abs(this.deltaY) / 60);
      this.slide( this.index + ( isValidSlide && !isPastBounds ? (this.deltaY < 0 ? deltai : -deltai) : 0 ), this.speed );

    }

    e.stopPropagation();
  },

  destroy:function(){
        this.element.removeEventListener('touchstart', this);
        this.element.removeEventListener('touchmove', this);
        this.element.removeEventListener('touchend', this);
        this.element.removeEventListener('webkitTransitionEnd', this);
        this.element.removeEventListener('msTransitionEnd', this);
        this.element.removeEventListener('oTransitionEnd', this);
        this.element.removeEventListener('transitionend', this);
  }

};
