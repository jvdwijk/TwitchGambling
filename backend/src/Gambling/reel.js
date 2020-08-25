const config = require("./gamblingConfig.json");

class Reel {
    
    constructor(reelNumber){
      this.reelNumber = reelNumber;
    }

    

    _getDigitalReelLength(){
      let reelSize = 0;
      for (let i = 0; i < config.reels[this.reelNumber].slots.length; i++) {
        reelSize += config.reels[this.reelNumber].slots[i].chance;
      }

      return reelSize;
    }

    _findPhysicalSlot(slotNumber){
      let currentPosition = 0;
      for (let i = 0; i < config.reels[this.reelNumber].slots.length; i++) {
        currentPosition += config.reels[this.reelNumber].slots[i].chance;

        if(slotNumber > currentPosition){
          //hap
        }
      }
    }
    
  }
