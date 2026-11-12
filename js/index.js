const itemsOnCard  = [

  {
        title : "StyleSpy",
        text: " Instantly analse and copy css from any page",
        image: "./assets/images/logo-style-spy.svg",
        
        
        
  },

  
  {
        title : "Speedboost",
        text: " Optimise browser resource to accelerate loading",
        image: "./assets/images/logo-speed-boost.svg",
        status: "active"
        
        
  },


  {
        title : "JsonWizard",
        text: " Instantly analse and copy css from any page",
        image: "./assets/images/logo-json-wizard.svg",
      
        
        
  },


  {
        title : "TabMasterpro",
        text: " Organizes browser tabs into sections and  groups",
        image: "./assets/images/logo-tab-master-pro.svg",
        
        
        
  },


  {
        title : "ViewPortBuddy",
        text: " Simulates various screen resolutions",
        image: "./assets/images/logo-viewport-buddy.svg",
        
        

  },


  
  {
        title : "MarkUpNotes",
        text: " enables annotations and roles remotely",
        image: "./assets/images/logo-markup-notes.svg",
        
        

  },

  
  {
        title : "GridGuides",
        text: " Overlay customisable grids alignment on any tabs",
        image: "./assets/images/logo-grid-guides.svg",
        
        

  },
 
  {
        title : "Palette-Picker",
        text: " Instantly extracts color palletes",
        image: "./assets/images/logo-tab-master-pro.svg",
        
  },



]





const  CardSection= document.querySelector(".main-cards-section");





itemsOnCard.forEach (function (OneCardItem)  
{

  const Card = document.createElement ( "div");
  Card.classList.add("card")

  const TopCardSection = document.createElement ( "div" )
  TopCardSection.classList.add("top-card-section")

 

  const  Texts = document.createElement ( "div");
   Texts.classList.add("texts")

  const Title = document.createElement ("h3");
   Title.classList.add("title")

  const littleTexts = document.createElement ("p")
  littleTexts.classList.add ( "little-texts")


  const Image = document.createElement ( "img")
   Image.classList.add ("card-logo")
  
  const cardButton = document.createElement ( "button")
  cardButton.classList.add ( "buttons")


  const BottomCardSection = document.createElement ( "div")
  BottomCardSection.classList.add ( "bottom-card-section")

  const Switch = document.createElement ("label")
  Switch.classList.add( "switch")

  const CheckBox = document.createElement ( "input")
  CheckBox.type= "checkbox"

  const Slider = document.createElement("span")
  Slider.classList.add("slider", "round")



   Title.textContent = OneCardItem.title;
   littleTexts.textContent = OneCardItem.text;
   Image.src= OneCardItem.image;
   cardButton.textContent= "Remove";

   
   TopCardSection.appendChild ( Image )
   Texts. appendChild ( Title)
   Texts.appendChild( littleTexts)
   TopCardSection.appendChild ( Texts)

   
   
   BottomCardSection.appendChild( cardButton)

   
   Switch.appendChild(CheckBox)
   Switch.appendChild(Slider)
   BottomCardSection.appendChild(Switch)
   
   Card.appendChild ( TopCardSection)
   Card.appendChild ( BottomCardSection)
   CardSection. appendChild ( Card)



   
cardButton.addEventListener("click", function (){

      console.log("remove button has been clicked")
      Card.style.display = "none"
})

})







const mode = document.querySelector(".mode-icon")

mode.addEventListener("click", function (){
      document.body.classList.toggle ( "dark-mode")
      if (document.body.classList.contains ( "dark-mode")) {
        localStorage.setItem ( "theme" , "darkmode")
       
        mode.src = "./assets/images/icon-sun.svg"}
        
      else  {
       localStorage.setItem ( "theme", "lightmode")  
        mode.src = "./assets/images/icon-moon.svg"
      }
      
})



let getTheme = localStorage.getItem("theme")


if (getTheme === "darkmode") {
  document.body.classList.add("dark-mode")
  mode.src = "./assets/images/icon-sun.svg"
} else {
  document.body.classList.remove("dark-mode")
  mode.src = "./assets/images/icon-moon.svg"
}




const AllCards = document.querySelectorAll(".card")//super important
 
const AllButton = document.getElementById("all")
const ActiveButton = document.getElementById("active")
const InActiveButton = document.getElementById( "inactive")



AllButton.addEventListener ("click", function(){
 AllCards.forEach(function (EachCard) {
    AllButton.classList.toggle("active");
    ActiveButton.classList.remove("active");
    InActiveButton.classList.remove("active");
    EachCard.style.display = "flex"
  })

})



ActiveButton.addEventListener("click", function () {
      ActiveButton.classList.toggle("active");
      AllCards.forEach(function(EachCard) {

   
      AllButton.classList.remove("active");
      InActiveButton.classList.remove("active");

       const checkbox = EachCard.querySelector("input[type='checkbox']")
       if(checkbox.checked ){
         EachCard.style.display = "flex"    
       }   
       else (
         EachCard.style.display = "none"
       )  
      })
} )


InActiveButton.addEventListener("click", function (){
      AllCards.forEach(function(EachCard) {
      InActiveButton.classList.toggle("active");
      AllButton.classList.remove("active");
      ActiveButton.classList.remove("active");
      const checkbox = EachCard.querySelector("input[type='checkbox']")
        if(!checkbox.checked)  {
         EachCard.style.display = "flex"
       }
        else {
         EachCard.style.display = "none"
      }
       }
) 
})
















    


