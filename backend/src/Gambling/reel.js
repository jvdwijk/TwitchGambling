class Reel {

    constructor(reelInfo){
      this.reelInfo = reelInfo;
      this.reelLength = this._calculateDigitalReelLength();
    }

    _calculateDigitalReelLength(){
      let reelSize = 0;
      for (let i = 0; i < this.reelInfo.slots.length; i++) {
        reelSize += this.reelInfo.slots[i].chance;
      }

      return reelSize;
    }

    findPhysicalSlot(slotNumber){
      let currentPosition = 0;

      for (let i = 0; i < this.reelInfo.slots.length; i++) {
        currentPosition += this.reelInfo.slots[i].chance;

        if(slotNumber <= currentPosition){
          return {"slotNumber": i, "character": this.reelInfo.slots[i].character};
        }
      }
    }
  }

  module.exports = Reel