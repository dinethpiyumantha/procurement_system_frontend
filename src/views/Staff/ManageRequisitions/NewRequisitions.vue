<template>
  <div class="container">
    <!--page header-->
    <h2>New Requisitions</h2>
    <h3 style="color: #888; line-height: 10px">{{ new Date() | moment("dddd, MMMM Do YYYY") }}</h3>

    <!--search and filter options-->
    <div class="row px-3 my-4">
        <!--search bar-->
        <a-input-search 
            placeholder="Search nurse by name" 
            style="margin: 20px 0px;"
            size="large"
            v-model="search" 
            @search="onSearch" 
        />
    </div>

    <!--table structure-->
    <a-table
        :columns="columns"
        :data-source="requiData"
        :loading="loading"
        @change="handleTableChange"
        style="padding: 0px"
        :customRow = "customRow" 
        :key="requisition_id"
    >

        <a-button class="approval_button" slot="action" type="primary" size="small"  >Approve / Reject</a-button>
        <!-- <span style="padding-left: 10px">
            <a-button slot="action2" type="danger" size="small" @click="rejectRequisition">Reject</a-button>
        </span> -->
    </a-table>

        <!--when 1 row selected-> Model view including it's title-->
    <div>
        <a-modal v-model="visible" :title="'Requisition - '+ model.requisition_id" on-ok="handleOk">
            <!--model view content-->
            <div class="row"><div class="col-3"><b>Requisitions ID: </b></div><div class="col-9"><p>{{model.requisition_id}}</p></div></div>
            <div class="row"><div class="col-4"><b>Good Type: </b></div><div class="col-8"><p>{{model.good_type}}</p></div></div>
            <div class="row"><div class="col-4"><b>Quantity: </b></div><div class="col-8"><p>{{model.quantity}}</p></div></div>
            <div class="row"><div class="col-4"><b>Estimated Budget: </b></div><div class="col-8"><p>{{model.estimated_budget}}</p></div></div>
            <div class="row"><div class="col-4"><b>Construction Site: </b></div><div class="col-8"><p>{{model.site_name}}</p></div></div>
            <!-- <div class="row"><b>Requisitions ID: </b><span style="margin-left: 25px;">{{model.requisition_id}}</span></div><br>
            <div class="row"><b>Good Type: </b><span style="margin-left: 25px;">{{model.good_type}}</span></div>
            <div class="row"><b>Quantity: </b><span style="margin-left: 25px;">{{model.quantity}}</span></div>
            <div class="row"><b>Estimated Budget: </b><span style="margin-left: 25px;">{{model.estimated_budget}}</span></div>
            <div class="row"><b>Construction Site: </b><span style="margin-left: 25px;">{{model.site_name}}</span></div>
            <div class="row"><b>Construction Site: </b><span style="margin-left: 25px;">{{model.site_name}}</span></div> -->
       
            <!--model view footer-->  
            <template slot="footer">

                <!-- Approve button -->
                <a-button slot="action" type="primary" size="large" @click="approveRequisition">Approve </a-button>
                <!-- Reject button -->
                <a-button slot="action" style="margin-left: 10px;" type="danger" size="large" @click="rejectRequisition"> Reject</a-button>

                <!--cancel button-->
                <a-button key="back" @click="handleCancel">Cancel</a-button>
            </template>
        </a-modal>
    </div>


  </div>
</template>

