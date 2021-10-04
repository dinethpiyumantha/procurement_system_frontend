<template>
  <div>
      <h2>Register</h2>
      <a-row>
        <a-col :span="18">
            <a-form-model ref="ruleForm" :model="form" :label-col="{span:6}" :wrapper-col="{span: 12}" :rules="rules">
                <a-form-model-item label="Employee ID" ref="employee_id" prop="employee_id">
                    <a-input v-model="form.employee_id" placeholder="Employee ID" :disabled="false"/>
                </a-form-model-item>

                <a-form-model-item label="Agreement ID" ref="agreement_id" prop="agreement_id">
                    <a-input v-model="form.agreement_id" :disabled="false"/>
                </a-form-model-item>

                <a-form-model-item label="Name" ref="name" prop="name">
                    <a-input v-model="form.name" :disabled="false"/>
                </a-form-model-item>

                <a-form-model-item label="Phone Number" has-feedback ref="phone_no" prop="phone_no">
                    <a-input v-model="form.phone_no">
                    <a-tooltip slot="suffix" title="Phone number can enter with contry code or without it">
                    <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
                    </a-tooltip>
                    </a-input>
                </a-form-model-item>

                <a-form-model-item label="Email Address" ref="email" prop="email">
                    <a-input v-model="form.email" :disabled="false"/>
                </a-form-model-item>

                <a-form-item label="Password" ref="password" prop="password">
                    <a-input-password v-model="form.password" placeholder="input password" />
                </a-form-item>

                <a-form-model-item label="Company Name" ref="company_name" prop="company_name">
                    <a-input v-model="form.company_name" :disabled="false"/>
                </a-form-model-item>

                <a-form-model-item label="Product Type" ref="product_type" prop="product_type">
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

let SLPhoneValidator = (rule, value, callback) => {
    const regex = /^(?:0|94|\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|912)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\d)\d{6}$/;
    let result = regex.test(value);
    if (!result) {
    callback(new Error('Please input valid phone number again'));
    } else if (value === ''){
    callback();
    } else {
    callback();
    }
}

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
            },
            rules: {
                employee_id: [{required: true, message: 'Please insert Employee ID',trigger: 'blur',},],
                agreement_id: [{required: true, message: 'Please insert Agreement ID',trigger: 'blur',},],
                phone_no: [{validator: SLPhoneValidator,trigger: 'change',}],
                email: [{type: 'email', message: 'The input is not valid E-mail!',trigger: 'blur',},
                        {required: true, message: 'Please input your E-mail!',trigger: 'blur',},],
                name: [{required: true, message: 'Please insert supplier name',trigger: 'blur',},],
                password: [{required: true, message: 'Please insert supplier name',trigger: 'blur',},],
                company_name: [{required: true, message: 'Please insert company name',trigger: 'blur',},],
                product_type: [{required: true, message: 'Please insert product type',trigger: 'blur',},],
            },
        }
    },
    
    methods : {
        submitForm() {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    this.$http.post(WebConstants.server.adderss + WebConstants.api.supplier.register, this.form).then(function (response) { 
                        console.log(response);
                        this.notification('success', 'Supplier Registered', 'Supllier ID ' + response.body.supplier.id);
                        this.clearForm();
                    }, (error) => {
                        console.log(error);
                        this.notification('unsuccess', 'Supplier Not Registered', 'Server error! ' + error.status + " " + error.statusText)
                    });
                } else {
                    console.log('error submit!!');
                    this.notification('unsuccess', 'Enter Valid Informations', 'Fill All Required Fealds With Valid Data')
                    return false;
                }
            });
        },
        clearForm() {
            Object.assign(this.$data, this.$options.data.call(this));
        },
        notification(type, message, description) {
            if(type === 'success') {
                this.$notification.open({
                    message: message,
                    duration: 8,
                    icon: <a-icon type="like" theme="filled" style="color: #27ae60"/>,
                    description: description,
                    onClick: () => {
                        console.log('Notification success');
                    },
                });
            } else {
                this.$notification.open({
                    message: message,
                    duration: 8,
                    icon: <a-icon type="dislike" theme="filled" style="color: #c0392b"/>,
                    description: description,
                    onClick: () => {
                        console.log('Notification unsuccess');
                    },
                });
            }
        }
    }
}
</script>

<style>

</style>