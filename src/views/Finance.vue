<template>
    <div class="finance">
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
                <div class="box">  <!-- income -->
                    <div class="columns is-mobile">
                        <div class="column is-1"></div>
                        <h2 class="title is-4 has-text-weight-bold mt-4 mb-2">
                            Pajamos
                        </h2>
                    </div>

                    <div
                        class="columns has-text-centered is-vcentered is-mobile mb-0 mt-1"
                    >
                        <div class="column border-bottom">
                            <h5 class="has-text-weight-bold ">
                                Produktas
                            </h5>
                        </div>
                        <div class="column border-bottom">
                            <h5 class="has-text-weight-bold">
                                Suma
                            </h5>
                        </div>
                        <div class="column border-bottom">
                            <h5 class="has-text-weight-bold">
                                Kiekis
                            </h5>
                        </div>
                    </div>
                    <router-link
                        :to="`/users/${user}/income/${list.id}`"
                        class="columns has-text-centered is-hoverable is-mobile mb-1 mt-1 is-vcentered"
                        v-for="list in income"
                        :key="list.id"
                    >
                    <div class="column-wrapper">
                        <div class="column">
                            <h5 class="subtitle">
                                {{ list.title }}
                            </h5>
                        </div>
                        <div class="column">
                            <h5 class="subtitle">
                                {{ `${total(list.records)} €` }}
                            </h5>
                        </div>
                        <div class="column">
                            <h5 class="subtitle">
                                {{ `${quantity(list.records)}` }}
                            </h5>
                        </div>
                        </div>
                    </router-link>
                    <div class="columns has-text-centered is-mobile mt-2 mb-1">
                        <div class="column border-top">
                            <h5 class="subtitle has-text-weight-bold">
                                Viso:
                            </h5>
                        </div>
                        <div class="column border-top">
                            <h5 class="subtitle has-text-weight-bold">
                                {{ `${totalSum(income)} €` }}
                            </h5>
                        </div>
                        <div class="column border-top">
                            <h5 class="subtitle has-text-weight-bold">
                                {{ `${totalQuantity(income)}` }}
                            </h5>
                        </div>
                    </div>
                </div>
                <div class="box">   <!-- cost -->
                    <div class="columns is-mobile">
                        <div class="column is-1"></div>
                        <h2 class="title is-4 has-text-weight-bold mt-4 mb-2">
                            Išlaidos
                        </h2>
                    </div>
                    <div
                        class="columns has-text-centered is-vcentered is-mobile mb-0 mt-1"
                    >
                        <div class="column border-bottom">
                            <h5 class="has-text-weight-bold ">
                                Produktas
                            </h5>
                        </div>
                        <div class="column border-bottom">
                            <h5 class="has-text-weight-bold">Suma</h5>
                        </div>
                        <div class="column border-bottom">
                            <h5 class="has-text-weight-bold">
                                Kiekis
                            </h5>
                        </div>
                    </div>
                    <router-link
                        :to="`/users/${user}/cost/${list.id}`"
                        class="columns has-text-centered is-mobile mb-1 mt-1 is-vcentered"
                        v-for="list in cost"
                        :key="list.id"
                    >
                       <div class="column-wrapper">
                        <div class="column">
                            <h5 class="subtitle">
                                {{ list.title }}
                            </h5>
                        </div>
                        <div class="column">
                            <h5 class="subtitle">
                                {{ `${total(list.records)} €` }}
                            </h5>
                        </div>
                        <div class="column">
                            <h5 class="subtitle">
                                {{ `${quantity(list.records)}` }}
                            </h5>
                        </div>
                        </div>
                    </router-link>
                    <div class="columns has-text-centered is-mobile mt-2 mb-1">
                        <div class="column border-top">
                            <h5 class="subtitle has-text-weight-bold">
                                Viso:
                            </h5>
                        </div>
                        <div class="column border-top">
                            <h5 class="subtitle has-text-weight-bold">
                                {{ `${totalSum(cost)} €` }}
                            </h5>
                        </div>
                        <div class="column border-top">
                            <h5 class="subtitle has-text-weight-bold">
                                {{ `${totalQuantity(cost)}` }}
                            </h5>
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
    name: "finance",

    data() {
        return {
            income: [],
            cost: [],
            user: firebase.auth().currentUser.uid,
        };
    },
    methods: {
        totalSum(array) {
            let total = 0;
            array.forEach((obj) => {
                let answer = 0;
                obj.records.forEach((obj) => {
                    if(obj.total == 0 && obj.quantity != 0 && obj.averagePrice != 0) {
                        answer += obj.quantity * obj.averagePrice;
                    } else if(obj.total != 0) {
                    answer += obj.total;
                    }
                });
                total += answer;
            });
            return total;
        },

        totalQuantity(array) {
            let total = 0;
            array.forEach((data) => {
                let answer = 0;
                data.records.forEach((obj) => {
                    if(obj.quantity == 0 && obj.averagePrice != 0 && obj.total != 0) {
                        answer += obj.total / obj.averagePrice;
                    } else if(obj.quantity != 0) {
                        answer += obj.quantity;
                    } 
                });
                total += answer;
            });
            return total;
        },

        total(array) {
            let answer = 0;
            array.forEach((obj) => {
                if(obj.total == 0 && obj.quantity != 0 && obj.averagePrice != 0) {
                    answer += obj.quantity * obj.averagePrice;
                } else if(obj.total != 0) {
                    answer += obj.total;
                } 
            });
            return answer;
        },

        quantity(array) {
            let answer = 0;
            array.forEach((obj) => {
                if(obj.quantity == 0 && obj.averagePrice != 0 && obj.total != 0) {
                    answer += obj.total / obj.average;
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
            }
        },

        average(array) {
            let number = 0;
            let splitter = 0;
            array.forEach((obj) => {
                number += obj.averagePrice;
                splitter += 1;
            });
            let answer = number / splitter;
            return answer.toFixed(2);
        },
    },

    beforeMount() {

        firebase
            .firestore()
            .collection("users")
            .doc(this.user)
            .collection("cost")
            .get()
            .then((snapshot) => snapshot.docs.forEach((fDoc) => {
                firebase
                    .firestore()
                    .collection("users")
                    .doc(this.user)
                    .collection("cost")
                    .doc(fDoc.id)
                    .collection('records')
                    .get()
                    .then((record) => {
                        let info = [];
                        record.forEach((doc) => {
                            info.push({
                                total: Number(doc.data().total),
                                averagePrice: Number(doc.data().averagePrice),
                                quantity: Number(doc.data().quantity),
                                date: doc.data().date,

                            })
                        })
                        this.cost.push({
                        id: fDoc.id,
                        type: fDoc.data().type,
                        title: fDoc.data().title,
                        records: info,
                        }) 
                    })
            }))

        firebase
            .firestore()
            .collection("users")
            .doc(this.user)
            .collection("income")
            .get()
            .then((snapshot) => snapshot.docs.forEach((fDoc) => {
                firebase
                    .firestore()
                    .collection("users")
                    .doc(this.user)
                    .collection("income")
                    .doc(fDoc.id)
                    .collection('records')
                    .get()
                    .then((record) => {
                        let info = [];
                        record.forEach((doc) => {
                            info.push({
                                total: Number(doc.data().total),
                                averagePrice: Number(doc.data().averagePrice),
                                quantity: Number(doc.data().quantity),
                                date: doc.data().date,

                            })
                        })
                        this.income.push({
                            id: fDoc.id,
                            type: fDoc.data().type,
                            title: fDoc.data().title,
                            records: info,
                        }) 
                    })
            }))

    },
};
</script>

<style>
.column-wrapper {
    display: flex;
    justify-content: space-around;
    width: 100%;
}
.column-wrapper:hover {
    background: #eee;
}

.line {
    border: 1px solid rgb(197, 197, 197);
}
.round {
    border-radius: 50%;
    font-size: small;
    font-weight: 900;
}
.border-bottom {
    border-bottom: 2px solid rgb(197, 197, 197);
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
