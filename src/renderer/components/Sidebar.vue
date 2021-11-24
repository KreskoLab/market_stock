<template>
    <ul class="space-y-6 text-white">
        <li 
            v-for="item in items" 
            :key="item.name" 
        >
            <NuxtLink :to="item.link" class="flex items-center space-x-3">
                <img height="38" width="38" :src="require(`~/assets/${item.img}.png`)">
                <span>{{item.name}}</span>
            </NuxtLink>
        </li>
    </ul>
</template>

<script>
export default {
    data() {
        return {
            items: [
                {
                    name: 'Біржи',
                    img: 'bank',
                    link: 'stocks'
                },
                {
                    name: 'Торги',
                    img: 'analytics',
                    link: 'trades'
                },
                {
                    name: 'Компанії',
                    img: 'company',
                    link: 'companies'
                },
                {
                    name: 'Портфель',
                    img: 'coin',
                    link: 'my'
                }
            ]
        }
    }
}
</script>