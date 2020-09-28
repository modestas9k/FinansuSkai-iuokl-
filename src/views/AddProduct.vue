<template>
    <div class="add">
        <div class="section">
            <div class="container cont-wide">
                <form v-on:submit.prevent="add" class="box">
                    <h1 class="title is-2">Pridėti nauja sritį</h1>
                    <Notification
                        v-if="notification"
                        v-on:close="notification = false"
                        :type="type"
                        :message="Message"
                    />

                    <div class="field">
                        <label class="label" for="pavadinimas">
                            Pavadinimas
                        </label>
                        <div class="control">
                            <input
                                class="input"
                                type="text"
                                id="pavadinimas"
                                v-model="pavadinimas"
                                placeholder="Sritis arba produktas"
                                required
                            />
                        </div>
                    </div>
                    <div class="field">
                        <div class="control">
                            <label class="radio">
                                <input
                                    type="radio"
                                    name="answer"
                                    value="pajamos"
                                    v-model="type"
                                />
                                Pajamos
                            </label>
                            <label class="radio">
                                <input
                                    type="radio"
                                    name="answer"
                                    value="islaidos"
                                    v-model="type"
                                />
                                Išlaidos
                            </label>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label" for="komentaras">Komentaras</label>
                        <div class="control">
                            <textarea
                                class="input"
                                v-model="komentaras"
                                type="text"
                                id="komentaras"
                                placeholder="Čia galima pasirašyti sau komentara"
                            />
                        </div>
                    </div>

                    <div class="field is-grouped">
                        <div class="control">
                            <button
                                class="button is-primary"
                                :class="loading && 'is-loading'"
                                type="submit"
                            >
                                Pridėti
                            </button>
                        </div>
                        <div class="control">
                            <router-link
                                to="/finance"
                                class="button is-primary is-outlined"
                            >
                                Atgal
                            </router-link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Notification from "../components/Notification";
export default {
    name: "add",
    components: { Notification },
    data() {
        return {
            pavadinimas: "",
            komentaras: "",
            user: firebase.auth().uid,
            notification: false,
            Message: "",
            loading: false,
            type: "",
        };
    },
    methods: {
        add() {
            this.loading = true;
            firebase
                .firestore()
                .collection(this.type)
                .add({
                    pavadinimas: this.pavadinimas,
                    komentaras: this.komentaras,
                    uid: firebase.auth().currentUser.uid,
                    type: this.type,
                })
                .then((doc) => {
                    this.$router.push(`/product/${this.type}/${doc.id}`);
                })
                .catch((error) => {
                    (this.loading = false),
                        (this.notification = true),
                        (this.type = "is-danger"),
                        (this.Message = `Įvyko klaida: ${error.message}`);
                });
        },
    },
};
</script>

<style>
.cont-wide {
    max-width: 650px;
}
</style>
