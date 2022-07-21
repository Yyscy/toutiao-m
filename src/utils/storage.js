class Storage {
  set (key, value) {
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
  }

  get (key) {
    const value = localStorage.getItem(key)
    try {
      return JSON.parse(value)
    } catch (err) {
      return value
    }
  }

  remove (key) {
    localStorage.removeItem(key)
    console.log(11)
  }
}
const storage = new Storage()
export default storage
