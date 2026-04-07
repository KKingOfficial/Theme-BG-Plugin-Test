(function() {
    const React = bunny.metro.findByProps("createElement", "useState");
    const { View, Image, TextInput, Text } = bunny.metro.findByProps("StyleSheet");
    const { after } = bunny.api.patcher;
    const storage = bunny.plugin.createStorage();

    if (storage.url === undefined) storage.url = "";
    if (storage.opacity === undefined) storage.opacity = "0.5";

    let unpatch = null;

    const applyPatch = () => {
        if (unpatch) { unpatch(); unpatch = null; }

        const m = bunny.metro.findByDisplayName("MessagesConnected");
        const target = m?.render ?? m;
        if (!target) return;

        unpatch = after("render", target, (_, ret) => {
            const url = storage.url?.trim();
            const opacity = parseFloat(storage.opacity) || 0.5;
            if (!url || !ret) return;

            return React.createElement(
                View,
                { style: { flex: 1 } },
                React.createElement(Image, {
                    source: { uri: url },
                    style: {
                        position: "absolute",
                        top: 0, left: 0,
                        right: 0, bottom: 0,
                        width: "100%",
                        height: "100%",
                        opacity: opacity,
                    },
                    resizeMode: "cover"
                }),
                ret
            );
        });
    };

    return {
        onLoad() {
            applyPatch();
        },
        onUnload() {
            if (unpatch) { unpatch(); unpatch = null; }
        },
        SettingsComponent() {
            const [url, setUrl] = React.useState(storage.url);
            const [opacity, setOpacity] = React.useState(storage.opacity);

            return React.createElement(
                View,
                { style: { padding: 16, gap: 16, flex: 1 } },

                React.createElement(Text, { style: { color: "#ffffff", fontSize: 14, marginBottom: 4 } }, "Image URL"),
                React.createElement(TextInput, {
                    value: url,
                    onChangeText: (v) => {
                        setUrl(v);
                        storage.url = v;
                        applyPatch();
                    },
                    placeholder: "https://example.com/image.png",
                    placeholderTextColor: "#666",
                    style: {
                        backgroundColor: "#1a1a1a",
                        color: "#ffffff",
                        borderRadius: 8,
                        padding: 10,
                        fontSize: 13,
                        marginBottom: 16
                    }
                }),

                React.createElement(Text, { style: { color: "#ffffff", fontSize: 14, marginBottom: 4 } }, "Opacity (0.0 - 1.0)"),
                React.createElement(TextInput, {
                    value: opacity,
                    onChangeText: (v) => {
                        setOpacity(v);
                        storage.opacity = v;
                        applyPatch();
                    },
                    placeholder: "0.5",
                    placeholderTextColor: "#666",
                    keyboardType: "numeric",
                    style: {
                        backgroundColor: "#1a1a1a",
                        color: "#ffffff",
                        borderRadius: 8,
                        padding: 10,
                        fontSize: 13
                    }
                })
            );
        }
    };
})();
