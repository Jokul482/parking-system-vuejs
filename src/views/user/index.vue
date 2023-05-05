<template>
    <div>
        <el-card class="box-card" header="条件筛选">
            <el-form :inline="true" :model="form" ref="searchRef" class="demo-form-inline">
                <el-form-item label="角色类型：" prop="roleType">
                    <el-select v-model="form.roleType" placeholder="请选择角色类型" style="width: 240px">
                        <el-option label="管理员" value="0"></el-option>
                        <el-option label="普通用户" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户名：" prop="userName">
                    <el-input v-model="form.userName" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="(queryParams.pageNum = 1), getList()">搜索</el-button>
                    <el-button @click="cancel('searchRef')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="box-card mt-24">
            <div slot="header" class="card-center">
                <span>用户列表</span>
                <el-button type="primary" @click="dialogVisible = true">添加</el-button>
            </div>
            <el-table :data="tableData" v-loading="loading" border style="width: 100%">
                <el-table-column type="index" label="序号" width="50">
                </el-table-column>
                <el-table-column prop="role_type" label="角色类型">
                    <template v-slot="{ column, row }">
                        {{ row[column.property] == 0 ? "管理员" : "普通用户" }}
                    </template>
                </el-table-column>
                <el-table-column prop="username" label="用户名">
                    <template v-slot="{ column, row }">
                        {{ row[column.property] ? row[column.property] : "--" }}
                    </template>
                </el-table-column>
                <el-table-column prop="nickname" label="昵称">
                    <template v-slot="{ column, row }">
                        {{ row[column.property] ? row[column.property] : "--" }}
                    </template>
                </el-table-column>
                <el-table-column prop="email" label="邮箱">
                    <template v-slot="{ column, row }">
                        {{ row[column.property] ? row[column.property] : "--" }}
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleUpdate(scope.row.id)">编辑</el-button>
                        <el-button type="text" @click="handleDelete(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <!-- <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
                :limit.sync="queryParams.pageSize" @pagination="getList" /> -->
        </el-card>

        <!-- 添加用户 -->
        <el-dialog title="添加用户" :visible.sync="dialogVisible" width="30%" @close="resetForm('ruleForm')">
            <el-form label-position="right" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="95px"
                empty-text="暂无数据">
                <el-form-item label="角色类型：" prop="role_type">
                    <el-select v-model="ruleForm.role_type" placeholder="请选择角色类型" style="width: 240px">
                        <el-option label="管理员" value="0"></el-option>
                        <el-option label="普通用户" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户名：" prop="username">
                    <el-input v-model="ruleForm.username" placeholder="请输入用户名" autocomplete="off"
                        style="width: 240px"></el-input>
                </el-form-item>
                <el-form-item label="密码：" prop="password">
                    <el-input v-model="ruleForm.password" placeholder="请输入密码" autocomplete="off" style="width: 240px"
                        show-password minlength="6" maxlength="12"></el-input>
                </el-form-item>
                <el-form-item label="昵称：">
                    <el-input v-model="ruleForm.nickname" placeholder="请输入昵称" autocomplete="off"
                        style="width: 240px"></el-input>
                </el-form-item>
                <el-form-item label="邮箱：">
                    <el-input v-model="ruleForm.email" placeholder="请输入邮箱" autocomplete="off"
                        style="width: 240px"></el-input>
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
import { getUserList } from "@/api/userInfo";
import { addUser } from "@/api/user";
export default {
    components: {},
    data() {
        return {
            // 查询条件
            form: {
                roleType: "",
                userName: "",
            },
            total: 1,
            queryParams: {
                pageNum: 1,
                pageSize: 10,
            },
            tableData: [],
            // 添加用户
            ruleForm: {
                role_type: "",
                username: "",
                password: "",
                nickname: "",
                email: "",
            },
            loading: false,
            dialogVisible: false,
            rules: {
                role_type: { required: true, message: "请选择角色", trigger: ["change", "blur"] },
                username: {
                    required: true,
                    message: "请输入用户名",
                    trigger: "blur",
                },
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: ["change", "blur"] }
                ]
            },
        };
    },
    created() {
        this.getList();
    },
    methods: {
        getList() {
            this.loading = true;
            getUserList({
                role_type: this.form?.roleType,
                username: this.form?.userName,
            })
                .then(({ data }) => {
                    this.loading = false;
                    this.tableData = data;
                })
                .catch((err) => (this.loading = false));
        },
        // 确认添加
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    addUser(this.ruleForm).then(({ status, message }) => {
                        if (status === 0) {
                            this.msgSuccess(message);
                            this.dialogVisible = false;
                            this.getList();
                        }
                    })
                }
            });
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
    },
};
</script>
<style lang="scss" scoped></style>
