<template>
        <!-- 遮罩层 -->
        <el-dialog title="新增企业" center :visible.sync="dialogFormVisible"  class="maskTitle" width="35%">
      <el-form :model="enterpriseform" :rules="addDialog" ref="enterpriseform" class="demo-rulesShadow">
        <!-- 企业编号 -->
        <el-form-item  label="企业编号" prop="eid" :label-width="formLabelWidth">
          <el-input v-model="enterpriseform.eid" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 企业名称 -->
        <el-form-item label="企业名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="enterpriseform.name" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 企业简称 -->
        <el-form-item label="企业简称" prop="short_name" :label-width="formLabelWidth">
          <el-input v-model="enterpriseform.short_name" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 企业简介 -->
        <el-form-item label="企业简介" prop="intro" :label-width="formLabelWidth">
          <el-input v-model="enterpriseform.intro" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 企业备注 -->
        <el-form-item label="企业备注" prop="remark"  :label-width="formLabelWidth">
          <el-input v-model="enterpriseform.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary"  @click="addEnterprise">确 定</el-button>
      </div>
    </el-dialog>
</template>

<script>
import {enterpriseAdd,} from "@/api/enterprise.js"
export default {
    data() {
        return {
                // 遮罩层信息
      dialogTableVisible: false,
      dialogFormVisible: false,
      enterpriseform: {
        eid: "",//企业编号
        name: "",//企业名称
        short_name: "",//企业简称
        intro: "",//企业简介
        remark: "",//备注
      },
      addDialog: {
        // 手机号码验证
        eid: [{ required: true,message:"企业编号不能为空", trigger: "blur" }],
        name: [{ required: true,message:"企业名称不能为空", trigger: "blur" }],
        short_name: [{ required: true,message:"企业简称不能为空", trigger: "blur" }],
        intro: [{ required: true,message:"企业简介不能为空", trigger: "blur" }],
        
      },
      formLabelWidth: "80px"//调整标题右边对齐
        }
    },
    methods: {
      // 新增企业
        addEnterprise(){
        enterpriseAdd(
          // 将对话框的表单内容传入
          this.enterpriseform
        ).then(res=>{
          window.console.log(res)
          if (res.code == 200) {
            // 提示用户新增成功
            this.$message.success('新增成功')
            // 关闭对话框
            this.dialogFormVisible = false
            // 清除表单数据,需要通过ref选择器进行选中
            this.$refs.enterpriseform.resetFields();
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