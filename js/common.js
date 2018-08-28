// "use strict";

// ! function() {
//     String.prototype.toSVG = function(t) {
//         var e = function(t, e) {
//                 if ("object" != typeof e) return !1;
//                 for (var r in t) {
//                     if (e.hasOwnProperty(r)) break;
//                     e[r] = t[r]
//                 }
//                 return e
//             }({ svgClass: "replaced-svg", onComplete: function() {} }, t),
//             r = function(t, e) {
//                 var r = new XMLHttpRequest;
//                 r.open("GET", t, !0), r.send(), r.onreadystatechange = function() { 4 == r.readyState && (200 != r.status ? console.log(r.status + ": " + r.statusText) : e.call(this, r.responseText)) }
//             };
//         Array.prototype.forEach.call(document.querySelectorAll(this), function(t) {
//             var i = t,
//                 n = i.getAttribute("id"),
//                 o = i.getAttribute("class"),
//                 s = i.getAttribute("src");
//             /\.(svg)$/i.test(s) ? r(s, function(t) {
//                 var r = document.createElement("html");
//                 r.innerHTML = "<body>" + t + "</body>";
//                 var s = r.getElementsByTagName("svg")[0];
//                 void 0 != n && null != n && s.setAttribute("id", n), void 0 !== o && s.setAttribute("class", o + " " + e.svgClass), s.removeAttribute("xmlns:a"), !s.getAttribute("viewBox") && s.getAttribute("height") && s.getAttribute("width") && s.getAttribute("viewBox", "0 0 " + s.getAttribute("height") + " " + s.getAttribute("width")), i.parentNode.replaceChild(s, i), "function" == typeof e.onComplete && e.onComplete.call(this, s)
//             }) : console.warn("image src='" + s + "' is not a SVG, item remained tag <img/> ")
//         })
//     }
// }();
// ".svg".toSVG({
//     svgClass: "replaced",
//     onComplete: function() {}
// });

