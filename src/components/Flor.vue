<template>
    <div class="flor">
        <Btn/>
    </div>
</template>

<script>
    import Btn from "../components/Btn.vue";
    export default  {
        name: 'Flor',
        data (){
            return {

            }
        },
        methods: {

        },
        components:{
            Btn
        }
    }
</script>

<style lang="scss">
    .flor{
        width: 100%;
        border: 0.5px solid #f1ecec;
        border-left: none;
        border-right: none;
        height: 20%;
        box-sizing: border-box;
    }
</style>