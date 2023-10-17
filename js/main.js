let saturate = document.querySelector("#saturate");
let contrast = document.querySelector("#contrast");
let brightness = document.querySelector("#brightness");
let sepia = document.querySelector("#sepia");
let grayscale = document.querySelector("#grayscale");
let blur = document.querySelector("#blur");
let hueRotate = document.querySelector("#hue_rotate");

let upload = document.querySelector("#up");
let reset = document.querySelector("#reset");
let download = document.querySelector("#download");
let imgBox = document.querySelector("#img");
let img = document.querySelector("img");

var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext("2d");

function resetValue() {
  // img.style.filter='none';
  saturate.value = "100";
  contrast.value = "100";
  brightness.value = "100";
  sepia.value = "0";
  grayscale.value = "0";
  blur.value = "0";
  hueRotate.value = "0";

  ctx.filter = "none";
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

window.onload = function () {
  reset.style.display = "none";
  download.style.display = "none";
  imgBox.style.display = "none";
  saturate.setAttribute("disabled", true);
  contrast.setAttribute("disabled", true);
  brightness.setAttribute("disabled", true);
  sepia.setAttribute("disabled", true);
  grayscale.setAttribute("disabled", true);
  blur.setAttribute("disabled", true);
  hueRotate.setAttribute("disabled", true);
};

// upload img
upload.onchange = function () {
  resetValue();
  reset.style.display = "block";
  download.style.display = "block";
  imgBox.style.display = "block";

  saturate.removeAttribute("disabled");
  contrast.removeAttribute("disabled");
  brightness.removeAttribute("disabled");
  sepia.removeAttribute("disabled");
  grayscale.removeAttribute("disabled");
  blur.removeAttribute("disabled");
  hueRotate.removeAttribute("disabled");

  let file = new FileReader();
  file.readAsDataURL(upload.files[0]);
  file.onload = function () {
    img.src = file.result;
  };

  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    img.style.display = "none";
  };
};

// change filters
let filters = document.querySelectorAll("ul li input");
filters.forEach((filter) => {
  filter.addEventListener("input", function () {
    ctx.filter = `
      saturate(${saturate.value}%)
      contrast(${contrast.value}%)
      brightness(${brightness.value}%)
      sepia(${sepia.value}%)
      grayscale(${grayscale.value})
      blur(${blur.value}px)
      hue-rotate(${hueRotate.value}deg)
      
      `;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  });
});

// download img after edit
download.onclick = () => {
  download.href = canvas.toDataURL();
};
