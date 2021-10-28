import blank from "../images/blank.png";

const checkColumnsForFourSameColor = (width, currentColorArrangement, setCurrentScore) => {
    for (let i = 0; i <= 39; i++) {
        const columnOfFourColors = [i, i + width, i + width * 2, i + width * 3]
        const decidedColor = currentColorArrangement[i]
        const isBlank = currentColorArrangement[i] === blank
        if (columnOfFourColors.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
            columnOfFourColors.forEach(square => currentColorArrangement[square] = blank)
            setCurrentScore(score => score + 4)
            return true
        }
    }
}
export default checkColumnsForFourSameColor