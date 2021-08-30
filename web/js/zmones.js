let nextId = 4;
const zmones = [
    {
        id: 1,
        vardas: "Jonas",
        pavarde: "Jonaitis",
        gimimoData: new Date(1999, 7, 4),
        alga: 5000.01
    },
    {
        id: 2,
        vardas: "Petras",
        pavarde: "Petraitis",
        gimimoData: new Date(1985, 1, 3),
        alga: 938.51
    },
    {
        id: 3,
        vardas: "Antanas",
        pavarde: "Antanaitis",
        gimimoData: new Date(1940, 11, 11),
        alga: 438.51
    }
];

function getZmonesVietinis() {
    return zmones.slice(0);
}
async function getZmones() {
    try {
        const sarasas = await fetch("/zmones").then(res => res.json());
        for (const zmogus of sarasas) {
            zmogus.gimimoData = new Date(zmogus.gimimoData);
        }
        return sarasas;
    } catch (err) {
        console.error("Klaida skaitant zmones");
        return [];
    }
}

/*
    {
        vardas: "Petras",
        pavarde: "Petraitis",
        gimimoData: "1985-12-31",
        alga: 938.51
    }
*/

function addZmogusVietinis(zmogus) {
    if (typeof zmogus !== "object") {
        return;
    }
    if (typeof zmogus.vardas !== "string") {
        return;
    }
    if (typeof zmogus.pavarde !== "string") {
        return;
    }
    // 2021-08-25
    if (typeof zmogus.gimimoData === "string") {
        let dateTest = new Date(zmogus.gimimoData);
        if (isNaN(dateTest.getTime())) {
            return;
        }
    } else if (!(zmogus.gimimoData instanceof Date)) {
        return;
    }
    if (typeof zmogus.alga !== "number") {
        return;
    }
    zmogus = Object.assign({}, zmogus, {id: nextId++});
    if (typeof zmogus.gimimoData === "string") {
        zmogus.gimimoData = new Date(zmogus.gimimoData);
    }
    zmones.push(zmogus);
}
async function addZmogus(zmogus) {
    if (typeof zmogus !== "object") {
        return;
    }
    if (typeof zmogus.vardas !== "string") {
        return;
    }
    if (typeof zmogus.pavarde !== "string") {
        return;
    }
    // 2021-08-25
    if (typeof zmogus.gimimoData === "string") {
        let dateTest = new Date(zmogus.gimimoData);
        if (isNaN(dateTest.getTime())) {
            return;
        }
    } else if (!(zmogus.gimimoData instanceof Date)) {
        return;
    }
    if (typeof zmogus.alga !== "number") {
        return;
    }
    zmogus = Object.assign({}, zmogus);
    if (typeof zmogus.gimimoData === "string") {
        zmogus.gimimoData = new Date(zmogus.gimimoData);
    }
    await fetch("/zmones/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(zmogus)
    });
}

function deleteZmogusVidinis(id) {
    const index = zmones.findIndex(z => z.id === id);
    if (index >= 0) {
        zmones.splice(index, 1);
    }
}
async function deleteZmogus(id) {
    await fetch("/zmones/" + id, {
        method: "DELETE"
    });
}

function getZmogusVidinis(id) {
    return zmones.find(z => z.id === id);
}
async function getZmogus(id) {
    const zmogus = await fetch("/zmones/" + id).then(res => res.json());
    zmogus.gimimoData = new Date(zmogus.gimimoData);
    return zmogus;
}
