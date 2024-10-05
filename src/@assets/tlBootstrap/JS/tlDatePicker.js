import { createdElement,Qst,Qs } from "./tl-js"
let tlDatePicker
let datepicked = new Event("datepicked")
export class TLDatePicker {
  constructor ({w=200,h=50,currentTime="now",unity="px",limitYear=2100,onChange=()=>{}}) {
    this.startY = 1940
    let dC = ``
    let dM = ``
    let dY = ``
    this.value = ""
    for (let i=1; i < 32; i++) {
      if (i.toString().length < 2) {
        dC += `<div value="0${i}" class="case-child tl-val-0${i}">
          0${i}
        </div>`
      }
      else {
        dC += `<div value="${i}" class="case-child tl-val-${i}">
          ${i}
        </div>`
      }
    }
    for (let i=1; i < 13; i++) {
      if (i.toString().length < 2) {
        dM += `<div value="0${i}" class="case-child tl-val-0${i}">
          0${i}
        </div>`
      }
      else {
        dM += `<div value="${i}" class="case-child tl-val-${i}">
          ${i}
        </div>`
      }
    }
    for (let i=this.startY; i < limitYear+1; i++) {
      dY += `<div value="${i}"  class="case-child tl-val-${i}">
        ${i}
      </div>`
      
    }
    
    this.caseD = createdElement("div",{
      addclass: "case case-d",
    })
    this.caseM = createdElement("div",{
      addclass: "case case-m",
    })
    this.caseY = createdElement("div",{
      addclass: "case case-y",
    })
    this.caseD.htmlThis(dC)
    this.caseM.htmlThis(dM)
    this.caseY.htmlThis(dY)
    this.element = Qst("tl-datepicker")
    let ddm
    this.xmY = null
    this.xmM = null
    this.xmD = null
    if (currentTime === "now") {
      ddm = new Date()
    }
    else {
      let decompoz = currentTime.split("/")
      this.xmY = parseInt(decompoz[0])
      this.xmM = parseInt(decompoz[1]-1)
      this.xmD = parseInt(decompoz[2])
      ddm = new Date(this.xmY,this.xmM,this.xmD)
    }
    let lemxmD = ddm.getDate()
    let lemxmM = (ddm.getMonth()+1)
    this.xmD = lemxmD.toString().length < 2? "0"+lemxmD: lemxmD
    this.xmM = lemxmM.toString().length < 2? "0"+lemxmM: lemxmM
    this.xmY = ddm.getFullYear()
    this.caseD.setAttribute("value",this.xmD)
    this.caseM.setAttribute("value",this.xmM)
    this.caseY.setAttribute("value",this.xmY)
    // console.log(wday[ddm.getDay()]+" "+this.xmD+" /"+this.xmM+" "+ymon[ddm.getMonth()]+" /"+this.xmY)
    
    this.element.setAttribute("value","")
    tlDatePicker = this
    this.onChange = onChange
    Qs(".case").forEach(c=>{
      c.styleThis("height",h)
    })
    Qst("tl-datepicker").styleThis("width",w+unity)
    if (this.element.innerHTML === "") {
      this.element.htmlThis(`
        <tl-datepicker-header>
          <tl-datepicker-header-d style='color: var(--app-secondary-color)'></tl-datepicker-header-d>
          <tl-datepicker-header-m style='color: var(--app-secondary-color)'></tl-datepicker-header-m>
          <tl-datepicker-header-y style='color: var(--app-secondary-color)'></tl-datepicker-header-y>
        </tl-datepicker-header>

        <tl-datepicker-wrapper>
        </tl-datepicker-wrapper>
      `)
    }
    
  }

