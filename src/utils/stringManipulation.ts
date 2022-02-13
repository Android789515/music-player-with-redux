export const capitalize = (string: string) => {
    const firstLetter = string.charAt(0)
    const restOfString = string.slice(1)

    return firstLetter.toUpperCase() + restOfString
}