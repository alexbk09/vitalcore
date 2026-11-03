<template>
    <div class="container-fluid py-7 mt-3">
      <div class="card">
        <div class="card-body">
          <div class="d-flex mb-3">
            <input type="text" class="form-control" placeholder="Buscar..." />
            <button class="btn btn-dark ms-2" @click="newRips()">
              <i class="fa fa-file"></i>
            </button>
            <button class="btn btn-dark ms-2">
              <i class="fa fa-search"></i>
            </button>
          </div>
          <table class="table table-bordered table-striped">
            <thead class="table-light">
              <tr>
                <th>Códigos</th>
                <th>No.</th>
                <th>Entidad</th>
                <th>Convenio</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in data" :key="index">
                <td>
                  <div class="d-flex flex-wrap gap-1">
                    <span
                      v-for="(code, i) in item.codes"
                      :key="i"
                      class="badge bg-dark btn-code"
                      >{{ code }}</span
                    >
                  </div>
                </td>
                <td>
                  <a href="#">{{ item.no }}</a>
                </td>
                <td>{{ item.entidad }}</td>
                <td>{{ item.convenio }}</td>
                <td>{{ item.fecha }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ripsList",
    data() {
      return {
        data: [
          {
            no: "000008",
            entidad: "1100109652 FUNSABIAM",
            convenio: "901127521 UT SERVISALUD SAN JOSE",
            fecha: "2018-10-31 04:17:35",
            codes: ["CT", "AF", "US", "AC", "AP", "AM"],
          },
          {
            no: "000007",
            entidad: "1100109652 FUNSABIAM",
            convenio: "901127521 UT SERVISALUD SAN JOSE",
            fecha: "2018-10-31 04:15:07",
            codes: ["CT", "AF", "US", "AC", "AP", "AM"],
          },
          {
            no: "000006",
            entidad: "1100109652 FUNSABIAM",
            convenio: "",
            fecha: "2018-10-30 23:36:33",
            codes: ["CT", "AF", "US", "AC", "AP"],
          },
          {
            no: "000005",
            entidad: "1100109652 FUNSABIAM",
            convenio: "",
            fecha: "2018-10-30 23:34:46",
            codes: ["CT", "AF", "US", "AC", "AP", "AM", "AT"],
          },
          {
            no: "000004",
            entidad: "1100109652 FUNSABIAM",
            convenio: "",
            fecha: "2018-10-30 23:20:32",
            codes: ["CT", "AF", "US", "AC", "AP", "AM"],
          },
          {
            no: "000003",
            entidad: "1100109652 FUNSABIAM",
            convenio: "",
            fecha: "2018-10-30 23:17:02",
            codes: ["CT", "AF", "US", "AC", "AP", "AM", "AT"],
          },
          {
            no: "000002",
            entidad: "1100109652 FUNSABIAM",
            convenio: "",
            fecha: "2018-10-30 22:09:08",
            codes: ["CT", "AF", "US", "AC", "AP", "AM"],
          },
          {
            no: "000001",
            entidad: "1100109652 FUNSABIAM",
            convenio: "",
            fecha: "2018-10-26 12:39:09",
            codes: ["CT", "AF", "US", "AC", "AP", "AM", "AT"],
          },
        ],
      };
    },
    methods: {
      newRips() {
        this.$router.push("/rips/add");
      },
    },
  };
  </script>
  
  <style scoped>
  .btn-dark {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .badge {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
  .btn-code {
    cursor: pointer;
  }
  </style>
  