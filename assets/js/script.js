let foodResultsEL = document.querySelector('#food-result')

let drinkResultsEl = document.querySelector('#drink-result')

let btnElOne = document.querySelector('#foodBtn')
let btnElTwo = document.querySelector('#drinkBtn')

let logo = document.querySelector('#logo')

let resultEl =  document.querySelector('#date-results')

let getinputs = document.querySelectorAll('input')


let regex = /strIngredient/


let inputOne  = getinputs[0]
let inputTwo =  getinputs[1]

logo.addEventListener('click',event=>{
    drinkResultsEl.innerHTML =''
    foodResultsEL.innerHTML = ''
    getrandomFood()
    getRandomDrink()
})

btnElOne.addEventListener('click',(event)=>{
    event.preventDefault()
    foodResultsEL.innerHTML =''
    getFood(inputOne.value)
    console.log(inputOne.value)
})

btnElTwo.addEventListener('click',(event)=>{
    event.preventDefault()
    drinkResultsEl.innerHTML = ''
    getDrink(inputTwo.value)
    console.log(inputTwo.value)
})

async function getRandomDrink(){
    let response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    let data = await response.json()
    let drink = data.drinks[0]
    console.log(drink)
    console.log(drink.strIngredient2)

    let drinkContainer =  document.createElement('div')
    drinkContainer.style.height= '200px'
    drinkContainer.style.width= '200px'
    // drinkContainer.style.overflow= 'hidden'

    let drinkName = document.createElement('strong')
    drinkName.textContent = drink.strDrink
    let drinkimg = document.createElement('img')
    drinkimg.style.objectFit = 'contain'
    drinkimg.setAttribute('src',drink.strDrinkThumb)
    
    drinkContainer.appendChild(drinkName)
    drinkContainer.appendChild(drinkimg)

    drinkResultsEl.appendChild(drinkContainer)
    let ulel = document.createElement('ul')
    drinkResultsEl.appendChild(ulel)



    let regex = /strIngredient/
    for(let data in drink){
        if(regex.test(data)){
            if(drink[data]){
                
                let liel = document.createElement('li')
                liel.textContent = drink[data]
                ulel.appendChild(liel)
            }
        }
    }

    
    
}

async function getrandomFood(){
    let regex = /(?<=\=).+/
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    let data = await response.json()
    let food  = data.meals[0]
    console.log(food)

    let foodContainer = document.createElement('div')
    foodContainer.style.height = '200px'
    foodContainer.style.widows = '200px'
    
    let foodname = document.createElement('strong')
    foodname.textContent = food.strMeal
    
    let foodvid = document.createElement('iframe')
    foodvid.setAttribute('src',`https://www.youtube.com/embed/${food.strYoutube.match(regex)[0]}`)


    foodvid.setAttribute('title','YouTube video player')
    foodvid.setAttribute('frameborder','0')

    let img = document.createElement('img')
    img.setAttribute('src',food.strMealThumb)


    foodContainer.appendChild(foodname)
    foodContainer.appendChild(img)
    foodResultsEL.appendChild(foodContainer)
    

    console.log(food.strYoutube.match(regex)[0])
    
}

async function getDrink(d){
    let response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${d}`)
    let data = await response.json()
    let drink = data.drinks[0]
    console.log(drink)

    let drinkContainer =  document.createElement('div')
    drinkContainer.style.height= '200px'
    drinkContainer.style.width= '200px'
    // drinkContainer.style.overflow= 'hidden'

    let drinkName = document.createElement('strong')
    drinkName.textContent = drink.strDrink
    let drinkimg = document.createElement('img')
    drinkimg.style.objectFit = 'contain'
    drinkimg.setAttribute('src',drink.strDrinkThumb)
    
    drinkContainer.appendChild(drinkName)
    drinkContainer.appendChild(drinkimg)

    drinkResultsEl.appendChild(drinkContainer)
    // let drink = data.foods[0]

    
    
    
    
    
}

async function getFood(f){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${f}`)
    let data = await response.json()
    let food  = data.meals[0]
    let regex = /(?<=\=).+/


    let foodContainer = document.createElement('div')
    foodContainer.style.height = '200px'
    foodContainer.style.widows = '200px'
    
    let foodname = document.createElement('strong')
    foodname.textContent = food.strMeal
    
    let foodvid = document.createElement('iframe')
    foodvid.setAttribute('src',`https://www.youtube.com/embed/${food.strYoutube.match(regex)[0]}`)
    // foodvid.setAttribute('width','560')
    // foodvid.setAttribute('height','315')
    foodvid.setAttribute('title','YouTube video player')
    foodvid.setAttribute('frameborder','0')
    // foodvid.setAttribute('encrypted-media')
    // foodvid.setAttribute()

    foodContainer.appendChild(foodname)
    foodContainer.appendChild(foodvid)
    foodResultsEL.appendChild(foodContainer)
    // let regex = /(?<=\=).+/

    console.log(food.strYoutube.match(regex)[0])
    
}



