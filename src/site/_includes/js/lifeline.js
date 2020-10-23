function removeActiveCategory(category) {
	document.querySelectorAll("[data-ll-category].ll-active").forEach(function (item) {
		item.classList.remove("ll-active");
	});
}

function setActiveCategory(category) {
	document.querySelectorAll('[data-ll-category="' + category + '"]').forEach(function (item) {
		item.classList.add("ll-active");
	});
	document.querySelectorAll("[data-ll-category-active]").forEach(function (item) {
		item.dataset.lifelineActiveCategory = category;
	});
}

document.querySelectorAll(".ll-category").forEach(function (category) {
	var category_name = category.dataset.llCategory;

	var columns = [
		{
			scroller: "#" + category_name + " .ll-card-stack",
			trigger: "#" + category_name + " .ll-category-column--card",
		},
		{
			scroller: "#" + category_name + " .ll-graph",
			trigger: "#" + category_name + " .ll-category-column--graph",
		},
	];

	console.group(category_name);

	columns.forEach(function (column) {
		console.table(column);

		var scroller_dimensions = document.querySelector(column.scroller).getBoundingClientRect();
		var trigger_dimensions = document.querySelector(column.trigger).getBoundingClientRect();

		console.table(trigger_dimensions);
		console.table(scroller_dimensions);

		var distance = trigger_dimensions.bottom - scroller_dimensions.bottom;
		console.log(distance);
		distance = "+=" + distance;
		console.log(distance);

		gsap.to(column.scroller, {
			// yPercent: 50,
			y: distance,
			ease: "none",
			scrollTrigger: {
				trigger: column.trigger,
				start: "top 5%",
				end: "bottom 95%",
				scrub: 0.1,
				// markers: true,
			},
		});
	});
	console.groupEnd(category_name);
});

document.querySelectorAll("a[href][data-ll-category]").forEach(function (link) {
	link.addEventListener("click", function (event) {
		var category = event.target.dataset.llCategory;
		if (link.classList.contains("ll-active")) {
			event.preventDefault();
		} else {
			removeActiveCategory(category);
			document.querySelector(".ll-category--" + category).scrollIntoView();
			setActiveCategory(category);
		}
	});
});

if (window.location.hash) {
	var id = window.location.hash.replace("#", "");
	var category = id.split("-");
	// window.location.hash = category;
	setActiveCategory(category);
	console.log(id);
	console.log(category);
}
