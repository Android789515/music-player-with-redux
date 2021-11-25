const getFormattedSongTime = (rawSongTime: number) => {
    if (rawSongTime === undefined) {
        return undefined
    }

    const seconds = Math.floor(rawSongTime)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)

    const formattedHours = String(hours).length < 2 ? `0${hours}` : hours
    const formattedMinutes = String(minutes % 60).length < 2 ? `0${minutes % 60}` : minutes % 60
    const formattedSeconds = String(seconds % 60).length < 2 ? `0${seconds % 60}` : seconds % 60

    return `${hours !== 0 ? `${formattedHours}:` : ''}${formattedMinutes}:${formattedSeconds}`
}

export { getFormattedSongTime }