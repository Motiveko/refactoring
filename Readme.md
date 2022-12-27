# Refactoring 2판
## 학습방법
- 리팩토링 책을 따라서 코드 작성 - 리팩토링 - 커밋(코드와 함께 리팩토링한 내용을 Readme 추가)

## 리팩터링 카탈로그(ch 6~12)
## [6. 기본적인 리팩터링](#6-기본적인-리팩터링-1)
  - ### [6.1 함수 추출하기](#61-함수-추출하기-1)
  - ### [6.2 함수 인라인하기](#62-함수-인라인하기-1)
  - ### [6.3 변수 추출하기](#63-변수-추출하기-1)
  - ### [6.4 변수 인라인하기](#64-변수-인라인하기-1)
  - ### [6.5 함수 선언 바꾸기](#65-함수-선언-바꾸기-1)
  - ### [6.6 변수 캡슐화하기](#65-변수-캡슐화하기-1)
  - ### [6.7 변수 이름 바꾸기](#67-변수-이름-바꾸기-1)
  - ### [6.8 매개변수 객체 만들기](#68-매개변수-객체-만들기-1)
  - ### [6.9 여러 함수를 클래스로 묶기](#69-여러-함수를-클래스로-묶기-1)
  - ### [6.10 여러 함수를 변환 함수로 묶기](#610-여러-함수를-변환-함수로-묶기-1)
  - ### [6.11 단계 쪼개기](#611-단계-쪼개기-1)




<br>

## 1. 리팩터링 첫 번째 예시
### 1.4 statement() 함수 쪼개기
- 함수 추출하기
  - 함수를 추출할 땐 유효범위를 벗어나는 변수를 확인하고, 이를 매개변수로 전달한다.(IDE에서 보통 해준다)
  - 매개변수의 역할이 뚜렷하지 않을 때 부정관사(a/an)을 붙인다.(performance => aPerformance)

<br>

- 로컬 임시 변수 제거하기
  - ***로컬 범위에 존재하는 이름이 늘어나면, 나중에 추출 작업이 복잡해진다.***
  - 임시 변수를 `질의 함수`로 바꾼다.
  - 임시 변수가 쓰이는 곳도 ***질의 함수로 변수 인라인하기***를 적용한다.(즉 변수선언하지 않고 질의함수를 인라인으로 호출하는식으로 쓰자는 것.)
    > 🤔 솔직히 질의함수를 인라인으로 쓰는건 잘 이해는 안된다. 변수를 안쓰고 함수를 쓰면 가독성이 떨어지고, 퍼포먼스에도 좋지 않을텐데? => 근데 복잡한 함수를 추출할 땐 확실히 편하긴하다.

<br>

- format 함수 제거
  - format 함수는 임시 변수에 함수를 할당한 형태다. 임시변수는 제거해야한다.
  ```js
  // AS-IS
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format;
  
  format(somethig / 100);

  // TO-BE
  function usd(aNumber) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(aNumber / 100)
  }
  ```
  - 함수 이름 짓기는 매우 중요하다. 함수 본문을 읽지 않고도 무슨 일을 하는지 알 수 있도록 해야 한다.
  - 이 함수의 핵심은 **화폐 단위 맞추기**다. 이름을 `usd()`라고 변경하고, 단위 변환 로직도 포함하였다.
    - Intl.NumberFormat().format 함수의 사용을 매우 좁게 해서 명확한 역할을 가지게 했다고 볼 수 있을듯..

<br>


