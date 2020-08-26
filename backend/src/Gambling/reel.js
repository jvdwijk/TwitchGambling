const config = require("./gamblingConfig.json");

class Reel {

    _getDigitalReelLength(reelNumber){
      let reelSize = 0;
      for (let i = 0; i < config.reels[reelNumber].slots.length; i++) {
        reelSize += config.reels[reelNumber].slots[i].chance;
      }

      return reelSize;
    }

    _findPhysicalSlot(reelNumber, slotNumber){
      let currentPosition = 0;
      for (let i = 0; i < config.reels[reelNumber].slots.length; i++) {
        currentPosition += config.reels[reelNumber].slots[i].chance;

        if(slotNumber <= currentPosition){
          return i;
        }
      }
    }
    
  }
