<template>
    <div class="home">
        <div class="hero is-link is-fullheight-with-navbar is-bold center">
            <div class="section ">
                <div class="container">
                    <h1 class="title is-3">Sveiki atvyke į</h1>
                    <h1 class="title is-2 has-text-weight-bold">
                        Finansų skaičiuoklę
                    </h1>
                    <p class="subtitle">
                        Čia galima sekti savo norimas išlaidas ir pajamas
                    </p>
                    <div class="buttons">
                        <router-link
                            to="/register"
                            class="button is-success is-rounded"
                        >
                            Registruotis
                        </router-link>
                        <router-link
                            to="/login"
                            class="button is-warning is-outlined is-rounded"
                        >
                            Prisijungti
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Home",
};
</script>
<style>
.center {
    display: flex;
    padding-top: 4em;
    align-items: center;
}
</style>
