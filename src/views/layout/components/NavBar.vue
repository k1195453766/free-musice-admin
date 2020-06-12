<!--  -->
<template>
  <div>
    <i class="el-icon-s-fold" @click="onCollapse()"></i>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {};
  },
  methods: {
    onCollapse() {
      this.$emit("updateCollapse");
    }
  }
};
</script>

<style>
.el-header i {
  font-size: 30px;
  line-height: 60px;
  position: absolute;
  left: 10px;
}
</style>

