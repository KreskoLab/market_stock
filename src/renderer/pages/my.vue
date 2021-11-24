<template>
    <div class="w-full text-light-900 py-4">

        <h1 class="text-center text-xl">Придбані акції</h1>

        <div class="flex flex-col space-y-3 px-4 py-3">


            <div class="flex flex-row justify-evenly py-3 px-2 border-2 border-light-900" v-for="(share, i) in shares" :key="i">

                <p class="text-blue-300">{{share.company}}</p>

                <p>{{share.quantity}} акцій</p>

                <p class="text-amber-200">{{share.purchase_price}} $</p>

                <p class="text-amber-200">{{ current_price(share) }} $</p>

            </div>


        </div>

    </div>
</template>

<script>
export default {
    computed: {
        shares() {
            return this.$store.state.user.info.shares
        }
    },
    methods: {
        current_price(share) {

            let company = this.$store.state.companies.companies.find(item => item.name == share.company)

            console.log(company, share);

            let stocks = this.$store.state.stocks.stocks
            let stock = stocks.find(item => item.code == company.stock)

            let company_bids = stock.bids.filter(item => item.company == share.company)   

            if (company_bids.length > 0) {
                let company_bids_shares = company_bids.map(item => item.share_price)
                return Math.min(...company_bids_shares)
            }

            else {
                return share.purchase_price
            }
        }
    }
}
</script>