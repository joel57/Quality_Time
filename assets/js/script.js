let foodResultsEL = document.querySelector('#food-result')

let drinkResultsEl = document.querySelector('#drink-result')

let btnElOne = document.querySelector('#foodBtn')
let btnElTwo = document.querySelector('#drinkBtn')

let logo = document.querySelector('#logo')

let resultEl =  document.querySelector('#date-results')

let getinputs = document.querySelectorAll('input')

// modal

let modal =  document.createElement('div')
modal.setAttribute('class','modal')
modal.style.display ='none'
modal.style.height = '100%'
modal.style.width = '100%'
modal.style.position = 'fixed'
modal.style.left = '0'
modal.style.top ='0'
modal.style.backgroundColor = 'rgba(0,0,0,0.4)'
modal.style.zIndex = '4'

document.body.appendChild(modal)

let modalContent = document.createElement('div')
modalContent.style.display = 'flex'
// modalContent.style.flexWrap = 'wrap'
modalContent.style.margin = '15% auto'
modalContent.style.backgroundColor = 'white'
modalContent.style.maxHeight = '400px'
modalContent.style.width = '80%'
modalContent.style.padding = '30px'
modalContent.style.borderRadius = '35px'
modalContent.style.justifyContent = 'center'
modalContent.style.overflow = 'auto'

modal.appendChild(modalContent)



let regex = /strIngredient/


let inputOne  = getinputs[0]
let inputTwo =  getinputs[1]
// event listener 
logo.addEventListener('click',event=>{
   modalContent.innerHTML =''
    getrandomFood()
    getRandomDrink()
    modal.style.display ='block'
})

window.addEventListener('click',event=>{
    if (event.target == modal) {
        modal.style.display = "none"
}})

btnElOne.addEventListener('click',(event)=>{
    event.preventDefault()
    modal.style.display = 'block'
    getFood(inputOne.value)
    console.log(inputOne.value)
})

btnElTwo.addEventListener('click',(event)=>{
    event.preventDefault()
    modal.style.display='block'
    getDrink(inputTwo.value)
    console.log(inputTwo.value)
})

// get functions

async function getRandomDrink(){
    let response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    let data = await response.json()
    let drink = data.drinks[0]
    let dirnkIngredents = []
    console.log(drink)


    let drinkContent = document.createElement('div')

    
    for(let data in drink){
        if(regex.test(data)){
            if(drink[data]){
                
               dirnkIngredents.push(drink[data])
            }
        }
    }

    let name = document.createElement('strong')
    name.textContent = drink.strDrink

    let drinkImg = document.createElement('img')
    let imgcontainer = document.createElement('div')
    imgcontainer.style.height ='200px'
    imgcontainer.style.width = '200px'
    imgcontainer.appendChild(drinkImg)
    drinkImg.setAttribute('src',drink.strDrinkThumb)
    drinkImg.setAttribute('hight','200px')

    let ingredient = document.createElement('ul')

    let instructions = document.createElement('p')
    instructions.textContent = drink.strInstructions


    for(let i =0;i<dirnkIngredents.length;i++){
        let li = document.createElement('li')
        li.textContent = `${drink[`strMeasure${i+1}`]} ${dirnkIngredents[i]}`
        ingredient.appendChild(li)
        // console.log(`${drink[`strMeasure${i+1}`]} ${dirnkIngredents[i]}`)
    }


    drinkContent.appendChild(name)
    drinkContent.appendChild(imgcontainer)
    drinkContent.appendChild(ingredient)
    drinkContent.appendChild(instructions)
    modalContent.append(drinkContent)

    console.log(drink.strInstructions)
    
}




