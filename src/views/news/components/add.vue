<!--  -->
<template>
  <div>
    <el-dialog
      title="提示"
      customClass="dialog-pub"
      width="80%"
      :visible.sync="dialogVisible"
      :before-close="dialogClose"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>

        <el-form-item label="文章描述" prop="description">
          <el-input v-model="ruleForm.description"></el-input>
        </el-form-item>

        <el-form-item label="喜欢数量" prop="like_count">
          <el-input v-model.number="ruleForm.like_count"></el-input>
        </el-form-item>

        <el-form-item label="浏览数量" prop="browse_count">
          <el-input v-model.number="ruleForm.browse_count"></el-input>
        </el-form-item>
        <el-form-item label="文章类型" prop="type">
          <el-select v-model="ruleForm.type" placeholder="请选择文章类型">
            <el-option
              v-for="(type, index) in types"
              :key="index"
              :label="type.cate_name"
              :value="type.class_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章内容" prop="content">
          <mavon-editor
            :shortCut="false"
            :subfield="false"
            @save="saveDoc"
            @change="updateDoc"
            ref="editor"
            @imgAdd="imgAdd"
            v-model="ruleForm.content"
          ></mavon-editor>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogClose">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { newsTypeList, updataImage } from "@/utils/server";
import { BaseUrl } from "@/utils/api";
export default {
  name: "addDiaLog",
  props: {
    dialogVisible: Boolean,
    dialogData: Object,
  },
  data() {
    return {
      param: {},
      types: [], //文章分类
      ruleForm: {
        title: "",
        description: "",
        like_count: "",
        browse_count: "",
        type: "",
        content: "",
        content_md: "",
      },
      rules: {
        title: [{ required: true, message: "请输入文章名称", trigger: "blur" }],
        type: [{ required: true, message: "请选择文章分类", trigger: "blur" }],
        content: [
          { required: true, message: "请输入文章内容", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    this.getNewsTypeList();
  },
  methods: {
    // 情况from表单
    clearFrom() {
      this.$refs["ruleForm"].resetFields();
    },
    // 获取分类
    getNewsTypeList() {
      newsTypeList((res) => {
        if (res.code == 1) {
          this.types = res.data;
        } else {
          this.message(res.msg);
        }
      });
    },
    // 关闭dialog
    dialogClose() {
      this.$emit("dialogClose");
      this.$refs["ruleForm"].resetFields();
    },
    // 确定dialog
    submitForm() {
      if (this.param.title == undefined) {
        // 新增
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.ruleForm.id = "";
            this.ruleForm.content = this.$refs.editor.d_render;
            this.$emit("addNews", this.ruleForm);
          } else {
            return false;
          }
        });
      } else {
        // 编辑
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.ruleForm.id = this.param.id;
            this.ruleForm.content = this.$refs.editor.d_render;
            this.$emit("addNews", this.ruleForm);
          } else {
            return false;
          }
        });
      }
    },
    updateDoc(markdown, html) {
      // 此时会自动将 markdown 和 html 传递到这个方法中
      // console.log("markdown内容: " + markdown);
      // console.log("html内容:" + html);
      this.ruleForm.content_md = markdown;
    },
    saveDoc(markdown, html) {
      // 此时会自动将 markdown 和 html 传递到这个方法中
      // console.log("markdown内容:" + markdown);
      // console.log("html内容:" + html);
    },
    // 编辑器添加图片
    imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      updataImage(pos, $file, (res) => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        let newRes = decodeURI(res.imageUrl).replace(/\\/g, "/");
        this.$refs.editor.$img2Url(pos, BaseUrl + newRes);
      });
    },
    // 删除编辑器中的图片
    imgDel(pos) {
      delete this.imgFile[pos];
    },
  },
  watch: {
    dialogData: function (val) {
      this.param = val;
      if (val.title == undefined) {
        // this.ruleForm = {
        //   title: "",
        //   type: "",
        //   content: "",
        // };
      } else {
        this.ruleForm = {
          title: val.title,
          type: val.type_id,
          content: val.content_md,
          browse_count: val.browse_count,
          description: val.description,
          like_count: val.like_count,
        };
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
#container-dialog {
  width: 90%;
  height: 90%;
}
.el-dialog__wrapper .dialog-pub {
  width: 80%;
  margin-top: 0;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.el-dialog__wrapper {
  left: $sideBarWidth;
  top: 60px;
}
</style>
