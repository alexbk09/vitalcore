<template>
    <div class="container-fluid mt-4 py-7">
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-5">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1"><i class="fa fa-search"></i></span>
                            <input type="text" class="form-control form-control-sm" placeholder="BUSCAR PACIENTE" aria-label="Username"
                                aria-describedby="basic-addon1">
                        </div>
                        <div class="row">
                            <div class="col-5">
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label">SEDE</label>
                                    <select name="" class="form-select form-select-sm" id="">
                                        <option value=""></option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-5">
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label">MÉDICO</label>
                                    <select name="" class="form-select form-select-sm" id="">
                                        <option value=""></option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-2">
                                <div class="btn-group mt-4" role="group" aria-label="Basic example">
                                    <button type="button" class="btn btn-primary"><i class="fa fa-search"></i></button>
                                    <button type="button" class="btn btn-primary"><i class="fa fa-trash"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-5 offset-2 text-center align-self-center">
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-outline-success">SELECCIONAR <br> MÉDICO</button>
                            <button type="button" class="btn btn-success">ATENCIÓN <br> PROGRAMADA</button>
                        </div><br>
                        <button class="btn btn-danger py-1 px-5">CITAS POR VENCER</button>
                    </div>
                </div>
                <div class="table-responsive mt-5">
                    <table class="table table-borderless text-center">
                        <thead class="text-secondary small">
                            <tr>
                                <th style="width: 500px;"><div class="bg-primary text-white rounded p-3">Nº ATENCIÓN</div></th>
                                <th style="width: 500px;"><div class="bg-primary text-white rounded p-3">DOCUMENTO</div></th>
                                <th style="width: 500px;"><div class="bg-primary text-white rounded p-3">DATOS PACIENTE</div></th>
                                <th style="width: 500px;"><div class="bg-primary text-white rounded p-3">DATOS CITA</div></th>
                                <th style="width: 500px;"><div class="bg-primary text-white rounded p-3">OBSERVACIONES</div></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="px-4"><div class="bg-light rounded p-3">123456</div></td>
                                <td class="px-4"><div class="bg-light rounded p-3">1234567890</div></td>
                                <td class="px-4"><div class="bg-light rounded p-1">
                                    <div class="row text-start align-items-center ps-3">
                                        <div class="col-9">
                                            Miguel alejandro <br>
                                            ortega  blanco <br>
                                            Tel: 3176034213
                                        </div>
                                        <div class="col">
                                            <i class="fa fa-plus h2"></i>
                                        </div>
                                    </div>
                                </div></td>
                                <td class="px-4"><div class="bg-light rounded p-3">10/10/2023 10:00 AM</div></td>
                                <td class="px-4"><div class="bg-light rounded p-3">Ninguna</div></td>
                            </tr>
                            <tr>
                                <td class="px-4"><div class="bg-light rounded p-3">123456</div></td>
                                <td class="px-4"><div class="bg-light rounded p-3">1234567890</div></td>
                                <td class="px-4"><div class="bg-light rounded p-3">JUAN PÉREZ</div></td>
                                <td class="px-4 py-1"><div class="bg-success text-white rounded p-1">
                                    <div class="row text-start align-items-center ps-3">
                                        <div class="col-9">
                                            Presencial <br>
                                            Fecha control <br>
                                            00/00/2025
                                        </div>
                                        <div class="col">
                                            <i class="fa fa-plus h2"></i>
                                        </div>
                                    </div>
                                </div></td>
                                <td class="px-4"><div class="bg-light rounded p-3">observaciones: 2 <i class="fa fa-eye"></i></div></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>