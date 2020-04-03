<template>
  <div class="body-box">
    <!-- 上半部分表格 -->
    <el-card class="box-card boxTop">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-row :gutter="24">
          <el-form-item label="学科">
            <el-select v-model="formInline" prop="subject_id" class="boxSize" placeholder="请选择学科">
              <el-option v-for="(item) in subjectList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="阶段">
            <el-select v-model="formInline" prop="subject_id" class="boxSize" placeholder="请选择阶段">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业">
            <el-select v-model="formInline" prop="enterprise_id" class="boxSize" placeholder="请选择企业">
              <el-option v-for="item in enterpriseList" :key="item.id" :label="item.name" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="题型">
            <el-select v-model="formInline" prop="question_type" class="boxSize" placeholder="请选择题型">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row :gutter="24">
          <el-form-item label="难度">
            <el-select v-model="formInline" prop="difficulty" class="boxSize" placeholder="请选择难度">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="作者" prop="username">
            <el-input v-model="formInline.user"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="formInline" prop="status" class="boxSize" placeholder="请选择状态">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期">
            <el-input v-model="formInline.user" suffix-icon="el-icon-date" prop="subject_id" class="boxSize" placeholder="选择日期" ></el-input>
          </el-form-item>
        </el-row>
        <el-form-item label="标题">
          <el-input v-model="formInline.user" prop="title" class="titleInput"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button>清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-plus" @click="$refs.addDialog.dialogFormVisible = true">新增试题</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 下半部分表格 -->
    <el-card class="box-card">
      <el-table  border style="width: 100%">
        <el-table-column fixed type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="subject" label="题目" width="150"></el-table-column>
        <el-table-column prop="stage" label="学科.阶段" width="150"></el-table-column>
        <el-table-column prop="Question" label="题型" width="150"></el-table-column>
        <el-table-column prop="enterprise" label="企业" width="300"></el-table-column>
        <el-table-column prop="creator" label="创建者" width="300"></el-table-column>
        <el-table-column fit prop="state" label="状态"></el-table-column>
        <el-table-column fit prop="Traffic" label="访问量"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
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
        :current-page="Page"
        :page-sizes="pageSize"
        :page-size="total"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <addDialog ref="addDialog" />
  </div>
</template>

<script>
// 导入获取学科列表的方法
import { subjectList } from '@/api/subject'
// 导入获取企业数据方法
import { enterpriseList } from '@/api/enterprise'
// 导入新增试题组件
import addDialog from './components/addDialog'
export default {
  components : {
    addDialog
  },
  data() {
    return {
      // 上半部分表单
      formInline: {},
      // 页容量
      Page: 4,
      // 页容量选项
      pageSize: [2,4,6,8],
      // 总条数
      total: 0,
      subjectList: [], // 企业数据
      enterpriseList: []
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
  },
  created () {
    // 获取学科数据
    subjectList().then(res=>{
      this.subjectList = res.data.items
    }),
    // 获取企业数据
    enterpriseList().then(res =>{
      this.enterpriseList = res.data.items
    })
  }
};
</script>

<style>
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
.el-form-item {
  margin-left: 30px;
}
.boxSize{
  width: 200px;
}
.titleInput{
  width: 300px;
  margin: 0;
}
</style>