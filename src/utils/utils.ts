import { Channels } from './types';
export function saveData(DATA: Channels) {
  const getItem = () => window.localStorage.getItem('data');
  const setItem = (data: string) => window.localStorage.setItem('data', data);

  const data = getItem();
  if (!data) {
    const stringValue = JSON.stringify([DATA]);

    return setItem(stringValue);
  }

  const newData = JSON.parse(data);

  newData.push(DATA);

  setItem(JSON.stringify(newData));
}

export function loadData() {
  const getItem = () => window.localStorage.getItem('data');
  const data = getItem();
  if (!data) {
    return null;
  }
  return data;
}
