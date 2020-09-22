<template>
    <div class="finanse">
        <Header />
        <div class="section">
            <div class="container">
                <table class="table is-hoverable is-fullwidth">
                    <thead>
                        <tr>
                            <th>Pavadinimas</th>
                            <th>Suma</th>
                            <th>Kiekis</th>
                            <th>Vidutinė kaina</th>
                            <th>Data</th>
                            <th>Komentaras</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="list in finanseList" :key="list.id">
                            <td>{{ list.pavadinimas }}</td>
                            <td>{{ `${list.suma} €` }}</td>
                            <td>{{ list.bendrasKiekis }}</td>
                            <td>{{ `${list.vidutineKaina} €` }}</td>
                            <td>{{ list.firstLastData }}</td>
                            <td>{{ list.komentaras }}</td>
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
    name: "finanse",
    components: { Header },
    data() {
        return {
            finanseList: [],
        };
    },
    methods: {
        multiplyData(arr1, arr2) {
            let answer = arr1.reduce(function(r, a, i) {
                return r + a * arr2[i];
            }, 0);
            return answer;
        },
        addup(array) {
            return array.reduce((a, b) => a + b);
        },
        changeDate(date) {
            //const options = {};
            let first = date[0].toDate().toLocaleDateString();
            let last = date
                .pop()
                .toDate()
                .toLocaleDateString();
            return first + " - " + last;
        },
        vidurkis(array) {
            let answer = 0;
            for (let i = 0; i < array.length; i++) {
                answer += array[i];
            }
            return answer / array.length;
        },
    },

    beforeMount() {
        firebase
            .firestore()
            .collection("finansai")
            .get()
            .then((snapshot) =>
                snapshot.docs.forEach((fDoc) => {
                    this.finanseList.push({
                        id: fDoc.id,
                        pavadinimas: fDoc.data().pavadinimas,
                        kiekis: fDoc.data().kiekis,
                        kaina: fDoc.data().kaina,
                        data: fDoc.data().data,
                        komentaras: fDoc.data().komentaras,
                        suma: this.multiplyData(
                            fDoc.data().kiekis,
                            fDoc.data().kaina
                        ),
                        bendrasKiekis: this.addup(fDoc.data().kiekis),
                        firstLastData: this.changeDate(fDoc.data().data),
                        vidutineKaina: this.vidurkis(fDoc.data().kaina),
                    });
                })
            );
    },
};
</script>

<style></style>
