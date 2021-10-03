<template>
  <div class="container">
    <!--page header-->
    <h3>New Requisitions</h3>
    <span>(Requisitions with pending approval)</span>

    <!--search and filter options-->
    <div class="row px-3 my-4">
        <!--search bar-->
        <a-input-search 
            placeholder="Search nurse by name" 
            style="width: 400px; margin: 0 10px 0 0"
            v-model="search" 
            @search="onSearch" 
        />
    </div>

    <!--table structure-->
    <a-table
        :columns="columns"
        :data-source="searchResult"
        :loading="loading"
        @change="handleTableChange"
        style="padding: 0px"
        :customRow = "customRow" 
    >
        <!--Approve button-->
        <!-- <a-button slot="action" type="primary" @click="approveRequisition"> </a-button>-->
        <!--Reject button-->
        <!-- <a-button slot="action" type="primary" @click="rejectRequisition"> </a-button> -->

        <span>
            <a-button slot="action" type="primary" size="small" @click="approveRequisition" >Approve</a-button>
        </span>
        <!-- <span style="padding-left: 10px">
            <a-button slot="action2" type="danger" size="small" @click="rejectRequisition">Reject</a-button>
        </span> -->
    </a-table>

        <!--when 1 row selected-> Model view including it's title-->
    <div>
        <a-modal v-model="visible" :title="'Requisition - '+ model.name" on-ok="handleOk">
            <!--model view content-->
            <div class="row"><div class="col-4"><b>requisition_id: </b></div><div class="col-8"><p>{{model.requisition_id}}</p></div></div>
            <div class="row"><div class="col-4"><b>good_type: </b></div><div class="col-8"><p>{{model.good_type}}</p></div></div>
            <div class="row"><div class="col-4"><b>estimated_budget: </b></div><div class="col-8"><p>{{model.estimated_budget}}</p></div></div>
            <div class="row"><div class="col-4"><b>site_name: </b></div><div class="col-8"><p>{{model.site_name}}</p></div></div>
       
            <!--model view footer-->  
            <template slot="footer">
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
            title: 'Amount',
            dataIndex: 'estimated_budget',
        },
        {
            title: 'Site',
            dataIndex: 'site_name',
        },
        {
            title: "",
            key: "id",
            fixed: "right",
            width: 100,
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
            /**
             *data attributes 
             */
            // getAllNurses_path : "http://127.0.0.1:8000/api/nurses/all", //this is the backend route to retrieve all nurse details
            
            return {
                //return nurseData[] array which contains backend data
                requiData: [],

                buttonWidth: 70,
                pagination: { },
                loading: false, //this is a must 
                visible: false, //this is a must
                //return column variable
                columns,
                //return the values to v-model attributes that we've set in Search, Filter functions
                search: '',
                gender: '', 
                nurse_type: '', //user selecting option of Filter dropdown will be assigned to this attribute
                Shift: '',
                //return model object(which contains all DB retrieved data as an obj)
                model: { 
                    requisition_id: '',
                    // date: '',
                    good_type: '',
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
            axios.get("http://127.0.0.1:8001/api/staff/requisitions/get/pending").then((response) => {
                    this.requiData = response.data.results;
                    console.log(this.requiData);
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

            //showConfirm() method to confirm deletion of a row
            showDeleteConfirm() {
                this.$confirm({
                    title: 'Are you sure to delete nurse - '+ this.model.nurse_no+'\n'+'('+ this.model.name+ ')'+ '?',
                    content: "Click 'No' if you don't really want to delete this nurse",
                    okText: 'Yes',
                    okType: 'danger',
                    cancelText: 'No',
                    onOk: () => {
                        this.$http.delete("http://127.0.0.1:8001/api/nurses/delete/" +this.model.id).then(
                            function(response){
                                //popup successful msg
                                this.openNotificationSuccess('Successfully Deleted', 'Nurse - '+ this.model.nurse_no +' deleted.');
                                // setTimeout("location.reload(true);", 1000); //this will reload the page
                                this.requiData.splice((this.requiData.findIndex((e) => e === this.model)), 1);
                                console.log(response);                             
                            }, (error) => {
                                this.openNotificationUnsuccess('Error', 'Nurse'+ this.model.nurse_no +' record cannot delete. Operation occured an error !');
                                console.log(error);
                                alert("delete unsuccesfful");
                            }
                        );
                    },
                    onCancel() {
                    console.log('Cancel');
                    },
                });
            },
            
        },
        computed: {
                searchResult: function(){
                    return this.requiData.filter((item) => {
                        //dropdown selcted value or the searched value will be matched with the respective data in DB table
                        return (item.gender.toLowerCase().match(this.gender.toLowerCase())) &&(item.Shift.toLowerCase().match(this.Shift.toLowerCase())) && (item.nurse_type.toLowerCase().match(this.nurse_type.toLowerCase())) && (item.name.toLowerCase().match(this.search.toLowerCase()));
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
</style>