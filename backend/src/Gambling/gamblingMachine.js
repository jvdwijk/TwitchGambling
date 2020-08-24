function spinGamble(coinValue, payline){
    var reelCharacters = [3];
    for (let i = 0; i < 3; i++) {
        reelCharacters[i] = getReel();
    }
    console.log(`Your results are:  ${reelCharacters[0]} - ${reelCharacters[1]} - ${reelCharacters[2]}`);
        
}

