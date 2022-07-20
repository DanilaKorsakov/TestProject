<template>
    <div class="emulator">
        <div class="emulator__horizontal-lines">
            <Elevator :queue="queue" ref="elevator"
                      :prev-floor="prevFloor"
                      @elevator:arrived="onElevatorArrived"
                      @elevator:ready="onElevatorReady"
            />
        </div>
        <Floors :floors="floors"
                @floor-height="floorHeight"
                @change-floor="changeFloor"/>
    </div>
</template>

<script>
    import {defineComponent, onMounted, ref, watch} from 'vue';
    import Elevator from './components/Elevator.vue';
    import Floors from './components/Floors.vue';

    export default defineComponent({
        name: 'App',
        components: {
            Elevator,
            Floors,
        },
        setup: function () {

            const state = {
                currentFloor: window.localStorage.getItem('currentFloor') || 0
            };

            const elevator = ref(null);
            const height = ref('');
            const queue = ref([]);

            const floors = ref([]);
            const currentFloor = ref(parseInt(state.currentFloor));

            const floorsCount = 5;
            const prevFloor = ref(parseInt(state.currentFloor));

            const changeFloor = (floorNumber) => {
                currentFloor.value = floorNumber;
            };

            const floorHeight = (elevatorHeight) => {

                if (height.value) {
                    return
                }

                height.value = elevatorHeight;
                elevator.value.$el.style.height = elevatorHeight + 'px';

                const floor = floors.value.find(f => f.number === parseInt(state.currentFloor));

                if (floor) {
                    elevator.value.$el.style.transform = `translateY( ${(-height.value * (floor.number - 1))}px)`;
                }
            };

            const onQueueUpdated = () => {
                if (queue.value.length === 0) {
                    return
                }

                const floor = floors.value.find(f => f.number === queue.value[0]);

                if (!floor) {
                    return
                }

                elevator.value.$el.style.transition = `all ${Math.abs(prevFloor.value - queue.value[0])}s linear`;
                elevator.value.$el.style.transform = `translateY( ${(-height.value * (queue.value[0] - 1))}px)`;
            };

            const onCurrentFloorUpdated = () => {
                const alreadyInQueue = queue.value.includes(currentFloor.value, 0);

                if (!alreadyInQueue) {
                    queue.value.push(currentFloor.value);

                    const floor = floors.value.find(f => f.number === currentFloor.value);

                    if (floor) {
                        floor.active = true;
                    }
                }
            }

            const onElevatorArrived = () => {
                const floor = floors.value.find(f => f.number === queue.value[0]);

                if (!floor) {
                    return
                }

                floor.active = false;
                window.localStorage.setItem('currentFloor', floor.number);
            };

            const onElevatorReady = () => {
                prevFloor.value = queue.value[0];
                queue.value.shift();
            };

            watch(queue.value, onQueueUpdated);
            watch(currentFloor, onCurrentFloorUpdated);

            onMounted(() => {

                for (let i = floorsCount; i > 0; i--) {
                    floors.value.push({
                        number: i,
                        active: false
                    });
                }

            });

            return {
                queue,
                floors,
                elevator,
                prevFloor,
                onElevatorArrived,
                onElevatorReady,
                floorHeight,
                changeFloor
            }
        },
    })
</script>

<style lang="scss">
    .emulator {
        position: relative;

        &__horizontal-lines {
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
