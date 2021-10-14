// FNV-1a 32bit
function fnv32(key, base = 16) {
    let hash = 0x811c9dc5

    for (let i = 0; i < key.length; ++i) {
        hash ^= key.charCodeAt(i)
        hash +=
            (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24)
    }

    return (hash >>> 0).toString(base)
}

// FNV-1a 32bit, but auto ouput base
export default function fnv32Auto(key) {
    let base = key.charCodeAt(Math.floor(key.length / 2)) % 36
    if (base < 16) base += 16
    return fnv32(key, base)
}
