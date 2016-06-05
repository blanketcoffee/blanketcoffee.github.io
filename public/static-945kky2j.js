var subscribeButton = document.querySelector('button');
window.addEventListener("onload", function() {

    if (window.matchMedia('(display-mode: standalone)').matches) {
        var notification = document.querySelector('.mdl-js-snackbar');
        notification.MaterialSnackbar.showSnackbar({
            message: 'Welcome to Literature!'
        });
    }
}, false);

var base_url = window.location.origin;
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register(base_url + "/sw.js", { scope: "/" })
        .then(function(response) {

            response.pushManager.subscribe({
                    userVisibleOnly: true
                })
                .then(function(sub) {
                    console.log('endpoint:', sub.endpoint);
                });
            if (response.waiting) {
                console.log("Waiting!");
                updateReady(response.waiting);
                return;
            }
            response.addEventListener('updatefound', function() {
                console.log("Update Found!");
                trackInstalling(response.installing);
            });
        })
        .catch(
            function(reject) {
                console.log("Service Worker not registered. There was an error.", reject)
            });

    var refreshing;
    navigator.serviceWorker.addEventListener('controllerchange', function() {
        if (refreshing) return;
        window.location.reload();
        refreshing = true;
    });
}

function trackInstalling(worker) {

    var indexController = this;
    worker.addEventListener('statechange', function() {
        if (worker.state === 'installed') {
            updateReady(worker);
        }
    });

}

function updateReady(worker) {

    var notification = document.querySelector('.mdl-js-snackbar');

    var data = {
        message: 'Update Found',
        actionHandler: function(event) {
            worker.postMessage({ action: 'skipWaiting' });
        },
        actionText: 'Refresh',
        timeout: 10000
    };
    notification.MaterialSnackbar.showSnackbar(data);

}



// subscribeButton.addEventListener('click', function() {
//     if (isSubscribed) {
//         unsubscribe();
//     } else {
//         subscribe();
//     }
// });

// function subscribe() {
//     reg.pushManager.subscribe({ userVisibleOnly: true }).
//     then(function(pushSubscription) {
//         sub = pushSubscription;
//         console.log('Subscribed! Endpoint:', sub.endpoint);
//         subscribeButton.textContent = 'Unsubscribe';
//         isSubscribed = true;
//     });
// }

// function unsubscribe() {
//     sub.unsubscribe().then(function(event) {
//         subscribeButton.textContent = 'Subscribe';
//         console.log('Unsubscribed!', event);
//         isSubscribed = false;
//     }).catch(function(error) {
//         console.log('Error unsubscribing', error);
//         subscribeButton.textContent = 'Subscribe';
//     });
// }

