import { ReelConfig, SlotsConfig } from "./slotMachineConfig";


export interface PhysicalSlot {
    slotNumber: number;
    character: number;
}

export default class Reel {

    private readonly reelInfo: ReelConfig;
    public readonly slots: SlotsConfig[];
    public readonly reelLength: number;

    public constructor(reelInfo: ReelConfig){
      this.reelInfo = reelInfo;
      this.slots = reelInfo.slots
      this.reelLength = this.calculateDigitalReelLength();
    }

    private calculateDigitalReelLength(): number{
      return this.slots.reduce(
          (total: number, current: SlotsConfig) => {
        return total + current.chance;
      }, 0);
    }

    public findPhysicalSlot(slotNumber: number): PhysicalSlot{
      let currentPosition = 0;

      for (let i = 0; i < this.slots.length; i++) {
        currentPosition += this.slots[i].chance;

        if(slotNumber <= currentPosition){
          return {"slotNumber": i, "character": this.slots[i].character};
        }
      }
      return null;
    }
  }
