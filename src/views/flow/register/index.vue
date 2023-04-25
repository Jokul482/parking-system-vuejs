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
                    <el-button type="primary" @click="queryParams.pageNum = 1,getList()">搜索</el-button>
                    <el-button @click="cancel">重置</el-button>
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

        <!-- 添加用户 -->
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
                    plateNumber: '渝A·V1000',
                    carNumber: 'A10',
                    ownerName: '周先生',
                    phone: '13054624562',
                    type: '小型车',
                    admissionTime: '2023-0203 12:01:59',
                    chargeHour: '3',
                }
            ],
            // 添加用户
            ruleForm: {
                username: '',
                nickname: '',
                email: ''
            },
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

        },
        addUser() {

        },
        cancel() {

        }
    }
}

</script>
<style lang='scss' scoped></style>