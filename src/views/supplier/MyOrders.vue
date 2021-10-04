<template>
  <div>
    <h2>My Orders</h2>
    <!-- Table View -->
    <a-table
      :columns="columns"
      :data-source="data"
      @change="onChange"
      style="padding: 0px"
      :customRow="customRow"
    >
        <span slot="approval" slot-scope="record">
            <span v-if="!record.supplier_approval">
                <a-tag color="orange">PENDING</a-tag>
            </span>

            <span v-if="record.supplier_approval">
                <a-tag :color="record.supplier_approval.toLowerCase() === 'approved' ? 'green' : 'red'">{{record.supplier_approval.toUpperCase()}}</a-tag>
            </span>
        </span>

        <span slot="action" slot-scope="record">
          <span v-if="!record.supplier_approval">
            <a-button type="primary" size="small" style="margin: 2px" @click="orderApprovement(record.id, 'approved')">Approve</a-button>
            <a-button type="danger" size="small" style="margin: 2px" @click="orderApprovement(record.id, 'rejected')">Reject</a-button>
          </span>

          <span v-if="record.supplier_approval">
            <a-button v-if="record.supplier_approval.toLowerCase() == 'approved'" @click="createInvoice(record)">Create Invoice</a-button>
            <p v-if="record.supplier_approval.toLowerCase() == 'rejected'">No Action</p>
          </span>
        </span>
    </a-table>

    <a-modal v-model="modalVisibility" :centered="true" title="Create Invoice">
      <order-invoice :order="model"/>
    </a-modal>
  </div>
</template>

<script>
import axios from "axios";

import WebConstants from '../../constants.json';
import OrderInvoice from './OrderInvoice.vue';

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
    scopedSlots: { customRender: "approval" },
  },
  {
    title: "Action",
    scopedSlots: { customRender: "action" },
  }
];

export default {
    data() {
        return {
          WebConstants,
          columns,
          data : '',
          modalVisibility: false,
          model: ''
        }
    },
    components: {
      OrderInvoice
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

                let i = this.data.findIndex((object => object.id == id));
                this.data[i].supplier_approval = approvement;

                console.log(response);
              }, (error) => {
                console.log(error);
              });
        },
        showModel() {
          this.modalVisibility = !this.modalVisibility;
        },
        createInvoice(record) {
          this.model = record;
          this.modalVisibility = true;
        }
    }
}
</script>

<style>

</style>