const MenuAPI = "https://free-food-menus-api-two.vercel.app"
const SearchButton = document.querySelector(".search-button")
const SearchInput = document.querySelector(".search-input")
const MenuSection = document.querySelector(".display-menu-section")
const NextButton = document.querySelector (".next-button")
const PreviousButton = document.querySelector (".previous-button")
const PageNumber = document.querySelector (".page-number")
const AllTypes = document.getElementById("all-types")
const Appetizers = document.getElementById ("appetizers")



let FoodTitleDisplay = null
let FoodImageDisplay = null
let NumberDisplay = null 



async function SearchHandling() {

  console.log("search sent sucessfully")
  const food = SearchInput.value;

  if (food) {



    try {

      const FoodData = await getFoodData(food);


      console.log("About to display food");

      console.log(FoodData);
      DisplayFoodData(FoodData);
    }

    catch (error) {
      //showLoadingState();
      console.error(error)
      //displayError(error);
    }
  }



  else {

    console.log("calling display error")


    displayError("please enter a valid food ")
  }
}



SearchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    SearchHandling();
  }
});


async function getFoodData(category) {


  const response = await fetch(`${MenuAPI}/${category}`);
  console.log("getting food")
  if (!response.ok) {
    window.alert(" enter a different food please")
    throw new Error(" enter  a valid category")
  

  }
  console.log(`${MenuAPI}/${category}`)
  const data = await response.json();
  console.log(data);
  localStorage.setItem("FoodbyCateory", JSON.stringify(data)); //do not forget 
  return data;

}






async function getAllFoodData() {
  const response = await fetch(`${MenuAPI}/all`);
  console.log("getting food")
  if (!response.ok) {
    throw new Error("something went wrong ")

  }
  console.log(`${MenuAPI}/all`)
  const data = await response.json();
  
  console.log(data);
  localStorage.setItem("AllFoods", JSON.stringify(data)); //do not forget celsie weeh
  return data;

}


function DisplayFoodData(data) {

  console.log("displaying the food now ")

  

  const AllFoods = data.map(({ id, name, price, img, rate, country }) => ({
    id,
    name,
    price,
    img,
    rate,
    country
  }));

  

  MenuSection.textContent = " "


  AllFoods.slice(0, 12).forEach(function (oneFood) {

    const ImageCard = document.createElement("div")
    ImageCard.classList.add("image-card")


    const FoodTitle = document.createElement("h2")
    FoodTitle.classList.add("food-title")
    FoodTitle.textContent = oneFood.name

    const FoodImage = document.createElement("img")
    FoodImage.classList.add("food-image")
    FoodImage.src = oneFood.img

    const SeeRecipe = document.createElement("button")
    SeeRecipe.classList.add("see-complete-recipe")
    SeeRecipe.textContent = "See complete recipe"

    const ButtonIcon = document.createElement("img")
    ButtonIcon.classList.add("see-complete-recipe-icon")
    ButtonIcon.src = "./images/icon.png"
   


    ImageCard.appendChild(FoodTitle)
    ImageCard.appendChild(FoodImage)
   
    SeeRecipe.appendChild(ButtonIcon)
    ImageCard.appendChild(SeeRecipe)
    MenuSection.appendChild(ImageCard)


  })




}




window.addEventListener("DOMContentLoaded", async function () {

  const SavedPageNumber = localStorage.getItem("pageNumber")
  const SavedPageData = localStorage.getItem("pageData")
  const savedallFoods = localStorage.getItem("AllFoods")
  if (savedallFoods) {
    console.log ("it is working")
    const savedData = JSON.parse(savedallFoods)
    DisplayFoodData(savedData["our-foods"])
  } 

  if (SavedPageNumber && SavedPageData) {
    DisplayFoodData(JSON.parse(SavedPageData));
    PageNumber.textContent = SavedPageNumber;
    CurrentPage = Number(SavedPageNumber);
  }

  else {
   const data = await getAllFoodData()
    DisplayFoodData(data["our-foods"]);
  }



});







AllTypes.addEventListener("click",async function (){
  //calStorage.clear()
  //geNumber.textContent= Number("1")
  console.log ("all types clicked")
   AllTypes.classList.toggle("active");
   const data = await getAllFoodData()

   const allTypesofFood = data["our-foods"]
    .sort(() => Math.random() - 0.5)
    DisplayFoodData(allTypesofFood)

})


Appetizers.addEventListener("click",async function (){

  let CurrentPage = 1
    PageNumber.textContent = "1"
   console.log("appetizers pressed")
   Appetizers.classList.toggle("active");
   AllTypes.classList.remove("active")
   const data = await getAllFoodData()
   const appetizers = data["best-foods"];
   PaginationStuff(appetizers, CurrentPage)
  
   DisplayFoodData(appetizers)


})


let CurrentPage = 1

function PaginationStuff (Array, Page){
  const ProductsPerPage = 12
  const skip =(Page - 1) * ProductsPerPage
  const end = skip + ProductsPerPage
  const PageResult = Array.slice (skip, end )
return {
  page: Page,
  array: PageResult
}
}


NextButton.addEventListener("click", async function (){
  console.log("next-button-clicked")
  const data = await getAllFoodData ()
  CurrentPage += 1
  const pageData = PaginationStuff(data["our-foods"], CurrentPage)
  console.log(pageData.page)
  DisplayFoodData(pageData.array)
  NumberDisplay = PageNumber.textContent = pageData.page
  localStorage.setItem("pageNumber", String(pageData.page))
  localStorage.setItem("pageData", JSON.stringify(pageData.array))


})


PreviousButton.addEventListener("click", async function (){
    console.log("previous-button-clicked")
  const data = await getAllFoodData ()

  if (CurrentPage > 1) {
  CurrentPage -= 1
  const pageData = PaginationStuff(data["our-foods"], CurrentPage)
  console.log("Current page:", pageData.page)
  DisplayFoodData(pageData.array)
  NumberDisplay = PageNumber.textContent = pageData.page
    localStorage.setItem("pageNumber", String(pageData.page))
    localStorage.setItem("pageData", JSON.stringify(pageData.array))
  }

})


