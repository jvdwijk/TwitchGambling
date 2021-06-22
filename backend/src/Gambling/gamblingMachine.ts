import config from './gamblingConfig.json'
import Reel, { PhysicalSlot } from './reel';
import {setLoop} from '../utils/mathUtils';
import { SlotmachineConfig } from './slotMachineConfig';

export interface GambleResult {
    characters: string[];
    slotNumbers: string[];

    coinsGained: number;
}

export default class GamblingMachine {

    private readonly reels: Reel[];
    private readonly options: SlotmachineConfig;

    private physicalSlots: PhysicalSlot[];

    public constructor() {
        this.options = config;
        this.reels = []
        for (let i = 0; i < this.options.reels.length; i++) {
            this.reels[i] = new Reel(this.options.reels[i])
        }
    }

    public spinGamble(coinValue: number, payline: number): GambleResult {
        this.physicalSlots = []
        const characters: string[] = []
        const characterNumbers: string[] = []
        for (let i = 0; i < this.options.reels.length; i++) {
            const digitalNumber = Math.floor(Math.random() * this.reels[i].reelLength)
            this.physicalSlots[i] = this.reels[i].findPhysicalSlot(digitalNumber)

            characters[i] = ` ${this.options.characters[this.physicalSlots[i].character]}`
            characterNumbers[i] = this.options.characters[this.physicalSlots[i].slotNumber]
        }

        const coinsGained = this.fullComboCheck(payline) * coinValue
        

        return {"characters": characters, "slotNumbers": characterNumbers, "coinsGained": coinsGained} 
    }

    private fullComboCheck(payline: number): number{
        let coinsGained = 0;
        if(payline - 1 > this.options.paylines.length){
            payline = this.options.paylines.length + 1
        }

        for (let i = 0; i < payline; i++) {
            const paylineCharacters = this.getPaylineCharacters(i)
            coinsGained += this.checkCombos(paylineCharacters)  
        }
        return coinsGained;
    }

    private getPaylineCharacters(paylineNumber: number): number[]{
        const paylineCharacters: number[] = []

        for (let i = 0; i < this.options.paylines[paylineNumber].length; i++) {
            const { slots } = this.reels[i];
            let position = this.physicalSlots[i].slotNumber + this.options.paylines[paylineNumber][i]
            
            position = setLoop(0, slots.length - 1, position)
            paylineCharacters[i] = slots[position].character
        }
        return paylineCharacters
    }

    private checkCombos(paylineCharacters: number[]): number{
        let coinsGained = 0
        this.options.combos.forEach(combo => {
            if(Array.isArray(combo.characters[0])){
                combo.characters.forEach(singleCombo => {
                    coinsGained += this.checkCombo(singleCombo, paylineCharacters, combo.value)
                })
            }
            else{
                coinsGained += this.checkCombo(combo.characters as number[], paylineCharacters, combo.value)
            }           
        });
        return coinsGained || 0
    }

    private checkCombo(combo: number[], paylineCharacters: number[], comboValue: number = 0): number{
        if(combo.toString() === paylineCharacters.toString()){
            return comboValue
        }
        
        const anyNumber = 6 
        const emptyNumber = 0
        
        let isCombo = true; 
        for (let i = 0; i < combo.length; i++) {
            const anyCheck = combo[i] === anyNumber && paylineCharacters[i] !== emptyNumber
            if(!anyCheck && combo[i] !== paylineCharacters[i]){
                isCombo = false;
            }
        }
        if(isCombo){
            return comboValue
        } 
        return 0
    }
}
