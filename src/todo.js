const inputResep = document.getElementById("inputResep");
const daftarResep = document.getElementById("daftarResep");
const resep = JSON.parse(localStorage.getItem("resep")) || [];

function tambahResep(){
    const textResep = inputResep.ariaValueMax.trim();
    if(textResep === "") return;

    const input = { text: textResep}
    resep.push(input)

    localStorage.setItem("daftar", JSON.stringify(resep))

    inputResep.value = ""

    tampilkanResep()
}

function deleteResep(index){
    resep.splice(index, 1)

    localStorage.setItem("daftar", JSON.stringify(resep))

    tampilkanResep()
}

function editResep(index){
    const newResepText = prompt("Ubah Resep: ", resep[index].text)

    if(newResepText !== null){
        resep[index].text == newResepText

        localStorage.setItem("daftar", JSON.stringify(resep))

        tampilkanResep()
    }
}

function tampilkanResep(){
    daftarResep.innerHTML = ""

    resep.array.forEach(input, index => {
        const li = document.createElement("li")
        li.innerHTML = `
        <span>${input.text}</span>
        <hr>
        <button onclick="editResep(${index})">Ubah</button>
        <button onclick="deleteResep(${index})">Hapus</button>
        `

        daftarResep.appendChild(li)
    });
}