export interface PokeLink {
  name: string;
  url: string;
}

export interface PokeAbility {
  id: number;
  name: string;
  effect_entries: {
    short_effect: string;
  }[];
}

export interface PokeAbilityInfo {
  ability: {
    name: string;
    url: string;
  };
}

export interface PokeInfo {
  id: number;
  name: string;
  abilities: PokeAbilityInfo[];
  types: {
    slot: number;
    type: {
      name: string;
    };
  }[];
  sprites: {
    front_default: string;
  };
}

export interface PokeAPIData {
  results: PokeLink[];
}
