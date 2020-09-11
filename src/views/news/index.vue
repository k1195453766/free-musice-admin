<!--  -->
<template>
  <div class="container">
    <div class="operation">
      <el-button type="primary" plain @click="handleAdd">新增文章</el-button>
      <el-button type="danger" plain @click="handleBulkDelete">批量删除</el-button>
    </div>
    <el-table
      :data="tableData"
      border
      height="700"
      @selection-change="handleSelectionChange"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="id" width="50"></el-table-column>
      <el-table-column prop="title" label="文章标题" width="120"></el-table-column>
      <el-table-column prop="type" label="文章类型" width="160"></el-table-column>
      <!-- <el-table-column prop="content" label="文章内容" width="300"></el-table-column> -->
      <el-table-column prop="description" label="文章描述" width="100"></el-table-column>
      <el-table-column prop="like_count" label="喜欢数量" width="100"></el-table-column>
      <el-table-column prop="collect_count" label="收藏数量" width="100"></el-table-column>
      <el-table-column prop="comment_count" label="评论数" width="100"></el-table-column>
      <el-table-column prop="browse_count" label="文章浏览量" width="100"></el-table-column>
      <el-table-column prop="create_time" label="创建时间" width="100"></el-table-column>
      <el-table-column prop="update_time" label="修改时间" width="100"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        background
        layout="total, sizes,prev, pager, next"
        :total="pagesize"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :page-sizes="[10, 30, 50, 100]"
      ></el-pagination>
    </div>
    <addDiaLog
      :dialogData="dialogData"
      :dialogVisible="dialogVisible"
      @dialogClose="dialogClose"
      @addNews="addNews"
      ref="addDialog"
    />
  </div>
</template>

<script>
import { newsList, addNews, deleteNews } from "@/utils/server";
import addDiaLog from "./components/add";
export default {
  name: "News",
  data() {
    return {
      pagesize: 0,
      page: 0,
      size: 10,
      tableData: [],
      dialogVisible: false, //控制dialog是否显示
      dialogData: {}, //编辑时展示的数据
      currRow: [], //选中的当前行
    };
  },
  components: {
    addDiaLog,
  },
  mounted() {
    this.getNewsList();
  },

  methods: {
    // 新增
    handleAdd() {
      this.dialogData = {};
      this.dialogVisible = true;
    },
    // 关闭dialog
    dialogClose() {
      this.dialogData = {};
      this.dialogVisible = false;
    },
    // 确定dialog
    addNews(data) {
      if (data.id == "") {
        addNews(data, (res) => {
          if (res.code == 1) {
            this.$message("新增成功");
            this.getNewsList();
            this.dialogData = {};
            this.dialogVisible = false;
            this.$refs.addDialog.clearFrom();
          } else {
            this.$message(res.msg);
          }
        });
      } else {
        addNews(data, (res) => {
          if (res.code == 1) {
            this.$message({
              message: "修改成功",
              type: "success",
            });
            this.getNewsList();
            this.dialogData = {};
            this.dialogVisible = false;
            this.$refs.addDialog.clearFrom();
          } else {
            this.$message.error(res.msg);
          }
        });
      }
    },
    //   编辑文章
    handleEdit(index, row) {
      this.dialogData = row;
      this.dialogVisible = true;
    },

    // 删除文章
    handleDelete(index, row) {
      this.$confirm("确定要删除该用户吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteNews(row.id);
        })
        .catch(() => {});
    },

    // 批量删除
    handleBulkDelete() {
      let ids = "";
      if (this.currRow.length == 0) {
        this.$message({
          message: "请选择要删除项",
          type: "warning",
        });
        return;
      }
      for (const index in this.currRow) {
        ids = this.currRow[index].id + "," + ids;
      }
      this.deleteNews(ids);
    },
    /**
     * @func 获取文章列表
     * @desc
     * @param {}
     * @return {}
     */
    getNewsList() {
      newsList(this.page, this.size, (res) => {
        if (res.code == 1) {
          this.tableData = res.data.list;
          this.pagesize = res.data.totle;
        } else {
          this.$message(res.msg);
        }
      });
    },
    // 删除文章
    deleteNews(id) {
      deleteNews(id, (res) => {
        if (res.code == 1) {
          this.getNewsList();
        } else {
          this.$message(res.msg);
        }
      });
    },
    // 多选
    handleSelectionChange(val) {
      this.currRow = val;
    },
    // 每页条数改变
    handleSizeChange(val) {
      this.size = val;
      this.getNewsList();
    },
    // 当前页码改变
    handleCurrentChange(val) {
      this.page = val - 1;
      this.getNewsList();
    },
  },
};
</script>

<style  scoped>
.operation {
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
}
.el-pagination {
  position: absolute;
  right: 4%;
}
.page {
  width: 90%;
  height: 40px;
  margin-top: 20px;
}
.container {
  width: 90%;
  height: 90%;
  margin: 0 auto;
  margin-top: 20px;
}
</style>
