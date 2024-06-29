const collection_card_wrapper = document.getElementById("our_collection_card");
const genres_filter = document.getElementById("genres_filter");
const time_filter = document.getElementById("time_filter");
const player_filter = document.getElementById("player_filter");
const difficulty_filter = document.getElementById("difficulty_filter");
let collection = [];

const current_filters ={
  genres: [],
  time: [],
  players: [],
  difficulty: []
}

function filter(name, value){
  const indexOfFilter = current_filters[name].indexOf(value);
  const filter_element = document.getElementById(value);

  if (indexOfFilter == -1){
    current_filters[name].push(value);
    filter_element.classList.add('checked');
  }else{
    current_filters[name].splice(indexOfFilter, 1);
    filter_element.classList.remove('checked');
  }
   collection_card_wrapper.innerHTML = ``
   collection?.map((item, index)=>{
        const currentNumber = (index+1)%4;
        let currentColor = "green";
        if (currentNumber == 0){
          currentColor = "yellow";
        } 
        else if (currentNumber == 1){
          currentColor = "blue";
        }
        else if (currentNumber == 2){
          currentColor = "red";
        }
        if ((current_filters['genres'].indexOf(item.genre) != -1 || current_filters['genres'] == 0) && (current_filters['time'].indexOf(item.time) != -1 || current_filters['time'] == 0) && (current_filters['players'].indexOf(item.players) != -1 || current_filters['players'] == 0) && (current_filters['difficulty'].indexOf(String(item.difficulty)) != -1 || current_filters['difficulty'] == 0) || (current_filters['genres'] == 0 && current_filters['time'] == 0 && current_filters['players'] == 0 && current_filters['difficulty'] == 0)){
            collection_card_wrapper.innerHTML += `
            <article class="postcard light ${currentColor}"><!-- red, green, yellow -->
              <img class="postcard__img prevent-select" src="${item.image}" alt="${item.name} image" />
             <div class="postcard__text t-dark">
              <h1 class="postcard__title ${currentColor} prevent-select">${item.name}</h1>
              <div class="postcard__bar"></div>
              <div class="postcard__preview-txt">${item.description}</div>
              <ul class="postcard__tagbox">
                <li class="tag__item"><i class="fas fa-tag mr-2"></i>${item.genre}</li>
                <li class="tag__item"><i class="fas fa-clock mr-2"></i>${item.time}.</li>
                <li class="tag__item play">
                  <i class="fa-solid fa-user-group mr-2"></i>${item.players}
                </li>
                <li class="tag__item play">
                  <i class="fa-solid fa-brain mr-2"></i>${item.difficulty}
                </li>
              </ul>
            </div>
          </article>
          `
        }
      })
}

async function add_cards(){
  try{
      collection_card_wrapper.innerHTML = ``;
      genres_filter.innerHTML = ``;
      time_filter.innerHTML = ``;
      player_filter.innerHTML = ``;
      difficulty_filter.innerHTML = ``;

      const data = await fetch("/data/our-collection.json");
      collection = await data.json();
      if (!collection.length > 0){
        collection_card_wrapper.innerHTML = `<h1 style="text-align: center;">Nothing to show</h1>`
      }

      const genres = [];
      const time = [];
      const player = [];
      const difficulty = [];

      collection?.map((item, index)=>{
        const currentNumber = (index+1)%4;
        let currentColor = "green";
        if (currentNumber == 0){
          currentColor = "yellow";
        } 
        else if (currentNumber == 1){
          currentColor = "blue";
        }
        else if (currentNumber == 2){
          currentColor = "red";
        }
        collection_card_wrapper.innerHTML += `
          <article class="postcard light ${currentColor}"><!-- red, green, yellow -->
            <img class="postcard__img prevent-select" src="${item.image}" alt="${item.name} image" />
           <div class="postcard__text t-dark">
            <h1 class="postcard__title ${currentColor} prevent-select">${item.name}</h1>
            <div class="postcard__bar"></div>
            <div class="postcard__preview-txt">${item.description}</div>
            <ul class="postcard__tagbox">
              <li class="tag__item"><i class="fas fa-tag mr-2"></i>${item.genre}</li>
              <li class="tag__item"><i class="fas fa-clock mr-2"></i>${item.time}.</li>
              <li class="tag__item play">
                <i class="fa-solid fa-user-group mr-2"></i>${item.players}
              </li>
              <li class="tag__item play">
                <i class="fa-solid fa-brain mr-2"></i>${item.difficulty}
              </li>
            </ul>
          </div>
        </article>
        `
        if (genres.indexOf(item.genre.toLowerCase()) == -1){
            genres.push(item.genre.toLowerCase());
            genres_filter.innerHTML += `<label class="px-4 py-1 prevent-select" style="background-color: orange; border-radius: 20px; cursor: pointer" id="${item.genre}" onclick="filter('genres','${item.genre}')">${item.genre}</label>`;    
        }
        if (time.indexOf(item.time.toLowerCase()) == -1){
            time.push(item.time.toLowerCase());
            time_filter.innerHTML += `<label class="px-4 py-1 prevent-select" style="background-color: orange; border-radius: 20px; cursor: pointer" id="${item.time}" onclick="filter('time','${item.time}')">${item.time}</label>`;       
        }
        if (player.indexOf(item.players.toLowerCase()) == -1){
            player.push(item.players.toLowerCase());
            player_filter.innerHTML += `<label class="px-4 py-1 prevent-select" style="background-color: orange; border-radius: 20px; cursor: pointer" id="${item.players}" onclick="filter('players','${item.players}')">${item.players}</label>`;
        }
        if( difficulty.indexOf(String(item.difficulty)) == -1){
            difficulty.push(String(item.difficulty));
            difficulty_filter.innerHTML += `<label class="px-4 py-1 prevent-select" style="background-color: orange; border-radius: 20px; cursor: pointer" id="${String(item.difficulty)}" onclick="filter('difficulty','${String(item.difficulty)}')">${item.difficulty}</label>`;      
        }
      })
  }catch (e){
    console.log(e)
    collection_card_wrapper.innerHTML = `<h1 style="text-align: center;">something went wrong</h1>`
  } 
}

add_cards()