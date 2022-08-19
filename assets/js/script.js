let foodResultsEL = document.querySelector('#food-result')

let drinkResultsEl = document.querySelector('#drink-result')

let btnElOne = document.querySelector('#foodBtn')
let btnElTwo = document.querySelector('#drinkBtn')

let random = document.querySelector('#modal-restart-btn')

let resultEl =  document.querySelector('#date-results')

let getinputs = document.querySelectorAll('input')

let modal = document.querySelector('.modal')
let modalBackground = document.querySelector('.modal-background')

let modalDeleteBtn = document.querySelector('.delete')

let randomNav = document.querySelector('#random')


// modal

// let modal =  document.querySelector('.modal-card-body')
// modal.setAttribute('class','modal')
// modal.style.display ='none'
// modal.style.height = '100%'
// modal.style.width = '100%'
// modal.style.position = 'fixed'
// modal.style.left = '0'
// modal.style.top ='0'
// modal.style.backgroundColor = 'rgba(0,0,0,0.4)'
// modal.style.zIndex = '4'

// document.body.appendChild(modal)

let modalContent = document.querySelector('.modal-card-body')
// modalContent.style.display = 'flex'
// // modalContent.style.flexWrap = 'wrap'
// modalContent.style.margin = '15% auto'
// modalContent.style.backgroundColor = 'white'
// modalContent.style.maxHeight = '400px'
// modalContent.style.width = '60%'
// modalContent.style.padding = '30px'
// modalContent.style.borderRadius = '35px'
// modalContent.style.justifyContent = 'space-evenly'
// modalContent.style.overflow = 'auto'

// modal.appendChild(modalContent)



let regex = /strIngredient/


let inputOne  = getinputs[0]
let inputTwo =  getinputs[1]
// event listener 
random.addEventListener('click',event=>{
    modalContent.innerHTML=''
    let modal = document.querySelector('.modal')
    modal.classList.add('is-active')
    getrandomFood()
    getRandomDrink()

})
randomNav.addEventListener('click',event=>{
    modalContent.innerHTML=''
    let modal = document.querySelector('.modal')
    modal.classList.add('is-active')
    getrandomFood()
    getRandomDrink()
})

window.addEventListener('click',event=>{
    if (event.target == modalBackground) {
        modal.classList.remove('is-active')
        console.log(modal.className)
        modalContent.innerHTML = ''
}})

modalDeleteBtn.addEventListener('click',event=>{
    modal.classList.remove('is-active')
    modalContent.innerHTML = ''
    
})

btnElOne.addEventListener('click',(event)=>{
    event.preventDefault()
    // modalContent.innerHTML = ''
    // modal.style.display = 'block'
    let modal = document.querySelector('.modal')
    modal.className += ' is-active'
    getFood(inputOne.value)
    getDrink(inputTwo.value)
    console.log(inputOne.value)
})

