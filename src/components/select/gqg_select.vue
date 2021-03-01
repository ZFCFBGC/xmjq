<template>
  <div
    :class="[
      'select-wrapper',
      className ? className : 'select-wrapper-bor',
      show && 'selector-show',
      disabled && 'selector-disabled',
    ]"
    @click.stop="toggleSelectorShow"
    :style="{ width }"
    ref="selector"
  >
    <div class="current-value">{{ showLabel }}</div>
    <i :class="['select-arrow', show && 'selector-show-arrow']" />
    <ul
      :class="[
        'select-list',
        show && 'select-list-show',
        limitMaxHeight && 'limitMaxHeight',
      ]"
      :style="{ maxHeight: limitMaxHeight ? maxHeight : '' }"
    >
      <li
        v-for="(item, $idx) in options"
        :key="$idx"
        :class="[current === $idx && 'select-active-item']"
        @click.stop="setSelectItem(item[valueName], item, $idx)"
      >
        {{ item[labelName] }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "selector",
  props: {
    // 初始值
    value: {
      type: String,
      default: "",
    },
    // 列表项
    options: {
      type: Array,
      default: () => [],
    },
    // 列表项 标签名 默认为 label
    labelName: {
      type: String,
      default: "label",
    },
    // 列表项 值名 默认为 value
    valueName: {
      type: String,
      default: "value",
    },
    // 默认宽度
    width: {
      type: String,
      default: "180px",
    },
    // 提示占位符
    placeholder: {
      type: String,
      default: "请选择",
    },
    // 最多可以展示的列表项
    maxItemAccount: {
      type: Number,
      default: 5,
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    //增加类名
    className: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      show: false,
      current: -1,
    };
  },
  model: {
    prop: "value",
    event: "update",
  },
  computed: {
    showLabel() {
      const { current, options, labelName, placeholder } = this;
      if (current == -1) {
        return placeholder;
      } else {
        return options[current][labelName];
      }
    },
    // 是否开启选项列表高度限制
    limitMaxHeight() {
      return this.maxItemAccount > 0 || this.options.length > 5;
    },
    // 最多可以展示的列表项高度
    maxHeight() {
      return this.maxItemAccount * 32 + "px";
    },
  },
  watch: {
    value() {
      const { value, options, valueName } = this;
      if (value === "" || !options || !options.length) {
        return (this.current = -1);
      }
      this.current = options.findIndex((item) => item[valueName] === value);
    },
  },
  methods: {
    // 切换下拉选择框显隐
    toggleSelectorShow() {
      if (this.disabled) {
        return;
      }
      this.show = !this.show;
    },
    // 设定当前显示项
    setSelectItem(value, item, index) {
      if (this.disabled) {
        return;
      }
      this.current = index;
      this.toggleSelectorShow();
      this.$emit("change", value, item, index);
    },
    // 模态框点击事件
    handleSelectorClose(e) {
      if (this.show && !this.$refs.selector.contains(e.target)) {
        this.show = false;
      }
    },
    // 注册监听全局点击事件, 点击本元素之外的区域关闭选择器
    initialGlobalClickListener() {
      // 点击本元素之外的区域关闭菜单
      document.addEventListener("click", this.handleSelectorClose);
      this.$on("hook:destroyed", () => {
        document.removeEventListener("click", this.handleSelectorClose);
      });
    },
  },
  created() {
    const { value, options, valueName } = this;
    console.log("value:", value);
    if (value === "" || !options || !options.length) {
      return (this.current = -1);
    }
    this.current = options.findIndex((item) => item[valueName] === value);
    this.$nextTick(this.initialGlobalClickListener);
  },
};
</script>

<style lang="less" scoped>
.selector-show {
  border-color: #409eff !important;
}
.selector-disabled {
  cursor: not-allowed !important;
  background-color: #fafafa !important;
}
.selector-show-arrow {
  transform: rotate(-180deg);
}
.selector-box-shadow {
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.095);
}
.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.select-active-item {
  color: #409eff !important;
}
.limitMaxHeight {
  overflow: auto !important;
}
.LoginSelect {
  border: none;
  .current-value {
    text-indent: 15px;
    color: #666666;
  }
}
.select-wrapper-bor {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  .current-value {
    text-indent: 15px;
    color: #3d3f3d;
  }
  &:hover {
    border-color: #c0c4cc;
    .selector-box-shadow;
  }
}
.select-wrapper {
  position: relative;
  display: inline-block;
  width: 190px;
  height: 32px;
  line-height: 32px;

  background-color: #fff;
  transition: border 0.4s;
  border-radius: 2px;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;

  .select-arrow {
    position: absolute;
    top: 13px;
    right: 14px;
    content: "";
    width: 0;
    border-width: 6px;
    border-style: solid;
    border-color: #999c99 transparent transparent transparent;
    transition: all 0.3s;
    transform-origin: 50% 25%;
  }
  .current-value {
    width: 85%;
    height: 32px;
    line-height: 32px;
    text-align: left;
    font-size: 14px;

    .text-ellipsis;
    user-select: none;
  }
  .select-list {
    position: absolute;
    top: 38px;
    list-style: none;
    width: 100%;
    border: none;
    height: 0;
    .selector-box-shadow;
    overflow: hidden;
    transition: height 0.2s;
    & > li {
      padding: 0 8px;
      font-size: 14px;
      color: #3d3f3d;
      box-sizing: border-box;
      background-color: #fff;
      .text-ellipsis;
      &:hover {
        background-color: #dedede;
      }
    }
  }
  .select-list-show {
    z-index: 10;
    height: auto;
    border: 1px solid #dedede;
  }
}
</style>
