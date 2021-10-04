<template>
    <div class="container">
        <h3>Create approved Order</h3>
        <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-form-model-item label="Order ID">
                <a-input v-model="form.order_id" />
            </a-form-model-item>
            <a-form-model-item label="Requisition ID">
                <a-input v-model="form.requisition_id" :disabled="disabled"/>
            </a-form-model-item>
            <a-form-model-item label="Good Type">
                <a-select v-model="form.region" placeholder="please select your zone" :disabled="disabled">
                    <a-select-option value="shanghai">
                    Zone one
                    </a-select-option>
                    <a-select-option value="beijing">
                    Zone two
                    </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item label="Quantity">
                <a-input-number id="inputNumber" v-model="form.quantity" :min="1" :max="100" />
            </a-form-model-item>
            <a-form-model-item label="Estimated Budget">
                <a-input suffix="LKR" v-model="form.amount" />
            </a-form-model-item>
            <a-form-model-item label="Supplier">
                <a-select v-model="form.supplier_id" placeholder="please select your zone">
                    <a-select-option value="shanghai">
                    Zone one
                    </a-select-option>
                    <a-select-option value="beijing">
                    Zone two
                    </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item label="Order Delivery Address">
                <a-input v-model="form.delivery_address" />
            </a-form-model-item>
            <a-form-model-item label="Date created">
                <a-date-picker v-model="form.date_created" ></a-date-picker>
            </a-form-model-item>
            <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
                <a-button type="primary" @click="onSubmit">
                    Create
                </a-button>
                <a-button style="margin-left: 10px;" @click="cancel">
                    Cancel
                </a-button>
            </a-form-model-item>
        </a-form-model>
    </div>
</template>
<script>
export default {
  data() {
    return {
      disabled: true,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        order_id: '',
        requisition_id: '',
        good_type: '',
        quantity: '',
        amount: '',
        site_name: '', 
        supplier_id: '',
        delivery_address: '',
        date_created: '',
      },
    };
  },
  methods: {
    onSubmit() {
        console.log('submit!', this.form);
        //POST form data into DB
        this.$http.post('http://127.0.0.1:8001/api/staff/order/insert/', this.form).then(function (response){
            this.openNotificationSuccess("Order added successfully!", "Entry added");
            console.log(response);
        }, (error)=> {
            this.openNotificationUnSuccess("order insert unsuccessful","Entry was not added");
            console.log(error);
        });
    },
    cancel() {
        this.$router.push({path: '/manage_requisitions/approved'});
    },

    openNotificationSuccess(message, description) {
      /**
       * Notification toast success
       */
      this.$notification.open({
        message: message,
        duration: 5,
        icon: <a-icon type="like" theme="filled" style="color: #27ae60"/>,
        description:
          description,
        onClick: () => {
          console.log('Notification Clicked!');
        },
      });
      // this.clearForm();
    },
    openNotificationUnsuccess(message, description) {
      /**
       * Notification toast unsuccess
       */
      this.$notification.open({
        message: message,
        duration: 8,
        icon: <a-icon type="dislike" theme="filled" style="color: #c0392b"/>,
        description:
          description,
        onClick: () => {
          console.log('Notification Clicked!');
        },
      });
    },
  },
  //this created method will retrieve the data belongs to the selected Nurse & autofill the form with those data
  created(){
      console.log("model.id: " + this.$route.params.id);
      this.$http.get('http://127.0.0.1:8001/api/staff/requisitions/get/'+this.$route.params.id).then(function(response){
          this.form = response.data.result;
          console.log(response.data.result);
      });
  },
};
</script>
