const inputs = document.querySelectorAll(".input-field");
const toggle_btn = document.querySelectorAll(".toggle");
const loginMain = document.querySelector(".loginMain");
const bullets = document.querySelectorAll(".bullets li");
const images = document.querySelectorAll(".image");

console.log(loginMain);


for (const inp of inputs) {
  inp.addEventListener("focus", () => {
    inp.classList.add("active");
  });
  inp.addEventListener("blur", () => {
    if (inp.value !== "") return;
    inp.classList.remove("active");
  });
}

for (const btn of toggle_btn) {
  btn.addEventListener("click", () => {
    loginMain.classList.toggle("sign-up-mode");
  });
}

function moveSlider() {
  const index = this.dataset.value;

  const currentImage = document.querySelector(`.img-${index}`);
  for (const img of images) {
    img.classList.remove("show");
  }
  currentImage.classList.add("show");

  const textSlider = document.querySelector(".text-group");
  textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;

  for (const bull of bullets) {
    bull.classList.remove("active");
  }
  this.classList.add("active");
}

for (const bullet of bullets) {
  bullet.addEventListener("click", moveSlider);
}
