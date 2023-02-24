const modal = document.querySelector("#modal");
const openModal = document.querySelector(".openModal");
const closeModal = document.querySelector(".close-button");
const browse = document.querySelector(".browse");
const openOrderPage = document.querySelector("#orderPage"); // open order page
const fakeWindow = document.querySelector("#fakeWindow"); // open order page fake window
const placeOrder = document.querySelector(".placeOrder"); // add to order button
const closeOrderPage = document.querySelector(".closeOrderPage");
// Variables for selection modal
const menuItem = document.querySelectorAll("li p:first-child"); // returns all menuItemHeadings into an NodeList Array
const menuDesc = document.querySelectorAll("li p:nth-child(2)");
const itemImg = document.getElementById("dean");
const itemName = document.querySelector("#menuName");
const itemDesc = document.querySelector("#menuDescription");
const itemPrice = document.querySelector("#menuPrice");
// order window DOM targets for costs
const orderSubTotal = document.getElementById("subTotal");
const subTotalTax = document.getElementById("subTotalTax");
const total = document.getElementById("total");

let trash = null;
let mealName = ""; // temporary variable to store what menu item was added to order
let mealPrice = 0; // THIS ONE
let mealValue = "";
// const mealSum = []; // THIS ONE change to subTotalArr
const orders = [];

const subTotalArr = []; // array for storing the all the costs
let orderTotal = 0; // order total after tax has been applied to the subTotal 
let subTotal = 0; // variable to store the summed total of all orders
const tax = 0.13; // Tax to be applied to subTotal




// modal & side order page
closeModal.addEventListener("click", function () {
  modal.close();
})

browse.addEventListener("click", function () {
  modal.close();
  openOrderPage.style.display = "none";
})

closeOrderPage.addEventListener("click", function () {
  openOrderPage.style.display = "none"; 
  fakeWindow.style.display = "none";
})

// ADDING ITEMS TO THE ORDER FROM THE QUICK DISPLAY MODAL //
// ?? This could also be a submit button? change click to submit? why?
placeOrder.addEventListener("click", function () {
  modal.close();
  fakeWindow.style.display = "block";
  openOrderPage.style.display = "block";
  const meal = mealName;
  // create a new list element
  const newLi = document.createElement('li');
  newLi.innerHTML = `
  <img class="trash" src="./assets/trash-can-solid.svg" alt="" />
  <p>${meal}</p>
  <p>$${mealPrice}</p>
  `;
  // append new list element to the DOM
  const ulTarget = document.getElementById('clientOrder');
  ulTarget.appendChild(newLi);
  const trash = document.querySelectorAll(".trash");
  // console.log("what does trash return?", trash); // returns the nodeList item of img of the trashcan
  
  // create an array for storing the meals price
  // mealSum.push(Number(mealPrice)); // adds stored items to an array for total
  subTotalArr.push(Number(mealPrice)); // adds stored items to an array for total
  // add value to new list item
  newLi.setAttribute("id",mealValue);
  // takes the tallied total of the ordered meals and passes it as an argument to the function taxCalc
  orderArray(mealName, mealPrice, mealValue);
  getTrash(trash); // passed to the bin parameter
  tallyTotal(); // call talleyTotal to tally and display totals
  console.log("orders array after adding items",orders);
  
});

// REMOVING ITEMS FROM THE ORDER //
// function to target the trash can thats clicked, return the menu item index and remove it from the orders array
// TODO might need to use this event listener function to only only return the index and meal item name
const getTrash = (bin) => {
  for ( let j = 0; j < bin.length; j++ ) {
    bin[j].addEventListener('click',function (){
      // returns the name of the meal next to the trash
      mealTarget = this.nextElementSibling.textContent;
      console.log("the name of the item being removed = ",mealTarget);
      // removing the li element of the targeted menu item
      console.log("element being removed = ",this.parentElement);
      this.parentElement.remove('li');
      console.log("**element has been removed");
      console.log("order array after target item was removed", orders); // returns empty
      
      // remove the returned index from the array
      // TODO this needs adjusting - it is removing other items from the array except only the one I want
      mealCostIndex = orders.findIndex(meal => meal.mealName === this.nextElementSibling.textContent);
      console.log("index of selected array item", mealCostIndex);
      // let returnCost = orders[mealCostIndex].mealPrice;

      // removes targeted index from the orders array object
      // orders.shift(mealCostIndex);
      orders.splice(mealCostIndex,1);

      //removes the meal from the order window

      // TODO need to add the function to remove the selected items cost from totals and array?
      // removed price from array
      // subTotalArr.shift(mealCostIndex);
      // console.log(subTotalArr);
      
      // subtractTotal();
    });
  };
};    
    

// function to add meal name, value and meal price to an array
const orderArray = (name, price, value) => {
  orders.push({"mealName": name, "mealPrice": Number(price), "mealValue": value});
  return orders;
};

// COSTING SECTION //
// function to tally up all the values in the array    
const getSubTotal = () => {
  // if conditional to check if the array is empty to avoid returning an error
  if (subTotalArr.length === 0) {
    // if the array is empty...
    console.log("array is empty");
    subTotal = 0;
    orderTotal = 0;
  } else {
    // if the array has values...
    subTotal = subTotalArr.reduce((totalValue, currentAmount) => {
      return totalValue + currentAmount;
    });
  }
}

// ? Could these two function be cleaner as they basically do the same thing
// Tallying Totals for new additions
const tallyTotal = () => {
  // console.log("Adding Cost");
  // console.log("new sub total array =", subTotalArr);
  // calling the getSubTotal function to tally the array of values after the new cost has been added
  getSubTotal();
  // console.log("Total after adding = ", subTotal);
  // storing the new grand total of the bill in a variable after tax has been applied
  orderTotal = (subTotal * tax) + subTotal;
  // console.log("Total of entire order", orderTotal);
  // append new totals to the DOM
  orderSubTotal.textContent = (subTotal).toFixed(2);
  subTotalTax.textContent = (subTotal * tax).toFixed(2);
  total.textContent = (orderTotal).toFixed(2);
}

// Subtracting Totals for new Subtractions
const subtractTotal = () => {
  // console.log("new sub total array =", subTotalArr);
  getSubTotal();
  // console.log("Total after subtracting = ", subTotal);
  orderTotal = (subTotal * tax) + subTotal;
  // console.log("Total of entire order", orderTotal);
  // append new totals to the DOM
  orderSubTotal.textContent = (subTotal).toFixed(2);
  subTotalTax.textContent = (subTotal * tax).toFixed(2);
  total.textContent = (orderTotal).toFixed(2);
}
    
// QUICK VIEW FOR SELECTED MENU ITEM //
// iterates through the menuItem Node List array and returns the clicked on content
for (let i = 0; i < menuItem.length; i++) {
  menuItem[i].addEventListener('click', function (e) {
    // show selection modal
    modal.showModal();
    mealName = e.target.textContent;
    mealPrice = e.target.nextElementSibling.firstElementChild.textContent;
    mealValue = e.target.attributes.value.textContent
    itemImg.attributes.src.textContent = e.target.attributes.value.textContent;
    // add selection to the header inside modal
    itemName.textContent = e.target.textContent;
    // add description to modal
    itemDesc.textContent = e.target.nextElementSibling.firstChild.textContent;
    itemPrice.textContent = e.target.nextElementSibling.firstElementChild.textContent;
    return mealName, mealPrice, mealValue;
  })
};


