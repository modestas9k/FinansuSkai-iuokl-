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

                  
                    <!-- <div class="tabs is-boxed mb-0">
                        <ul>
                            <li :class="[select == 'one' ? 'is-active' : '']" @click="select='one'"><a>1</a></li>
                            <li :class="[select == '2' ? 'is-active' : '']" @click="select='2'"><a>2</a></li>
                            <li :class="[select == '3' ? 'is-active' : '']" @click="select='3'"><a>3</a></li>
                        </ul>
                    </div> -->

                   <!-- <div v-if=" this.select == 'one' ">
                        <div class="field mb-5 mt-5">
                            <label class="label" for="total">Suma</label>
                            <div class="control">
                                <input
                                    class="input"
                                    v-model="total"
                                    type="number"
                                    step=".1"
                                    placeholder="Visa suma"
                                    id="total"
                                    required
                                />
                            </div>
                        </div>
                        <div class="field mb-5">
                            <label class="label" for="quantity">Kiekis (nebutina)</label>
                            <div class="control">
                                <input
                                    class="input"
                                    v-model="quantity"
                                    type="number"
                                    placeholder="Skaičius parduotu prekiu"
                                    id="quantity"
                                    
                                />
                            </div>
                        </div>
                   </div>
                   <div v-if=" this.select == '2' ">
                        <div class="field mb-5 mt-5">
                            <label class="label" for="total2">Suma</label>
                            <div class="control">
                                <input
                                    class="input"
                                    v-model="total"
                                    type="number"
                                    step=".1"
                                    placeholder="Visa suma"
                                    id="total2"
                                    required
                                />
                            </div>
                        </div>
                          <div class="field mb-5 mt-5">
                            <label class="label" for="averagePrice">Vidutinė kaina</label>
                            <div class="control">
                                <input
                                    class="input"
                                    v-model="averagePrice"
                                    type="number"
                                    step=".1"
                                    placeholder="Vieneto kaina"
                                    id="averagePrice"
                                    required
                                />
                            </div>
                        </div>
                   </div>
                    <div v-if=" this.select == '3' ">
                       
                        <div class="field mb-5 mt-5">
                            <label class="label" for="averagePrice2">Vidutinė kaina</label>
                            <div class="control">
                                <input
                                    class="input"
                                    v-model="averagePrice"
                                    type="number"
                                    step=".1"
                                    placeholder="Vieneto kaina"
                                    id="averagePrice2"
                                    required
                                />
                            </div>
                        </div>
                        <div class="field mb-5">
                            <label class="label" for="quantity2">Kiekis</label>
                            <div class="control">
                                <input
                                    class="input"
                                    v-model="quantity"
                                    type="number"
                                    placeholder="Skaičius parduotu prekiu"
                                    id="quantity2"
                                    required
                                />
                            </div>
                        </div>
                   </div> -->
                    
                    <div>
                        <div class="field mb-5 mt-5">
                            <label class="label" for="total">Suma</label>
                            <div class="control">
                                <input
                                    class="input"
                                    v-model="total"
                                    type="number"
                                    step=".1"
                                    placeholder="Visa suma"
                                    id="total"
                                />
                            </div>
                        </div>
                        <div class="field mb-5">
                            <label class="label" for="quantity">Kiekis</label>
                            <div class="control">
                                <input
                                    class="input"
                                    v-model="quantity"
                                    type="number"
                                    placeholder="Skaičius parduotu prekiu"
                                    id="quantity"
                                />
                            </div>
                        </div>
                        <div class="field mb-5 mt-5">
                            <label class="label" for="averagePrice">Vidutinė kaina</label>
                            <div class="control">
                                <input
                                    class="input"
                                    v-model="averagePrice"
                                    type="number"
                                    step=".1"
                                    placeholder="Vieneto kaina"
                                    id="averagePrice"
                                />
                            </div>
                        </div>
                   </div>
                    <div class="field mb-5">
                        <label class="label" for="date">Data</label>
                        <div class="control">
                            <input
                                class="input"
                                v-model="date"
                                type="date"
                                id="date"
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
            total: "",
            quantity: "",
            averagePrice: "",
            select: "one",
            date: `${year}-${month}-${date}`,
            notification: false,
            Message: "",
            loading: false,
            collection: "",
            user: firebase.auth().currentUser.uid,
        };
    },
    methods: {
        add() {
            this.loading = true;

            if(this.total && this.date || 
            this.total && this.averagePrice && this.date ||
            this.averagePrice && this.quantity && this.date) {

                firebase.firestore()
                    .collection("users")
                    .doc(this.user) 
                    .collection(this.$route.params.type) // type = income or cost
                    .doc(this.$route.params.id) // id = product id
                    .collection("records")
                    .add({
                        total: this.total,
                        quantity: this.quantity,
                        averagePrice: this.averagePrice,
                        date: this.date,
                    })
                    .then(() => {
                        (this.loading = false),
                            (this.notification = true),
                            (this.type = "is-success"),
                            (this.Message =
                                "Sėkmingai pridėjote nauja sritį/ produkta"),
                            this.$router.push(
                                `/users/${this.user}/${this.$route.params.type}/${this.$route.params.id}`
                            );
                    })
                    .catch((error) => {
                        (this.loading = false),
                            (this.notification = true),
                            (this.type = "is-danger"),
                            (this.Message = `Įvyko klaida: ${error.message}`);
                    });
            } else {
                this.loading = false;
                this.notification = true;
                this.type = "is-danger";
                this.Message = "Įveskite daugiau informacijos.";
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