  /**
   * Nominate the day and the month like this (mon.|tue.|wed.... && jan.|feb.|mar....)
   * @param {*} date the date to nominate at this format yyyy/mm/dd
   * @returns {{d:string,m:string}} 
   */
  getNomination (date) {
    let wday = ["Sun.","Mon.","Tue.","Wed.","Thu.","Fri.","Sat."]
    let ymon = ["Jan.","Feb.","Mar.","Apr.","May","Jun.","Jul.","Aug.","Sep.","Oct.","Nov.","Dec."]
    let decompoz = date.split("/")
    let yY = parseInt(decompoz[0])
    let mM = parseInt(decompoz[1]-1)
    let dD = parseInt(decompoz[2])
    let ddm = new Date(yY,mM,dD)
    
    let xmD = ddm.getDay()
    let xmM = ddm.getMonth()
    
    return {d:wday[xmD],m:ymon[xmM]}
  }
  setValue () {
    let day = tlDatePicker.caseD.getAttribute("value")
    let month = tlDatePicker.caseM.getAttribute("value")
    let year = tlDatePicker.caseY.getAttribute("value")
    let constr = `${day}/${month}/${year}`
    this.element.setAttribute("value",constr)
    this.value = `${year}/${month}/${day}`
    this.element.dispatchEvent(datepicked)
  }
  setHEADER () {
    let dateVal = this.value
    let noma = this.getNomination(dateVal)
    Qst("tl-datepicker-header-d").textThis(noma.d)
    Qst("tl-datepicker-header-m").textThis(noma.m)
  }
  /**
   * This function return the value of the datepicker, and it can also depends on the argument given
   * @param {string|null} target day|month|year or d|m|y if target=null, the function will return the value at this format DD/MM/YYYY
   * @param {string} format the format of the date dd/mm/yyyy or yyyy/mm/dd if not set, default would be dd/mm/yyyy 
   * @returns {string} date value format
   */
  getValue (target=null,format="dd/mm/yyyy") { 
    target = target != null ? target.toLowerCase() : target
    let day = tlDatePicker.caseD.getAttribute("value")
    let month = tlDatePicker.caseM.getAttribute("value")
    let year = tlDatePicker.caseY.getAttribute("value")

    if (target === "d" ||  target === "day" ) {
      return this.caseD.getAttribute('value')
    }
    else if (target === "m" ||  target === "month" ) {
      return this.caseM.getAttribute('value')
    }
    else if (target === "y" ||  target === "year" ) {
      return this.caseY.getAttribute('value')
    }
    else {
      let constr
      if (format === "yyyy/mm/dd") {
        constr = `${year}/${month}/${day}`
      }
      else {
        constr = `${day}/${month}/${year}`
      }
      return constr
    }
  }
  setMiddle (parent,currentFloatClass) {
    if (parent.QSs(currentFloatClass) !== null ){
      const positionVerticale = parent.QSs(currentFloatClass).offsetTop - parent.offsetTop;
      parent.scrollTo(0, positionVerticale);
      parent.setAttribute("value",parent.QSs(currentFloatClass).getAttribute("value"))
      tlDatePicker.setValue()
      tlDatePicker.onChange(parent)
      tlDatePicker.setHEADER()
    }
  }
  setIntoView (e,currentFloatClass,target=null) {
    let cases = e.QSs(".case-child")
    cases.forEach(c=>{
      c.removeClass (currentFloatClass)
      const rect = c.getBoundingClientRect();
      const parentWin = e.offsetTop + e.clientHeight*.5
      if (target === null ) {
        if (rect.top < parentWin && (rect.top + c.clientHeight*.5) > e.offsetTop  && rect.bottom >= 0) {
          // currentCase = c
          if (!c.containsClass(currentFloatClass)) {
            c.addClass(currentFloatClass)
          }
        }
      }
      else {
        if (!target.containsClass(currentFloatClass)) {
          target.addClass(currentFloatClass)
        }
      }
    })
    
  }
  init () {
    if ( Qst("tl-datepicker-wrapper").children.length === 0){
    Qst("tl-datepicker-wrapper").appendChild(this.caseD)
    Qst("tl-datepicker-wrapper").appendChild(this.caseM)
    Qst("tl-datepicker-wrapper").appendChild(this.caseY)
    }
    
    let fckMid = this.setMiddle
    let sIV = this.setIntoView
    let xD = this.xmD
    let xM = this.xmM
    let xY = this.xmY
    var currentFloatClass = "cased" 

    sIV(this.caseD,currentFloatClass,this.caseD.QSs(`tl-val-${xD}`))
    sIV(this.caseM,currentFloatClass,this.caseM.QSs(`tl-val-${xM}`))
    sIV(this.caseY,currentFloatClass,this.caseY.QSs(`tl-val-${xY}`))
    Qs(".case").forEach (cz=>{
      setTimeout(()=>{fckMid(cz,currentFloatClass)}, 200);
    })
    Qs(".case","scroll",(e,ev)=>{
      sIV(e,currentFloatClass)
      setTimeout(()=>{fckMid(e,currentFloatClass)}, 1000);
    })
  }
}

