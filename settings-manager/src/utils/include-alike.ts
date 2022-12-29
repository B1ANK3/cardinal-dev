// Adapted from deep-merge
export function isObject(item: any): boolean {
  return item && typeof item === "object" && !Array.isArray(item)
}

/**
 * Works the same as deep merge but only includes props that are in both target and source
 */
export default function includeAlike<T>(
  target: { [key: string]: any },
  source: { [key: string]: any }
) {
  let output: { [key: string]: any } = {}

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (key in target) {
        if (isObject(source[key]))
          output[key] = includeAlike(target[key], source[key])
        else output[key] = source[key]
      }
    }
  }

  return output as T
}
