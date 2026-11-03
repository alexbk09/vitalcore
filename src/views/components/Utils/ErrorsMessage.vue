<script>
export default {
    name:'ErrorMessage',
    props:{
        valueError:String,
        valueinput:String
    },
    mounted() { 
    },
}
</script>

<template>
    <div>
        <div class="" >
            <h4 class=" text-secondary">{{ valueError }} "{{ valueinput }}"</h4>
        </div>
    </div>
</template>