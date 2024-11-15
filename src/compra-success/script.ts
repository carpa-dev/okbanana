import './style.css';

const urlParams = new URLSearchParams(window.location.search);
const emailParam = urlParams.get('email');
const email = document.querySelector('#email');

if (!emailParam) {
  alert('Algo de errado aconteceu e seu e-mail não pode ser registrado.');
}
if (!email) {
  console.warn('Could not find the #email field');
}

if (email) {
  email.textContent = emailParam;
}
