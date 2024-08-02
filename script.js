console.log(LS.order);

setInterval(() => {
  console.log("Passei no timeout!");
  console.log(LS.order);
  console.log(document.cookie);
}, 1000);
