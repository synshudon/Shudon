const upcoming_events = document.getElementById("upcoming_events");
const filters = document.getElementById("filters");
const all_categories = [];
const category_wise_data = {};
const category_wise_html = {};
let currentlyActivated_filter = null;

async function add_upcoming_events(){
	try{
		const data = await fetch('data/summer_carnival.json');
		const events = await data.json();
		if (!events.length > 0){
	        upcoming_events.innerHTML = `<h1 style="text-align: center;">Nothing to show</h1>`;
	    }
	    events?.map((item, index)=>{
	    	if (item.category in category_wise_data){
	    		category_wise_data[item.category] = [...category_wise_data[item.category], item];
	    	}else{
	    		category_wise_data[item.category] = [item];
	    		if (index == 0){
	    			category_wise_html[item.category] =`<div id="${item.category}" class="display-flex" style="flex-direction: column; flex-wrap: nowrap; gap: 20px;">`;
	    			filters.innerHTML += `<div class="navtab active" id="${item.category}_nav">${item.category}</div>`;
	    			currentlyActivated_filter = item.category;
	    		}
	    		else{
	    			category_wise_html[item.category] =`<div id="${item.category}" class="display-none" style="flex-direction: column; flex-wrap: nowrap; gap: 20px;">`;
	    			filters.innerHTML += `<div class="navtab" id="${item.category}_nav">${item.category}</div>`;
	    		}
	    	}
	    	category_wise_html[item.category] += `
	    			<div style="display:flex; border: 1px solid; border-radius: 15px; gap: 20px; flex-wrap: wrap;">
			          <div class="image-div">
			            <img src="${item.image}" alt="${item.name}" style="border-radius: 15px;">
			          </div>
			          <div class="info-div">
			            <h2>${item.name}</h2>
			            <p>${item.description}</p>
			            <p><a href="${item.more_link}">${item.more}</a></p>
			            <div class="horizontal_rule"></div>
			            <p>${item.price}</p>
			            <button type="button">Book Now</button>
			          </div>
			        </div>
	    		`;
	    });
	    upcoming_events.innerHTML += '';
	    Object.keys(category_wise_data)?.map((item)=>{
			category_wise_html[item] += `</div>`;
			upcoming_events.innerHTML += category_wise_html[item];
	    });
	    const tabs = document.querySelectorAll('.navtab');
		const contents = document.querySelectorAll('.content');
		const underline = document.querySelector('.underline');

		function updateUnderline() {
		  const activeTab = document.querySelector('.navtab.active');
		  underline.style.width = `${activeTab.offsetWidth}px`;
		  underline.style.left = `${activeTab.offsetLeft}px`;
		}

		tabs.forEach(tab => {
		  tab.addEventListener('click', () => {
		    tabs.forEach(t => {
		    	t.classList.remove('active');
		    	let doc_element = document.getElementById(t.id.substr(0, t.id.length - 4));
		    	doc_element.classList.add("display-none");
		    	doc_element.classList.remove("display-flex");
			});
			let doc_element = document.getElementById(tab.id.substr(0, tab.id.length - 4));
	    	doc_element.classList.remove("display-none");
	    	doc_element.classList.add("display-flex");
		    tab.classList.add('active');
		    const target = tab.getAttribute('data-target');
		    contents.forEach(content => {
		      if (content.id === target) {
		        content.classList.add('active');
		      } else {
		        content.classList.remove('active');
		      }
		    });
		    updateUnderline();
		  });
		});

		window.addEventListener('resize', updateUnderline);
		updateUnderline();
	}
	catch (e){
		console.log(e);
		upcoming_events.innerHTML = `<h1 style="text-align: center;">Something went wrong</h1>`;
	}
}

add_upcoming_events();
