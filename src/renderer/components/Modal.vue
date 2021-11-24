<template>
    <div class="absolute inset-0 flex items-center justify-center z-10 bg-dark-900 bg-opacity-90">

        <div class="w-1/3 border-2 border-light-500 rounded">

            <div class="border-b-2 border-light-500 px-3 py-4">
                <p class="text-amber-200 text-xl text-center">
                    {{ buy ? 'Придбати' : 'Продати' }}
                </p>
            </div>

            <div class="flex flex-col justify-center items-center space-y-4 px-3 py-4">

                <div class="flex">

                    <p>Компанія:</p>

                    <select v-model="company_name" class="select ml-2">
                        <option :value="name" class="bg-dark-900" v-for="name in names" :key="name">
                            {{name}}
                        </option>
                    </select>

                </div>

                <div class="flex">
                    <p>Кількість:</p> 

                    <input 
                        class="w-32 ml-2 text_input"
                        :class="buy ? 'focus:border-green-400' : 'focus:border-red-400'"
                        v-model="quantity" 
                        type="text"
                    >

                    <p class="ml-2">акцій</p>
                </div>

                <div class="flex">
                    <p>Ціна:</p> 

                    <input 
                        class="w-32 ml-2 text_input"
                        v-model="share_price" 
                        type="text"
                    >

                    <p class="ml-2">$ за акцію</p>
                </div>

            </div>

            <div class="flex flex-row justify-between pt-3">
                <div class="cursor-pointer bg-red-400 bg-opacity-60 py-3 w-1/2" @click="hide()">
                    <p class="text-center">x</p>
                </div>
                <div class="cursor-pointer bg-green-400 bg-opacity-60 py-3 w-1/2" @click="action()">
                    <p class="text-center">{{this.price}} $</p>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
export default {
    props: {
        companies: Array,
        fee: Number,
        buy: Boolean
    },
    computed: {
        names() {
            return this.companies.map(item => item.name)
        }
    },
    data() {
        return {
            quantity: 0,
            price: 0,
            share_price: 0,
            company_name: ''
        }
    },
    methods: {
        hide() {
            this.$emit('hide')
        },
        action() {
            this.$emit('transaction', 
                { 
                    quantity: this.quantity, 
                    price: this.price, 
                    share_price: Number(this.share_price), 
                    company_name: this.company_name, 
                    stock_code: this.$store.state.user.info.stock,
                    user_name: this.$store.state.user.info.name
                }
            )
        }
    },
    watch: {
        quantity(val) {
            this.quantity = Number(val)
            if (this.share_price > 0) {
                this.price = (Number(this.share_price) + this.fee) * this.quantity
            }
        },
        share_price(val) {
            if (this.quantity > 0) {
                this.price = (Number(this.share_price) + this.fee) * this.quantity
            }
        },
        price(val) {
            this.price = Number(Number(val).toFixed(2))
        }
    }
}
</script>

<style>
    .text_input {
        @apply
        appearance-none 
        text-right
        border-b-2 border-light-500 
        bg-transparent 
        focus:outline-none
        transition
        duration-100
    }

    .select {
        @apply
        appearance-none
        bg-transparent 
        border-b-2 border-light-500 
        focus:outline-none
        transition
        duration-100
    }
</style>