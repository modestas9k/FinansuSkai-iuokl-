<template>
    <div class="finance">
        <Header />
        <div class="section">
            <div class="container">
                <div class="buttons">
                    <router-link to="/AddProduct" class="button is-primary">
                        Pridėti nauja sritį
                    </router-link>
                </div>
                <table class="table is-hoverable is-fullwidth">
                    <thead>
                        <tr>
                            <th>Pajamos</th>
                            <th>Suma</th>
                            <th>Kiekis</th>
                            <th>Vidutinė kaina</th>
                            <th>Data</th>
                            <th>Išsamiau</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="list in pajamos" :key="list.id">
                            <td>{{ list.pavadinimas }}</td>
                            <td>{{ `${list.suma} €` }}</td>
                            <td>{{ list.bendrasKiekis }}</td>
                            <td>{{ `${list.vidutineKaina} €` }}</td>
                            <td>{{ list.firstLastData }}</td>

                            <td>
                                <router-link
                                    :to="`/product/pajamos/${list.id}`"
                                >
                                    <button class="button is-success">+</button>
                                </router-link>
                            </td>
                        </tr>
                        <tr>
                            <th>Išlaidos</th>
                            <th>Suma</th>
                            <th>Kiekis</th>
                            <th>Vidutinė kaina</th>
                            <th>Data</th>
                            <th>Išsamiau</th>
                        </tr>
                        <tr v-for="list in islaidos" :key="list.id">
                            <td>{{ list.pavadinimas }}</td>
                            <td>{{ `${suma(irasai)} €` }}</td>
                            <td>{{ kiekis(irasai) }}</td>
                            <td>{{ `${vidurkis(irasai)} €` }}</td>
                            <td>{{ firstLastData(irasai) }}</td>

                            <td>
                                <router-link
                                    :to="`/product/islaidos/${list.id}`"
                                >
                                    <button class="button is-success">+</button>
                                </router-link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import Header from "../components/Header";
import firebase from "firebase/app";
import "firebase/firestore";
export default {
    name: "finance",
    components: { Header },
    data() {
        return {
            pajamos: [],
            islaidos: [],
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
            .collection("pajamos")
            .where("uid", "==", firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) =>
                snapshot.docs.forEach((fDoc) => {
                    this.pajamos.push({
                        id: fDoc.id,
                        pavadinimas: fDoc.data().pavadinimas,
                        komentaras: fDoc.data().komentaras,
                        uid: fDoc.data().uid,
                    });
                })
            );

        firebase
            .firestore()
            .collection("islaidos")
            .where("uid", "==", firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                snapshot.docs.forEach((fDoc) => {
                    this.islaidos.push({
                        id: fDoc.id,
                        pavadinimas: fDoc.data().pavadinimas,
                        komentaras: fDoc.data().komentaras,
                        uid: fDoc.data().uid,
                    });

                    firebase
                        .firestore()
                        .collection("islaidos")
                        .doc(fDoc.id)
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
            });
    },
};
</script>

<style></style>
