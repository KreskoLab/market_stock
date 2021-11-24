<template>
    <div class="card text-white text-center px-10 py-8 my-6 mx-5" :class="border">

        <div class="py-1">
            <img class="mx-auto pb-3" width="72" height="72" :src="require(`~/assets/${item.img}.png`)">
            <h1 class="text-xl font-normal">{{item.name}}</h1>
            <p class="italic font-light pt-1">{{item.code}}</p>
        </div>

        <div class="py-3">
            <p>{{item.companies.length}} компаній</p>
            <p>{{item.traders.length}} трейдерів</p>
        </div>

        <p>Коммісія: {{item.fee}} $ за акцію</p>

    </div>
</template>

<script>
export default {
    props: {
        item: Object
    },
    computed: {
        user_stock() {
            return this.$store.state.user.info.stock
        },
        border() {
            return this.user_stock == this.item.code ? 'border-red-300' : 'border-emerald-300'
        }
    }
}
</script>

<style>
.card {
  @apply
   w-md
   rounded-md border-3
   hover:border-red-300
   hover:p-10
   duration-150
   cursor-pointer
}
</style>