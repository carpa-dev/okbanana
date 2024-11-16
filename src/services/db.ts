function assertExistence(k: string, v: string) {
  if (v === 'anonymous') {
    return '';
  }

  if (!v) {
    throw new Error(`Could not find contents of env var: '${k}'`);
  }
  return v;
}

type NewCompraDTO = {
  email: string;
  item: string;
  cityState: string;
  minValue: string;
  maxValue: string;
  desc: string;
};

export function saveCompra(dto: NewCompraDTO) {
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

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      key,
      sheet,
      method: 'POST',
      payload: {
        Email: dto.email,
        Item: dto.item,
        'Cidade/Estado': dto.cityState,
        'Valor Mínimo': dto.minValue,
        'Valor Máximo': dto.maxValue,
        Descrição: dto.desc,
      },
    }),
  }).then(handleResponse);
}

function handleResponse(r: Response) {
  if (!r.ok) {
    return Promise.reject('Response is not ok');
  }

  return r.json().then((r2) => {
    if (![200, 201].includes(r2.status)) {
      return Promise.reject(`Response failed: ${JSON.stringify(r2)}`);
    }
    return r2;
  });
}

export function loadCompras(): Promise<Array<ReturnType<typeof sheetToData>>> {
  const key = assertExistence(
    'VITE_LOAD_SHEET_KEY',
    import.meta.env.VITE_LOAD_SHEET_KEY
  );
  const url = assertExistence(
    'VITE_LOAD_SHEET_URL',
    import.meta.env.VITE_LOAD_SHEET_URL
  );
  const sheet = assertExistence(
    'VITE_LOAD_SHEET_NAME',
    import.meta.env.VITE_LOAD_SHEET_NAME
  );

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      key,
      sheet,
      method: 'GET',
    }),
  })
    .then(handleResponse)
    .then((a) => a.data)
    .then((a) => a.map(sheetToData));
}

function sheetToData(d: any) {
  return {
    id: d._id,
    item: d.Item,
    cityState: d['Cidade/Estado'],
    minValue: d['Valor Mínimo'],
    maxValue: d['Valor Máximo'],
    desc: d['Descrição'],
  };
}
