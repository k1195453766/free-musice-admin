<!--  -->
<template>
  <div class="nav-bar-phone">
    <el-col style="margin-top: 60px;background:#545c64;" :xs="24">
      <el-collapse-transition>
        <div v-show="show3">
          <!-- <div class="transition-box">el-collapse-transition</div>
          <div class="transition-box">el-collapse-transition</div>-->
          <div v-for="(item,index) in routes" :key="index" class="transition-box">
            <template v-if="!item.meta.hidden">
              <!-- 当前路由有子路由的 -->
              <div
                v-if="item.children&&item.children.length>0"
                class="transition-box"
                :style="{background:item.path==getRoute?'white':'#545c64'}"
              >
                <div :to="item.path" class="sidebar-logo-link">
                  <!-- <template slot="title">
                    <i class="el-icon-user"></i>
                    <span>{{item.meta.title}}</span>
                  </template>-->
                  <div v-for="(child ,key) in item.children" :key="key">
                    <div @click="onPressItem(child.path)" v-if="!child.meta.hidden">
                      <span v-if="child.meta.affix" :to="child.path">{{child.meta.title}}</span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 当前路由没有子路由 -->
              <div
                v-else
                class="transition-box"
                :style="[{background:getRoute==item.path?'white':'#545c64'}]"
              >
                <div @click="onPressItem(item.path)" v-if="item.meta.affix">
                  <span class="sidebar-logo-link" :to="item.path">
                    <!-- <i class="el-icon-user"></i> -->
                    {{item.meta.title}}
                  </span>
                </div>
              </div>
            </template>
          </div>
        </div>
      </el-collapse-transition>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "NavBarPhone",
  props: {
    isCollapsePhone: Boolean,
    show3: Boolean,
  },
  data() {
    return {
      routes: JSON.parse(window.sessionStorage.getItem("routes")),
    };
  },
  created() {
    console.log("当前路由-phone", this.$route);
    console.log(
      "所有路由",
      JSON.parse(window.sessionStorage.getItem("routes"))
    );
  },
  computed: {
    getRoute() {
      return this.$route.path == "/layout" ? "/welcome" : this.$route.path;
    },
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 点击路由跳转，并收起菜单
    onPressItem(path) {
      this.$router.push({ path: path });
      this.$emit("closeCollapsePhone");
    },
  },
};
</script>

<style  scoped>
.nav-bar-phone {
  width: 100%;
}
.el-menu-vertical-demo {
  z-index: -9;
  height: 60px;
  margin-top: 60px;
}
a {
  text-decoration: none;
}
</style>
