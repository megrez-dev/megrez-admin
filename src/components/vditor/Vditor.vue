<template>
  <div id="app"></div>
</template>

<script>
import Vue from "vue";
import Vditor from "vditor";

new Vue({
  el: "#app",
  data() {
    return {
      contentEditor: "",
    };
  },
  mounted() {
    this.contentEditor = new Vditor("vditor", {
      height: 360,
      toolbarConfig: {
        pin: true,
      },
      cache: {
        enable: false,
      },
      after: () => {
        this.contentEditor.setValue("hello, Vditor + Vue!");
      },
    });
  },
});
</script>

<style></style>
