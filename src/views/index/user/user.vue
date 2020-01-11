<template>
  <div class="body-box">
      <!-- 上半部分表单 -->
    <el-card class="box-card boxTop">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label=" 用户名称">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="formInline.region" placeholder="请选择状态">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button>清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 下半部分表格 -->
    <el-card class="box-card">
      <el-table  :data="tableData" border style="width: 100%">
        <el-table-column fixed  type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="name" label="用户名" width="150"></el-table-column>
        <el-table-column prop="province" label="电话" width="150"></el-table-column>
        <el-table-column prop="city" label="邮箱" width="150"></el-table-column>
        <el-table-column prop="address" label="角色" width="300"></el-table-column>
        <el-table-column prop="zip" label="备注" width="300"></el-table-column>
        <el-table-column fit label="状态"></el-table-column>
        <el-table-column  fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
       <el-pagination
       background
       class="pageBox"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
    </el-card>
    <!-- 遮罩层 -->
        <el-dialog title="用户新增" center :visible.sync="dialogFormVisible"  class="maskTitle" width="35%">
      <el-form :model="form" :rules="rulesShadow" ref="rulesShadow" class="demo-rulesShadow">
        <!-- 用户名 -->
        <el-form-item  label="用户名" prop="name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 电话 -->
        <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 角色 -->
        <el-form-item label="角色" prop="phone" :label-width="formLabelWidth">
    <el-select v-model="form.email" placeholder="请选择角色">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
        <!-- 状态 -->
        <el-form-item label="状态" prop="phone" :label-width="formLabelWidth">
    <el-select v-model="form.email" placeholder="请选择状态">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
                <!-- 用户备注 -->
        <el-form-item label="用户备注" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 邮箱验证方法:当输入框失去焦点时调用这里的方法
  const validateEmail = (rule, value, callback) => {
    if (value === "") {
      callback(new Error("邮箱地址不能为空!"));
    } else {
      // 定义正则
      const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      if (reg.test(value) == true) {
        callback();
      } else {
        callback(new Error("请输入正确的邮箱地址!"));
      }
    }
  };

  // 当输入框失去焦点时调用这里的方法验证手机号
const validatePhone = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入手机号"));
  } else {
    // 定义正则
    const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    if (reg.test(value) == true) {
      callback();
    } else {
      callback(new Error("请输入正确的手机号码"));
    }
  }
};
export default {
  data() {
    return {
        // 上半部分表单
      formInline: {
        user: "",
        region: ""
      },
    //   下半部分表格
      tableData: [
        {
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
      ],
    //   分页信息
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
    // 遮罩层信息
    rules: {
        // 手机号码验证
        name: [{ required: true, validator: validatePhone, trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: "change"
          }
        ],
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",//注册用户名
        email: "",//注册用户邮箱
        phone: "",//注册手机号
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      rulesShadow: {
        avatar:[{required: true,trigger: "change",message:"头像不能为空"}],
        email:[{required: true,trigger: "blur",validator:validateEmail}],
        // 手机号码验证
        phone: [{ required: true, validator: validatePhone, trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: "blur"
          }
        ],
        name: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "change" }
        ],
      },
      formLabelWidth: "80px"//调整标题右边对齐
    };
  },
  methods: {
    //   表单方法
    onSubmit() {
      window.console.log("submit!");
    },
    //  表格方法
    handleClick(row) {
        window.console.log(row);
      },
    //   分页方法
          handleSizeChange(val) {
        window.console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        window.console.log(`当前页: ${val}`);
      }
  }
};
</script>

<style lang="less">
/* 主体盒子 */
.body-box {
  width: 100%;
  height: 100%;

  .pageBox{
      text-align: center;
      margin-top: 20px;
  }
}
/* 卡片样式 */
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 100%;
}
.boxTop {
    margin-bottom: 20px;
}
  // 头部标题背景颜色
  .el-dialog__header {
    background-color: rgba(1, 198, 250, 1);
    color: aliceblue;
    .el-dialog__title {
        color: aliceblue;
        font-weight: 700;
    }
  }
</style>