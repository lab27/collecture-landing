(function() {

  var stuff =[
    {bg: "1", x: 20,  y: 30},
    {bg: "2", x: 30, y: 25},
    {bg: "3", x: 40, y: 30},
    {bg: "4", x: 50, y: 23},
    {bg: "5", x: 60,  y: 30},
    {bg: "6", x: 70, y: 21},
    {bg: "7", x: 80, y: 30},
    {bg: "8", x: 20, y: 50},
    {bg: "3", x: 30, y: 45},
    {bg: "1", x: 40, y: 50},
    {bg: "2", x: 50, y: 46},
    {bg: "3", x: 60, y: 50},
    {bg: "4", x: 70, y: 43},
    {bg: "5", x: 80,  y: 50},
    {bg: "6", x: 25, y: 72},
    {bg: "7", x: 35, y: 64},
    {bg: "8", x: 45, y: 70},
    {bg: "3", x: 55, y: 65},
    {bg: "4", x: 65, y: 70}
  ];


  function getIngredients() {
    var ings = [];
    for (var i=0; i<20; i++) {
      //var dice = Math.floor(Math.random()*stuff.length);
      var dice = i;
      ings.push( stuff[dice] );
    }
    return ings;
  }


  function _vendor( elem, prop, val ) {
    var vs = ["webkit", "Webkit", "Moz", "ms"];
    for (var i=0; i<vs.length; i++) {
      elem.style[ vs[i]+prop ] = val;
    }
  }

  function addIngredients( ings, parent ) {
    var rect = parent.getBoundingClientRect();
    for (var i=0; i<ings.length; i++) {
      var ing = document.createElement("div");
      var img = document.createElement("img");
      img.setAttribute("src", "./assets/images/faces/"+ings[i].bg+".png");
      ing.appendChild(img);
      // ing.style.width = ings[i].w + "px";
      // ing.style.height = ings[i].h + "px";
      ing.style.position = "absolute";
      ing.style.left = ings[i].x + "vw";
      ing.style.top = ings[i].y + "vh";
      // var ang = Math.floor(Math.random()*360);
      // var ang2 = Math.floor(Math.random()*90) - Math.floor(Math.random()*90);

      // var tm = "rotate("+ang+"deg) scale(0.5)";
      // ing.style.transform = tm;
      // _vendor( ing, "Transform", tm );

      // ing.setAttribute("data-angle", ang);
      // ing.setAttribute("data-rotate", ang2);
      ing.className = "face";
      parent.appendChild( ing );
    }
  }



  for (var i=0; i<1; i++) {
    var elem = document.querySelector("#s"+i);
    var ings = getIngredients();
    addIngredients( ings, elem );
  }

})();