<template>
  <div>
      <a-row>
        <a-col :span="12">
            <a-form-model ref="ruleForm" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules">
                <a-form-model-item label="Employee ID">
                    <a-input v-model="form.employee_id" placeholder="Employee ID" :disabled="false"/>
                </a-form-model-item>

                <a-form-model-item label="Agreement ID">
                    <a-input v-model="form.agreement_id" :disabled="false"/>
                </a-form-model-item>

                <a-form-model-item label="Name">
                    <a-input v-model="form.name" :disabled="false"/>
                </a-form-model-item>

                <a-form-model-item label="Phone Number" has-feedback ref="phone" prop="phone">
                    <a-input v-model="form.phone_no">
                    <a-tooltip slot="suffix" title="Phone number can enter with contry code or without it">
                    <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
                    </a-tooltip>
                    </a-input>
                </a-form-model-item>

                <a-form-model-item label="Email Address">
                    <a-input v-model="form.email" :disabled="false"/>
                </a-form-model-item>

                <a-form-item label="Password">
                    <a-input-password v-model="form.password" placeholder="input password" />
                </a-form-item>

                <a-form-model-item label="Company Name">
                    <a-input v-model="form.company_name" :disabled="false"/>
                </a-form-model-item>

                <a-form-model-item label="Product Type">
                    <a-input v-model="form.product_type" :disabled="false"/>
                </a-form-model-item>

                <a-form-model-item :wrapper-col="{ span: 14 }">
                    <a-button type="primary" @click="submitForm()">
                        Register
                    </a-button>
                    <a-button style="margin-left: 10px;" @click="clearForm()">
                        Clear
                    </a-button>
                </a-form-model-item>
            </a-form-model>
        </a-col>
      </a-row>
  </div>
</template>

<script>
import WebConstants from '../../constants.json';

export default {
    data() {
        return {
            form : {
                employee_id : '',
                agreement_id : '',
                phone_no : '',
                email : '',
                name : '',
                password: '',
                person_type : 'supplier', 
                company_name : '',
                product_type : ''
            }
        }
    },
    methods : {
        submitForm() {
            this.$http.post(WebConstants.server.adderss + WebConstants.api.supplier.register, this.form).then(function (response) { 
            console.log(response);
          }, (error) => {
            console.log(error);
          });
        },
        clearForm() {
            Object.assign(this.$data, this.$options.data.call(this));
        },
    }
}
</script>

<style>

</style>