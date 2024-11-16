import './style.css';
import { loadCompras } from '../services/db';

async function run() {
  const data = await loadCompras();

  document.querySelector('#loader')?.classList.add('_hidden');

  const table = document.querySelector('table');

  const tbody = document.createElement('tbody');
  const rows = data.map((d) => {
    const row = document.createElement('tr');

    const itemTd = document.createElement('td');
    itemTd.innerText = d.item;

    const cityState = document.createElement('td');
    cityState.innerText = d.cityState;

    const minValue = document.createElement('td');
    minValue.innerText = d.minValue;

    const maxValue = document.createElement('td');
    maxValue.innerText = d.maxValue;

    const desc = document.createElement('td');
    desc.innerText = d.desc;

    row.appendChild(itemTd);
    row.appendChild(cityState);
    row.appendChild(minValue);
    row.appendChild(maxValue);
    row.appendChild(desc);

    return row;
  });

  rows.forEach((r) => {
    tbody.appendChild(r);
  });

  table?.appendChild(tbody);

  document.querySelector('#content')?.classList.remove('_hidden');
}

run();
