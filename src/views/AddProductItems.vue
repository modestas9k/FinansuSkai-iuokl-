<template>
    <div class="add">
        <div class="section">
            <div class="container center">
                <form v-on:submit.prevent="add" class="box cont-wide">
                    <h1 class="title is-2">Pridėti nauja įraša</h1>
                    <Notification
                        v-if="notification"
                        v-on:close="notification = false"
                        :type="type"
                        :message="Message"
                    />

                    <div class="field">
                        <label class="label" for="kiekis">Kiekis</label>
                        <div class="control">
                            <input
                                class="input"
                                v-model="kiekis"
                                type="number"
                                placeholder="Skaičius parduotu prekiu"
                                id="kiekis"
                                required
                            />
                        </div>
                    </div>

                    <div class="field">
                        <label class="label" for="kaina">Kaina</label>
                        <div class="control">
                            <input
                                class="input"
                                v-model="kaina"
                                type="number"
                                step=".01"
                                placeholder="Vieneto kaina"
                                id="kaina"
                                required
                            />
                        </div>
                    </div>
                    <div class="field">
                        <label class="label" for="data">Data</label>
                        <div class="control">
                            <input
                                class="input"
                                v-model="data"
                                type="date"
                                id="data"
                                required
                            />
                        </div>
                    </div>

                    <div class="field buttons">
                        <button
                            class="button is-primary"
                            :class="loading && 'is-loading'"
                            type="submit"
                        >
                            Pridėti
                        </button>

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
        let todaysDate = new Date();
        let year = todaysDate.getFullYear();
        let month = (todaysDate.getMonth() + 1).toString().padStart(2, "0");
        let date = todaysDate
            .getDate()
            .toString()
            .padStart(2, "0");

        return {
            kiekis: Number,
            kaina: Number,
            data: `${year}-${month}-${date}`,
            notification: false,
            Message: "",
            loading: false,
            collection: "",
        };
    },
    methods: {
        add() {
            this.loading = true;
            firebase
                .firestore()
                .collection(this.$route.params.type)
                .doc(this.$route.params.id)
                .collection("irasai")
                .add({
                    kiekis: this.kiekis,
                    kaina: this.kaina,
                    data: this.data,
                })

                .then(() => {
                    (this.loading = false),
                        (this.notification = true),
                        (this.type = "is-success"),
                        (this.Message =
                            "Sėkmingai pridėjote nauja sritį/ produkta"),
                        this.$router.push(
                            `/product/${this.$route.params.type}/${this.$route.params.id}`
                        );
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

<style scoped>
.cont-wide {
    max-width: 650px;
}
.center {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
