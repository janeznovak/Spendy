function validateEmail(email) {
    //var re = /^[a-zA-Z0-9!@#$%\^&*)(+=._-]*$/;
    var re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return re.test(email);
}

function validateNameAndLastName(nameLastName) {
    var reg = /^[a-z ,.'-]+$/i;
    return reg.test(nameLastName);
}

function prevent() {
    document.getElementById("registrationForm").addEventListener("click", function (event) {
        event.preventDefault();
    });
}

function bandidate() {
    var odgovor = "";

    var ime = $("#first_name").val();

    var priimek = $("#last_name").val();

    var email = $("#email").val();

    var password = $("#password").val();

    var password1 = $("#password2").val();

    var limit = $("#limit").val();

    if (ime === "" || priimek === "" || email === "" || password === "" || password1 === "") {
        odgovor += "Vsa polja morajo biti izpolnjena";
    }

    if (!validateNameAndLastName(ime)) {
        odgovor += "\nIme lahko vsebuje le črke!";
    }

    if (!validateNameAndLastName(priimek)) {
        odgovor += "\nPriimek lahko vsebuje le črke!";
    }

    if (password !== password1) {
        //napaka = true;
        odgovor += "\nGesli morata biti enaki";
    }
    /*if(validateEmail(email)) {
        console.log("OK");
        window.location.pathname = '/login';
    } else {
        console.log("NOT OK");
        window.location.pathname = '/login';
    }*/
    if (!validateEmail(email)) {
        odgovor += "\nEmail naslov je lahko le oblike nekdo@nekaj.com";
    }

    if (odgovor !== "") {
        prevent();
        alert(odgovor);
    }
}

//$("#signIn").on("click", validate);
