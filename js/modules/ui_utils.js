export function isNumericString(s) {
    return typeof s === "string" && /^\d+$/.test(s);
}

export function toStr(v) {
    if (v === null || v === undefined) return "";
    return String(v);
}

export function padLeft(s, length) {
    s = toStr(s);
    while (s.length < length) s = "0" + s;
    return s;
}

export function deriveParentsFromId(idStr) {
    const s = toStr(idStr);
    const res = {};
    if (s.length >= 2) res.provinceId = padLeft(s.slice(0, 2), 2);
    if (s.length >= 4) res.districtId = padLeft(s.slice(0, 4), 4);
    if (s.length >= 6) res.communeId = padLeft(s.slice(0, 6), 6);
    return res;
}

export function copyTextToClipboard($button, textToCopy, defaultAddress, defaultCode) {
    if (!textToCopy || $button.prop("disabled") || textToCopy === defaultCode || textToCopy === defaultAddress) return;

    if (navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            const originalText = $button.text();
            $button.text("ចម្លងរួចរាល់");
            setTimeout(() => { $button.text(originalText); }, 1500);
        }).catch(() => {
            fallbackCopy(textToCopy, $button);
        });
    } else {
        fallbackCopy(textToCopy, $button);
    }

    function fallbackCopy(text, $btn) {
        const tempTextarea = $("<textarea>").val(text).appendTo("body").select();
        try {
            document.execCommand("copy");
            const originalText = $btn.text();
            $btn.text("ចម្លងរួចរាល់");
            setTimeout(() => { $btn.text(originalText); }, 1500);
        } finally {
            tempTextarea.remove();
        }
    }
}