- 반복문 쪼개기
  - for문 내에서 volumeCredits을 계산해서 계속 임시 로컬 변수에 누적하는 코드에서, 로컬 변수를 제거하는건 어렵다. 어떻게 해야 할까?

    1. 로컬 변수를 제거하려면, ***`반복문 쪼개기`를 통해 for문 내 volumeCredit 계산 부분만 분리한 for문을 만들어 줘야 한다!***
    ```js
    // AS-IS
    for (let perf of invoice.performances) {
      playFor(perf);
      amountFor(perf);
      volumeCredits += volumeCreditsFor(perf);
      result += `${playFor(perf).name}: ${usd(amountFor(perf))} (${
        perf.audience
      }석)\n`;
      totalAmount += amountFor(perf);
    }
    // TO-BE
    for (let perf of invoice.performances) {
      playFor(perf);
      amountFor(perf);
      result += `${playFor(perf).name}: ${usd(amountFor(perf))} (${
        perf.audience
      }석)\n`;
      totalAmount += amountFor(perf);
    }

    for (let perf of invoice.performances) {
      volumeCredits += volumeCreditsFor(perf);  
    }
    ```

    <br>

    2. 그 뒤 `문장 슬라이드하기`를 통해 `volumeCredits`변수 선언을 쪼갠 반복문 바로 앞으로 옮겨준다.
    ```js
    let volumeCredits = 0;
    for (let perf of invoice.performances) {
      volumeCredits += volumeCreditsFor(perf);  
    }
    ```

    <br>

    3. volumeCredits 선언과 갱신이 한데 모이면 `임시 변수를 질의 함수로 바꾸기`가 쉬워진다. totalVolumeCredtis 함수를 이용하자.
    ```js
    const volumeCredits = totalVolumeCredits();

    function totalVolumeCredits() {
      let volumeCredits = 0;
      for (let perf of invoice.performances) {
        volumeCredits += volumeCreditsFor(perf);
      }
      return volumeCredits;
    }
    ```
    4. `volumeCredits` 변수를 제거하고 `변수를 인라인`한다.
    ```js
    // const volumeCredits = totalVolumeCredits();  // 제거..
    result += `적립 포인트: ${totalVolumeCredits()}점\n`;
    ```

  - `반복문 쪼개기`는 for문을 두번 도는 꼴이라 성는이 떨어질 수 있다. 하지만 대부분의 경우 이런건 무시해도 되는수준이다. 잘 다듬어진 코드는 이후 성능 개선과 같은 다른 작업을 하기 수월해진다. 따라서 **특별한 경우가 아니라면 성능 문제는 무시하고 리팩터링을 잘 한 뒤 성능이 문제가 되는 부분을 찾아 개선하는게 좋다.**
  - 똑같이 반복문을 통해 누적하는 `totalAmount`변수도 동일한 방식으로 리팩토링 할 수 있다.

<br>

### 1.5 중간 점검:난무하는 중첩 함수
- statement() 함수는 단 일곱줄이고, 출력할 문장을 생성하는 일만 한다. 나머지 계산 로직은 여러개의 보조함수가 처리하고 있기 때문에, 전체 흐름을 보기 쉬워졌다.

<br>

### 1.6 계산 단계와 포맷팅 단계 분리하기
- `statement()`의 HTML 출력 버전을 만들려면 어떻게 해야 할까? statement() 함수를 복-붙 하고싶지는 않다.
- `단계 쪼개기`를 통해서 가능하다. 
    1. 첫 번째 단계 `statement()`에서는 필요한 데이터를 처리한다.
    2. 다음 단계에서 결과를 text / HTML 로 표현한다.
  - 즉, 첫째 단계는 두번째 단계로 전달할 중간 데이터 구조를 생성하는것이다!


<br>

### 1.7 중간 점검: 두 파일(과 두 단계)로 분리됨
- 코드량은 많이 늘어났다. 간결함이 지혜의 정수일지 몰라도, ***프로그래밍에서만큼은 명료함이 진화할 수 있는 소프트웨어의 정수다.***

<br>

### 1.8 다형성을 이용해 계산 코드 재구성하기
- 공연료와 적립 포인트 계산은 장르에 따라 변한다. 장르가 추가되면 `amountFor()`, `volumeCreditsFor()`함수의 조건부 로직을 수정해야한다.
- 객체지향에서는 보통 다향성(polymorphism)을 활용해서 이런 조건부 로직을 처리한다.
  - superclass 아래에 여러 조건에 대한 subclass들을 생성하고 로직을 subclass에 구현하는것이다.
  - 공통 로직은 superclass에 넣어준다.(ex `ComedyCalculator.volumeCredits`)
  - 자바스크립트에서는 생성자가 sub class의 인스턴스를 반환할 수 없기 때문에 `생성자를 팩토리 함수로 바꾸기`를 적용해야한다.

<br>

### 1.9 상태점검: 다형성을 활용하여 데이터 생성하기
- 다형성을 활용하여 공연료, 적립포인트 게산 로직을 서브클래스에 위임했다.
  - 새로운 장르가 추가되면 새로운 서브클래스를 만들고 `createPerformanceCalculator()`에 추가하면 된다.
- `createStatementData()`가 `PerformanceCalculator` 객체를 직접 반환하는 형태도 괜찮다. 자바스크립트는 ***class의 getter와 객체 프로퍼티 접근 방식의 코드가 같기 때문에 사
용하는 쪽에서 같은 문법으로 사용 가능해지기 때문이다.***(`data.amount === calculator.amount`)

