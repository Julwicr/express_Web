const form = document.getElementById("form");
    // message sent notification
    async function handleSubmit(event) {
      event.preventDefault();
      const status = document.getElementById("form-status");
      const data = new FormData(event.target);
      fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          status.innerHTML = "Message sent ✓";
          form.reset()
        } else {
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
            } else {
              status.innerHTML = "Oops! There was a problem submitting your form"
            }
          })
        }
      }).catch(error => {
        status.innerHTML = "Oops! There was a problem submitting your form"
      });
    }
    form.addEventListener("submit", handleSubmit)

// Toggle form
// form.hidden = true;
sendMessage = document.getElementById('send-message');
sendMessage.style.borderRadius = "1rem";
let toggle = 0;
sendMessage.addEventListener('click', (event) => {
  if (toggle === 0) {
    // form.hidden = false;
    sendMessage.style.borderRadius = "1rem 1rem 0rem 0rem";
    form.style.transform = 'translateY(0px)';
    toggle++;
  } else {
    // form.hidden = true;
    sendMessage.style.borderRadius = "1rem";
    form.style.transform = 'translateY(-300px)';
    console.log(toggle);
    toggle--;
  }
})
