module.exports = {
    apps: [{
        name: "bookview",
        script: "./bin/www",
        watch: true,
        exec_mode: "cluster",
        merge_logs: true,
        error_file: "./logs/production_bookview_err.log",
        out_file: "./logs/production_bookview_out.log",
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
