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

                    <div class="field mb-5">
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
                    <div class="tabs is-boxed mb-0">
                        <ul>
                            <li :class="[select === 'suma' ? 'is-active' : '']" @click="select='suma'"><a>Suma</a></li>
                            <li :class="[select === 'vidKaina' ? 'is-active' : '']" @click="select='vidKaina'"><a>Vidutine kaina</a></li>
                        </ul>
                    </div>
                   <div v-if=" this.select === 'suma' ">
                        <div class="field mb-5">
                            <div class="control">
                                <input
                                    class="input"
                                    v-model="suma"
                                    type="number"
                                    step=".1"
                                    placeholder="Visa suma"
                                    id="suma"
                                    required
                                />
                            </div>
                        </div>
                   </div>
                   <div v-if=" this.select === 'vidKaina' ">
                        <div class="field mb-5">
                            <div class="control">
                                <input
                                    class="input"
                                    v-model="vidKaina"
                                    type="number"
                                    step=".1"
                                    placeholder="Vieneto kaina"
                                    id="kaina"
                                    required
                                />
                            </div>
                        </div>
                   </div>
                    <div class="field mb-5">
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
                            class="button is-primary is-rounded"
                            :class="loading && 'is-loading'"
                            type="submit"
                        >
                            Pridėti
                        </button>

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
        let todaysDate = new Date();
        let year = todaysDate.getFullYear();
        let month = (todaysDate.getMonth() + 1).toString().padStart(2, "0");
        let date = todaysDate
            .getDate()
            .toString()
            .padStart(2, "0");

        return {
            kiekis: "",
            kaina: "",
            vidKaina: "",
            suma: "",
            select: "suma",
            data: `${year}-${month}-${date}`,
            notification: false,
            Message: "",
            loading: false,
            collection: "",
        };
    },
    methods: {
        calculate() {
            if(Number(this.suma) > 0) {
               this.kaina = Number(this.suma) / Number(this.kiekis);
            } else {
                this.kaina = Number(this.vidKaina);
            }
        },

        add() {
            this.calculate();
            this.loading = true;
            if(this.kiekis && this.kaina && this.data) {

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
            }
        },
    },
};
</script>

<style scoped>
.cont-wide {
    width: 100%;
    max-width: 750px;
    min-width: 300px;
}
.center {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
