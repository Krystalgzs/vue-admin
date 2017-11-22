<template>
    <div class="tmpl">
        <el-row>
            <el-col :span="24">
                <div class="abread bt-line">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                        <el-breadcrumb-item>内容管理</el-breadcrumb-item>
                        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div class="abread bt-line">
                    <el-row>
                        <el-col :span="6">
                            <el-button size="small">
                                <i class="el-icon-check"></i>全选</el-button>
                            <el-button size="small">
                                <i class="el-icon-plus"></i>新增</el-button>
                            <el-button size="small">
                                <i class="el-icon-delete"></i>删除</el-button>
                        </el-col>
                        <el-col :offset="14" :span="4">
                            <el-input placeholder="请输入搜索内容" icon="search" v-model="searchValue" @keydown.13.native="getlist" >
                            </el-input>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-table ref="multipleTable" :data="list" border tooltip-effect="dark" style="width: 100%">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column prop="title" label="标题">
                    </el-table-column>
                    <el-table-column prop="categoryname" label="所属类别" show-overflow-tooltip width="140px">
                    </el-table-column>
                    <el-table-column prop="stock_quantity" label="库存" show-overflow-tooltip width="80px">
                    </el-table-column>
                    <el-table-column prop="market_price" label="市场价" show-overflow-tooltip width="80px">
                    </el-table-column>
                    <el-table-column prop="sell_price" label="销售价" show-overflow-tooltip width="80px">
                    </el-table-column>
                    <el-table-column prop="address" label="属性" show-overflow-tooltip width="140px">
                        <template scope="scope">
                            <i v-bind="{class:'el-icon-picture '+(scope.row.is_slide==1?'':'unlight')}"></i>
                            <i v-bind="{class:'el-icon-upload '+(scope.row.is_top==1?'':'unlight')}"></i>
                            <i v-bind="{class:'el-icon-star-on '+(scope.row.is_hot==1?'':'unlight') }"></i>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="80px">
                        <template scope="scope">
                            <a href="#">修改</a>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div class="block">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="[1,5,10,15,20]"
                        :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalcount">
                    </el-pagination>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                searchValue: "",
                list: [],
                pageSize:5,//定义一个分页组件中容量
                pageIndex:1,//定义一个分页中的索引
                totalcount:0,
            }
        },
        methods: {
            getlist() {
                var url = "/admin/goods/getlist?pageIndex="+this.pageIndex+"&pageSize="+this.pageSize+"&searchvalue=" + this.searchValue;
                this.$ajax.get(url).then(res => {
                    // console.log(res.data.message);
                    console.log(res);
                    this.list = res.data.message;
                    this.totalcount = res.data.totalcount;
                })
            },
            handleSizeChange(val){
                console.log(`每页 ${val} 条`);
                this.pageSize=val;
                this.getlist()
            },
            handleCurrentChange(val){
                console.log(`当前页: ${val}`);
                this.pageIndex=val;
                this.getlist();
            },
        },
        mounted() {
            this.getlist();
        }
    }
</script>
<style scoped>
    .unlight {
        color: rgba(0, 0, 0, 0.3);
    }
    .block{
        margin-top: 15px;
    }
</style>