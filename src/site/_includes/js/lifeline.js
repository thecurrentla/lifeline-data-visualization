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
	ScrollTrigger.getAll().forEach(function (trigger) {
		console.log(trigger);
		trigger.kill();
	});

	var graph_dimensions = document.querySelector(".graph").getBoundingClientRect();
	var cards_dimensions = document.querySelector(".active .ll-card-stack").getBoundingClientRect();

	if (graph_dimensions.height < cards_dimensions.height) {
		var triggering_column = ".active .ll-card-stack";
		var scrolling_column = ".graph";
	} else {
		var triggering_column = ".graph";
		var scrolling_column = ".active .ll-card-stack";
	}

	// var triggering_column = ".column-graph";
	// var scrolling_column = ".active .ll-card-stack";

	// console.log("graph_dimensions: " + scrolling_column);
	// console.table(graph_dimensions);
	// console.log("cards_dimensions: " + triggering_column);
	// console.table(cards_dimensions);

	gsap.to(scrolling_column, {
		//yPercent: 50,
		y: function (index, target, targets) {
			//function-based value
			var scroller_dimensions = document.querySelector(scrolling_column).getBoundingClientRect();
			var trigger_dimensions = document.querySelector(triggering_column).getBoundingClientRect();

			// console.log("scroller: " + scrolling_column);
			// console.table(scroller_dimensions);
			// console.log("trigger: " + triggering_column);
			// console.table(trigger_dimensions);

			var distance = trigger_dimensions.bottom - scroller_dimensions.bottom;
			distance = "+=" + distance;

			// console.log(distance);

			return distance;
		},
		ease: "none",
		scrollTrigger: {
			trigger: triggering_column,
			start: "top 5%",
			end: "bottom 95%",
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
		document.querySelector(".lifeline-header").scrollIntoView();
	});
});

document.querySelectorAll(".line").forEach(function (line) {
	line.addEventListener("click", function (event) {
		console.log(line.dataset.date);
	});
});

if (window.location.hash) {
	setActiveCategory(window.location.hash.replace("#", ""));
}
