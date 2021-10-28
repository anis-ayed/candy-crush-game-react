import blank from "../images/blank.png";

const checkRowsForFourSameColor = (width, currentColorArrangement, setCurrentScore) => {
    for (let i = 0; i < 64; i++) {
        const rowOfFourColors = [i, i + 1, i + 2, i + 3]
        const decidedColor = currentColorArrangement[i]
        const notValidCase = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]
        const isBlank = currentColorArrangement[i] === blank

        if (notValidCase.includes(i)) continue

        if (rowOfFourColors.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
            rowOfFourColors.forEach(square => currentColorArrangement[square] = blank)
            setCurrentScore(score => score + 4)
            return true
        }
    }
}

export default checkRowsForFourSameColor