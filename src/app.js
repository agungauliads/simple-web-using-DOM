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
    window.location.href="loginPage.html"
    console.log("user berhasil dibuat");
}

function loginFunc() {
    event.preventDefault();

    let username = document.getElementById("username").value;
    let pass = document.getElementById("password").value;
    let result = document.getElementById("result");

    let user = localStorage.getItem(username);
    let data = JSON.parse(user);

    console.log(data);

    if (user == null) {
        result.innerHTML = "username nya salah bang";
    } else if (username == data.username && pass == data.password) {
        result.innerHTML = "masuk pak eko..";
        window.location.href="home.html"
    } else {
        result.innerHTML = "password nya salah bang";
    }
}
