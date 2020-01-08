<template>
  <!-- 遮罩层 -->
  <el-dialog title="新增学科" center :visible.sync="dialogFormVisible" class="maskTitle" width="35%">
    <el-form :model="form" :rules="NewlyAdded" ref="NewlyAdded" class="demo-rulesShadow">
      <!-- 学科编号 -->
      <el-form-item label="学科编号" prop="Number" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 学科名称 -->
      <el-form-item label="学科名称" prop="Name" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 学科简称 -->
      <el-form-item label="学科简称" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 学科简介 -->
      <el-form-item label="学科简介" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 学科备注 -->
      <el-form-item label="学科备注" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      // 遮罩层数据
      form: {
        name: "", //注册用户名
        email: "", //注册用户邮箱
        phone: "", //注册手机号
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
        // 遮罩层信息
        dialogTableVisible: false,
        dialogFormVisible: false,
        formLabelWidth: "80px" ,//调整标题右边对齐
        NewlyAdded: {
        // 手机号码验证
        Number: [{ required: true, min:2,max:12, trigger: "blur" }],
        Name: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "change" }
        ],
      },
    };
  }
};
</script>

<style>
</style>