<template>
    <div>
        <el-card class="box-card" header="条件筛选">
            <el-form :inline="true" :model="form" class="demo-form-inline">
                <el-form-item label="角色类型：">
                    <el-select v-model="form.roleType" placeholder="请选择角色类型" style="width: 240px;">
                        <el-option label="管理员" value="0"></el-option>
                        <el-option label="普通用户" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户名：">
                    <el-input v-model="form.userName" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="queryParams.pageNum = 1, getList()">搜索</el-button>
                    <el-button @click="cancel">重置</el-button>
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
                        {{ row[column.property] == 0 ? '管理员' : '普通用户' }}   
                    </template>
                </el-table-column>
                <el-table-column prop="username" label="用户名">
                    <template v-slot="{ column, row }">
                        {{ row[column.property] ? row[column.property] : '--' }}   
                    </template>
                </el-table-column>
                <el-table-column prop="nickname" label="昵称">
                    <template v-slot="{ column, row }">
                        {{ row[column.property] ? row[column.property] : '--' }}   
                    </template>
                </el-table-column>
                <el-table-column prop="email" label="邮箱">
                    <template v-slot="{ column, row }">
                        {{ row[column.property] ? row[column.property] : '--' }}   
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
        <el-dialog title="添加用户" :visible.sync="dialogVisible" width="30%">
            <el-form label-position="right" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="95px"
                empty-text="暂无数据">
                <el-form-item label="角色类型：" prop="role">
                    <el-select v-model="ruleForm.role" placeholder="请选择角色类型" style="width: 240px;">
                        <el-option label="管理员" value="0"></el-option>
                        <el-option label="普通用户" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户名：" prop="username">
                    <el-input v-model="ruleForm.username" placeholder="请输入用户名" autocomplete="off" style="width: 240px;"></el-input>
                </el-form-item>
                <el-form-item label="密码：" prop="password">
                    <el-input v-model="ruleForm.password" placeholder="请输入密码" autocomplete="off" style="width: 240px;"></el-input>
                </el-form-item>
                <el-form-item label="昵称：">
                    <el-input v-model="ruleForm.nickname" placeholder="请输入昵称" autocomplete="off" style="width: 240px;"></el-input>
                </el-form-item>
                <el-form-item label="邮箱：">
                    <el-input v-model="ruleForm.email" placeholder="请输入邮箱" autocomplete="off" style="width: 240px;"></el-input>
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
import { getUserList } from "@/api/userInfo"
export default {
    components: {},
    data() {
        return {
            // 查询条件
            form: {
                roleType: "",
                userName: ""
            },
            total: 1,
            queryParams: {
                pageNum: 1,
                pageSize: 10
            },
            tableData: [],
            // 添加用户
            ruleForm: {
                role: '',
                username: '',
                password: '',
                nickname: '',
                email: ''
            },
            loading: false,
            dialogVisible: false,
            rules: {
                role: [
                    { required: true, message: '请选择角色', trigger: 'change' },
                ],
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
                nickname: { required: true, message: '请输入昵称', trigger: 'blur' },
                email: { required: true, message: '请输入邮箱', trigger: 'blur' },
            }
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
                username: this.form?.userName
            }).then(({data}) => {
                this.loading = false;
                this.tableData = data;
            })
        },
        onSubmit() {

        },
        addUser() {

        },
        // 重置
        cancel() {
            this.form = {
                user: ""
            }
        }
    }
}

</script>
<style lang='scss' scoped></style>