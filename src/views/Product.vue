<template>
    <div class="product">
        <Header />
        <div class="section">
            <div class="container">
                <div class="buttons">
                    <router-link
                        :to="
                            `/product/${this.$route.params.type}/${produktas.id}/add`
                        "
                        class="button is-primary"
                    >
                        Pridėti nauja įraša
                    </router-link>
                </div>
                <div class="box">
                    <div class="columns has-text-weight-semibold">
                        <div class="column ">
                            <h5 class="has-text-weight-bold">Pavadinimas</h5>
                        </div>
                        <div class="column">
                            <h5 class="has-text-weight-bold">Suma</h5>
                        </div>
                        <div class="column">
                            <h5 class="has-text-weight-bold">Kiekis</h5>
                        </div>
                        <div class="column">
                            <h5 class="has-text-weight-bold">Vidutinė kaina</h5>
                        </div>
                        <div class="column">
                            <h5 class="has-text-weight-bold">Data</h5>
                        </div>
                        <div class="column">
                            <h5 class="has-text-weight-bold">Komentaras</h5>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column">
                            <h5>{{ produktas.pavadinimas }}</h5>
                        </div>
                        <div class="column">
                            <h5>{{ `${suma(irasai)} €` }}</h5>
                        </div>
                        <div class="column">
                            <h5>{{ `${kiekis(irasai)}` }}</h5>
                        </div>
                        <div class="column">
                            <h5>{{ `${vidurkis(irasai)} €` }}</h5>
                        </div>
                        <div class="column">
                            <h5>{{ `${firstLastData(irasai)}` }}</h5>
                        </div>
                        <div class="column">
                            <h5>{{ produktas.komentaras }}</h5>
                        </div>
                    </div>
                </div>
                <div class="box">
                    <div class="columns">
                        <div class="column">
                            <h5 class="has-text-weight-bold">Kiekis</h5>
                        </div>
                        <div class="column">
                            <h5 class="has-text-weight-bold">Kaina</h5>
                        </div>
                        <div class="column">
                            <h5 class="has-text-weight-bold">Data</h5>
                        </div>
                    </div>
                    <div class="columns " v-for="list in irasai" :key="list.id">
                        <div class="column ">
                            <h5>{{ list.kiekis }}</h5>
                        </div>
                        <div class="column ">
                            <h5>{{ list.kaina }}</h5>
                        </div>
                        <div class="column ">
                            <h5>{{ list.data }}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from "../components/Header";
import firebase from "firebase/app";
import "firebase/firestore";
export default {
    name: "product",
    components: { Header },
    data() {
        return {
            produktas: {},
            irasai: [],
        };
    },
    methods: {
        suma(array) {
            let answer = 0;
            array.forEach((obj) => {
                answer += obj.kiekis * obj.kaina;
            });
            return answer;
        },
        kiekis(array) {
            let answer = 0;
            array.forEach((obj) => {
                answer += obj.kiekis;
            });
            return answer;
        },
        firstLastData(array) {
            if (array.length != 0) {
                let first = array[0].data;
                const lastfromArray = array.length - 1;
                let last = array[lastfromArray].data;
                return first + " / " + last;
            }
        },
        vidurkis(array) {
            let number = 0;
            let spliter = 0;
            array.forEach((obj) => {
                number += obj.kaina;
                spliter += 1;
            });
            let answer = number / spliter;
            return answer.toFixed(2);
        },
    },
    beforeMount() {
        firebase
            .firestore()
            .collection(this.$route.params.type)
            // .where("uid", "==", firebase.auth().currentUser.uid)
            .doc(this.$route.params.id)
            .get()
            .then((doc) => {
                this.produktas = {
                    id: doc.id,
                    pavadinimas: doc.data().pavadinimas,
                    komentaras: doc.data().komentaras,
                    uid: doc.data().uid,
                };
                firebase
                    .firestore()
                    .collection(this.$route.params.type)
                    .doc(this.$route.params.id)
                    .collection("irasai")
                    .get()
                    .then((doc) => {
                        doc.docs.forEach((prod) => {
                            this.irasai.push({
                                id: prod.id,
                                kiekis: Number(prod.data().kiekis),
                                kaina: Number(prod.data().kaina),
                                data: prod.data().data,
                            });
                        });
                    });
            });
    },
};
</script>

<style></style>
