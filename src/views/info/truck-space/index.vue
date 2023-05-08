<template>
    <div>
        <el-card class="box-card" header="条件筛选">
            <el-form :inline="true" :model="form" ref="searchRef" class="demo-form-inline">
                <el-form-item label="车位号：" prop="carNumber">
                    <el-input v-model="form.carNumber" placeholder="请输入车牌号" style="width: 240px;"></el-input>
                </el-form-item>
                <el-form-item label="区域：" prop="type">
                    <el-select v-model="form.type" placeholder="请选择车位区域" style="width: 240px;">
                        <el-option label="A区" value="0"></el-option>
                        <el-option label="B区" value="1"></el-option>
                        <el-option label="C区" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="车位状态：" prop="status">
                    <el-select v-model="form.status" placeholder="请选择车位状态" style="width: 240px;">
                        <el-option v-for="item in vehicleStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="queryParams.pageNum = 1,getList()">搜索</el-button>
                    <el-button @click="cancel('searchRef')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="box-card mt-24">
            <div slot="header" class="card-center">
                <span>车位信息列表</span>
                <div>
                    <el-button type="primary" @click="dialogVisible = true">添加</el-button>
                    <el-button type="primary" @click="exportExcel">一键导出</el-button>
                </div>
            </div>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column type="index" label="序号" width="50">
                </el-table-column>
                <el-table-column prop="carNumber" label="车位号">
                </el-table-column>
                <el-table-column prop="area" label="区域">
                </el-table-column>
                <el-table-column prop="chargeHour" label="每小时收费(￥)">
                </el-table-column>
                <el-table-column prop="remarks" label="备注">
                </el-table-column>
                <el-table-column prop="type" label="车位类型">
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

        <!-- 添加车位 -->
        <el-dialog title="添加用户" :visible.sync="dialogVisible" width="30%">
            <el-form label-position="left" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px"
                empty-text="暂无数据">
                <el-form-item label="用户名：">
                    <el-input v-model="ruleForm.username" autocomplete="off" style="width: 240px;"></el-input>
                </el-form-item>
                <el-form-item label="昵称：">
                    <el-input v-model="ruleForm.nickname" autocomplete="off" style="width: 240px;"></el-input>
                </el-form-item>
                <el-form-item label="邮箱：">
                    <el-input v-model="ruleForm.email" autocomplete="off" style="width: 240px;"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { vehicleType, vehicleStatus } from "@/utils/basic-dictionary"
export default {
    components: {},
    data() {
        return {
            // 查询条件
            form: {
                user: ''
            },
            total: 1,
            queryParams: {
                pageNum: 1,
                pageSize: 10
            },
            tableData: [
                {
                    id: 1,
                    carNumber: 'A10',
                    area: 'A区',
                    type: '小型车车位',
                    chargeHour: '3',
                    remarks: '车位险',
                    status: '1',
                }
            ],
            // 添加用户
            ruleForm: {
                username: '',
                nickname: '',
                email: ''
            },
            title: "添加车位",
            dialogVisible: false,
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                nickname: { required: true, message: '请输入昵称', trigger: 'blur' },
                email: { required: true, message: '请输入邮箱', trigger: 'blur' },
            }
        };
    },
    methods: {
        getList() {

        },
        onSubmit() {
            if (this.title === "添加车位") {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // addUser(this.ruleForm).then(({ status, message }) => {
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
        // 编辑
        handleUpdate(id) {
            this.title = "编辑用户";
            this.dialogVisible = true;
            // getUserInfo({ id }).then(({ status, data }) => {
            //     if (status === 0) {
            //         this.ruleForm = data;
            //     }
            // })
        },
        // 删除
        handleDelete(id) {
            this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // deleteUserInfo(id).then(({ status, message }) => {
                //     if (status == 0) {
                //         this.msgSuccess(message);
                //         this.getList();
                //     }
                // })
            })
        },
        // 重置
        cancel(formName) {
            this.$refs[formName].resetFields();
            this.getList();
        },
        // 导出数据Excel
        exportExcel() {

        }
    }
}

</script>
<style lang='scss' scoped></style>