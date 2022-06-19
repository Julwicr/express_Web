const form = document.getElementById("form");
const notif = document.getElementById("form-status");
console.log(notif);
notif.style.opacity = '0';

    // message sent notification
    async function handleSubmit(event) {
      notif.style.opacity = '1';
      event.preventDefault();
      const data = new FormData(event.target);
      fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          notif.innerHTML = "Message sent ✓";
          form.reset()
        } else {
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              notif.innerHTML = data["errors"].map(error => error["message"]).join(", ")
            } else {
              notif.innerHTML = "Oops! There was a problem, please try again."
            }
          })
        }
      }).catch(error => {
        notif.innerHTML = "Oops! There was a problem, please try again."
      });
    }
    form.addEventListener("submit", handleSubmit)

// Toggle form
sendMessage = document.getElementById('send-message');
let toggle = 0;
sendMessage.addEventListener('click', (event) => {
  if (toggle === 0) {
    form.style.transform = 'translateY(0px)';
    form.style.opacity = '1';
    toggle++;
    setFilter(120);
    setContactBg(x, y);
  } else {
    form.style.transform = 'translateY(-300px)';
    form.style.opacity = '0';
    toggle--;
    setFilter(0);
  }
})

// change color
const setFilter = (x) => document.body.style.filter = `hue-rotate(${x}deg)`;

// background contact
const contactBg = document.getElementById('contact');
const formInput = document.getElementsByClassName('form-input');

const setContactBg = (x, y) => {
  contactBg.style.backgroundImage = 'linear-gradient(#0000ff 1px, transparent 1px), linear-gradient(95deg, #0000ff 1px, transparent 1px)';
  contactBg.style.backgroundSize = `100px 15px, ${x}px ${y}px, 20px 20px, 20px 20px`;
};

let x = 3;
let y = 15;

for (let i = 0; i < formInput.length; i++) {
  const input = formInput[i];
  input.addEventListener('keyup', (e) => {
    setContactBg(x, y);
    x > 15 ? x = 3 : x++;
    y > 100 ? y = 15 : y += 5;
  });
}
