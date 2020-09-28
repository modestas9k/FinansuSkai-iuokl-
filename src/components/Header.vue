<template>
    <div class="Header">
        <section class="hero is-primary">
            <div class="hero-body">
                <div class="container has-text-centered">
                    <h1 class="title">{{ $route.name }}</h1>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: "Header",
};
</script>
