<template>
    <div class="product">
        <section class="hero  is-primary is-bold"></section>
        <div class="section">
            <div class="container cont-wide">
                <div class="columns is-mobile">
                    <div class="column">
                        <div class="buttons">
                            <router-link
                                :to="
                                    `/users/${this.user}/${this.$route.params.type}/${this.product.id}/add`
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
                    <h1 class="subtitle has-text-weight-bold">
                        {{ this.product.title }}
                    </h1>
                    <p class="">
                        {{ `${firstLastData(records)}` }}
                    </p>
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
                            <h5 class="subproduct has-text-weight-bold">
                                {{ `${total(records)} €` }}
                            </h5>
                        </div>
                        <div class="column">
                            <h5 class="subproduct has-text-weight-bold">
                                {{ `${quantity(records)}` }}
                            </h5>
                        </div>
                        <div class="column">
                            <h5 class="subproduct has-text-weight-bold">
                                {{ `${averagePrice(records)} €` }}
                            </h5>
                        </div>
                    </div>

                    <div class="colomns notification">
                        <header class="">
                            <h5 class="has-text-weight-bold">
                                Užrašai
                                <button
                                    class="button is-primary is-pulled-right rounded"
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
                            <h5>{{ product.comment }}</h5>
                        </div>
                        <div
                            class="modal"
                            :class="{ 'is-active': showModal == true }"
                        >
                            <div class="modal-background"></div>
                            <div class="modal-card">
                                <header class="modal-card-head">
                                    <p class="modal-card-product">Užrašai</p>
                                    <button
                                        class="delete"
                                        aria-label="close"
                                        @click="showModal = false"
                                    ></button>
                                </header>
                                <section class="modal-card-body">
                                    <textarea
                                        v-model="product.comment"
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
                    <h2 class="subtitle has-text-weight-bold">Istorija</h2>
                    <div class="columns has-text-centered is-mobile mt-1 mb-0">
                        <div class="column">
                            <h5 class="has-text-weight-bold">Suma</h5>
                        </div>
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
                    <div class="line"></div>
                    <div
                        class="is-hoverable"
                        v-for="list in records"
                        :key="list.id" 
                    >
                        <div class="columns has-text-centered is-hoverable is-mobile mt-1" 
                            @click="(deleteProductRecord = true,
                             deleteId = list.id)">
                            <div class="column " >
                                <h5>{{ `${list.total} €`}}</h5>
                            </div>
                            <div class="column ">
                                <h5>{{ list.quantity }}</h5>
                            </div>
                            <div class="column ">
                                <h5>{{ `${list.averagePrice} €` }}</h5>
                            </div>
                            <div class="column ">
                                <h5>{{ list.date }}</h5>
                            </div>
                        </div>
                        <div class="modal"
                        :class="{ 'is-active' : deleteProductRecord }">
                            <div class="modal-background" @click="deleteProductRecord = false"></div>
                            <div class="modal-content box">
                                <p class="mb-2">Ar norite ištrinti šį įraša?</p>
                                <button
                                    class="button is-primary is-rounded"
                                    @click="deleteRecordsItem(deleteId)"
                                >
                                Taip
                                </button>
                                <button
                                    class="button is-primary is-outlined is-rounded"
                                    @click="deleteProductRecord = false"
                                >
                                    Ne
                                </button>
                            </div>
                            <button 
                                class="modal-close is-large" 
                                aria-label="close" 
                                @click="deleteProductRecord = false">
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
import "firebase/auth";
import "firebase/firestore";
export default {
    name: "product",

    data() {
        return {
            product: {},
            records: [],
            showModal: false,
            deleteProductRecord: false,
            deleteId : '',
            user: firebase.auth().currentUser.uid,
        };
    },
    methods: {
        total(array) {
            let strict = 0;
            let calculated = 0;

            array.forEach((obj) => {
                if (obj.averagePrice != 0 && obj.quantity != 0) {
                    calculated += obj.quantity * obj.averagePrice;
                } else {
                    strict += obj.total;
                }
            });
            if (strict == calculated + strict) {
                return strict;
            } else {
                return `${strict} (${calculated + strict})`;
            }
        },
        quantity(array) {
            let strict = 0;
            let calculated = 0;

            array.forEach((obj) => {
                if (obj.total != 0 && obj.averagePrice != 0) {
                    calculated += obj.total / obj.averagePrice;
                } else {
                    strict += obj.quantity;
                }
            });
            if (strict == calculated + strict) {
                return strict;
            } else {
                return `${strict} (${calculated + strict})`;
            }
        },
        firstLastData(array) {
            if (array.length != 0) {
                let first = array[0].date;
                const lastFromArray = array.length - 1;
                let last = array[lastFromArray].date;
                return first + " / " + last;
            } else {
                return "Čia matysite informacija kai pridėsite įrašus";
            }
        },
        averagePrice(array) {
            let strict = 0;
            let strictSplitter = 0;
            let calculated = 0;
            let calculatedSplitter = 0;
            array.forEach((obj) => {
                if (obj.averagePrice == 0 && obj.quantity == 0) {
                    strict += 0;
                    strictSplitter += 1;
                }
                else if (obj.averagePrice != 0) {
                    strict += obj.averagePrice;
                    strictSplitter += 1;  
                } else if (obj.total != 0 && obj.quantity != 0 && obj.averagePrice == 0) {
                    calculated += obj.total / obj.quantity;
                    calculatedSplitter += 1;
                }
            });
            let strictAnswer = strict / strictSplitter;
            let calculatedAnswer = calculated / calculatedSplitter;
            let strictCalculated = (strictAnswer + calculatedAnswer) / 2;

            if (strictSplitter == 0) {
                return `(${calculatedAnswer.toFixed(2)})`;
            } else if (calculatedSplitter == 0) {
                return `${strictAnswer.toFixed(2)}`
            } else {
                return `${strictAnswer} (${strictCalculated.toFixed(2)})`;
            }
        },
        deleteItem() {
            firebase
                .firestore()
                .collection("users")
                .doc(this.user)
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
        deleteRecordsItem(recordId) {
            firebase
                .firestore()
                .collection("users")
                .doc(this.user)
                .collection(this.$route.params.type)
                .doc(this.$route.params.id)
                .collection("records")
                .doc(recordId)
                .delete()
                .then(() => {
                    this.records = this.records.filter(
                        (record) => record.id !== recordId
                    );
                    this.deleteProductRecord = false;
                    console.log("Document successfully deleted!");
                })
                .catch((error) => {
                    console.error("Error removing document: ", error);
                });
        },
        update() {
            firebase
                .firestore()
                .collection("users")
                .doc(this.user)
                .collection(this.$route.params.type)
                .doc(this.$route.params.id)
                .update({
                    comment: this.product.comment,
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
            .collection("users")
            .doc(this.user)
            .collection(this.$route.params.type)
            .doc(this.$route.params.id)
            .get()
            .then((doc) => {
                this.product = {
                    id: doc.id,
                    title: doc.data().title,
                    comment: doc.data().comment,
                };
            });
        firebase
            .firestore()
            .collection("users")
            .doc(this.user)
            .collection(this.$route.params.type)
            .doc(this.$route.params.id)
            .collection("records")
            .get()
            .then((doc) => {
                doc.forEach((record) => {
                    this.records.push({
                        id: record.id,
                        date: record.data().date,
                        averagePrice: Number(record.data().averagePrice),
                        quantity: Number(record.data().quantity),
                        total: Number(record.data().total),
                    })
                })
                this.records.sort((a, b) => {
                    return new Date(a.data) - new Date(b.data);
                });
            })
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
.rounded {
    border-radius: 100%;
}
</style>
