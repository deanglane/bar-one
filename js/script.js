const modal = document.querySelector("#modal");
const openModal = document.querySelector(".openModal");
const closeModal = document.querySelector(".close-button");
const browse = document.querySelector(".browse");
const openOrderPage = document.querySelector("#orderPage"); // open order page
const placeOrder = document.querySelector(".placeOrder");
const closeOrderPage = document.querySelector(".closeOrderPage");
// Variables for selection modal
const menuItem = document.querySelectorAll("li p:first-child"); // returns all menuItemHeadings into an NodeList Array
const menuDesc = document.querySelectorAll("li p:nth-child(2)");
const itemImg = document.getElementById("dean");
const itemName = document.querySelector("#menuName");
const itemDesc = document.querySelector("#menuDescription");
const itemPrice = document.querySelector("#menuPrice");

// modal.showModal();

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
})

placeOrder.addEventListener("click", function () {
  modal.close();
  openOrderPage.style.display = "block";
})

// iterates through the menuItem Node List array and returns the clicked on content
for (let i = 0; i < menuItem.length; i++) {
  menuItem[i].addEventListener('click', function (e) {
    // console.log(e.target.textContent);
    // show selection modal
    modal.showModal();

    // img input
    // console.log(itemImg.attributes.src);
    console.log(e.target);
    // let newAttribute = e.target.attributes.value.textContent;
    // console.log(newAttribute);

    itemImg.attributes.src.textContent = e.target.attributes.value.textContent;
    // console.log(itemImg.attributes.src);
    // add selection to the header inside modal
    
    itemName.textContent = e.target.textContent;

    // add description to modal
    // console.log(e.target.nextElementSibling.firstChild.textContent);
    itemDesc.textContent = e.target.nextElementSibling.firstChild.textContent;
    
    // console.log(e.target.nextElementSibling.firstElementChild.textContent);
    // console.log(itemPrice.textContent);
    itemPrice.textContent = e.target.nextElementSibling.firstElementChild.textContent;    
  })
}


