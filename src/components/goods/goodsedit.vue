<template>
    <div class="tmpl">
        <el-row>
            <el-col :span="24">
                <div class="abread bt-line">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/' }">返回上一层</el-breadcrumb-item>
                        <el-breadcrumb-item>购物商城</el-breadcrumb-item>
                        <el-breadcrumb-item>首页</el-breadcrumb-item>
                        <el-breadcrumb-item>新增内容</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </el-col>
        </el-row>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="内容标题" prop="title">
                        <el-input v-model="ruleForm.title"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="副标题" prop="sub_title">
                        <el-input v-model="ruleForm.sub_title"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="所属类别">
                        <el-select v-model="ruleForm.category_id" placeholder="请选择">
                            <el-option v-for="item in cateList" :value="item.category_id" :label="item.title">
                                <span v-for="sub in (item.class_layer-1)">&nbsp;</span>
                                <span v-if="item.class_layer>1">|-</span>
                                {{item.title}}
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="是否发布">
                        <el-switch v-model="ruleForm.status" on-text="是" off-text="否">
                        </el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="推荐类型">
                        <el-switch v-model="ruleForm.is_slide" on-text="轮播图" off-text="轮播图">
                        </el-switch>
                        <el-switch v-model="ruleForm.is_top" on-text="置顶" off-text="置顶">
                        </el-switch>
                        <el-switch v-model="ruleForm.is_hot" on-text="推荐" off-text="推荐">
                        </el-switch>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="上传封面">
                        <el-upload class="upload-demo" action="http://127.0.0.1:8899/admin/article/uploadimg" :file-list="ruleForm.imgList" list-type="picture"
                            :on-success="imgUploaded">
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="图片上传">
                        <el-upload class="upload-demo" action="http://127.0.0.1:8899/admin/article/uploadfile" :file-list="ruleForm.fileList" list-type="picture"
                            :on-success="uploadfile">
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="商品货号" prop="goods_no">
                        <el-input v-model="ruleForm.goods_no"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="库存数量" prop="stock_quantity">
                        <el-input v-model="ruleForm.stock_quantity"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="市场价格" prop="market_price">
                        <el-input v-model="ruleForm.market_price"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="销售价格" prop="sell_price">
                        <el-input v-model="ruleForm.sell_price"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="内容摘要" prop="zhaiyao">
                <el-input type="textarea" v-model="ruleForm.zhaiyao"></el-input>
            </el-form-item>
            <el-form-item label="详细内容" prop="content">
                <quill-editor v-model="ruleForm.content" @change="onEditorChange($event)">
                </quill-editor>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<!-- 2.0 定义组件中的相关对象(data,methods) -->
<script>
    // 1.0 导入富文本编辑器组件
    import { quillEditor } from 'vue-quill-editor'
    // new Vue({})
    export default {
        data() {
            return {
                goodsid:this.$route.params.goodsid,
                cateList: [],
                ruleForm: {
                    title: '',
                    sub_title: '',
                    "goods_no": "",
                    category_id: 43,  // 小问题：category_id要是一个数值类型，如果变成字符串类型的话，则页面显示不正常
                    "stock_quantity": 200,
                    "market_price": 1000,
                    "sell_price": 800,
                    "status": true,
                    "is_slide": true,
                    "is_top": false,
                    "is_hot": true,
                    "zhaiyao": "为不凡而生",
                    "content": "<p><strong>产品参数：</strong></p>",
                    "imgList": [
                        // {
                        //     "name": "wTgAWDLpQReTQ-ZOMdlAk4vF.jpg",
                        //     "url": "http://127.0.0.1:8899/imgs/wTgAWDLpQReTQ-ZOMdlAk4vF.jpg",
                        //     "shorturl": "/imgs/wTgAWDLpQReTQ-ZOMdlAk4vF.jpg"
                        // }
                    ],
                    "fileList": [
                        // {
                        //     "name": "HN5d4_wrbsUk5KQNjzYSGGwm.jpg",
                        //     "url": "http://127.0.0.1:8899/imgs/HN5d4_wrbsUk5KQNjzYSGGwm.jpg",
                        //     "shorturl": "/imgs/HN5d4_wrbsUk5KQNjzYSGGwm.jpg"
                        // }
                    ]
                },
                rules: {
                    title: [
                        { required: true, message: '请输入内容标题', trigger: 'blur' }
                    ],
                    category_id: [
                        { required: true, message: '请选择所属类别', trigger: 'blur' }
                    ],
                    zhaiyao: [
                        { required: true, message: '请输入内容摘要', trigger: 'blur' }
                    ],
                    content: [
                        { required: true, message: '请输入详细内容', trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            getGoodsInfo(){
                this.$ajax.get("/admin/goods/getgoodsmodel/"+this.goodsid).then(res=>{
                    console.log(res);
                    this.ruleForm = res.data.message;
                    // 转换成数字类型
                    this.ruleForm.category_id = (this.ruleForm.category_id-0);
                })
            },
            getcataList() {
                var url = '/admin/category/getlist/goods';
                this.$ajax.get(url).then(res => {
                    this.cateList = res.data.message;
                    // console.log(this.cateList);
                    this.getGoodsInfo();
                })
            },
            // 图片上传
            imgUploaded(responese, file, filelist) {
                // console.log(responese);
                this.ruleForm.imgList = [responese];
            },
            // 文件夹上传
            uploadfile(responese, file, filelist) {
                this.ruleForm.fileList.push(responese);
            },
            onEditorChange(event) {
                this.ruleForm.content = event.html;
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$ajax.post("/admin/goods/edit/"+this.goodsid, this.ruleForm).then(res => {
                            if (res.data.status == 1) {
                                this.$message({
                                    showClose: true,
                                    message: res.data.message,
                                    type: 'error',
                                    duration: 1000
                                });
                            }else{
                                this.$router.push({ name: 'goodslist'});
                            }
                        })
                    } else {
                        console.log('提交失败!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        mounted() {
            this.getcataList();
        },
        components: {
            quillEditor
        }
    }
</script>

<!-- 3.0  -->
<style>
    .ql-editor {
        min-height: 200px;
        height: 200px;
        max-height: 200px;
    }
</style>