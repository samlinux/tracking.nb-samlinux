export default {
    name: "App",
    data: () => ({
        menuVisible: false,
        currentModule: "",
        menuModules: {
            history: {
                moduleName: "Trace crop",
                modulePath: "/app3/history",
                // modulePath: "/history",
            },
            store: {
                moduleName: "Create crop",
                modulePath: "/app3/store",
                // modulePath: "/store",
            }
        },
    }),
    mounted() {
        let startModuleName = "history";
        const currentPath = window.location.pathname;
        if (currentPath && currentPath !== "") {
            const currentPathSplit = currentPath.split("/");
            if (currentPathSplit.length > 1) {
                if (
                    currentPathSplit[currentPathSplit.length - 1] &&
                    currentPathSplit[currentPathSplit.length - 1] !== ""
                ) {
                    startModuleName = currentPathSplit[currentPathSplit.length - 1];
                }
            }
        }

        // Listen to Nav-Event
        new createCustomEventTarget();

        // delete temp. search-data
        localStorage.removeItem('search-data');

        // load start module
        if (this.$router.currentRoute) {
            this.navTo(startModuleName);
        }
    },
    methods: {
        navTo: function (routeName) {
            if (this.menuModules[routeName]) {
                this.setCurrentModuleName(this.menuModules[routeName].moduleName, routeName);
                this.$router
                    .push(this.menuModules[routeName].modulePath)
                    .catch(() => { });
                this.menuVisible = false;
            }
        },
        setCurrentModuleName(moduleName, routeName) {
            this.currentModule = moduleName;
            if (routeName === 'store') {
                window.dispatchCustomEvent(new Event("navStore"));
            }
        },
    },
};

const createCustomEventTarget = () => {
    const target = document.createTextNode(null);
    window.addCustomEventListener = target.addEventListener.bind(target);
    window.removeCustomEventListener = target.removeEventListener.bind(target);
    window.dispatchCustomEvent = target.dispatchEvent.bind(target);
}