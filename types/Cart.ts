import type { ApiMenuItemChoice } from "types";

export interface CartMenuItemChoiceInput extends ApiMenuItemChoice {
  count: number | null;
}

export interface CartMenuItemChoice extends ApiMenuItemChoice {
  count: number;
}

export type CartMenuItemChoicesInput = Record<
  /**
   * The category name
   */
  string,
  Array<CartMenuItemChoiceInput>
>;

export type CartMenuItemChoices = Record<
  /**
   * The category name
   */
  string,
  Array<CartMenuItemChoice>
>;

export interface CartMenuItem {
  category: string | null;
  choices?: CartMenuItemChoices;
  /**
   * The number of this exact item that have been added
   */
  count: number;
  mealPrice: number;
  name: string;
  optionalChoices?: CartMenuItemChoices;
}

export type ShippingMethod = "delivery" | "pickup";

export interface Cart {
  items: CartMenuItem[];
  restaurant: string;
}
