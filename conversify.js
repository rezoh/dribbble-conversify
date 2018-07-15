const mutationConfig = { attributes: false, childList: true, subtree: false };

const config = {
  selectors: {
    shot: '.dribbble-shot',
    fav: '.fav a',
    views: '.views',
    tools: '.tools',
    conversify: '.conversify',
    dribbles: '.dribbbles',
  },
  classes: {
    conversify: 'conversify'
  }
};

function conversify() {
  const posts = document.querySelectorAll(config.selectors.shot);
  const postsArray = Array.prototype.slice.apply(posts);
  postsArray.forEach(post => {
    if (post) {
      const likes = post.querySelector(config.selectors.fav).innerText.replace(',', '');
      const views = post.querySelector(config.selectors.views).innerText.replace(',', '');
      const conversion = (parseInt(likes) / parseInt(views) * 100).toFixed(1);
      const tools = post.querySelector(config.selectors.tools);
      const conversifyLi = tools.querySelector(config.selectors.conversify);

      if (conversifyLi) {
        conversifyLi.innerText = conversion + '%';
      } else {
        const li = document.createElement('li');
        li.classList.add(config.classes.conversify);
        li.innerText = conversion + '%';
        tools.appendChild(li);
      }
    }
  })
}

const dribbbles = document.querySelector(config.selectors.dribbles);
const observer = new MutationObserver(conversify);
observer.observe(dribbbles, mutationConfig);
conversify();