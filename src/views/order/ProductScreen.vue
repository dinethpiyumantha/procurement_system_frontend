<template>
  <div class="container">
      <h2>Products</h2>
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

</style>