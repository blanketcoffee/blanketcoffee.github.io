! function() {
    function e(e) {
        return Array.prototype.slice.call(e)
    }

    function t(e) {
        return new Promise(function(t, n) { e.onsuccess = function() { t(e.result) }, e.onerror = function() { n(e.error) } })
    }

    function n(e, n, o) {
        var r, i = new Promise(function(i, u) { r = e[n].apply(e, o), t(r).then(i, u) });
        return i.request = r, i
    }

    function o(e, t, o) {
        var r = n(e, t, o);
        return r.then(function(e) {
            return e ? new a(e, r.request) : void 0
        })
    }

    function r(e, t, n) {
        n.forEach(function(n) {
            Object.defineProperty(e.prototype, n, {
                get: function() {
                    return this[t][n]
                }
            })
        })
    }

    function i(e, t, o, r) {
        r.forEach(function(r) {
            r in o.prototype && (e.prototype[r] = function() {
                return n(this[t], r, arguments)
            })
        })
    }

    function u(e, t, n, o) {
        o.forEach(function(o) {
            o in n.prototype && (e.prototype[o] = function() {
                return this[t][o].apply(this[t], arguments)
            })
        })
    }

    function s(e, t, n, r) {
        r.forEach(function(r) {
            r in n.prototype && (e.prototype[r] = function() {
                return o(this[t], r, arguments)
            })
        })
    }

    function c(e) { this._index = e }

    function a(e, t) { this._cursor = e, this._request = t }

    function p(e) { this._store = e }

    function f(e) { this._tx = e, this.complete = new Promise(function(t, n) { e.oncomplete = function() { t() }, e.onerror = function() { n(e.error) } }) }

    function d(e, t, n) { this._db = e, this.oldVersion = t, this.transaction = new f(n) }

    function l(e) { this._db = e }
    r(c, "_index", ["name", "keyPath", "multiEntry", "unique"]), i(c, "_index", IDBIndex, ["get", "getKey", "getAll", "getAllKeys", "count"]), s(c, "_index", IDBIndex, ["openCursor", "openKeyCursor"]), r(a, "_cursor", ["direction", "key", "primaryKey", "value"]), i(a, "_cursor", IDBCursor, ["update", "delete"]), ["advance", "continue", "continuePrimaryKey"].forEach(function(e) {
        e in IDBCursor.prototype && (a.prototype[e] = function() {
            var n = this,
                o = arguments;
            return Promise.resolve().then(function() {
                return n._cursor[e].apply(n._cursor, o), t(n._request).then(function(e) {
                    return e ? new a(e, n._request) : void 0
                })
            })
        })
    }), p.prototype.createIndex = function() {
        return new c(this._store.createIndex.apply(this._store, arguments))
    }, p.prototype.index = function() {
        return new c(this._store.index.apply(this._store, arguments))
    }, r(p, "_store", ["name", "keyPath", "indexNames", "autoIncrement"]), i(p, "_store", IDBObjectStore, ["put", "add", "delete", "clear", "get", "getAll", "getAllKeys", "count"]), s(p, "_store", IDBObjectStore, ["openCursor", "openKeyCursor"]), u(p, "_store", IDBObjectStore, ["deleteIndex"]), f.prototype.objectStore = function() {
        return new p(this._tx.objectStore.apply(this._tx, arguments))
    }, r(f, "_tx", ["objectStoreNames", "mode"]), u(f, "_tx", IDBTransaction, ["abort"]), d.prototype.createObjectStore = function() {
        return new p(this._db.createObjectStore.apply(this._db, arguments))
    }, r(d, "_db", ["name", "version", "objectStoreNames"]), u(d, "_db", IDBDatabase, ["deleteObjectStore", "close"]), l.prototype.transaction = function() {
        return new f(this._db.transaction.apply(this._db, arguments))
    }, r(l, "_db", ["name", "version", "objectStoreNames"]), u(l, "_db", IDBDatabase, ["close"]), ["openCursor", "openKeyCursor"].forEach(function(t) {
        [p, c].forEach(function(n) {
            n.prototype[t.replace("open", "iterate")] = function() {
                var n = e(arguments),
                    o = n[n.length - 1],
                    r = (this._store || this._index)[t].apply(this._store, n.slice(0, -1));
                r.onsuccess = function() { o(r.result) }
            }
        })
    }), [c, p].forEach(function(e) {
        e.prototype.getAll || (e.prototype.getAll = function(e, t) {
            var n = this,
                o = [];
            return new Promise(function(r) {
                n.iterateCursor(e, function(e) {
                    return e ? (o.push(e.value), void 0 !== t && o.length == t ? void r(o) : void e["continue"]()) : void r(o)
                })
            })
        })
    });
    var h = {
        open: function(e, t, o) {
            var r = n(indexedDB, "open", [e, t]),
                i = r.request;
            return i.onupgradeneeded = function(e) { o && o(new d(i.result, e.oldVersion, i.transaction)) }, r.then(function(e) {
                return new l(e)
            })
        },
        "delete": function(e) {
            return n(indexedDB, "deleteDatabase", [e])
        }
    };
    "undefined" != typeof module ? module.exports = h : self.idb = h
}();
var urlToFetch = "https://api.github.com/repos/abhisheksoni27/abhisheksoni27.github.io/contents/";
var globalPath = "_posts/featured";
var Articles = [];
var Images = [];

