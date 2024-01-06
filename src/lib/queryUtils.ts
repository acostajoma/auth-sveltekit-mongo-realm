export function generateQueryParam(entries: [string, string | FormDataEntryValue][]) {
    return entries.reduce((queryString, [key, value]) => {
        if (
            (typeof value === 'string' && value !== "") ||
            typeof value === 'boolean' ||
            typeof value === 'number'
        ) {
            const param = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
            return queryString ? `${queryString}&${param}` : `?${param}`;
        }
        return queryString;
    }, '');
}