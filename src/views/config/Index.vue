<!--  -->
<template>
  <div>
    <div class="container">
      <el-row>
        <el-button type="success" :loading="loading" @click="copySql">备份数据库</el-button>

        <el-button type="primary">
          <a
            href="http://sidama.sidama.work/router.php"
            target="_blank"
            rel="noopener noreferrer"
          >下载数据库到本地</a>
        </el-button>
      </el-row>
      <el-span>备注：</el-span>
      <el-span class="remarks">当前数据库每天晚上2点自动备份，手动备份仅作为备用，下载数据库到本地可实现在本地部署环境</el-span>

      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="date" label="日期" width="150"></el-table-column>
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="province" label="省份" width="120"></el-table-column>
        <el-table-column prop="city" label="市区" width="120"></el-table-column>
        <el-table-column prop="address" label="地址" width="300"></el-table-column>
        <el-table-column prop="zip" label="邮编" width="120"></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { copySql } from "@/utils/server";
export default {
  name: "Index",
  data() {
    return {
      loading: false, //备份数据库loading
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333,
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
      ],
    };
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    // 备份数据库
    copySql() {
      this.loading = true;
      copySql().then((res) => {
        if (res.status == 1) {
          this.loading == false;
          this.message({
            title: "数据库备份成功",
          });
        }
      });
    },
    downloadSql() {
      window.open("http://www.musicefree.com/router.php");
    },
  },
};
</script>

<style  scoped>
.container {
  width: 90%;
  height: 90%;
  margin: 0 auto;
  margin-top: 60px;
}
a {
  text-decoration: none;
  color: #fff;
}
.remarks {
  color: #999;
}
</style>
