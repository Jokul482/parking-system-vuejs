<template>
    <div>
        <el-card class="box-card" header="条件筛选">
            <el-form :inline="true" :model="form" class="demo-form-inline">
                <el-form-item label="车牌号：">
                    <el-input v-model="form.plateNumber" placeholder="请输入车牌号" style="width: 240px;"></el-input>
                </el-form-item>
                <el-form-item label="车位号：">
                    <el-input v-model="form.carNumber" placeholder="请输入车位号" style="width: 240px;"></el-input>
                </el-form-item>
                <el-form-item label="车主电话：">
                    <el-input v-model="form.phone" placeholder="请输入车主电话" style="width: 240px;"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="queryParams.pageNum = 1, getList()">搜索</el-button>
                    <el-button @click="cancel('searchRef')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="box-card mt-24">
            <div slot="header" class="card-center">
                <span>车辆登记列表</span>
                <div>
                    <el-button type="primary" @click="dialogVisible = true">添加</el-button>
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
                </el-table-column>
                <el-table-column prop="admissionTime" label="入场时间">
                </el-table-column>
                <el-table-column prop="chargeHour" label="每小时收费(￥)">
                    <template slot-scope="scope">{{ scope.row.chargeHour }}元</template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleUpdate(scope.row.id)">编辑</el-button>
                        <el-button type="text" @click="handleDelete(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
                :limit.sync="queryParams.pageSize" @pagination="getList" />
        </el-card>

        <!-- 添加车辆 -->
        <el-dialog :title="title" :visible.sync="dialogVisible" width="40%">
            <el-form label-position="left" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"
                empty-text="暂无数据">
                <el-form-item label="车牌号：" prop="plateNumber">
                    <el-input v-model="ruleForm.plateNumber" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="车位号：" prop="carNumber">
                    <el-input v-model="ruleForm.carNumber" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="车主姓名：" prop="ownerName">
                    <el-input v-model="ruleForm.ownerName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="车主电话：" prop="phone">
                    <el-input v-model="ruleForm.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="车辆类型：" prop="type">
                    <el-input v-model="ruleForm.type" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="入场时间：" prop="exittime">
                    <el-input v-model="ruleForm.exittime" autocomplete="off"></el-input>
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
import { getRegistrationList, postAddVehicle } from "@/api/vehicle"
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
            total: 1,
            queryParams: {
                pageNum: 1,
                pageSize: 10
            },
            title: "添加车辆",
            tableData: [
                // {
                //     id: 1,
                //     plateNumber: '渝A·V1000',
                //     carNumber: 'A10',
                //     ownerName: '周先生',
                //     phone: '13054624562',
                //     type: '小型车',
                //     admissionTime: '2023-0203 12:01:59',
                //     chargeHour: '3',
                // }
            ],
            // 添加车辆 
            ruleForm: {
                plateNumber: '',
                carNumber: '',
                ownerName: '',
                phone: undefined,
                type: undefined,
                exittime: ""
            },
            dialogVisible: false,
            rules: {
                plateNumber: [
                    { required: true, message: '请输入车牌号', trigger: 'blur' },
                ],
                carNumber: { required: true, message: '请输入车位号', trigger: 'blur' },
                ownerName: { required: true, message: '请输入车主姓名', trigger: 'blur' },
                phone: [
                    { required: true, message: '请输入车主电话', trigger: 'blur' },
                    { pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: "请输入正确的手机号码", trigger: "blur" }
                ],
                type: { required: true, message: '请选择车辆类型', trigger: ['blur', 'change'] }
            }
        };
    },
    created() {
        this.getList();
    },
    methods: {
        getList() {
            getRegistrationList(this.form).then(({ data }) => {
                this.tableData = data;
            })
        },
        // 确认添加
        onSubmit(formName) {
            if (this.title === "添加用户") {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // postAddVehicle(this.ruleForm).then(({ status, message }) => {
                        //     if (status === 0) {
                        //         this.msgSuccess(message);
                        //         this.dialogVisible = false;
                        //         this.getList();
                        //     }
                        // })
                    }
                });
            } else {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // postUpdateUserInfo(this.ruleForm).then(({ status, message }) => {
                        //     if (status === 0) {
                        //         this.msgSuccess(message);
                        //         this.dialogVisible = false;
                        //         this.getList();
                        //     }
                        // })
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
    }
}

</script>
<style lang='scss' scoped></style>