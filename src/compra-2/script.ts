import { saveCompra } from '../services/db';
import { stringOrFail } from '../services/form';
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
  ?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formEl = e.currentTarget as HTMLFormElement;

    if (!e.currentTarget) {
      console.warn("Could not find 'currentTarget' of submitted form");
      return;
    }

    const form = new FormData(formEl);
    const email = form.get('email')?.toString();
    if (!email) {
      console.warn("Could not find field 'email' of submitted form");
      return;
    }

    const searchParams = new URLSearchParams('');
    searchParams.set('email', email);
    const button = formEl.querySelector('button');

    // Submit to API
    try {
      button?.classList.add('loading');
      button?.setAttribute('disabled', 'true');

      await saveCompra({
        email: stringOrFail(form.get('email')),
        item: stringOrFail(form.get('item')),
        cityState: stringOrFail(form.get('city-state')),
        minValue: stringOrFail(form.get('min-value')),
        maxValue: stringOrFail(form.get('max-value')),
        desc: stringOrFail(form.get('desc')),
      });

      // Then redirect to success page
      location.href = '../compra-success/?' + searchParams.toString();
    } catch (e) {
      alert(e);
    } finally {
      button?.classList.remove('loading');
      button?.removeAttribute('disabled');
    }
  });

//function delay() {
//  return new Promise((resolve) => setTimeout(resolve, 2000000));
//}

//function assertExistence(k: string, v: string) {
//  if (v === 'anonymous') {
//    return '';
//  }
//
//  if (!v) {
//    throw new Error(`Could not find contents of env var: '${k}'`);
//  }
//  return v;
//}
//
//async function submit(form: FormData) {
//  const key = assertExistence(
//    'VITE_WRITE_SHEET_KEY',
//    import.meta.env.VITE_WRITE_SHEET_KEY
//  );
//  const sheet = assertExistence(
//    'VITE_WRITE_SHEET_NAME',
//    import.meta.env.VITE_WRITE_SHEET_NAME
//  );
//  const url = assertExistence(
//    'VITE_WRITE_SHEET_URL',
//    import.meta.env.VITE_WRITE_SHEET_URL
//  );
//
//  await fetch(url, {
//    method: 'POST',
//    body: JSON.stringify({
//      key,
//      sheet,
//      method: 'POST',
//      payload: {
//        Email: form.get('email'),
//        Item: form.get('item'),
//        'Cidade/Estado': form.get('city-state'),
//        'Valor Mínimo': form.get('min-value'),
//        'Valor Máximo': form.get('max-value'),
//        Descrição: form.get('desc'),
//      },
//    }),
//  })
//    .then((r) => {
//      if (r.ok) {
//        return r.json();
//      }
//      return Promise.reject('Response is not ok');
//    })
//    .then((r) => {
//      if (![200, 201].includes(r.status)) {
//        return Promise.reject(`Response failed: ${JSON.stringify(r)}`);
//      }
//      return r;
//    });
//}
