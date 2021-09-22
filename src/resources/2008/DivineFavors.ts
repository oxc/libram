import { get } from "../../property";
import { $items, $skill } from "../../template-string";
import { have as _have } from "../../lib";

export const summonSkill = $skill`Summon Party Favor`;
const commonItems = $items`divine blowout, divine can of silly string, divine noisemaker`;
const rareItems = $items`divine champagne flute, divine champagne popper, divine cracker`;

/**
 * @returns true if the player can Summon Party Favors
 */
export function have(): boolean {
  return _have(summonSkill);
}

/**
 * @returns map containing the chance of an item to be summoned
 */
export function expected(): Map<Item, number> {
  const rareSummons = get("_favorRareSummons");
  const rareChance = 1.0 / 2 ** (rareSummons + 1);

  const results = new Map<Item, number>();
  rareItems.forEach((item) => results.set(item, rareChance / rareItems.length));
  commonItems.forEach((item) =>
    results.set(item, (1.0 - rareChance) / commonItems.length)
  );
  return results;
}
