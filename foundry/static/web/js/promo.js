/**
 AnythingSlider v1.7.18 minified using Google Closure Compiler
  Original by Chris Coyier: http://css-tricks.com
   Get the latest version: https://github.com/ProLoser/AnythingSlider
   */
   (function(d){d.anythingSlider=function(h,i){var a=this,b;a.el=h;a.$el=d(h).addClass("anythingBase").wrap('<div class="anythingSlider"><div class="anythingWindow" /></div>');a.$el.data("AnythingSlider",a);a.init=function(){a.options=b=d.extend({},d.anythingSlider.defaults,i);a.initialized=!1;d.isFunction(b.onBeforeInitialize)&&a.$el.bind("before_initialize",b.onBeforeInitialize);a.$el.trigger("before_initialize",a);a.$wrapper=a.$el.parent().closest("div.anythingSlider").addClass("anythingSlider-"+ b.theme);a.$window=a.$el.closest("div.anythingWindow");a.win=window;a.$win=d(a.win);a.$controls=d('<div class="anythingControls"></div>').appendTo(null!==b.appendControlsTo&&d(b.appendControlsTo).length?d(b.appendControlsTo):a.$wrapper);a.$startStop=d('<a href="#" class="start-stop"></a>');b.buildStartStop&&a.$startStop.appendTo(null!==b.appendStartStopTo&&d(b.appendStartStopTo).length?d(b.appendStartStopTo):a.$controls);a.$nav=d('<ul class="thumbNav" />').appendTo(null!==b.appendNavigationTo&&d(b.appendNavigationTo).length? d(b.appendNavigationTo):a.$controls);a.flag=!1;a.playing=b.autoPlay;a.slideshow=!1;a.hovered=!1;a.panelSize=[];a.currentPage=b.startPanel=parseInt(b.startPanel,10)||1;b.changeBy=parseInt(b.changeBy,10)||1;a.adj=b.infiniteSlides?0:1;a.width=a.$el.width();a.height=a.$el.height();a.outerPad=[a.$wrapper.innerWidth()-a.$wrapper.width(),a.$wrapper.innerHeight()-a.$wrapper.height()];b.playRtl&&a.$wrapper.addClass("rtl");if(b.expand)a.$outer=a.$wrapper.parent(),a.$window.css({width:"100%",height:"100%"}), a.checkResize();b.buildStartStop&&a.buildAutoPlay();b.buildArrows&&a.buildNextBackButtons();if(!b.autoPlay)b.autoPlayLocked=!1;a.updateSlider();a.$lastPage=a.$currentPage;a.runTimes=d("div.anythingSlider").index(a.$wrapper)+1;a.regex=RegExp("panel"+a.runTimes+"-(\\d+)","i");1===a.runTimes&&a.makeActive();if(!d.isFunction(d.easing[b.easing]))b.easing="swing";b.pauseOnHover&&a.$wrapper.hover(function(){a.playing&&(a.$el.trigger("slideshow_paused",a),a.clearTimer(!0))},function(){a.playing&&(a.$el.trigger("slideshow_unpaused", a),a.startStop(a.playing,!0))});a.setCurrentPage(a.gotoHash()||b.startPage,!1);a.slideControls(!1);a.$wrapper.bind("mouseenter mouseleave",function(b){a.hovered="mouseenter"===b.type?!0:!1;a.slideControls(a.hovered,!1)});d(document).keyup(function(c){if(b.enableKeyboard&&a.$wrapper.is(".activeSlider")&&!c.target.tagName.match("TEXTAREA|INPUT|SELECT")&&(b.vertical||!(38===c.which||40===c.which)))switch(c.which){case 39:case 40:a.goForward();break;case 37:case 38:a.goBack()}});a.$items.delegate("a", "focus.AnythingSlider",function(c){var e=d(this).closest(".panel"),e=a.$items.index(e)+a.adj;a.$items.find(".focusedLink").removeClass("focusedLink");d(this).addClass("focusedLink");a.$window.scrollLeft(0);if(-1!==e&&(e>=a.currentPage+b.showMultiple||e<a.currentPage))a.gotoPage(e),c.preventDefault()});var c="slideshow_paused slideshow_unpaused slide_init slide_begin slideshow_stop slideshow_start initialized swf_completed".split(" ");d.each("onShowPause onShowUnpause onSlideInit onSlideBegin onShowStop onShowStart onInitialized onSWFComplete".split(" "), function(f,e){d.isFunction(b[e])&&a.$el.bind(c[f],b[e])});d.isFunction(b.onSlideComplete)&&a.$el.bind("slide_complete",function(){setTimeout(function(){b.onSlideComplete(a)},0)});a.initialized=!0;a.$el.trigger("initialized",a);a.startStop(a.playing)};a.updateSlider=function(){a.$el.children(".cloned").remove();a.$nav.empty();a.currentPage=a.currentPage||1;a.$items=a.$el.children();a.pages=a.$items.length;a.dir=b.vertical?"top":"left";b.showMultiple=b.vertical?1:parseInt(b.showMultiple,10)||1;b.navigationSize= !1===b.navigationSize?0:parseInt(b.navigationSize,10)||0;if(1<b.showMultiple){if(b.showMultiple>a.pages)b.showMultiple=a.pages;a.adjustMultiple=b.infiniteSlides&&1<a.pages?0:b.showMultiple-1;a.pages=a.$items.length-a.adjustMultiple}a.$controls.add(a.$nav).add(a.$startStop).add(a.$forward).add(a.$back)[1>=a.pages?"hide":"show"]();1<a.pages&&a.buildNavigation();b.infiniteSlides&&1<a.pages&&(a.$el.prepend(a.$items.filter(":last").clone().removeAttr("id").addClass("cloned")),1<b.showMultiple?a.$el.append(a.$items.filter(":lt("+ b.showMultiple+")").clone().removeAttr("id").addClass("cloned").addClass("multiple")):a.$el.append(a.$items.filter(":first").clone().removeAttr("id").addClass("cloned")),a.$el.find(".cloned").each(function(){d(this).find("a,input,textarea,select,button,area").attr("disabled","disabled");d(this).find("[id]").removeAttr("id")}));a.$items=a.$el.children().addClass("panel"+(b.vertical?" vertical":""));a.setDimensions();b.resizeContents?(a.$items.css("width",a.width),a.$wrapper.css("width",a.getDim(a.currentPage)[0]), a.$wrapper.add(a.$items).css("height",a.height)):a.$win.load(function(){a.setDimensions()});if(a.currentPage>a.pages)a.currentPage=a.pages;a.setCurrentPage(a.currentPage,!1);a.$nav.find("a").eq(a.currentPage-1).addClass("cur")};a.buildNavigation=function(){if(b.buildNavigation&&1<a.pages){var c,f;a.$items.filter(":not(.cloned)").each(function(e){var g=e+1;c=(1===g?"first":"")+(g===a.pages?"last":"");f=d('<a href="#"></a>').addClass("panel"+g).wrap('<li class="'+c+'" />');a.$nav.append(f.parent()); d.isFunction(b.navigationFormatter)?(c=b.navigationFormatter(g,d(this)),f.html("<span>"+c+"</span>"),0>parseInt(f.find("span").css("text-indent"),10)&&f.addClass(b.tooltipClass).attr("title",c)):f.html("<span>"+g+"</span>");f.bind(b.clickControls,function(c){if(!a.flag&&b.enableNavigation)a.flag=!0,setTimeout(function(){a.flag=!1},100),a.gotoPage(g),b.hashTags&&a.setHash(g);c.preventDefault()})});if(b.navigationSize&&b.navigationSize<a.pages)a.$controls.find(".anythingNavWindow").length||a.$nav.before('<ul><li class="prev"><a href="#"><span>'+ b.backText+"</span></a></li></ul>").after('<ul><li class="next"><a href="#"><span>'+b.forwardText+"</span></a></li></ul>").wrap('<div class="anythingNavWindow"></div>'),a.navWidths=a.$nav.find("li").map(function(){return d(this).innerWidth()+Math.ceil(parseInt(d(this).find("span").css("left"),10)/2||0)}).get(),a.navLeft=1,a.$nav.width(a.navWidth(1,a.pages+1)+5),a.$controls.find(".anythingNavWindow").width(a.navWidth(1,b.navigationSize+1)).end().find(".prev,.next").bind(b.clickControls,function(c){if(!a.flag)a.flag= !0,setTimeout(function(){a.flag=!1},200),a.navWindow(a.navLeft+b.navigationSize*(d(this).is(".prev")?-1:1));c.preventDefault()})}};a.navWidth=function(b,f){var d;d=Math.min(b,f);for(var g=Math.max(b,f),j=0;d<g;d++)j+=a.navWidths[d-1]||0;return j};a.navWindow=function(c){if(b.navigationSize&&b.navigationSize<a.pages&&a.navWidths){var d=a.pages-b.navigationSize+1,c=1>=c?1:1<c&&c<d?c:d;if(c!==a.navLeft)a.$controls.find(".anythingNavWindow").animate({scrollLeft:a.navWidth(1,c),width:a.navWidth(c,c+b.navigationSize)}, {queue:!1,duration:b.animationTime}),a.navLeft=c}};a.buildNextBackButtons=function(){a.$forward=d('<span class="arrow forward"><a href="#"><span>'+b.forwardText+"</span></a></span>");a.$back=d('<span class="arrow back"><a href="#"><span>'+b.backText+"</span></a></span>");a.$back.bind(b.clickBackArrow,function(c){if(b.enableArrows&&!a.flag)a.flag=!0,setTimeout(function(){a.flag=!1},100),a.goBack();c.preventDefault()});a.$forward.bind(b.clickForwardArrow,function(c){if(b.enableArrows&&!a.flag)a.flag= !0,setTimeout(function(){a.flag=!1},100),a.goForward();c.preventDefault()});a.$back.add(a.$forward).find("a").bind("focusin focusout",function(){d(this).toggleClass("hover")});a.$back.appendTo(null!==b.appendBackTo&&d(b.appendBackTo).length?d(b.appendBackTo):a.$wrapper);a.$forward.appendTo(null!==b.appendForwardTo&&d(b.appendForwardTo).length?d(b.appendForwardTo):a.$wrapper);a.$arrowWidth=a.$forward.width()};a.buildAutoPlay=function(){a.$startStop.html("<span>"+(a.playing?b.stopText:b.startText)+ "</span>").bind(b.clickSlideshow,function(c){b.enableStartStop&&(a.startStop(!a.playing),a.makeActive(),a.playing&&!b.autoPlayDelayed&&a.goForward(!0));c.preventDefault()}).bind("focusin focusout",function(){d(this).toggleClass("hover")})};a.checkResize=function(c){clearTimeout(a.resizeTimer);a.resizeTimer=setTimeout(function(){var d=a.$outer.width()-a.outerPad[0],e=("BODY"===a.$outer[0].tagName?a.$win.height():a.$outer.height())-a.outerPad[1];if(a.width*b.showMultiple!==d||a.height!==e)a.setDimensions(), a.gotoPage(a.currentPage,a.playing,null,-1);"undefined"===typeof c&&a.checkResize()},500)};a.setDimensions=function(){var c,f,e,g=0,j={width:"100%",height:"100%"},h=1<b.showMultiple?a.width||a.$window.width()/b.showMultiple:a.$window.width(),i=a.$win.width();if(b.expand)c=a.$outer.width()-a.outerPad[0],a.height=f=a.$outer.height()-a.outerPad[1],a.$wrapper.add(a.$window).add(a.$items).css({width:c,height:f}),a.width=h=1<b.showMultiple?c/b.showMultiple:c;a.$items.each(function(k){e=d(this).children(); if(b.resizeContents)c=a.width,f=a.height,d(this).css({width:c,height:f}),e.length&&("EMBED"===e[0].tagName&&e.attr(j),"OBJECT"===e[0].tagName&&e.find("embed").attr(j),1===e.length&&e.css(j));else{c=d(this).width()||a.width;1===e.length&&c>=i&&(c=e.width()>=i?h:e.width(),e.css("max-width",c));d(this).css("width",c);f=1===e.length?e.outerHeight(!0):d(this).height();if(f<=a.outerPad[1])f=a.height;d(this).css("height",f)}a.panelSize[k]=[c,f,g];g+=b.vertical?f:c});a.$el.css(b.vertical?"height":"width", g)};a.getDim=function(c){if(1>a.pages||isNaN(c))return[a.width,a.height];var c=b.infiniteSlides&&1<a.pages?c:c-1,d,e=a.panelSize[c][0],g=a.panelSize[c][1];if(1<b.showMultiple)for(d=1;d<b.showMultiple;d++)e+=a.panelSize[(c+d)%b.showMultiple][0],g=Math.max(g,a.panelSize[c+d][1]);return[e,g]};a.goForward=function(c){a.gotoPage(a.currentPage+b.changeBy*(b.playRtl?-1:1),c)};a.goBack=function(c){a.gotoPage(a.currentPage+b.changeBy*(b.playRtl?1:-1),c)};a.gotoPage=function(c,f,e,g){!0!==f&&(f=!1,a.startStop(!1), a.makeActive());/^[#|.]/.test(c)&&d(c).length&&(c=d(c).closest(".panel").index()+a.adj);1!==b.changeBy&&(0>c&&(c+=a.pages),c>a.pages&&(c-=a.pages));if(!(1>=a.pages)){a.$lastPage=a.$currentPage;if("number"!==typeof c)c=b.startPanel,a.setCurrentPage(c);if(!f||!b.isVideoPlaying(a))c>a.pages+1-a.adj&&(c=!b.infiniteSlides&&!b.stopAtEnd?1:a.pages),c<a.adj&&(c=!b.infiniteSlides&&!b.stopAtEnd?a.pages:1),a.currentPage=c>a.pages?a.pages:1>c?1:a.currentPage,a.$currentPage=a.$items.eq(a.currentPage-a.adj),a.exactPage= c,a.targetPage=0===c?a.pages-a.adj:c>a.pages?1-a.adj:c-a.adj,a.$targetPage=a.$items.eq(a.targetPage),g=g||b.animationTime,0<=g&&a.$el.trigger("slide_init",a),a.slideControls(!0,!1),!0!==f&&(f=!1),(!f||b.stopAtEnd&&c===a.pages)&&a.startStop(!1),0<=g&&a.$el.trigger("slide_begin",a),setTimeout(function(d){b.resizeContents||(d=a.getDim(c),a.$wrapper.filter(":not(:animated)").animate({width:d[0]||a.width,height:d[1]||a.height},{queue:!1,duration:0>g?0:g,easing:b.easing}));d={};d[a.dir]=-a.panelSize[b.infiniteSlides&& 1<a.pages?c:c-1][2];a.$el.filter(":not(:animated)").animate(d,{queue:!1,duration:g,easing:b.easing,complete:function(){a.endAnimation(c,e,g)}})},parseInt(b.delayBeforeAnimate,10)||0)}};a.endAnimation=function(c,d,e){0===c?(a.$el.css(a.dir,-a.panelSize[a.pages][2]),c=a.pages):c>a.pages&&(a.$el.css(a.dir,-a.panelSize[1][2]),c=1);a.exactPage=c;a.setCurrentPage(c,!1);a.$items.removeClass("activePage").eq(c-a.adj).addClass("activePage");a.hovered||a.slideControls(!1);0<=e&&a.$el.trigger("slide_complete", a);"function"===typeof d&&d(a);b.autoPlayLocked&&!a.playing&&setTimeout(function(){a.startStop(!0)},b.resumeDelay-(b.autoPlayDelayed?b.delay:0))};a.setCurrentPage=function(c,d){c=parseInt(c,10);if(!(1>a.pages||0===c||isNaN(c))){c>a.pages+1-a.adj&&(c=a.pages-a.adj);c<a.adj&&(c=1);b.buildNavigation&&a.$nav.find(".cur").removeClass("cur").end().find("a").eq(c-1).addClass("cur");!b.infiniteSlides&&b.stopAtEnd&&(a.$wrapper.find("span.forward")[c===a.pages?"addClass":"removeClass"]("disabled").end().find("span.back")[1=== c?"addClass":"removeClass"]("disabled"),c===a.pages&&a.playing&&a.startStop());if(!d){var e=a.getDim(c);a.$wrapper.css({width:e[0],height:e[1]}).add(a.$window).scrollLeft(0);a.$el.css(a.dir,-a.panelSize[b.infiniteSlides&&1<a.pages?c:c-1][2])}a.currentPage=c;a.$currentPage=a.$items.removeClass("activePage").eq(c-a.adj).addClass("activePage")}};a.makeActive=function(){a.$wrapper.is(".activeSlider")||(d(".activeSlider").removeClass("activeSlider"),a.$wrapper.addClass("activeSlider"))};a.gotoHash=function(){var c= a.win.location.hash,f=c.indexOf("&"),e=c.match(a.regex);null===e&&!/^#&/.test(c)&&!/#!?\//.test(c)?(c=c.substring(0,0<=f?f:c.length),e=d(c).length&&d(c).closest(".anythingBase")[0]===a.el?d(c).closest(".panel").index():null):null!==e&&(e=b.hashTags?parseInt(e[1],10):null);return e};a.setHash=function(b){var d="panel"+a.runTimes+"-",e=a.win.location.hash;if("undefined"!==typeof e)a.win.location.hash=0<e.indexOf(d)?e.replace(a.regex,d+b):e+"&"+d+b};a.slideControls=function(c){var d=c?0:b.animationTime, e=c?b.animationTime:0,g=c?1:0,h=c?0:1;b.toggleControls&&a.$controls.stop(!0,!0).delay(d)[c?"slideDown":"slideUp"](b.animationTime/2).delay(e);b.buildArrows&&b.toggleArrows&&(!a.hovered&&a.playing&&(h=1,g=0),a.$forward.stop(!0,!0).delay(d).animate({right:h*a.$arrowWidth,opacity:g},b.animationTime/2),a.$back.stop(!0,!0).delay(d).animate({left:h*a.$arrowWidth,opacity:g},b.animationTime/2))};a.clearTimer=function(b){if(a.timer&&(a.win.clearInterval(a.timer),!b&&a.slideshow))a.$el.trigger("slideshow_stop", a),a.slideshow=!1};a.startStop=function(c,d){!0!==c&&(c=!1);if((a.playing=c)&&!d)a.$el.trigger("slideshow_start",a),a.slideshow=!0;b.buildStartStop&&(a.$startStop.toggleClass("playing",c).find("span").html(c?b.stopText:b.startText),0>parseInt(a.$startStop.find("span").css("text-indent"),10)&&a.$startStop.addClass(b.tooltipClass).attr("title",c?b.stopText:b.startText));c?(a.clearTimer(!0),a.timer=a.win.setInterval(function(){b.isVideoPlaying(a)?b.resumeOnVideoEnd||a.startStop():a.goForward(!0)},b.delay)): a.clearTimer()};a.init()};d.anythingSlider.defaults={theme:"default",expand:!1,resizeContents:!0,vertical:!1,showMultiple:!1,easing:"swing",buildArrows:!0,buildNavigation:!0,buildStartStop:!0,appendForwardTo:null,appendBackTo:null,appendControlsTo:null,appendNavigationTo:null,appendStartStopTo:null,toggleArrows:!1,toggleControls:!1,startText:"Start",stopText:"Stop",forwardText:"&raquo;",backText:"&laquo;",tooltipClass:"tooltip",enableArrows:!0,enableNavigation:!0,enableStartStop:!0,enableKeyboard:!0, startPanel:1,changeBy:1,hashTags:!0,infiniteSlides:!0,navigationFormatter:null,navigationSize:!1,autoPlay:!1,autoPlayLocked:!1,autoPlayDelayed:!1,pauseOnHover:!0,stopAtEnd:!1,playRtl:!1,delay:3E3,resumeDelay:15E3,animationTime:600,delayBeforeAnimate:0,clickForwardArrow:"click",clickBackArrow:"click",clickControls:"click focusin",clickSlideshow:"click",resumeOnVideoEnd:!0,resumeOnVisible:!0,addWmodeToObject:"opaque",isVideoPlaying:function(){return!1}};d.fn.anythingSlider=function(h,i){return this.each(function(){var a, b=d(this).data("AnythingSlider");(typeof h).match("object|undefined")?b?b.updateSlider():new d.anythingSlider(this,h):/\d/.test(h)&&!isNaN(h)&&b?(a="number"===typeof h?h:parseInt(d.trim(h),10),1<=a&&a<=b.pages&&b.gotoPage(a,!1,i)):/^[#|.]/.test(h)&&d(h).length&&b.gotoPage(h,!1,i)})}})(jQuery);

