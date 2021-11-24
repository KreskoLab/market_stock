<template>
  <div class="grid grid-cols-15 grid-rows-9 h-screen space-x-1">

    <div class="row-span-full col-span-2 col-start-1 px-5 py-4 rounded-sm border-4 border-teal-400 bg-dark-900">
      <Sidebar />
    </div>

    <div class="row-span-full col-start-3 col-end-13 overflow-auto rounded-sm border-4 border-teal-400 bg-dark-900">
      <Nuxt />
    </div>

    <div class="row-span-2 col-span-3 col-start-13 rounded-sm border-4 border-teal-400 bg-dark-900">
      <User />
    </div>

    <div class="row-span-full row-start-3 col-span-3 col-start-13 rounded-sm border-4 border-teal-400 bg-dark-900">
      <News />
    </div>

  </div>
</template>