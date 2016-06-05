fetch(url).then(response => {
    return response.json();
}).then(res => {
    console.log(res)
    res.forEach(function(obj) {
        var pathExtracted = obj.path;
        pathExtracted = pathExtracted.substring(18, pathExtracted.lastIndexOf("."));
        Articles.push("featured/" + pathExtracted + ".html");
    });
});
