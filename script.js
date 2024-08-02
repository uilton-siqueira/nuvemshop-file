function getCookie(name) {
  return document.cookie.split(";").find(function(cookie) {
    return cookie.trim().split("=")[0] == name; 
  });
}

var timer = setInterval(function() {
  var cart = LS.cart;

  if (cart) {
    var isSent = getCookie(`${cart.id}-nemu-sent`);

    if (isSent) {
      clearInterval(timer);
      return;
    }

    var utmsTrack = getCookie("utmsTrack");
    var pixelPattern = /nemu_.{10}/;

    try {
      utmsTrack = decodeURIComponent(utmsTrack);
    } catch (error) {}
    
    var trackingSessionId = utmsTrack.match(pixelPattern)[0];

    if (!trackingSessionId) {
      clearInterval(timer);
      return;
    }

    console.log("trackingSessionId: ", trackingSessionId);
    console.log("orderId: ", cart.id);
    var body = {
      trackingSessionId: trackingSessionId,
      orderId: cart.id
    }

    fetch("https://eoihhyz2yvxf4vw.m.pipedream.net", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(function(response) {
        if (response.status === 200) {
          const expiresDate = new Date();
          expiresDate.setHours(expiresDate.getHours() + 1);
          document.cookie = `${cart.id}-nemu-sent=true; expires=${expiresDate.toUTCString()}; path=/`;
        }
      }).finally(function() {
        clearInterval(timer);
      });

  }
}, 500);
