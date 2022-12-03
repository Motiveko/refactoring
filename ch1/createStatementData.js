function createStatementData(invoice, plays) {
  const statementData = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);
  return statementData;
  function enrichPerformance(aPerformance) {
    const result = Object.assign({}, aPerformance); // 얕은 복사
    const calculator = createPerformanceCalculator(result, playFor(result));
    result.play = playFor(result);
    result.amount = calculator.amount;
    result.volumeCredits = calculator.volumeCredits;
    return result;

  }
  /** js는 생성자가 서브클래스의 인스턴스를 반환할 수 없기 때문에 이런식으로 팩토리 함수로 생성자를 대체해야한다. */
  function createPerformanceCalculator(aPerformance, aPlay) {
    switch(aPlay.type) {
      case "tragedy": return new TragedyCalculator(aPerformance, aPlay);
      case "comedy": return new ComedyCalculator(aPerformance, aPlay);
      default: 
        throw new Error(`알 수 없는 장르: ${aPlay.type}`);
    }
  }
  
  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }
  
  function totalAmount(data) {
    return data.performances.reduce((total, {amount}) => total + amount, 0);
  }

  function totalVolumeCredits(data) {
    return data.performances.reduce(
      (total, {volumeCredits}) => total + volumeCredits,
      0,
    );
  }
}

class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance;
    this.play = aPlay;
  }

  get amount() {
    let result = 0;
    switch (this.play.type) {
      case 'tragedy':
        result = 40000;
        if (this.performance.audience > 30) {
          result += 1000 * (this.performance.audience - 30);
        }
        break;
      case 'comedy':
        result = 30000;
        if (this.performance.audience > 20) {
          result += 10000 + 500 * (this.performance.audience - 20);
        }
        result += 300 * this.performance.audience;
        break;
      default:
        throw new Error(`알 수 없는 장르: ${this.performance.play.type}`);
    }
    return result;
  }

  get volumeCredits() {
    let volumeCredits = 0;
    volumeCredits += Math.max(this.performance.audience - 30, 0);
    // 희극 관객 5명마다 추가 포인트를 제공한다.
    if ('comedy' === this.play.type) {
      volumeCredits += Math.floor(this.performance.audience / 5);
    }
    return volumeCredits;
  }
}
class TragedyCalculator extends PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    super(aPerformance, aPlay);
  }
}

class ComedyCalculator extends PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    super(aPerformance, aPlay);
  }
}

export {createStatementData}