btnElTwo.addEventListener('click',(event)=>{
    event.preventDefault()
    // modal.style.display='block'
    let modal = document.querySelector('.modal')
    modal.className += ' is-active'
    getDrink(inputTwo.value)
    getFood(inputOne.value)
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
    drinkContent.style.position = 'relative'

    
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

    let helper = document.createElement('div')
    helper.setAttribute('class','helper')
    helper.style.display = 'none'
    helper.style.backgroundColor = 'white'
    helper.style.border = 'black 2px solid'
    helper.style.position ='absolute'
    helper.style.height = '100px'
    helper.style.maxWidth = '200px'
    helper.style.right= '200px'
    helper.style.bottom= '0px'
    helper.style.zIndex = '10'
    helper.style.overflow ='auto'
    helper.style.borderRadius = '10px'


    helper.appendChild(ingredient)
    helper.appendChild(instructions)
    drinkContent.appendChild(helper)
    

    drinkContent.appendChild(name)
    drinkContent.appendChild(imgcontainer)
    modalContent.append(drinkContent)

    drinkContent.addEventListener('mouseover', ()=>{
        helper.style.display = 'block'
    })

    drinkContent.addEventListener('mouseout', ()=>{
        helper.style.display = 'none'
    })

    console.log(drink.strInstructions)
    
}




async function getrandomFood(){
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    let data = await response.json()
    let food  = data.meals[0]
    console.log(food)


    let foodIngredents = []
    

    
    
    let foodContent = document.createElement('div')
    foodContent.style.position ='relative'

    
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

    let helper = document.createElement('div')
    helper.style.display = 'none'
    helper.style.backgroundColor = 'white'
    helper.style.border = 'black 2px solid'
    helper.style.position ='absolute'
    helper.style.height = '100px'
    helper.style.maxWidth = '200px'
    helper.style.right= '200px'
    helper.style.bottom= '0px'
    helper.style.zIndex = '10'
    helper.style.overflow ='auto'
    helper.style.borderRadius = '10px'


    helper.appendChild(ingredient)
    helper.appendChild(instructions)
    foodContent.appendChild(helper)
    

    foodContent.appendChild(name)
    foodContent.appendChild(imgcontainer)
    modalContent.append(foodContent)

    foodContent.addEventListener('mouseover', ()=>{
        helper.style.display = 'block'
    })

    foodContent.addEventListener('mouseout', ()=>{
        helper.style.display = 'none'
    })
    
    
}
// www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin
async function getDrink(d){
    let res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${d}`)
    res = await res.json()
    console.log(res.drinks[0])
    let random = Math.floor(Math.random()*res.drinks.length)
    let select = res.drinks[random].strDrink
    console.log(select)
    let response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${select}`)
    let data = await response.json()
    let drink = data.drinks[0]
    let dirnkIngredents = []
    console.log(drink)

    

    let drinkContent = document.createElement('div')
    drinkContent.style.position = 'relative'

    
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

    let helper = document.createElement('div')
    helper.style.display = 'none'
    helper.style.backgroundColor = 'white'
    helper.style.border = 'black 2px solid'
    helper.style.position ='absolute'
    helper.style.height = '100px'
    helper.style.maxWidth = '200px'
    helper.style.right= '200px'
    helper.style.bottom= '0px'
    helper.style.zIndex = '10'
    helper.style.overflow ='auto'
    helper.style.borderRadius = '10px'


    helper.appendChild(ingredient)
    helper.appendChild(instructions)
    drinkContent.appendChild(helper)
    

    drinkContent.appendChild(name)
    drinkContent.appendChild(imgcontainer)
    modalContent.append(drinkContent)

    drinkContent.addEventListener('mouseover', ()=>{
        helper.style.display = 'block'
    })

    drinkContent.addEventListener('mouseout', ()=>{
        helper.style.display = 'none'
    })

    
}




async function getFood(f){
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${f}`)
    res = await res.json()
    let random = Math.floor(Math.random()*res.meals.length)
    let select = res.meals[random].strMeal
    console.log(select)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${select}`)
    let data = await response.json()
    let food  = data.meals[0]

    console.log(food)


    let foodIngredents = []
    

    
    
    let foodContent = document.createElement('div')

    foodContent.style.position ='relative'

    
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

    let helper = document.createElement('div')
    helper.style.display = 'none'
    helper.style.backgroundColor = 'white'
    helper.style.border = 'black 2px solid'
    helper.style.position ='absolute'
    helper.style.height = '100px'
    helper.style.maxWidth = '200px'
    helper.style.right= '200px'
    helper.style.bottom= '0px'
    helper.style.zIndex = '10'
    helper.style.overflow ='auto'
    helper.style.borderRadius = '10px'


    helper.appendChild(ingredient)
    helper.appendChild(instructions)
    foodContent.appendChild(helper)
    

    foodContent.appendChild(name)
    foodContent.appendChild(imgcontainer)
    modalContent.append(foodContent)

    foodContent.addEventListener('mouseover', ()=>{
        helper.style.display = 'block'
    })

    foodContent.addEventListener('mouseout', ()=>{
        helper.style.display = 'none'
    })
}


// mobile menu
const burgerIcon = document.querySelector('#burger');
const navbarMenu = document.querySelector('#nav-links');

burgerIcon.addEventListener('click', () => {
  navbarMenu.classList.toggle('is-active');
});
