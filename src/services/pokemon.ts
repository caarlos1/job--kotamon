import api, { pokeAPI } from "./api";
import type {
  PokeAbility,
  PokeAbilityInfo,
  PokeAPIData,
  PokeInfo,
  PokeLink,
} from "./types";

export class PokeAPI {
  public async get(page = 1, limit = 25): Promise<PokeInfo[]> {
    const pokeList: PokeLink[] = [];

    const pokeReq = (
      await api.get("/pokemon/", {
        baseURL: pokeAPI,
        params: {
          limit,
          offset: page * limit - limit,
        },
      })
    ).data as PokeAPIData;

    pokeList.push(...pokeReq.results);

    const pokeInfoList: PokeInfo[] = [];
    for (const poke of pokeList) {
      pokeInfoList.push((await api.get<PokeInfo>(poke.url)).data);
    }

    return pokeInfoList;
  }

  public async about(pokeId: number | string): Promise<PokeInfo> {
    return (
      await api.get<PokeInfo>(`/pokemon/${pokeId}`, {
        baseURL: pokeAPI,
      })
    ).data;
  }

  public async getPokeAbility(
    pokeAbilityUrls: string[]
  ): Promise<PokeAbility[]> {
    const pokeAbility: PokeAbility[] = [];

    for (const url of pokeAbilityUrls) {
      pokeAbility.push((await api.get<PokeAbility>(url)).data);
    }

    return pokeAbility;
  }
}
