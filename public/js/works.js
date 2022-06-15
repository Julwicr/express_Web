const repoContainer = document.getElementById('github-repos')

// getting github repos
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
    console.log(repo)
  });
}
getRepos();
