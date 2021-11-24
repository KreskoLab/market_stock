<template>
    <div class="px-3">
        <div class="table border-collapse w-full my-3 text-light-100 text-center">

            <div class="table-header-group">
                <div class="table-row">
                    <div class="table-cell">Назва</div>
                    <div class="table-cell">Сфера</div>
                    <div class="table-cell">Біржа</div>
                    <div class="table-cell pb-3">Капіталізація</div>
                </div>
            </div>

            <div class="table-row-group">
                <CardCompany 
                    v-for="company in companies" 
                    :key="company.name"
                    :item="company" 
                />
            </div>

        </div>
    </div>
</template>

<script>
export default {
    computed: {
        companies() {
            return this.$store.state.companies.companies
        }
    }
}
</script>