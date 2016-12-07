 var faceDivs=$('#faces .face'),faceArray=faceDivs.toArray();
// taken from [https://css-tricks.com/snippets/javascript/shuffle-array/]
faceArray.sort(function() {return 0.5-Math.random()});
//TweenMax.staggerFromTo(faceArray,.6,{position:'relative',x:0},{x:100,ease:Power2.easeInOut},.1);

//(function() {

  //initial timeline
    //TL max:
var tmax_options = {
  delay: 0,
  paused: false,
  onComplete: function() {
    console.log('animation is complete');
  },
  onCompleteScope: {},
  tweens: [],
  stagger: 0,
  align: 'normal',
  useFrames: false,
  onStart: function() {
    console.log('on start called');
    //showNextMsg();
  },
  onStartScope: {},
  onUpdate: function() {
    console.log('on update called');
  },
  onUpdateScope: {},
  onRepeat: function() {
    console.log('on repeat called');
  },
  onRepeatScope: {},
  onReverseComplete: function() {
    console.log('on reverse complete');
  },
  onReverseCompleteScope: {},
  autoRemoveChildren: false,
  smoothChildTiming: false,
  repeat: 0,
  repeatDelay: 0,
  yoyo: false,
  onCompleteParams: [],
  onReverseCompleteParams: [],
  onStartParams: [],
  onUpdateParams: [],
  onRepeatParams: []
};

var totalTimeline = new TimelineMax(tmax_options);
var currentTimeline = new TimelineMax(tmax_options);

//Try the Blur:
var blurTimeline = TweenMax.to({}, 2, {
  onUpdateParams:["{self}"],
  onUpdate:function(tl){
    var tlp = (tl.progress()*5)>>0;
    TweenMax.set('#faces',{'-webkit-filter':'blur(' + tlp + 'px' + ')','filter':'blur(' + tlp + 'px' + ')'});
  }
});

totalTimeline.to($("#ball"),2,{left:"100vw", ease: Power0.easeNone})
currentTimeline.to($("#little-ball"),5,{left:"100vw", ease: Power0.easeNone})

  var tl = new TimelineMax(tmax_options);
  tl.staggerTo(faceArray,10,{top:"-200px",scale:".3", ease:Power2.easeInOut},.01);
  TweenLite.set(totalTimeline,{timeScale: 0})
  TweenLite.set(currentTimeline,{timeScale: 0})
  TweenLite.set(tl,{timeScale: 0})
  TweenLite.set(blurTimeline,{timeScale: 0})

  // initiate roll
  var roll = Roll.DOM( "#wrapper", "#pane", "#steps", ".step", 100 );

  var views = document.querySelectorAll( ".step" );
  views[0].className = "step curr"; // set first step's class name as "curr"


  // define how you want to track the elements as you scroll
  function track() {

    // vendor prefix for old browsers
    function _vendor( elem, prop, val ) {
      var vs = ["webkit", "Webkit", "Moz", "ms"];
      for (var i=0; i<vs.length; i++) {
        elem.style[ vs[i]+prop ] = val;
      }
    }

    // when a step is changed
    roll.on( "step", Roll.stepHandler( roll, views, "prev", "next", "curr", true ) );

    // when scrolling, just print some debugging info in an element
    roll.on( "roll", function ( step, stepProgress, position, totalProgress ) {
      var curr = (step >= 0) ? "Step "+(step+1) : "(padding)";


      var vals = {
        numSteps: roll.steps.length,
        viewportHeight: roll.getViewportHeight(),
        paneHeight: roll.getHeight(),
        currStep: curr,
        currPos: position + "px",
        currStepProgress: Math.floor( stepProgress * 100 ) + "%",
        totalProgress: Math.floor( totalProgress * 100) + "%"
      };

      //$(".menu-text").text(stepProgress + ", " + totalProgress)
      $("#ball svg text").text("total: " + (totalProgress).toFixed(3))
      $("#little-ball svg text").text("total: " + (stepProgress).toFixed(3))
      totalTimeline.progress(totalProgress)
      currentTimeline.progress(stepProgress)
      blurTimeline.progress(stepProgress)
      for (var k in vals) {
        var el = document.querySelector("#"+k);
        if (el) {
          el.textContent = vals[k];
        }
      }

      // if (step >= 0) {
        var currStep = document.querySelector( "#s1" );
        var ings = currStep.querySelectorAll( ".face" );
        // for (var i = 0; i < ings.length; i++) {
        //   var ang1 = parseInt( ings[i].getAttribute( "data-angle" ) );
        //   var ang2 = parseInt( ings[i].getAttribute( "data-rotate" ) );
        //   //var tm = "rotate(" + (ang1 + (stepProgress*0.2) * ang2 ) + "deg) scale(" + (0.25 + totalProgress * 0.5) + ")";
        //   var tm = "scale(" + (0.25 + totalProgress * 0.5) + ") translate(0, "+Math.floor(-ang1*stepProgress*3)+"px)";
        //   ings[i].style.transform = tm;
        //   _vendor( ings[i], "Transform", tm );
        // }
      // }

      var progress = document.querySelector("#progress");
      progress.style.height = Math.floor(roll.getViewportHeight() * totalProgress) + "px";

    });
  }

  // start tracking
  track();

  // a global function to scroll to a specific step in the roll instance.
  window.goto = function(index) {
    var viewport = document.querySelector( "#wrapper" );
    roll.scroll(index, viewport);
  };


  // re-initiate roll when resized
  window.addEventListener("resize", function(evt) {
    roll = Roll.DOM( "#wrapper", "#pane", "#steps", ".step", 100 );
    track();
    goto(0);
  });

  goto(0);

// })();