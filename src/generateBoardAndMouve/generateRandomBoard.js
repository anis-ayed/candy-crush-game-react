const generateRandomBoard = (width, candyColorsList, setCurrentColorArrangement) => {
    const randomColorsArrangement = []
    for (let i = 0; i < width * width; i++) {
        const randomIndexForZeroToFive = Math.floor(Math.random() * candyColorsList.length)
        const randomColor = candyColorsList[randomIndexForZeroToFive]
        randomColorsArrangement.push(randomColor)
    }
    setCurrentColorArrangement(randomColorsArrangement)
}
export default generateRandomBoard