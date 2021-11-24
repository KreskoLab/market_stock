<template>
    <div class="text-light-100">


        <div class="w-full py-4 border-2 border-teal-400">

            <h1 class="text-center text-xl text-amber-200">{{stock.name}}</h1>

        </div>

        <div class="flex flex-row justify-evenly py-4 px-4 border-2 border-teal-400">

            <h1>Компаній: {{stock.companies.length}}</h1>

            <h1>Капіталізація акцій: $ {{companies_capitalization}}</h1>

        </div>

        <div class="py-2 px-3">

            <div class="flex flex-row justify-between my-3">

                <h1 class="text-green-400">BID</h1>

                <h1 class="text-green-400 cursor-pointer" @click="buy()">{ придбати }</h1>

            </div>

            <div class="table border-2 border-green-400 w-full my-2">

                <div class="table-header-group">
                    <div class="table-row">
                        <div class="table-cell pl-2 pt-2">Компанія</div>
                        <div class="table-cell">Кількість</div>
                        <div class="table-cell">Вартість</div>
                    </div>
                </div>

                <div class="table-row-group">

                    <div class="table-row" v-for="(bid, i) in bids" :key="i">

                        <div class="table-cell text-blue-300 px-2 pt-3">{{bid.company}}</div>
                        <div class="table-cell text-light-900">{{bid.quantity}}</div>
                        <div class="table-cell text-amber-200 pb-1">{{bid.share_price}} $</div>

                    </div>

                </div>

            </div>

            <div class="flex flex-row justify-between my-3">

                <h1 class="text-red-400">ASK</h1>

                <h1 class="text-red-400 cursor-pointer" @click="sell()">{ продати }</h1>

            </div>

            <div class="table border-2 border-red-400 w-full my-2">

                <div class="table-header-group">
                    <div class="table-row">
                        <div class="table-cell pl-2 pt-2">Компанія</div>
                        <div class="table-cell">Кількість</div>
                        <div class="table-cell">Вартість</div>
                    </div>
                </div>

                <div class="table-row-group" >

                    <div class="table-row" v-for="(ask, i) in asks" :key="i">

                        <div class="table-cell text-blue-300 px-2 pt-3">{{ask.company}}</div>

                        <div class="table-cell text-light-900">{{ask.quantity}}</div>

                        <div class="table-cell text-amber-200 pb-1">{{ask.share_price}} $</div>

                    </div>

                </div>

            </div>

        </div>
        
        <Modal 
            :companies="stock_companies" 
            :fee="stock.fee"
            :buy="is_buy" 
            v-if="show" 
            @hide="show = false"
            @transaction="processing($event)" 
        />

    </div>
</template>

<script>
export default {
    computed: {

        code() {
            return this.$store.state.user.info.stock
        },

        stock() {
            return this.$store.state.stocks.stocks.find(item => item.code == this.code)
        },

        stock_companies() {
            return this.$store.state.companies.companies.filter(item => item.stock == this.code)
        },

        companies_capitalization() {
            var cap = this.stock_companies.reduce((pv, cv) => pv + cv.capitalization, 0)

            if ( Math.abs(Number(cap)) >= 1.0e+9 ) {
                return (Math.abs(Number(cap)) / 1.0e+9).toFixed(2) + " B"
            }

            if ( Math.abs(Number(cap)) >= 1.0e+6 ) {
                return (Math.abs(Number(cap)) / 1.0e+6).toFixed(2) + " M"
            }
        },

        asks() {
            return this.stock.asks
        },

        bids() {
            return this.stock.bids
        }
    },
    methods: {

        buy() {
            this.is_buy = true
            this.show = true
        },

        sell() {
            this.is_buy = false
            this.show = true
        },

        processing(val) {
            
            if (this.is_buy) {
                this.$store.dispatch('user/buy', val)
            } 

            else {
                this.$store.dispatch('user/sell', val)
            }

            this.is_buy = false
            this.show = false
        }
    },
    data() {
        return {
            show: false,
            is_buy: false
        }
    }
}
</script>