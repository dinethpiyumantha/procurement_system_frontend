<template>
  <div class="container">
      <div style="display: flex; justify-content: space-between;">
        <h2>Site Products</h2>
            <a-badge :count="8">
                <a-button size="large" type="primary">
                    <a-icon type="shopping-cart"/>
                    Cart
                </a-button>
            </a-badge>
      </div>
      <a-input-search placeholder="input search text" style="margin: 10px 0px;" size="large" @search="onSearch" />
      <h3 style="margin: 10px 0px;">Recommended featured items</h3>
      <div>
          <a-row :gutter="[16,16]">
            <a-col :span="6">
                <ProductCard :title="'Europe Street beat'" :description="'www.instagram.com'" :image="'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'"/>
                <ProductCard :title="'Europe Street beat'" :description="'www.instagram.com'" :image="'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'"/>
            </a-col>
            <a-col :span="6">
                <ProductCard :title="'Asian Street beat'" :description="'www.instagram.com'" :image="''"/>
                <ProductCard :title="'Europe Street beat'" :description="'www.instagram.com'" :image="'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'"/>
                <ProductCard :title="'Europe Street beat'" :description="'www.instagram.com'" :image="'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'"/>
            </a-col>
            <a-col :span="6">
                <ProductCard :title="'Europe Street beat'" :description="'www.instagram.com'" :image="'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'"/>
                <ProductCard :title="'Europe Street beat'" :description="'www.instagram.com'" :image="'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'"/>
            </a-col>
            <a-col :span="6">
                <ProductCard :title="'Asian Street beat'" :description="'www.instagram.com'" :image="''"/>
                <ProductCard :title="'Europe Street beat'" :description="'www.instagram.com'" :image="'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'"/>
                <ProductCard :title="'Europe Street beat'" :description="'www.instagram.com'" :image="'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'"/>
            </a-col>
          </a-row>
      </div>
  </div>
</template>

<script>
import ProductCard from '../../components/Cards/ProductCard.vue'
export default {
    components: { ProductCard }

}
</script>

<style>
.d{
    justify-content: space-between;
}
</style>