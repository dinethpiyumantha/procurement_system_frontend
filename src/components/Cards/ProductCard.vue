<template>
  <a-card hoverable style="width: 240px; margin-bottom: 20px" bodyStyle="">
    <img
      slot="cover"
      alt="example"
      :src="image"
      style="height: 240px"
      v-if="isHasImage"
    />
    <a-card-meta :title="title">
      <template slot="description">
          {{description}}
      </template>
    </a-card-meta>
  </a-card>
</template>

<script>
export default {
    props: {
        image: String,
        title: String,
        description: String
    },
    computed: {
        isHasImage() {
            return !(this.image === "");
        }
    }
}
</script>
