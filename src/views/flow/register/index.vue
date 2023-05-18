<template>
    <div>
        <el-card class="box-card" header="条件筛选">
            <el-form :inline="true" :model="form" ref="searchRef" class="demo-form-inline">
                <el-form-item label="车牌号：" prop="plateNumber">
                    <el-input v-model="form.plateNumber" placeholder="请输入车牌号" style="width: 240px;"></el-input>
                </el-form-item>
                <el-form-item label="车位号：" prop="carNumber">
                    <el-input v-model="form.carNumber" placeholder="请输入车位号" style="width: 240px;"></el-input>
                </el-form-item>
                <el-form-item label="车主电话：" prop="phone">
                    <el-input v-model="form.phone" placeholder="请输入车主电话" style="width: 240px;"></el-input>
                </el-form-item>
                <div>
                    <el-form-item label="是否离场：" prop="status">
                        <el-select v-model="form.status" placeholder="请选择是否离场" style="width: 240px;">
                            <el-option label="是" :value="1"></el-option>
                            <el-option label="否" :value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="queryParams.pageNum = 1, getList()">搜索</el-button>
                        <el-button @click="cancel('searchRef')">重置</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </el-card>
        <el-card class="box-card mt-24">
            <div slot="header" class="card-center">
                <span>车辆登记列表</span>
                <div>
                    <el-button type="primary" @click="addCar">添加</el-button>
                    <el-button type="primary" @click="exportExcel">一键导出</el-button>
                </div>
            </div>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column type="index" label="序号" width="50">
                </el-table-column>
                <el-table-column prop="plateNumber" label="车牌号">
                </el-table-column>
                <el-table-column prop="carNumber" label="车位号">
                </el-table-column>
                <el-table-column prop="ownerName" label="车主姓名">
                </el-table-column>
                <el-table-column prop="phone" label="车主电话">
                </el-table-column>
                <el-table-column prop="type" label="车辆类型">
                    <template v-slot="{ row, column }">{{ getCarType(row[column.property]) }}</template>
                </el-table-column>
                <el-table-column prop="exittime" label="入场时间">
                </el-table-column>
                <el-table-column prop="chargeHour" label="每小时收费(￥)">
                    <template slot-scope="scope">{{ scope.row.chargeHour }}元</template>
                </el-table-column>
                <el-table-column prop="status" label="是否离场">
                    <template slot-scope="scope">{{ scope.row.status == 1? '是' : '否' }}</template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleUpdate(scope.row.id)" v-if="scope.row.status !== 1">编辑</el-button>
                        <el-button type="text" @click="handleDelete(scope.row.id)" v-if="scope.row.status !== 2">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
                :limit.sync="queryParams.pageSize" @pagination="getList" />
        </el-card>

        <!-- 添加车辆 -->
        <el-dialog :title="title" :visible.sync="dialogVisible" width="40%" @close="resetForm('ruleForm')">
            <el-form label-position="left" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"
                empty-text="暂无数据">
                <el-form-item label="车牌号：" prop="plateNumber">
                    <el-input v-model="ruleForm.plateNumber" placeholder="请选择车牌号" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="区域：" prop="area">
                    <el-select v-model="ruleForm.area" placeholder="请选择车位区域" @change="handleVehicleList" style="width: 100%;">
                        <el-option v-for="item in vehicleArea" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="车位号：" prop="carNumber">
                    <el-select v-model="ruleForm.carNumber" :disabled="!ruleForm.area" placeholder="请选择车位号" style="width: 100%;">
                        <el-option v-for="item in vehicleList" :key="item.id" :label="item.carNumber"
                            :value="item.carNumber" :disabled="item.disabled"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="车主姓名：" prop="ownerName">
                    <el-input v-model="ruleForm.ownerName" placeholder="请输入车主姓名" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="车主电话：" prop="phone">
                    <el-input v-model="ruleForm.phone" placeholder="请输入车主电话" autocomplete="off"></el-input>
                </el-form-item>
                <!-- <el-form-item label="车辆类型：" prop="type">
                    <el-select v-model="ruleForm.type" placeholder="请选择车辆类型" style="width: 100%;">
                        <el-option v-for="item in carType" :key="item.value" :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="入场时间：" prop="exittime">
                    <el-date-picker v-model="ruleForm.exittime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期"
                        style="width: 100%;">
                    </el-date-picker>
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
import { vehicleArea } from "@/utils/basic-dictionary"
import { getRegistrationList, postAddVehicle, getVehicleInfo, getRegistrationInfo, postRegistrationInfo, deleteRegistration } from "@/api/access";
import { carType, getCarType } from "@/utils/basic-dictionary"
export default {
    components: {},
    data() {
        return {
            // 查询条件
            form: {
                plateNumber: '',
                carNumber: '',
                phone: undefined,
            },
            // carType: carType,
            getCarType: getCarType,
            vehicleArea: vehicleArea,
            total: 0,
            queryParams: {
                pageNum: 1,
                pageSize: 10
            },
            title: "添加车辆",
            vehicleList: [],
            tableData: [],
            // 车辆信息
            ruleForm: {
                plateNumber: '',
                carNumber: '',
                ownerName: '',
                phone: undefined,
                type: undefined,
                exittime: null
            },
            dialogVisible: false,
            rules: {
                plateNumber: [
                    { required: true, message: '请输入车牌号', trigger: 'blur' },
                ],
                area: { required: true, message: '请选择车位区域', trigger: ['blur', 'change'] },
                carNumber: { required: true, message: '请输入车位号', trigger: 'blur' },
                ownerName: { required: true, message: '请输入车主姓名', trigger: 'blur' },
                phone: [
                    { required: true, message: '请输入车主电话', trigger: 'blur' },
                    { pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: "请输入正确的手机号码", trigger: "blur" }
                ],
                // type: { required: true, message: '请选择车辆类型', trigger: ['blur', 'change'] },
                exittime: { required: true, message: '请选择入场时间', trigger: ['blur', 'change'] },
            }
        };
    },
    created() {
        this.getList();
    },
    methods: {
        getList() {
            getRegistrationList(this.form).then(({ data, total }) => {
                this.tableData = data;
                this.total = total;
            })
        },
        addCar() {
            this.title = "添加车辆";
            this.dialogVisible = true;
        },
        // 编辑
        async handleUpdate(id) {
            this.title = "编辑车辆";
            this.dialogVisible = true;
            const { data } = await getRegistrationInfo({ id })
            this.ruleForm = data;
        },
        // 获取车位号
        handleVehicleList(e) {
            this.ruleForm.carNumber = "";
            getVehicleInfo({id: e}).then(({ data }) => {
                this.vehicleList = data;
            })
        },
        // 删除
        handleDelete(id) {
            this.$confirm('此操作将删除该车辆, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteRegistration(id).then(({ status, message }) => {
                    if (status == 0) {
                        this.msgSuccess(message);
                        this.getList();
                    }
                })
            })
        },
        // 确认添加
        onSubmit(formName) {
            if (this.title === "添加车辆") {
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
                        postRegistrationInfo(this.ruleForm).then(({ status, message }) => {
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