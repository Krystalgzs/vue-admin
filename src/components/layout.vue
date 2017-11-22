<template>
    <div class="tmpl">
        <el-row>
            <el-col :span="4">
                <!-- 1.0 左边菜单 -->
                <img src="../../statics/imgs/logo.png" alt="">
                <div class="layout menu">
                <el-menu default-active="2" class="el-menu-vertical-demo">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-message"></i>购物商城
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="1-1">
                                <router-link to="/admin/goodslist">
                                    内容管理
                                </router-link>
                            </el-menu-item>
                            <el-menu-item index="1-2">分类管理</el-menu-item>
                            <el-menu-item index="1-3">评论管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-message"></i>订单管理
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="2-1">订单列表</el-menu-item>
                            <el-menu-item index="2-2">分类管理</el-menu-item>
                            <el-menu-item index="2-3">评论管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-message"></i>学员问题汇总
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="3-1">内容管理</el-menu-item>
                            <el-menu-item index="3-2">分类管理</el-menu-item>
                            <el-menu-item index="3-3">评论管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-message"></i>前端常用功能
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="4-1">内容管理</el-menu-item>
                            <el-menu-item index="4-2">分类管理</el-menu-item>
                            <el-menu-item index="4-3">评论管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-message"></i>重点常用功能
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="5-1">内容管理</el-menu-item>
                            <el-menu-item index="5-2">分类管理</el-menu-item>
                            <el-menu-item index="5-3">评论管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="6">
                        <template slot="title">
                            <i class="el-icon-message"></i>资源下载
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="6-1">内容管理</el-menu-item>
                            <el-menu-item index="6-2">分类管理</el-menu-item>
                            <el-menu-item index="6-3">评论管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
                </div>
            </el-col>
            <el-col :span="20">
                <el-row>
                    <el-col :span="24">
                        <!--2.0 顶部登录信息条 -->
                        <div class="topbg">
                            <el-row>
                                <!-- 左边的图标 -->
                                <el-col :span="1">
                                    <i class="el-icon-menu"></i>
                                </el-col>
                                <!-- 右边的登录信息和相关操作 -->
                                <el-col :span="23">
                                    欢迎XXX登录
                                    <el-dropdown split-button type="primary">
                                        更多菜单
                                        <el-dropdown-menu slot="dropdown">
                                          <el-dropdown-item>黄金糕</el-dropdown-item>
                                          <el-dropdown-item>狮子头</el-dropdown-item>
                                          <el-dropdown-item>螺蛳粉</el-dropdown-item>
                                          <el-dropdown-item>双皮奶</el-dropdown-item>
                                          <el-dropdown-item>蚵仔煎</el-dropdown-item>
                                        </el-dropdown-menu>
                                      </el-dropdown>
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <!-- 3.0 其他功能的渲染区占位符 -->
                       
                        <router-view></router-view>

                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>

    export default {
        data() {
            return {
            }
        },
        methods: {
        }
    }
</script>
<style scoped>
</style>