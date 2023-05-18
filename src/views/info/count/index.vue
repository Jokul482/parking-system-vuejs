<template>
    <div>
        <el-card class="card-header-not-border ht-card" v-loading="loading" header="车位概览">
            <el-row type="flex" class="ht-row">
                <el-col>
                    <div class="content">
                        <div class="num" style="color:#fa5555;">{{ count.total || 0 }}</div>
                    </div>
                    <div class="label">总车位</div>
                </el-col>
                <el-col>
                    <div class="content">
                        <div class="num" style="color:#999;">{{ count.idle || 0 }}</div>
                    </div>
                    <div class="label">当前空闲车位</div>
                </el-col>
                <el-col>
                    <div class="content">
                        <div class="num" style="color:#21d59b;">{{ count.inuse || 0 }}</div>
                    </div>
                    <div class="label">正在使用车位</div>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="box-card mt-24">
            <div slot="header" class="card-center">
                <span>车位统计列表</span>
                <el-button type="primary" @click="exportExcel">一键导出</el-button>
            </div>
            <el-form :inline="true" :model="form" ref="searchRef" class="demo-form-inline">
                <el-form-item label="区域：" prop="area">
                    <el-select v-model="form.area" placeholder="请选择车位区域" style="width: 240px;">
                        <el-option v-for="item in vehicleArea" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="车位号：" prop="carNumber">
                    <el-input v-model="form.carNumber" placeholder="请输入车牌号" style="width: 240px;"></el-input>
                </el-form-item>
                <el-form-item label="车位状态：" prop="status">
                    <el-select v-model="form.status" placeholder="请选择车位状态" style="width: 240px;">
                        <el-option v-for="item in vehicleStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="form.pageNum = 1,getList()">搜索</el-button>
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
                <el-table-column prop="status" label="车位状态">
                    <template v-slot="{ row, column }">{{ row[column.property] == 1 ? "空闲" : "正在使用" }}</template>
                </el-table-column>
                <el-table-column prop="type" label="车位类型">
                    <template v-slot="{ row, column }">{{ getType(row[column.property]) }}</template>
                </el-table-column>
                <el-table-column prop="chargeHour" label="每小时收费(￥)">
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <pagination v-show="total > 0" :total="total" :page.sync="form.pageNum"
                :limit.sync="form.pageSize" @pagination="getList" layout="prev, pager, next" />
        </el-card>
    </div>
</template>

<script>
import { getVehicleList, getStatisticsData } from "@/api/vehicle";
import { vehicleArea, getArea, getType, vehicleStatus } from "@/utils/basic-dictionary"
export default {
    components: {},
    data() {
        return {
            // 查询条件
            form: {
                area: '',
                carNumber: undefined,
                status: undefined,
                pageNum: 1,
                pageSize: 10
            },
            total: 0,
            loading: false,
            queryParams: {
                pageNum: 1,
                pageSize: 10
            },
            vehicleArea: vehicleArea,
            vehicleStatus: vehicleStatus,
            getArea: getArea,
            getType: getType,
            tableData: [],
            // 添加用户
            ruleForm: {
                username: '',
                nickname: '',
                email: ''
            },
            dialogVisible: false,
            count: {},
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                nickname: { required: true, message: '请输入昵称', trigger: 'blur' },
                email: { required: true, message: '请输入邮箱', trigger: 'blur' },
            }
        };
    },
    created() {
        this.getList();
        this.getData();
    },
    methods: {
        getList() {
            getVehicleList(this.form).then(({data, total}) => {
                this.tableData = data;
                this.total = total;
            })
        },
        getData() {
            getStatisticsData().then(({data}) => {
                this.count = data;
            })
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