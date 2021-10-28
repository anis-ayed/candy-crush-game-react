import blank from "../images/blank.png";

const checkRowsForthreeSameColor = (width, currentColorArrangement, setCurrentScore) => {
    for (let i = 0; i < 64; i++) {
        const rowOfThreeColors = [i, i + 1, i + 2]
        const decidedColor = currentColorArrangement[i]
        const notValidCase = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
        const isBlank = currentColorArrangement[i] === blank
        if (notValidCase.includes(i)) continue
        if (rowOfThreeColors.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
            rowOfThreeColors.forEach(square => currentColorArrangement[square] = blank)
            setCurrentScore(score => score + 3)
            return true
        }
    }
}

export default checkRowsForthreeSameColor