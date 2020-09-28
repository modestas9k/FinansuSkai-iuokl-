<template>
    <div class="product">
        <section class="hero  is-primary is-bold">
            <div class="hero-body ">
                <div class="container has-text-centered">
                    <h1 class="title ">
                        {{ this.produktas.pavadinimas }}
                    </h1>
                    <p class="subtitle ">
                        {{ `${firstLastData(irasai)}` }}
                    </p>
                </div>
            </div>
        </section>
        <div class="section">
            <div class="container cont-wide">
                <div class="columns is-mobile">
                    <div class="column">
                        <div class="buttons">
                            <router-link
                                :to="
                                    `/product/${this.$route.params.type}/${produktas.id}/add`
                                "
                                class="button is-primary is-rounded"
                            >
                                Pridėti nauja įraša
                            </router-link>
                            <router-link
                                :to="`/finance`"
                                class="button is-primary is-outlined is-rounded"
                            >
                                Atgal
                            </router-link>
                        </div>
                    </div>
                    <div class="column">
                        <div class="buttons is-pulled-right ">
                            <div
                                class="button is-danger is-outlined is-rounded"
                                v-on:click="deleteItem()"
                            >
                                Ištrinti produkta
                            </div>
                        </div>
                    </div>
                </div>

                <div class="box">
                    <h2 class="title">Informacija</h2>
                    <div class="line"></div>
                    <div
                        class="columns is-vcentered has-text-centered is-mobile mb-0 mt-1"
                    >
                        <div class="column">
                            <h5 class="has-text-weight-bold ha">
                                Suma
                            </h5>
                        </div>
                        <div class="column">
                            <h5 class="has-text-weight-bold">Kiekis</h5>
                        </div>
                        <div class="column">
                            <h5 class="has-text-weight-bold">
                                Vidutinė kaina
                            </h5>
                        </div>
                    </div>
                    <div class="line"></div>
                    <div class="columns is-mobile has-text-centered mb-1 mt-1">
                        <div class="column">
                            <h5 class="subtitle has-text-weight-bold">
                                {{ `${suma(irasai)} €` }}
                            </h5>
                        </div>
                        <div class="column">
                            <h5 class="subtitle has-text-weight-bold">
                                {{ `${kiekis(irasai)}` }}
                            </h5>
                        </div>
                        <div class="column">
                            <h5 class="subtitle has-text-weight-bold">
                                {{ `${vidurkis(irasai)} €` }}
                            </h5>
                        </div>
                    </div>

                    <div class="colomns notification">
                        <header class="">
                            <h5 class="has-text-weight-bold">
                                Užrašai
                                <button
                                    class="button is-primary is-small is-pulled-right is-rounded"
                                >
                                    <span
                                        class="icon"
                                        v-on:click="showModal = true"
                                    >
                                        <i class="zmdi zmdi-edit"></i>
                                    </span>
                                </button>
                            </h5>
                        </header>
                        <div class="">
                            <h5>{{ produktas.komentaras }}</h5>
                        </div>
                        <div
                            class="modal"
                            :class="{ 'is-active': showModal == true }"
                        >
                            <div class="modal-background"></div>
                            <div class="modal-card">
                                <header class="modal-card-head">
                                    <p class="modal-card-title">Užrašai</p>
                                    <button
                                        class="delete"
                                        aria-label="close"
                                        @click="showModal = false"
                                    ></button>
                                </header>
                                <section class="modal-card-body">
                                    <textarea
                                        v-model="produktas.komentaras"
                                        class="textarea"
                                    ></textarea>
                                </section>
                                <footer class="modal-card-foot">
                                    <button
                                        class="button is-primary is-rounded"
                                        @click="update"
                                    >
                                        Išsaugoti
                                    </button>
                                    <button
                                        class="button is-primary is-outlined is-rounded"
                                        @click="showModal = false"
                                    >
                                        Atgal
                                    </button>
                                </footer>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box">
                    <h2 class="title">Istorija</h2>
                    <div class="line"></div>
                    <div class="columns has-text-centered is-mobile mt-1 mb-0">
                        <div class="column">
                            <h5 class="has-text-weight-bold">Kiekis</h5>
                        </div>
                        <div class="column">
                            <h5 class="has-text-weight-bold">Kaina</h5>
                        </div>
                        <div class="column">
                            <h5 class="has-text-weight-bold">Data</h5>
                        </div>
                        <div class="column is-2"></div>
                    </div>
                    <div class="line"></div>
                    <div
                        class="columns has-text-centered is-mobile mt-1"
                        v-for="list in irasai"
                        :key="list.id"
                    >
                        <div class="column ">
                            <h5>{{ list.kiekis }}</h5>
                        </div>
                        <div class="column ">
                            <h5>{{ `${list.kaina} €` }}</h5>
                        </div>
                        <div class="column ">
                            <h5>{{ list.data }}</h5>
                        </div>
                        <div class="column is-2">
                            <button
                                class="button is-danger  is-small is-round"
                                v-on:click="deleteStoryItem(list.id)"
                            >
                                <span class="icon">
                                    <i class="zmdi zmdi-close"></i>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
export default {
    name: "product",

    data() {
        return {
            produktas: {},
            irasai: [],
            showModal: false,
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
        deleteItem() {
            firebase
                .firestore()
                .collection(this.$route.params.type)
                .doc(this.$route.params.id)
                .delete()
                .then(() => {
                    this.$router.push("/finance");
                    console.log("Document successfully deleted!");
                })
                .catch((error) => {
                    console.error("Error removing document: ", error);
                });
        },
        deleteStoryItem(id) {
            firebase
                .firestore()
                .collection(this.$route.params.type)
                .doc(this.$route.params.id)
                .collection("irasai")
                .doc(id)
                .delete()
                .then(() => {
                    console.log("Document successfully deleted!");
                })
                .catch((error) => {
                    console.error("Error removing document: ", error);
                });
        },
        update() {
            firebase
                .firestore()
                .collection(this.$route.params.type)
                .doc(this.$route.params.id)
                .set({
                    komentaras: this.produktas.komentaras,
                })
                .then(() => {
                    this.showModal = false;
                })
                .catch((error) => {
                    console.error("Error removing document: ", error);
                });
        },
    },
    beforeMount() {
        firebase
            .firestore()
            .collection(this.$route.params.type)
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
                        this.irasai.sort((a, b) => {
                            return new Date(a.data) - new Date(b.data);
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
.center {
    display: flex;
    justify-content: center;
    align-items: center;
}
.cont-wide {
    max-width: 650px;
}
/* 
.grid {
    display: grid;
    grid-template-columns: [xl-start] 1fr 1.5rem [md-start] minmax(0, 624px) [md-end] 1.5rem 1fr [xl-end];
}

.grid * {
    grid-column: md;
}
.grid-xl {
    grid-column: xl;
}

@media (max-width: 672px) {
    :root {
        font-size: 90%;
    }
} */
</style>
