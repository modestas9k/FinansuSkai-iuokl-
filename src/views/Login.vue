<template>
    <div class="login container box max">
        <h1 class="title">Prisijungti</h1>
        <Notification
            v-if="notification"
            v-on:close="notification = false"
            :type="type"
            :message="Message"
        />
        <form>
            <div class="field">
                <label for="email" class="label">Elektroninis paštas</label>
                <div class="control">
                    <input
                        class="input"
                        type="text"
                        name="email"
                        id="email"
                        placeholder="fredis@gmail.com"
                        v-model="email"
                    />
                </div>
            </div>
            <div class="field">
                <label for="password" class="label">Slaptažodis</label>
                <div class="control">
                    <input
                        class="input"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="ananasas123"
                        v-model="password"
                    />
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <button type="submit" class="button is-primary">
                        Prisijungti
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import Notification from "../components/Notification";

export default {
    name: "Login",
    components: { Notification },
    data() {
        return {
            email: "",
            password: "",
            notification: false,
            Message: "",
            loading: false,
        };
    },
    methods: {
        login() {
            this.loading = true;
            firebase
                .auth()
                .signInWithEmailAndPassword(this.email, this.password)
                .then(
                    () => this.$router.push("/"),
                    (error) => {
                        this.notification = true;
                        this.type = "is-danger";
                        this.Message = error.message;
                        this.loading = false;
                    }
                );
        },
    },
};
</script>

<style scoped>
.max {
    max-width: 600px;
    margin: 0 auto;
}
</style>
