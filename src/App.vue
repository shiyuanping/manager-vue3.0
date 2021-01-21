<template>
    <router-view v-slot="{ Component }">
    <transition>
        <keep-alive>
        <component :is="Component" />
        </keep-alive>
    </transition>
    </router-view>
</template>

<style lang="scss">
html,
body,
#app {
    height: 100%;
    margin: 0;
}
body .el-table th.gutter{
    display: table-cell!important;
}
</style>
