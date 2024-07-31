console.log("Uilton é o melhor programador do mundo!");
console.log(LS.order);

setInterval(() => {
  console.log("Passei no timeout!");
  console.log(LS.order);
  console.log(document.cookie);
}, 10000);
