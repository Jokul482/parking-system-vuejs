<template>
    <div>
        <el-card class="card-header-not-border ht-card" v-loading="loading" header="车位概览">
            <el-row type="flex" class="ht-row">
                <el-col>
                    <div class="content">
                        <div class="num" style="color:#fa5555;">112</div>
                    </div>
                    <div class="label">总车位</div>
                </el-col>
                <el-col>
                    <div class="content">
                        <div class="num" style="color:#999;">111</div>
                    </div>
                    <div class="label">当前空闲车位</div>
                </el-col>
                <el-col>
                    <div class="content">
                        <div class="num" style="color:#21d59b;">1</div>
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
            <el-form :inline="true" :model="form" class="demo-form-inline">
                <el-form-item label="区域：">
                    <el-select placeholder="请选择车位区域" style="width: 240px;">
                        <el-option label="A区" value="0"></el-option>
                        <el-option label="B区" value="1"></el-option>
                        <el-option label="C区" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="车位号：">
                    <el-input v-model="form.user" placeholder="请输入车牌号" style="width: 240px;"></el-input>
                </el-form-item>
                <el-form-item label="车位状态：">
                    <el-select placeholder="请选择车位状态" style="width: 240px;">
                        <el-option label="未使用" value="0"></el-option>
                        <el-option label="正在使用" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="queryParams.pageNum = 1,getList()">搜索</el-button>
                    <el-button @click="cancel">重置</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column type="index" label="序号" width="50">
                </el-table-column>
                <el-table-column prop="area" label="区域">
                </el-table-column>
                <el-table-column prop="carNumber" label="车位号">
                </el-table-column>
                <el-table-column prop="status" label="车位状态">
                    <template slot-scope="scope">{{ scope.row.status == 0 ? '空闲' : '正在使用' }}</template>
                </el-table-column>
                <el-table-column prop="type" label="车位类型">
                </el-table-column>
                <el-table-column prop="chargeHour" label="每小时收费(￥)">
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
                :limit.sync="queryParams.pageSize" @pagination="getList" />
        </el-card>
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
            loading: false,
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
                    status: '1',
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

        }
    }
}

</script>
<style lang='scss' scoped></style>