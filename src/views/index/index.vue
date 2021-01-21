<template>
<div class="index">
    <div :class="[isCollapse ? 'asideFold' : 'aside']">
        <el-menu class="el-menu-vertical-demo"
            :uniqueOpened="true"
            :default-active="route.path"
            :collapse="isCollapse"
            :collapse-transition="false"
            :router="true"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <template v-for="(menu, index) in menuList" :key="index">
                <el-submenu :index="menu.index" v-if="menu.children">
                    <template #title>
                        <i class="el-icon-location"></i>
                        <span>{{menu.name}}</span>
                    </template>
                    <el-menu-item :index="item.url" v-for="(item, i) in menu.children" :key="i" @click="addTab(item)">{{item.name}}</el-menu-item>
                </el-submenu>
                <el-menu-item :index="menu.url" v-if="!menu.children"  @click="addTab(menu)">
                    <i class="el-icon-menu"></i>
                    <template #title>{{menu.name}}</template>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
    <div :class="[isCollapse ? 'sectionFold' : 'section']">
        <div class="header">
            <div class="fold" @click="handleCollapse">
                <i class="el-icon-s-fold"></i>
            </div>
            <div class="avatar">
                <el-dropdown @command="handleCommand">
                    <div class="userInfo el-dropdown-link">
                        <el-avatar :size="40" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
                        <div class="user">管理员 <i class="el-icon-arrow-down el-icon--right"></i></div>
                    </div>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item  command="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
        <div class="tabs">
            <el-tabs v-model="selectedTab" type="card" closable @tab-remove="removeTab" @tab-click="clickTab">
                <el-tab-pane name="/home">
                    <template #label>
                        <span><i class="el-icon-s-home"></i> 首页</span>
                    </template>
                </el-tab-pane>
                <el-tab-pane v-for="item in tabList" :key="item.name" :label="item.title" :name="item.name"></el-tab-pane>
            </el-tabs>
        </div>
        <div class="content">
            <keep-alive>
                <router-view />
            </keep-alive>
        </div>
    </div>
</div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';
export default {
  setup() {
    const route = useRoute();
    console.log(route);
    const router = useRouter()
    const state = reactive({
        isCollapse: false,
        selectedTab: '/home',
        tabList: [],
        tabIndex: 1,
        defaultOpenArray: ['2'],
        menuList: [
            {
                name: '首页',
                url: '/home',
                index: '1'
            },
            {
                name: '系统管理',
                index: '2',
                url: '',
                children: [
                    {
                        name: '菜单管理',
                        url: '/menu',
                    },
                    {
                        name: '用户管理',
                        url: '/user',
                    },
                    {
                        name: '角色管理',
                        url: '/role',
                    }
                ]
            },
            {
                name: '展商管理',
                index: '3',
                url: '',
                children: [
                    {
                        name: '2020秋季参展商列表',
                        url: '/2020AutumnExhibitorList',
                    },
                    {
                        name: '参展商列表',
                        url: '/exhibitorList',
                    },
                ]
            },
        ]
    })

    const currentPath = route.path;
    if (currentPath != '/home') {
        state.tabList.push({
            title: route.name,
            name: currentPath,
        });
        state.selectedTab = currentPath;
    }

    function handleCollapse() {
        state.isCollapse = !state.isCollapse;
    }
    function addTab(data) {
        console.log(data);
        if (data.url == '/home') {
            state.selectedTab = data.url;
            return;
        }
        const existTab = state.tabList.find(u => {
            return u.name == data.url
        })
        if (existTab) {
            state.selectedTab = existTab.name;
        } else {
            state.tabList.push({
                title: data.name,
                name: data.url,
            });
            state.selectedTab = data.url;
        }
    }
    function removeTab(targetName) {
        console.log(targetName);
        const tabs = state.tabList;
        let activeName = state.selectedTab;
        if (targetName === activeName) {
            tabs.forEach((tab, index) => {
                if (tab.name === targetName) {
                    const nextTab = tabs[index + 1] || tabs[index - 1];
                    if (nextTab) {
                        activeName = nextTab.name;
                    }
                }
            });
        }
        console.log(activeName)
        if (route.path != activeName) {
            router.push(activeName);
        }
        state.selectedTab = activeName;
        state.tabList = tabs.filter(tab => tab.name !== targetName);
    }
    function clickTab(tab, event) {
        console.log(tab.paneName);
        console.log(event);
        console.log(route.path);
        if (tab.paneName == route.path) {
            return;
        }
        router.push(tab.paneName);
    }
    function handleSelect(event) {
        console.log(event);
    }
    function handleCommand(command) {
        console.log(command);
        if (command == 'logout') {
            router.push('/login');
        }
    }
    
    return {
        ...toRefs(state),
        route,
        router,
        handleCollapse,
        addTab,
        removeTab,
        clickTab,
        handleSelect,
        handleCommand
    }
  },
  components: {
  }
}
</script>

<style lang="scss">
.el-menu {
    height: 100%;
}
.horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
}
.index .el-tabs__item:nth-child(1) .el-icon-close{
    display: none;
 }
 .el-tabs--card>.el-tabs__header .el-tabs__item:nth-child(1).is-closable:hover {
    padding-left: 20px;
    padding-right: 20px;
}
.index {
    width: 100%;
    height: 100%;
    position: relative;
    .aside {
        position: absolute;
        width: 256px;
        height: 100%;
    }
    .asideFold {
        position: absolute;
        width: 65px;
        height: 100%;
    }
    .sectionFold {
        position: absolute;
        width: calc(100% - 65px);
        height: 100%;
        margin-left: 65px;
    }
    .section {
        position: absolute;
        width: calc(100% - 256px);
        height: 100%;
        margin-left: 256px;
        display: flex;
        flex-direction: column;
    }
    .header {
        height: 60px;
        display: flex;
        padding: 0 10px;
        justify-content: space-between;
        .fold {
            width: 40px;
            display: flex;
            align-items: center;
        }
        .avatar {
            // width: 100px;
            display: flex;
            align-items: center;
            .userInfo {
                display: flex;
                align-items: center;
            }
            .user {
                margin-left: 8px;
                font-size: 14px;
            }
        }
    }
    .tabs {
        height: 40px;
    }
    .content {
        height: 100%;
        padding: 12px;
        overflow-y: auto;
    }
}
</style>
