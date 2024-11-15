import './style.css';

function sendItHome() {
  location.href = '/';
}

document.addEventListener(
  'DOMContentLoaded',
  function () {
    const urlParams = new URLSearchParams(window.location.search);
    const item = urlParams.get('item');

    if (!item) {
      sendItHome();
      return;
    }

    const query = document.querySelector('#query');
    const itemInput =
      document.querySelector<HTMLInputElement>('#item-input-hidden');

    if (!query || !itemInput) {
      alert('Algo de errado aconteceu!');
      sendItHome();
      return;
    }

    query.textContent = item;
    itemInput.value = item;
  },
  false
);

document
  .querySelector<HTMLFormElement>('#form')
  ?.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!e.currentTarget) {
      console.warn("Could not find 'currentTarget' of submitted form");
      return;
    }

    const form = new FormData(e.currentTarget as HTMLFormElement);
    const email = form.get('email')?.toString();
    if (!email) {
      console.warn("Could not find field 'item' of submitted form");
      return;
    }

    const searchParams = new URLSearchParams('');
    searchParams.set('email', email);

    // TODO: submit this to an API
    // Then redirect to success
    location.href = '/compra-success/?' + searchParams.toString();
  });
