<template>
    <div class="emulator">
        <div class="emulator__horizontal-lines">
            <Elevator/>
        </div>
        <Flor v-for="flor in 5"></Flor>
    </div>
</template>

<script>
    import {defineComponent} from 'vue'
    import Elevator from "./components/Elevator.vue";
    import Flor from "./components/Flor.vue";
    export default defineComponent ( {
        name: 'App',
        data (){
            return {

            }
        },
        methods: {

        },
        components: {
            Elevator,
            Flor,
        }
    })
</script>

<style lang="scss">
    .emulator{
        position: relative;
        height: 100vh;
        &__horizontal-lines{
            width: 150px;
            border: 3px solid #9c9898;
            border-top: none;
            border-bottom: none;
            height: 100%;
            position: absolute;
            bottom: 0;
        }
    }

</style>