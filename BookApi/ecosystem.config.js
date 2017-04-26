module.exports = {
    apps: [{
        name: "bookview",
        script: "./bin/www",
        watch: true,
        exec_mode: "cluster",
        merge_logs: true,
        "max_memory_restart": "1G",
        "autorestart": true,
        env: {
            "NODE_ENV": "development",
        },
        env_production: {
            "NODE_ENV": "production"
        }
    }]
}
