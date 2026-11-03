<template>
    <nav aria-label="Page navigation">
        <ul class="pagination justify-content-end">
            <li class="page-item" :class="{ disabled: !getPrevPageUrl }">
                <button class="page-link" @click="changePage(getPrevPageUrl)"
                    :disabled="!getPrevPageUrl"><i class="fas fa-angle-left"></i></button>
            </li>
            <li v-for="page in visiblePages()" :key="page.url" class="page-item"
                :class="{ active: getCurrentPage === page.label }">
                <button v-if="page.label !== '...'" class="page-link" @click="changePage(page.url)">{{
                    page.label }}</button>
                <span v-else class="page-link">...</span>
            </li>
            <li class="page-item" :class="{ disabled: !getNextPageUrl }">
                <button class="page-link" @click="changePage(getNextPageUrl)"
                    :disabled="!getNextPageUrl"><i class="fas fa-angle-right"></i></button>
            </li>
        </ul>
    </nav>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    get: Number,
    getCurrentPage: Number,
    getTotalPages: Number,
    getNextPageUrl: String,
    getPrevPageUrl: String,
    getLinks: Object
});

const emit = defineEmits(['changePage']);

const getCurrentPage = ref(props.getCurrentPage);
const getTotalPages = ref(props.getTotalPages);
const getNextPageUrl = ref(props.getNextPageUrl);
const getPrevPageUrl = ref(props.getPrevPageUrl);
const getLinks = ref(props.getLinks);


const changePage = (url) => {
    emit('changePage', url);
};

const visiblePages = () => {
    const total = getTotalPages.value || 0;
    const current = getCurrentPage.value || 1;
    const ListLinks = getLinks.value || null;
    const pages = [];

    if (isNaN(total) || isNaN(current)) {
        return pages;
    }

    if (total <= 7) {
        for (let i = 1; i <= total; i++) {
            pages.push({
                url: ListLinks ? ListLinks[i].url : null,
                label: i
            });
        }
    } else {
        pages.push({
            label: 1,
            url: ListLinks ? ListLinks[1].url : null
        });
        if (current > 4) {
            pages.push({
                label: '...',
                url: ListLinks ? ListLinks[current - 2].url : null
            });
        }
        for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
            pages.push({
                url: ListLinks ? ListLinks[i].url : null,
                label: i
            });
        }
        if (current < total - 3) {
            pages.push({
                label: '...',
                url: ListLinks ? ListLinks[current + 2].url : null
            });
        }
        pages.push({
            label: total,
            url: ListLinks ? ListLinks[total - 1].url : null
        });
    }

    console.log("🚀 ~ visiblePages ~ pages:", pages)
    return pages;
};

watch(() => props.getTotalPages, () => {
    getTotalPages.value = props.getTotalPages;
});

watch(() => props.getNextPageUrl, () => {
    getNextPageUrl.value = props.getNextPageUrl;
});

watch(() => props.getPrevPageUrl, () => {
    getPrevPageUrl.value = props.getPrevPageUrl;
});

watch(() => props.getLinks, () => {
    getLinks.value = props.getLinks;
});
</script>