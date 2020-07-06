<template>
  <div class="cgo-properties" :class="{'handle-left':handleLeft,'handle-right':handleRight}">
    <div class="handle left"></div>
    <div class="wrap">
      <div class="list floating-labels">
        <cgo-form-input id="f1" title="Field 1" :floating="true"></cgo-form-input>
        <cgo-form-input id="f2" title="Field 2" :floating="true" :type="'number'"></cgo-form-input>
        <cgo-form-input id="f3" title="Field 3" :floating="true"></cgo-form-input>
        <cgo-form-input id="f4" title="Field 4" :floating="true"></cgo-form-input>
        <cgo-form-input id="f5" title="Field 5" :floating="true"></cgo-form-input>
      </div>
    </div>
    <div class="handle right"></div>
  </div>
</template>

<script>
  import CgoFormInput from "./cgo-form-input";
  export default {
    name: "cgo-properties",
    components: {CgoFormInput},
    props: {
      handleLeft: {
        type: Boolean,
        default: false
      },
      handleRight: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="scss">
  @import "assets/scss/floating";

  .cgo-properties {
    width:100%;
    height:100%;
    overflow-y: hidden;
    overflow-x: hidden;
    .wrap {
      float: left;
      display:inline-block;
      overflow-y: scroll;
      overflow-x: hidden;
      width:100%;
      height:100%;
      .list {
        width:100%;
        min-height:100%;
        .form-group {
          padding-left: .25rem;
          border-bottom: 1px #aaaaaa;
          label {
            border:none;
          }
        }
        input {
          border: none;
          padding-left: 0;
          padding-right: 0;
        }
      }
    }
    .handle {
      height: 100%;
      float: left;
      width: 4px;
      background-color: #888888;
      display: none;
    }
    &.handle-left .handle.left {
      display: inline-block;
    }
    &.handle-left .handle.right {
      display: inline-block;
    }
    &.handle-left .wrap {
      width: calc(100% - 4px);
    }
    &.handle-right .wrap {
      width: calc(100% - 4px);
    }
    &.handle-left.handle-right .wrap {
      width: calc(100% - 8px);
    }
    input {
      width:100%;
    }
  }
</style>
