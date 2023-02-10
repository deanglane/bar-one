const modal = document.querySelector("#modal");
const openModal = document.querySelector(".open-button");
const closeModal = document.querySelector(".close-button");
const noButton = document.querySelector(".no-button");

openModal.addEventListener("click", function() {
  modal.showModal();
});

closeModal.addEventListener("click", function() {
  modal.close();
});

noButton.addEventListener("click", function() {
  modal.close();
});
