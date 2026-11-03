<template>
    <div>
        <div class="container-fluid py-7">
            <div class="row">
                <div class="col-12">
                    <div class="card bg-white">
                        <div class="card-body text-center">
                            <p class="h1">Cargando {{valuetitle}}...</p>
                            <div class="loader"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>    
    export default{
        name:'Loading',
        props:{
            valuetitle:String
        },
        data(){
            return{
                isLoading: true,
            }
        },
        mounted() { 
        },
    }
</script>

<style>
  .loader {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
    margin: 0 auto;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>