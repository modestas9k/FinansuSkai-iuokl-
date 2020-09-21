<template>
  <div class="register container box max">
    <h1 class="title">Registracija</h1>
    <Notification
      v-if="notification"
      v-on:close="notification = false"
      :type="type"
      :message="Message"
    />
    <form v-on:submit.prevent="register">
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
            min="3"
            max="30"
          />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button
            type="submit"
            :class="loading && 'is-loading'"
            class="button is-primary"
          >Registruotis</button>
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
  name: "Register",
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
    register() {
      this.loading = true;
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
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
