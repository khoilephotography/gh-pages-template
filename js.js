
var langCookie;

if (typeof(localStorage) != 'undefined') {
  langCookie = localStorage.getItem('lang');
} else {
  langCookie = $.cookie('lang');
}

$(function(){
	var $window = $(window);
	var $body = $('body');

  //$window.load(function(){
    $('.l-root_index').css({visibility: 'visible'});
  //});

	function download(){
		var v = '3.0.6';
		var container = $('.b-download-button');
		if (container.attr('data-v')) v = container.attr('data-v');
		var vSpan = $('.v', container);
		vSpan.text(v);
		var button = $('input', container);
		/*var checkbox = $('.js-license-checkbox');

		checkbox.bind('click change', function() {
			var empty = false;
			for (var _i = 0; _i < checkbox.size(); _i++) {
				if (!checkbox.eq(_i).is(":checked")) {
					empty = true
				}
			}

			if (empty) {
				button.attr('disabled', 'disabled');
			} else {
				button.removeAttr('disabled');
			}
		});*/

		button
			.removeAttr('disabled')
			.click(function(e){
				if (!button.attr('disabled')) {
					button.attr('disabled', 'disabled');
					setTimeout(function(){
						if (!e.shiftKey && !e.altKey) {
							$('<iframe width="1" height="1" src="/download/count.php?' + v +'" frameborder="0"></iframe>')
								.css({
									'position': 'absolute',
									'z-index': -1,
									'left': '-999px',
									'top': '-999px'
								})
								.load(function(){
									document.location='/fotorama/fotorama-'+v+'.zip';
									button.removeAttr('disabled');
								})
								.appendTo('body');
						} else {
							document.location='/fotorama/fotorama-'+v+'.zip';
							button.removeAttr('disabled');
						}
					},1);
				}
			});
	}

	download();

	function userSelectNone(target){
		target
				.css({'-webkit-user-select': 'none',
					'-moz-user-select': 'none',
					'-o-user-select': 'none',
					'-ms-user-select': 'none',
					'user-select': 'none'})
				.mousemove(function(e){
					e.preventDefault();
				})
				.mousedown(function(e){
					e.preventDefault();
				});
	}

	function logo() {
		var logo = $('.b-logo');
    var _logoStep = Number($.cookie('logoStep'));
		var logoStep = isNaN(_logoStep) ? 3 : _logoStep;
		var size = 4;

		function changeStep(e) {
      $.cookie('logoStep', logoStep, {expires: 366, domain: document.location.host, path: '/'});

			if (e.altKey) {
				logo.addClass('b-logo_slow-down');
			} else {
				logo.removeClass('b-logo_slow-down');
			}

			setTimeout(function() {
				logo.removeClass('b-logo_1 b-logo_2 b-logo_3 b-logo_4').addClass('b-logo_' + logoStep);
			}, 1);
		}

		$('.ramka', logo).mouseenter(function (e) {
				if (e.shiftKey) {
					logoStep++;

					if (logoStep > size) logoStep = 1;
					if (logoStep < 1) logoStep = size;

					changeStep(e);
				}
		});

		var i = $('i', logo);

		i.click(function (e) {
			var index = Number($(this).attr('class').replace('i-', ''));
			if (index) {
				logoStep = index;
				changeStep(e);
			}
		});

		userSelectNone(logo);
	}

	//if (!('ontouchstart' in document)) {
		logo();
	//}

	function logo404() {
		var logo = $('.b-logo_404');
		if (logo.length) {
			var logoStep = 3;
			var size = 4;

			setInterval(function() {
				logoStep++;
				if (logoStep > size) logoStep = 1;
				if (logoStep < 1) logoStep = size;

				setTimeout(function() {
					logo.removeClass('b-logo_1 b-logo_2 b-logo_3 b-logo_4').addClass('b-logo_' + logoStep);
				}, 1);
			}, 999);
		}

		userSelectNone(logo);
	}

	logo404();

//	var $sidebar = $('#sidebar');

//	function sidebar() {
//		var sidebarClone = $sidebar.clone().attr('id', '').html('').insertBefore($sidebar);
//		//var sidebarTop = $sidebar.position().top;
//
//		function stickIt () {
//			var scrollTop = $window.scrollTop();
//			//var scrollLeft = Math.max($window.scrollLeft(), 0);
//
//			////console.log(scrollLeft);
//
//			if (scrollTop - sidebarClone.offset().top >= -10) {
//				$sidebar.css({top: 10, left: sidebarClone.offset().left, position: 'fixed'});
//			} else {
//				$sidebar.attr({'style': ''});
//			}
//		}
//		$window.bind('scroll resize load', stickIt);
//	}


	//if (!('ontouchstart' in document) && !($.browser.msie && $.browser.version == 6.0) && ($sidebar.height() < $window.height()) && $sidebar.size()) {
		//sidebar();
	//}

	/*var textarea = $('textarea');

	if ('ontouchstart' in document) {
		$('textarea').attr('disabled', 'disabled').css({color: 'white'});
	} else {
		textarea.each(function(){
			var $this = $(this);
			var html = $this.val();
			$this.bind('keypress keydown keyup paste change input click', function(e){
				if (e.type != 'click')
					$this.val(html);
				else
					e.stopPropagation();
			});
		});
	}*/

	function LanguageInfo(){
	    var n = navigator;
	    this.UALanguage = n.language ? n.language : n.browserLanguage ? n.browserLanguage : null;
	    this.userLanguage = n.userLanguage ? n.userLanguage : n.systemLanguage ? systemLanguage : null;
	}

	function translate() {
		var switcher = $('a', $('#lang'));
		var title = $('title');
		title.data({en: title.text(), ru: $('#ru').text()});

		function setLang(lang) {
			$body[0].className = lang;
			document.title = title.data(lang);

			if (typeof(localStorage) != 'undefined') {
				localStorage.setItem('lang', lang);
			}

      $.cookie('lang', lang, {expires: 366, domain: document.location.host, path: '/'});
		}

		switcher.bind('click', function(e){
			e.preventDefault();
			var lang = $(this).attr('class');
			setLang(lang);
		});

		if (!langCookie) {
			var oLanguage = new LanguageInfo();
			langCookie = (oLanguage.userLanguage == 'ru' || oLanguage.UALanguage == 'ru') ? 'ru' : 'en';
		}

		setLang(langCookie);
	}

	translate();

	/*$('.anchor').bind('click', function(e){
		e.preventDefault();
		var $this = $(this);
		//var scrollTop = $window.scrollTop();
		var hash = document.location.hash.replace('#', '');
		var href = $this.attr('href');
		if (!href) {
			href = $this.attr('id');
		} else {
			href.replace('#', '');
		}


		if (hash != href || $this.is('A')) {
			document.location.hash = href;
			//$this.addClass('target').removeClass('anchor_unset');
		} else {
			//document.location.hash = '';
			//$this.addClass('anchor_unset').removeClass('target');
		}
		//setTimeout(function(){
			//$window.scrollTop(scrollTop);
		//}, 0);
	});*/


  function makeTabs() {
    var blocksContainer = $('#features');
    var blocks = $('.floor', blocksContainer);
    var tabsEn = $('.b-switch', '#features-switches-en');
    var tabsRu = $('.b-switch', '#features-switches-ru');
    var time = 0;

    tabsRu.bind('click', function(e, stop){
      if (!stop) {
        //console.log('tabsRu', 'click');
        tabsEn.eq(tabsRu.index(this)).click();
      }
    });

    tabsEn.bind('click', function(){
      //console.log('tabsEn', 'click');

      var thisTab = $(this);
      var thisIndex = tabsEn.index(thisTab);

      tabsEn
  			  .not(tabsEn.filter(':eq('+ thisIndex+')').addClass('b-switch_selected'))
  			  .removeClass('b-switch_selected');

      tabsRu
        .not(tabsRu.filter(':eq('+ thisIndex+')').addClass('b-switch_selected').trigger('click', true))
        .removeClass('b-switch_selected');


      blocks.each(function(){
        var otherBlock = $(this);
        var otherIndex = blocks.index(otherBlock);
        otherBlock.animate({
          left: (otherIndex - thisIndex) * 50,
          opacity: otherIndex == thisIndex? 1 : 0
        }, time).css({zIndex: otherIndex == thisIndex? 1 : 0});
      });

      blocksContainer.animate({paddingBottom: blocks.eq(thisIndex).height()}, time);
      time = 333;
    });

    tabsEn.eq(0).click();
  }

  makeTabs();


  function sayHi() {
    var link = $('#say-hi-link').fadeTo(0, 0);
    var hi = $('#say-hi');

    var hiHeight = 16;

    if (link.size() && hi.size()) {
      var reflowTimeout;

      function onReflow() {
        clearTimeout(reflowTimeout);
        reflowTimeout = setTimeout(function(){
          var windowHeight = $window.height();
          var scrollTop = $window.scrollTop();
          var hiTop = hi.offset().top;

          if (hiTop + hiHeight < windowHeight + scrollTop) {
            link.stop().fadeTo(333, 0);
          } else {
            link.stop().fadeTo(333, 1);
          }
        }, 500);
      }

      $window.on('load scroll resize', function(){
        onReflow();
      });

      onReflow();
    }
  }

  sayHi();
});
