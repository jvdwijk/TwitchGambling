export interface SlotsConfig{
    character: number;
    chance: number;
} 

export interface ReelConfig {
    slots: SlotsConfig[];
}

export interface ComboConfig {
    characters: number[] | number[][];
    value: number;
}

export interface SlotmachineConfig {
    characters: string[];
    paylines: number[][];

    combos: ComboConfig[];

    reels: ReelConfig[];

}