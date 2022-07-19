<template>
    <div class="emulator">
        <div class="emulator__horizontal-lines">
            <Elevator :floor="floors" ref="elevator"></Elevator>
        </div>
        <Floor @floor-height="floorHeight"  @change-floor="changeFloor"></Floor>
    </div>
</template>

<script>
    import { ComputedRef, defineComponent, ref, Ref, watch } from 'vue';
    import Elevator from "./components/Elevator.vue";
    import Floor from "./components/Floor.vue";
    export default defineComponent ( {
        name: 'App',
        components: {
            Elevator,
            Floor,
        },
        setup: function(props, {emit}) {
            const floors = ref([]);
            const elevator = ref('');
            const height = ref ('');
            const animationTime = ref(0);
            const prevFloor = ref(0);
            const floor = ref('');
            const changeFloor = (floorIndex)=>{
                    if(floors.value.length<1){
                        floors.value.push(floorIndex);
                    }else{
                        if(!floors.value.includes(floorIndex)){
                            floors.value.push(floorIndex);
                        }
                    }
            };
            const floorHeight = (elevatorHeight)=>{
                height.value = elevatorHeight;
                elevator.value.$el.style.height=height.value+'px';
            };
            watch(floors.value, () => {
                    if(prevFloor.value===0){
                        animationTime.value = floors.value[0]-1;
                    }else if(prevFloor.value>floors.value[0]){
                        animationTime.value = prevFloor.value-floors.value[0];
                    }else{
                        animationTime.value = floors.value[0]-prevFloor.value;
                    }
                    elevator.value.$el.style.transform  = 'translateY( ' + (-height.value*(floors.value[0]-1)) + 'px)';
                    elevator.value.$el.style.transition = 'all ' + (animationTime.value) +  's ease-in-out';
                    if(floors.value.length!==0){
                        prevFloor.value=floors.value[0];
                    }
            }, { deep: true });
            // watch(endTransition.value,()=>{
            //     console.log(floor.value);
            // });
            return {
                floors,
                elevator,
                animationTime,
                prevFloor,
                floor,
                floorHeight,
                changeFloor,
            }
        },
    })
</script>

<style lang="scss">
    .emulator{
        position: relative;

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