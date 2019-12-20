function setTab(number){
    document.getElementById('line1').classList.remove('active');
    document.getElementById('line2').classList.remove('active');
    document.getElementById('line3').classList.remove('active');
    document.getElementById('line4').classList.remove('active');

    document.getElementById('tab1').classList.remove('active-tab');
    document.getElementById('tab2').classList.remove('active-tab');
    document.getElementById('tab3').classList.remove('active-tab');
    document.getElementById('tab4').classList.remove('active-tab');

    document.getElementById('line'+(number == 4 ? 3 : number)).classList.add('active');
    document.getElementById('tab'+number).classList.add('active-tab');

    if(number != 1){
        document.getElementById('screen').classList.add('scaled');
        document.getElementById('body').classList.add('immersive');
        document.getElementById('body').classList.remove('light');
        document.getElementById('body').classList.add('dark');
    }else{
        document.getElementById('screen').classList.remove('scaled');
        document.getElementById('body').classList.remove('immersive');
        document.getElementById('body').classList.remove('dark');
        document.getElementById('body').classList.add('light');
    }
}

(function() {
    // Init
    var container = document.getElementById("body"),
      inner = document.getElementById("screen"),
      title = document.getElementById("nathan-title");
  
    // Mouse
    var mouse = {
      _x: 0,
      _y: 0,
      x: 0,
      y: 0,
      updatePosition: function(event) {
        var e = event || window.event;
        this.x = e.clientX - this._x;
        this.y = (e.clientY - this._y) * -1;
      },
      setOrigin: function(e) {
        this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2);
        this._y = e.offsetTop + Math.floor(e.offsetHeight / 2);
      },
      show: function() {
        return "(" + this.x + ", " + this.y + ")";
      }
    };
  
    // Track the mouse position relative to the center of the container.
    mouse.setOrigin(container);
  
    var onMouseEnterHandler = function(event) {
      update(event);
    };
  
    var onMouseLeaveHandler = function() {
      inner.style = "";
    };
  
    var onMouseMoveHandler = function(event) {
        update(event);
    };
  
    //-----------------------------------------
  
    var update = function(event) {
      mouse.updatePosition(event);
      updateTransformStyle(
        (mouse.y / inner.offsetHeight / 10).toFixed(2),
        (mouse.x / inner.offsetWidth / 10).toFixed(2)
      );
    };
  
    var updateTransformStyle = function(x, y) {
      var style = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
      inner.style.transform = style;
      inner.style.webkitTransform = style;
      inner.style.mozTransform = style;
      inner.style.msTransform = style;
      inner.style.oTransform = style;

      var style2 = "translateX(" + y*100 + "px) translateY(" + -x*100 + "px)";
      title.style.transform = style2;
      title.style.webkitTransform = style2;
      title.style.mozTransform = style2;
      title.style.msTransform = style2;
      title.style.oTransform = style2;
    };
  
    //-----------------------------------------
  
    container.onmouseenter = onMouseEnterHandler;
    container.onmouseleave = onMouseLeaveHandler;
    container.onmousemove = onMouseMoveHandler;
  })();