export const toString = o => o.toString()

/**
 * calls toJSON on an object or all objects in an array
 * used for filtering out mongoose query data from results
 * @param json object to be jsonified
 * @returns just the toJSON content of the object
 */




export function jsonify(json) {
    if (!json) return json
    const jstringify = j => {
        if (!j || isPrimitive(j)) return j
        return JSON.parse(
            JSON.stringify(
                'toJSON' in j
                    ? j.toJSON()
                    : j
            )
        )
    }
    if (Array.isArray(json)) return json.map(jstringify)
    return jstringify(json)

    /* c8 ignore start*/
    function isPrimitive(e) {
        switch (typeof e) {
            case "string":
            case "bigint":
            case "boolean":
            case "number":
            case "undefined":
                return true;
            default:
                return false
        }
    }

    /* c8 ignore stop*/
}
