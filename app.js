if(navigator.serviceWorker) {
    navigator.serviceWorker.register("sw.js")
    .then(()=> {
        console.log("Service Worker Installed");        
    })
    .catch((error)=> {
        console.log("Service Worker Did Not Install"); 
        console.log(error);
    })
}