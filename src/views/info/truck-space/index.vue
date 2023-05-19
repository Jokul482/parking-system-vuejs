<template>
    <div>
        <el-card class="box-card" header="条件筛选">
            <el-form :inline="true" :model="form" ref="searchRef" class="demo-form-inline">
                <el-form-item label="车位号：" prop="carNumber">
                    <el-input v-model="form.carNumber" placeholder="请输入车牌号" style="width: 240px;"></el-input>
                </el-form-item>
                <el-form-item label="车位区域：" prop="area">
                    <el-select v-model="form.area" placeholder="请选择车位区域" style="width: 240px;">
                        <el-option v-for="item in vehicleArea" :key="item.value" :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="车位状态：" prop="status">
                    <el-select v-model="form.status" placeholder="请选择车位状态" style="width: 240px;">
                        <el-option v-for="item in vehicleStatus" :key="item.value" :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="form.pageNum = 1, getList()">搜索</el-button>
                    <el-button @click="cancel('searchRef')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="box-card mt-24">
            <div slot="header" class="card-center">
                <span>车位信息列表</span>
                <div>
                    <el-button type="primary" @click="addVehicle">添加</el-button>
                    <el-button type="primary" @click="exportExcel" :loading="exportLoading">一键导出</el-button>
                </div>
            </div>
            <el-table :data="tableData" border ref="tableRef" @select="handleSelection"
        @select-all="handleSelectionAll">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column type="index" label="序号" width="50">
                </el-table-column>
                <el-table-column prop="carNumber" label="车位号">
                </el-table-column>
                <el-table-column prop="area" label="车位区域">
                    <template v-slot="{ row, column }">{{ getArea(row[column.property]) }}</template>
                </el-table-column>
                <el-table-column prop="chargeHour" label="每小时收费(元)">
                </el-table-column>
                <el-table-column prop="type" label="车位类型">
                    <template v-slot="{ row, column }">{{ getType(row[column.property]) }}</template>
                </el-table-column>
                <el-table-column prop="status" label="车位状态">
                    <template v-slot="{ row, column }">{{ row[column.property] == 1 ? "空闲" : "正在使用" }}</template>
                </el-table-column>
                <el-table-column prop="remarks" label="备注">
                    <template v-slot="{ row, column }">{{ row[column.property] ? row[column.property] : "--" }}</template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleUpdate(scope.row.id)">编辑</el-button>
                        <el-button type="text" @click="handleDelete(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <pagination v-show="total > 0" :total="total" :page.sync="form.pageNum"
                :limit.sync="form.pageSize" @pagination="getList" />
        </el-card>

        <!-- 添加车位 -->
        <el-dialog title="添加车位" :visible.sync="dialogVisible" width="30%" @close="resetForm('ruleForm')">
            <el-form label-position="left" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px"
                empty-text="暂无数据">
                <el-form-item label="区域：" prop="area">
                    <el-select v-model="ruleForm.area" placeholder="请选择车位区域" style="width: 240px;">
                        <el-option v-for="item in vehicleArea" :key="item.value" :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="车位号：" prop="carNumber">
                    <el-input v-model="ruleForm.carNumber" :disabled="!ruleForm.area" placeholder="请输入车位号"
                        autocomplete="off" style="width: 240px;"></el-input>
                </el-form-item>
                <el-form-item label="车位类型：" prop="type">
                    <el-select v-model="ruleForm.type" placeholder="请选择车位类型" style="width: 240px;">
                        <el-option v-for="item in vehicleType" :key="item.value" :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="每小时收费：" prop="chargeHour">
                    <el-input v-model="ruleForm.chargeHour" placeholder="请输入每小时收费额" autocomplete="off"
                        style="width: 240px;"></el-input>
                </el-form-item>
                <el-form-item label="备注：" prop="remarks">
                    <el-input v-model="ruleForm.remarks" placeholder="请输入备注" autocomplete="off"
                        style="width: 240px;"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm('ruleForm')">取 消</el-button>
                <el-button type="primary" @click="onSubmit('ruleForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { vehicleArea, vehicleType, vehicleStatus, getArea, getType } from "@/utils/basic-dictionary"
import { getVehicleList, postAddVehicle, getVehicleInfo, postUpdateVehicleInfo, deleteVehicleInfo } from "@/api/vehicle"
import saveExcel from '@/utils/saveExcel.js'
export default {
    components: {},
    data() {
        return {
            // 查询条件
            form: {
                area: "",
                carNumber: "",
                status: "",
                pageNum: 1,
                pageSize: 2
            },
            total: 0,
            queryParams: {
                pageNum: 1,
                pageSize: 10
            },
            tableData: [],
            vehicleArea: vehicleArea,
            vehicleType: vehicleType,
            vehicleStatus: vehicleStatus,
            getArea: getArea,
            getType: getType,
            // 添加用户
            ruleForm: {
                carNumber: "",
                area: "",
                type: "",
                chargeHour: "",
                remarks: "",
                status: 1
            },
            title: "添加车位",
            dialogVisible: false,
            rules: {
                carNumber: [
                    { required: true, message: '请输入车位号', trigger: 'blur' },
                ],
                area: { required: true, message: '请选择车位区域', trigger: ['blur', 'change'] },
                type: { required: true, message: '请选择车位类型', trigger: 'blur' },
                chargeHour: { required: true, message: '请输入每小时收费额', trigger: 'blur' },
            },
            multipleSelection: {},
            exportLoading: false,
            multipleSelection: {},
            exportList: []
        };
    },
    created() {
        this.getList();
    },
    methods: {
        getList() {
            getVehicleList(this.form).then(({ data, total }) => {
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
        // 添加车位
        addVehicle(id) {
            this.dialogVisible = true;
            this.title = "添加车位";
        },
        onSubmit(formName) {
            if (this.title === "添加车位") {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        postAddVehicle(this.ruleForm).then(({ status, message }) => {
                            if (status === 0) {
                                this.msgSuccess(message);
                                this.dialogVisible = false;
                                this.getList();
                            }
                        })
                    }
                });
            } else {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        postUpdateVehicleInfo(this.ruleForm).then(({ status, message }) => {
                            if (status === 0) {
                                this.msgSuccess(message);
                                this.dialogVisible = false;
                                this.getList();
                            }
                        })
                    }
                });
            }
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.dialogVisible = false;
        },
        // 编辑
        handleUpdate(id) {
            this.title = "编辑车位";
            this.dialogVisible = true;
            getVehicleInfo({ id }).then(({ status, data }) => {
                if (status === 0) {
                    this.ruleForm = data;
                }
            })
        },
        // 删除
        handleDelete(id) {
            this.$confirm('此操作将删除该车位, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteVehicleInfo(id).then(({ status, message }) => {
                    if (status == 0) {
                        this.msgSuccess(message);
                        this.getList();
                    }
                })
            })
        },
        // 重置
        cancel(formName) {
            this.$refs[formName].resetFields();
            this.getList();
        },
        // 导出数据Excel
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
                    key: '车位号',
                    value: 'carNumber'
                }, {
                    key: '区域',
                    value: 'area'
                }, {
                    key: '每小时收费(元)',
                    value: 'chargeHour'
                }, {
                    key: '车位类型',
                    value: 'type'
                }, {
                    key: '车位状态',
                    value: 'status'
                }, {
                    key: '备注',
                    value: 'remarks'
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
                saveExcel(options, this.exportList, '车位信息');
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