<br>

### 1.10 마치며
- **좋은 코드를 가늠하는 확실한 방법은 '얼마나 수정하기 쉬운가'다.** 수정해야 할 상황이 되면 고쳐야 할 곳을 쉽게 찾고, 오류 없이 빠르게 수정가능해야한다.
- 리팩터링을 효과적으로 하는 핵심은 **단계를 잘게 나눠야 더 빠르게 처리할 수 있고, 코드는 절대 깨지지 않으며, 작은 단계가 모여 결국 큰 변화를 이룬다는 사실**이다.

<br>

## 2. 리팩터링 원칙
### 2.1 리팩터링 정의
#### 소프트웨어의 ***겉보기 동작***은 그대로 유지한 채 코드를 이해하고 수정하기 쉽도록 내부 구조를 변경하는 기법
- 리팩터링은 결국 ***동작을 보존하는 작은 단계***를 거쳐 코드를 수정하여 큰 변화를 만들어내는 일로, '리팩터링하다 코드가 깨져서...' 라는 말을 한다면 리팩터링한 것이 아니다!
- '겉보기 동작이 유지된다'는 말은 리팩터링 전 후로 코드가 똑같이 동작해야 하고, 사용자 관점에서 달라지는게 없어야한다는 것이다. **'인터페이스가 달라진다'**는 말과는 다르다. 인터페이스는 `함수 선언 바꾸기` 같은걸로 바뀔 수 있다.

<br>

### 2.2 두 개의 모자
- 개발할 때 목적이 '기능 추가'냐 '리팩터링'이냐를 명확하게 구분해야 한다. 기능을 추가하기로 맘먹었으면 리팩터링은 하지 말고 오로지 기능추가에만 전념하자. 반대의 경우도 마찬가지.(이게 날잡고 하는게 아니라 commit 단위 정도를 말하는것 같다!)
- 원칙적으로 테스트 코드는 '기능 추가'시에만 하고 '리팩터링'에서는 이를 사용하기만 해야 한다. 인터페이스 변경이 있을때만 테스트를 수정한다.

<br>

### 2.3 리팩터링하는 이유
- 리팩터링하면 소프트웨어 설계가 좋아진다. 
  - 기본적으로 중복코드가 줄어드는데, 이는 설계 개선 작업의 중요한 축이다.
- 리팩터링하면 소프트웨어를 이해하기 쉬워진다.
  - 프로그래밍에서는 사람이 젤 중요하다. 코드를 이해하기 쉽게 만들어야 하는 것이다. (팀원이, 미래의 내가)
  - 개발 중간중간 잠깐 시간내서 리팩터링을 하자. 이를 통해 코드의 목적이 더 명확하게 전달되도록 개선한다.
- 리팩터링하면 버그를 쉽게 찾을 수 있다.
  - 코드가 하는 일을 깊이 파악하게 되고, 버그까지 찾아낸다. 습관이 중요하다.
- 리팩터링하면 프로그래밍 속도를 높일 수 있다.
  - **모듈화가 잘 되어 있으면, 전체 코드베이스 중 작은 일부만 이해하면 된다.** 새로운 기능을 추가하기가 쉬워게 된다.

<br>

### 2.4 언제 리팩터링해야 할까
- 새로 기능을 추가하기 전
  - 새 기능을 추가 전에 구조를 살짝 바꾸면 작업이 편해질 지점을 찾는다. 복/붙을 하지 않아도 되게끔
- 코드를 이해하기 쉽게 만들기
  - 말 그대로 코드를 보는사람이 이해하기 쉽게 하기 위한 목적으로 **이해를 위한 리팩터링**을 할 수 있다.
  - 변수는 적절한 이름으로, 긴 함수는 잘게 나누고, ... 
  - 코드를 분석할 때 리팩터링 해보면 그렇지 않았다면 도달하지 못했을 깊은 수준까지 이해하게 된다.

- 쓰레기 줍기 리팩터링
  - 코드를 파악하다보면 발견하는 비효율적인 부분을 리팩터링한다. 변수 중복이라던가, 똑같은 동작의 함수의 중복선언이라던가.. 이런걸 제거하는 리팩터링이다.


<br>

