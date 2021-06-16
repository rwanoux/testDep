
document.body.onload = async function () {


    let urlDep = "./departements-region.json";
    fetch(urlDep)
        .then(rep => {
            // objetDep = JSON.parse(rep);
            rep.json().then(object => {
                buildRegions(object)
            })
        });


}


function buildRegions(obj) {
    let regSelectEl = document.getElementById('reg');
    let regList = [];
    //creation liste région
    for (let dep of obj) {
        if (regList.indexOf(dep.region_name) == -1) {
            regList.push(dep.region_name)
        }
    }
    //creation options regions
    for (let reg of regList) {
        let optEl = document.createElement('option');
        optEl.value = optEl.innerText = reg;

        regSelectEl.append(optEl)
    };

    //creation de l'écouteur onchange sur le select region
    regSelectEl.onchange = function (ev) {
        //creation des departements sur le onchange
        buildDep(ev, obj)
    }


}

function buildDep(ev, obj) {
    let selectedRegion = ev.currentTarget.value;//valeur de la region selected
    let depList = [];//init de la list departement
    let depSelectEl = document.getElementById('dep');//cibler le select departement
    depSelectEl.innerHTML = " ";//ré-init  le select departement

    //remplir la liste departement
    for (let dep of obj) {
        if (dep.region_name === selectedRegion) { depList.push(dep) }
    };

    //un element option par departement de la liste
    for (let dep of depList) {
        let optEl = document.createElement('option');
        optEl.value = dep.num_dep;
        optEl.innerText = dep.dep_name + " / " + dep.num_dep;

        depSelectEl.append(optEl)
    };
    //on affiche le select departement
    depSelectEl.hidden = false;

    //on ajoute l'écouteur sur le onchange
    depSelectEl.onchange = function (ev) {
        let depNum = depSelectEl.value;

        prepareCommCodes(depNum)

    }


}


function prepareCommCodes(depNum) {
    let urlCodes = "./code_postaux.json";
    fetch(urlCodes).then(rep => {
        rep.json().then(object => {
            buildCodes(object, depNum);
        })
    });
}
function buildCodes(obj, depNum) {
    let commList = obj.filter(com => com.codePostal.indexOf(depNum) == 0);
    let codeListe = [];
    let codeSelectEl = document.getElementById('code');
    codeSelectEl.innerHTML = "";
    commList.forEach(com => {
        if (codeListe.indexOf(com.codePostal) == -1) {
            codeListe.push(com.codePostal)
        }
    });
    codeListe.sort();
    codeListe.forEach(code => {
        let opt = document.createElement('option');
        opt.value = opt.innerText = code;
        codeSelectEl.append(opt)
    });
    codeSelectEl.hidden = false
    codeSelectEl.onchange = function (ev) {
        buildCom(obj, codeSelectEl.value)
    }

}
function buildCom(obj, codePostal) {
    let comSelectEl = document.getElementById('comm');
    comSelectEl.innerHTML = "";
    let comListe = obj.filter(com => com.codePostal == codePostal);
    comListe.forEach(com => {
        let opt = document.createElement('option');
        opt.value = opt.innerText = com.nomCommune;
        comSelectEl.append(opt)
    });
    comSelectEl.hidden = false


}
