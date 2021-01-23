<template>
    <nav
        class="navbar is-dark is-mobile"
        role="navigation"
        aria-label="main navigation"
    >
        <div class="navbar-brand max-width">
            <router-link class="navbar-item" to="/finance">
                <h1 class="title">Finansų skaičiuoklė</h1>
            </router-link>
        </div>
        <div class="buttons">
            <button
                v-if="loggedIn"
                v-on:click="logout()"
                class="button is-danger is-outlined is-rounded"
            >
                Atsijungti
            </button>
        </div>    
    </nav>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
    data() {
        return {
            loggedIn: false,
            email: "",
            links: [
                { name: "Namai", url: "/" },
                { name: "Finansai", url: "/finance" },
            ],
        };
    },
    methods: {
        logout() {
            this.loggedIn = false;
            firebase.auth().signOut();
        },
    },
    beforeMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.loggedIn = true;
                this.email = firebase.auth().currentUser.email;
            }
        });
    },
};
</script>

<style scoped>
nav {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 2px 10px;
}
.title {
    color: white;
    font-size: 1.5em;
}
.max-width {
    max-width: 400px;
}
</style>
