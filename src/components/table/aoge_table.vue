<template>
  <div class="swdTable">
    <div class="table">
      <el-table
        ref="multipleTable"
        :data="tableData1"
        tooltip-effect="dark"
        style="width: 100%;"
        @select="handleSelect"
        :height="maxHeight"
        :header-cell-style="{
          'background-color': '#fafafa',
          'border-top': '1px solid #E9EAF2',
        }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" v-if="table.select">
        </el-table-column>
        <el-table-column
          :label="$t('localization.SerialNo')"
          width="60"
          type="index"
          align="center"
          v-if="table.type"
        >
        </el-table-column>
        <el-table-column
          v-for="(col, index) in tableLabel"
          :fixed="col.fixed"
          :label="col.title"
          :width="col.width"
          :sortable="col.sort"
          :formatter="col.formatter"
          :min-width="col.minWidth"
          :max-width="col.maxWidth"
          :show-overflow-tooltip="col.ellipsis"
          :align="col.align"
          :key="index"
        >
          <template slot-scope="scope">
            <slot v-if="col.slot" :name="col.prop" :row="scope.row" />
            <span v-else>{{ scope.row[col.prop] }}</span>
          </template>
        </el-table-column>
        <el-table-column align="right" width="14">
          <template slot="header">
            <img
              class="more"
              v-if="more"
              @click="goMore"
              src="@/assets/images/more.png"
              alt="more"
            />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page" v-if="total > 0">
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          layout="total, prev, pager, next, slot"
          :total="total"
          :hide-on-single-page="true"
          :page-size="pageSize"
        >
          <div class="handlePage clearfix">
            <div class="fl handlePage_l">{{ $t("localization.To") }}</div>
            <div class="shuru fl">
              <el-input
                v-model="currentPage1"
                class="pageInput"
                oninput="value=value.replace(/\D/g,'')"
              ></el-input>
            </div>
            <div class="fl handlePage_r">{{ $t("localization.Page") }}</div>
            <div class="button pointer fl" @click="goPage">Go</div>
          </div>
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    table: {
      type: Object,
    },
    tableLabel: {
      type: Array,
    },
    tableData: {
      type: Array,
    },
    total: {
      type: Number,
    },
    pageSize: {
      type: Number,
      default: 15,
    },
    maxHeight: {
      type: Number,
    },
    more: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      tableData1: [],
      currentPage: 1,
      currentPage1: null,
      isShow: true,
      loading: true,
      tableLabel1: [],
    };
  },
  watch: {
    tableData: {
      //监听数据变化
      handler(newVal, oldVal) {
        this.tableData1 = this.tableData;
      },
      deep: true,
    },
    total(newValue, oldValue) {
      this.total = newValue;
    },
    tableLabel: {
      //监听数据变化
      handler(newVal, oldVal) {},
      deep: true,
    },
    table: {
      handler(newVal, oldVal) {
        this.table = newVal;
      },
      immediate: true,
      deep: true,
    },
  },
  created() {
    var that = this;
    setTimeout(() => {
      that.tableData1 = that.tableData;
    }, 0);
  },
  methods: {
    handleSelectionChange(val) {
      this.$emit("handleSelectionChange", {
        multipleSelection: val,
      });
    },
    toggleSelection(row, select) {
      this.$refs.multipleTable.toggleRowSelection(row, select);
    },
    handleSelect(selections, row) {
      this.$emit("select", selections, row);
    },
    handleSizeChange(val) {},
    handleCurrentChange(obj) {
      this.$emit("handleCurrentChange", obj);
    },
    goPage(val) {
      if (this.currentPage1) {
        this.currentPage = this.currentPage1 * 1;
        this.$emit("goCurrentPage", {
          multipleSelection: this.currentPage1 * 1,
        });
      }
    },
    //点击更多
    goMore() {
      this.$emit("more");
    },
    goMouserOver(type) {
      if (type == true) {
        //this.isShow = true;
      }
    },
    goMouserOut(type) {
      if (type == true) {
        //this.isShow = false;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.swdTable {
  width: 100%;
  /deep/.table {
    width: 100%;
    position: relative;
    .el-table th > .cell:last-child {
      //padding-left:0px;
      padding-right: 0px;
    }
    .more {
      position: relative;
      right: 18px;
      cursor: pointer;
    }
    .el-table__empty-block {
      min-height: 42px;
    }
    .el-dropdown-menu {
      background-color: blue;
    }
    .el-table__empty-block .el-table__empty-text {
      height: 42px;
      line-height: 42px;
      padding: 0 !important;
    }
    .cell span {
      font-size: 12px;
    }
    tr {
      .cell {
        div {
          font-size: 12px;
        }
      }
    }
    th {
      padding: 0 !important;
      height: 42px;
      line-height: 42px;
      .cell {
        font-size: 12px;
      }
    }
    td {
      padding: 0 !important;
      height: 42px;
      line-height: 42px;
    }
  }
}
.page {
  margin-top: 20px;
  width: 100%;
  height: 35px;
  position: relative;
  .pagination {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    /deep/.handlePage {
      position: absolute;
      right: -162px;
      top: 0;
      .is-background {
        background-color: blue;
      }
      .handlePage_l,
      .handlePage_r {
        font-size: 12px;
        color: #303133;
        line-height: 28px;
        margin: 0 10px;
      }
      .shuru {
        font-size: 12px;
        color: #303133;
        line-height: 28px;
        .el-input__inner {
          width: 28px;
          height: 28px;
          padding: 0 2px;
        }
      }
      .button {
        line-height: 26px;
        width: 40px;
        height: 26px;
        border: 1px solid #dedede;
        border-radius: 2px;
        text-align: center;
        font-size: 12px;
        &:hover {
          color: #409eff;
        }
      }
    }
  }
}
.launched {
  width: 14px;
  height: 14px;
  background: rgba(103, 194, 58, 1);
  border-radius: 50%;
  display: block;
}
.soldOut {
  width: 14px;
  height: 14px;
  background: rgba(147, 147, 147, 1);
  border-radius: 50%;
  display: block;
}
</style>
