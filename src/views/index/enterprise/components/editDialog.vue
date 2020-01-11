<template>
  <el-dialog title="编辑企业" center width="600px" ref="editDialog"  class="maskTitle" :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="ruleForm" ref="ruleForm" class="demo-rulesShadow">
      <el-form-item label="企业编号" prop="eid" :label-width="formLabelWidth">
        <el-input v-model="form.eid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业名称" prop="name" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业简称" prop="short_name" :label-width="formLabelWidth">
        <el-input v-model="form.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业简介" prop="intro" :label-width="formLabelWidth">
        <el-input v-model="form.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业备注" prop="remark" :label-width="formLabelWidth">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="editEnterprise">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {enterpriseEdit} from "@/api/enterprise.js";
export default {
  data() {
    return {
      // 对话框默认隐藏
      dialogFormVisible: false,
      //   对话框文本
      form: {
        eid: "", //学科编号
        name: "", //学科名称
        short_name: "", //学科简称
        intro: "", //学科简称
        remark: "" //备注
      },
      formLabelWidth: "80px",
      //   验证规则
      ruleForm: {
        eid: [{ required: true, message: "请输入企业编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入企业名称", trigger: "blur" }],
        short_name: [
          { required: true, message: "请输入企业简称", trigger: "blur" }
        ],
        intro: [{ required: true, message: "请输入企业简介", trigger: "blur" }]
      }
    };
  },
  methods: {
    editEnterprise() {
      // 表单校验,通过ref选择器使用表单方法valdate遍历表单
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // 将表单的值作为参数传入学科编辑方法中
          enterpriseEdit(this.form).then(res => {
            // 若验证成功,则弹窗告知用户
            if (res.code == 200) {
              this.$message.success("编辑成功");
              // 关闭对话框
              this.dialogFormVisible = false;
              // 调用父组件的获取列表方法,刷新页面
              this.$parent.getList();
            } else {
              // id重复,
              this.$message.error("编辑失败,请刷新页面");
            }
          });
        } else {
          this.$message.warning("格式不对!请检查一下!");
          return false;
        }
      });
    }
  }
};
</script>

<style>
</style>