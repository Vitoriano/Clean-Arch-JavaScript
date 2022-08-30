export default class Address {
  
  private _street: string;
  private _number: string;
  private _zipcode: string;
  private _city: string;

  constructor(street: string, number: string, zipcode: string, city: string) {
    this._street = street;
    this._number = number;
    this._zipcode = zipcode;
    this._city = city;
  }

  get street (): string {
    return this._street;
  }

  get number (): string {
    return this._number;
  }

  get zipcode (): string {
    return this._zipcode;
  }

  get city (): string {
    return this._city;
  }

  validate() {
    if(this._street.length === 0 ) {
      throw new Error("Street is required");
    }
    //...
  }

  toString(): string {
    return `${this._street}, ${this._number}, ${this._zipcode} ${this._city}`;
  } 
}