async function getrandomFood(){
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    let data = await response.json()
    let food  = data.meals[0]
    console.log(food)


    let foodIngredents = []
    

    
    
    let foodContent = document.createElement('div')

    
    for(let data in food){
        if(regex.test(data)){
            if(food[data]){
                
               foodIngredents.push(food[data])
            }
        }
    }

    let name = document.createElement('strong')
    name.textContent = food.strMeal

    let foodImg = document.createElement('img')
    let imgcontainer = document.createElement('div')
    imgcontainer.style.height ='200px'
    imgcontainer.style.width = '200px'
    imgcontainer.appendChild(foodImg)
    foodImg.setAttribute('src',food.strMealThumb)
    foodImg.setAttribute('hight','200px')

    let ingredient = document.createElement('ul')

    let instructions = document.createElement('p')
    instructions.textContent = food.strInstructions


    for(let i =0;i<foodIngredents.length;i++){
        let li = document.createElement('li')
        li.textContent = `${food[`strMeasure${i+1}`]} ${foodIngredents[i]}`
        ingredient.appendChild(li)
        // console.log(`${drink[`strMeasure${i+1}`]} ${dirnkIngredents[i]}`)
    }


    foodContent.appendChild(name)
    foodContent.appendChild(imgcontainer)
    foodContent.appendChild(ingredient)
    foodContent.appendChild(instructions)
    modalContent.append(foodContent)

    console.log(food.strInstructions)
    
    
}

async function getDrink(d){
    let response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${d}`)
    let data = await response.json()
    let drink = data.drinks[0]
    let dirnkIngredents = []
    console.log(drink)

    

    let drinkContent = document.createElement('div')

    
    for(let data in drink){
        if(regex.test(data)){
            if(drink[data]){
                
               dirnkIngredents.push(drink[data])
            }
        }
    }

    let name = document.createElement('strong')
    name.textContent = drink.strDrink

    let drinkImg = document.createElement('img')
    let imgcontainer = document.createElement('div')
    imgcontainer.style.height ='200px'
    imgcontainer.style.width = '200px'
    imgcontainer.appendChild(drinkImg)
    drinkImg.setAttribute('src',drink.strDrinkThumb)
    drinkImg.setAttribute('hight','200px')

    let ingredient = document.createElement('ul')

    let instructions = document.createElement('p')
    instructions.textContent = drink.strInstructions


    for(let i =0;i<dirnkIngredents.length;i++){
        let li = document.createElement('li')
        li.textContent = `${drink[`strMeasure${i+1}`]} ${dirnkIngredents[i]}`
        ingredient.appendChild(li)
        // console.log(`${drink[`strMeasure${i+1}`]} ${dirnkIngredents[i]}`)
    }


    drinkContent.appendChild(name)
    drinkContent.appendChild(imgcontainer)
    drinkContent.appendChild(ingredient)
    drinkContent.appendChild(instructions)
    modalContent.append(drinkContent)

    console.log(drink.strInstructions)
    
    
    
    
    
}




async function getFood(f){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${f}`)
    let data = await response.json()
    let food  = data.meals[0]

    console.log(food)


    let foodIngredents = []
    

    
    
    let foodContent = document.createElement('div')

    
    for(let data in food){
        if(regex.test(data)){
            if(food[data]){
                
               foodIngredents.push(food[data])
            }
        }
    }

    let name = document.createElement('strong')
    name.textContent = food.strMeal

    let foodImg = document.createElement('img')
    let imgcontainer = document.createElement('div')
    imgcontainer.style.height ='200px'
    imgcontainer.style.width = '200px'
    imgcontainer.appendChild(foodImg)
    foodImg.setAttribute('src',food.strMealThumb)
    foodImg.setAttribute('hight','200px')

    let ingredient = document.createElement('ul')

    let instructions = document.createElement('p')
    instructions.textContent = food.strInstructions


    for(let i =0;i<foodIngredents.length;i++){
        let li = document.createElement('li')
        li.textContent = `${food[`strMeasure${i+1}`]} ${foodIngredents[i]}`
        ingredient.appendChild(li)
        // console.log(`${drink[`strMeasure${i+1}`]} ${dirnkIngredents[i]}`)
    }


    foodContent.appendChild(name)
    foodContent.appendChild(imgcontainer)
    foodContent.appendChild(ingredient)
    foodContent.appendChild(instructions)
    modalContent.append(foodContent)

    console.log(food.strInstructions)
    
}



