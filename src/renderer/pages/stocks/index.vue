<template>
    <div>
        <span>Світові Біржи</span>

        <div class="flex flex-row flex-wrap justify-center">
          <CardStock 
            v-for="stock in stocks" 
            :key="stock.code" 
            :item="stock" 
            @click.native="select(stock)"
          />
        </div>

    </div>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
  methods: {
    select(stock) {
      ipcRenderer.send('user-stock-request', stock.code)
    }
  },
  computed: {
    stocks() {
      return this.$store.state.stocks.stocks
    }
  }
}
</script>