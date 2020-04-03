<template >
  <!-- opened : 饿了么提供的表单回调,对话框完全打开之后触发 -->
  <el-dialog
    @opened="opened"
    class="question-add"
    fullscreen
    title="新增题库测试"
    :visible.sync="dialogFormVisible"
    center
  >
    <!-- 给表单外部加宽度,并使其居中 -->
    <el-form label-position="position" class="question-form" :model="addForm" :rules="rules">
      <el-form-item label="学科" prop="question" :label-width="formLabelWidth">
        <el-select v-model="addForm.region" prop="subject_id" class="boxSize" placeholder="请选择学科">
          <el-option
            v-for="(item) in $parent.subjectList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="阶段" prop="enterprise" :label-width="formLabelWidth">
        <el-select v-model="addForm.region" placeholder="请选择阶段">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业" prop="enterprise" :label-width="formLabelWidth">
        <el-select
          v-model="addForm.region"
          prop="enterprise_id"
          class="boxSize"
          placeholder="请选择企业"
        >
          <el-option
            v-for="item in $parent.enterpriseList"
            :key="item.id"
            :label="item.name"
            value="shanghai"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="城市" prop="enterprise" :label-width="formLabelWidth">
        <!-- 级联选择器 -->
        <el-cascader
          v-model="value"
          :options="options"
          :props="{ expandTrigger: 'hover' }"
          @change="handleChange"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="题型" prop="enterprise" :label-width="formLabelWidth">
        <el-radio-group v-model="radio">
          <el-radio :label="3">单选</el-radio>
          <el-radio :label="6">多选</el-radio>
          <el-radio :label="9">简答</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="难度" prop="enterprise" :label-width="formLabelWidth">
        <el-radio-group v-model="radio">
          <el-radio :label="3">简单</el-radio>
          <el-radio :label="6">一般</el-radio>
          <el-radio :label="9">困难</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 富文本编辑器 -->
      <el-form-item label="试题标题"></el-form-item>
      <div class="title-toolbar"></div>
      <div class="title-content"></div>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <el-form-item label="单选">
        <el-radio-group v-model="addForm.select_options">
          <!-- 选项A -->
          <div class="option-box">
            <el-radio label="A">A</el-radio>
            <el-input v-model="addForm.select_options[0].text"></el-input>
            <!-- 用户头像上传 -->
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageAUrl" :src="imageAUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!-- 选项B -->
          <div class="option-box">
            <el-radio label="B">B</el-radio>
            <el-input v-model="addForm.select_options[1].text"></el-input>
            <!-- 用户头像上传 -->
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleBvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageBUrl" :src="imageBUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!-- 选项C -->
          <div class="option-box">
            <el-radio label="C">C</el-radio>
            <el-input v-model="addForm.select_options[2].text"></el-input>
            <!-- 用户头像上传 -->
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleCvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageCUrl" :src="imageCUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!-- 选项D -->
          <div class="option-box">
            <el-radio label="D">D</el-radio>
            <el-input v-model="addForm.select_options[3].text"></el-input>
            <!-- 用户头像上传 -->
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleDvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageDUrl" :src="imageDUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-radio-group>
      </el-form-item>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 解析视频 -->
      <el-form-item label="视频解析">
        <el-upload
          class="upload-demo"
          :action="uploadUrl"
          :on-success="handleVideoSuccess"
          :before-upload="beforeVideoUpload"
        >
          <el-button size="small" type="success">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传视频文件，且不超过2MB</div>
        </el-upload>
        <video v-if="videoDUrl" :src="videoDUrl" autoplay loop controls></video>
      </el-form-item>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 富文本编辑器 -->
      <el-form-item label="答案解析"></el-form-item>
      <div class="answer-toolbar"></div>
      <div class="answer-content"></div>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 试题备注 -->
      <el-form-item label="试题备注">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          v-model="textarea2">
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入级联选择器数据
import { regionData } from "element-china-area-data";
// 导入富文本编辑器
import wangeditor from "wangeditor";
export default {
  name: "addDialog",
  data() {
    return {
      dialogFormVisible: false, // 遮罩层是否展开
      options: regionData, // 级联选择器数据
      uploadUrl: process.env.VUE_APP_BASEURL + "/question/upload", // 上传地址
      position: 'left', // 对齐方式
      // 验证表单
      addForm: {
        select_options: [
          {
            label: "A",
            text: "狗不理",
            image: "upload/20191129/fd5f03a07d95e3948860240564b180e4.jpeg"
          },
          {
            label: "B",
            text: "猫不理",
            image: "upload/20191129/e93e7bb72accda7f3159cdabc4203991.jpeg"
          },
          {
            label: "C",
            text: "麻花",
            image: "upload/20191129/b7caf98be9d0aa6764b0112ba0dfa19e.jpeg"
          },
          {
            label: "D",
            text: "炸酱面",
            image: "upload/20191129/4067f19ab53a5e8388ad3459e23110f0.jpeg"
          }
        ],
        video: '', // 视频的地址
        remark: '' // 试题备注
      },
      rules: {
        question: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        enterprise: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }, // 表单验证规则定义
      formLabelWidth: "60px", // 下拉框的选项
      radio: 3, // 单选框的值
      titleEditor: undefined, // 编辑器 头部
      answerEditor: undefined, // 编辑器 答案
      imageAUrl: "", // 图片上传的本地预览地址
      imageBUrl: "", // 图片上传的本地预览地址
      imageCUrl: "", // 图片上传的本地预览地址
      imageDUrl: "", // 图片上传的本地预览地址
      videoDUrl: "" // 视频上传后的本地预览地址
    };
  },
  methods: {
    opened() {
      // 创建编辑器,在每次创建时要加入判断逻辑,防止opened重复创建
      if (this.titleEditor === undefined) {
        // title 标题
        // editor 编辑器
        this.titleEditor = new wangeditor(".title-toolbar", ".title-content");
        // create方法
        this.titleEditor.create();
      }
      if (this.answerEditor === undefined) {
        // answer: 回答,答案
        this.answerEditor = new wangeditor(
          ".answer-toolbar",
          ".answer-content"
        );
        // create方法
        this.answerEditor.create();
      }
    },
    // 选项A的 上传组件钩子
    handleAvatarSuccess(res, file) {
      //  当文件上传成功之后,在本地生成一个地址
      this.imageAUrl = URL.createObjectURL(file.raw);
      // /通过打印res获取服务器返回的url地址,并将其赋值给表单
      this.addForm.select_options[0].image = res.data.url;
    },
    // 选项B的 上传组件钩子
    handleBvatarSuccess(res, file) {
      //  当文件上传成功之后,在本地生成一个地址
      this.imageBUrl = URL.createObjectURL(file.raw);
      // /通过打印res获取服务器返回的url地址,并将其赋值给表单
      this.addForm.select_options[1].image = res.data.url;
    },
    // 选项C的 上传组件钩子
    handleCvatarSuccess(res, file) {
      //  当文件上传成功之后,在本地生成一个地址
      this.imageCUrl = URL.createObjectURL(file.raw);
      // /通过打印res获取服务器返回的url地址,并将其赋值给表单
      this.addForm.select_options[2].image = res.data.url;
    },
    // 选项D的 上传组件钩子
    handleDvatarSuccess(res, file) {
      //  当文件上传成功之后,在本地生成一个地址
      this.imageDUrl = URL.createObjectURL(file.raw);
      // /通过打印res获取服务器返回的url地址,并将其赋值给表单
      this.addForm.select_options[3].image = res.data.url;
    },
    // 图片上传验证逻辑
    beforeAvatarUpload(file) {
      // 如果想上传别的类型的照片,可以修改判断逻辑
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/PNG/JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 视频解析上传
    // 视频解析上传组件钩子
    handleVideoSuccess(res, file) {
      //  视频的预览地址
      this.videoDUrl = URL.createObjectURL(file.raw);
      // /通过打印res获取服务器返回的url地址,并将其赋值给表单
      this.addForm.video = res.data.url;
    },
    // 视频上传验证逻辑
    beforeVideoUpload(file) {
      // 如果想上传别的类型的照片,可以修改判断逻辑
      const isMP4 = file.type === "video/mp4";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isMP4) {
        this.$message.error("上传的视频只能是 MP4 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传视频大小不能超过 2MB!");
      }
      return isMP4 && isLt2M;
    }
  }
};
</script>

<style lang="less" scoped>
// 使用深度选择器选择
/deep/.el-input {
  width: 364px;
}
.question-form {
  width: 834px;
  margin: 0 auto;
}
.title-toolbar {
  border: 1px solid #ededed;
  border-bottom: none;
}
.title-content {
  height: 100px;
  border: 1px solid #ededed;
  border-bottom: none;
  margin-bottom: 20px;
  .w-e-text::-webkit-scrollbar {
    display: none;
  }
}
.answer-toolbar {
  border: 1px solid #ededed;
  border-bottom: none;
}
.answer-content {
  height: 100px;
  border: 1px solid #ededed;
  border-bottom: none;
  .w-e-text::-webkit-scrollbar {
    display: none;
  }
}
// 用户上传组件
.option-box {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  .el-input {
    width: 476px;
    margin-right: 20px;
  }
}
// 用户头像上传样式
/deep/.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>