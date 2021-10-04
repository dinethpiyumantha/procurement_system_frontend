<template>
  <div>
      <a-form-model ref="ruleForm" :model="form" :label-col="{span:6}" :wrapper-col="{span:16}" :rules="rules">

          <a-form-item label="Order ID">
              <a-input v-model="order.order_id" disabled/>
          </a-form-item>

          <a-form-item label="Quantity" ref="quantity" prop="quantity">
              <a-input v-model="order.quantity"/>
          </a-form-item>

          <a-form-item label="Amount (LKR.)" ref="amount" prop="amount">
              <a-input v-model="order.amount"/>
          </a-form-item>

          <a-form-item label="Delivery Charge" ref="delivery_charge" prop="delivery_charge">
              <a-input v-model="order.delivery_charge"/>
          </a-form-item>

          <a-form-item label="Delivery Date">
              <a-date-picker @change="onChange" v-model="order.delivery_date"/>
          </a-form-item>

          <a-form-item>
              <a-button type="primary" size="large">Create Invoice</a-button>
          </a-form-item>
      </a-form-model>
  </div>
</template>

<script>
export default {
    props : {
        order : Object
    },
    data() {
        return {
            form : {
                id : this.order.id,
                order_id : this.order.order_id,
                requisition_id : this.order.requisition_id,
                quantity : this.order.quantity,
                amount : this.order.amount,
                delivery_charge : this.order.delivery_charge,
                site_name : this.order.site_name,
                supplier_id : this.order.site_name,
                delivery_address : this.order.delivery_charge,
                supplier_approval : this.order.delivery_address,
                payment_status : this.order.payment_status,
                delivery_date : this.order.delivery_date
            },
            rules: {
                quantity: [{required: true, message: 'Please insertQuantity',trigger: 'blur',},],
                amount: [{required: true, message: 'Please insert Amount',trigger: 'blur',},],
                delivery_charge: [{required: true, message: 'Please insert Delevery Charge',trigger: 'blur',},],
            },
        }
    },
    methods: {
        onChange(date, dateString) {
            console.log(date, dateString);
        },
    },
}
</script>

<style>

</style>