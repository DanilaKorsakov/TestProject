<template>
    <button :class="{ 'active': active }"
            class="btn"
            @click="callElevator">
        <div class="btn__content"></div>
    </button>
</template>

<script>
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'Btn',

        props: {
            active: {
                type: Boolean,
                default: false,
                required: true
            }
        },

        setup: function (props, {emit}) {

            const callElevator = () => {
                if (!props.active.value) {
                    emit('call-elevator');
                }
            };

            return {
                callElevator
            };
        },
    })
</script>

<style lang="scss">
    .btn {
        width: 40px;
        height: 40px;
        border: 1px solid #87CEEB;
        margin: 10px 0 0 200px;
        background: none;
        border-radius: 5px;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        display: flex;
        align-items: center;
        justify-content: center;

        &__content {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 2px solid #87CEEB;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            transition: 0.3s ease-in-out;
        }

        &__content::after {
            content: '';
            background-color: #87CEEB;
            width: 10px;
            height: 10px;
            box-sizing: border-box;
            border-radius: 50%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            margin-right: -50%;
            transition: 0.3s ease-in-out;
        }
    }

    .active {
        border: 1px solid #FFA500;

        .btn {
            &__content {
                border: 2px solid #FFA500;
            }

            &__content::after {
                background-color: #FFA500;
            }
        }
    }
</style>
