(function() {
    var findByProps = vendetta.metro.findByProps;

    return {
        onLoad: function() {
            var props = ["loadCachedMessages", "renderLatestMessages", "displayLatestMessages", "firstRenderAfterReadyPayload"];
            var out = [];
            props.forEach(function(p) {
                var m = findByProps(p);
                if (m) {
                    var keys = Object.keys(m).slice(0, 8);
                    out.push(p.slice(0,10) + ":\n  " + keys.join(", "));
                }
            });
            alert(out.join("\n\n"));
        },
        onUnload: function() {}
    };
})();
