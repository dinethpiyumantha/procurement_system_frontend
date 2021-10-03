<template>
  <div>
    <!-- Table View -->
    <a-table
      :columns="columns"
      :data-source="data"
      @change="onChange"
      style="padding: 0px"
      :customRow="customRow"
    >
        <span slot="action" slot-scope="record">
            <span v-if="!record.supplier_approval">
                <a-button type="primary" size="small" style="margin: 2px" @click="orderApprovement(record.id, 'approved')">Approve</a-button>
                <a-button type="danger" size="small" style="margin: 2px" @click="orderApprovement(record.id, 'rejected')">Reject</a-button>
            </span>

            <span v-if="record.supplier_approval">
                <a-tag :color="record.supplier_approval.toLowerCase() == 'approved' ? 'green' : 'red'">{{record.supplier_approval.toUpperCase()}}</a-tag>
            </span>
        </span>
    </a-table>
  </div>
</template>

<script>
import axios from "axios";

import WebConstants from '../../constants.json';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    sorter: (a, b) => {
    let A = a.id.toUpperCase();
    let B = b.id.toUpperCase();
    if (A < B) {
        return -1;
    }
    if (A > B) {
        return 1;
    }
        return 0;
    },
    sortDirections: ["descend", "ascend"],
  },
  {
    title: 'Date',
    dataIndex: 'created_at',
    sorter: (a, b) => {
        let A = a.created_at.toUpperCase();
        let B = b.created_at.toUpperCase();
        if (A < B) {
            return -1;
        }
        if (A > B) {
            return 1;
        }
        return 0;
    },
    sortDirections: ["descend", "ascend"],
  },
  {
      title: 'Site Name',
      dataIndex: 'site_name',
      key: 'site_name',
      sorter: (a, b) => {
      let A = a.site_name.toUpperCase();
      let B = b.site_name.toUpperCase();
      if (A < B) {
        return -1;
      }
      if (A > B) {
        return 1;
      }
      return 0;
    },
    sortDirections: ["descend", "ascend"],
  },
  {
      title: 'Quantity',
      dataIndex: 'quantity'
  },
  {
      title: 'Payment',
      dataIndex: 'payment_status'
  },
  {
      title: 'Delivery Date',
      dataIndex: 'delivery_date'
  },
  {
    title: "Approval",
    key: "supplier_approval",
    fixed: "right",
    width: 100,
    scopedSlots: { customRender: "action" },
  }
];

export default {
    data() {
        return {
            WebConstants,
            columns,
            data : ''
        }
    },
    created() {
        axios.get(WebConstants.server.adderss + WebConstants.api.supplier.getOrdersById + this.$route.params.id).then((response) => {
            console.log(WebConstants.server.adderss + WebConstants.api.supplier.getOrdersById + this.$route.params.id);
            this.data = response.data.orders;
            console.log(this.data);
        });
    },
    methods: {
        orderApprovement(id, approvement) {
            console.log(WebConstants.server.adderss + WebConstants.api.supplier.orderApproveBySupplier + id);
            this.$http.put(WebConstants.server.adderss + WebConstants.api.supplier.orderApproveBySupplier + id, { 'supplier_approval' : approvement}).then(function (response) { 
                console.log(response);
              }, (error) => {
                console.log(error);
              });
        }
    }
}
</script>

<style>

</style>