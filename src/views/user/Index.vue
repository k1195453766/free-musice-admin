
<template>
  <div>
    <div class="container">
      <div class="operation">
        <el-button type="primary" plain @click="handleAdd">新增用户</el-button>
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
        <el-table-column prop="username" label="姓名" width="100"></el-table-column>
        <el-table-column prop="phone" label="电话" width="120"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="160"></el-table-column>
        <el-table-column prop="address" label="地址" width="300"></el-table-column>
        <el-table-column prop="create_time" label="注册时间" width="100"></el-table-column>
        <el-table-column prop="role" label="角色" width="120">
          <template slot-scope="scope">
            <div>{{ scope.row.role=='1'? '超级管理员': scope.row.role=='5'?'用户':scope.row.role=='4'?'会员':scope.row.role=='3'?'管理员':'' }}</div>
          </template>
        </el-table-column>
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
    </div>

    <addDiaLog
      :dialogData="dialogData"
      :dialogVisible="dialogVisible"
      @dialogClose="dialogClose"
      @dialogSure="dialogSure"
    />
  </div>
</template>

<script>
import addDiaLog from "./components/add";
export default {
  name: "User",
  data() {
    return {
      pagesize: 0,
      page: 0,
      size: 10,
      tableData: [],
      dialogVisible: false, //控制dialog是否显示
      dialogData: {}, //编辑时展示的数据
      currRow: [] //选中的当前行
    };
  },
  components: {
    addDiaLog
  },
  mounted() {
    this.getUserList();
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
    dialogSure(data) {
      this.$http({
        url: "/api/addUser",
        method: "get",
        params: data
      })
        .then(res => {
          if (res.status == 1) {
            this.$message({
              message: "新增成功",
              icon: "success"
            });
            this.getUserList();
            this.dialogVisible = false;
          } else {
            this.$message(res.msg);
          }
        })
        .catch(e => {
          console.log("addUserError", e);
        });
    },
    //   编辑用户
    handleEdit(index, row) {
      this.dialogData = row;
      this.dialogVisible = true;
    },
    // 删除用户
    handleDelete(index, row) {
      this.$confirm("确定要删除该用户吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteUser(row.id);
        })
        .catch(() => {});
    },
    // 批量删除
    handleBulkDelete() {
      let ids = "";
      if (this.currRow.length == 0) {
        this.$message({
          message: "请选择要删除项",
          type: "warning"
        });
        return;
      }
      for (const index in this.currRow) {
        ids = this.currRow[index].id + "," + ids;
      }
      this.$http({
        url: "/api/deleteUser",
        method: "get",
        params: { userids: ids }
      })
        .then(res => {
          if (res.status == 1) {
            this.$message("删除成功");
            this.getUserList();
          } else {
            this.$message(res.msg);
          }
        })
        .catch(e => {
          console.log("deleteUserError", e);
        });
    },
    // 多选
    handleSelectionChange(val) {
      this.currRow = val;
    },
    // 每页条数改变
    handleSizeChange(val) {
      this.size = val;
      this.getUserList();
    },
    // 当前页码改变
    handleCurrentChange(val) {
      this.page = val - 1;
      this.getUserList();
    },

    /**
     * @func 获取用户列表
     * @desc
     * @param {}
     * @return {}
     */
    getUserList() {
      this.$http({
        url: "/api/userList",
        method: "get",
        params: { page: this.page, size: this.size }
      })
        .then(res => {
          if (res.status == 1) {
            this.tableData = res.data.list;
            this.pagesize = res.data.totle;
          } else {
            this.$message(res.msg);
          }
        })
        .catch(e => {
          console.log("getUserListError", e);
        });
    },
    // 删除用户
    deleteUser(id) {
      this.$http({
        url: "/api/deleteUser",
        method: "get",
        params: { userids: id }
      })
        .then(res => {
          if (res.status == 1) {
            this.$message("删除成功");
            this.getUserList();
          } else {
            this.$message(res.msg);
          }
        })
        .catch(e => {
          console.log("deleteUserError", e);
        });
    }
  }
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
