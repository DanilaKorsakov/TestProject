<template>
    <div class="floor" ref="floorRef" v-for="(floor, index) in floors">
        <div class="floor__index">{{ floor.number }}</div>
        <Btn :active="floor.active"
             @call-elevator="changeFloor(floor.number)"
        />
    </div>
</template>

<script>
    import Btn from '../components/Btn.vue';
    import { defineComponent, onUpdated, ref } from 'vue';

    export default defineComponent({
        name: 'Floors',

        components: {
            Btn
        },

        props: {
          floors: {
              type: Array,
              default: [],
              required: true
          }
        },

        emits: ['floor-height', 'change-floor'],

        setup: function (props, {emit}) {
            const floorRef = ref(null);

            const changeFloor = (number) => {
                emit('change-floor', number);
            };

            onUpdated(() => {
                emit('floor-height', floorRef.value[0].offsetHeight);
            });

            return {
                floorRef,
                changeFloor
            };

        },

    })
</script>

<style lang="scss">
    .floor {
        width: 100%;
        border: 0.5px solid #f1ecec;
        border-left: none;
        border-right: none;
        height: 200px;
        box-sizing: border-box;

        &__index {
            color: #9c9898;
            font-size: 25px;
            margin: 20px 0 0 200px
        }
    }
</style>