$(document).ready(function () {
  var w = screen.width;
  var h = screen.height;
  var bw = window.innerWidth;
  var bh = window.innerHeight;

  //E-mail Ajax Send
  $("form").each(function () {
    var it = $(this);
    it.validate({
      rules: {
        phone: {
          required: true
        }
      },
      messages: {},
      errorPlacement: function (error, element) {
      },
      submitHandler: function (form) {
        var thisForm = $(form);
        $.ajax({
          type: "POST",
          url: thisForm.attr("action"),
          data: thisForm.serialize()
        }).done(function () {
          $.fancybox.close();
          $.fancybox({
            href: '#myThanks',
            wrapCSS: 'owrap',
            openEffect: "elastic",
            openMethod: "zoomIn",
            closeEffect: "elastic",
            closeMethod: "zoomOut",
          });
          setTimeout(function () {
            $.fancybox.close();
          }, 3000);
          it.trigger("reset");
        });
        return false;
      },
      success: function () {
      },
      highlight: function (element, errorClass) {
        $(element).addClass('error');
      },
      unhighlight: function (element, errorClass, validClass) {
        $(element).removeClass('error');
      }
    })
  });

  //  scroll with offset
  $(".nav_list").on("click", "a", function (event) {
    event.preventDefault();
    var id = $(this).attr('href');
    // screen width
    if (w < 768) {
      $(id).attr('data-top', 90);
    }
    var topOffset = $(id).attr("data-top");
    var top = $(id).offset().top,
      finalTop = top - topOffset;
    $('body,html').animate({scrollTop: finalTop}, 700);

  });

  if (w < 992) {
    $(".nav_list li a").click(function () {
      $(".hidden_trigger").removeClass('open_menu');
      $(".nav_list").slideUp();
    });
  }

  // top menu
  if (w > 768) {
    $(window).scroll(function () {
      var top = $(document).scrollTop();
      if (top < 700) $(".top_line").removeClass("more");
      else $(".top_line").addClass("more");
    });
  }

  // menu-btn
  $(".hidden_trigger").click(function () {
    $(".nav_list").slideToggle();
    $(this).toggleClass('open_menu');
  });

  //masked
  // $('input[type=tel]').mask("+99(999) 999-99-99");

  $(".fancybox").fancybox();

  // slick
  $('.scr1_slider').slick({
    infinite: true,
    slidesToShow: 1,
    arrows: false,
    dots: true,
    autoplay: false,
    slidesToScroll: 1,
    fade: true,
    cssEase: 'linear'
  });
  $('.comments_slider').slick({
    infinite: true,
    slidesToShow: 1,
    arrows: true,
    dots: true,
    adaptiveHeight: true,
    autoplay: false,
    slidesToScroll: 1
  });


  $('.mg_top_slider').each(function (key, item) {
    var sliderIdName = 'slider' + key;
    var sliderNavIdName = 'sliderNav' + key;
    this.id = sliderIdName;
    $('.mg_bottom_slider')[key].id = sliderNavIdName;
    var sliderId = '#' + sliderIdName;
    var sliderNavId = '#' + sliderNavIdName;
    $(sliderId).slick({
      infinite: true,
      slidesToShow: 1,
      arrows: false,
      dots: false,
      autoplay: false,
      slidesToScroll: 1,
      asNavFor: sliderNavId,
      fade: true,
      cssEase: 'linear',
      responsive: [{
        breakpoint: 992,
        settings: {
          arrows: true
        }
      }]
    });
    $(sliderNavId).slick({
      infinite: true,
      slidesToShow: 3,
      arrows: true,
      dots: false,
      autoplay: false,
      focusOnSelect: true,
      asNavFor: sliderId,
      slidesToScroll: 1
    });
  });


  $(".main_galery_slider").slick({
    infinite: true,
    slidesToShow: 1,
    arrows: false,
    dots: true,
    autoplay: false,
    swipe: false,
    touch: false,
    slidesToScroll: 1,
    fade: true,
    cssEase: 'linear',
    customPaging: function (slider, i) {
      var thumb = $(slider.$slides[i]).data();
      return "<span>" + (i + 1) + "</span>";
    }
  });


  //map
  var target = document.head;
  var observer = new MutationObserver(function (mutations) {
    for (var i = 0; mutations[i]; ++i) {
      if (mutations[i].addedNodes[0].nodeName == "SCRIPT" && mutations[i].addedNodes[0].src.match(/\/AuthenticationService.Authenticate?/g)) {
        var str = mutations[i].addedNodes[0].src.match(/[?&]callback=.*[&$]/g);
        if (str) {
          if (str[0][str[0].length - 1] == '&') {
            str = str[0].substring(10, str[0].length - 1);
          } else {
            str = str[0].substring(10);
          }
          var split = str.split(".");
          var object = split[0];
          var method = split[1];
          window[object][method] = null; // remove censorship message function _xdc_._jmzdv6 (AJAX callback name "_jmzdv6" differs depending on URL)
          //window[object] = {}; // when we removed the complete object xdc, Google Maps tiles did not load when we moved the map with the mouse (no problem with OpenStreetMap)
        }
        observer.disconnect();
      }
    }
  });
  var config = {
    attributes: true,
    childList: true,
    characterData: true
  }
  observer.observe(target, config);


  // map
  var thisMapLatitude = $("#map").data('latitude'),
    thisMapLongtitude = $("#map").data('longitude');
  // console.log(thisMapLatitude);
  // console.log(thisMapLongtitude);

  google.maps.event.addDomListener(window, 'load', init);
  var map;

  function init() {
    var mapOptions = {
      center: new google.maps.LatLng(thisMapLatitude, thisMapLongtitude),
      zoom: 14,
      zoomControl: false,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.DEFAULT,
      },
      disableDoubleClickZoom: true,
      mapTypeControl: false,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      },
      scaleControl: false,
      scrollwheel: false,
      panControl: false,
      streetViewControl: true,
      draggable: true,
      overviewMapControl: true,
      overviewMapControlOptions: {
        opened: false,
      },
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [{
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{
          "color": "#e9e9e9"
        }, {
          "lightness": 17
        }]
      }, {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [{
          "color": "#f5f5f5"
        }, {
          "lightness": 20
        }]
      }, {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#ffffff"
        }, {
          "lightness": 17
        }]
      }, {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#ffffff"
        }, {
          "lightness": 29
        }, {
          "weight": 0.2
        }]
      }, {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [{
          "color": "#ffffff"
        }, {
          "lightness": 18
        }]
      }, {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [{
          "color": "#ffffff"
        }, {
          "lightness": 16
        }]
      }, {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{
          "color": "#f5f5f5"
        }, {
          "lightness": 21
        }]
      }, {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [{
          "color": "#dedede"
        }, {
          "lightness": 21
        }]
      }, {
        "elementType": "labels.text.stroke",
        "stylers": [{
          "visibility": "on"
        }, {
          "color": "#ffffff"
        }, {
          "lightness": 16
        }]
      }, {
        "elementType": "labels.text.fill",
        "stylers": [{
          "saturation": 36
        }, {
          "color": "#333333"
        }, {
          "lightness": 40
        }]
      }, {
        "elementType": "labels.icon",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [{
          "color": "#f2f2f2"
        }, {
          "lightness": 19
        }]
      }, {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#fefefe"
        }, {
          "lightness": 20
        }]
      }, {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#fefefe"
        }, {
          "lightness": 17
        }, {
          "weight": 1.2
        }]
      }],
    }
    var mapElement = document.getElementById('map');
    var map = new google.maps.Map(mapElement, mapOptions);
    var locations = [
      ['г. Москва, Графский переулок,  дом 14, корпус 2', 'undefined', 'undefined', 'undefined', 'undefined', thisMapLatitude, thisMapLongtitude, 'undefined']
    ];
    for (i = 0; i < locations.length; i++) {
      if (locations[i][1] == 'undefined') {
        description = '';
      } else {
        description = locations[i][1];
      }
      if (locations[i][2] == 'undefined') {
        telephone = '';
      } else {
        telephone = locations[i][2];
      }
      if (locations[i][3] == 'undefined') {
        email = '';
      } else {
        email = locations[i][3];
      }
      if (locations[i][4] == 'undefined') {
        web = '';
      } else {
        web = locations[i][4];
      }
      if (locations[i][7] == 'undefined') {
        markericon = '';
      } else {
        markericon = locations[i][7];
      }
      marker = new google.maps.Marker({
        icon: markericon,
        position: new google.maps.LatLng(locations[i][5], locations[i][6]),
        map: map,
        title: locations[i][0],
        desc: description,
        tel: telephone,
        email: email,
        web: web
      });
      link = '';
    }
  }

  $(".scr3_block").on('click', '.buy_btn', function (event) {
    var thisHash = $(this).attr('href');
    var thistem = $(this).attr('data-item');
    $(thisHash).find('.hidden_field > input[type=hidden]').remove();
    $(thisHash).find('.hidden_field').append(
      $('<input>', {
        type: 'hidden',
        value: thistem,
        name: "Название ремонта"
      })
    );
    $.fancybox.close();
    $.fancybox({
      href: thisHash,
      wrapCSS: 'owrap'
    });
    event.preventDefault();
  });

  setYandexGoals();
});

