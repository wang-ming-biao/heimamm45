<template>
  <div class="body-box">
    <!-- 上半部分表单 -->
    <el-card class="box-card boxTop">
      <el-form :inline="true" ref="formInline" :model="formInline" class="demo-form-inline">
        <el-form-item prop="rid" label="学科编号">
          <el-input  v-model="formInline.rid"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="学科名称">
          <el-input  v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item prop="username" label="创建者">
          <el-input  v-model="formInline.username"></el-input>
        </el-form-item>
        <el-form-item  prop="status" label="状态">
          <el-select  v-model="formInline.status" placeholder="请选择状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchSubject">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="removeSubject">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="$refs.addDialog.dialogFormVisible = true"
          >新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 下半部分表格 -->
    <el-card class="box-card">
      <el-table :data="subList" border style="width: 100%">
        <el-table-column fixed type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="rid" label="学科编号" width="150"></el-table-column>
        <el-table-column prop="name" label="学科名称" width="150"></el-table-column>
        <el-table-column prop="short_name" label="简称" width="150"></el-table-column>
        <el-table-column prop="username" label="创建者" width="300"></el-table-column>
        <el-table-column prop="create_time" label="创建日期" width="300">
          <template slot-scope="scope">
            <span>{{scope.row.create_time | formatTime}}</span>
          </template>
        </el-table-column>
        <el-table-column fit prop="status" label="状态">
          <template slot-scope="scope">
            <span class="red" v-if="scope.row.status == 0">禁用</span>
            <span v-else>启用</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <!-- 将获取到的值传入到方法中, -->
            <el-button @click="enterEdit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button
              type="text"
              size="small"
              @click="switchs(scope.row.id)"
            >{{ scope.row.status == 0?'启用':'禁用' }}</el-button>
            <el-button type="text" size="small" @click="del(scope.row.id)">删除</el-button>
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
        :total="total"
      ></el-pagination>
    </el-card>
    <addDialog ref="addDialog"></addDialog>
    <editDialog ref="editDialog"></editDialog>
  </div>
</template>

<script>
import addDialog from "../subject/components/addDialog";
import editDialog from "../subject/components/editDialog";
import { subjectList, subjectStatus, subjectRemove } from "@/api/subject.js";
// 导入moment插件
// import formatTime from "../../../filters/index.js"
export default {
  data() {
    return {
      // 上半部分表单
      formInline: {
        rid:"",//学科编号
        name:"",//学科名称
        username:"",//创建者名称
        status:"",//状态
      },
      // 下半部分表格
      subList: [],//数据内容
      page: 1, // 页码
      size: 8, // 页容量,在页容量选项中要包含有
      pageSizes: [2, 4, 6, 8], //页容量选项
      total: 0,
    };
  },
  // 注册组件
  components: {
    addDialog,
    editDialog
  },
  methods: {
    //   筛选表单方法
    searchSubject() {
      this.getList();
    },
    // 清除表单方法
    removeSubject(){
      this.$refs.formInline.resetFields();
      this.getList();
    },
    // 每一页的数据量 改变 (页容量)
    handleSizeChange(val) {
      this.size = val;
      this.getList();
    },
    // 页码
    handleCurrentChange(val) {
      this.page = val;
      this.getList();
    },
    // 状态切换按钮
    switchs(id) {
      subjectStatus({
        id
      }).then(res => {
        if (res.code == 200) {
          this.$message.success("修改成功");
          this.getList();
        } else {
          this.$message.error("修改失败");
        }
      });
    },
    // 删除学科 
    del(id) {
      subjectRemove({
        id,
      }).then(res => {
        window.console.log(res);
        if (res.code == 200) {
        this.$message.success('删除成功')
        // 删除成功后重新请求数据
        this.getList();
        }else {
          this.$message.error('删除失败')
        }
      });
    },
    // 获取列表数据
    getList() {
      subjectList({
        page: this.page, //页数
        limit: this.size, //页容量
        // 将 formInline 表单的数据合并进来
        ...this.formInline
      }).then(res => {
        this.total = res.data.pagination.total;
        this.subList = res.data.items;
      });
    },
    // 编辑学科传值功能
    enterEdit(item){
      // 显示对话框
      this.$refs.editDialog.dialogFormVisible = true;
      // 接受传入的数据,并赋值给编辑组件的表单
      // this.$refs.editDialog.form = item;//值会实时变动,需要采用下方的深拷贝
      // 深拷贝
      this.$refs.editDialog.form = JSON.parse(JSON.stringify(item));
    },

  },

  // 进入页面请求数据
  created() {
    // 调用封装的getList方法
    this.getList();
  }
};
</script>

<style lang="less">
/* 主体盒子 */
.body-box {
  width: 100%;
  height: 100%;

  .pageBox {
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
.red {
  color: orangered;
}
</style>