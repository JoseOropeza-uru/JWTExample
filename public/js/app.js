let xhr = new XHR();
let token = "";

function $(id) {
    return document.getElementById(id);
};

function logIn() {
    if ($('ced').value.trim() !== "" && $('pass').value.trim() !== "") {
        xhr.post('../session/login', {
                ced: $('ced').value.trim(),
                password: $('pass').value.trim()
            }, {})
            .then(data => {
                console.log('log In Successful', data)
                token = data.token
            })
            .catch(err => {
                console.error(err)
            });
    } else {
        alert('Ingrese todos los campos porfavor');
    }
}

function getValue() {
    // if (token!=="") {
    xhr.get('../session/value', {}, {
            "Authorization": `Bearer ${token}`
        })
        .then(data => {
            console.log(data)
        })
        .catch(err => {
            console.log(err)
        });
    // }else{
    //     alert('Token no existe');
    // }
}

function logOut() {
    // if (token!=="") {
        xhr.get('../session/logout', {}, {})
        .then(data => {
            console.log(data)
            token = ""
        })
        .catch(err => console.log(err));    
    // }else{
    //     alert('No existe una sesion');
    // }
    
}

$('logIn').addEventListener('click', logIn);
$('logOut').addEventListener('click', logOut);
$('getValue').addEventListener('click', getValue);