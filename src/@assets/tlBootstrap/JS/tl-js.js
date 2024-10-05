/*
*@package tlBootstrap
*@author thinolord
*@version 1.0.5
*@licence OpenGL
*Important, il est recommandé de ne pas modifier le contenu de ce fichier pour bénéficier pleinement des avantages qu'elle offre. Vous pouvez contacter le développeur en cas de soucis
*Ceci offre un accès simple au fonction de javascript ainsi que JQuery, il ne vaut pas plus que JQuery, mais il est beaucoup plus accessible et simple d'usage.
*Ajoute de widgets et de fonctionnalité comme (toast,tl_alert et tlDatePicker)
*/

/**
 * Fonction AJAX permettant d'effectuer des requêtes vers un serveur distant
 * Envoie des données et en reçoit de même
 * @param {string} method méthode de communication (POST ou GET)
 * @param {string} url l'adresse du lien vers lequel les requêtes seront effectué ex: 'http(s)://mon-domaine.com/request.php'
 * @param {string | object} data les données à envoyer sous forme factorisée en string ou sous forme object
 * @param {Function} callback fonction de retour de rapport du status de la réponse et récupération de données du serveur
 * @param {object} headers 
 */
export function JSSend(method, url, data,callback,headers={}) {
    var xhr = new XMLHttpRequest();
    var requestUrl = url;
    let Rdata = data
    if (data instanceof FormData) {
        // data = data.inputs
    }
    if (method === 'GET' && data) {
        var params = new URLSearchParams();
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                params.append(key, data[key]);
            }
        }
        var queryString = params.toString();
        if (queryString) {
            requestUrl += '?' + queryString;
        }
    }
    xhr.open(method, requestUrl, true);
    // xhr.onload = function() {
    //     if (xhr.status >= 200 && xhr.status < 400) {
    //         callback(true, xhr.responseText);
    //     } else {
    //         callback(false, xhr.responseText);
    //     }
    // };
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 400) {
            // var responseType = xhr.getResponseHeader('X-Response-Type');
            
            var contentType = xhr.getResponseHeader('Content-Type');
                if (contentType && contentType.includes('application/json')) {
                    // La réponse est au format JSON, analyser la réponse JSON
                    var responseJSON = JSON.parse(xhr.responseText);
                    callback(true, responseJSON,contentType);
                } else {
                    callback(true, xhr.responseText,contentType);
                }
            } else {
                callback(false, xhr.responseText);
            }
        };
    xhr.onerror = function() {
        callback(false, "Une erreur s'est produite lors de la requête.");
    };
    if (method === 'POST') {
        if (Rdata instanceof FormData) {
            // xhr.setRequestHeader('Content-Type', 'multipart/form-data');
        }
        else {
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            for (var key in headers) {
                if (headers.hasOwnProperty(key)) {
                    xhr.setRequestHeader(key, headers[key]);
                }
            }
        }
    }
    if (typeof data === "object") {
        data["timezone"] = Intl.DateTimeFormat().resolvedOptions().timeZone
        data = factoriString(data)
    }
    else {
        data += "&timezone="+Intl.DateTimeFormat().resolvedOptions().timeZone
    }
    xhr.send(data);
}
function JSend(method, url, data, callback, headers = {}) {
    var requestUrl = url;
    let fetchData = {
      method: method,
      headers: headers,
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      redirect: 'follow',
      referrerPolicy: 'no-referrer'
    };
  
    if (method === 'GET' && data) {
      var params = new URLSearchParams();
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          params.append(key, data[key]);
        }
      }
      var queryString = params.toString();
      if (queryString) {
        requestUrl += '?' + queryString;
      }
    } else if (method === 'POST') {
      fetchData.body = data;
    }
  
    fetch(requestUrl, fetchData)
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Erreur HTTP, statut : ' + response.status);
        }
        return response.json();
      })
      .then(function(data) {
        callback(true, data);
      })
      .catch(function(error) {
        console.error('Erreur lors de la récupération des données via fetch:', error);
        callback(false, error.message);
      });
  }
  

function styleThis(property, value) {
    if (this instanceof NodeList) {
        this.forEach((each)=>{
            each.style[property] = value;
        });
    }
    else {
        this.style[property] = value;
    }
}
function infutureBuilder (duration) {
    return new Promise(resolve => {
        setTimeout (()=>{
            resolve()
        },duration)
    })
}
export function futureBuilder (duration) {
    return new Promise(resolve => {
        setTimeout (()=>{
            resolve()
        },duration)
    })
}
function stylesThis(styleMap) {
    if (typeof styleMap === "object") {
        for (var key in styleMap) {
            if (styleMap.hasOwnProperty(key)) {
                if (this instanceof NodeList) {
                    this.forEach((each)=>{
                        each.style[key] = styleMap[key];
                    });
                }
                else {
                    this.style[key] = styleMap[key];
                } 
            }
        }
        
    }
    else {
        new Error("stylesThis() parameter should be an object")
    }
    
}

