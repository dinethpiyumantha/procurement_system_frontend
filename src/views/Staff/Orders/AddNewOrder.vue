<template>
    <div class="container">
        <h3>Create approved Order</h3>
        <a-form-model ref="ruleForm" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules">
            <a-form-model-item label="Order ID" has-feedback prop="order_id">
                <a-input v-model="form.order_id" />
            </a-form-model-item>
            <a-form-model-item label="Requisition ID">
                <a-input v-model="form.requisition_id" :disabled="disabled"/>
            </a-form-model-item>
            <a-form-model-item label="Good Type">
                <a-input v-model="form.good_type" />
            </a-form-model-item>
            <a-form-model-item label="Quantity">
                <a-input-number id="inputNumber" v-model="form.quantity" :min="1" :max="100" />
            </a-form-model-item>
            <a-form-model-item label="Estimated Budget">
                <a-input suffix="LKR" v-model="form.amount" />
            </a-form-model-item>
            <a-form-model-item label="Supplier" has-feedback prop="supplier_id">
                <a-select v-model="form.supplier_id" placeholder="please select your zone">
                    <a-select-option v-for="suppliers in supplier_id" :key="suppliers">
                      {{ suppliers }}
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

// Import local data files
import LocalData from '../../../assets/data.json';

export default {
  data() {
    return {
      disabled: true,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      //assign json array data to suppliers
      supplier_id: LocalData.data.suppliers,
      form: {
        order_id: '',
        requisition_id: '',
        good_type: '',
        quantity: '',
        //estimated_budget: '',
        amount: '',
        site_name: '', 
        supplier_id: '',
        delivery_address: '',
        date_created: '',
      },
      rules: {
        order_id: [{required: true, message: 'Please insert Order ID',trigger: 'blur',},],
        supplier_id: [{required: true, message: 'Please select a Supplier',trigger: 'blur',}],
      },

    };
  },
  methods: {
    onSubmit() {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
              //POST form data into DB
              this.$http.post('http://127.0.0.1:8001/api/staff/order/insert', this.form).then(function (response){
                  console.log(response);

                  // update order_raised status in the requisition table
                  this.$http.put("http://127.0.0.1:8001/api/staff/raiseorder/" +this.form.requisition_id).then(function (response){
                    console.log("requi id:" + this.form.requisition_id);
                    console.log(response);
                  }, (error)=>{console.log(error);});

                  //display successful message
                  this.openNotificationSuccess("Order added successfully!", "Entry added");
                  // this.$router.push({path: '/approved_orders/list'});
                  this.loading = true;
                      setTimeout(() => {
                          this.visible = false;
                          this.loading = false;
                          this.$router.push({path: '/approved_orders/list'});
                      }, 2000);
              }, (error)=> {
                  this.openNotificationUnSuccess("order insert unsuccessful","Entry was not added");
                  console.log(error);
              });
          }else {//else means form validation is unsuccessful
          this.openNotificationUnsuccess("validation unsuccessful", "");
          console.log('error submit!!');
          return false;
        }
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
