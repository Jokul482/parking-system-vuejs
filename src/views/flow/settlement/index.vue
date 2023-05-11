<template>
    <div>
        <el-card class="box-card" header="条件筛选">
            <el-form :inline="true" :model="form" ref="searchRef" label-width="100px" class="demo-form-inline">
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
                    <el-form-item label="是否支付：" prop="status">
                        <el-select v-model="form.status" placeholder="请选择支付状态" style="width: 240px;">
                            <el-option label="未支付" :value="2"></el-option>
                            <el-option label="已支付" :value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="queryParams.pageNum = 1,getList()">搜索</el-button>
                        <el-button @click="cancel('searchRef')">重置</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </el-card>
        <el-card class="box-card mt-24">
            <div slot="header" class="card-center">
                <span>车辆结算列表</span>
                <el-button type="primary" @click="exportExcel">一键导出</el-button>
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
                <el-table-column prop="chargeHour" label="每小时收费(￥)">
                </el-table-column>
                <el-table-column prop="admissionTime" label="入场时间">
                </el-table-column>
                <el-table-column prop="leavingTime" label="离场时间">
                    <template v-slot="{ row, column }">{{ row[column.property] ? row[column.property] : "--" }}</template>
                </el-table-column>
                <el-table-column prop="duration" label="停放时长">
                    <template slot-scope="scope">
                        {{ scope.row.duration }}小时
                    </template>
                </el-table-column>
                <el-table-column prop="amount" label="应收费金额">
                    <template slot-scope="scope">
                        {{ scope.row.amount }}元
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="是否支付">
                    <template slot-scope="scope">
                        {{ scope.row.status == 2 ? '未支付' : '已支付' }}
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleDeparture(scope.row.id)" :disabled="scope.row.status == 1">离场</el-button>
                    </template>
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
                plateNumber: "", // 车牌号
                carNumber: "", // 车位号
                phone: undefined, // 手机号
                status: undefined, // 支付状态
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
                    leavingTime: '2023-0203 14:02:00',
                    duration: '2',
                    amount: '6',
                    status: '1',
                }
            ],
        };
    },
    methods: {
        getList() {

        },
        // 确认离场
        handleDeparture(id) {

        },  
        exportExcel() {
            
        }
    }
}

</script>
<style lang='scss' scoped></style>