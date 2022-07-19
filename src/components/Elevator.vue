<template>
    <div class="elevator" :class="{blink:blinking}" @transitionend="animationFinished" @transitionstart="animationStart">
        <div class="elevator__floor-index" :style="{display:display}">
            <svg class="elevator__arrow" :class="{elevator__arrow_reverse:isReverse}" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 viewBox="0 0 330 330" style="enable-background:new 0 0 330 330;" xml:space="preserve">
                <path id="XMLID_29_" d="M100.606,100.606L150,51.212V315c0,8.284,6.716,15,15,15c8.284,0,15-6.716,15-15V51.212l49.394,49.394
                C232.322,103.535,236.161,105,240,105c3.839,0,7.678-1.465,10.606-4.394c5.858-5.857,5.858-15.355,0-21.213l-75-75
                c-5.857-5.858-15.355-5.858-21.213,0l-75,75c-5.858,5.857-5.858,15.355,0,21.213C85.251,106.463,94.749,106.463,100.606,100.606z"/></svg>
            <span>{{this.floor[0]}}</span>
        </div>
    </div>
</template>

<script>
    import { defineComponent, ref} from 'vue';
    export default defineComponent ( {
        name: 'Elevator',
        props:['floor',],
        emits:['next-in-que'],
        setup: function(props, {emit}) {
            const blinking=ref(false);
            const display= ref('none');
            const isReverse = ref(false);
            const currentFloor = ref(0);
            const animationStart = ()=>{
                display.value='flex';
            };
            const animationFinished = ()=>{
                currentFloor.value=props.floor[0];
                blinking.value=true;
                setTimeout(()=>{
                    display.value='none';
                    emit('next-in-que',props.floor.shift());
                    blinking.value=false;
                    if(props.floor[0]<currentFloor.value){
                        isReverse.value = true;
                    }else{
                        isReverse.value = false;
                    }
                },3000);
            };
            return{
                blinking,
                display,
                isReverse,
                currentFloor,
                animationFinished,
                animationStart,
            }
        }
    })
</script>

<style lang="scss">
    .elevator{
        width: inherit;
        background-color: aqua;
        position: absolute;
        bottom: 0;
        &__floor-index{
            background-color: #565353;
            margin: auto;
            margin-top: 10px;
            height: 25px;
            width: 50%;
            color: white;
            display: flex;
            justify-content: space-around;
            align-items: center;
            border-radius: 5px;
        }
        &__arrow{
            width: 15px;
            height: 15px;
            fill: white;
            &_reverse{
                transform: rotate(180deg);
            }
        }
    }
    .blink{
        animation: blinker 0.7s cubic-bezier(1.0,0,0,1.0) infinite;
    }
    @keyframes blinker {
        from { opacity: 1.0; }
        to { opacity: 0.0; }
    }
</style>