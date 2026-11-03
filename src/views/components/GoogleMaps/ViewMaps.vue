<template>
    <div>
      <div class="container-fluid py-7">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div >
                <!-- <VueSignaturePad
                  id="signature"
                  width="100%"
                  height="500px"
                  ref="signaturePad"
                  :options="options"
                /> -->
              </div>
              <div class="buttons mt-3">
                <button class="btn btn-danger" @click="undo"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                <button class="btn btn-primary" @click="save"><i class="fa fa-floppy-o" aria-hidden="true"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>      
  </div>
  </template>
  
  <script>
  
  export default {
    name: "App",
    data: () => ({
      options: {
        penColor: "#000",
      },
    }),
    methods: {
      undo() {
        /* this.$refs.signaturePad.undoSignature() */;
      },
      save() {
        /* const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
  
        alert("Open DevTools see the save data.");
        console.log(isEmpty);
        console.log(data); */
      },
    },
  };
  </script>
  
  <style>

  
  #signature {
    border: double 3px black;
    border-radius: 5px;
    background-origin: border-box;
    background-clip: content-box, border-box;
  }
  
  
  .buttons {
    display: flex;
    gap: 8px;
    justify-content: center;
    margin-top: 8px;
  }
  </style>
  