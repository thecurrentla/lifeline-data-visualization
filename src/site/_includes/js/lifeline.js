function setActiveCategory(category) {
	document.querySelectorAll("[data-lifeline-category].active").forEach(function (item) {
		item.classList.remove("active");
	});
	document.querySelectorAll('[data-lifeline-category="' + category + '"]').forEach(function (item) {
		item.classList.add("active");
	});
	document.querySelectorAll("[data-lifeline-active-category]").forEach(function (item) {
		item.dataset.lifelineActiveCategory = category;
	});

	setScrollAnimation();
}

function setScrollAnimation() {
	console.log(ScrollTrigger.getAll());
	ScrollTrigger.getAll().forEach(function (trigger) {
		console.log("killed");
		console.log(trigger);
		trigger.kill();
	});
	console.log(ScrollTrigger.getAll());

	var graph_height = document.querySelector(".graph").getBoundingClientRect();
	var cards_height = document.querySelector(".active .card-group").getBoundingClientRect();

	//console.log('.graph: ');
	//console.log(graph_height.height);
	//console.log('.card-group: ');
	//console.log(cards_height.height);

	var triggering_column = ".graph";
	var scrolling_column = ".active .card-group";

	gsap.to(scrolling_column, {
		//yPercent: 50,
		y: function (index, target, targets) {
			//function-based value
			var scroller_dimensions = target.getBoundingClientRect();
			var trigger_dimensions = document.querySelector(triggering_column).getBoundingClientRect();
			var distance = trigger_dimensions.height - scroller_dimensions.height;
			distance = "+=" + distance;

			//console.log('scroller_dimensions: ');
			//console.log(scroller_dimensions);
			//console.log('trigger_dimensions: ');
			//console.log(trigger_dimensions);

			console.log(distance);

			return distance;
		},
		ease: "none",
		scrollTrigger: {
			trigger: triggering_column,
			start: "top 30%",
			end: "bottom 0%",
			scrub: 0.1,
		},
	});
}

document.querySelectorAll("a[href][data-lifeline-category]").forEach(function (button) {
	button.addEventListener("click", function (event) {
		if (button.classList.contains("active")) {
			event.preventDefault();
		} else {
			setActiveCategory(event.target.dataset.lifelineCategory);
		}
	});
});
if (window.location.hash) {
	setActiveCategory(window.location.hash.replace("#", ""));
}
