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
                            <el-button size="small" @click="selectAll(list)">
                                <i class="el-icon-check"></i>全选</el-button>
                            <router-link to="/admin/goodsadd">
                                <el-button size="small">
                                    <i class="el-icon-plus"></i>新增</el-button>
                            </router-link>
                            <el-button size="small" @click="delData">
                                <i class="el-icon-delete"></i>删除</el-button>
                        </el-col>
                        <el-col :offset="14" :span="4">
                            <el-input placeholder="请输入搜索内容" icon="search" v-model="searchValue" @keydown.13.native="getlist">
                            </el-input>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-table  @select="selected" @select-all ref="multipleTable" :data="list" border tooltip-effect="dark" style="width: 100%">
                    <el-table-column type="selection" width="55" >
                    </el-table-column>
                    <el-table-column prop="title" label="标题">
                        <template scope="scope">
                            <el-tooltip class="item" effect="dark" placement="right-start">
                                <div slot="content">
                                    <img width="100px" height="100px" :src="scope.row.imgurl" alt="">
                                </div>
                                <router-link v-bind="{to:'/admin/goodsedit/'+scope.row.id}">
                                    {{scope.row.title}}
                                </router-link>
                            </el-tooltip>
                        </template>
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
                            <router-link v-bind="{to:'/admin/goodsedit/'+scope.row.id}"></router-link>
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
                isSelectAll:false,
                delids:[],
                searchValue: "",
                list: [],
                pageSize: 5,//定义一个分页组件中容量
                pageIndex: 1,//定义一个分页中的索引
                totalcount: 0,
            }
        },
        methods: {
            getlist() {
                var url = "/admin/goods/getlist?pageIndex=" + this.pageIndex + "&pageSize=" + this.pageSize + "&searchvalue=" + this.searchValue;
                this.$ajax.get(url).then(res => {
                    // console.log(res.data.message);
                    this.list = res.data.message;
                    this.totalcount = res.data.totalcount;
                })
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize = val;
                this.getlist()
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.pageIndex = val;
                this.getlist();
            },
            // 删除多条数据/一条数据
            delData(){
                if(this.delids.length<=0){
                    this.$message.error("请至少选一条数据");
                    return;
                }
                // 将delids数据转换成以逗号分隔的字符串
                var ids = this.delids.join(",");
                this.$ajax.get("/admin/goods/del/"+ids).then(res=>{
                    if(res.data.status==1){
                        this.$message.error(res.data.message);
                        return;
                    }
                    // 删除成功以后的逻辑处理 刷新页面
                    this.getlist();
                })
            },
            // 删除全部数据
            selectAll(rows) {
                this.isSelectAll = !this.isSelectAll;
                console.log(this.isSelectAll);
                if(this.isSelectAll){
                    // 进入前的时候清空
                    this.delids.length=0;
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                        // 将row的id追加到this.delids中
                        this.delids.push(row.id);
                    });
                    // console.log(111);
                }else{
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                    this.delids.length=0;
                    // console.log(2222);
                }
            },
            selected(selection,row){
                this.delids.push(row.id);
                console.log(row);
            }
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

    .block {
        margin-top: 15px;
    }
</style>