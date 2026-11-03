export default {
    emits: ['network-status-change'],
    data() {
        return {
            isOnline: navigator.onLine, // Estado inicial
        };
    },
    created() {
        window.addEventListener('online', this.updateOnlineStatus);
        window.addEventListener('offline', this.updateOnlineStatus);
    },
    destroyed() {
        window.removeEventListener('online', this.updateOnlineStatus);
        window.removeEventListener('offline', this.updateOnlineStatus);
    },
    methods: {
        updateOnlineStatus() {
            this.isOnline = navigator.onLine;
            this.$emit('network-status-change', this.isOnline); // Emitir evento personalizado
        },
    },
};