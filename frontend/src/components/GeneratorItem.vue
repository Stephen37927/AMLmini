<template>

    <div class="columns">
        <div class="column is-one-fifth">{{ generator.name }}</div>
        <div class="column is-one-fifth">{{ generator.size }}</div>
        <div class="column is-one-fifth">{{ generator.patterns }}</div>
        <div class="column is-one-fifth">{{ generator.created_at }}</div>
        <div class="column is-one-fifth">
            <div class="buttons">
                <div class="button is-primary">G</div>
                <div class="button is-danger">D</div>
            </div>
        </div>
    </div>
  
    
</template>

<script>
export default {
    name: 'GeneratorItem',
    props: {
        generator: Object
    }
}
</script>

<style scoped>

.columns{
    margin-left: 18vw;
    min-width: 65vw;
    margin-top: 2rem;
    background-color: beige;
}
</style>