class CustomFilesChooser {
    constructor (element, fieldName, moveIn=false,haveto=null) {
        this.haveto = haveto
        this.element = element
        this.fieldName = fieldName
        this.value = [];
        var postFileGetter = createdElement("input",{addclass:"tl_display-none tl_position-absolute tl_top-900vh"})
        postFileGetter.hideThis()
        postFileGetter.name = fieldName
        postFileGetter.type = "file"
        this.field = postFileGetter
        if (moveIn) {
            this.element.appendChild(postFileGetter)
        } else{
            bodyAppend(this.field)
        }
        var rakmoder = this.field
        var ele = this.element
        var getstance = this
        var getter
        this.element.addEventListener('click', async function(e) {
            if (e.target === ele){
                await new Promise(resolve => {
                    if (getstance.haveto === null){
                        rakmoder.addEventListener('change', resolve, { once: true });
                    }
                    else{
                        rakmoder.addEventListener('change', ()=>{resolve(); getstance.haveto()}, { once: true });
                    }
                    rakmoder.click();
                });
                getter = rakmoder.files;
                getstance.value = getter
                // Le code ici sera exécuté après que l'utilisateur a choisi un fichier
                // console.log('Fichier choisi :', postFileGetter.files[0]);
            }
        });
    }
    // choose () {
    //     bodyAppend(this.field)
    //     var rakmoder = this.field
    //     var ele = this.element
    //     var getstance = this
    //     var getter
    //     this.element.addEventListener('click', async function(e) {
    //         if (e.target === ele){
    //             await new Promise(resolve => {
    //                 rakmoder.addEventListener('change', resolve, { once: true });
    //                 rakmoder.click();
    //             });
    //             getter = rakmoder.files;
    //             getstance.value = rakmoder
    //             // Le code ici sera exécuté après que l'utilisateur a choisi un fichier
    //             // console.log('Fichier choisi :', postFileGetter.files[0]);
    //         }
    //     });
    // }
    getFiles () {
        this.value = this.field.files
        return this.field.files
    }
}

