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
                    <h1 class="product ">
                        {{ this.product.title }}
                    </h1>
                    <p class="subproduct ">
                        {{ `${firstLastData(records)}` }}
                    </p>
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
                    <h2 class="product">Istorija</h2>
                    <div class="line"></div>
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
                        <!-- <div class="column is-2"></div> -->
                    </div>
                    <div class="line"></div>
                    <div
                        class=""
                        v-for="list in records"
                        :key="list.id" 
                    >
                    <div class="columns has-text-centered is-mobile mt-1" 
                        @click="deleteProductRecord = true">
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
                        <!-- <div
                            class="modal"
                            :class="{ 'is-active': deleteProductRecord == true }"
                        >
                            <div class="modal-background"></div>
                            <div class="modal-card">
                                <header class="modal-card-head">
                                    <p class="modal-card-product">Ar norite ištrinti šį įraša?</p>
                                    <button
                                        class="delete"
                                        aria-label="close"
                                        @click="deleteProductRecord = false"
                                    ></button>
                                </header>
                                
                                <footer class="modal-card-foot">
                                    <button
                                        class="button is-primary is-rounded"
                                        @click="deleteRecordsItem(list.id)"
                                    >
                                        Taip
                                    </button>
                                    <button
                                        class="button is-primary is-outlined is-rounded"
                                        @click="deleteProductRecord = false"
                                    >
                                        Ne
                                    </button>
                                </footer>
                            </div>
                        </div> -->
                        <div class="modal"
                        :class="{ 'is-active' : deleteProductRecord }">
                            <div class="modal-background" @click="deleteProductRecord = false"></div>
                            <div class="modal-content box">
                                <p class="mb-2">Ar norite ištrinti šį įraša?</p>
                                <button
                                    class="button is-primary is-rounded"
                                    @click="deleteRecordsItem(list.id)"
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
                        <!-- <div class="column is-2">
                            <button
                                class="button is-danger rounded"
                                v-on:click="deleteStoryItem(list.id)"
                            >
                                <span class="icon">
                                    <i class="zmdi zmdi-close"></i>
                                </span>
                            </button>
                        </div> -->
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
            user: firebase.auth().currentUser.uid,
        };
    },
    methods: {
        total(array) {
            let answer = 0;
            array.forEach((obj) => {
                if(obj.averagePrice != 0 && obj.quantity != 0) {
                    answer += obj.quantity * obj.averagePrice;
                } else {
                    answer += obj.total;
                }
            });
            return answer;
        },
        quantity(array) {
            let answer = 0;
            array.forEach((obj) => {
                if(obj.total != 0 && obj.averagePrice != 0) {
                    answer += obj.total / obj.averagePrice;
                } else {
                    answer += obj.quantity;
                }
            });
            return answer;
        },
        firstLastData(array) {
            if (array.length != 0) {
                let first = array[0].data;
                const lastFromArray = array.length - 1;
                let last = array[lastFromArray].data;
                return first + " / " + last;
            } else {
                return "Čia matysite informacija kai pridėsite įrašus";
            }
        },
        averagePrice(array) {
            if (array != "") {
                let number = 0;
                let splitter = 0;
                array.forEach((obj) => {
                    if(obj.averagePrice != 0) {
                        number += obj.averagePrice;
                        splitter += 1;
                    } 
                    else if(obj.total != 0 && obj.quantity != 0) {
                        number += obj.total / obj.quantity;
                        splitter += 1;
                    }
                });
                let answer = number / splitter;
                return answer.toFixed(2);
            } else {
                return 0;
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
        deleteRecordsItem(id) {
            firebase
                .firestore()
                .collection("users")
                .doc(this.user)
                .collection(this.$route.params.type)
                .doc(this.$route.params.id)
                .collection("records")
                .doc(id)
                .delete()
                .then(() => {
                    this.records = this.records.filter(
                        (record) => record.id !== id
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

                // doc.records.forEach((record) => {
                //     this.records.push({
                //         date: record.data().date,
                //         quantity: record.data().quantity,
                //         total: record.data().total,
                //     })
                // })
                // firebase
                //     .firestore()
                //     .collection(this.$route.params.type)
                //     .doc(this.$route.params.id)
                //     .collection("records")
                //     .get()
                //     .then((doc) => {
                //         doc.docs.forEach((prod) => {
                //             this.records.push({
                //                 id: prod.id,
                //                 kiekis: Number(prod.data().kiekis),
                //                 kaina: Number(prod.data().kaina),
                //                 data: prod.data().data,
                //             });
                //         });
                //         this.records.sort((a, b) => {
                //             return new Date(a.data) - new Date(b.data);
                //         });
                //     });
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
