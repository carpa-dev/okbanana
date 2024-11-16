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

    if (!e.currentTarget) {
      console.warn("Could not find 'currentTarget' of submitted form");
      return;
    }

    const form = new FormData(e.currentTarget as HTMLFormElement);
    const email = form.get('email')?.toString();
    if (!email) {
      console.warn("Could not find field 'email' of submitted form");
      return;
    }

    const searchParams = new URLSearchParams('');
    searchParams.set('email', email);

    // Submit to API
    try {
      await submit(form);

      // Then redirect to success page
      location.href = '../compra-success/?' + searchParams.toString();
    } catch (e) {
      alert(e);
    }
  });

function assertExistence(k: string, v: string) {
  if (v === 'anonymous') {
    return '';
  }

  if (!v) {
    throw new Error(`Could not find contents of env var: '${k}'`);
  }
  return v;
}

async function submit(form: FormData) {
  const key = assertExistence(
    'VITE_WRITE_SHEET_KEY',
    import.meta.env.VITE_WRITE_SHEET_KEY
  );
  const sheet = assertExistence(
    'VITE_WRITE_SHEET_NAME',
    import.meta.env.VITE_WRITE_SHEET_NAME
  );
  const url = assertExistence(
    'VITE_WRITE_SHEET_URL',
    import.meta.env.VITE_WRITE_SHEET_URL
  );

  await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      key,
      sheet,
      method: 'POST',
      payload: {
        Email: form.get('email'),
        Item: form.get('item'),
        'Cidade/Estado': form.get('city-state'),
        'Valor Mínimo': form.get('min-value'),
        'Valor Máximo': form.get('max-value'),
        Descrição: form.get('desc'),
      },
    }),
  })
    .then((r) => {
      if (r.ok) {
        return r.json();
      }
      return Promise.reject('Response is not ok');
    })
    .then((r) => {
      if (![200, 201].includes(r.status)) {
        return Promise.reject(`Response failed: ${JSON.stringify(r)}`);
      }
      return r;
    });
}
