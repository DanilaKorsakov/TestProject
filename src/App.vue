<template>
    <div class="emulator">
        <div class="emulator__horizontal-lines">
            <Elevator  ref="elevator"></Elevator>
        </div>
        <Floor @floor-height="floorHeight" @change-floor="changeFloor"/>
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
            const changeFloor = (floorIndex)=>{
                floors.value.push(floorIndex);
                console.log(floors.value);
            };
            const floorHeight = (elevatorHeight)=>{
                height.value = elevatorHeight;
                elevator.value.$el.style.height=height.value+'px';
            };
            watch(floors.value, () => {
                    elevator.value.$el.style.transform  = 'translateY( ' + (-height.value*(floors.value[0]-1)) + 'px)';
                    elevator.value.$el.style.transition = 'all ' + ( floors.value[0]-1) +  's ease-in-out';
            }, { deep: true }
            );
            return {
                floors,
                floorHeight,
                elevator,
                changeFloor,
                floorHeight
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