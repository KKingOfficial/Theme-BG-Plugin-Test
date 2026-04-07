(function() {
    const vendetta = window.vendetta;
    const { after } = vendetta.patcher;
    const { findByName } = vendetta.metro;
    const { storage } = vendetta.plugin;
    const { useProxy } = vendetta.storage;
    const React = vendetta.metro.common.React;
    const { View, Image, TextInput, Text, ScrollView } = vendetta.metro.common.ReactNative;
    const { Forms } = vendetta.ui.components;
    const { FormInput } = Forms;

    if (storage.url === undefined) storage.url = "";
    if (storage.opacity === undefined) storage.opacity = "0.5";

    let unpatch = null;

    const applyPatch = () => {
        if (unpatch) { unpatch(); unpatch = null; }
        const m = findByName("MessagesConnected", false);
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

    function Settings() {
        useProxy(storage);
        return React.createElement(
            ScrollView,
            { style: { flex: 1, padding: 16 } },
            React.createElement(FormInput, {
                title: "Image URL",
                placeholder: "https://example.com/image.png",
                value: storage.url,
                onChange: (v) => {
                    storage.url = v;
                    applyPatch();
                }
            }),
            React.createElement(FormInput, {
                title: "Opacity (0.0 - 1.0)",
                placeholder: "0.5",
                value: storage.opacity,
                keyboardType: "numeric",
                onChange: (v) => {
                    storage.opacity = v;
                    applyPatch();
                }
            })
        );
    }

    return {
        onLoad() {
            applyPatch();
        },
        onUnload() {
            if (unpatch) { unpatch(); unpatch = null; }
        },
        settings: Settings
    };
})();
