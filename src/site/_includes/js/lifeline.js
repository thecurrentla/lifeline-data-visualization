function setActiveCategory(category) {
	document.querySelectorAll("[data-lifeline-category].ll-active").forEach(function (item) {
		item.classList.remove("ll-active");
	});
	document.querySelectorAll('[data-lifeline-category="' + category + '"]').forEach(function (item) {
		item.classList.add("ll-active");
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

	var graph_dimensions = document.querySelector(".ll-graph").getBoundingClientRect();
	var cards_dimensions = document.querySelector(".ll-active .ll-card-stack").getBoundingClientRect();

	if (graph_dimensions.height < cards_dimensions.height) {
		var triggering_column = ".ll-active .ll-card-stack";
		var scrolling_column = ".ll-graph";
	} else {
		var triggering_column = ".ll-graph";
		var scrolling_column = ".ll-active .ll-card-stack";
	}

	// var triggering_column = ".ll-column-graph";
	// var scrolling_column = ".ll-active .ll-card-stack";

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
		if (button.classList.contains("ll-active")) {
			event.preventDefault();
		} else {
			setActiveCategory(event.target.dataset.lifelineCategory);
		}
		document.querySelector(".ll-header").scrollIntoView();
	});
});

if (window.location.hash) {
	var category = window.location.hash.replace("#", "").split("-");
	// window.location.hash = category;
	setActiveCategory(category[0]);
	console.log(category);

	document.querySelectorAll(".ll-card.share-link").forEach(function (card) {
		card.addEventListener("click", function (event) {
			console.log(card.dataset.date);
			document.querySelectorAll(".ll-line[data-date][class*='ll-highlight']").forEach(function (item) {
				item.classList.remove("ll-highlight-minor");
				item.classList.remove("ll-highlight-major");
			});
			document
				.querySelectorAll(".ll-line[data-date*='" + card.dataset.date.substr(0, 7) + "']")
				.forEach(function (item) {
					item.classList.add("ll-highlight-minor");
				});
			document.querySelectorAll(".ll-line[data-date='" + card.dataset.date + "']").forEach(function (item) {
				item.classList.add("ll-highlight-major");
			});
		});
	});
}
