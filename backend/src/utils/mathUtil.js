class MathUtil {

    static setLoop(bottomValue, maxValue, currentValue) {
        if(currentValue < bottomValue)
            currentValue = maxValue
        else if(currentValue > maxValue)
            currentValue = bottomValue
        return currentValue 
    }

}

module.exports = MathUtil