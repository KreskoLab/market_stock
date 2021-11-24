<template>
    <div class="table-row border-red-400 border-2">
        <div class="table-cell py-6">{{item.name}}</div>
        <div class="table-cell">{{item.type}}</div>
        <div class="table-cell">{{item.stock}}</div>
        <div class="table-cell">$ {{converted_capitalization}}</div>
    </div>
</template>

<script>
export default {
    props: {
        item: Object
    },
    computed: {
        converted_capitalization() {

            if ( Math.abs(Number(this.item.capitalization)) >= 1.0e+9 ) {
                return (Math.abs(Number(this.item.capitalization)) / 1.0e+9).toFixed(2) + " B"
            }

            if ( Math.abs(Number(this.item.capitalization)) >= 1.0e+6 ) {
                return (Math.abs(Number(this.item.capitalization)) / 1.0e+6).toFixed(2) + " M"
            }

        }
    }
}
</script>