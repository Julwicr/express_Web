const projectsList = document.querySelectorAll('.project-list-item');
const worksContainer = document.querySelector('.projects-preview');
const works = document.querySelectorAll('.projects-preview-item');
const imgs = [...document.getElementsByTagName('img')];

const scrollable = worksContainer.scrollHeight;


// SCROLL event
worksContainer.addEventListener('scroll', (e) => {
  const scroll = worksContainer.scrollTop;
  // console.log(scroll);
});


// CLICK event -> go to project

const setScroll = (order) => {
  let toScroll = 0;

  for (let i = 0; i < order; i++) {
    const work = works[i];
    toScroll += work.scrollHeight + (scrollable / 60);
  }
  worksContainer.scrollTop = toScroll;
}

// add dataset to buttons
let countProject = 0;
for (let i = 0; i < projectsList.length; i++) {
  const project = projectsList[i];

  project.dataset.order = countProject;

  project.addEventListener('click', (e) => {
    setScroll(e.target.dataset.order);
    console.log(e.target.dataset.order);
  });

  countProject += 1;
}

// SCROLL ->  Hide events

// Project controller

const option = {
  root: worksContainer,
  threshold: 0.2,
  rootMargin: '100px'
};

const observer = new IntersectionObserver((entries, observer) => {
  console.log('FIRE');
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    // find the corresponding project list to highlight
    const index = parseInt(entry.target.dataset.project);
    if (entry.isIntersecting) {
          entry.target.classList.remove('hide-project');
          projectsList[index].classList.add('highlight-project');
        } else {
          entry.target.classList.add('hide-project');
          projectsList[index].classList.remove('highlight-project');
        }
  }
}, option);

works.forEach(work => observer.observe(work));

// Image controller

const imgOption = {
  root: worksContainer,
  threshold: 0.1,
  rootMargin: '-100px'
}

const imgObserver = new IntersectionObserver(
  (imgs, imgObserver) => imgs.forEach(img => !img.isIntersecting ? img.target.style.opacity = '0' : img.target.style.opacity = '1'),
  imgOption);

imgs.forEach(img => imgObserver.observe(img));


// getting github repos
const repoContainer = document.getElementById('github-repos')

const getRepos = async() => {
  const response = await fetch("https://api.github.com/users/julwicr/repos");
  const repos = await response.json();
  repos.forEach(repo => {
    const link = document.createElement("a");
    link.className = 'github-repos-link';
    link.target = 'blank';
    link.href = repo.html_url;
    link.textContent = repo.full_name.replace('Julwicr', '');
    link.dataset.hover = repo.description;
    repoContainer.appendChild(link);
  });
}
getRepos();
