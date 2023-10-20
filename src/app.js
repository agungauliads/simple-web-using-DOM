function signup() {
  event.preventDefault();

  let email = document.getElementById("email").value;
  let username = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  let user = {
    email: email,
    username: username,
    password: pass,
  };

  let json = JSON.stringify(user);
  localStorage.setItem(username, json);
  window.location.href = "loginPage.html";
  console.log("user berhasil dibuat");
}

function loginFunc() {
  event.preventDefault();

  let username = document.getElementById("username").value;
  let pass = document.getElementById("password").value;
  let result = document.getElementById("result");
  //  let nick = document.getElementById("nick").value;

  let user = localStorage.getItem(username);
  let data = JSON.parse(user);

  console.log(data);

  if (user == null) {
    result.innerHTML = "username nya salah bang";
  } else if (username == data.username && pass == data.password) {
    result.innerHTML = "masuk pak eko..";
    window.location.href = "home.html";
    //   nick.innerHTML = data.username
  } else {
    result.innerHTML = "password nya salah bang";
  }
}

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
    html += `<td class="bg-gray-800 border text-left px-8 py-4">${element.imgUrl}</td>`;
    html +=
      '<td><button onclick="deleteResep(' +
      index +
      ')" class="bg-red-600 rounded-md p-2 text-white">Delete</button>';
    html +=
      '<td><button onclick="updateResep(' +
      index +
      ')" class="bg-yellow-600 rounded-md p-2 text-white">Edit</button>';
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

function updateData(index) {
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
  document.getElementById("urlImg").value = listResep[index].imgUrl;

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
