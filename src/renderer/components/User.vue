<template>
    <div class="h-full text-light-50 px-6 py-3">

      <div class="flex flex-col py-1 space-y-3">

        <p>{{user.name}}</p>

        <div class="flex">
          <p>Баланс:</p>
          <p class="ml-2 text-amber-200">{{user.capital}} $</p>
        </div>

        <div class="flex">
          <p>Дохід:</p>
          <p class="ml-2 text-amber-200">{{user.revenue}} $</p>
        </div>
        
        <div class="flex">
          <p>Дата:</p>
          <p class="ml-2">{{time}}</p>
        </div>


      </div>

    </div>
</template>

<script>
export default {
  computed: {
    time() {
      return this.$store.state.time.time
    },
    user() {
      return this.$store.state.user.info
    }
  }
}
</script>