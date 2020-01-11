<template>
  <!-- 遮罩层 -->
  <el-dialog title="编辑学科" center :visible.sync="dialogFormVisible" class="maskTitle" width="35%">
    <el-form :model="form" :rules="editDialog" ref="editDialog" class="demo-rulesShadow">
      <!-- 学科编号 -->
      <el-form-item label="学科编号" prop="rid" :label-width="formLabelWidth">
        <el-input v-model="form.rid" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 学科名称 -->
      <el-form-item label="学科名称" prop="name" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 学科简称 -->
      <el-form-item label="学科简称" prop="short_name" :label-width="formLabelWidth">
        <el-input v-model="form.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 学科简介 -->
      <el-form-item label="学科简介" prop="intro" :label-width="formLabelWidth">
        <el-input v-model="form.intro" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 学科备注 -->
      <el-form-item label="学科备注" prop="remark" :label-width="formLabelWidth">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button @click="editSub" type="primary">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {subjectEdit} from '@/api/subject.js'
export default {
  data() {
    return {
      // 遮罩层数据
      form: {
        rid: "", //学科编号
        name: "", //学科名称
        short_name:"",//学科简称
        intro:"",//学科简称
        remark:"",//备注
      },
        // 遮罩层信息
        // dialogTableVisible: false,
        dialogFormVisible: false,
        formLabelWidth: "80px" ,//调整标题右边对齐
        editDialog: {
        // 表单验证
        rid: [{ required: true, message:"学科编号不能为空", trigger: "change" }],
        name: [{ required: true, message: "请输入昵称", trigger: "change" },],
        short_name: [{ required: true, message: "请输入学科简称", trigger: "change" },],
        intro: [{ required: true, message: "请输入学科简介", trigger: "change" },],
        remark: [{ required: true, message: "请输入备注", trigger: "change" },],
      },
    };
  },
  methods: {
    editSub(){
    // 表单校验,通过ref选择器使用表单方法validate遍历表单
    this.$refs.editDialog.validate(valid=>{
        if (valid) {
            // 将表单的值作为参数传入学科编辑方法中
            subjectEdit(this.form).then(res=>{
            // 若验证成功,则调用接口
                if (res.code == 200) {
                    // 告知用户修改成功
                    this.$message.success("编辑成功")
                    // 关闭对话框
                    this.dialogFormVisible = false;
                    // 重新请求数据
                    this.$parent.getList();
                }else{
                    // id重复,提示用户
                    this.$message.warning('学科的编号不能重复')
                }
            })
        }else {
            this.$message.warning('格式不对哦,检查一下呗!')
            return false ;
        }
    })
    }
  },
};
</script>

<style>
</style>