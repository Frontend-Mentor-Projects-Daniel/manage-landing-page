const menuButton = document.querySelector('#js--menu-btn');
const menuList = menuButton.nextElementSibling;

if (!(menuButton instanceof HTMLButtonElement))
  throw new Error("This isn't a button");

if (!(menuList instanceof HTMLUListElement))
  throw new Error("This isn't an unordered list");

menuButton.addEventListener('click', (e) => {
  const isExpanded = menuButton.getAttribute('aria-expanded');
  if (isExpanded != null) {
    if (isExpanded === 'false') menuButton.setAttribute('aria-expanded', true);

    if (isExpanded === 'true') menuButton.setAttribute('aria-expanded', false);
  } else {
    throw new Error(
      "This Menu button doesn't have the aria-expanded attribute"
    );
  }
});
