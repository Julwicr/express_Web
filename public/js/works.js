const projectsList = document.querySelectorAll('.project-list-item');
const worksContainer = document.querySelector('.projects-preview');
const works = document.querySelectorAll('.projects-preview-item');
const imgs = [...document.getElementsByTagName('img')];

const scrollable = worksContainer.scrollHeight;

// console.log(projectsList);
// print scrollable height
addEventListener('resize', () => console.log(scrollable));


// SCROLL event
worksContainer.addEventListener('scroll', (e) => {
  const scroll = worksContainer.scrollTop;
  // console.log(scroll);
});


// CLICK project event
// click ajout le height de ts les preedents project

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

// SCROLL Controller

// Project controller
const option = {
  root: worksContainer,
  threshold: 0.2,
  rootMargin: '100px'
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      entry.target.classList.add('hide-project');
    } else {
      entry.target.classList.remove('hide-project');
    }
    // console.log(entry.target, entry.isIntersecting);
  });
}, option);

works.forEach((work) => {
  observer.observe(work);
});

// highligh current project

function currentProject(scrolled) {

}

projectsList.forEach(project => {
  project.classList.add('highlight-project');
});

// Image controller

const imgOption = {
  root: worksContainer,
  threshold: 0.5,
  rootMargin: '-100px'
}

const imgObserver = new IntersectionObserver((imgs, imgObserver) => {
  imgs.forEach(img => {
    console.log(img.target, img.isIntersecting);
    if (!img.isIntersecting) {
      img.target.style.opacity = '0';
      img.target.classList.remove('img-effect');
    } else {
      img.target.style.opacity = '1';
      img.target.classList.add('img-effect');
    }
  });
}, imgOption)

imgs.forEach((img) => {
  imgObserver.observe(img);
});

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
// TEST

// addEventListener('click', () => {
//   works.forEach(work => {
//     work.classList.add('hide-project');
//   });
// })
