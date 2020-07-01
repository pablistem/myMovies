function dateMiddleware (req, res, next) {
//function formatDate (oldDate) {
    const date = new Date(release_date)
    //const date = new Date(oldDate)
    const format = (number) => number < 10 ? '0' + number : number
    return `${format(date.getUTCMonth() + 1)}-${format(date.getUTCDate())}-${date.getUTCFullYear()}`
  }