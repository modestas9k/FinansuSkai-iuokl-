<template>
    <div class="finance">
        <Header />
        <div class="section ">
            <div class="container cont-wide">
                <div class="buttons">
                    <router-link
                        to="/AddProduct"
                        class="button is-primary is-rounded"
                    >
                        Pridėti nauja sritį
                    </router-link>
                </div>
                <div class="box">
                    <div class="columns is-mobile">
                        <div class="column is-1"></div>
                        <h2 class="title mt-4 mb-2">Pajamos</h2>
                    </div>

                    <div
                        class="columns has-text-centered is-vcentered is-mobile mb-0 mt-1"
                    >
                        <!-- <div class="column is-1"></div> -->
                        <div class="column border">
                            <h5 class="has-text-weight-bold ">
                                Produktas
                            </h5>
                        </div>
                        <div class="column border">
                            <h5 class="has-text-weight-bold">Suma</h5>
                        </div>
                        <div class="column border">
                            <h5 class="has-text-weight-bold">
                                Kiekis
                            </h5>
                        </div>
                    </div>
                    <!-- <div class="line"></div> -->
                    <div
                        class="columns has-text-centered is-hoverable is-mobile mb-1 mt-1 is-vcentered"
                        v-for="list in pajamos"
                        :key="list.id"
                    >
                        <!-- <router-link :to="`/product/pajamos/${list.id}`"> -->
                        <div class="column">
                            <h5 class="subtitle">
                                {{ list.pavadinimas }}
                            </h5>
                        </div>
                        <div class="column">
                            <h5 class="subtitle">
                                {{ `${suma(list.irasai)} €` }}
                            </h5>
                        </div>
                        <div class="column">
                            <h5 class="subtitle">
                                {{ `${kiekis(list.irasai)}` }}
                            </h5>
                        </div>
                        <!-- </router-link> -->
                    </div>
                    <div class="columns has-text-centered is-mobile mt-2 mb-1">
                        <!-- <div class="column is-1"></div> -->
                        <div class="column border-top">
                            <h5 class="subtitle has-text-weight-bold">
                                Viso:
                            </h5>
                        </div>
                        <div class="column border-top">
                            <h5 class="subtitle has-text-weight-bold">
                                {{ `${visoSuma(pajamos)} €` }}
                            </h5>
                        </div>
                        <div class="column border-top">
                            <h5 class="subtitle has-text-weight-bold">
                                {{ `${visoKiekis(pajamos)}` }}
                            </h5>
                        </div>
                    </div>
                </div>
                <div class="box">
                    <div class="columns is-mobile">
                        <div class="column is-1"></div>
                        <h2 class="title mt-4 mb-2">Išlaidos</h2>
                    </div>

                    <div
                        class="columns has-text-centered is-vcentered is-mobile mb-0 mt-1"
                    >
                        <div class="column is-1"></div>
                        <div class="column border">
                            <h5 class="has-text-weight-bold ">
                                Produktas
                            </h5>
                        </div>
                        <div class="column border">
                            <h5 class="has-text-weight-bold">Suma</h5>
                        </div>
                        <div class="column border">
                            <h5 class="has-text-weight-bold">
                                Kiekis
                            </h5>
                        </div>
                    </div>
                    <!-- <div class="line"></div> -->
                    <div
                        class="columns has-text-centered is-mobile mb-1 mt-1 is-vcentered"
                        v-for="list in islaidos"
                        :key="list.id"
                    >
                        <div class="column  is-1">
                            <router-link
                                :to="`/product/islaidos/${list.id}`"
                                class="button round is-success "
                            >
                                +
                            </router-link>
                        </div>
                        <div class="column">
                            <h5 class="subtitle">
                                {{ list.pavadinimas }}
                            </h5>
                        </div>
                        <div class="column">
                            <h5 class="subtitle">
                                {{ `${suma(list.irasai)} €` }}
                            </h5>
                        </div>
                        <div class="column">
                            <h5 class="subtitle">
                                {{ `${kiekis(list.irasai)}` }}
                            </h5>
                        </div>
                    </div>
                    <div class="columns has-text-centered is-mobile mt-2 mb-1">
                        <div class="column is-1"></div>
                        <div class="column border-top">
                            <h5 class="subtitle has-text-weight-bold">
                                Viso:
                            </h5>
                        </div>
                        <div class="column border-top">
                            <h5 class="subtitle has-text-weight-bold">
                                {{ `${visoSuma(islaidos)} €` }}
                            </h5>
                        </div>
                        <div class="column border-top">
                            <h5 class="subtitle has-text-weight-bold">
                                {{ `${visoKiekis(islaidos)}` }}
                            </h5>
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
    name: "finance",
    components: { Header },
    data() {
        return {
            pajamos: [],
            islaidos: [],
        };
    },
    methods: {
        visoSuma(array) {
            let total = 0;
            array.forEach((data) => {
                let answer = 0;
                data.irasai.forEach((obj) => {
                    answer += obj.kiekis * obj.kaina;
                });
                total += answer;
            });
            return total;
        },

        visoKiekis(array) {
            let total = 0;
            array.forEach((data) => {
                let answer = 0;
                data.irasai.forEach((obj) => {
                    answer += obj.kiekis;
                });
                total += answer;
            });
            return total;
        },

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
                    firebase
                        .firestore()
                        .collection("pajamos")
                        .doc(fDoc.id)
                        .collection("irasai")
                        .get()
                        .then((doc) => {
                            let irasai = [];
                            doc.docs.forEach((prod) => {
                                irasai.push({
                                    kiekis: Number(prod.data().kiekis),
                                    kaina: Number(prod.data().kaina),
                                });
                            });
                            this.pajamos.push({
                                id: fDoc.id,
                                pavadinimas: fDoc.data().pavadinimas,
                                irasai: irasai,
                                uid: fDoc.data().uid,
                            });
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
                    firebase
                        .firestore()
                        .collection("islaidos")
                        .doc(fDoc.id)
                        .collection("irasai")
                        .get()
                        .then((doc) => {
                            let irasai = [];
                            doc.docs.forEach((prod) => {
                                irasai.push({
                                    kiekis: Number(prod.data().kiekis),
                                    kaina: Number(prod.data().kaina),
                                });
                            });
                            this.islaidos.push({
                                id: fDoc.id,
                                pavadinimas: fDoc.data().pavadinimas,
                                irasai: irasai,
                                uid: fDoc.data().uid,
                            });
                        });
                });
            });
    },
};
</script>

<style>
.line {
    border: 1px solid rgb(197, 197, 197);
}
.round {
    border-radius: 50%;
    font-size: small;
    font-weight: 900;
}
.border {
    border-bottom: 2px solid rgb(197, 197, 197);
    border-top: 2px solid rgb(197, 197, 197);
}
.border-top {
    border-top: 2px solid rgb(197, 197, 197);
}
.cont-wide {
    max-width: 650px;
}
/* .section {
    padding: 0;
} */
@media (max-width: 672px) {
    :root {
        font-size: 90%;
    }
}
</style>
