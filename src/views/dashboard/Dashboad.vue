<template>
  <div>
      <h2>Dashboard</h2>
      <a-row :gutter="[16,16]">
        <!-- LEFT Content -->
        <a-col :span="12">
            <a-row style="margin-bottom: 20px">
              <a-col><Clock/></a-col>
            </a-row>
            <a-row>
              <a-col><NumberOfPayments/></a-col>
            </a-row>
            <a-row>
              <a-col>
                  <a-card>
                      <PaymentStatus/>
                      <a-card-meta hoverable title="Payment status chart">
                          <template slot="description">Payment status chart</template>
                      </a-card-meta>
                  </a-card>
              </a-col>
            </a-row>
            <a-row style="margin-top: 20px">
              <a-col>
                <a-card>
                  <a-row :gutter="[16,16]" style="padding: 10px 0px">
                    <a-col>
                      <a-alert
                        message="Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text"
                        type="warning"
                        closable
                        @close="onClose"
                      />
                    </a-col>
                    <a-col>
                      <a-alert
                        message="Error Text"
                        description="Error Description Error Description Error Description Error Description Error Description Error Description"
                        type="error"
                        closable
                        @close="onClose"
                      />
                    </a-col>
                  </a-row>
                  <a-card-meta title="Notifications">
                    <template slot="description">Notifications</template>
                  </a-card-meta>
                </a-card>
              </a-col>
            </a-row>
        </a-col>

        <!-- RIGHT Content -->
        <a-col :span="12">
            <a-row>
              <a-col><NumberOfOrders/></a-col>
            </a-row>
            <a-row>
              <a-col>
                  <a-card>
                      <ApprovedOrders/>
                      <a-card-meta hoverable title="Approved orders this month">
                          <template slot="description">Approved orders this month</template>
                      </a-card-meta>
                  </a-card>
              </a-col>
            </a-row>
            <a-row>
              <a-col>
                <NumberOfRequisitions style="margin-top: 20px"/>
              </a-col>
            </a-row>
            <a-row>
              <a-col>
                  <a-card>
                      <RequisitionChart/>
                      <a-card-meta hoverable title="Approved orders this month">
                          <template slot="description">Requisition for the month of june</template>
                      </a-card-meta>
                  </a-card>
              </a-col>
            </a-row>
        </a-col>
      </a-row>
  </div>
</template>

<script>
import Clock from '../../components/Clock/Clock.vue';
import NumberOfOrders from '../../components/Counters/NumberOfOrders.vue';
import NumberOfPayments from '../../components/Counters/NumberOfPayments.vue';
import NumberOfRequisitions from '../../components/Counters/NumberOfRequisitions.vue';
import ApprovedOrders from '../../components/Charts/ApprovedOrders.vue';
import PaymentStatus from '../../components/Charts/PaymentStatus.vue';
import RequisitionChart from '../../components/Charts/RequisitionChart.vue';

export default {
    components: { Clock, NumberOfOrders, NumberOfPayments, NumberOfRequisitions, ApprovedOrders, PaymentStatus, RequisitionChart },
    data () {
        return {
        }
    }
}
</script>

<style>

</style>