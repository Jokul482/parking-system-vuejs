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
                <el-button type="primary" @click="exportExcel" :loading="exportLoading">一键导出</el-button>
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
            <el-table :data="tableData" border style="width: 100%" ref="tableRef" @select="handleSelection"
                @select-all="handleSelectionAll">
                <el-table-column type="selection" width="55"></el-table-column>
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
                <el-table-column prop="chargeHour" label="每小时收费(元)">
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <pagination v-show="total > 0" :total="total" :page.sync="form.pageNum"
                :limit.sync="form.pageSize" @pagination="getList" />
        </el-card>
    </div>
</template>

<script>
import { getVehicleList, getStatisticsData } from "@/api/vehicle";
import { vehicleArea, getArea, getType, vehicleStatus } from "@/utils/basic-dictionary"
import saveExcel from '@/utils/saveExcel.js'
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
                pageSize: 2
            },
            total: 0,
            loading: false,
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
            },
            exportLoading: false,
            multipleSelection: {},
            exportList: []
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
                setTimeout(() => {
                    if (this.multipleSelection[this.form.pageNum]) {
                        this.multipleSelection[this.form.pageNum].forEach((row) => {
                            data.forEach((list) => {
                                if (list.id == row.id) {
                                    this.$refs.tableRef.toggleRowSelection(list, true);
                                }
                            });
                        });
                    }
                }, 0);
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
            this.exportLoading = true;
            this.exportList = [];
            for (let key in this.multipleSelection) {
                this.multipleSelection[key].forEach(item => {
                    if (this.exportList.indexOf(item) == -1) {
                        this.exportList.push(item)
                    }
                })
            }
            if (this.exportList.length === 0) {
                this.exportLoading = false;
                this.msgWarning('请选择需要导出的车辆登记信息!');
            } else {
                const options = [{
                    key: '区域',
                    value: 'area'
                }, {
                    key: '车位号',
                    value: 'carNumber'
                }, {
                    key: '车位状态',
                    value: 'status'
                }, {
                    key: '车位类型',
                    value: 'type'
                }, {
                    key: '每小时收费(元)',
                    value: 'chargeHour'
                }]
                this.exportList.forEach(item => {
                    if (item.area == "1") item.area = 'A区';
                    if (item.area == "2") item.area = 'B区';
                    if (item.area == "3") item.area = 'C区';
                    if (item.type == 1) item.type = '小型车车位';
                    if (item.type == 2) item.type = '中型车车位';
                    if (item.type == 3) item.type = '大型车车位';
                    if (item.status == 1) item.status = '空闲'
                    else item.status = '正在使用'
                })
                saveExcel(options, this.exportList, '车位信息数据统计');
                this.exportLoading = false;
                this.multipleSelection = {};
                this.getList();
            }
        },
        // 获取分页多选框的数据
        handleSelectionAll(val) {
            this.multipleSelection[this.form.pageNum] = val;
        },
        handleSelection(val) {
            this.multipleSelection[this.form.pageNum] = val;
        }
    }
}

</script>
<style lang='scss' scoped></style>