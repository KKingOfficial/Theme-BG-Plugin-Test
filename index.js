(function() {
    return {
        onLoad: function() {
            try {
                var vKeys = typeof vendetta !== "undefined" ? Object.keys(vendetta).join(",") : "vendetta undefined";
                var bKeys = typeof bunny !== "undefined" ? Object.keys(bunny).join(",") : "bunny undefined";
                alert("v=" + vKeys + "\nb=" + bKeys);
            } catch(e) {
                alert("error: " + e.message);
            }
        },
        onUnload: function() {}
    };
})();
