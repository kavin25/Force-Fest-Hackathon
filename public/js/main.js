const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const ImgOp = document.querySelector(".testi-img");
const messageOp = document.querySelector(".message");
const customerNameOp = document.querySelector(".customer-name");
const header = document.querySelector(".nav-out");
const main2 = document.querySelector(".main2");

window.addEventListener("scroll", () => {
  const scrollPos = window.scrollY;
  if (scrollPos > 100) {
    header.classList.add("scroll");
  } else {
    header.classList.remove("scroll");
  }
});

function smoothScroll(target, duration) {
  var target = document.querySelector(target);
  var tagetPosition = target.getBoundingClientRect().top;
  var startPosition = window.pageYOffset;
  var distance = tagetPosition - startPosition;
  var startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    console.log(startTime);
    var timeElapsed = currentTime - startTime;
    var run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

main2.addEventListener("click", function () {
  smoothScroll(".scroll-down", 1000);
});

class Person {
  constructor(customerImg, message, customerName) {
    this.customerImg = customerImg;
    this.message = message;
    this.customerName = customerName;
  }
}

let counter = 0;

const customer0 = new Person(
  `../images/customer-0.jpg`,
  "Jorem ipsum dolor sit amet consectetur adipisicing elit. Officiis neque reprehenderit laborum, corporis explicabo assumenda. Porro impedit consectetur animi, reprehenderit recusandae sapiente at aliquam reiciendis modi ipsam rerum suscipit distinctio",
  "John"
);
const customer1 = new Person(
  `../images/customer-1.jpg`,
  "Borem ipsum dolor sit amet consectetur adipisicing elit. Officiis neque reprehenderit laborum, corporis explicabo assumenda. Porro impedit consectetur animi, reprehenderit recusandae sapiente at aliquam reiciendis modi ipsam rerum suscipit distinctio",
  "Bohn"
);
const customer2 = new Person(
  `../images/customer-2.jpg`,
  "Morem ipsum dolor sit amet consectetur adipisicing elit. Officiis neque reprehenderit laborum, corporis explicabo assumenda. Porro impedit consectetur animi, reprehenderit recusandae sapiente at aliquam reiciendis modi ipsam rerum suscipit distinctio",
  "Mohn"
);
const customer3 = new Person(
  `../images/customer-3.jpg`,
  "Gorem ipsum dolor sit amet consectetur adipisicing elit. Officiis neque reprehenderit laborum, corporis explicabo assumenda. Porro impedit consectetur animi, reprehenderit recusandae sapiente at aliquam reiciendis modi ipsam rerum suscipit distinctio",
  "Gohn"
);
const customer4 = new Person(
  `../images/customer-4.jpg`,
  "LLorem ipsum dolor sit amet consectetur adipisicing elit. Officiis neque reprehenderit laborum, corporis explicabo assumenda. Porro impedit consectetur animi, reprehenderit recusandae sapiente at aliquam reiciendis modi ipsam rerum suscipit distinctio",
  "Lohn"
);

const array = [customer0, customer1, customer2, customer3, customer4];

ImgOp.src = array[0].customerImg;
messageOp.textContent = array[0].message;
customerNameOp.textContent = array[0].customerName;

prevBtn.addEventListener("click", function () {
  counter -= 1;
  if (counter < 0) {
    counter = 4;
  }
  console.log(counter);
  ImgOp.src = array[counter].customerImg;
  messageOp.textContent = array[counter].message;
  customerNameOp.textContent = array[counter].customerName;
});

nextBtn.addEventListener("click", function () {
  counter += 1;
  if (counter > 4) {
    counter = 0;
  }
  console.log(counter);

  ImgOp.src = array[counter].customerImg;
  messageOp.textContent = array[counter].message;
  customerNameOp.textContent = array[counter].customerName;
});
