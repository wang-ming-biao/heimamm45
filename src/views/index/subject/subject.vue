<template>
  <div class="body-box ">
      <!-- 上半部分表单 -->
    <el-card class="box-card boxTop">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科编号">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="学科名称">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="状态">
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
          <el-button type="primary" icon="el-icon-plus" @click="$refs.addDialog.dialogFormVisible = true">新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 下半部分表格 -->
    <el-card class="box-card">
      <el-table  :data="tableData" border style="width: 100%">
        <el-table-column fixed  type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="Discipline_number" label="学科编号" width="150"></el-table-column>
        <el-table-column prop="Subject_name" label="学科名称" width="150"></el-table-column>
        <el-table-column prop="Abbreviation" label="简称" width="150"></el-table-column>
        <el-table-column prop="creator" label="创建者" width="300"></el-table-column>
        <el-table-column prop="Date_of_creation" label="创建日期" width="300"></el-table-column>
        <el-table-column fit prop="state" label="状态"></el-table-column>
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
    <addDialog ref="addDialog"></addDialog>
  </div>
</template>

<script>
import addDialog from '../subject/components/addDialog'
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
          Discipline_number: "QD001",//学科编号
          Subject_name: "前端与移动开发",//学科名称
          Abbreviation: "前端",//简称
          creator: "刘洋洋",//创建者
          Date_of_creation: '2020-1-7',//创建日期
          state:"启用"//状态
        },
      ],
    //   分页信息
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,


      
    };
  },
  components:{
  addDialog,
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
    .el-dialog__title {
        color: aliceblue;
        font-weight: 700;
    }
  }
</style>