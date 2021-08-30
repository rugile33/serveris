async function parodytiZmones() {
    const list = await getZmones();
    const div = document.getElementById("sarasas");
    clearNode(div);
    const listEl = document.createElement("ul");
    for (const zmogus of list) {
        const listItem = document.createElement("li");
        listItem.attributes.zmogusId = zmogus.id;
        let span = document.createElement("span");
        span.append(document.createTextNode(zmogus.vardas))
        listItem.append(span);
        listItem.append(document.createTextNode(" "));
        span = document.createElement("span");
        span.append(document.createTextNode(zmogus.pavarde))
        listItem.append(span);
        listItem.append(document.createTextNode(" "));
        span = document.createElement("span");
        span.append(document.createTextNode(zmogus.gimimoData.toISOString().substring(0, 10)))
        listItem.append(span);
        listItem.append(document.createTextNode(" "));
        span = document.createElement("span");
        span.append(document.createTextNode(zmogus.alga))
        listItem.append(span);
        listItem.append(document.createTextNode(" "));
        listItem.onclick = showZmogusForma;
        const removeButton = document.createElement("button");
        removeButton.append(document.createTextNode("X"));
        removeButton.attributes.zmogusId = zmogus.id;
        removeButton.onclick = removeZmogusClick;
        listItem.append(removeButton);
        listEl.append(listItem);
    }
    div.append(listEl);
}

async function showZmogusForma(event) {
    const id = event.target.attributes.zmogusId;
    const zmogus = await getZmogus(id);
    if (!zmogus) {
        parodytiZmones();
        return;
    }
    const div = document.getElementById("sarasas");
    clearNode(div);
    div.append(document.createTextNode("Vardas:"));
    let inputElement = document.createElement("input");
    inputElement.id = "vardas";
    inputElement.value = zmogus.vardas;
    inputElement.readOnly = true;
    div.append(inputElement);
    div.append(document.createElement("br"));
    div.append(document.createTextNode("Pavarde:"));
    inputElement = document.createElement("input");
    inputElement.id = "pavarde";
    inputElement.value = zmogus.pavarde;
    inputElement.readOnly = true;
    div.append(inputElement);
    div.append(document.createElement("br"));
    div.append(document.createTextNode("Gimimo diena:"));
    inputElement = document.createElement("input");
    inputElement.id = "gimimoData";
    inputElement.type = "date";
    inputElement.value = zmogus.gimimoData.toISOString().substring(0, 10);
    inputElement.readOnly = true;
    div.append(inputElement);
    div.append(document.createElement("br"));
    div.append(document.createTextNode("Alga:"));
    inputElement = document.createElement("input");
    inputElement.id = "alga";
    inputElement.type = "number";
    inputElement.value = zmogus.alga;
    inputElement.readOnly = true;
    div.append(inputElement);
    div.append(document.createElement("br"));
    let closeButton = document.createElement("button");
    closeButton.append(document.createTextNode("Close"));
    closeButton.onclick = parodytiZmones;
    div.append(closeButton);
}

function addZmogusForma() {
    const div = document.getElementById("sarasas");
    clearNode(div);
    div.append(document.createTextNode("Vardas:"));
    let inputElement = document.createElement("input");
    inputElement.id = "vardas";
    div.append(inputElement);
    div.append(document.createElement("br"));
    div.append(document.createTextNode("Pavarde:"));
    inputElement = document.createElement("input");
    inputElement.id = "pavarde";
    div.append(inputElement);
    div.append(document.createElement("br"));
    div.append(document.createTextNode("Gimimo diena:"));
    inputElement = document.createElement("input");
    inputElement.id = "gimimoData";
    inputElement.type = "date";
    div.append(inputElement);
    div.append(document.createElement("br"));
    div.append(document.createTextNode("Alga:"));
    inputElement = document.createElement("input");
    inputElement.id = "alga";
    inputElement.type = "number";
    div.append(inputElement);
    div.append(document.createElement("br"));
    let saveButton = document.createElement("button");
    saveButton.append(document.createTextNode("Save"));
    saveButton.onclick = saveZmogus;
    div.append(saveButton);
    let cancelButton = document.createElement("button");
    cancelButton.append(document.createTextNode("Cancel"));
    cancelButton.onclick = parodytiZmones;
    div.append(cancelButton);
}

async function saveZmogus() {
     const vardas = document.getElementById("vardas").value;
     const pavarde = document.getElementById("pavarde").value;
     const gimimoData = document.getElementById("gimimoData").value;
     const alga = document.getElementById("alga").value;
     const naujasZmogus = {
         vardas,
         pavarde,
         gimimoData,
         alga: parseFloat(alga)
     };
     await addZmogus(naujasZmogus);
     parodytiZmones();
}

function clearNode(node) {
    while (node.firstChild) {
        node.firstChild.remove();
    }
}

async function removeZmogusClick(event) {
    const id = event.target.attributes.zmogusId;
    await deleteZmogus(id);
    await parodytiZmones();
}