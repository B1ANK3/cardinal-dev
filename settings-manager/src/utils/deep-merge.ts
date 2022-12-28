// https://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge

export function isObject(item: any): boolean {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

export default function mergeDeep<T>(target: { [key: string]: any }, source: { [key: string]: any }): T {
    let output = Object.assign({}, target);
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
            if (isObject(source[key])) {
                if (!(key in target))
                    Object.assign(output, { [key]: source[key] });
                else
                    output[key] = mergeDeep(target[key], source[key]);
            } else {
                Object.assign(output, { [key]: source[key] });
            }
        });
    }
    return output as T
}