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
                        <label class="label" for="title">
                            Pavadinimas
                        </label>
                        <div class="control">
                            <input
                                class="input"
                                type="text"
                                id="title"
                                v-model="title"
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
                                    value="income"
                                    v-model="radioType"
                                />
                                Pajamos
                            </label>
                            <label class="radio">
                                <input
                                    type="radio"
                                    name="answer"
                                    value="cost"
                                    v-model="radioType"
                                />
                                Išlaidos
                            </label>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label" for="comment">Komentaras</label>
                        <div class="control">
                            <textarea
                                class="input"
                                v-model="comment"
                                type="text"
                                id="comment"
                                placeholder="Čia galima pasirašyti sau komentara"
                            />
                        </div>
                    </div>

                    <div class="field is-grouped">
                        <div class="control">
                            <button
                                class="button is-primary is-rounded"
                                :class="loading && 'is-loading'"
                                type="submit"
                            >
                                Pridėti
                            </button>
                        </div>
                        <div class="control">
                            <router-link
                                to="/finance"
                                class="button is-primary is-rounded is-outlined"
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
            title: "",
            comment: "",
            user: firebase.auth().currentUser.uid,
            notification: false,
            Message: "",
            loading: false,
            type: "",
            radioType: "",
        };
    },
    methods: {
        add() {
            if (this.title.length > 1 && this.type != '') {
                this.loading = true;
                firebase
                    .firestore()
                    .collection("users")
                    .doc(this.user)
                    .collection(this.radioType)
                    .add({
                        title: this.title,
                        comment: this.comment,
                        type: this.radioType,
                        totalSum: 0,
                        totalQuantity: 0,
                        totalAveraged: 0,
                    })
                    .then((doc) => {
                        this.$router.push(`/users/${this.user}/${this.radioType}/${doc.id}`);
                    })
                    .catch((error) => {
                        (this.loading = false),
                            (this.notification = true),
                            (this.type = "is-danger"),
                            (this.Message = `Įvyko klaida: ${error.message}`);
                    });
            } else {
                this.notification = true,
                this.type = "is-danger",
                this.Message = 'Įveskite pavadinima ir kategorija.' 
            }
        },
    },
};
</script>

<style>
.cont-wide {
    max-width: 650px;
}
</style>
