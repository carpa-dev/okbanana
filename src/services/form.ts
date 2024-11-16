export function stringOrFail(data: FormDataEntryValue | null) {
  if (data === null || typeof data !== 'string') {
    throw Error(`'${data}' is not a string`);
  }
  return data as string;
}
