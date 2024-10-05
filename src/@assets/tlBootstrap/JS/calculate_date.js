export function calculate_age (dateStr1, dateStr2,format="dd/mm/yyyy") {
  let [year1,month1,day1] = ["","",""]
  let [year2,month2,day2] = ["","",""]
  if (format === "yyyy/mm/dd"){
    [year1, month1, day1] = dateStr1.split('/').map(Number);
    [year2, month2, day2] = dateStr2.split('/').map(Number);
  }
  else {
    [day1, month1, year1] = dateStr1.split('/').map(Number);
    [day2, month2, year2] = dateStr2.split('/').map(Number);
  }
  const date1 = new Date(year1, month1 - 1, day1); // Soustraire 1 car les mois commencent à 0
  const date2 = new Date(year2, month2 - 1, day2);

  let yearDifference = date2.getFullYear() - date1.getFullYear();
  let monthDifference = date2.getMonth() - date1.getMonth();
  let dayDifference = date2.getDate() - date1.getDate();
  if (yearDifference > 0) {
    monthDifference = Math.abs(monthDifference)
    dayDifference = Math.abs(dayDifference)
  }
  if (monthDifference != 0 && dayDifference != 0) {
    yearDifference -= 1
  }

  return { y: yearDifference, m: monthDifference, d: dayDifference };
}

export function formatNowDate (nowD) {
  let day = nowD.getDate()
  let month = nowD.getMonth()+1
  let year = nowD.getFullYear()
  month = month.toString().length <= 1 ? "0"+month : month
  day = day.toString().length <= 1 ? "0"+day : day
  return `${day}/${month}/${year}`
}
String.prototype.ddmmyyyy = function () {
  let arr = this.split("/")

  if (arr[0].length === 4) {
    return `${arr[2]}/${arr[1]}/${arr[0]}`
  }
  else {
    return `${arr[0]}/${arr[1]}/${arr[2]}`
  }
}
String.prototype.yyyymmdd = function () {
  let arr = this.split("/")
  if (arr[0].length === 4) {
    return `${arr[0]}/${arr[1]}/${arr[2]}`
  }
  else {
    return `${arr[2]}/${arr[1]}/${arr[0]}`
  }
}