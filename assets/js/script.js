let foodResultsEL = document.querySelector('food-result')
let drinkResultsEl = document.querySelector('drink-result')


async function getRandomDrink(){
    let response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    let data = await response.json()
    
    return data
    
    
}

async function getrandomFood(){
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    let data = await response.json()
    return data
    
}


async function getDrink(drink){
    let response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    let data = await response.json()
    
    return data
    
    
}

async function getFood(food){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${food}`)
    let data = await response.json()
    return data
    
}



