<template>
    <div class="container">
        <About/>
        <h3>Membros</h3>
        
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