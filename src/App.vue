<template>
    <div id="app">
        <div class="section">
            <div id="nav">
                <router-link to="/">Home</router-link>
                |
                <router-link to="/about">About</router-link>
                |
                <router-link to="/register">Register</router-link>
            </div>
            <div class="container">
                <router-view />
            </div>
        </div>
    </div>
</template>

<style></style>
