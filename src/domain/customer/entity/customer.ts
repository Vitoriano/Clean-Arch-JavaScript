import Address from "./address";

export default class Customer {
  
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  changeName(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }
  
  get reawardPoints():number {
    return this._rewardPoints;
  }

  get id():string {
    return this._id;
  }

  get address(): Address {
    return this._address;
  }

  get active(): boolean {
    return this._active;
  }

  validate() { 
    if(this._id.length === 0 ) {
      throw new Error("Id is required");
    }
    if(this._name.length === 0 ) {
      throw new Error("Name is required");
    }
  }

  isActive(): boolean {
    return this._active;
  }

  activate() {
    if(this._address === undefined ) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  set address(address: Address){
    this._address = address;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }
  
}