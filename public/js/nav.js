const navBar = document.getElementById('navigation');


navBar.addEventListener('mousemove', () => navBar.classList.remove('hide-nav'));
navBar.addEventListener('mouseleave', () => navBar.classList.add('hide-nav'));
setTimeout(() => navBar.classList.add('hide-nav'), 3000);
