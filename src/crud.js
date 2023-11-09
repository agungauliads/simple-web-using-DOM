function validateForm() {
    let judul = document.getElementById("judul").value;
    let bahan = document.getElementById("bahan").value;
    let cara = document.getElementById("cara").value;
    let urlImg = document.getElementById("urlImg").value;
  
    if (judul == "") {
      alert("isi Judul");
      return false;
    }
  
    if (bahan == "") {
      alert("isi bahan");
      return false;
    }
  
    if (cara == "") {
      alert("isi caranya");
      return false;
    }
  
    if (urlImg == "") {
      alert("isi Url nya");
      return false;
    }
  
    return true;
  }
  
  function showData() {
    let listResep;
    if (localStorage.getItem("listResep") == null) {
      listResep = [];
    } else {
      listResep = JSON.parse(localStorage.getItem("listResep"));
    }
  
    let html = "";
  
    listResep.forEach(function (element, index) {
      html += `<tr>`;
      html += `<td class="bg-gray-800 border text-left px-8 py-4">${element.judul}</td>`;
      html += `<td class="bg-gray-800 border text-left px-8 py-4">${element.bahan}</td>`;
      html += `<td class="bg-gray-800 border text-left px-8 py-4">${element.cara}</td>`;
      html += `<td class="bg-gray-800 border text-left px-8 py-4">${element.urlImg}</td>`;
      html +=
        '<td><button onclick="deleteResep(' +
        index +
        ')" class="bg-red-600 hover:bg-red-800 rounded-md p-2 text-white">Delete</button>';
      html +=
        '<td><button onclick="updateResep(' +
        index +
        ')" class="bg-yellow-600 hover:bg-yellow-800 rounded-md p-2 text-white">Edit</button>';
    });
  
    document.querySelector("#crudTable tbody").innerHTML = html;
  }
  
  document.onload = showData();
  
  function addResep() {
    if (validateForm() == true) {
      let judul = document.getElementById("judul").value;
      let bahan = document.getElementById("bahan").value;
      let cara = document.getElementById("cara").value;
      let urlImg = document.getElementById("urlImg").value;
  
      let listResep;
      if (localStorage.getItem("listResep") == null) {
        listResep = [];
      } else {
        listResep = JSON.parse(localStorage.getItem("listResep"));
      }
  
      listResep.push({
        judul: judul,
        bahan: bahan,
        cara: cara,
        urlImg: urlImg,
      });
  
      localStorage.setItem("listResep", JSON.stringify(listResep));
      showData();
      document.getElementById("judul").value = "";
      document.getElementById("bahan").value = "";
      document.getElementById("cara").value = "";
      document.getElementById("urlImg").value = "";
    }
  }
  
  function deleteResep(index) {
    let listResep;
    if (localStorage.getItem("listResep") == null) {
      listResep = [];
    } else {
      listResep = JSON.parse(localStorage.getItem("listResep"));
    }
  
    listResep.splice(index, 1);
    localStorage.setItem("listResep", JSON.stringify(listResep));
    showData();
  }
  
  function updateResep(index) {
    document.getElementById("submit").style.display = "none";
    document.getElementById("update").style.display = "block";
  
    let listResep;
    if (localStorage.getItem("listResep") == null) {
      listResep = [];
    } else {
      listResep = JSON.parse(localStorage.getItem("listResep"));
    }
    document.getElementById("judul").value = listResep[index].judul;
    document.getElementById("bahan").value = listResep[index].bahan;
    document.getElementById("cara").value = listResep[index].cara;
    document.getElementById("urlImg").value = listResep[index].urlImg;
  
    document.querySelector("#update").onclick = function () {
      if (validateForm() == true) {
        listResep[index].judul = document.getElementById("judul").value;
        listResep[index].bahan = document.getElementById("bahan").value;
        listResep[index].cara = document.getElementById("cara").value;
        listResep[index].urlImg = document.getElementById("urlImg").value;
  
        localStorage.setItem("listResep", JSON.stringify(listResep));
        showData();
  
        document.getElementById("judul").value = "";
        document.getElementById("bahan").value = "";
        document.getElementById("cara").value = "";
        document.getElementById("urlImg").value = "";
  
        document.getElementById("submit").style.display = "block";
        document.getElementById("update").style.display = "none";
      }
    };
  }