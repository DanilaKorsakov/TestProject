<template>
    <div class="floor" ref="floorRef" v-for="(floor, index) in floorArrayReverse">
        <div class="floor__index">{{floorArray[index]}}</div>
        <Btn :index="floorArray[index]" @index-change="indexChange"></Btn>
    </div>
</template>

<script>
    import Btn from "../components/Btn.vue";
    import {computed, ref, defineComponent, onMounted } from "vue";
    export default defineComponent( {
        name: 'Floor',
        components:{
            Btn
        },
        setup: function(props,{emit}) {
            const floorArray= ref([1,2,3,4,5]);
            const floorRef = ref('1');
            const floorHeight = computed( () => floorRef.value[0].offsetHeight);
            const floorArrayReverse = computed( () => floorArray.value.reverse());
            onMounted(() => {
                emit('floor-height', floorHeight.value);
            });
            const indexChange =  (index)=>{
                emit('change-floor',index);
            };
            return {
                floorRef,
                floorHeight,
                floorArray,
                floorArrayReverse,
                indexChange
            };

        },

    })
</script>

<style lang="scss">
    .floor{
        width: 100%;
        border: 0.5px solid #f1ecec;
        border-left: none;
        border-right: none;
        height: 200px;
        box-sizing: border-box;

        &__index{
            color: #9c9898;
            font-size: 25px;
            margin: 20px 0 0 200px
        }
    }
</style>