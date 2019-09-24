<template>
    <div class="container">
        <About/>
        <h3>Membros</h3>
        <ul>
            <li v-for="member in members">
                <p>{{member.name}}</p>
                <p>{{member.entrance}}</p>
                <p>{{member.email}}</p>
                <p>{{member.areasOfInterest}}</p>
                <p>{{member.lattes}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
    import About from "@/components/anonymous/About";

    export default {
        data() {
            return {
                id:this.$route.params.entrance,
                members:[
                    {
                        name:"Abraão Vitor Lopes Dantas",
                        entrance:"2017.2",
                        email:"XXX",
                        areasOfInterest:"XX",
                        lattes:"X"
                    },
                    {
                        name:"Abraão Vitor Lopes Dantas",
                        entrance:"2017.2",
                        email:"XXX",
                        areasOfInterest:"XX",
                        lattes:"X"
                    },
                    {
                        name:"Abraão Vitor Lopes Dantas",
                        entrance:"2017.2",
                        email:"XXX",
                        areasOfInterest:"XX",
                        lattes:"X"
                    },
                    {
                        name:"Abraão Vitor Lopes Dantas",
                        entrance:"2017.2",
                        email:"XXX",
                        areasOfInterest:"XX",
                        lattes:"X"
                    }
                ]
            }
        },
        components:{
            About
        }
    }
</script>

<style scoped>

</style>