## 4. 테스트 구축하기
### 4.4 테스트 추가하기
- 어떤 사람은 모든 public 메서드를 빠짐없이 테스트한다. 이는 좋지 않을 수 있다. 
- 테스트 목적은 버그를 찾는데 있는데, getter/setter 같은건 버그가 있을 일이 없다고 봐도 된다. 너무 많은 테스트를 만들다 보면 중요한 테스트를 놓치기 십상이다!
- ***잘못될까봐 가장 걱정되는 영역을 집중적으로 테스트하자!***

<br>

- 테스트는 반드시 한번 실패시키자. 이미 잘 되는 코드에 테스트 추가할때도 `expect`값을 먼저 에러를 내면서 올바른 값을 얻고 그 뒤 테스트 코드를 고치는 식으로.

<br>

### 4.5 픽스처 수정하기
- `given-when-then`, `setup-exercise-verify`, `arrange-act-assert`로 불리는 패턴으로 테스트를 수행한다. 
- `beforeEach`에서 표준 픽스처를 만들고(`given`) 이를 수정하고(`when`), 단언해본다(`then`).

<br>

### 4.6 경계 조건 검사하기
- 이전 테스트는 모든 일이 순조롭고 사용자도 우리의 의도대로 사용하는 `꽃길 테스트`였다. **이 범위를 벗어나는 경계 지점에서 문제가 생기면 어떤일이 벌어질지 테스트를 해야**한다.
```js
it('negative demand', function() {
  asia.demand = -1;
  expect(asia.shortfall).toBe(-26);
  expect(asia.profit).toBe(-10);
})
```
- 수요가 음수인 경우를 테스트한다. 테스트를 작성하고 나면 아래와 같은 의문이 들어야한다.
  - 수요가 음수일 때 수익이 음수가 나오는게 말이 되나?
  - 수요가 음수인게 말이 되나? 최솟값은 0이어야 하지 않나?
  - 수요 세터에 음수가 전달되면, 에러를 던지거나 무조건 0으로 설정해야 하지 않을까?
- 이처럼 ***문제가 생길 가능성이 있는 경계 조건을 생각해보고 그 부분을 집중 테스트한다.***
- UI에서 값을 받는 프로그램이므로 empty string이 넘어올 수도 있다. 
```js
it('empty string demand', () => {
  asia.demand = '';
  expect(asia.shortfall).toBeNaN();
  expect(asia.profit).toBeNaN();
})
```

<br>

- NaN이 나오면 문제가 있는 코드일 것이다. ***스스로 작성한 코드를 의식적으로 망가뜨리는 방법을 모색하면서 테스트하자!***

<br>

- 생산자 수 필드에 문자열을 넣으면?
```js
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

// TypeError: doc.producers.forEach is not a function
```
- 에러가 난다. 어떤 프레임워크는 실패와 에러를 다르게 처리하는데, jest는 그냥 모두 `failed`로 처리한다.
- ### 이런 특이한 경계 조건들을 처리하는건 좀 생각해볼 부분이 있다.
  1. 입력 객체가 신뢰할 수 있는 같은 코드베이스에서 만들어주는 경우
     - ***굳이 너무 많은 유효성 감사를 하지 않는다.*** 왜냐면 이런 유효성 검사를 생성하는 코드, 소비하는 코드 등에서 중복으로 하게 되기 때문.
  2. 입력 객체가 외부 api라던가.. 신뢰할 수 없는 곳에서 오는 경우
      - ***유효성 검사를 해야 한다. 따라서 테스트도 작성되어야 한다.*** 이후 에러 메시지를 보여주거나 기본값(빈 배열, 0, 빈 문자열)을 넣게 하거나 하는 처리를 한다.

<br>

### 4.7 끝나지 않은 여정
- 한번에 완벽한 테스트를 갖출수는 없다. 테스트도 계속 보강해야 한다. 
- 새로운 테스트를 추가하기도 하고, 기존 테스트가 명확한지, 더 이해하기 쉽게 리팩토링 할 건 없는지, 제대로 작동하는지 계속 확인한다.
- ***버그를 발견하면 버그를 명확히 잡아내는 테스트부터 작성하자.***

<br>

## 6. 기본적인 리팩터링

### 6.1 함수 추출하기
- 반대 리팩터링: `함수 인라인하기`

<br>

