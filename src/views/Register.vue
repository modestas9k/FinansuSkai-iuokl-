<template>
    <div class="register container box max">
        <h1 class="title">Registracija</h1>
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
                        type="text"
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
                        Registruotis
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: "register",
    data() {
        return {
            email: "",
            password: "",
        };
    },
};
</script>

<style scoped>
.max {
    max-width: 600px;
    margin: 0 auto;
}
</style>
