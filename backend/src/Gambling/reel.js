class Reel {

    constructor(reelInfo){
      this.reelInfo = reelInfo;
    }

    getDigitalReelLength(){
      let reelSize = 0;
      for (let i = 0; i < this.reelInfo.slots.length; i++) {
        reelSize += this.reelInfo.slots[i].chance;
      }

      return reelSize;
    }

    _findPhysicalSlot(slotNumber){
      let currentPosition = 0;

      for (let i = 0; i < this.reelInfo.slots.length; i++) {
        currentPosition += this.reelInfo.slots[i].chance;

        if(slotNumber <= currentPosition){
          return i;
        }
      }
    }
    
  }
