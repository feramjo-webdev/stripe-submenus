import sublinks from './data.js';

const toggleBtn = document.querySelector('.toggle-btn');
const closeBtn = document.querySelector('.close-btn');
const sidebarWrapper = document.querySelector('.sidebar-wrapper');
const sidebarLinks = document.querySelector('.sidebar-links');
const linksBtn = [...document.querySelectorAll('.link-btn')];
const submenu = document.querySelector('.submenu');
const hero = document.querySelector('.hero');
const nav = document.querySelector('.nav');

// hide/show sidebar
toggleBtn.addEventListener('click', () => {
  sidebarWrapper.classList.add('show');
});
closeBtn.addEventListener('click', () => {
  sidebarWrapper.classList.remove('show');
});

sidebarLinks.innerHTML = sublinks
  .map((sublink) => {
    const { page, links } = sublink;
    return `<!-- single submenu -->
          <article>
            <h4>${page}</h4>
            <div class="sidebar-sublinks">
            ${links
              .map((link) => {
                return `<a href='${link.url}'>
                <i class='${link.icon}'></i>
            ${link.label}
              </a>`;
              })
              .join('')}
            </div>
          </article>`;
  })
  .join('');

// submenus functionality
linksBtn.forEach((linkBtn) => {
  linkBtn.addEventListener('mouseover', function (e) {
    const text = e.currentTarget.textContent;
    const btnDetails = linkBtn.getBoundingClientRect();
    const btnCenter = btnDetails.left + btnDetails.width / 2;
    const btnBottom = btnDetails.bottom - 3;

    const relevantSubLink = sublinks.find((sublink) => sublink.page === text);

    if (relevantSubLink) {
      const { page, links } = relevantSubLink;
      submenu.classList.add('show');
      submenu.style.left = `${btnCenter}px`;
      submenu.style.top = `${btnBottom}px`;

      let columns = 'col-2';
      if (links.length === 3) {
        columns = 'col-3';
      }
      if (links.length > 3) {
        columns = 'col-4';
      }

      submenu.innerHTML = `<section>
        <h4>${page}</h4>
        <div class="submenu-center ${columns}">
        ${links
          .map((link) => {
            return `<a href='${link.url}'>
            <i class='${link.icon}'></i>
            ${link.label}
          </a>`;
          })
          .join('')}
        </div>
      </section>`;
    }
  });
});

hero.addEventListener('mouseover', function () {
  submenu.classList.remove('show');
});

nav.addEventListener('mouseover', function (e) {
  if (!e.target.classList.contains('link-btn')) {
    submenu.classList.remove('show');
  }
});
