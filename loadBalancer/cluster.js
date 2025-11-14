const cluster = require("cluster");
const os = require("os");

if (cluster.isMaster) {
    console.log(`Master process running with PID: ${process.pid}`);

    const numberOfCPUs = os.cpus().length;
    //creater a worker for each CPU core
    for (let i = 0; i < numberOfCPUs; i++){
        cluster.fork();
    }

    //If any worker dies we restart it
    cluster.on("exit", (worker) => {
        console.log(`Worker ${worker.process.pid} died. Restarting...`);
        cluster.fork();
    });


} else {
    console.log(`Worker started with PID: ${process.pid}`);
    require("./server");
}