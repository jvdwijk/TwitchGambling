export function setLoop(bottomValue: number, maxValue: number, currentValue: number): number {
    if(currentValue < bottomValue) {
        currentValue = maxValue
    } 
    else if(currentValue > maxValue) {
        currentValue = bottomValue
    }
    return currentValue 
}