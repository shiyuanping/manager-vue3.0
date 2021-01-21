<template>
    <div id="app">
        <router-view v-slot="{ Component }">
            <transition>
                <keep-alive>
                    <component :is="Component" />
                </keep-alive>
            </transition>
        </router-view>
    </div>
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
