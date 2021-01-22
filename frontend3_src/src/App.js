export default {
    name: "App",
    data: () => ({
        menuVisible: false,
        currentModule: "",
        menuModules: {
            history: {
                moduleName: "Trace crop",
                // modulePath: "/app3/history",
                modulePath: "/history",
            },
            store: {
                moduleName: "Create crop",
                // modulePath: "/app3/store",
                modulePath: "/store",
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
        if (this.$router.currentRoute) {
            this.navTo(startModuleName);
        }
    },
    methods: {
        navTo: function (routeName) {
            if (this.menuModules[routeName]) {
                this.setCurrentModuleName(this.menuModules[routeName].moduleName);
                this.$router
                    .push(this.menuModules[routeName].modulePath)
                    .catch(() => { });
                this.menuVisible = false;
            }
        },
        setCurrentModuleName(moduleName) {
            this.currentModule = moduleName;
        },
    },
};