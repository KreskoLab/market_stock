<template>
  <div class="text-white">
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('stocks/getStocks')
    this.$store.dispatch('companies/getCompanies')
    this.$store.dispatch('time/getTime')
    this.$store.dispatch('user/getUser')
  }
}
</script>
