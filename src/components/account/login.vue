<template>
    <div class="tmpl">
        <ul>
            <li>用户名:<el-input v-model="user .uname" placeholder="请输入用户名"></el-input></li>
            <li>密&nbsp;码 :<el-input v-model="user .upwd" placeholder="请输入密码"></el-input></li>
            <li><el-button @click="login">登录</el-button></li>
        </ul>        
    </div>
</template>

<script>
    export default {
        data() {
            return {
                user:{
                    uname:"admin",
                    upwd:"123456",
                }
            }
        },
        methods: {
            login(){
                var url = "admin/account/login";
                this.$ajax.post(url,this.user).then(res=>{
                    // 判断如果res.data.status==1则验证失败
                    if(res.data.status==1){
                        this.$message.error(res.data.message);
                        return;
                    }
                    // 登录成功 跳转到商品列表页面
                    // vue中的编程式的导航
                    this.$router.push({name:"goodslist"});
                })
            }
        }
    }
</script>
<style scoped>
    .tmpl{
        margin: 150px auto;
        height: 180px;
        width: 350px;
        border: 1px solid #666666;
         border-radius: 5px;
    }
    .tmpl ul {
        list-style: none;
        padding: 10px;
    }
    .tmpl ul li{
        margin: 5px;
    }
</style>