export class EventStorage {
  constructor() {}

  saveData(key: string, value: string) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  getData(key: string): any {
    const rawValue = localStorage.getItem(key)
    return rawValue && JSON.parse(rawValue)
  }
}