### 6.1.1 설명
- 함수 추출하는 기준에 대한 여러 의견이 있다. 길이 기준, 재사용성 기준, 두번 이상 쓰일건 추출<->한번쓰이는건 인라인상태로
- ### ***목적과 구현을 분리***하는 방식이 가장 합리적이다. 즉 코드를 보고 무슨일을 하는지 알아보기 쉽게 하는것을 목표로 하는 것이다. => `무슨 일`에 걸맞는 이름의 함수로 분리한다.
  - 길이는 중요하지 않다. 그냥 다른 메서드를 구현하는 메서드도 있다. 
    - 흑백 시스템에서 코드의 하이라이트 기능은 흑백을 반전하는 방법밖엔 없었다. 내부적으로 `highlight()`는 단지 `reverse()`라는 메서드를 호출하는 함수였다. 하지만 이 함수의 역할은 결국 `코드의 하이라이트`라는 기능을 수행하는것이므로 이런 리팩토링은 유의미하다.
- 가장 중요한건 `함수의 이름짓기`이다. 이걸 잘못하면 `highlight()`라는 함수를 추출한건 복잡도만 올리는 짓이 되는것이다.

<br>

### 6.1.2 절차
  1. 함수를 새로 만들고 목적을 잘 드러내는 이름 붙이기
  2. 추출할 코드를 원본 함수에서 복사해서 새 함수에 붙여넣기
  3. 추출 한 코드 중 `원본 함수의 지역 변수`를 참조하거나 추출한 함수의 `유효범위를 벗어나는 변수`는 `매개변수`로 전달하기
      - 중첩함수는 문제가 없다.
      - 일반적으로 함수의 `매개변수`와 `지역변수` 모두 매개변수로 전달하나, 값이 바뀌지 않는 변수(매개변수?)는 그냥 참조한다.
      - 추출한 함수에서만 사용하는 변수가 추출한 함수 밖에 선언되어 있다면 내부로 옮긴다.
      - 추출한 코드 안에서 값이 바뀌는 변수 중에서 값으로 전달되는 것들은 주의해서 처리한다.
      - 추출한 코드에서 값을 수정하는 지역 변수가 너무 많다면, `변수 쪼개기`나 `임시 변수를 질의 함수로 바꾸기`를 해서 변수를 사용하는 코드를 단순하게 바꾼 뒤 함수추출한다.
  4. 컴파일해서 에러 없는지 확인한다.(타입스크립트)
  5. 원본 함수에서 추출한 함수를 호출하도록 바꾼다.
  6. 테스트한다.
  7. 다른 코드에서 추출한 함수와 똑같거나 비슷한게 없는지 찾아보고, 있다면 이 함수를 재활용할지 검토해본다.

<br>

### 6.1.3 예시
```js
// 원본 코드
function printOwing(invoice) {
  let outstanding = 0;
  console.log('*****************');
  console.log('**** 고객 채무 ****');
  console.log('*****************');

  // 미해결 채무(outstanding)를 계산한다.
  for(const o of invoice.orders) {
    outstanding += o.amount;
  }

  const today = Clock.today;
  invoicde.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);

  console.log(`고객명: ${invoice.customer}`);
  console.log(`채무액: ${outstanding}`)
  console.log(`마감일: ${invoicde.dueDate.toLocaleDateString()}`)
}

// refactoring
function printOwing(invoice) {

  printBanner();
  const outstanding = calculateOutstanding(invoice);  
  recordDueDate(invoice);
  printDetails(invoice, outstanding);

  // 3. 지역 변수의 값을 변경할 때( outstanding += o.amount )
  function calculateOutstanding(invoice) {
    let result = 0;
    for (const o of invoice.orders) {
      result += o.amount;
    }
    return result;  // 새 변수를 선언하고 이를 반환하도록 하였다.
  }

  // 2. 지역 변수를 사용할 때(객체 변경)
  function recordDueDate(invoice) {
    const today = Clock.today;
    invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
  }

  // 2. 지역 변수를 사용할 때
  function printDetails(invoice, outstanding) {
    console.log(`고객명: ${invoice.customer}`);
    console.log(`채무액: ${outstanding}`);
    console.log(`마감일: ${invoice.dueDate.toLocaleDateString()}`);
  }

  // 1. 유효 범위를 벗어나는 변수가 없을 때
  function printBanner() {
    console.log('*****************');
    console.log('**** 고객 채무 ****');
    console.log('*****************');
  }
}
```
- 3.의 경우와 같이 값을 반환하는데, 여러개의 변수를 반환해야 한다면 어떻게 해야 할까?
  - 레코드로 묶어서 반환하거나(내가 선호)
  - 하나씩 반환하는 함수를 분리하거나(저자 선호)

<br>

### 6.2 함수 인라인하기
- 반대 리팩터링: `함수 추출하기`

<br>

