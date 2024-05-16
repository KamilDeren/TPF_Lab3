// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC2HfK8s2v0Iuei8FNRmda_8PYsFXKcuNg",
    authDomain: "tpflab4-7249f.firebaseapp.com",
    projectId: "tpflab4-7249f",
    storageBucket: "tpflab4-7249f.appspot.com",
    messagingSenderId: "309126549062",
    appId: "1:309126549062:web:22f543a248d5c7e490c447"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();

const signInButton = document.querySelector("#signInButton");
const signOutButton = document.querySelector("#signOutButton");

const userSignIn = async () => {
    signInWithPopup(auth, provider).then((result) => {
        const user = result.user;
        console.log(user);
        injectUserDataIntoForm(user);
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        handleAuthError(errorCode, errorMessage);
    })
}
const userSignOut = async () => {
    signOut(auth).then(() => {
        alert("You have been signed out!")
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    })
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        alert("You are authenticated with Google");
        console.log(user);
    }
})

const injectUserDataIntoForm = (user) => {
    // Pobierz referencje do pól formularza
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('exampleInputEmail1');

    // Wstrzyknij dane użytkownika do formularza
    firstNameInput.value = user.displayName ? user.displayName.split(' ')[0] : '';
    lastNameInput.value = user.displayName ? user.displayName.split(' ')[1] : '';
    emailInput.value = user.email ? user.email : '';
}

const handleAuthError = (errorCode, errorMessage) => {
    // Wyświetl komunikat błędu autentykacji na stronie lub w innym formacie
    console.error("Authentication error:", errorCode, errorMessage);
    alert("Authentication error: " + errorMessage);
}

signInButton.addEventListener("click", userSignIn);
signOutButton.addEventListener("click", userSignOut);
