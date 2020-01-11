<template>
  <el-dialog title="编辑用户" center width="600px" ref="editDialog"  class="maskTitle" :visible.sync="dialogFormVisible">
    <el-form :model="userform" :rules="ruleForm" ref="ruleForm" class="demo-rulesShadow">
        <!-- 用户编号 -->
        <el-form-item  label="用户名" prop="username" :label-width="formLabelWidth">
          <el-input v-model="userform.username" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 用户名称 -->
        <el-form-item label="用户邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="userform.email" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 用户简称 -->
        <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="userform.phone" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 用户角色 -->
        <el-form-item label="角色" prop="role_id" :label-width="formLabelWidth">
          <el-select v-model="userform.phone" placeholder="请选择角色">
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        <!-- 用户状态 -->
        <el-form-item label="状态" prop="status" :label-width="formLabelWidth">
          <el-select v-model="userform.phone" placeholder="请选择状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <!-- 用户备注 -->
        <el-form-item label="用户备注" prop="remark"  :label-width="formLabelWidth">
          <el-input v-model="userform.remark" autocomplete="off"></el-input>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="editUser">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {userEdit} from "@/api/user.js";
export default {
  data() {
    return {
      // 对话框默认隐藏
      dialogFormVisible: false,
      //   对话框文本
      userform: {
        eid: "", //学科编号
        name: "", //学科名称
        short_name: "", //学科简称
        intro: "", //学科简称
        remark: "" //备注
      },
      formLabelWidth: "80px",
      //   验证规则
      ruleForm: {
        eid: [{ required: true, message: "请输入用户编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入用户名称", trigger: "blur" }],
        short_name: [
          { required: true, message: "请输入用户简称", trigger: "blur" }
        ],
        intro: [{ required: true, message: "请输入用户简介", trigger: "blur" }]
      }
    };
  },
  methods: {
    editUser() {
      // 表单校验,通过ref选择器使用表单方法valdate遍历表单
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // 将表单的值作为参数传入学科编辑方法中
          userEdit(this.form).then(res => {
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