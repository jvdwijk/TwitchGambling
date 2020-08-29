class Reel {

    constructor(reelInfo){
      this.reelInfo = reelInfo;
      this.slots = reelInfo.slots
      this.reelLength = this._calculateDigitalReelLength();
    }

    _calculateDigitalReelLength(){
      let reelSize = 0;
      for (let i = 0; i < this.slots.length; i++) {
        reelSize += this.slots[i].chance;
      }

      return reelSize;
    }

    findPhysicalSlot(slotNumber){
      let currentPosition = 0;

      for (let i = 0; i < this.slots.length; i++) {
        currentPosition += this.slots[i].chance;

        if(slotNumber <= currentPosition){
          return {"slotNumber": i, "character": this.slots[i].character};
        }
      }
    }
  }

  module.exports = Reel