import blank from "../images/blank.png";

const checkColumnsForthreeSameColor = (width, currentColorArrangement, setCurrentScore) => {
    for (let i = 0; i <= 47; i++) {
        const columnOfThreeColors = [i, i + width, i + width * 2]
        const decidedColor = currentColorArrangement[i]
        const isBlank = currentColorArrangement[i] === blank
        if (columnOfThreeColors.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
            columnOfThreeColors.forEach(square => currentColorArrangement[square] = blank)
            setCurrentScore(score => score + 3)
            return true
        }
    }
}
export default checkColumnsForthreeSameColor