// Yandex goals
function setYandexGoals() {
  setGoal('#myModal', function () {
    yaCounter50050540.reachGoal('Ring');
  });
  setGoal('#myModalOrder', function () {
    yaCounter50050540.reachGoal('Order');
  });
  setGoal('#myModalMaster', function () {
    yaCounter50050540.reachGoal('Master');
  });
  setGoal('#myModalCalc', function () {
    yaCounter50050540.reachGoal('Calc');
  });
  setGoal('#myModalSmeth', function () {
    yaCounter50050540.reachGoal('Smeth');
  });

  function setGoal(selector, goalFunc) {
    var name = document.querySelector(selector + ' > form > p:nth-child(4) > input');
    var phone = document.querySelector(selector + ' > form > p:nth-child(5) > input');
    var btn = document.querySelector(selector + ' form button');

    btn.addEventListener('click', function () {
      if (name.value != '' && phone.value != '') {
        goalFunc();
      }
    });

  }
}

// $(window).on('resize', function() {
//     var w = screen.width;
// var h = screen.height;
// var bw = window.innerWidth;
// var bh = window.innerHeight;
//     var btnLen = $(".search_checkboxes").find('.red_btn').length;
//     if ($(".search_form_selects").length > 0) {
//         if (w < 601) {
//             if (btnLen < 1) {
//                 $(".search_form_selects").find('.red_btn').detach().appendTo(".search_checkboxes");
//             }
//         } else if (w > 600) {
//             $(".search_checkboxes").find('.red_btn').detach().appendTo(".search_form_selects .heat__item:last-child");
//         }
//     }
// });