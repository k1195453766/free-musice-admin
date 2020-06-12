<!--  -->
<template>
  <div>
    <div class="container">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="username" label="姓名" width="180"></el-table-column>
        <el-table-column prop="phone" label="电话" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="create_time" label="注册时间" sortable></el-table-column>
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
          layout="total, sizes, prev, pager, next"
          :total="100"
          :page-sizes="[10, 20, 30, 50]"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      page: 100,
      tableData: [
        {
          create_time: "2016-05-02",
          username: "王二虎",
          address: "上海市普陀区金沙江路 1518 弄",
          email: "183397156@qq.com",
          phone: 18753146877
        },
        {
          create_time: "2016-05-03",
          username: "王三虎",
          address: "上海市普陀区金沙江路 1517 弄",
          email: "183397156@qq.com",
          phone: 18753146877
        },
        {
          create_time: "2016-05-04",
          username: "王四虎",
          address: "上海市普陀区金沙江路 1517 弄",
          email: "183397156@qq.com",
          phone: 18753146877
        },
        {
          create_time: "2016-05-01",
          username: "王大虎",
          address: "上海市普陀区金沙江路 1517 弄",
          email: "183397156@qq.com",
          phone: 18753146877
        },
        {
          create_time: "2016-05-02",
          username: "王二虎",
          address: "上海市普陀区金沙江路 1518 弄",
          email: "183397156@qq.com",
          phone: 18753146877
        },
        {
          create_time: "2016-05-03",
          username: "王三虎",
          address: "上海市普陀区金沙江路 1517 弄",
          email: "183397156@qq.com",
          phone: 18753146877
        },
        {
          create_time: "2016-05-04",
          username: "王四虎",
          address: "上海市普陀区金沙江路 1517 弄",
          email: "183397156@qq.com",
          phone: 18753146877
        },
        {
          create_time: "2016-05-01",
          username: "王大虎",
          address: "上海市普陀区金沙江路 1517 弄",
          email: "183397156@qq.com",
          phone: 18753146877
        },
        {
          create_time: "2016-05-02",
          username: "王二虎",
          address: "上海市普陀区金沙江路 1518 弄",
          email: "183397156@qq.com",
          phone: 18753146877
        },
        {
          create_time: "2016-05-03",
          username: "王三虎",
          address: "上海市普陀区金沙江路 1517 弄",
          email: "183397156@qq.com",
          phone: 18753146877
        },
        {
          create_time: "2016-05-04",
          username: "王四虎",
          address: "上海市普陀区金沙江路 1517 弄",
          email: "183397156@qq.com",
          phone: 18753146877
        },
        {
          create_time: "2016-05-01",
          username: "王大虎",
          address: "上海市普陀区金沙江路 1517 弄",
          email: "183397156@qq.com",
          phone: 18753146877
        }
      ]
    };
  },
  methods: {
    //   编辑用户
    handleEdit(index, row) {
      console.log(index, row);
    },
    // 删除用户
    handleDelete(index, row) {
      console.log(index, row);
    },
    /**
     * @func
     * @desc    设置选中的行
     * @param {}
     * @return {}
     */
    // toggleSelection(rows) {
    //   console.log("toggleSelection");
    //   if (rows) {
    //     //   选中要选择的项
    //     rows.forEach(row => {
    //       this.$refs.multipleTable.toggleRowSelection(row);
    //     });
    //   } else {
    //     //   清除选中项
    //     this.$refs.multipleTable.clearSelection();
    //   }
    // },
    handleSelectionChange(val) {
      console.log("handleSelectionChange");
      console.log(val);
      this.multipleSelection = val;
    }
  }
};
</script>

<style  scoped>
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
  margin-top: 60px;
}
</style>