<script>
    //import libraries used to catch the JSON type data which are retrieved from the backend
    import axios from "axios";
    import 'vue-resource';
    //import local data files ?????

    //get all column fields with their Sort & filter options into one Const Array variable (Title: frontend columnName, dataIndex: DB columnName)
    const columns = [
        {
            title: 'Requisition ID',
            dataIndex: 'requisition_id',
        },
        // {
        //     title: 'Date',
        //     dataIndex: 'date',
        // },
        {
            title: 'Good_Type',
            dataIndex: 'good_type',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
        },
        {
            title: 'Estimated_Budget',
            dataIndex: 'estimated_budget',
        },
        {
            title: 'Construction_Site',
            dataIndex: 'site_name',
        },
        {
            title: "Actions",
            key: "id",
            fixed: "right",
            width: 220,
            scopedSlots: { customRender: "action" },
        },
        // {
        //     title: "",
        //     key: "id",
        //     fixed: "right",
        //     width: 100,
        //     scopedSlots: { customRender: "action2" },
        // },
    ];

    export default {
        data() {
            
            return {
                //return requiData[] array which contains backend data
                requiData: [],
                // requiData: {
                //     requisition_id: '',
                //     // date: '',
                //     good_type: '',
                //     quantity: '',
                //     estimated_budget: '',
                //     site_name: '',
                // },

                buttonWidth: 70,
                pagination: { },
                loading: false, //this is a must 
                visible: false, //this is a must
                //return column variable
                columns,
                //return the values to v-model attributes that we've set in Search, Filter functions
                search: '',
                good_type: '', 
                quantity: '',
                site_name: '',
                //return model object(which contains all DB retrieved data as an obj)
                model: { 
                    requisition_id: '',
                    // date: '',
                    good_type: '',
                    quantity: '',
                    estimated_budget: '',
                    site_name: '',
                } //**this model is useful when displaying DB retrieved data in our Modal windows */
            }
        },
        created(){
            /**
             * get all nurse details from the Backend and store in the data array
             * using API request
             */
            console.log("inside created method");
            axios.get("http://127.0.0.1:8001/api/staff/requisitions/get/pending").then((response) => {
                    this.requiData = response.data.requisitions;
                    console.log("response: ");
                    console.log(response.data.requisitions);
                    console.log("requiData: ");
                    console.log(this.requiData);
                    // var status = response.status;
                    // if(status == 200 || status == "200"){
                    //     console.log("response: ");
                    //     console.log(response.data);
                    //     this.requiData = response.data;
                    //     console.log("requiData: ");
                    //     console.log(this.requiData);
                    // }
                    // else{
                    //     alert("not 200");
                    //     this.requiData = response.data
                    // }                           
                }
            );
        },
        methods: {
            //handleTableChange() method
            handleTableChange(pagination, filters, sorter) {
                console.log("params", pagination, filters, sorter);
            },
                        //show Modal view method
            showModal(){
                this.visible = true;
            },
            //what is handleOk() method ???? - this will be called when user click a row in the table
            handleOk() {
            this.loading = true;
            setTimeout(() => {
                this.visible = false;
                this.loading = false;
                }, 
                2000);
            },

            //handleCancel in modal window method
            handleCancel(){
                this.visible = false;
            },

            //customRow method
            customRow(recordObj){ //this is an in-built method which pass the record of clicked row in the table
                return{
                    //if user click on a particlular table row;
                    on: {
                        click: event => {
                            this.model = recordObj; //assign the data record of clicked row to this.model object
                            this.showModal();
                            console.log(event);
                        }
                    }
                }
            },

            //search function
            onSearch(value){
                console.log(value);
            },

            //update approval status when approved
            approveRequisition() {
                this.$confirm({
                    title: 'Are you sure to Approve the requisition - '+ this.model.requisition_id+ '?',
                    content: "Click 'No' cancel approval",
                    okText: 'Yes',
                    okType: 'danger',
                    cancelText: 'No',
                    onOk: () => {
                        this.$http.put("http://127.0.0.1:8001/api/staff/approve/" +this.model.id).then(
                            function(response){
                                //popup successful msg
                                this.openNotificationSuccess('Requisition Approved successfully', 'Requisition - '+ this.model.requisition_id +' Accepted.');
                                // setTimeout("location.reload(true);", 1000); //this will reload the page
                                this.requiData.splice((this.requiData.findIndex((e) => e === this.model)), 1);
                                console.log(response);                             
                            }, (error) => {
                                this.openNotificationUnsuccess('Error', 'Requisition'+ this.model.requisition_id +' requisition approval failed. Operation occured an error !');
                                console.log(error);
                                // alert("appproval unsuccesfful");
                            }
                        );
                    },
                    onCancel() {
                    console.log('Cancel');
                    },
                });
            },

            //update approval status when rejected
            rejectRequisition() {
                this.$confirm({
                    title: 'Are you sure to Reject the requisition - '+ this.model.requisition_id+ '?',
                    content: "Click 'No' to cancel",
                    okText: 'Yes',
                    okType: 'danger',
                    cancelText: 'No',
                    onOk: () => {
                        this.$http.put("http://127.0.0.1:8001/api/staff/reject/" +this.model.id).then(
                            function(response){
                                //popup successful msg
                                this.openNotificationSuccess('Requisition Rejected successfully', 'Reuisition - '+ this.model.requisition_id +' rejected.');
                                // setTimeout("location.reload(true);", 1000); //this will reload the page
                                this.requiData.splice((this.requiData.findIndex((e) => e === this.model)), 1);
                                console.log(response);                             
                            }, (error) => {
                                this.openNotificationUnsuccess('Error', 'Requisition'+ this.model.requisition_id +' Requisition reject Failed! . Operation occured an error !');
                                console.log(error);
                                // alert("rejecting was unsuccesfful");
                            }
                        );
                    },
                    onCancel() {
                    console.log('Cancel');
                    },
                });
            },

            //openNotificationSuccess() //for Delete function
            openNotificationSuccess(message, description) {
                /**
                 * Notification toast success
                 */
                this.$notification.open({
                    message: message,
                    duration: 5,
                    icon: <a-icon type="like" theme="filled" style="color: #27ae60"/>,
                    description:description,
                    onClick: () => {
                    console.log('Notification Clicked!');
                    },
                });
                // this.clearForm();
            },
            //openNotificationUnsuccess()
            openNotificationUnsuccess(message, description) {
                /**
                 * Notification toast unsuccess
                 */
                this.$notification.open({
                    message: message,
                    duration: 8,
                    icon: <a-icon type="dislike" theme="filled" style="color: #c0392b"/>,
                    description:description,
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                });
            },
            
        },
        computed: {
                searchResult: function(){
                    return this.requiData.filter((item) => {
                        //dropdown selcted value or the searched value will be matched with the respective data in DB table
                        // return (item.requisition_id.toLowerCase().match(this.requisition_id.toLowerCase())) &&(item.good_type.toLowerCase().match(this.good_type.toLowerCase())) && (item.estimated_budget.toLowerCase().match(this.estimated_budget.toLowerCase())) && (item.site_name.toLowerCase().match(this.site_name.toLowerCase()));
                        return (item.requisition_id.toLowerCase().match(this.requisition_id.toLowerCase())) &&(item.good_type.toLowerCase().match(this.good_type.toLowerCase())) && (item.estimated_budget.toLowerCase().match(this.estimated_budget.toLowerCase())) && (item.site_name.toLowerCase().match(this.site_name.toLowerCase()));
                    });
                }
            }

    }
</script>

<style scoped>
    /*styles for Tool tip*/
    .components-a-tooltip-demo-placement .ant-btn {
        width: 70px;
        text-align: center;
        padding: 0;
        margin-right: 8px;
        margin-bottom: 8px;
    }

    .container {
    background: #fff;
    padding: 20px;
    }

    .approval_button{
        background-color: white; 
        color: black; 
        border: 2px solid #f44336;
    }

    .approval_button:hover {
    background-color: #f44336;
    color: white;
    }
</style>