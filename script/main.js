$(function(){
	$("#gnb").hover(
		function(){
			$(".header_top").addClass("active");
		},
		function(){
			$(".header_top").removeClass("active");
		}
	);
	$("#header .header_top .mobile_utils li .tab").click(function(e){
		e.preventDefault();
		$("#header .header_top").toggleClass("on");
		$("#mobile").toggleClass("on");
		$(".dim").toggleClass("active");
	});


	$("#mobile > ul > li").click(function(e){
		e.preventDefault();
		if($(this).find("ul").is(":visible") == false){
			$("#mobile > ul > li").find("ul").slideUp(300);
			$(this).find("ul").slideDown(300);
		}
		else{
			$(this).find("ul").slideUp(300);
		}
		if($(this).hasClass("active") == false){
			$("#mobile > ul > li").removeClass("active");
			$(this).addClass("active");
		}
		else{
			$(this).removeClass("active");
		}
   });

	$(".utils li:last-child a").click(function(e){
			e.preventDefault();
			$(".lang").slideToggle(300);
	});

	$(window).resize(function(){

		winW=$(window).width();

		if(winW > 1024){
			if($("#mobile").hasClass("on") == true){
				$("#header .header_top").removeClass("on")
				$("#mobile").removeClass("on");
				$(".dim").removeClass("active");

			}
		}
	});


	$(".family_site").click(function(e){
		e.preventDefault();
		$(this).find(".content").slideToggle(300);
		$(this).find("img").toggleClass("active");
		$(this).toggleClass("active");
		return;
	});
	

	$(document).on("click", function(e){
	// console.log(e.target, $(e.target));
	// console.log($(e.target).parents(".search"));

		if($(e.target).parents(".family_site").length == 0){
			$(".content").slideUp("300");
			$("img").removeClass("active");
		}
    });
});





window.addEventListener("DOMContentLoaded", function(){
	var video=document.getElementById("my_video");

		my_video.addEventListener("loadeddata", function(){
			console.log("loaded");
			my_video.muted=true;
			my_video.play();
		});

		my_video.addEventListener("ended", function(){

			my_video.currentTime=0;       //비디오가 끝나면 0초부분으로 되돌아옴
			video.play();
		});


	var bar=document.getElementById("bar");
	// var subswiper_playstatus="play";
	var pause_play=document.getElementById("pause_play");
	var subswiper = new Swiper(".sub_slider .subswiper", {
		direction: "vertical",
		speed: 1500,
		loop: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		on: {
			slideChange: function(){
				if(pause_play.classList.contains("pause") == true){
					gsap.fromTo(bar, {width: 0}, {width: 80, duration: 6.4});
				}
			}
		},
	});
	pause_play.addEventListener("click", function(e){
		e.preventDefault();

		if(e.currentTarget.classList.contains("play") == true){
			e.currentTarget.classList.remove("play")
			e.currentTarget.classList.add("pause")
			e.currentTarget.innerText="pause";
			subswiper.autoplay.start();
		}
		else{
			e.currentTarget.classList.remove("pause")
			e.currentTarget.classList.add("play")
			e.currentTarget.innerText="play";
			subswiper.autoplay.stop();
		}
	});

	var section1=document.getElementById("section1");
	// console.log(section1)
	// var bg1=document.getElementById("bg1");
	// var bg2=document.getElementById("bg2");
	// var bg3=document.getElementById("bg3");
	// var bg4=document.getElementById("bg4");
	var n;
	// console.log(bg1)
	var section1swiper = new Swiper("#section1 .section1Swiper", {
		slidesPerView:4,
		spaceBetween:0,
		// loop:true,
		breakpoints: {
			1400: {
				slidesPerView: 4,
			},
			1000: {
				slidesPerView: 3,
			},
			600: {
				slidesPerView: 2,
			},
			0: {
				slidesPerView: 1,
			}
		}
	});
	
	var s1swiper_slider=document.querySelectorAll(".section1Swiper .swiper-wrapper .swiper-slide");
	var s1_contentbox=document.getElementsByClassName("s1_contentbox");
	var swap_bg=document.getElementsByClassName("swap_bg");
	// console.log(s1_contentbox) 
	// console.log(s1swiper_slider);

	for(var i=0; i < s1swiper_slider.length; i++){
		s1swiper_slider[i].index=i;
		s1swiper_slider[i].addEventListener("mouseenter", function(e){

			n=e.currentTarget.index;
			// console.log(n);
			
			for(var j=0; j < s1swiper_slider.length; j++){
				if(n == j){
					// section1.style.backgroundImage= "url(images/section_01_event_0" + (n+1) + ".jpg)";
					e.currentTarget.firstElementChild.classList.add("active");
					swap_bg[j].classList.add("active");
				}
				else{
					s1swiper_slider[j].firstElementChild.classList.remove("active");
					swap_bg[j].classList.remove("active");
				}
			}
		});
		section1.addEventListener("mouseleave", function(e){
			
			for(var j=0; j < s1swiper_slider.length; j++){
				s1swiper_slider[j].firstElementChild.classList.remove("active");
				swap_bg[j].classList.remove("active");
			}
		});
	}


	var pageN=0;
	var h;
	var pos=0;
	var timer=0;
	var total=4;
	var moving=false;
	let html=document.querySelector("html");
	let header=document.getElementById("header");
	var header_top=this.document.querySelector("#header .header_top");
	var mobile=this.document.querySelector("#mobile");
	console.log(mobile);

	window.addEventListener("resize", init);

	function init(){
		timer=setTimeout(function(){
			h=window.innerHeight;
			pos=pageN*h;
			// $("html").stop().animate({scrollTop: pos}, 400);
			gsap.to(window, {scrollTo: pos, duration: 0.5});
		}, 100);
	}
	init();

	// $("html").mousewheel(function(e, delta){
	document.body.addEventListener("mousewheel", function(e){

		if(mobile.classList.contains("on")){
			return;
		}
		// if($("html").is(":animated")) return;
		if(moving) return;

		console.log(e.deltaY);

		if(e.deltaY < 0){  //올라갈때
			if(pageN > 0){
				pageN=pageN-1;
				header_top.classList.remove("nonvisible");
			}
		}
		else{
			if(pageN < total){	//내려갈때
				pageN=pageN+1;
				header_top.classList.add("nonvisible");
			}
		}
		if(pageN == 2){
			header_top.classList.add("coloractive");
		}
		else{
			header_top.classList.remove("coloractive");
		}
		pos=pageN*h;
		// console.log(pageN, pos)
		moving=true;

		// $("html").stop().animate({scrollTop: pos}, 800);
		gsap.to(window, {scrollTo: pos, duration: 0.8, onComplete: function(){
			moving=false;
		}});
	});
});

