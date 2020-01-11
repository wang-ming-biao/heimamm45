<template>
  <div class="body-box">
      <!-- 上半部分表单 -->
    <el-card class="box-card boxTop">
      <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
        <el-form-item label="用户名称" prop="eid">
          <el-input v-model="formInline.eid"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="name">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="status">
          <el-select v-model="formInline.status" placeholder="请选择角色">
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="1"></el-option>
            <el-option label="学生" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="onRemove">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-plus" @click="$refs.addDialog.dialogFormVisible = true">新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 下半部分表格 -->
    <el-card class="box-card">
      <el-table :model="tableData" :data="tableData" border style="width: 100%">
        <el-table-column fixed  type="index" label="序号" width="100"></el-table-column>
        <el-table-column v-model="tableData.username" prop="username" label="用户名" width="200"></el-table-column>
        <el-table-column v-model="tableData.phone" prop="phone" label="电话" width="200"></el-table-column>
        <el-table-column v-model="tableData.email" prop="email" label="邮箱" width="300"></el-table-column>
        <el-table-column v-model="tableData.role" prop="role" label="角色" width="150"></el-table-column>
        <el-table-column v-model="tableData.remark" prop="remark" label="备注" width="200"></el-table-column>
          <el-table-column fit prop="status" label="状态">
        <template slot-scope="scope" >
            <span v-if="scope.row.status == 1">启用</span>
            <span v-else class="red">禁用</span>
        </template>
          </el-table-column>
        <el-table-column  fixed="right" label="操作" width="240">
          <!-- 插槽语法 -->
          <template slot-scope="scope">
            <el-button  type="text" size="small" @click="edits(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="changeEnterprise(scope.row.id)">
              <span v-if="scope.row.status == 0">启用</span>
              <span v-else>禁用</span>
            </el-button>
            <el-button type="text" @click="removeEnterprise(scope.row.id)" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
       <el-pagination
       background
       class="pageBox"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="pageSizes"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </el-card>
    <addDialog ref="addDialog"></addDialog>
    <editDialog ref="editDialog"></editDialog>
  </div>
</template>

<script>
import addDialog from "./components/addDialog.vue"
import editDialog from "./components/editDialog.vue"
import {userList,userStatus,userRemove} from "@/api/user.js"
export default {
  data() {
    return {
        // 上半部分表单
      formInline: {},
    //   下半部分表格内容,通过v-model与表单进行双向绑定
      tableData: [],
    // 分页信息
    pageSizes:[2,4,6,8],//总页容量选项
    size:2, // 当前页容量
    page:1, // 默认当前页
    total:0,// 当前总页数
    };
  },
  components:{
    addDialog,//新增用户对话框
    editDialog,//编辑用户对话框
  },
  methods: {
    // 获取用户列表
    getList(){
      userList({
        // 将页码与页容量作为请求参数发送给服务器
        page:this.page, // 页码
        limit:this.size, // 页容量
        ...this.formInline,// ...对象,将其内部的值传入
      }).then(res=>{
        if (res.code == 200) {
          // 接受获取到的数据
          this.total = res.data.pagination.total
          this.tableData = res.data.items
        }
      })
    },
    // 修改用户状态
    changeEnterprise(id){
      userStatus({
        id,
      }).then(res=>{
        if (res.code == 200) {
          // 提示用户
          this.$message.success("温馨提示:状态切换成功")
          // 刷新页面
          this.getList()
        }
      })
    },
    // 删除用户
    removeEnterprise(id){
      this.$confirm('你确定要删除吗', '温馨提示', {
        confirmButtonText: '残忍删除',
        cancelButtonText: '再想想',
        type: 'warning'
      }).then(() => {
        // 点击确定删除
        userRemove({
      id, //将id传输给用户
    }).then(res=>{
      if (res.code == 200) {
        // 提示用户
        this.$message.success("删除成功")
        // 刷新页面
        this.getList();
      }
    })
      }).catch(() => {});
    
    },
    // 编辑用户
    edits(val){
      // 通过ref选择器找到子代
    this.$refs.editDialog.dialogFormVisible = true;
    // 将页面传入的值赋值给对话框
    // JSON.parse()是将JSON字符串转换成JSON对象。
    // JSON.stringify()是将JSON对象转换成JSON字符串。
    this.$refs.editDialog.form = JSON.parse(JSON.stringify(val))
    },
    //   表单搜索方法
    onSubmit() {
      // 通过 ...this.对象 的方法,将表单的数据传入请求中
      // 然后再调用接口请求数据
      this.getList();
    },
    //   表单清除方法
    onRemove(){
      this.$refs.formInline.resetFields();
      this.getList();
    },
    //   分页方法
      handleSizeChange(val) {
        // 在请求数据列表时将页码与页容量传入请求中
        this.size = val;
        // 选择页容量后是页面返回到第一页
        this.page = 1;
        this.getList();
      },
      handleCurrentChange(val) {
        // window.console.log(`当前页: ${val}`);
        this.page = val;
        this.getList();
      }
  },
      // 页面一加载请求用户列表数据
    created() {
    this.getList();
    },
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
    .el-dialog__title {
        color: aliceblue;
        font-weight: 700;
    }
  }
  // 禁用文字颜色
  .red {
    color: red;
  }
</style>