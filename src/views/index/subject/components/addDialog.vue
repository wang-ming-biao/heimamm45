<template>
  <!-- 遮罩层 -->
  <el-dialog title="新增学科" center :visible.sync="dialogFormVisible" class="maskTitle" width="35%">
    <el-form :model="form" :rules="NewlyAdded" ref="NewlyAdded" class="demo-rulesShadow">
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
      <el-button @click="addSub" type="primary">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {subjectAdd} from '@/api/subject.js'
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
        dialogTableVisible: false,
        dialogFormVisible: false,
        formLabelWidth: "80px" ,//调整标题右边对齐
        NewlyAdded: {
        // 表单验证
        rid: [{ required: true, message:"学科编号不能为空", trigger: "change" }],
        name: [
          { required: true, message: "请输入昵称", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    addSub(){
      subjectAdd({
      rid : this.form.rid,
      name: this.form.name,
      short_name: this.form.short_name,
      intro: this.form.intro,
      remark : this.form.remark,
      }).then(res=>{
        if (res.code == 200) {
          // 添加成功后隐藏遮罩层
          this.dialogFormVisible = false
          // 清除表单内容
          this.$refs.NewlyAdded.resetFields();
          this.$message.success('添加成功');
          this.$parent.getList();
        }else {
          this.$message.error(res.message)
        }
      })
    }
  },

};
</script>

<style>
</style>