function fetchURL(urlToFetch, path1) {
    return new Promise(function(fetchArticles, rejectArticles) {
        fetch(`${urlToFetch}${path1}`)
            .then(response => {
                return response.json();
            })
            .then(res => {
                res.forEach(function(obj) {
                    var pathExtracted = obj.path;
                    pathExtracted = pathExtracted.substring(27, pathExtracted.lastIndexOf("."));
                    Articles.push("featured/" + pathExtracted + ".html");
                    return fetchArticles();

                });
            }).catch(() => {
                return rejectArticles()
            });

    });
}

function fetchArticles() {
    console.log(Articles);
    return Articles;

}

function rejectArticles() {
    return "Error!";
}


function fetchImage() {
    console.log(Articles);
    return Images;

}

function rejectImages() {
    return "Error!";
}


function fetchImages(urlToFetch, path1) {
    return new Promise(function(fetchImage, rejectImages) {
        fetch(`${urlToFetch}${path1}`)
            .then(response => {
                return response.json()
            })
            .then(res => {
                if (res.message !== "Not Found") {
                    res.forEach(function(obj) {
                        var pathExtracted = obj.path;
                        Images.push(pathExtracted);
                        return fetchImage();
                    });
                }
            }).catch(() => rejectImages());
    });
}

const staticCacheName = "1";

var staticFilesToCache = ['/public/static-945kky2j.js',
    '/public/material-static-945kky2j.min.js',
    '/public/css/material-static-945kky2j.min.css',
    '/public/css/static-945kky2d.min.css',
    '/send-us-a-message.html',
    '/',
    '/index.html',
    '/404.html',
    "/public/idb.min.js",
];
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(`static-${staticCacheName}`)
        .then(function(cache) {
            cache.addAll(staticFilesToCache);
            fetchURL(urlToFetch, globalPath)
                .then(bp => {
                    Articles = Articles.concat(staticFilesToCache);
                    cache.addAll(Articles);
                    return cache
                })
            return cache;
        }).then(cache => {
            fetchImages(urlToFetch, "/public/images")
                .then(bp => {
                    cache.addAll(Images);
                })
        })
    );
});
//
//
self.addEventListener('message', function(event) {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
        return;
    }
    //

    const dbPromise = idb.open('article-offline', 1, upgradeDB => {
        upgradeDB.createObjectStore('articles');
    });

    const keyValStore = {
        get(key) {
            return dbPromise.then(db => {
                return db.transaction('articles')
                    .objectStore('articles').get(key);
            });
        },
        set(key, val) {
            return dbPromise.then(db => {
                const tx = db.transaction('articles', 'readwrite');
                tx.objectStore('articles').put(val, key);
                return tx.complete;
            });
        },
        delete(key) {
            return dbPromise.then(db => {

                const tx = db.transaction('articles', 'readwrite');
                tx.objectStore('articles').delete(key);
                return tx.complete;
            });
        }
    };


    if (event.data.action === 'cache') {

        caches.open(`static-${staticCacheName}`).then(cache => {
            fetch(event.data.url).then(function(response) {

                keyValStore.set(event.data.url, true);
                cache.put(event.data.url, response);

            }).then(resC => {



            });
        });



    } else if (event.data.action === 'un-cache') {
        //un-cache
        caches.open(`static-${staticCacheName}`).then(cache => {
            //un-cache
            keyValStore.set(event.data.url, false);
            cache.delete(event.data.url);
        });


    }

});

//okay

self.addEventListener('updatefound', function(event) {

});

self.addEventListener('activate', function(e) {
    e.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== `static-${staticCacheName}`) {
                    return caches.delete(key);
                }
            }));
        })
    );
});



self.addEventListener('fetch', function(event) {
    event.respondWith(
        // Try the cache
        caches.match(event.request).then(function(response) {
            // Fall back to network
            return response || fetch(event.request);
        }).catch(function() {
            // If both fail, show a generic fallback:
            return caches.match('/404.html');
            // However, in reality you'd have many different
            // fallbacks, depending on URL & headers.
            // Eg, a fallback silhouette image for avatars.
        })
    );

});

self.addEventListener('notificationclick', function(event) {
    console.log('Notification click: tag ', event.notification.tag);
    event.notification.close();
    var url = 'https://youtu.be/gYMkEMCHtJ4';
    event.waitUntil(
        clients.matchAll({
            type: 'window'
        })
        .then(function(windowClients) {
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});

self.addEventListener('push', function(event) {
    if (event.data) {
        console.log(event.data.json());
    }
});
