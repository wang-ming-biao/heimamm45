<template>
        <!-- 遮罩层 -->
        <el-dialog title="新增用户" center :visible.sync="dialogFormVisible"  class="maskTitle" width="600px">
      <el-form :model="userform" :rules="addDialog" ref="userform" class="demo-rulesShadow">
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
          <el-select v-model="userform.role_id" placeholder="请选择角色">
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        <!-- 用户状态 -->
        <el-form-item label="状态" prop="status" :label-width="formLabelWidth">
          <el-select v-model="userform.status" placeholder="请选择状态">
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
        <el-button type="primary"  @click="addUser">确 定</el-button>
      </div>
    </el-dialog>
</template>

<script>
import {userAdd,} from "@/api/user.js"
// 导入封装的邮箱与手机验证方法
import  {validatePhone,validateEmail} from "@/utils/validator.js"
export default {
    data() {
        return {
                // 遮罩层信息
      dialogTableVisible: false,
      dialogFormVisible: false,
      userform: {
        // eid: "",//用户编号
        // name: "",//用户名称
        // short_name: "",//用户简称
        // intro: "",//用户简介
        // remark: "",//备注
      },
      addDialog: {
        // 用户名非空验证
        username: [{ required: true,message:"用户编号不能为空", trigger: "blur" }],
        // 用户角色非空验证
        role_id: [{ required: true,message:"用户角色不能为空", trigger: "blur" }],
        // 手机号与邮箱格式验证
        phone: [{ required: true,validator:validatePhone, trigger: "change" }],
        email: [{ required: true,validator:validateEmail, trigger: "change" }]
      },
      formLabelWidth: "80px"//调整标题右边对齐
        }
    },
    methods: {
      // 新增用户
        addUser(){
        userAdd(
          // 将对话框的表单内容传入
          this.userform
        ).then(res=>{
          window.console.log(res)
          if (res.code == 200) {
            // 提示用户新增成功
            this.$message.success('新增成功')
            // 关闭对话框
            this.dialogFormVisible = false
            // 清除表单数据,需要通过ref选择器进行选中
            this.$refs.userform.resetFields();
            this.$parent.getList();
          }else {
            this.$message.error(res.message)
          }
        })
        }
    },

}
</script>

<style>

</style>