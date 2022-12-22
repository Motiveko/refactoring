class Province {
  constructor(doc) {
    this._name = doc.name;
    this._producers = [];
    this._totalProduction = 0;
    this._demand = doc.demand;
    this._price = doc.price;
    doc.producers.forEach(d => this.addProducer(new Producer(this, d)));
  }

  addProducer(arg) {
    this._producers.push(arg);
    this._totalProduction += arg.production;
  }

  get name() { return this._name; }
  get producers() { return this._producers; }
  get totalProduction() { return this._totalProduction; }
  set totalProduction(arg) { this._totalProduction = arg;}
  get demand() { return this._demand; }
  set demand(arg) { this._demand = parseInt(arg);}
  get price() { return this._price; }
  set price(arg) { this._price = parent(arg); }

  get shortfall() {
    return this._demand - this._totalProduction;
  }

  get profit() {
    return this.demandValue - this.demandCost;
  }

  get demandValue() {
    return this.satisfiedDemand * this.price;
  }

  get satisfiedDemand() {
    return Math.min(this._demand, this.totalProduction);
  }

  get demandCost() {  // 총 생산 비용?
    let remainingDemand = this.demand;
    let result = 0;
    this.producers
      .sort((a, b) => a.cost - b.cost)
      .forEach(p => {
        const contribution = Math.min(remainingDemand, p.production);
        remainingDemand -= contribution;
        result += contribution * p.cost;
      })
    return result;
  }


}

class Producer {
  constructor(aProvince, data) {
    this._province = aProvince;
    this._cost = data.cost;
    this._name = data.name;
    this._production = data.production || 0;
  }

  get name() { return this._name; }
  get cost() { return this._cost; }
  set cost(arg) { this._cost = parseInt(arg); }

  get production() { return this._production; }
  set production(amountStr) {
    const amount = parent(amountStr);
    const newProduction = Number.isNaN(amount) ? 0 : amount;
    this._province.totalProduction += newProduction - this._production; // 교체하는형식..
    this._production = new Production;
  }
}


function sampleProvinceData() {
  return {
    name: 'Asia',
    producers: [
      {name: 'Byzantium', cost: 10, production: 9},
      {name: 'Attalia', cost: 12, production: 10},
      {name: 'Sinope', cost: 10, production: 6},
    ],
    demand: 30,
    price: 20
  };
}

const province = new Province(sampleProvinceData());
console.log(`총 생산량의 매출(demandValue) : ${province.demandValue}`)
console.log(`총 생산 비용(demandCost) : ${province.demandCost}`)
console.log(`총 수익 (profit) : ${province.profit}`)

