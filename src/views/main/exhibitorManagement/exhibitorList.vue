<template>
    <div class="exhibitorList">
        <el-tabs v-model="selectedTab"  type="border-card" closable @tab-remove="removeTab">
            <el-tab-pane name="1" style="height: 100%;">
                <template #label>
                    <span><i class="el-icon-s-grid"></i> 展商列表</span>
                </template>
                <div class="listBox">
                    <div class="btnList">
                        <el-button type="primary" size="small" icon="el-icon-plus" @click="dialogFormVisible = true">添加展商账号</el-button>
                        <el-button type="primary" size="small" icon="el-icon-edit">修改所属人</el-button>
                        <el-button type="primary" size="small" icon="el-icon-edit">修改展区</el-button>
                        <el-button type="info" size="small" icon="el-icon-switch-button">注销展商账号</el-button>
                        <el-button type="success" size="small" icon="el-icon-caret-right">启用展商账号</el-button>
                        <el-button type="danger" size="small" icon="el-icon-delete">删除展商账号</el-button>
                    </div>
                    <div class="tableList">
                        <el-table height="100%" border style="width: 100%" size="small"
                            :data="tableData"
                            :highlight-current-row="true"
                            @row-dblclick="dbClick">
                            <el-table-column
                                type="index"
                                width="44">
                            </el-table-column>
                            <el-table-column
                                type="selection"
                                width="46">
                            </el-table-column>
                            <el-table-column v-for="(field, index) in formThead" :key="index"
                                :prop="field.prop"
                                :label="field.label"
                                :width="field.width">
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="pagination">
                        <el-pagination background
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage4"
                            :page-sizes="[100, 200, 300, 400]"
                            :page-size="100"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="400">
                        </el-pagination>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane
                :key="item.name"
                v-for="item in detailTabs"
                :label="item.title"
                :name="item.name"
            >
            <div class="content">
                {{item.content}}
                <el-input v-model="item.content.name" placeholder="请输入内容"></el-input>
            </div>
            </el-tab-pane>
        </el-tabs>

        <!-- <el-dialog title="表单呢" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="活动名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动区域" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog> -->
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const fields = [{
    label: '所属人',
    prop: 'person',
    width: 70
}, {
    label: '展团',
    prop: 'group',
    width: 70
}, {
    label: '展位号',
    prop: 'no',
    width: 70
}, {
    label: '公司中文名',
    prop: 'companyZh',
    width: null
}, {
    label: '公司英文名',
    prop: 'companyEn',
    width: null
}, {
    label: '合同号',
    prop: 'contract',
    width: 70
}, {
    label: '展区',
    prop: 'area',
    width: 70
}, {
    label: '国家',
    prop: 'country',
    width: 70
}, {
    label: '省份',
    prop: 'province',
    width: 70
}, {
    label: '展季',
    prop: 'season',
    width: 70
}, {
    label: '状态',
    prop: 'status',
    width: 70
}]
export default {
  setup() {
    const route = useRoute();
    console.log(route);
    const router = useRouter()
    const state = reactive({
        formThead: fields,
        selectedTab: '1',
        detailTabs: [],
        tableData: [{
            person: '',
            group: '',
            no: '',
            companyZh: '中國茶文化國際交流協會',
            companyEn: 'Chinese Tea Culture International Exchange Association',
            contract: '',
            area: '国内',
            country: '中国',
            province: '',
            season: '秋季',
            status: '注销'
        }, {
            person: '奇雯',
            group: '',
            no: '',
            companyZh: '西安张根生茶叶有限公司',
            companyEn: 'XIAN ZHANGGENSHENG TEA CO.,LTD',
            contract: '',
            area: '国内',
            country: '中国',
            province: '',
            season: '秋季',
            status: '注销'
        },{
            person: '',
            group: '',
            no: '',
            companyZh: '中國茶文化國際交流協會',
            companyEn: 'Chinese Tea Culture International Exchange Association',
            contract: '',
            area: '国内',
            country: '中国',
            province: '',
            season: '秋季',
            status: '注销'
        }, {
            person: '奇雯',
            group: '',
            no: '',
            companyZh: '西安张根生茶叶有限公司',
            companyEn: 'XIAN ZHANGGENSHENG TEA CO.,LTD',
            contract: '',
            area: '国内',
            country: '中国',
            province: '',
            season: '秋季',
            status: '注销'
        },{
            person: '',
            group: '',
            no: '',
            companyZh: '中國茶文化國際交流協會',
            companyEn: 'Chinese Tea Culture International Exchange Association',
            contract: '',
            area: '国内',
            country: '中国',
            province: '',
            season: '秋季',
            status: '注销'
        }, {
            person: '奇雯',
            group: '',
            no: '',
            companyZh: '西安张根生茶叶有限公司',
            companyEn: 'XIAN ZHANGGENSHENG TEA CO.,LTD',
            contract: '',
            area: '国内',
            country: '中国',
            province: '',
            season: '秋季',
            status: '注销'
        },{
            person: '',
            group: '',
            no: '',
            companyZh: '中國茶文化國際交流協會',
            companyEn: 'Chinese Tea Culture International Exchange Association',
            contract: '',
            area: '国内',
            country: '中国',
            province: '',
            season: '秋季',
            status: '注销'
        }, {
            person: '奇雯',
            group: '',
            no: '',
            companyZh: '西安张根生茶叶有限公司',
            companyEn: 'XIAN ZHANGGENSHENG TEA CO.,LTD',
            contract: '',
            area: '国内',
            country: '中国',
            province: '',
            season: '秋季',
            status: '注销'
        },{
            person: '',
            group: '',
            no: '',
            companyZh: '中國茶文化國際交流協會',
            companyEn: 'Chinese Tea Culture International Exchange Association',
            contract: '',
            area: '国内',
            country: '中国',
            province: '',
            season: '秋季',
            status: '注销'
        }, {
            person: '奇雯',
            group: '',
            no: '',
            companyZh: '西安张根生茶叶有限公司',
            companyEn: 'XIAN ZHANGGENSHENG TEA CO.,LTD',
            contract: '',
            area: '国内',
            country: '中国',
            province: '',
            season: '秋季',
            status: '注销'
        },{
            person: '',
            group: '',
            no: '',
            companyZh: '中國茶文化國際交流協會',
            companyEn: 'Chinese Tea Culture International Exchange Association',
            contract: '',
            area: '国内',
            country: '中国',
            province: '',
            season: '秋季',
            status: '注销'
        }, {
            person: '奇雯',
            group: '',
            no: '',
            companyZh: '西安张根生茶叶有限公司',
            companyEn: 'XIAN ZHANGGENSHENG TEA CO.,LTD',
            contract: '',
            area: '国内',
            country: '中国',
            province: '',
            season: '秋季',
            status: '注销'
        },{
            person: '',
            group: '',
            no: '',
            companyZh: '中國茶文化國際交流協會',
            companyEn: 'Chinese Tea Culture International Exchange Association',
            contract: '',
            area: '国内',
            country: '中国',
            province: '',
            season: '秋季',
            status: '注销'
        }, {
            person: '奇雯',
            group: '',
            no: '',
            companyZh: '西安张根生茶叶有限公司',
            companyEn: 'XIAN ZHANGGENSHENG TEA CO.,LTD',
            contract: '',
            area: '国内',
            country: '中国',
            province: '',
            season: '秋季',
            status: '注销'
        },{
            person: '',
            group: '',
            no: '',
            companyZh: '中國茶文化國際交流協會',
            companyEn: 'Chinese Tea Culture International Exchange Association',
            contract: '',
            area: '国内',
            country: '中国',
            province: '',
            season: '秋季',
            status: '注销'
        }, {
            person: '奇雯',
            group: '',
            no: '',
            companyZh: '西安张根生茶叶有限公司',
            companyEn: 'XIAN ZHANGGENSHENG TEA CO.,LTD',
            contract: '',
            area: '国内',
            country: '中国',
            province: '',
            season: '秋季',
            status: '注销'
        },{
            person: '',
            group: '',
            no: '',
            companyZh: '中國茶文化國際交流協會',
            companyEn: 'Chinese Tea Culture International Exchange Association',
            contract: '',
            area: '国内',
            country: '中国',
            province: '',
            season: '秋季',
            status: '注销'
        }, {
            person: '奇雯',
            group: '',
            no: '',
            companyZh: '西安张根生茶叶有限公司',
            companyEn: 'XIAN ZHANGGENSHENG TEA CO.,LTD',
            contract: '',
            area: '国内',
            country: '中国',
            province: '',
            season: '秋季',
            status: '注销'
        },{
            person: '',
            group: '',
            no: '',
            companyZh: '中國茶文化國際交流協會',
            companyEn: 'Chinese Tea Culture International Exchange Association',
            contract: '',
            area: '国内',
            country: '中国',
            province: '',
            season: '秋季',
            status: '注销'
        }, {
            person: '奇雯',
            group: '',
            no: '',
            companyZh: '西安张根生茶叶有限公司',
            companyEn: 'XIAN ZHANGGENSHENG TEA CO.,LTD',
            contract: '',
            area: '国内',
            country: '中国',
            province: '',
            season: '秋季',
            status: '注销'
        }],
        currentPage4: 4,
        dialogFormVisible: false,
        form: {
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
        },
        formLabelWidth: '120px'
    })

    function dbClick(row) {
        state.detailTabs.push({
            title: `${row.companyZh}-${row.season}`,
            name: state.detailTabs.length + 2 + '',
            content: {
                name: row.companyZh,
            }
        })
        state.selectedTab = state.detailTabs.length + 1 + '';
    }
    function removeTab(targetName) {
            let tabs = state.detailTabs;
            let activeName = state.selectedTab;
            if (targetName === activeName) {
                tabs.forEach((tab, index) => {
                    if (tab.name === targetName) {
                        let nextTab = tabs[index + 1] || tabs[index - 1];
                        if (nextTab) {
                            activeName = nextTab.name;
                        } else {
                            activeName = '1'
                        }
                    }
                });
            }
            state.selectedTab = activeName;
            state.detailTabs = tabs.filter(tab => tab.name !== targetName);
        }
    function handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
    }
    function handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
    }
    
    return {
        ...toRefs(state),
        dbClick,
        removeTab,
        handleSizeChange,
        handleCurrentChange,
    }
  },
  components: {
  }
}
</script>

<style lang="scss">


  ::-webkit-scrollbar {
    width: 13px;
    height: 13px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.4);
    background-clip: padding-box;
    border: 3px solid transparent;
    border-radius: 7px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-track:hover {
    background-color: #f8fafc;
  }

.exhibitorList {
    height: 100%;
    background-color: wheat;
    // .el-tabs__item:nth-child(2) .el-icon-close{
    //     display: none;
    // }
    .el-tabs--border-card {
        height: 100%;
    }
    .el-table .cell {
        white-space: nowrap;
    }
    .el-tabs--border-card>.el-tabs__content {
        padding: 0;
        height: calc(100% - 40px);
    }
    .content {
        background-color: #f5f5f6;
    }
    .btnList {
        height: 50px;
        line-height: 50px;
        padding: 0 12px;
    }
    .listBox {
        display: flex;
        flex-direction: column;
        height: 100%;
        .tableList {
            flex: 1;
            overflow-y: auto;
        }
        .pagination {
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-top: 2px solid #ebeef5;
        }
    }
}
</style>
