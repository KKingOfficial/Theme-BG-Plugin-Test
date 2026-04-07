(function() {
    var findByProps = vendetta.metro.findByProps;

    return {
        onLoad: function() {
            var m = findByProps("renderLatestMessages");
            var keys = Object.keys(m).filter(function(k) {
                return typeof m[k] === "function" || (m[k] && typeof m[k] === "object" && typeof m[k].render === "function");
            });
            alert("renderLatestMessages keys:\n" + keys.join("\n"));
        },
        onUnload: function() {}
    }; 
})();