export class thisFormData {
    constructor(formId,excludeElements="") {
        if (formId instanceof HTMLElement) {
            this.form = formId;
        }
        else {
            this.form = document.querySelector(formId);
        }
        this.inputs = new FormData();
        const inputElements = this.form.querySelectorAll('[name]');
        inputElements.forEach(input => {
            if (typeof this.excludeElements != "object") {
                if (input != this.excludeElements) {
                    if (input.type !== 'submit' && input.type !== 'reset' && input.type !== 'button') {
                        if ((input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) && input.type === "file") {
                            const name = input.name;
                            const value = input.files[0];
                            this.inputs.append(name,value);
                        }
                        else {
                            if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
                                const value = input.value;
                                const name = input.name;
                                this.inputs.append(name,value);
                            }
                            else {
                                const value = input.textContent;
                                const name = input.getAttribute("name");
                                this.inputs.append(name,value);
                            }
                            
                        }
                        
                    }
                    
                }
            }
            else {
                if (input.type !== 'submit' && input.type !== 'reset' && input.type !== 'button') {
                    for (var exinput of this.excludeElements) {
                        if (input != exinput) {
                            if ((input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) && input.type === "file") {
                                const name = input.name;
                                const value = input.files[0];
                                this.inputs.append(name,value);
                            }
                            else {
                                if (input instanceof HTMLButtonElement || input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
                                    const value = input.value;
                                    const name = input.name;
                                    this.inputs.append(name,value);
                                }
                                else {
                                    const value = input.textContent;
                                    const name = input.getAttribute("name");
                                    this.inputs.append(name,value);
                                }
                            }
                        }
                    }
                }
            }
            
        });
        return this.inputs;
    }

    add (name, value) {
        this.inputs.append(name,value);
    }
}
export function formatTempsEcoule(dateStr) {
    const maintenant = new Date();
    const date = new Date(dateStr);

    const differenceEnMilliseconds = maintenant - date;
    const secondes = Math.floor(differenceEnMilliseconds / 1000);
    const minutes = Math.floor(secondes / 60);
    const heures = Math.floor(minutes / 60);
    const jours = Math.floor(heures / 24);
    const mois = Math.floor(jours / 30); // Approximation, peut être ajustée selon les besoins
    const annees = Math.floor(jours / 365); // Approximation, peut être ajustée selon les besoins

    if (annees > 0) {
        return `il y a plus de ${annees} an${annees > 1 ? 's' : ''}`;
    } else if (mois > 0) {
        return `il y a plus de ${mois} mois`;
    } else if (jours > 0) {
        return `il y a plus de ${jours} jour${jours > 1 ? 's' : ''}`;
    } else if (heures > 0) {
        return `il y a plus de ${heures} heure${heures > 1 ? 's' : ''}`;
    } else if (minutes > 0) {
        return `il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
    } else {
        return `il y a ${secondes} seconde${secondes > 1 ? 's' : ''}`;
    }
}

// // Exemple d'utilisation avec une date au format "2023-12-09 14:35:52"
// const dateStr = "2023-12-09 14:35:52";
// const tempsEcoule = formatTempsEcoule(dateStr);
// console.log(tempsEcoule);

class ExternalStorage {
    constructor(apiUrl) {
      this.apiUrl = apiUrl;
    }
  
    setItem(keys, value) {
        const data = {};
        if (typeof keys === 'object') {
            
            for (var k = 0; k < keys.length ;k++) {
                data[keys[k]] = value[k];
            }
        }
        else {
            data[keys] = value
        }
        
        JSSend(
            'POST',
            this.apiUrl,
            factoriString(data),
            (success,response)=>{
                var valueExpet = '';
                if (success) {
                    
                    valueExpet = response.message;
                    // //console.log(data.factoriString())
                    return valueExpet;
                }
                else {
                    valueExpet = null;
                }
            }
        );
    //   return await fetch(this.apiUrl, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data),
    //   }).then((response) => response.json());
    }
  
    getItem (key) {
        // var valueExpet = "";
        // var dataTosend = {};
        // dataTosend[key] = "";
        // JSSend(
        //     'GET',
        //     this.apiUrl,
        //     dataTosend,
        //     (success,response)=>{
        //         if (success) {
                    
        //             valueExpet = response.message;
        //             return valueExpet;
        //         }
        //         else {
        //             valueExpet = null;
        //         }
        //     }

        // );
        // return valueExpet;
        return fetch(`${this.apiUrl}?${key}=""`)
            .then((response) => response.json())
            .then((data) => {
                if (data.status) {
                    return data.message;
                } else {
                    return null;
                }
            });
        }
    
  }
export function factoriString(obj) {
    var queryString = "";
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (queryString !== "") {
                queryString += "&";
            }
            queryString += encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]);
        }
    }
    return queryString;
}

export function stringfyParam(obj, separator = "", addArg = false) {
    var queryString = "";
    var decomp = 0;
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (queryString !== "") {
                queryString += separator;
            }
            if (decomp === 0 && addArg) {
                queryString += "?";
                decomp++;
            }
            queryString += encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]);
        }
    }
    return queryString;
}

export function simpleStringingMap(obj, separator = "&") {
    var queryString = "";
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (queryString !== "") {
                // queryString += separator
                queryString += `&${key}=${obj[key]}`;
            }
            else {
                queryString += `${key}=${obj[key]}`;
            }
            
            // //console.log(`&${key}=${obj[key]}`)
        }
    }
    return queryString;
}

export function stringfyThis(obj) {
    var queryString = "";
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (queryString !== "") {
                queryString += " ";
            }
            queryString += obj[key];
        }
    }
    return queryString;
}

function thisVal() {
    return this.value;
}

// Convertir "xxx-xxx" en "xxxXxx"
export function removeTiretAndUpper(chaine) {
    // Séparer la chaîne en trois parties en fonction du tiret
    var parties = chaine.split('-');

    if (parties.length === 1) {
        return
    }
    else {
        // Concaténer les parties avec la première lettre en majuscule pour les deuxième et troisième parties
        return parties[0] + parties[1][0].toUpperCase() + parties[1].slice(1) + parties[2];
    }
}

// Supprimer tous les tirets pour obtenir "xxxxxx"
export function removeTiret(chaine) {
    return chaine.replace(/-/g, '');
}

String.prototype.CryptoRegex = {
    bitcoin: /^(1[1-9A-Za-z][^OIl]{20,40})|(bc1[ac-hj-np-z02-9]{14,74})$/,
    ethereum: /^(0x[a-fA-F0-9]{40})|(0x[a-fA-F0-9]{40})$/,
    ripple: /^(r[0-9a-zA-Z]{24,34})|(r[0-9a-zA-Z]{24,34})$/,
    litecoin: /^(L[a-km-zA-HJ-NP-Z1-9]{25,33})|(M[a-km-zA-HJ-NP-Z1-9]{25,33})$/,
    tron: /^(T[0-9a-zA-Z]{33})|(T[0-9a-zA-Z]{34})$/,
    babydoge: /^(0x)?[a-fA-F0-9]{40}$/,
    binancecoin: /^(bnb1[qpzry9x8gf2tvdw0s3jn54khce6mua7l]{39})$/,
    binanceUsd: /^(0x[a-fA-F0-9]{40})$/,
    tether: /^(0x[a-fA-F0-9]{40})|((0[0-9]{20,32}))$/,
    cardano: /^(addr1[qpzry9x8gf2tvdw0s3jn54khce6mua7l]{38})$/,
    usdcoin: /^(0x[a-fA-F0-9]{40})$/,
    dogecoin: /^(D[1-9A-HJ-NP-Za-km-z]{33})|(Q[1-9A-HJ-NP-Za-km-z]{33})|(V[1-9A-HJ-NP-Za-km-z]{33})$/,
    shibainu: /^(0x[a-fA-F0-9]{40})$/,
    testBitcoin: function() {
        return /^(1[1-9A-Za-z][^OIl]{20,40})|(bc1[ac-hj-np-z02-9]{14,74})$/.test(this);
    },
    testEthereum: function() {
        return /^(0x[a-fA-F0-9]{40})|(0x[a-fA-F0-9]{40})$/.test(this);
    },
    testRipple: function() {
        return /^(r[0-9a-zA-Z]{24,34})|(r[0-9a-zA-Z]{24,34})$/.test(this);
    },
    testLitecoin: function() {
        return /^(L[a-km-zA-HJ-NP-Z1-9]{25,33})|(M[a-km-zA-HJ-NP-Z1-9]{25,33})$/.test(this);
    },
    testTron: function() {
        return /^(T[0-9a-zA-Z]{33})|(T[0-9a-zA-Z]{34})$/.test(this);
    },
    testBabydoge: function() {
        return /^(0x)?[a-fA-F0-9]{40}$/.test(this);
    },
    testBinanceCoin: function() {
        return /^(bnb1[qpzry9x8gf2tvdw0s3jn54khce6mua7l]{39})$/.test(this);
    },
    testBinanceUsd: function() {
        return /^(0x[a-fA-F0-9]{40})$/.test(this);
    },
    testTether: function() {
        return /^(0x[a-fA-F0-9]{40})|((0[0-9]{20,32}))$/.test(this);
    },
    testCardano: function() {
        return /^(addr1[qpzry9x8gf2tvdw0s3jn54khce6mua7l]{38})$/.test(this);
    },
    testUsdCoin: function() {
        return /^(0x[a-fA-F0-9]{40})$/.test(this);
    },
    testDogecoin: function() {
        return /^(D[1-9A-HJ-NP-Za-km-z]{33})|(Q[1-9A-HJ-NP-Za-km-z]{33})|(V[1-9A-HJ-NP-Za-km-z]{33})$/.test(this);
    },
    testShibaInu: function() {
        return /^(0x[a-fA-F0-9]{40})$/.test(this);
    }
};

// // Exemple d'utilisation
// const testResultBitcoin = "adresse_bitcoin".CryptoRegex.testBitcoin();
// const testResultEthereum = "adresse_ethereum".CryptoRegex.testEthereum();
// const testResultRipple = "adresse_ripple".CryptoRegex.testRipple();
// // ... et ainsi de suite pour les autres cryptomonnaies

// //console.log(testResultBitcoin); // true ou false
// //console.log(testResultEthereum); // true ou false
// //console.log(testResultRipple); // true ou false
// // ... et ainsi de suite pour les autres cryptomonnaies


HTMLElement.prototype.styleThis = styleThis;
SVGElement.prototype.styleThis = styleThis;
NodeList.prototype.styleThis = styleThis;
HTMLElement.prototype.stylesThis = stylesThis;
SVGElement.prototype.stylesThis = stylesThis;
NodeList.prototype.stylesThis = stylesThis;
HTMLElement.prototype.thisVal = thisVal;


export function Qs(query, actionEvent = null, action = null,once = false) {
    var tagElement = ['form','div','section','ul','li','h1','h2','h3','h4','h5','h6','input','label','button','html','img']
    if (actionEvent === null || action === null) {
        if (query[0] === '.' || query[0] === '#') {
            if (query[0] === '#') {
                var element = document.querySelector(query);
            }
            else {
                var element = document.querySelectorAll(query);
            }   
        }
        else if (tagElement.includes(query)) {
            var element = document.querySelectorAll(query)
        }
        else{
            var element = document.querySelector('.'+query);
        }
        return element;
    }
    
    else{
        if (once) {
            if (query[0] === '#') {
                var element = document.querySelector(query);
                element.addEventListener(actionEvent, (ev) => action.call(element, element,ev),{once:true});
                
            }
            else{
                var elements = document.querySelectorAll(query);
                elements.forEach((element)=>{
                    element.addEventListener(actionEvent, (ev) => action.call(element, element,ev),{once:true});
                });
            }
        }
        else {
            if (query[0] === '#') {
                var element = document.querySelector(query);
                element.addEventListener(actionEvent, (ev) => action.call(element, element,ev));
                
            }
            else{
                var elements = document.querySelectorAll(query);
                elements.forEach((element)=>{
                    element.addEventListener(actionEvent, (ev) => action.call(element, element,ev));
                });
            }
        }
    }
}

function QSs (query, actionEvent = null, action = null,once= false) {
    var tagElement = ['form','div','section','ul','li','h1','h2','h3','h4','h5','h6','input','label','button','html','img']
    if (actionEvent === null || action === null) {
        if (query[0] === '.' || query[0] === '#') {
            if (query[0] === '#') {
                var element = this.querySelector(query);
            }
            else {
                var element = this.querySelectorAll(query);
            }   
        }
        else if (tagElement.includes(query)) {
            var element = this.querySelectorAll(query)
        }
        else{
            var element = this.querySelector('.'+query);
        }
        return element;
    }
    
    else{
        var elements = this.querySelectorAll(query);
        if (once) {
            elements.forEach((element)=>{
                element.addEventListener(actionEvent, (event) => action.call(element,element,event),{once:true});
            });
        }
        else {
            elements.forEach((element)=>{
                element.addEventListener(actionEvent, (event) => action.call(element,element,event));
            });
        }
    }
}

export function Qst(query, actionEvent = null, action = null,once = false) {
    if (actionEvent === null || action === null) {
        if (query[0] === '*') {
            var element = document.querySelectorAll(query.substring(1,query.length));
        } 
        else {
            var element = document.querySelector(query);
        } 
        return element;
    }
    
    else{
        if (once) {
            var elements = document.querySelectorAll(query);
            elements.forEach((element)=>{
                element.addEventListener(actionEvent, (ev) => action.call(element, element,ev),{once:true});
            });
        }
        else {
            
            var elements = document.querySelectorAll(query);
            elements.forEach((element)=>{
                element.addEventListener(actionEvent, (ev) => action.call(element, element,ev));
            });
        }
    }
}

function QSst (query, actionEvent = null, action = null,once= false) {
    if (actionEvent === null || action === null) {
        if (query[0] === '*') {
            var element = this.querySelectorAll(query.substring(1,query.length));
        } 
        else {
            var element = this.querySelector(query);
        } 
        return element;
    }
    
    else{
        var elements = this.querySelectorAll(query);
        if (once) {
            elements.forEach((element)=>{
                element.addEventListener(actionEvent, (event) => action.call(element,element,event),{once:true});
            });
        }
        else {
            elements.forEach((element)=>{
                element.addEventListener(actionEvent, (event) => action.call(element,element,event));
            });
        }
    }
}
function hideThis() {
    if (this instanceof NodeList) {
        this.forEach((each)=>{
            each.style.display = 'none';
        });
    }
    else {
        this.style.display = 'none';
    } 
}
function removeThis (obg,query) {
    var efemlist = []
    for (var ele of obg) {
        if (ele !== query){
            efemlist.push(ele)
        }
    }
    return efemlist;
}
function addClass (classval) { 
    if (this instanceof NodeList) {
        this.forEach((each) => {
            addClassesToElement(each, classval);
        });
    }
    else {
        addClassesToElement(this, classval);
    }
}
function containsClass (theClass) {
    if (this.classList.contains(theClass)) {
        return true;
    }
    else {
        return false;
    }
}

function addClassesToElement(element, classval) {
    var classesArray = classval.split(' ');
    classesArray.forEach((singleClass) => {
        element.classList.add(singleClass);
    });
}

export function isValidMail (val) {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(val)
}

HTMLElement.prototype.containChild = function (query){
    var liste = this.childNodes
    var comp = 0;
    for (var ele = 0; ele < liste.length; ele++) {
        if (liste[ele] === query) {
            comp++
        }
    }
    if (comp > 0) {
        return true
    }
    else {
        return false
    } 
}

function removeClass (classval) {
    if (this instanceof NodeList) {
        this.forEach((each) => {
            removeClassesFromElement(each, classval);
        });
    } else {
        removeClassesFromElement(this, classval);
    }
}

function replaceClass (currentClass,newClass) {
    if (this instanceof NodeList) {
        this.forEach((each) => {
            each.removeClass(currentClass)
            each.addClass(newClass)
        });
    } else {
        this.removeClass(currentClass)
        this.addClass(newClass)
    }
}

function removeClassesFromElement(element, classval) {
    var classesArray = classval.split(' ');
    classesArray.forEach((singleClass) => {
        element.classList.remove(singleClass);
    });
}


HTMLElement.prototype.clearText = function () {
    if (this instanceof NodeList) {
        this.forEach((each)=>{
            each.innerText = '';
        });
    }
    else {
        this.innerText = '';
    }
}
function showThis(type = 'block') {
    if (this instanceof NodeList) {
        this.forEach((each)=>{
            each.style.display = type;
        });
    }
    else {
        this.style.display = type;
    }
}
function getData (value) {
    let data_value = this.getAttribute('data-' + value);
    return data_value;
}

function setData (dataValue,value) {
    let data_value = this.setAttribute('data-' + dataValue,value);
    return true;
}

class getURI {
    constructor () {
        this.url = window.location.href;
        return this.url;
    }
}

String.prototype.thisParams = function () {
    var params = {};
    var queryString = this.split('?')[1];
    if (queryString) {
        var keyValuePairs = queryString.split('&');
        for (var i = 0; i < keyValuePairs.length; i++) {
            var keyValue = keyValuePairs[i].split('=');
            var key = decodeURIComponent(keyValue[0]);
            var value = decodeURIComponent(keyValue[1]);
            params[key] = value;
        }
    }
    return params;
}
String.prototype.thisURIOnly = function (){
    var queryString = this.split('?')[0];
    // if (decode) {
    //     queryString = decodeURIComponent(queryString);
    // }
    return queryString;
}

export function refactAsParamURI (Obj) {
    // var params = getParamsFromURL();
    var linkHref = '';
    // Ajouter les paramètres de l'URL active au lien
    // //console.log(this);
    if (Object.keys(Obj).length > 0) {
        linkHref += '?' + Object.entries(Obj).map(([key, value]) => encodeURIComponent(key) +'='+encodeURIComponent(value)).join('&');
    }
    return linkHref;
}

export let tlGET = {
    origin:window.location.origin,
    currentURL : window.location.href,
    currentURLMapParam : window.location.href.thisParams(),
    currentURLStringParam : {
        full: stringfyParam(window.location.href.thisParams(),'&',true),
        simple: stringfyParam(window.location.href.thisParams(),'&')
    },
    getnx : function (a,b) {
        return a*b;
    },
}

function valueThis (val='') {
    this.value = val;
    return true;
}

function textThis (val) {
    this.innerText = val;
    return true;
}
function htmlThis (val) {
    this.innerHTML = val;
    return true;
}
function thisParent (nParent = 1) {
    if (nParent === 1) {
        return this.parentElement;
    }
    else if (nParent === 2) {
        return this.parentElement.parentElement;
    }
    else if (nParent === 3) {
        return this.parentElement.parentElement.parentElement;
    }
    else if (nParent === 4) {
        return this.parentElement.parentElement.parentElement.parentElement;
    }
    else if (nParent === 5) {
        return this.parentElement.parentElement.parentElement.parentElement.parentElement;
    }
    else if (nParent === 6) {
        return this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
    }
    else if (nParent === 7) {
        return this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
    }
    else if (nParent === 8) {
        return this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
    }
    else if (nParent === 9) {
        return this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
    }
    else if (nParent === 10) {
        return this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
    }
    
}
function thisNextSibling (nSib = 1) {
    if (nSib === 1) {
        return this.nextElementSibling;
    }
    else if (nSib == 2) {
        return this.nextElementSibling.nextElementSibling;
    }
    else if (nSib == 3) {
        return this.nextElementSibling.nextElementSibling.nextElementSibling;
    }
    else if (nSib == 4) {
        return this.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling;
    }
    else if (nSib == 5) {
        return this.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling;
    }
    else if (nSib == 6) {
        return this.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling;
    }
    else if (nSib == 7) {
        return this.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling;
    }
    else if (nSib == 8) {
        return this.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling;
    }
    else if (nSib == 9) {
        return this.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling;
    }
    else if (nSib == 10) {
        return this.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling;
    }
    
}
function thisPreviousSibling (nSib = 1) {
    if (nSib === 1) {
        return this.previousElementSibling;
    }
    else if (nSib == 2) {
        return this.previousElementSibling.previousElementSibling;
    }
    else if (nSib == 3) {
        return this.previousElementSibling.previousElementSibling.previousElementSibling;
    }
    else if (nSib == 4) {
        return this.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling;
    }
    else if (nSib == 5) {
        return this.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling;
    }
    else if (nSib == 6) {
        return this.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling;
    }
    else if (nSib == 7) {
        return this.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling;
    }
    else if (nSib == 8) {
        return this.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling;
    }
    else if (nSib == 9) {
        return this.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling;
    }
    else if (nSib == 10) {
        return this.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling;
    }
    
}

export function copyAdress(copySrc) {
    return new Promise((resolve, reject)=>{
        var textarea = document.createElement("textarea");
        textarea.value = copySrc;
        document.body.appendChild(textarea);
        // Selectionné le texte dans l'élément
        textarea.select();
        // exécuter la copy
        var copySuccess = document.execCommand("copy");
        
        // Supprimer l'élément tamporaire
        document.body.removeChild(textarea);
        if (copySuccess) {
            resolve(true)
        }
        else{
            reject(false)
        }
    })
}

/**
 * 
 * @param {HTMLElement} element 
 * @param {String} type 
 * @param {bool} isHtml 
 */
function navigatorPasteIn(element,type="input",isHtml=false) {

    navigator.permissions.query({name: 'clipboard-read'}).then(result => {
        if (result.state === 'granted' || result.state === 'prompt') {
            navigator.clipboard.readText()
                .then((text) => {
                    
                    if (type === "input") {
                        // Récupérer le texte du presse-papiers et le coller dans l'input
                        element.value = text;
                    }
                    else {
                        if (isHtml) {
                            element.htmlThis(text)
                        }
                        else {
                            element.textThis(text)
                        }
                    }
                    
                
                })
                .catch(err => {
                    console.error('Erreur lors de la lecture du presse-papiers', err);
                });
                return true
        } else {
            // Si l'API Clipboard n'est pas prise en charge, informer l'utilisateur
            alert("vous n'avez pas permis le collage.");
            return false;
        }
    })
}

/**
 * 
 * @param {HTMLElement} element 
 * @param {String} type 
 * @param {bool} isHtml 
 */
function pasteIn(element, type="input", isHtml=true) {
    // Sélectionnez l'input
    var input = document.getElementById("myInput");
  
    // Sélectionnez le texte dans le presse-papiers
    var clipboardContent = window.clipboardData.getData("Text");
    if (type === "input" || type === "textarea") {
        element.focus()
        // Collez le texte dans l'input
        document.execCommand("insertText", false, clipboardContent);
    }
    else {
        if (isHtml) {
            element.htmlThis(clipboardContent)
        }
        else {
            element.textThis(clipboardContent)
        }
    }
    
}

export function getRandomUniqueNumber (min=0, max) {
    var array = [];
    var n = Math.floor(Math.random()*(max-min+1))+min;
    while (array.length<(max-min)+1) {
        while (array.includes(n)) {
            n = Math.floor(Math.random()*(max-min+1))+min;
            // //console.log(n);
        }
        array.push(n);
    }

    return array;
}

export function tl_rend (min=0, max) {
    var n = Math.floor(Math.random()*(max-min+1))+min;
    return n;
}
export function bodyAppend(child) {
    document.body.appendChild(child);
}
export function bodyRemove(child) {
    document.body.removeChild(child);
}
export function createdElement(query,{addclass=null,addid=null,addvalue=null,addtext=null,addhtml=null}) {
    var elementCreate = document.createElement(query);
    if (addclass != null) {
        elementCreate.addClass(addclass);
    }
    if (addid != null) {
        elementCreate.setAttribute('id',addid);
    }
    if (addvalue != null) {
        elementCreate.valueThis(addvalue);
    }
    if (addtext != null) {
        elementCreate.textThis(addtext);
    }
    if (addhtml != null) {
        elementCreate.htmlThis(addtext);
    }
    return elementCreate;
}

export function getRealStyle (element) {
    return document.defaultView.getComputedStyle(element);
}

HTMLElement.prototype.tlWriting = function(texts,speed=50, textChangeSpeed=200,reverse = false,{time=1000,count=1}) {
    const element = this;
    let textIndex = 0;
    let charIndex = 0;
    var finished = true;
    
    async function typeText() {
        
        if (textIndex < texts.length) {
            const currentText = texts[textIndex];
            element.textContent = currentText.slice(0, charIndex);
            charIndex++;
    
            if (charIndex <= currentText.length) {
                await futureBuilder(speed);
                typeText();
            } else {
                if (!reverse) {
                    textIndex++;
                    charIndex = 0;
                    await futureBuilder(textChangeSpeed);
                    typeText() // Délai entre les textes
                }
                else {
                    //supprimer les lettres du texte actuel un par un avec clearText avant de pas au text suivant
                    charIndex = reverse ? 0 : currentText.length;
                    await futureBuilder(textChangeSpeed)
                    clearText ();
                }
            }
        }
        else {
            if (finished) {
                initWrite()
            }
        }
        
    }
    async function clearText() {
        const currentText = element.textContent;
        if (currentText.length > 0) {
          element.textContent = currentText.slice(0, -1);
          await futureBuilder(speed)
          clearText()
        } else {
          textIndex++;
          charIndex = 0;
          await futureBuilder(textChangeSpeed)
          typeText() // Commence à écrire le prochain texte
        }
    }
    var compteur = 0;
    async function initWrite() {
        if (typeof count !== "string") {
            compteur++;
            if (compteur <= count){
                finished = true
                textIndex = 0
                charIndex = 0
                await futureBuilder(time);
                typeText();
            }
            else {
                finished = false;
            }
        }
        else {
            if (count.toLowerCase() === "infinite") {
                finished = true
                textIndex = 0
                charIndex = 0
                await futureBuilder(time);
                typeText();
            }
        }
    }
    initWrite()
};

export class Toast {
    body = document.body
    constructor (ele = document.body) {
        this.element = ele
        this.body = ele
        if (!ele.containsClass("tl_position-relative")){
            ele.styleThis("position","relative")
            ele.addClass("tl_position-relative")
        }
        this.toast = createdElement('div',{
            addclass: "toast tl_shadow-1",
        })
        this.delay = 1000
    }
    init () {
        if (this.element === this.body) {
            bodyAppend(this.toast)
        }
        else {
            this.element.appendChild(this.toast)
        }
        
    }
    async show (message,delayUtil=1000,andClose=false) {
        this.delay = delayUtil 
        this.toast.htmlThis(message)
        this.toast.addClass("toast-active")
        await infutureBuilder(this.delay)
        this.toast.removeClass("toast-active")
        if (andClose) {
            this.close()
        }
    }
    
    close () {
        if (this.element === this.body) {
            bodyRemove(this.toast)
        }
        else {
            this.element.removeChild(this.toast)
        }
    }
}
export function tl_infos (title="Infos", content,onclose=null) {
  
    if (title === "") {
        title="Infos"
    }
    let modal = createdElement("div",{addid:"alert-modal",})
    let addhtml= `
        <div alert-content="d" style="min-width:300px;max-width:310px">
            <h3 alert-content="title" style='margin-bottom: 0'>
                ${title}
            </h3>
            <div style='padding:0;margin:0' alert-content="content">
                ${content}
            </div>
            <button class="btn-5 dark-btn tl_fw-bold" alert-content="ended">
                OK
            </button>
        
        </div>
        `
    modal.htmlThis(addhtml)
    bodyAppend(modal)

    Qs("#alert-modal","click",(e,ev)=>{
        if (ev.target === e) {
            bodyRemove(modal);
        }
    })
    Qst('[alert-content="ended"]',"click",(e,ev)=>{
        if (onclose !== null ) {
            onclose ();
        }
        bodyRemove(modal)
    })
    Qst('[alert-content="d"]').setAttribute('alert-set',"")
}
export function tl_alert (title="Alert", content,onclose=null) {
  
    if (title === "") {
        title="Alert"
    }
    let modal = createdElement("div",{addid:"alert-modal",})
    let addhtml= `
        <div alert-content="d">
        <h3 alert-content="title">
            ${title}
        </h3>
        <div alert-content="content">
            ${content}
        </div>
        <button class="btn-5 dark-btn tl_fw-bold" alert-content="ended">
            OK
        </button>
        
        </div>
        `
    modal.htmlThis(addhtml)
    bodyAppend(modal)

    Qs("#alert-modal","click",(e,ev)=>{
        if (ev.target === e) {
            if (onclose !== null ) {
                onclose ();
            }
            bodyRemove(modal);
            
        }
    })
    Qst('[alert-content="ended"]',"click",(e,ev)=>{
        if (onclose !== null ) {
            onclose ();
        }
        bodyRemove(modal)
    })
    Qst('[alert-content="d"]').setAttribute('alert-set',"")
}
export function mapToObject(map) {
    const object = {};
    for (let [key, value] of map) {
      object[key] = value;
    }
    return object;
}
export function objectToList (map) {
    return Object.values(map).map(value => value)
}
Array.prototype.searched = function (key,value) {
    let newArray = []
    
    if (value === "*" || value === "" || key === "*" || key === "") {
        newArray = this
    }
    else {
        this.forEach((val,index)=>{
            if (this[index][key] !== null && this[index][key] !== undefined ) {
                if (this[index][key].toString().toLowerCase().includes(value.toString().toLowerCase())) {
                    newArray.push(val)
                }
            }
        })
    }
    return newArray;
}
Array.prototype.filtre = function (key,value) {
    let newArray = []
    if (value === "*" ) {
        newArray = this
    }
    if (value === 0) {
       newArray = this
    }
    else {
        this.forEach((val,index)=>{
            if (value === this[index][key]) {
                newArray.push(val)
            }
        })
    }
    return newArray;
}
// WillbeId = Qs('.will_be_there');
HTMLElement.prototype.hideThis = hideThis;
SVGElement.prototype.hideThis = hideThis;
HTMLElement.prototype.showThis = showThis;
SVGElement.prototype.showThis = showThis;
NodeList.prototype.hideThis = hideThis;
NodeList.prototype.showThis = showThis;
HTMLElement.prototype.getData = getData;
HTMLElement.prototype.setData = setData;
HTMLElement.prototype.textThis = textThis;
HTMLElement.prototype.htmlThis = htmlThis;
SVGElement.prototype.htmlThis = htmlThis;
HTMLElement.prototype.thisParent = thisParent;
SVGElement.prototype.thisParent = thisParent;
HTMLElement.prototype.thisNextSibling = thisNextSibling;
SVGElement.prototype.thisNextSibling = thisNextSibling;
HTMLElement.prototype.thisPreviousSibling = thisPreviousSibling;
SVGElement.prototype.thisPreviousSibling = thisPreviousSibling;
HTMLElement.prototype.QSs = QSs;
HTMLElement.prototype.QSst = QSst;
SVGElement.prototype.QSs = QSs;
SVGElement.prototype.QSst = QSst;
HTMLElement.prototype.valueThis = valueThis;
HTMLElement.prototype.replaceClass = replaceClass;
SVGElement.prototype.replaceClass = replaceClass;
NodeList.prototype.replaceClass = replaceClass;
HTMLElement.prototype.addClass = addClass;
SVGElement.prototype.addClass = addClass;
NodeList.prototype.addClass = addClass;
HTMLElement.prototype.removeClass = removeClass;
SVGElement.prototype.removeClass = removeClass;
HTMLElement.prototype.containsClass = containsClass;
SVGElement.prototype.containsClass = containsClass;
SVGElement.prototype.containsClass = containsClass;
NodeList.prototype.removeClass = removeClass;

//QRCode  gene from gitHub js


//======================================================EXEMPLE DE MANIPULATION D'URL=========================================================



// let rowlink = document.querySelectorAll('.table-row-link');
// var modal = Qs('.code_modal');
// window.onclick = function(event){
//     if(event.target === modal){
//         modal.styleThis('display','none');
//         removeURLParameter('user_id');
//     }
// }
// Vérifier si l'URL actuelle contient des paramètres
// var urlAvecParametres = window.location.href;

// // Fonction de rappel pour l'événement beforeunload
// function removeURLParameter(parameter) {
//     var urlParams = new URLSearchParams(window.location.search);
//     urlParams.delete(parameter);
//     var newURL = window.location.pathname + '?' + urlParams.toString();
//     window.history.replaceState({}, '', newURL);
// }
// let personnalReload = false;
// // Ajouter l'événement beforeunload à la fenêtre
// window.addEventListener('beforeunload',()=>{
//     personnalReload = true;
//     removeURLParameter('user_id');
// } );

// Qs('.edit_td','click',(e)=>{
    
//     Id = getData(e,'user_id');
//     WillbeId.value = Id;
//     // JSSend('GET', '', { user_id: Id }, function(success, response) {
//     //     if (success) {
            
//     //     } else {
//     //     // Gérez l'erreur de requête AJAX
//     //     console.error(response);
//     //     }
//     // });
//     var nouvelleId = Id;
            
//             // Obtenir les paramètres de l'URL actuelle
//             var urlParams = new URLSearchParams(window.location.search);
            
//             // Vérifier si d'autres paramètres sont déjà présents dans l'URL
//             if (urlParams.toString() !== '') {
//                 // Ajouter le nouveau paramètre à l'URL existante
//                 if (urlParams.has('user_id')) {
//                 // Mettre à jour la valeur du paramètre 'id'
//                     urlParams.set('user_id', nouvelleId);
//                 } else {
//                     // Ajouter le paramètre 'id' à l'URL
//                     urlParams.append('user_id', nouvelleId);
//                 }
//             } else {
//                 // Ajouter le paramètre 'id' à une URL sans paramètres existants
//                 if (!personnalReload) {
//                 urlParams.set('user_id', nouvelleId);}
//             }
            
//             // Obtenir l'URL actuelle sans les paramètres
//             var urlActuelle = window.location.href.split('?')[0];
//             animat = Qs('.anim-container');
//             animat.styleThis('display','flex');
            
//             // Construire la nouvelle URL avec les paramètres mis à jour
//             var nouvelleUrl = urlActuelle + '?' + urlParams.toString();
            
//             // Mettre à jour l'URL sans rechargement de la page
//             window.history.pushState(null, null, nouvelleUrl);
//             window.location.reload(); 
//             window.onload = function() {
//                 // Afficher le modal après le rechargement complet de la page
//                 modal.styleThis('display','flex');
//             };

// });