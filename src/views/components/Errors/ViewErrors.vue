<script>
import { mapActions, mapGetters } from 'vuex'
import Loading from '../Utils/Loading.vue';
import PaginationComponent from './../../../components/common/PaginationComponent.vue'
export default {
    name: "view-errors",
    data() {
        return {
            errors: [],
            isLoading: true,
        }
    },
    mounted() {
        this.loadingActive();
    },
    methods: {
        ...mapActions('Errors', ['consulterErrors']),
        async loadingActive() {
            this.isLoading = true
            await this.consulterErrors()
            this.isLoading = false
        },

        /* async changePage(page) {
            this.isLoading = true;
            await this.consulterErrors(page);
            this.isLoading = false;

        }, */
        async changePage(page) {
            if (page !== '...' && page !== this.currentPage) {
                this.isLoading = true;
                await this.consulterErrors(page);
                this.isLoading = false;
            }
        },
        visiblePages() {
            const total = this.totalPages || 0;
            const current = this.currentPage || 1; 
            const pages = [];
            if (isNaN(total) || isNaN(current)) {
                return pages;
            }
            if (total <= 7) {
                for (let i = 1; i <= total; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                if (current > 4) {
                    pages.push('...');
                }
                for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
                    pages.push(i);
                }
                if (current < total - 3) {
                    pages.push('...');
                }
                pages.push(total);
            }
            return pages;
        },
    },
    computed: {
        ...mapGetters('Errors', ['getErrors', 'getCurrentPage', 'getTotalPages', 'getNextPageUrl', 'getPrevPageUrl', 'getLinks',]),
        currentPage() {
            return this.getCurrentPage || 1;
        },
        totalPages() {
            return this.getTotalPages || 0;
        },
    },
    components: {
        Loading,
        PaginationComponent
    }
}
</script>

<template>
    <div>
        <Loading v-if="this.isLoading" />
        <div class="container-fluid py-7" v-else>
            <div class="row">
                <div class="col-12">
                    <div class="card bg-white">
                        <div class="card-body text-center">
                            <div class="table-responsive">
                                <table class="table align-items-center mb-0">
                                    <thead>
                                        <tr>
                                            <th
                                                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                ID</th>
                                            <th
                                                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                message</th>
                                            <th
                                                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                method</th>
                                            <th
                                                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                request_data</th>
                                            <th
                                                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                request_id</th>
                                            <th
                                                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                stack_trace</th>
                                            <th
                                                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                headers</th>
                                            <th
                                                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                url</th>
                                            <th
                                                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                created_at</th>
                                            <th
                                                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                updated_at</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="error in getErrors" :key="error.id">
                                            <td><span>{{ error.id }}</span></td>
                                            <td><span>{{ error.message }}</span></td>
                                            <td><span>{{ error.method }}</span></td>
                                            <td><span>{{ error.request_data }}</span></td>
                                            <td><span>{{ error.request_id }}</span></td>
                                            <td><span>{{ error.stack_trace }}</span></td>
                                            <td><span>{{ error.headers }}</span></td>
                                            <td><span>{{ error.url }}</span></td>
                                            <td><span>{{ error.created_at }}</span></td>
                                            <td><span>{{ error.updated_at }}</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <nav aria-label="Page navigation">
                                    <ul class="pagination justify-content-end">
                                        <li class="page-item" :class="{ disabled: !getPrevPageUrl }">
                                            <button class="page-link" @click="changePage(currentPage - 1)"
                                                :disabled="!getPrevPageUrl"><i class="fas fa-angle-left"></i></button>
                                        </li>

                                        <!-- Renderizar las páginas -->
                                        <li v-for="page in visiblePages()" :key="page" class="page-item"
                                            :class="{ active: currentPage === page }">
                                            <button v-if="page !== '...'" class="page-link" @click="changePage(page)">{{
                                                page }}</button>
                                            <span v-else class="page-link">...</span>
                                        </li>

                                        <li class="page-item" :class="{ disabled: !getNextPageUrl }">
                                            <button class="page-link" @click="changePage(currentPage + 1)"
                                                :disabled="!getNextPageUrl"><i class="fas fa-angle-right"></i></button>
                                        </li>
                                    </ul>
                                </nav>
                            <!-- <pagination-component class="p-3" @changePage="changePage" :getCurrentPage="getCurrentPage"
                            :getTotalPages="totalPages" :getNextPageUrl="getNextPageUrl"
                            :getPrevPageUrl="getPrevPageUrl" :getLinks="getLinks">
                        </pagination-component> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>