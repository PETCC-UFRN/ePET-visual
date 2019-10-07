<template>
    <div>
        <AnonymousNav/>
        <Particles/>
        <div class="atividades container">
            <About/>
            <div class="row text-center">
                <Activity v-for="index in 3" :key="index"/>
            </div>
            <div class="row text-center">
                <Activity v-for="index in 3" :key="index"/>
            </div>
        </div>
        <nuxt/>
    </div>
</template>

<script>
    import AnonymousNav from "../components/anonymous/AnonymousNav";
    import Particles from "../components/anonymous/Particles";
    import About from "../components/anonymous/About";
    import Activity from "../components/anonymous/Activity";

    export default {
        layout: 'index',
        components: {
            AnonymousNav,
            Particles,
            About,
            Activity
        }
    };
</script>