---
layout: page
title: Send us a message!
---
<form action="https://formspree.io/abhisheksoni2720@gmail.com" method="POST" class="sendMessage">
	
	<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
  <input class="mdl-textfield__input" type="text" id="addr1" name="name" placeholder="Full Name">
  <label class="mdl-textfield__label" for="addr1">Tell us your name.</label>
</div>

<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
  <input class="mdl-textfield__input" type="email" id="addr2" name="_replyto" placeholder="And an email ID we could reply to.">
  <label class="mdl-textfield__label" for="addr1">Email</label>
</div>

<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
  <textarea class="mdl-textfield__input" type="text" rows="5" maxrows="5"
   id="schools" name="message"></textarea>
  <label class="mdl-textfield__label" for="schools">Your Message</label>
</div>
<br>
<!-- Accent-colored raised button with ripple -->
<button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
  Take it away, Hedwig!
</button>
</form>

<p class="device-offline" hidden>Can't send a message when Offline!</p>


<script>
  fetch('https://api.nasa.gov/planetary/apod')
  .catch(rej=>{document.querySelector('.sendMessage').hidden=true;})
</script>