<template>
    <div>
        <el-card class="card-header-not-border ht-card" v-loading="loading" header="收费概览">
            <el-row type="flex" class="ht-row">
                <el-col>
                    <div class="content">
                        <div class="num" style="color:#fa5555;">111</div>
                    </div>
                    <div class="label">总收费</div>
                </el-col>
                <el-col>
                    <div class="content">
                        <div class="num" style="color:#21d59b;">111</div>
                    </div>
                    <div class="label">A区总收费</div>
                </el-col>
                <el-col>
                    <div class="content">
                        <div class="num" style="color:#1989fa;">111</div>
                    </div>
                    <div class="label">B区总收费</div>
                </el-col>
                <el-col>
                    <div class="content">
                        <div class="num" style="color:rgb(255, 120, 1);">111</div>
                    </div>
                    <div class="label">C区总收费</div>
                </el-col>
            </el-row>
        </el-card>
        <el-card>
            <div slot="header" class="card-center">
                <span>收费统计列表</span>
                <el-button type="primary" @click="exportExcel">一键导出</el-button>
            </div>
            <el-form :inline="true" :model="form" ref="searchRef" class="demo-form-inline">
                <el-form-item label="区域：" prop="area">
                    <el-select v-model="form.area" placeholder="请选择区域">
                        <el-option label="A区" value="1"></el-option>
                        <el-option label="B区" value="2"></el-option>
                        <el-option label="C区" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="车位号：" prop="carNumber">
                    <el-input v-model="form.carNumber" placeholder="请输入车牌号" style="width: 240px;"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="queryParams.pageNum = 1, getList()">搜索</el-button>
                    <el-button @click="cancel('searchRef')">重置</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column type="index" label="序号" width="50">
                </el-table-column>
                <el-table-column prop="area" label="区域">
                    <template v-slot="{ row, column }">{{ getArea(row[column.property]) }}</template>
                </el-table-column>
                <el-table-column prop="carNumber" label="车位号">
                </el-table-column>
                <el-table-column prop="type" label="车位类型">
                    <template v-slot="{ row, column }">{{ getType(row[column.property]) }}</template>
                </el-table-column>
                <el-table-column prop="stopNum" label="今日停车量">
                </el-table-column>
                <el-table-column prop="amount" label="今日收费(￥)">
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <!-- <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
                :limit.sync="queryParams.pageSize" @pagination="getList" /> -->
        </el-card>
    </div>
</template>

<script>
import { getAccountCountList } from "@/api/access"
import { getType, getArea } from "@/utils/basic-dictionary"
export default {
    components: {},
    data() {
        return {
            // 查询条件
            form: {
                area: "",
                carNumber: ""
            },
            total: 1,
            getType: getType,
            getArea: getArea,
            queryParams: {
                pageNum: 1,
                pageSize: 10
            },
            tableData: [
                {
                    id: 1,
                    area: 'A区',
                    carNumber: 'A10',
                    type: '小型车',
                    chargeHour: '3',
                    parkQuantity: '24',
                    createTime: '2023-03-31 18:00:00',
                    status: '1',
                }
            ],
            activeName: 'second',
            loading: false
        };
    },
    created() {
        this.getList();
    },
    methods: {
        getList() {
            getAccountCountList(this.form).then(({data}) => {
                this.tableData = data;
            })
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        // 重置
        cancel(formName) {
            this.$refs[formName].resetFields();
            this.getList();
        },
        exportExcel() {

        }
    }
}

</script>
<style lang='scss' scoped></style>