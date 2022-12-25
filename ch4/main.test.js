import { Province, sampleProvinceData } from "./main"

describe('province', function() {

  let asia;

  beforeEach(function() {
    // given
    asia = new Province(sampleProvinceData()); // 표준 fixture 설정
  })

  it('shortfall', function() {
    expect(asia.shortfall).toBe(5); // 검증(여기서는fixture의 속성)
  })

  it('profit', function() {
    expect(asia.profit).toBe(230);
  })

  it('change production', function() {
    // when
    asia.producers[0].production = 20;  
    // then
    expect(asia.shortfall).toBe(-6);
    expect(asia.profit).toBe(292)
  })

  it('zero demand', function() {
    asia.demand = 0;
    expect(asia.shortfall).toBe(-25);
    expect(asia.profit).toBe(0);
  })

  it('negative demand', function() {
    asia.demand = -1;
    expect(asia.shortfall).toBe(-26);
    expect(asia.profit).toBe(-10);
  })

  it('empty string demand', () => {
    asia.demand = '';
    expect(asia.shortfall).toBeNaN();
    expect(asia.profit).toBeNaN();
  })
})

describe('no producers', function() {
  let noProducers;
  beforeEach(function() {
    const data = {
      name: "No producers",
      producers: [],
      demand: 30,
      price: 20
    };
    noProducers = new Province(data);
  })

  it('shorfall', function() {
    expect(noProducers.shortfall).toBe(30);
  })

  it('profit', function() {
    expect(noProducers.profit).toBe(0);
  })
})

describe('string for producers', function() {
  it('', function() {
    const data = {
      name: "String producers",
      producers: "",
      demand: 30,
      price: 20
    };
    const prov = new Province(data);
    expect(prov.shortfall).equal(0)
  })
})