### 6.2.1 설명
- 때로는 함수 본문이 함수 이름만큼 명확한 경우가 있다. 쓸데 없는 간접 호출은 거슬리기 때문에 다시 인라인한다.
- 보통 과도한 함수 추출을 되돌리는 과정에서 하는 리팩토링인 듯 하다.

<br>

### 6.2.2 절차
1. 다형 메서드인지 확인한다.
    - **서브클래스에서 오버라이드하는 메서드은 인라인하면 안된다.**
2. 인라인 할 함수를 **호출하는 곳을 모두 찾는다.**
3. 호출문을 하나씩 함수 본문으로 교체한다.
4. 교체할 때마다 테스트한다.
5. 함수를 삭제한다.

<br>

### 6.2.3 예시
```js
// 원본
function getRating(driver) {
  return moreThanFiveLateDeliveries(driver) ? 2 : 1
}
function moreThanFiveLateDeliveries(driver) {
  return driver.numberOfLateDeliveries > 5;
}

// 함수 인라인
function getRating(driver) {
  return (driver.numberOfLateDeliveries > 5) ? 2 : 1
}
```
- 아주 간단한 예시다. 애초에 간단하지 않은 함수는 인라인 해서는 안되는것이다.

<br>

### 6.3 변수 추출하기
- 반대 리팩터링: `변수 인라인하기`

<br>

### 6.3.1 설명
- 표현식이 너무 복잡해서 눈에 안들어오고 이해하기 어려울 때가 있다. 이 때 `지역 변수`를 활용해 표현식을 쪼개서 관리하면 더 보기 쉽다. 코드의 단계마다 이름을 붙일 수 있어 코드의 목적을 훨씬 명확하게 드러낼 수 있다.
- 디버깅시에도 중단점을 지정할 수 있어 작업이 훨씬 수월해진다.
- 표현식이 현재 함수 안에서만 의미가 있다면 `변수`로 추출하고, 다른 문맥에서도 의미가 된다면 `함수`로 추출해야 한다.

### 6.3.2 절차
1. 추출하려는 표현식에 부작용은 없는지 확인한다.
2. 불변 변수를 선언하고 이름을 붙일 표현식의 복제본을 대입
3. 원본 표현식을 새로 만든 변수로 교체
4. 테스트
5. 해당 표현식이 중복해서 사용되는곳을 새로운 변수로 교체하고 테스트한다.

### 6.3.3 예시
- 간단한 예시
```js
// 원본
function price(order) {
  return (
    order.quantity * order.itemPrice -
    Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
    Math.min(order.quantity * order.itemPrice * 0.01, 100)
  );
}

// 변수 추출하기
function price(order) {
  const basePrice = order.quantity * order.itemPrice;
  const quantityDiscount =
    Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
  const shipping = Math.min(order.quantity * order.itemPrice * 0.01, 100);
  return basePrice - quantityDiscount + shipping;
}
```

<br>

- 클래스 안에서의 변수 추출
```js
// 원본
class Order {
  constructor(aRecord) {
    this._data = aRecord;
  }

  get quantity() {
    return this._data.quantity;
  }
  get itemPrice() {
    return this._data.itemPrice;
  }

  get price() {
    return (
      this.quantity * this.itemPrice -
      Math.max(0, this.quantity - 500) * this.itemPrice * 0.05 +
      Math.min(this.quantity * this.itemPrice * 0.01, 100)
    );
  }
}

// 변수 추출하기 => class의 getter로 추출
class Order {
  // ...

  get price() {
    return this.basePrice - this.quantityDiscount + this.shipping;
  }

  get basePrice() { return this.quantity * this.itemPrice; }
  get quantityDiscount() { return Math.max(0, this.quantity - 500) * this.itemPrice * 0.05; }
  get shipping() { return Math.min(this.quantity * this.itemPrice * 0.01, 100);}
}
```
- `class`를 사용했을 때의 엄청난 장점을 볼 수 있다. ***객체는 특정 로직과 데이터를 외부와 공유하려 할 때 공유할 정보를 설명해주는 적당한 크기의 문맥이 되어 준다.***
- 덩치 큰 클래스의 공통 동작을 별도 이름으로 뽑아내서 추상화해두면 그 객체를 다룰 때 쉽게 활용할 수 있어서 매우 유용하다.

<br>

### 6.4 변수 인라인하기
- 반대 리팩터링: `변수 추출하기`
- 워낙 간단한거고, 변수 추출하기를 반대로 하면 되기 때문에 정리는 생략