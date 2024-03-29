# Refactoring 2판
## 학습방법
- 리팩토링 책을 따라서 코드 작성 - 리팩토링 - 커밋(코드와 함께 리팩토링한 내용을 Readme 추가)

## 리팩터링 카탈로그(ch 6~12)
## [6. 기본적인 리팩터링](#6-기본적인-리팩터링-1)
  - ### 🔥[6.1 함수 추출하기](#61-함수-추출하기-1)
  - ### [6.2 함수 인라인하기](#62-함수-인라인하기-1)
  - ### [6.3 변수 추출하기](#63-변수-추출하기-1)
  - ### [6.4 변수 인라인하기](#64-변수-인라인하기-1)
  - ### [6.5 함수 선언 바꾸기](#65-함수-선언-바꾸기-1)
  - ### [6.6 변수 캡슐화하기](#65-변수-캡슐화하기-1)
  - ### [6.7 변수 이름 바꾸기](#67-변수-이름-바꾸기-1)
  - ### 🔥[6.8 매개변수 객체 만들기](#68-매개변수-객체-만들기-1)
  - ### [6.9 여러 함수를 클래스로 묶기](#69-여러-함수를-클래스로-묶기-1)
  - ### [6.10 여러 함수를 변환 함수로 묶기](#610-여러-함수를-변환-함수로-묶기-1)
  - ### [6.11 단계 쪼개기](#611-단계-쪼개기-1)
<br>

## [7. 캡슐화](#7-캡슐화-1)
  - ### [7.1 레코드 캡슐화하기](#71-레코드-캡슐화하기-1)
  - ### [7.2 컬렉션 캡슐화하기](#72-컬렉션-캡슐화하기-1)
  - ### [7.3 기본형을 객체로 바꾸기](#73-기본형을-객체로-바꾸기-1)
  - ### [7.4 임시 변수를 질의 함수로 바꾸기](#74-임시-변수를-질의-함수로-바꾸기-1)
  - ### [7.5 클래스 추출하기](#75-클래스-추출하기-1)
  - ### [7.6 클래스 인라인하기](#76-클래스-인라인하기-1)
  - ### [7.7 위임 숨기기](#77-위임-숨기기-1)
  - ### [7.8 중개자 제거하기](#78-중개제-제거하기-1)
  - ### [7.9 알고리즘 교체하기](#79-알고리즘-교체하기-1)

<br>

## [8. 기능 이동](#8-함수-옮기기-1)
  - ### [8.1 함수 옮기기](#81-함수-옮기기-1)
  - ### [8.2 필드 옮기기](#82-필드-옮기기-1)
  - ### [8.3 문장을 함수로 옮기기](#83-문장을-함수로-옮기기-1)
  - ### [8.4 문장을 호출한 곳으로 옮기기](#84-문장을-호출한-곳으로-옮기기-1)
  - ### [8.5 인라인 코드를 함수 호출로 바꾸기](#85-인라인-코드를-함수-호출로-바꾸기-1)
  - ### [8.6 문장 슬라이드하기](#86-문장-슬라이드하기-1)
  - ### [8.7 반복문 쪼개기](#87-반복문-쪼개기-1)
  - ### [8.8 반복문을 파이프라인으로 바꾸기](#88-반복문을-파이프라인으로-바꾸기-1)
  - ### [8.9 죽은 코드 제거하기](#89-죽은-코드-제거하기-1)

<br>

## [9. 데이터 조직화](#9-데이터-조직화)
  - ### [9.1 변수 쪼개기](#91-변수-쪼개기-1)
  - ### [9.2 필드 이름 바꾸기](#92-필드-이름-바꾸기-1)
  - ### [9.3 파생 변수를 질의 함수로 바꾸기](#93-파생-변수를-질의-함수로-바꾸기-1)
  - ### [9.4 참조를 값으로 바꾸기](#94-참조를-값으로-바꾸기-1)
  - ### 🔥[9.5 값을 참조로 바꾸기](#95-값을-참조로-바꾸기-1)
  - ### [9.6 매직 리터럴 바꾸기](#96-매직-리터럴-바꾸기-1)

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

<br>

### 6.5 함수 선언 바꾸기
- 다른 이름: `함수 이름 바꾸기`, `시그니처 바꾸기`
### 6.5.1 설명
- 함수의 이름
  - 함수의 이름이 좋으면 구현 코드를 살펴볼 필요없이 호출문만 보고도 무슨 일을 하는지 알 수 있다. 좋은 이름이 떠오르면 바로 바꿔야한다.
- 함수의 매개변수
  - 매개변수를 잘 정하면 함수의 활용 범위가 넓어지고 다른 모듈과의 결합(coupling)을 제거할 수 있다.
  - ex)
  > 대여한 지 30일이 지났는지를 기준으로 지불 기한이 넘었는지 판단하는 함수가 있을 때, 이 함수의 매개변수는 `지불 객체`가 적절할까 `마감일`이 적절할까?
    - `지불 객체`: 지불 객체의 인터페이스와 결합된다. 대신 지불이 제공하는 여러 속성에 쉽게 접근할 수 있어 내부 로직이 복잡해져도 이 함수를 호출하는 코드를 일일이 찾아가서 변경할 필요가 없다 => **함수의 캡슐화 수준이 높아진다.**
    - `마감일`: 마감일로 하면 지불 객체를 모르는 곳에서도 이 함수를 사용할 수 있어 **함수의 활용 범위가 넓어지고 지불 객체와의 결합을 제거할 수 있다.**
    - ***정답은 없다.***

<br>

### 6.5.2 절차
- 그냥 IDE의 리팩터링을 이용한다.

<br>

### 6.5.3 예시
- 생략

<br>

### 6.6 변수 캡슐화하기
### 6.6.1 설명
- 함수는 데이터보다 다루기 쉽다. 데이터는 유효범위가 넓을수록 다루기 어렵다. 또 데이터를 바꿀 땐, 데이터를 참조하는 모든 부분을 한 번에 바꿔야 코드가 제대로 동작한다.(결합도가 높다) 반면 함수는 기존 함수가 새로운 함수를 호출하는 식으로 쉽게 변경 가능하다.(결합도 낮다. => 리팩터링 쉽다.)
- 접근 범위가 넓은 데이터를 옮길때는 해당 데이터의 접근을 독점하는 함수를 만드는 식의 `캡슐화`가 가장 좋은 방법일 때가 많다.
- `데이터 캡슐화`는 데이터를 변경/사용하는 코드를 감시할 수 있는 통로가 되어, **변경 전 검증이나 변경 후 추가 로직을 쉽게 끼워 넣을 수 있다.**
- 유효범위가 단일 함수보다 넓은 가변 데이터는 캡슐화 해야 한다. 그래야 자주 사용하는 데이터에 대한 결합도가 높아지는것을 막을 수 있다. 객체지향에서 객체의 데이터는 반드시 private으로 만드는 것이다.(getter/setter로만 접근)
  > 객체 내에서도 필드 참조시 getter/setter로만 접근해야 한다(자가 캡슐화) => 이건 좀 지나치다. ***이렇게 해야 한다면 객체를 분리해야 한다는 신호다.***

- `불변 데이터`는 굳이 캡슐화 할 필요는 없다. 변경될 일이 없어, 추가 로직을 끼워넣을 필요가 없기 때문

<br>

### 6.6.2 절차
1. 변수로의 접근/갱신을 전담하는 캡슐화 함수를 만든다.
2. 정적 검사를 수행한다.
3. 변수를 참조하던 모든 부분을 캡슐화 함수로 바꾼다.
4. 변수의 접근 범위를 제한한다.(ex 모듈분리)
5. 테스트
6. 변수 값이 레코드라면 `레코드 캡슐화하기` 적용을 고민해보자.

<br>

### 6.6.3 예시
- 간단한 캡슐화
```js
let defaultOwner = {firstName: '마틴', lastName: '파울러'};

// 사용처
spaceship.owner = defaultOwner;
defaultOwner = {firstName: '동기', lastName: '고'};

// 캡슐화, defaultOwner.js
let defaultOwnerData = {firstName: '마틴', lastName: '파울러'};
export function defaultOwner() { return defaultOwnerData; } // 마틴파울러는 getter에 get 안붙이는걸 좋아한다고..
export function setDefaultOwner(arg) { defaultOwnerData = arg; }
```
- 근데 이런 방식은 `defaultOwner`의 프로퍼티를 외부에서 변경하는걸 막을 수 없다. `값 캡슐화`를 하면 된다. `getter`가 복제본을 반환하도록한다.
```js
let defaultOwnerData = {firstName: '마틴', lastName: '파울러'};
export function getDefaultOwner() { return Object.assign({}, defaultOwnerData); }
export function setDefaultOwner(arg) { defaultOwnerData = arg; }
```
- `레코드 캡슐화`도 좋은 방법이다.
```js
let defaultOwnerData = {firstName: '마틴', lastName: '파울러'};
export function getDefaultOwner() { return new Person(defaultOwnerData) }
export function setDefaultOwner(arg) { defaultOwnerData = arg; }

class Person {
  constructor(data) {
    this._lastName = data.lastName;
    this._firstName = data.firstName;
  }
  get lastName() { return this._lastName; }
  get firstName() { return this._firstName; }
}
```
- 추가로, 세터에도 복제본을 만들어야 할 수도 있다.(`defaultOwnerData = {...args}`). 이건 `setter`호출부의 의도에 따라 달라질것이다.

<br>

### 6.7 변수 이름 바꾸기
- 간단해서 생략한다.

<br>

### 6.8 매개변수 객체 만들기
### 6.8.1 설명
- 데이터 항목 여러개가 이함수 저함수 몰려다니는 경우가 있을 때 하나의 데이터 구조로 모아주면 좋다. 묶으면 **데이터 사이의 관계가 명확해진다**는 이점이 있다.
- 이런 데이터 구조에서 공통으로 적용되는 동작을 추출해서 함수로 만들 수 있다.(공용함수 나열 or ***함수와 데이터를 합쳐 `클래스`생성***) 이렇게 하면 ***데이터 구조가 문제 영역을 훨씬 간결하게 표현하는 추상 개념으로 격상된다.***

<br>

### 6.8.2 절차
1. 적당한 데이터 구조가 아직 마련되지 않았다면, 새로 만든다. 
  - **가능하면 `클래스`로 만드는게 좋다. 동작까지 함께 묶을 수 있기 때문.**
2. 테스트한다.
3. `함수 선언 바꾸기`로 새 데이터 구조를 매개변수로 추가한다.
4. 테스트한다.
5. 함수 호출 시 새로운 데이터 구조 인스턴스를 넘기도록 수정한다. 매번 테스트한다.
6. 기존 매개변수를 사용하던 코드를 새 데이터 구조의 원소를 사용하도록 바꾼다.
7. 다했으면 기존 매개변수 제거하고 테스트한다.

<br>

### 6.8.3 예시
- 온도 측정값 배열에서 정상 범위를 벗어난 것이 있는지 검사하는 코드를 살펴본다.
```js
const station = {
  name: "ZB1",
  readings: [
    { temp: 47, time: "2016-11-10 09:10" },
    { temp: 53, time: "2016-11-10 09:20" },
    { temp: 58, time: "2016-11-10 09:30" },
    { temp: 53, time: "2016-11-10 09:40" },
    { temp: 51, time: "2016-11-10 09:50" },
  ],
};

const operatingPlan = {
  temperatureFloor: 40, // 최저온도
  temperatureCeiling: 55, // 최고온도
};

// 함수
function readingsOutsideRange(station, min, max) {
  return station.readings.filter((r) => r.temp < min || r.temp > max);
}

// 호출..
const alerts = readingsOutsideRange(
  station,
  operatingPlan.temperatureFloor,
  operatingPlan.temperatureCeiling
);
```
- `min`, `max`값은 `range`라는 개념으로 묶어서 표현할 수 있다. 여기서는 이 두 값을 `NumberRange`라는 클래스로 만든다.
```js
class NumberRange {
  constructor(min, max) {
    this._data = { min, max };
  }

  get min() {
    return this._data.min;
  }
  get max() {
    return this._data.max;
  }

}
```
- 상세 과정은 생략하고 리팩터링 해보면 아래와 같이 만들 수 있다.
```js
function readingsOutsideRange(station, range) {
  return station.readings.filter(
    (r) => r.temp < range.min || r.temp > range.max
  );
}
```
- `클래스`로 만들어 둘 때 장점은, 관련 동작을 클래스로 옮길 수 있다는 것이다. 아래와 같다.
```js
class NumberRange {
  // ...

  contains(arg) {
    return arg >= this.min && arg <= this.max;
  }
}

function readingsOutsideRange(station, range) {
  return station.readings.filter((r) => !range.contains(r.temp));
}
```
- `NumberRange`에 메서드 인자가 range 내에 포함되는지를 확인하는 `contains()`메서드를 만들고, 외부에서 이를 활용하도록 하였다. 
- 이처럼 값 객체를 만들면 유용한 동작들을 클래스로 옮겨서 코드베이스 전반에서 값을 활용하는 방식을 간소화 할 수 있다. 여기서 `operatingPlan`도 floor/ceiling이란 range를 가지고 있으니, `temperatureRange`같은 클래스를 만들 수 있다.
- 이런걸 만들 때 ***값에 기반한 동치성 검사 메서드***(equailty method)를 추가해야한다.

<br>

### 6.9 여러 함수를 클래스로 묶기
- 예..
```js
function base(aReading) { ... }
function taxableCharge(aReading) { ... }
function calculateBaseCharge(aReading) { ... }

class Reading {
  base() {...}
  taxableCharge() {...}
  calculateBaseCharge() {...}
}
```
### 6.9.1 설명
- 저자는 보통 (함수 호출시 인수로 전달되는) `공통 데이터`를 중심으로 긴밀하게 엮여 동작하는 함수 무리를 발견하면, 클래스 하나로 묶는다. 클래스로 묶으면 이 함수들이 공유하는 ***`공통 환경`을 더 명확하게 표현***할 수 있고, 각 함수에 전달되는 ***인수를 줄여***서 객체 내의 함수 호출을 간결하게 할 수 있다. 이런 객체를 시스템의 다른 부분에 전달하기 위한 ***참조를 제공***할 수도 있다.
- 함수들을 `중첩 함수`형태로 묶기도 하는데, 클래스보다 테스트하기 까다로울 수 있다.

<br>

### 6.9.2 절차
1. 함수들이 공유하는 `공통 데이터 레코드를 캡슐화` 한다.
  - 레코드로 묶여있지 않다면, 먼저 `매개변수 객체 만들기`로 데이터를 하나로 묶는 레코드를 만들자.
2. 공통 레코드를 사용하는 함수 각각을 새 클래스로 옮긴다.(`함수 옮기기`)
3. 데이터를 조작하는 로직들은 `함수로 추출`해서 새 클래스로 옮긴다.

<br>

### 6.9.3 예시
- 가스 계량기를 읽어서 측정값을 기록하고, 세금 매기는걸 계산하는 로직이 있다고 하자.
```js
const reading = {
  customer: "motiveko",
  quantity: 10,
  month: 5,
  year: 10,
};

// 클라이언트 1
const aReading = acquireReading();
const baseCharge = baseRate(aReading.month, aReading.year) * aReading.quantity;

// 클라이언트 2
const aReading = acquireReading();
const base = baseRate(aReading.month, aReading.year) * aReading.quantity;
const taxableCharge = Math.max(0, base - taxThreshold(aReading.year));
```
- 여기저기서 변수명도 좀 다르게 사용되고 있다. 우선 `레코드를 캡슐화`한다.
```js
class Reading {
  constructor(data) {
    this._customer = data.customer;
    this._quantity = data.quantity;
    this.month = data.month;
    this._year = data.year;
  }

  get customer() { return this._customer; }
  get quantity() { return this._quantity; }
  get month() { return this.month; }
  get year() { return this._year; }
}
```
- 그런 다음 기본 세율(baseCharge)을 계산하는 메서드를 만든다.
```js
class Reading {
  // ...

  get baseCharge() {
    return baseRate(this.month, this.year) * this.quantity;
  }
}
```
- 이렇게 getter로 만들면 클라이언트는 `baseCharge`가 필드인지 계산된 값(함수호출)인지 구분할 수 없다. 이는 ***`단일 접근 원칙`을 따르는 것으로 권장하는 방식이다.***
- 세금을 계산하는 로직도 메서드로 옮겨보자.
```js
class Reading {
  // ...

  get taxableCharge() {
    return Math.max(0, this.baseCharge - taxThreshold(this.year));
  }
}

// 클라리언트 2
const rawReading = acquireReading();
const aReading = new Rading(rawReading);
const { taxalbeCharge } = aReading; // 마찬가지로 getter로 썼기 때문에 프로퍼티처럼 접근할 수 있다.
```

<br>

### 6.10 여러 함수를 변환 함수로 묶기
```js
function base(aReading) { ... }
function taxableCharge(aReading) { ... }

// 변환 함수
function enrichReading(argReading) {
  const aReading = _.cloneDeep(argReading);
  aReading.baseCharge = base(aReading);
  aReading.taxableCharge = taxableCharge(aReading);
  return aReading;
}
```
### 6.10.1 설명
- 소프트웨어는 입력을 받아서 여러가지 정보를 도출한다. 이 때, 도출된 정보는 여러 곳에서 사용될 수 있는데, 그러면 이 정보가 사용되는 곳마다 같은 도출 로직이 반복되게 된다. 이런 **도출 작업을 한데로 모으면(프로퍼티)** 검색과 갱신을 일관된 장소에서 처리하고 중복 로직도 막을 수 있다. 이렇게 하는 방법 중 하나가 `변환함수(transform)`를 사용하는 것이다. 변환함수 내에서만 정보 도출을 하기 때문에 해당 정보가 궁금하면 변환함수만 살펴보면 된다.(응집도향상)

- 변환함수로 묶기 vs 클래스 메서드
  - 원본 데이터가 코드에서 갱신되는경우 : 클래스 메서드 사용(변환 함수 사용시 일관성이 깨짐)
  - 원본 데이터 변환 안됨 : 변환 함수 사용


<br>

### 6.10.2 절차
1. 변환할 레코드를 입력받아서 (깊은)복사본을 반환하는 변환함수를 만든다.
2. 묶을 함수 중 하나를 변환 함수로 옮기고, 처리 결과를 레코드의 새 필드에 기록한다. 그리고 클라이언트에서 이 필드를 사용하도록 수정한다.
3. 테스트한다.
4. 2-3을 반복한다.

<br>

### 6.10.3 예시
- 6.9의 공공요금 계량과 세금 계산 코드를 예로 사용한다.
```js
const reading = {
  customer: "motiveko",
  quantity: 10,
  month: 5,
  year: 10,
};


// 클라이언트 
const aReading = acquireReading();
const basicChargeAmount = calculateBaseCharge(aReading);
const taxableCharge = Math.max(0, basicChargeAmount - taxThreshold(aReading.year));

function function calculateBaseCharge(aReading) { 
  return baseRate(aReading.month, aReading.year) * aReading.quantity;
}
```
- 변환 함수를 만든다. 보통 prefix로 `enrich`를 붙이는데, 부가정보만 추가되는건 `enrich`, 형태가 바뀌는건 `transform`이라고 명명한다고 한다. 상세 과정은 생략하고 결과만 본다.
```js
function enrichReading(original) {
  const result = _.cloneDeep(original);
  result.baseCharge = calculateBaseCharge(original);
  result.taxableCharge = Math.max(0, result.baseCharge - taxThreshold(aReading.year));
  return result
}

// 클라이언트
const rawReading = acquireReading();
const aReading = enrichReading(rawReading);
const { taxableCharge } = aReading;
```
> 이런 변환함수를 거친 객체의 프로퍼티를 클라이언트가 수정하면 문제가 생긴다. 예를들어 `qunatity`값을 수정하면 `baseCharge`, `taxableCharge`값의 일관성이 깨지게 된다. js는 불변 데이터 구조를 지원하는 언어가 아니라서인데, 이런 언어에서는 `여러 함수를 클래스로 묶기`로 리팩토링 하는게 좋다.(참조할 때마다 계산하기 때문에 일관성이 안깨진다.) 사실 데이터가 읽기전용 문맥에서 사용된다면 큰 문제는 안된다.

<br>

### 6.11 단계 쪼개기
- 좀 복잡하다. 아래는 간단한예.
```js
// origin
const orderData = orderString.split(/\s+/);
const productPrice = priceList[orderData[0].split("-")[1]];
const orderPrice = parseInt(orderData[1]) * productPrice;

// refatoring
const orderRecord = parseOrder(order);
const orderPrice = price(orderRecord, priceList);

function parseOrder(aString) {
  const values = aString.split(/\s+/);
  return ({
    productID: orderData[0].split("-")[1],
    quantity: parseInt(values[1]),
  })
}

function price(order, priceList) {
  return order.quantity * priceList[order.productID];
}
```

### 6.11.1 설명
- **서로 다른 두 대상**을 한꺼번에 다르는 코드를 발견하면 각각을 별개 모듈로 나눌 방법을 생각해야 한다. 코드 수정시, 두 대상을 한꺼번에 고려할 필요 없이 하나만 집중하기 위해서다.(`SRP`로 봐도 될 듯) 
- 이렇게 하는데 가장 편한 방법이 ***동작을 연이은 두 단계로 쪼개는 것***이다.
- 대표적인 예는 `컴파일러`다. 컴파일러는 결국 `텍스트코드`를 받아서 실행 가능한 형태(기계어)로 변환한다. 컴파일러를 오래 개발하다보니 사람들은 ***작업이 순차적으로 연결되 형태로 분리하면 좋다***는 사실을 깨달았다.
  1. 텍스트 토큰화
  2. 토큰을 파싱하여 syntax tree 생성
  3. 최적화 등 구문 트리 변환
  4. 목적 코드(기계어) 생성
- 각 단계는 자신만의 문제에 집중하고, 나머지 단계는 몰라도 된다!
- ***다른 단계로 볼 수 있는 코드 영역들이 마침 서로 다른 데이터와 함수를 사용한다면 쪼개기에 적합하다. 이를 별도 모듈들로 분리하면 그 차이를 코드에서 훨씬 분명하게 드러낼 수 있다.***

<br>

### 6.11.2 절차
1. 두 번째 단계에 해당하는 코드를 독립 `함수로 추출`한다.
2. 테스트한다.
3. `중간 데이터 구조`를 만들어서 앞에서 추출한 함수의 인수로 추가한다.
4. 테스트한다.
5. 추출한 두 번째 단계 함수의 매개변수를 하나씩 검토한다. 그중 첫 번째 단계에서 사용되는 것은 중간 데이터 구조로 옮기고, 매번 테스트한다.
    - 간혹 두 번째 단계에서 사용하면 안 되는 매개변수가 있다. 이럴 때는 각 매개변수를 사용한 결과를 중간 데이터 구조의 필드로 추출하고, 이 필드의 값을 설정하는 문장을 호출한 곳으로 옮긴다.
6. 첫 번째 단계 코드를 `함수로 추출`하면서 중간 데이터 구조를 반환하도록 만든다.
    - 이때 첫 번째 단계를 변환기(transformer)객체로 추출해도 좋다.
<br>

### 6.11.3 예시
1. 상품의 결제 금액을 계산하는 코드를 살펴본다.
```js
function priceOrder(product, quantity, shippingMethod) {
  const basePrice = product.basePrice * quantity;
  const discount =
    Math.max(quantity - product.discountThreshold, 0) *
    product.basePrice *
    product.discountRate;
  const shippingPerCase =
    basePrice > shippingMethod.discountThreshold
      ? shippingMethod.discountedFee
      : shippingMethod.feePerCase;
  const shippingCost = quantity * shippingPerCase;
  const price = basePrice - discount + shippingCost;
  return price;
}
```
- 간단한 함순데, 두 단계로 이뤄져있다. 상품 가격 게산(`basePrice`, `discount`)과 배송 정보를 이용한 배송비 계산(`shippingCost`)이다. 추후, 상품 가격과 배송비 계산이 변경이 있을 수 있는데, 이 둘은 각각 독립적으로 처리할 수 있으므로 두 단계로 나눈다. 
- 배송비 계산 부분을 함수로 추출한다.
```js
function priceOrder(product, quantity, shippingMethod) {
  const basePrice = product.basePrice * quantity;
  const discount =
    Math.max(quantity - product.discountThreshold, 0) *
    product.basePrice *
    product.discountRate;
  const price = applyShipping(basePrice, shippingMethod, quantity, discount);
  return price;
}
// 두 번째 단계인 배송비 계산을 처리한다.
function applyShipping(basePrice, shippingMethod, quantity, discount) {
  const shippingPerCase =
    basePrice > shippingMethod.discountThreshold
      ? shippingMethod.discountedFee
      : shippingMethod.feePerCase;
  const shippingCost = quantity * shippingPerCase;
  const price = basePrice - discount + shippingCost;
  return price;
}
```
- 그 다음 첫번째 단계와 두 번째 단계가 주고받을 중간 데이터 구조를 만들고 이걸 두 번째 단계 함수의 매개변수에 전달하자. 함수는 이 중간데이터를 쓰도록 수정한다. 중간 데이터에 들어갈 데이터는 `basePrice`, `quantity`, `discount`가 있다. 
```js
function priceOrder(product, quantity, shippingMethod) {
  // ...
  const priceData = {basePrice, discount, quantity};
  const price = applyShipping(priceData, shippingMethod);
  return price;
}

function applyShipping({basePrice, discount, quantity}, shippingMethod) {
  // ...
}
```
- 이제 첫 번째 단계 코드를 함수로 추출하고, 이 중간 데이터 구조를 반환하게 만든다.

```js
function priceOrder(product, quantity, shippingMethod) {
  const priceData = calculatePricingData(product, quantity);
  return applyShipping(priceData, shippingMethod);
}

function calculatePricingData(product, quantity) {
  const basePrice = product.basePrice * quantity;
  const discount =
    Math.max(quantity - product.discountThreshold, 0) *
    product.basePrice *
    product.discountRate;
  return { basePrice, quantity, discount };
}

function applyShipping({basePrice, quantity, discount}, shippingMethod) {
  const shippingPerCase = (basePrice > shippingMethod.discountThreshold) ? shippingMethod.discountedFee : shippingMethod.feePerCase;
  const shippingCost = quantity * shippingPerCase;
  return basePrice - discount - shippingCost;
}
```

<br>

2. JSON 파일에 담긴 주문의 개수를 세는 자바 프로그램을 살펴보자
```java
public static void main(String[] args) {
  try {
    if(args.length == 0) throw new RuntimeException("파일명을 입력하세요.");
    String filename = args[args.length - 1];
    File input = Paths.get(filename).toFile();
    ObjectMapper mapper = new ObjectMapper();
    Order[] orders = mapper.readValue(input, Order[].class);
    if(Stream.of(args).anyMatch(arg -> "-r".equals(arg))) {
      System.out.println(Stream.of(orders)
                                .filter(o -> "ready".equals(o.status))
                                .count());
    } else {
      System.out.println(orders.length);
    }
  } catch(Exception e) {
    System.err.println(e);
    System.exit(1);
  }
}
```
- argument로 전달한 파일을 `Order` 객체로 Deserialize 한 후 개수를 센 후 이를 표준 출력으로 보내고 있다.
- 이 코드는 두가지 일을 하고 있다. 하나는 **주문 목록을 읽어서 개수를 세고**, 다른 하나는 ***명령줄 인수를 담은 배열을 읽어서 프로그램의 동작을 결정***한다. 이걸 두 단계로 쪼갠다.
  1. 명령줄 인수의 구문을 분석해서 의미를 추출하는 단계
  2. 이렇게 추출된 정보를 이용해서 데이터를 적절히 가공
- 이렇게 하면 여러 옵션이나 스위치가 늘어나도 코드 수정이 쉬워진다.

- 우선 쪼개기와 상관없는 ***'코드를 테스트하기 쉬운 상태로 만드는 작업'을 한다.*** 이런식으로 표준 출력으로 보내는 기능을 하는 함수는 매번 JVM을 구동해허 테스트 해야 하는데, 이를 **JUnit 호출로 자바 프로세스 하나에서 테스트 할 수 있는 상태**로 만든다. 
- 우선 핵심 로직을 추출한다.
```java
public static void main(String[] args) {
  try {
    System.out.println(run(args));
  } catch (Exception e) {
    System.err.println(e);
    System.exit(1);
  }
}

static long run(String[] args) throws IOException {
  if (args.length == 0)
    throw new RuntimeException("파일명을 입력하세요.");
  String filename = args[args.length - 1];
  File input = Paths.get(filename).toFile();
  ObjectMapper mapper = new ObjectMapper();
  Order[] orders = mapper.readValue(input, Order[].class);
  if (Stream.of(args).anyMatch(arg -> "-r".equals(arg))) {
    return Stream.of(orders)
        .filter(o -> "ready".equals(o.status))
        .count();
  } else {
    return orders.length;
  }
}
```
- 이렇게 하면 `run()` 메서드는 표준 출력을 하는게 아니라, long 타입의 데이터를 반환하기 때문에, JUnit을 이용해서 테스트가 가능하다. 매번 CLI로 자바 프로세스 띄우는 것 보다 훨씬 쉬워졌다! 

> 이런 식으로 느리고 불편한 작업과 자주 테스트해야 할 복잡한 동작을 분리해서 테스트를 더 쉽게 수행하게 만들었는데, 이 원칙을 ***`험블 객체 패턴(Humble Object Pattern)`*** 이라고 부른다!

<br>

- 이제 단계를 쪼갠다. 우선 ***'두 번째 단계에 해당하는 코드를 독립된 메서드로 추출'*** 한다.
```java
static long run(String[] args) throws IOException {
  if (args.length == 0)
    throw new RuntimeException("파일명을 입력하세요.");
  String filename = args[args.length - 1];
  return countOrders(args, filename)
}

private static long countOrders(String[] args, String filename) throws IOException {
  File input = Paths.get(filename).toFile();
  ObjectMapper mapper = new ObjectMapper();
  Order[] orders = mapper.readValue(input, Order[].class);
  if (Stream.of(args).anyMatch(arg -> "-r".equals(arg))) {
    return Stream.of(orders)
        .filter(o -> "ready".equals(o.status))
        .count();
  } else {
    return orders.length;
  }
}
```
- countOrders에 전달되는 인수들 중 args는 첫 번째 단계에서 사용하는데, 이를 두 번째 단계에 노출하는건 적절치 않다. 이걸 분리하는게 단계 쪼개기의 목적이기 때문. 
- ***'중간 데이터 구조를 추가'*** 하고, `args`와 `filename`을 여기에 넣고, 두 번째 단계 함수에 전달한다.
```java
static long run(String[] args) throws IOException {
  if (args.length == 0)
    throw new RuntimeException("파일명을 입력하세요.");
  String filename = args[args.length - 1];
  CommandLine commandLine = new CommandLine();
  commandLine.filename = filename;
  commandLine.onlyCountReady = Stream.of(args).anyMatch(arg -> "-r".equals(arg));
  return countOrders(commandLine);
}

private static long countOrders(CommandLine commandLine) throws IOException {
  File input = Paths.get(commandLine.filename).toFile();
  ObjectMapper mapper = new ObjectMapper();
  Order[] orders = mapper.readValue(input, Order[].class);
  if (commandLine.onlyCountReady) {
    return Stream.of(orders)
        .filter(o -> "ready".equals(o.status))
        .count();
  } else {
    return orders.length;
  }
}

private static class CommandLine{
  boolean onlyCountReady;
  String filename;
}
```
- 이제 ***'첫 번째 단계의 코드를 메서드로 추출하고 이 매서드가 중간 데이터 구조를 반환'*** 하도록 한다. 
```java
static long run(String[] args) throws IOException {
  CommandLine commandLine = parseCommandLine(args);
  return countOrders(commandLine);
}

private static CommandLine parseCommandLine(String[] args) {
  if (args.length == 0)
    throw new RuntimeException("파일명을 입력하세요.");
  String filename = args[args.length - 1];
  CommandLine commandLine = new CommandLine();
  commandLine.filename = filename;
  commandLine.onlyCountReady = Stream.of(args).anyMatch(arg -> "-r".equals(arg));
  return commandLine;
}
```
- 단계 쪼개기는 여기까지다. 추가로 이름 바꾸기와 인라인하기로 정리한다.
```java
static long run(String[] args) throws IOException {
  return countOrders(parseCommandLine(args));
}

private static CommandLine parseCommandLine(String[] args) {
  if (args.length == 0)
    throw new RuntimeException("파일명을 입력하세요.");
  String filename = args[args.length - 1];
  CommandLine result = new CommandLine();
  result.filename = filename;
  result.onlyCountReady = Stream.of(args).anyMatch(arg -> "-r".equals(arg));
  return result;
}
```
- 두 단계가 `parseCommandLine()`, `countOrders()`로 명확하게 분리되었고, 테스트 하기도 쉬워졌다.

<br>

3. 첫 번째 단계에 `변환기`(transformer) 사용하기
- 2.예제에서 `parseCommandLine()`를 이용해 간단한 레코드 형태 데이터 구조를 만들고 이를 `countOrders()`에다가 전달했다. 이런 방법도 무관하지만, `CommandLine`객체를 `String[] args`를 `filename`, `onlyCountReady`와 같은 데이터로 바꿔주는 변환기 객체로 만드는 것도 하나의 방법이다.
- 중간 과정은 생략하고, 이런식으로 리팩터링 하는것이다.
```java
  static long run(String[] args) throws IOException {
    return countOrders(new CommandLine(args));
  }

  private static long countOrders(CommandLine commandLine) throws IOException {
    File input = Paths.get(commandLine.filename()).toFile();
    ObjectMapper mapper = new ObjectMapper();
    Order[] orders = mapper.readValue(input, Order[].class);
    if (commandLine.onlyCountReady()) {
      return Stream.of(orders)
          .filter(o -> "ready".equals(o.status))
          .count();
    } else {
      return orders.length;
    }
  }

  private static class CommandLine{
    String[] args;

    public CommandLine(String[] args) {
      if (args.length == 0)
        throw new RuntimeException("파일명을 입력하세요.");
      this.args = args;
    }
    String filename() {
      return args[args.length - 1];
    }

    boolean onlyCountReady() {
      return Stream.of(args).anyMatch(arg -> "-r".equals(arg));
    }
  }
```
- 2와 3의 차이는 
  - 순차적으로 실행되는 두 함수 사이에 단순한 레코드 형태의 자료 구조를 던지는 방식 
  - 변환기 만들어서 전달하는 방식
- 으로 나뉜다고 할 수 있다. 어떤 방식을 쓰건 무관하고, ***'핵심은 단계를 명확히 분리하는 것'***이다.

<br>

## 7. 캡슐화
### 7.1 레코드 캡슐화하기
```js
// 레코드..
organization = {name: 'motiveko', country: 'kr'};

// 레코드의 캡슐화..
class Organiztation {
  constructor(data) {
    this._name = data.name;
    this._country = data.country;
  }
  get name() { return this._name; }
  set name(arg) { this._name = arg; }
  get country() { return this._country; }
  set country(arg) { this._country = arg; }
}
```
### 7.1 설명
- `객체(클래스)`는 **가변데이터일 때 쓰면 좋다. 즉 계산해서 얻을 수 있는 값이 있을 때** 쓰면 좋다. 데이터가 불변이라면 `레코드(리터럴 객체, hashmap)`을 써도 무방하다.
  - 예를 들어 값의 범위를 표현하는 데이터가 있다고 할 때 `{start: 1, end: 5}`형태로 저장하면, 범위의 길이(length)를 알고 싶으면 매번 레코드 밖에서 계산해야 할 것이다. `{length:5}`를 추가한다고 해도, start/
  end가 바뀌면 length는 또 계산해서 갱신해줘야하는 불편함이 있다!

<br>

### 7.2 절차
1. 레코드를 담은 변수를 캡슐화 한다.
- 레코드를 캡슐화하는 함수의 이름은 검색하기 쉽게 지어준다.
2. 레코드를 감싼 단순한 클래스로 해당 변수의 내용을 교체한다. 이 클래스에 원본 레코드를 반환하는 접근자도 정의하고, 변수를 캡슐화하는 함수들이 이 접근자를 사용하도록 수정한다.
3. 테스트한다.
4. 원본 레코드 대신 새로 정의한 클래스 타입의 객체를 반환하는 함수들을 새로 만든다.
5. 레코드를 반환하는 예전 함수를 사용하는 코드를 4.에서 만든 함수를 사용하도록 바꾼다. 필드에 접근하는건 객체의 접근자를 사용하고, 적절한 접근자가 없으면 추가한다.
6. 클래스에서 원본 데이터를 반환하는 접근자와 원본 레코드를 반환하는 접근자는 제거한다.
7. 테스트한다.
8. 레코드 필드에 또 레코드가 있으면 '레코드 캡슐화하기'와 '컬렉션 캡슐화하기'를 재귀적으로 적용한다.

<br>

### 7.3 예시
- 과정은 그냥 생략한다. 
1. 간단한 레코드 캡슐화

```js
// 레코드
const organiztion = {name: 'motiveko', country: 'kr'};

// 사용부
let result = `<h1>${organiztion.name}</h1>`; // get
organiztion.name = 'newName'; // set 
```

```js
class Organiztion {
  constructor(data) {
    this._name = data.name;
    this._country = data.country;
  }
  get name() { return this._name; }
  set name(arg) { this._name = arg; }
  get country() { return this._country; }
  set country(arg) { this._country = arg; }
}
const organiztaion = new Organiztion({name: 'motiveko', country: 'kr'});

// 사용부
let result = `<h1>${organiztaion.name}</h1>`; // get
organiztaion.name = 'newName'; // set
```

<br>

2. 중첩된 레코드 캡슐화
```js
const customerData = {
  1920: {
    name: "마틴 파울러",
    id: "1920",
    usages: {
      2016: {
        1: 50,
        2: 55,
        // ...
      },
      2015: {
        1: 70,
        2: 63,
        // ...
      },
    },
  },
  38673: {
    name: '닐 포드',
    id: '38673',
    // ...
  },
};

// 쓰기 예
customerData[customerID].usages[year][month] = amount;
// 읽기 예
function compareUsage(customerID, laterYear, month) {
  const later = customerData[customerID].usages[laterYear][month];
  const earlier = customerData[customerID].usages[laterYear - 1][month];
  return {laterAmount: later, change: later - earlier};
}
```
- 쓰기와 읽기 모두 데이터 구조 안으로 깁숙히 들어가야하는 번거로움이 있다. 상세 과정은 생략하고 결과를 보면..
```js
class CustomerData {
  constructor(data) {
    this._data = data;
  }

  // 쓰기
  setUsage(customerID, year, month, amount) {
    this._data[customerID].usages[year][month] = amount;
  }

  // 읽기 API 제공
  usage(customerID, year, month) {  
    return this._data[customerID].usages[year][month];
  }

  // 읽기 : 레코드의 deepclone 반환
  get rawData() {
    return _.cloneDeep(this._data);
  }
}
const customerData = new CustomerData(...customerData)

// 쓰기 예
customerData.setUsage(customerId, year, month, amount);
// 읽기 예
function compareUsage(customerID, laterYear, month) {
  const later = customerData.usage(customerID, laterYear, month)
  const earlier = customerData.usage(customerID, laterYear - 1, month)
  return {laterAmount: later, change: later - earlier};
}

```
- `쓰기`
  - 캡슐화에는 ***'모든 쓰기를 함수 안에서 처리한다.'*** 는 핵심 원칙이 있다. 즉 클래스의 API를 통해서만 쓰기가 이뤄져야 한다는 것이다.
  - 덩치 큰 데이터 구조에서는 쓰기가 특히 중요한데, ***값을 수정하는 부분을 명확하게 드러내고 한 곳에 모아두는 일이 매우 중요***하다.

- `읽기`는 여러가지 방법이 있다.
  1. setter와 마찬가지로 읽는 코드를 모두 독립 함수로 추출한 다음 고객 데이터 클래스로 옮기는 방법
      - 장점: 모든 쓰임을 API로 제공하기 때문에, 클래스만 보면 사용법을 전부 파악할 수 잇다.
      - 단점: 읽는 패턴이 다양ㅇ해지면 코드가 늘어난다.
  2. 레코드를 통째로 deepclone해서 반환하는 getter를 제공한다.
      - 장점: 구현이 간단하다.
      - 단점: 레코드가 크면 복제 비용이 커진다. / 클라이언트가 원본을 수정하고 있다고 착각할 수 있다.
  3. `읽기 전용 Proxy`를 통해 레코드를 반환해서 내부 객체 수정시 에러를 던지도록 한다.(js에서는 좀 귀찮은 작업이 필요, [`Proxy API`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)를 쓰면 될 듯)
  4. 레코드 캡슐화를 재귀적으로 한다.
      - 장점: 가장 확실한 방법
      - 단점 : 하지만 데이터 구조가 거대하면 일이 매우 커지고, 만약 중첩된 데이터를 쓰는 일이 별로 많지 않다면 효과도 별로 없다.

### 7.2 컬렉션 캡슐화하기
```js
class Person {
  get courses() { return this._courses; }
  set courses(aList) { this._courses = aList; }
}

// 컬렉션 캡슐화..
class Person {
  get courses() { return this._courses.slice(); } // shallow copy
  addCourse(aCourse) { ... }
  removeCourse(aCourse) { ... }
}
```
<br>

### 7.2.1 설명
- 가변 데이터는 모두 캡슐화하는게 좋다. 데이터 구조가 언제 어떻게 수정되는지 파악하기 쉬워 데이터 구조 변경도 쉽기 때문이다. 
- 근데 컬렉션을 캡슐화 할 땐 실수가 발생할 여지가 많다. getter가 컬렉션을 그대로 반환하게 하면 클래스가 눈치채지 못하게 컬렉션이 바뀌가 되는 경우가 있다.
- 보동 `add()`, `remove()`같은 `컬렉션 변경자 메서드`를 제공해서 이 메서드를 통해서만 컬렉션을 변경하게 해야 한다.
- 내부 컬렉션을 직접 수정하지 못하게 하는 방법으로 **'컬렉션을 절대 반환하지 않는 방법'** 이 있다.
  ```js
  aCustomer.orders.size(); 

  // 컬랙션을 절대 반환하지 않도록...
  aCustomer.nuberOfOrders();
  ```
  - 이 방식은 문제가 있다. 최신 언어에서 다양한 컬렉션 클래스들의 표준화된 인터페이스를 제공하고, **컬렉션 파이프라인 패턴을 쓸 수 있게 하는데, 컬렉션을 반환하지 않으면 이 패턴을 못써서 부수 코드가 매우 많아질 수 있기 때문!**
- 자바 등의 언어는 읽기 전용 프락시로 반환하게 하는게 쉽다. 컬렉션의 읽기 메서드는 그대로 전달하고, 쓰기 메서드는 호출하면 에러를 던지는 식이다.(Typescript에서 `Readonly` 타입으로 반환하게 하면 컴파일 단계에서는 잡아 줄 수 있을것 같다.)
- 가장 흔한 방법은 **'내부 컬렉션의 복제본을 반환하는 것'** 이다. 컬렉션이 엄청 크면 성능 문제가 생기지만, 대부분의 경우 문제가 되지 않는다.

<br>

### 7.2.2 절차
1. 아직 컬렉션을 캡슐화하지 않았다면 변수 캡슐화하기부터 한다.
2. 컬렉션에 원소를 추가/제거하는 함수를 추가한다.
  - 컬렉션 자체를 통째로 바꾸는 세터는 제거한다. 힘들다면 인수로 받은 컬렉션을 복제해 저장하도록 한다.
3. 정적 검사를 수행한다.
4. 컬렉션을 참조하는 부분을 모두 찾고, 2.에서 추가한 함수를 호출하도록 수정한다. 매번 테스트한다.
5. 컬렉션 게터를 수정해서 원본 내용을 수정할 수 없는 '읽기전용 프락시'나 복제본을 반환하게 한다.
6. 테스트한다.

<br>

### 7.2.3 예시
```js
class Person {
  constructor(name) {
    this._name = name;
    this._courses = []; // 컬렉션
  }
  get name() { return this._name; }
  get courses() { return this._courses; }
  set courses(aList) { this._courses = aList; }
}

class Course {
  constructor(name, isAdvanced) {
    this._name = name;
    this._isAdvanced = isAdvanced;
  }
  get name() { return this._name; }
  get isAdvanced() { return this._isAdvanced; }
}
const aPserson = new Person('motiveko');

// 클라이언트..

// 읽기
let numAdvancedCourses = aPserson.courses.filter((c) => c.isAdvanced).length;

// 컬렉션 쓰기 => set course() 사용
const basicCourseNames = readBasicCourseNames(filename);
aPserson.courses = basicCourseNames.map(name => new Course(name, false));

// 컬렉션 쓰기 => 컬렉션의 push 메서드 직접호출(직접 컬렉션 조작)
for(const name of readBasicCourseNames(filename)) {
  aPersone.courses.push(new Course(name, false))
}
```
- 현재의 쓰기 방식으로 `courses`컬렉션을 조작하면 `Person`클래스가 더는 **컬렉션을 제어하지 못하기 때문에 캡슐화가 깨진다.** 컬렉션 추가/제거 메서드를 추가한다.
```js
class Person {
  // ...

  addCourse(aCourse) {
    this._courses.push(aCourse);
  }
  removeCourse(aCourse, fnIfAbsent = () => {throw new RangeError();}) {
    const index = this._courses.indexOf(aCourse);
    if(index === -1) fnIfAbsent();
    else this._courses.splice(index, 1);
  }
}

// 클라이언트..
for(const name of readBasicCourseNames(filename)) {
  aPersone.courses.push(new Course(name, false))
}
```
- 이렇게 하면 `setCourses()`를 쓸 필요가 없기 때문에 제거해도 된다. 세터로 제공해야 할 특별한 이유가 있다면, ***인수로 받은 컬렉션의 복제본을 필드에 저장하게 한다.***
```js
class Person {
  // ...
  set courses(aList) { this._courses = aList.slice(); }
}
```
- 마틴 파울러의 경험상, 컬렉션에 대해 어느정도 강박을 가지고 불필요한 복제본을 만드는 편이 예상치 못한 수정이 촉발한 오류를 디버깅 하는 것보다 낫다고 한다! 자바스크립트는 특히나 컬렉션을 수정하는 연산이 원본을 수정하는것들이 많아서( mutable, ex) `sort()`) 복제본을 만드는것이 특히 중요하다!

<br>

### 7.3 기본형을 객체로 바꾸기
```js
orders.filter(o => 'high' === o.priority || 'rush' === o.priority).length

// 기본형을 객체로..
orders.filter(o => o.priority.higherThan(new Priority("normal"))).length
```

<br>

### 7.3.1 설명
- 개발 초기 단순한 정보를 숫자/문자열 같은 기본형으로 표현할 때가 많은데, 개발이 진행되다 보면 이게 복잡해지는 경우가 있다.
- 예를들어, 전화번호를 문자열로 표현했는데 나중에 포매팅이나 지역코드 추출 등의 동작이 필요해질 수 있다.
- ***'단순 출력' 이상의 기능이 필요하면, 그 데이터를 표현하는 전용 클래스를 정의하자.*** 기능이 커질수록 코드베이스에 미치는 개선 효과는 놀랄만큼 커진다.

<br>

### 7.3.2 절차
1. 변수를 캡슐화 한다.
2. 단순한 값 클래스를 만든다.
3. 정적 검사를 수행한다.
4. 값 클래스의 인스턴스를 만들어 필드에 저장하도록 세터를 수정한다. 
5. 새로 만든 클래스의 게터를 호출한 결과를 반환하도록 게터를 수정한다.
6. 테스트한다.
7. 함수 이름을 바꾸면 접근자의 동작을 더 잘 드러낼 수 있는지 검토한다.

<br>

### 7.3.3 예시
1. STEP 1
- 간단한 Order 클래스를 살펴보자. 주문의 우선순위(priority)속성을 간단한 문자열로 표현한다.
```js
class Order {
  constructor(data) {
    this.priority = data.priority;
    // ...
  }
}

highPriorityCount = orders.filter(
  (o) => "high" === o.priority || "rush" === o.priority
).length;
```
- 변수를 캡슐화한다. 그리고 실질적인 값인 문자열을 반환하는 함수도 필요하다. 
```js
class Priority {
  constructor(value) { this._value = value; }
  toString() { return this._value; }
}
```
- 게터를 만들어도 되지만 이런 상황에서는 `toString()`이 더 적절하다.
- `Order`클래스를 맞춰서 수정한다. 
```js
class Order {
  get priorityString() { return this._priority.toString(); }
  set priorityString(aString) { this._priority = new Priority(aString); }
}
```
- `toString()` 호출값을 반환하기 때문에  `get priorityString()`으로 게터 이름을 지었다.
- 클라 코드는 아래와 같이 바뀔것이다.
```js
highPriorityCount = orders.filter(
  (o) => "high" === o.priorityString || "rush" === o.priorityString
).length;
```

<br>

2. STEP 2
- 여기서 `Priority`라는 `위임 객체`를 캡슐화 하는게 맞을까? 아니라고 본다. 따라서 클라에서 `Priority`를 직접 사용 가능하도록 `Order`클래스에 게터를 제공한다.
```js
class Order {
  get priority { return this._priority; }
  // get priorityString() { return this._priority.toString(); }
  // set priorityString(aString) { this._priority = new Priority(aString); }
}

// 클라이언트
highPriorityCount = orders.filter(
  (o) => "high" === o.priority.toString() || "rush" === o.priority.toString()
).length;
```
- `Order`의 priority 세터가 `Priority`객체도 받을 수 있도록 `Priority`의 생성자를 수정한다.
```js
class Priority {
  constructor(value) {
    if(value instanceof Priority) return value;
    this._value = value;
  }
}
```
- `Priority`클래스를 굳이 만든건 새로운 동작을 담기 위해서다. 우선순위 값을 검증하고 비교하는 로직을 추가한다.
```js
class Priority {
  constructor(value) {
    if(value instanceof Priority) return value;
    // 값의 유효성 검증
    if(Priority.legalValues().includes(value))
      this._value = value;
    else
      throw new Error(`<${value}>는 유효하지 않은 우선순위입니다.`);
  }

  toString() { return this._value; }
  // 우선순위
  get _index() { return Priority.legalValues().findIndex(s => s === this._value); }

  // 우선순위 순서대로, 유효한 값들의 배열(static)
  static legalValues() { return ['low', 'normal', 'high', 'rush']; }

  // 우선순위는 _index로 구분한다.
  equals(other) { return this._index === other._index; }
  higherThan(other) { return this._index > other._index; }
  lowerThan(other) { return this._index <> other._index; }
}

// 클라
highPriorityCount = orders.filter(
  (o) => o.priority.higherThan(new Priority('normal'))
).length;
```
- 위와같이 `Priority`를 객체로 만들면 `higherThan`로직도 넣고, 추가로 `값 validation`, `lowerThan()`, `equals()` 등의 다양한 기능들을 손쉽게 추가할 수 있게 된다.

<br>

### 7.4 임시 변수를 질의 함수로 바꾸기

### 7.4.1 설명
- 긴 함수의 한 부분을 별도 함수로 추출하고자 할 때, 먼저 변수를 각각의 함수로 만들면 따로 인자를 전달할 필요가 없어 리팩토링이 쉽다.
- 변수를 질의 함수로 만들면 비슷한 계산을 수행하는 다른 함수에도 쓸 수 있어 반복을 줄일 수 있다.
- 이 리팩토링 기법은 클래스에서 사용할 때 특히 좋다.
  - 하나의 클래스 내에서는 컨텍스트를 공유하기 때문
  - 클래스 외에서 이 방식은, 컨텍스트를 공유하지 않기 때문에 매개변수를 너무 많이 전달하게 된다. (내부 중첩 함수로 써도 되긴 하나 이건 재활용하기가 어려워 진다는 단점이 있다.)

<br>

### 7.4.2 절차
- 생략

<br>

### 7.4.3 예시
- 간단한 Order 클래스를 리팩토링한다.
```js
class Order {
  constructor(quantity, item) {
    this._quantity = quantity;
    this._item = item;
  }

  get price() {
    const basePrice = this._quantity * this._item.price;
    let discountFactor = 0.98;

    if(basePrice > 1000) discountFactor -= 0.03;
    return basePrice * discountFactor;
  }
}
```
- `basePrice`를 질의함수(getter)로 추출하고 인라인한다.
```js
class Order{
  //...
  get price() {
    let discountFactor = 0.98;

    if(this.basePrice > 1000) discountFactor -= 0.03;
    return this.basePrice * discountFactor;
  }

  get basePrice() {
    return this._quantity * this._item.price;
  }
}
```
- `discountFactor`도 추출한다. (선언부터 if 재할당까지 묶어서 리팩터 하면 추출된다.)
```js
class Order {
  get price() {
    let discountFactor = this.discountFactor;
    return this.basePrice * discountFactor;
  }

  get discountFactor() {
    let discountFactor = 0.98;

    if (this.basePrice > 1000)
      discountFactor -= 0.03;
    return discountFactor;
  }
}
```
- 변수인라인하기 한다.
```js
get price() {
    return this.basePrice * this.discountFactor;
}
```

<br>

### 7.5 🔥 클래스 추출하기
### 7.5.1 설명
- ***'클래스는 반드시 명확하게 추상화 하고 소수의 주어진 역할만 처리해야 한다.'*** 는 원칙에 따라 클래스를 쪼갠다.
- 일부 데이터와 메서드를 따로 묶을 수 있다면 이것은 어서 분리하라는 신호다.
- 함께 변경되는 일이 많거나 서로 의존하는 데이터는 분리한다.

<br>

### 7.5.2 절차
1. 클래스를 쪼개고, 필드를 옮긴다.
2. 이후 메서드를 옮긴다. 이 때 저수준의 메서드(주로 호출당하는, private 같은거)를 먼저 옮긴다.
3. 양 클래스의 인터페이스를 살펴보고 불필요한건 제거한다.
4. 새 클래스를 외부로 노출할지 정한다. 노출하게 되면 새 클레스에 `참조를 값으로 바꾸기`를 적용하면 좋을지 확인해본다.

<br>

### 7.5.3 예시
- 아래 `Person`클래스는 이름과 전화번호 데이터/메서드를 가지고 있다.
```js
class Person {
  // constructor.. 

  get name() { return this._name; }
  set name(arg) { this._name = arg; }
  get telephoneNumber() { return `(${this.officeAreaCode} ${this.officeNumber})`; }
  get officeAreaCode() { return this._officeAreaCode; }
  set officeAreaCode(arg) { this._officeAreaCode = arg; }
  get officeNumber() { return this._officeNumber; }
  set officeNumber(arg) { this._officeNumber = arg; }
}
```
- 전화번호를 `TelephoneNumber`클래스로 분리한다.
```js
class TelephoneNumber {
  get telephoneNumber() { return `(${this.officeAreaCode} ${this.officeNumber})`; }
  get officeAreaCode() { return this._officeAreaCode; }
  set officeAreaCode(arg) { this._officeAreaCode = arg; }
  get officeNumber() { return this._officeNumber; }
  set officeNumber(arg) { this._officeNumber = arg; }
}

class Person {
  public telephoneNumber: TelephoneNumber;
}
```
- `Person`클래스에 `TelephoneNumber`를 public 프로퍼티로 둬서 외부에서 `TelephoneNumber`에 직접 접근할 수 있게 한다. 이러면 `areaCode`, `officeNumber`같은 프로퍼티는 Person에서는 신경쓸 필요가 없어진다.(private으로 한 경우에는 이야기가 달라진다.)


<br>

### 7.6 클래스 인라인하기
### 7.6.1 설명
- 클래스 추출하기의 반대. 역할을 옮기는 리팩토링을 하다보니 클래스에 남은 역할이 없을 때 이런 현상이 자주 생긴다. 역할이 없는 클래스를 많이 사용하는 클래스로 흡수시킨다.

<br>

### 7.6.2 예시
```js
class TrackingInformation {
  get shippingCompany() { return this._shippingCompany; }
  set shippingCompany(arg) { this._shippingCompany = arg; }
  get trackingNumber() { return this._trackingNumber; }
  set trackingNumber(arg) { this._trackingNumber = arg; }
  get display() {
    return `${this.shippingCompany}: ${this.trackingNumber}`;
  }
}

class Shipment {
  get trackingInfo() {
    return this._trackingInformation.display;
  }
  get trackingInformation() { return this._trackingInformation; }
  set trackingInformation(aTrackingInformation) {
    this._trackingInformation = aTrackingInformation;
  }
}
```
- `TrackingInformation`을 `Shipment`로 옮겨야 한다. 우선 `TrackingInformation`의 메서드를 직접 호출하는 부분을 찾는다.
```js
// client..
aShipment.trackingInformation.shippingCompany = request.vendor;
```
- 이 메서드를 `Shipment`로 옮긴다. 이 때 `Shipment`에 위임함수를 만들고 클라이언트에서 이를 호출하도록 변경하는 방식으로 한다.

```js
class Shipment {

  // 함수 옮기기..
  set shippingCompany(arg) { this._trackingInformation.shippingCompany = arg;}
}

// client
aShipment.shippingCompany = request.vendor;
```
- 클라이언트에서 호출하는 `TrackingInformation`의 모든 요소를 이런식으로 `Shipment`로 옮긴다. 그리고 직접 클라이언트에서 직업 호출되지 않는 남는 부분(`Shipment에서` 호출하는 부분)도 옮긴다. 다 옮기면 `TrackingInformation`는 삭제하믄 된다.
```js
class Shipment {
  get shippingCompany() { return this._shippingCompany; }
  set shippingCompany(arg) { this._shippingCompany = arg; }
  get trackingNumber() { return this._trackingNumber; }
  set trackingNumber(arg) { this._trackingNumber = arg; }
  get display() {
    return `${this.shippingCompany}: ${this.trackingNumber}`;
  }  
}

```

### 7.7 🔥위임 숨기기🔥
### 7.7.1 🔥설명🔥
- 모듈화 설계의 핵심은 캡슐화다. 캡슐화의 기본은 필드를 숨기는 것인데, 이것의 의미는 단순히 필드를 숨기는게 아니라 `객체`의 필드가 가리키는 객체(`위임 객체`)를 숨겨, `객체`를 사용하는 쪽(클라)에서 `위임 객체`의 인터페이스가 변해도 코드를 수정할 필요가 없어지게 해준다.(클라는 위임 객체를 몰라도 된다. 위임 객체에 의존하는 객체만 바꿔주면 된다.)

<br>

### 7.7.2 🔥절차🔥
1. `위임 객체`의 각 메서드에 해당하는 위임 메서드를 이를 의존하는 `객체`에 생성한다.
2. `클라이언트`가 `위임 객체` 대신 `객체`를 호출하도록 수정한다.
3. 모두 수정했다면 `객체`에서 `위임 객체`로의 접근자를 제거한다.(private)

<br>

### 7.7.3 🔥예시🔥
```js
class Person {
  get department() { return this._department; }
  set department(arg) { this._department = arg; }
}

class Department {
  get charCode() { return this._charCode; }
  set charCode(arg) { this._charCode = arg; } 
}

// client
charCode = aPerson.department.charCode;
```
- 클라이언트는 charCode를 얻기 위해 `Person`의 필드인 `Departement`(위임객체)를 직접 접근하고있다. 이를 숨겨보자.
```js
class Person {
  // get department() { return this._department; }
  get charCode() { return this._department.charCode; }
}

// client
charCode = aPerson.charCode;
```
- `Persone`에서 `Departement`로의 접근자도 깔끔하게 제거했다.

<br>

### 7.8 중개자 제거하기
### 7.8.1 설명
- 위임 숨기기의 반대
- 클라이언트가 `위임 객체`의 또 다른 기능을 사용하고 싶을 때마다 `서버`에 위임 메서드를 추가해야 하는데, 이게 너무 많아지면 서버가 단순히 중재자가 되어 버려 그냥 직접 위임 객체를 쓰는게 나아진다.
- 추상화도 정도껏 잘 하는게 중요하다는 것.

### 7.8.2 절차
1. 위임 객체를 얻는 게터를 만들고
2. 모든 위임 메서드 호출이 이 게터를 거치도록 하고
3. 모든 위임 메서드는 제거한다.

### 7.8.3 예시
```js
manager = aPerson.manager;

class Person {
  get Person() { return this._department.manager; }
}

class Department {
  get manager() { return this._manager; }
}
```
- 위임제거
```js
class Person {
  get department() { return this._department; }
}
manager = aPerson.department.manager;
```
<br>

### 7.9 알고리즘 교체하기
### 7.9.1 설명
- 어떤 목적을 달성하는 방법은 여러가지인데, 더 쉬운 방법을 찾으면 그걸로 교체한다.
- 리팩터링은 복잡한 대상을 단순한 단위로 나누는 것으로 코드를 단순하게 만든다.
- 하지만 때론 알고리즘 전체를 교체하는게 쉬울 때가 있다. **예를 들면 내 동작과 같은 동작을 하는 라이브러리를 찾는것이다.**
- 🔥 사실 이걸 하려면 ***먼저 메서드를 가능한 잘게 나눠야 한다.*** 거대하고 복잡한 알고리즘은 교체하기 어렵다.

<br>

### 7.9.2 절차
1. 교체할 코드를 하난의 함수를 모은다.
2. 이 함수만을 이용해 동작을 검증하는 테스트를 마련한다.
3. 대체할 알고리즘을 준비한다.
4. 정적검사한다.(컴파일)
5. 기존 알고리즘과 새 알고리즘 결과를 비교하는 테스트 수행

<br>

### 7.9.3 예시
생략

<br>


## 8. 기능 이동
### 8.1 함수 옮기기
```js
// 함수를
class Account {
  get overdraftCharge() { ... }
}

// 옮긴다
class AccountType {
  get overdraftCharge() { ... }
}
```
### 8.1.1 설명
- 좋은 소프트웨어 설계의 핵심은 모듈화가 얼마나 잘 되어있는지를 뜻하는 모듈성이다. 모듈성이란 어딘가 수정하려 할 때 해당 기능의 작은 일부만 이해해도 수정이 가능하게 해주는 능력이다.
- 함수는 어떤 컨텍스트(객체지향에선 보통 클래스) 안에 존재한다. 
- 어떤 함수가 자신이 속한 모듈 A보다 다른 모듈 B의 요소를 더 많이 참조한다면 함수는 B 모듈로 옮겨줘야 한다.
- 함수의 호출자들의 위차나 다음 업데이트 때 바뀌리라 예상되는 위치들에 따라서도 함수를 옮껴야 할 수도 있다.
- 이런건 코드와 비즈니스로직을 잘 이해하면 점점 어디에 있어야 할 지 보이게 된다.( 함수를 어떤 컨텍스트에 위치시켜야 할 지)

<br>

### 8.1.2 절차
- 옮길 함수가 현재 컨텍스트에서 사용중인 모든 요소를 살펴보고, 함께 옮길것도 찾아보자.
  - 함께 옮길것이 여러개라면 작은것부터 옮긴다.
- 함수가 다형 메서드인지 확인하자.(슈퍼/서브 클래스에도 선언된거면 그것도 고려해서 옮겨야한다.)
- 선택 함수를 타깃 컨텍스트에 복사한다.
- 정적 분석을 수행한다.
  - 소스 컨텍스트에 있는 요소를 참조하고 있을 경우 에러가 뜰것이다.
- 소스 컨텍스트에서 타깃 함수를 참조할 방법을 찾아 반영한다.(인수로 전달 등..)
- 소스 함수가 타깃 함수의 위임 함수가 되도록 한다
- 테스트
- 위임 함수를 제거하고 소스 함수를 인라인 해도 될 지 고민해보자.
  - 보통은 위임하는것보다 옮긴 함수를 인라인 하는게 낫다.

<br>



### 8.1.3 예시
- GPS 계산 함수는 생략
- 다른클래스로 옮기는 방법을 살펴보자
```js
class Account {
  // ... 

  get bankCharge() {
    let result = 4.5;
    if(this._daysOverdrawn > 0) result += this.overdraftCharge;
    return result;
  }

  get overdraftCharge() { // 초과 인출 이자 계산
    if(this.type.isPremium) {
      const baseCharge = 10;
      if(this.daysOverdrawn <= 7) {
        return baseCharge;
      } else {
        return baseCharge + (this.daysOverdrawn - 7) * 0.85;
      }
    }
    return this.daysOverdrawn * 1.75;
  }
}
```
- 계좌 종류(type)에 따라 이자 책정 알고리즘을 계속 변경해야한다고 해보자. 이렇게 되면 `overdraftCharge()`을 `AccountType(this.type)`객체로 옮겨주는 게 낫다.
```js
class AccountType {
  overdraftCharge(daysOverdrawn) { // 1
    if(this.type.isPremium) {
      const baseCharge = 10;
        if(daysOverdrawn <= 7) {
          return baseCharge;
        } else {
          return baseCharge + (daysOverdrawn - 7) * 0.85;
        }
    }
    return daysOverdrawn * 1.75;
  }
}

class Account {
  //...

  get overdraftCharge() { // 2
    return this.type.overdraftCharge(this.daysOverdrawn)
  }
}
```
- 1. `AccountType.overdraftCharge`에 `Account.daysOverdrawn`을 인자로 전달했다(소스 컨텍스트의 참조)
  - 여기서는 한개만 참조하면 되기 때문이지만, `Account` 클래스(컨텍스트)의 많은 요소를 참조한다면 `Account`를 통째로 전달한다. 
- 2. Account의 `get overdraftCharge()`은 위임함수로 쓰여졌다. 이 예제에서는 위임함수가 별로 필요 없을 것 같다. 따라서 인라인 해보면 
```js
class Account {
  // ...
  get bankCharge() {
    let result = 4.5;
    if(this._daysOverdrawn > 0) result += this.type.overdraftCharge(this.daysOverdrawn);
    return result;
  }
}
```
- 요렇게 `type.overdraftCharge()`을 인라인으로 바로 호출하면 된다.

<br>

### 8.2 필드 옮기기
```js
// AS-IS
class Customer {
  get plan() { return this._plan; }
  get discountRage() { return this._discountRate; }
}

// TO-BE
class Customer {
  get plan() { return this._plan; }
  get discountRate() { return this.plan.discountRate; }
}
```
### 8.2.1 설명
- 주어진 문제에 적합한 데이터 구조를 활용하면 동작 코드는 자연스럽게 단순하고 직관적으로 바뀐다. 데이터 구조가 이상하면 자연스럽게 복잡해진다.
- 이건 설계의 영역인데, `도메인 주도 설계` 같은걸 공부하면 좋다.
- 근데 아무리 공부해도 초기 설계에서 실수가 나와서 리팩토링을 해야 할 수 밖에 없어진다. 
- 예를들어
  - 함수에 어떤 레코드를 넘길 때 마다 다른 레코드를 같이 넘기는 경우 => 묶어야지?
  - 한 레코드를 변경하려 할 때 다른 레코드를 변경해야 하는 경우 => 필드 위치가 분명 잘못된거다. 한 곳만 수정하게 바뀌어야 한다.
- 이럴 때 필드 옮기기가 필요하다.
- 레코드(객체리터럴) 말고 캡슐화가 된 클래스 데이터는 훨씬 쉬워진다.

<br>

### 8.2.2 절차
1. 소스 필드를 캡슐화한다.
2. 타깃 객체에 필드(접근자)를 생성한다.
3. 소스 객체에서 타깃 객체를 참조할 수 있는지 확인한다.
4. 접근자가 타깃 필드를 사용하도록 수정한다.
- 여러 소스에서 같은 타깃을 공유한다면, 먼저 세터를 수정하여 타깃 필드와 소스 필드 모두 갱신하게하고(동기화), 이어서 일관성을 깨트리는 갱신을 검출할 수 있도록 `assertion`같은걸 추가한다. 모든게 잘 마무리되었다면 접근자들이 타깃 필드를 사용하도록 수정한다.
5. 소스 필드를 제거한다.

<br>

### 8.2.3 예시
1. `Customer`에서 `CustomerContract`로 `discountRate`를 옮기려한다.
```js
class Customer {
  constructor(name, discountRate) {
    this._name = name;
    this._discountRate = discountRate;
    this._cotract = new CustomerContract(dateToday());
  }

  get discountRate() { return this._discountRate; }
  becomePreferred() {
    this._discountRate += 0.3;
    // ...
  }

  applyDiscountRate(amount) {
    return amount.substract(amount.multiply(this._discountRate));
  }
}

class CustomerContract {
  constructor(statrDate) {
    this._startDate = startDate;
  }
}
```
- `Custmoer`에서 변수 캡슐화한다.
```js
class Customer{
  // ....
  _setDiscountRate(aNumber) { this._discountRate = aNumber; }
  becomePreferred() {
    this._setDiscountRate(this.discountRate + 0.3);
    // ...
  }
  applyDiscountRate(amount) {
    return amount.substract(amount.multiply(this.discountRate));
  }
}
```
2. `CustomerContract`에 옮기려는 `discountRate` 필드와 접근자를 추가한다.
```js
class CustomerContract {
  constructor(statrDate, discountRate) {
    this._startDate = startDate;
    this._discountRate = discountRate;
  }
  get discountRate() { return this._discountRate; }
  set discountRate(arg) { this._discountRate = arg; }
}
```
3. `Customer`의 접근자들이 새 필드(`CustomerContract.discountRate`)를 사용하도록 변경한다. 하다보면 `Customer`의 `discountRate`필드가 지워지면서 생성자의 `this._discountRate = discountRate;`부분에서 에러가 나는데, 이런건 알아서 적절하게 치료해준다.
```js
class Customer {
  constructor(name, discountRate) {
    this.name = name;
    this._cotract = new CustomerContract(dateToday());
  }
  get discountRate() { return this._cotract.discountRate; }
  _setDiscountRate(aNumber) { return _cotract.discountRate = aNumber; }
}
```

<br>

2. 공유 객체로 이동하기(복잡)
- 이자율을 계좌(`Account`)별로 설정하고 있는데, 이를 계좌 타입(`AccountType`)별로 정해지도록 하고 싶다.
```js
class Account {
  constructor(number, type, interestRate) {
    this._number = number;
    this._type = type;
    this._interestRate = interestRate;
  }
  get interestRate() { return this._interestRate; }
}

class AccountType {
  constructor(nameString) {
    this._name = nameString;
  }
}
```
- 이자율 필드는 캡슐화 되어있다. `AccountType`에 `interestRate` 필드와 접근자를 만든다.
```js
class Accounttype {
  constructor(nameString, interestRate) {
    this._name = nameString;
    this._interestRate = interestRate;
  }
  get interestRate() { return this._interestRate; }
}
```
- `Account`에서 `AccountType`의 이자율을 가져오도록 수정하면 문제가 될 수 있다. 이전에는 각 계좌마다 자신의 이자율을 가지고 있었는데, 이제는 계좌 종류가 같으면 같은 이자율을 가지길 원하는 상태인데, 이게 계좌마다 이전과 동일한 이자율을 가지게 되는지는 알 수가 없기 때문( `Account` 인스턴스 생성시에 type과 interestRate가 딱 db같은데서 이미 묶여있어서 동일하게 들어갔다는 보장이 있다면 모를까? )
- **수정 전과 후의 겉보기 동작이 달라지기 때문에 더 이상 리팩토링이 아니다.**
- 이런 경우 db를 확인해서 모든 계좌의 이자율이 계좌 종류에 부합하게 설정되어있는지 확인하는게 젤 좋고, 코드레벨에서는 `Account` 생성자에 `assertion`을 추가하거나 뭐 에러 로깅하거나 이런걸 할 수 있다.
```js
class Account {
  constructor(number, type, interestRate) {
    this._number = number;
    this._type = type;
    assert(interestRate === this._type.interestRate);
    this._interestRate = interestRate;
  }
  get interestRate() { return this._interestRate; } // 일단 모니터링 하면서, 기존 Account의 interestRate 값을 그대로 쓴다.
}
```
- 이렇게 운영하면서 오류가 나는지 확인해보고, assertion을 다 통과한다고 생각되면 `Account`의 `interestRate`접근자를 아래와 같이 수정한다.
```js
class Account {
  // ...
  get interestRate() { return this._type.interestRate; }
}
```

<br>

### 8.3 문장을 함수로 옮기기
```js
// AS-IS
result.push(`<p>제목: ${person.photo.title}</p>`);
result.concat(photoData(person.photo));

function photoData(aPhoto) {
  return [
    `<p>위치: ${aPhoto.location}</p>`,
    `<p>날짜: ${aPhoto.date.toDateString()}</p>`,
  ]
}

// TO-BE
result.concat(photoData(person.photo));
function photoData(aPhoto) {
  return [
    `<p>제목: ${person.photo.title}</p>`,
    `<p>위치: ${aPhoto.location}</p>`,
    `<p>날짜: ${aPhoto.date.toDateString()}</p>`,
  ]
}
```

<br>

### 8.3.1 설명
- `중복 제거`는 코드를 건강하게 관리하는 방법 중 하나.
  - 특정 함수 호출시 그 앞뒤로 똑같은 코드가 실행되는 모습이 관찰된다면? => 하나의 함수로 합친다.
- 이렇게 합쳐진 함수가 나중에 다시 쪼개야 할 때는 반대 리팩터링인 `문장을 호출한 곳으로 옮기기`를 하면 된다.
- 문장을 함수로 옮기려면, 문장들이 피호출 함수의 일부라는 확신이 있어야 한다.
- 일부가 아니지만 함께 호출 되어야 한다면, 문장과 피호출 함수를 통째로 `하나의 함수로 추출`하면 된다.

<br>

### 8.3.2 절차
1. 반복 코드가 함수 호출 부분과 멀리 떨어져 있다면, `문장 슬라이드하기`를 적용해 근처로 옮긴다.
2. 타깃 함수를 호출하는 곳이 한 곳 뿐이라면, 소스에서 문장 코드를 잘래서 피호출 함수로 복사하고 테스트하면 끝.
3. 호출자가 여러곳이면, 한 곳에서 타깃 함수 호출과 문장을 함께 `다른 함수로 추출`한다.
4. 나머지 호출자들 하나씩 찾아가서 추출한 함수를 호출하도록 한다.
5. 모든 호출자가 추출한 함수를 호출하면, 원래 함수는 `새로운 함수 안으로 인라인`한 후 지운다.
6. 새로운 함수(추출한 함수)의 이름을 원래 함수 이름으로 바꿔준다.

<br>

### 8.3.2 예시
- 사진 데이터를 HTML로 만드는 코드다.
```js
function renderPerson(outStream, person) {
  const result = [];
  result.push(`<p>${person.name}</p>`);
  result.push(renderPhoto(person.photo));
  result.push(`<p>제목: ${person.photo.title}</p>`); // 문장
  reslut.push(emitPhotoData(person.photo)); // 함수
  return result.join('\n');
}

function photoDiv(photo) {
  return [
    '<div>',
    `<p>제목: ${photo.title}</p>`,
    emitPhotoData(photo),
    '</div>'
  ].join('\n');
}

function emitPhotoData(aPhoto) {
  const result = [];
  result.push(`<p>위치: ${aPhoto.location}</p>`);
  result.push(`<p>위치: ${aPhoto.date.toDateString()}</p>`);
  return result.join('\n');
}
```
- '제목 출력'(문장)과 `emitPhotoData()`를 연달아 호출하는 부분이 두개가 있다. 우선 한 쪽 호출(`photoDiv()`)에서 문장과 함수를 `다른 함수로 추출`한다.

```js
function photoDiv(photo) {
  return [
    '<div>',
    newFunction(photo)
    '</div>'
  ].join('\n');
}

function newFunction(photo) {
  return [
    `<p>제목: ${photo.title}</p>`,
    emitPhotoData(photo),
  ].join('\n');
}
function emitPhotoDate(photo) { ... }
```
- `renderPerson()`로 가서 추출한 `newFunction()`이 적절하게 호출될 수 있게 해준다. 그리고 `newFunction()`에서 `emitPhoto()`를 인라인하고 `emitPhoto()` 는 지우고 `newFuction()` 이름을 `emitPhoto`로 바꿔준다.(함수 이름 바꾸기)
```js
function renderPerson(outStream, person) {
  const result = [];
  result.push(`<p>${person.name}</p>`);
  result.push(renderPhoto(person.photo));
  reslut.push(emitPhotoData(person.photo));
  return result.join('\n');
}

function emitPhoto(photo) {
  return [
    `<p>제목: ${photo.title}</p>`,
    `<p>위치: ${aPhoto.location}</p>`,
    `<p>위치: ${aPhoto.date.toDateString()}</p>`
  ].join('\n');
}
```
- 예제에서 `emitPhoto()` + `제목 출력`을 `newFunction()`으로 다른 함수로 추출하거나 `emitPhoto()`를 마지막에 인라인 하는것이 IDE의 리팩토링 기능같은걸 해서는 자동으로 할 수 없다는걸 알 수 있다. 테스트 코드가 중요한 이유이다.


<br>

### 8.4 문장을 호출한 곳으로 옮기기
```js
// AS-IS
emitPhotoData(outStream, person.photo);

function emitPhotoData(outStream, photo) {
  outStream.write(`<p>제목: ${photo.title}</p>\n`);
  outStream.write(`<p>위치: ${photo.location}</p>\n`);
}

// TO-BE
emitPhotoData(outStream, person.photo);
outStream.write(`<p>위치: ${photo.location}</p>\n`);

function emitPhotoData(outStream, photo) {
  outStream.write(`<p>제목: ${photo.title}</p>\n`);
}
```
### 8.4.1 설명
- `함수`는 추상화의 기본 빌딩 블록이다. 근데 추상화라는 것이 그 경계를 항상 올바르게 긋는게 어렵다.
- 코드베이스의 기능 범위가 달라지면 추상화 경계도 움직이고, 이에 따라 초기에는 응집도 높고 한가지 일만 하던 함수가 어느새 둘 이상의 다른 일을 하고 있게 된다.
- 여러 곳에서 사용하던 기능이 일부 호출자에게 다르게 동작하도록 바뀌어야 한다면 이런 일이 벌어진다.
  - 달라진 동작을 함수에서 꺼내고 호출자들로 일일이 옮겨줘야 한다.
- `문장 슬라이드하기`로 달라지는 동작을 함수의 시작or끝으로 옮기고 `문장을 호출한 곳으로 옮기기`를 적용하면 된다.

<br>

### 8.4.2 절차
1. 피호출 함수의 처음 or 마지막 줄에 빼낼 문장을 옮긴 뒤, 이걸 잘라내서 함수 호출부에 가서 붙여넣는다.(필요시 적당한 수정). 테스트도 한다.(보통 이걸로 끝남)

<br>

좀 더 복잡하지만 안전한 방식

1. 함수 내에서 이동하지 않기 윈하는 모든 문장을 `함수로 추출`한 다음 적절한 이름을 붙인다.
2. 함수 호출부에 가서 원래 함수를 인라인 한다.(추출 함수 + 문장)
3. 원래 함수 제거하고 추출 함수의 이름을 원래 함수로 바꿔준다.

<br>

### 8.4.3 예시
```js
function renderPerson(outStream, person) {
  outStream.write(`<p>${person.name}</p>\n`)
  renderPhto(outSteram, person.photo);
  emitPhotoData(outStream, person.photo);
}

function listRecentPhotos(outStream, photos) {
  photos
    .filter(p => p.date > recentDateCutoff())
    .forEach(p => {
      outStream.write("<div>\n")
      emitPhotoData(outStream, p);
      outStream.write("</div>\n")
    })
}

function emitPhotoData(outStream, photo) {
  outStream.write(`<p>제목: ${photo.title}</p>\n`);
  outStream.write(`<p>날짜: ${photo.date.toDateString()}</p>\n`);
  outStream.write(`<p>위치: ${photo.location}</p>\n`);
}
```
- `renderPerson()`은 그대로 두고 `listRecentPhotos()`에서 위치 정보를 다르게 렌더링 해야 한다.
- `emitPhotoData()`에서 남길 코드를 함수로 추출한다.
```js
function emitPhotoData(outStream, photo) {
  tempFunction(outStream, photo);
  outStream.write(`<p>위치: ${photo.location}</p>\n`);
}
function tempFunction(outStream, photo) {
  outStream.write(`<p>제목: ${photo.title}</p>\n`);
  outStream.write(`<p>날짜: ${photo.date.toDateString()}</p>\n`);
}
```
- `emitPhotoData()`호출하는 곳 마다 찾아가 `tempFunction()`와 문장을 호출하도록 인라인한다.
```js
function renderPerson(outStream, person) {
  outStream.write(`<p>${person.name}</p>\n`)
  renderPhto(outSteram, person.photo);
  tempFunction(outStream, person.photo);
  outStream.write(`<p>위치: ${person.photo.location}</p>\n`);
}

function listRecentPhotos(outStream, photos) {
  photos
    .filter(p => p.date > recentDateCutoff())
    .forEach(p => {
      outStream.write("<div>\n")
      emitPhotoData(outStream, p);
      tempFunction(outStream, p);
      outStream.write(`<p>위치: ${p.location}</p>\n`);
      outStream.write("</div>\n")
    })
}
```
- 원래 함수를 지워 함수 인라인을 마무리한다. 그리고 추출한`tempFunction()`의 이름을 `emitPhotoData()`로 되돌려준다.

```js
function emitPhotoData(outStream, photo) {
  outStream.write(`<p>제목: ${photo.title}</p>\n`);
  outStream.write(`<p>날짜: ${photo.date.toDateString()}</p>\n`);
}
```


<br>

### 8.5 인라인 코드를 함수 호출로 바꾸기
```js
// AS-IS
let appliesToMass = false;
for(const s of states) {
  if( s === "MA") appliesToMass = true;
}

// TO-BE
appliesToMass = states.includes("MA");
```
### 8.5.1 설명
- `함수`는
  - 여러 동작을 하나로 묶어준다.
  - 함수 이름이 코드의 목적을 말해주기 때문에 코드를 이해하기 쉬워진다.
  - 중복을 없애는데 효과적이다.
- 이미 존재하는 함수와 똑같은 일을 하는 인라인 코드를 발견하면, 보통은 대체하면 된다.
  - 예외는 진짜 우연히 하는 일이 똑같은것. 함수가 수정될 때 인라인 코드가 수정되지 않을 가능성이 있다면 하면 안된다. ( 이걸 판단하는데 `함수 이름`이 중요하다 )
  
<br>

### 8.5.2 절차
1. 인라인 코드를 함수 호출로 대체한다.
2. 테스트한다.

<br>

`함수 추출하기`는 동작을 함수로 추출하는거고, `인라인 코드를 함수 호출로 바꾸기`는 동작을 존재하고 있던 함수로 대체하는 것이다.

<br>


### 8.6 문장 슬라이드하기
```js
// AS-IS
const pricingPlan = retrievePricingPlan();
const order = retreiveOrder();
let charge;
const chargePerUnit = pricingPlan.unit;

// TO-BE
const pricingPlan = retrievePricingPlan();
const chargePerUnit = pricingPlan.unit;
const order = retreiveOrder();
let charge;
```

<br>

### 8.6.1 설명
- 관련된 코드들이 가까이 모여있는게 이해하기 더 쉽다. 이렇게 모아주는걸 `문장 슬라이드`라고 한다.
- 예를들어, 변수 선언을 함수 첫머리에 모으는것 보다 변수를 처음 사용할 때 선언하는 것.
- 관련 코드를 모으는 작업은 다른 리팩터링(주로 `함수 추출하기`)의 사전작업이다.

<br>

### 8.6.2 절차
1. 코드 조각(문장)이 이동할 목표 위치를 찾는다. 코드 조각을 모으고 나면 동작이 달라지는 코드가 있는지 살펴본다. 이동이 불가능 한 경우도 많다.
2. 코드를 목표 위치로 옮긴다.
3. 테스트한다.

<br>

### 8.6.3 예시
- 아래 코드들을 슬라이드한다고 할 때 주의할 점들을 찾아보자.
```js
 1 const pricingPlan = retrievePricingPlan();
 2 const order = retrieveOrder();
 3 const baseCharge = pricingPlan.base;
 4 let charge;
 5 const chargePerUnit = pricingPlan.unit;
 6 const units = order.units;
 7 let discount;
 8 charge = baseCharge + units * chargePerUnit;
 9 let discountableUnits = Math.max(units - pricingPlan.discountThreshold, 0);
10 discount = discountableUnits * pricingPlan.discountFactor;
11 if (order.isRepeat) discount += 20;
12 charge = charge - discount;
13 chargeOrder(charge);
```
1. 처음 일곱줄은 선언부로 주의할게 없다.
2. `7 let discount;`를 `10 discount = di...`앞으로 옮기는건 상관 없다. 7~10에 `discount`를 참조하는 코드가 없기 때문이다
3. `2 const order = ret..`도 `6 const units = ...`로 옮겨도 문제가 안된다. `retrieveOrder()`가 부수 효과(`pricingPlan`의 상태 변경)를 일으키지 않는다는 확신이 있다면.
  - 이런 이유로 함수가 외부 상태를 변경시키는 부수 효과를 가지는건 안좋은 방식이다.
  - 이렇게 부수효과를 없게 함수를 짜는걸 `명령-질의 분리 원칙`(command-query separation principle)이라고 한다.

4. `11 if (order.isRepeat) discount += 20;`을 코드 끝으로 슬라이드 하고 싶어도 이는 불가능하다. 
  - `11 if (order.isRepeat) discount += 20;`이 부수 효과를 가지기 때문(`discount` 상태 갱신)
  - `12 charge = charge - discount;`도 부수 효과를 가진다.(`change` 상태 갱신)그리고 11의 부수효과로 인해 갱신될 여지가 있는 `discount`를 참조하고 있다.
  - 이처럼 ***부수효과가 있는 코드를 슬라이드하거나 부수효과가 있는 코드를 건너뛰어야 하는 경우 신중해야한다.***

<br>

### 8.7 반복문 쪼개기
```js
// AS-IS
let averageAge = 0;
let totalSalary = 0;
for(const p of people) {
  averageAge += p.age;
  totalSalary += p.salary;
}
averageAge = averageAge / people.lenght;

// TO-BE
let totalSalary = 0;
for(const p of people) {
  totalSalary += p.salary;
}

let averageAge = 0;
for(const p of people) {
  averageAge += p.age;
}

averageAge = averageAge / people.lenght;
```

<br>

### 8.7.1 설명
- 반복문 하나가 두 가지 일을 수행하는 경우, 반복문 수정시 두 가지 일 모두를 잘 이해하고 진행해야 한다.(보통 구조체를 반환하거나 지역 변수를 활용하고 있을것이다.)

- 반복문 두번 실행하면 불편할수도 있다.(우선 성능부터) 최적화는 코드를 깔끔하게 정리한 후 병목이 있으면 하면 된다.


<br>

### 8.7.2 절차
1. 반복문을 복제해 두개로 만든다.
2. 반복문이 중복되어 생기는 ***부수효과를 파악해서 제거***한다.
3. 테스트
4. 완료됐으면 각 반복문을 함수로 추출할지 고민해본다.

<br>

### 8.7.3 예시
- 사람들의 전체 급여와 가장 어린 나이를 계산하는 코드
```js
let youngest = people[0] ? people[0]?.age : Infinity;
let totalSalary = 0;
for(const p of people) {
  if(p.age < youngest) youngest = p.age;
  totalSalary += p.salary;
}

return `최연소: ${youngest}, 총 급여: ${totalSalary}`;
```
- 반복문 쪼개고, 중복을 제거한다. 따로 부수효과는 없는듯하다.
- 그리고 문장 슬라이드로 변수를 참조하는 반복문 근처로 모은다.
```js
let totalSalary = 0;
for(const p of people) {
  totalSalary += p.salary;
}

let youngest = people[0] ? people[0]?.age : Infinity;
for(const p of people) {
  if(p.age < youngest) youngest = p.age;
  totalSalary += p.salary;
}

return `최연소: ${youngest}, 총 급여: ${totalSalary}`;
```
- 각 반복문을 함수로 추출한다. 그리고 `반복문을 파이프라인을 바꾸기`를 적용한다.
- 최연소 계산 코드에는 알고리즘 교체하기( 합계계산 => `reduce`)을 적용한다.
```js
return `최연소: ${youngestAge()}, 총 급여: ${totalSalary()}`;

function totalSalary() {
  return people.reduce((total, p) => total + p.salary, 0);
}

function youngestAge() {
  return Math.min(...people.map(p => p.age));
}
```

<br>

### 8.8 반복문을 파이프라인으로 바꾸기
```js
// AS-IS
const names = [];
for(const i of input) {
  if(i.job === 'programmer') names.push(i.name);
}

// TO-BE
const names = input
  .filter(i => i.job === 'programmer')
  .map(i => i.name);
```

<br>

### 8.8.1 설명
- 컬렉션 순회시 전통적으로 반복문을 사용해왔으나, 언어는 더 나은 구조를 제공하는 쪽으로 발전했다.
- `컬렉션 파이프라인`을 이용하면 처리 과정을 일련의 연산으로 표현할 수 있다. 논리를 파이프라인으로 표현하면 훨씬 이해하기 쉽다!

<br>

### 8.8.2 절차
1. 반복문에서 사용하는 컬렉션을 가리키는 변수를 하나 만든다.
2. 반복문의 첫 줄부터 시작해서 각각의 단위 행을 적절한 컬렉션 파이프라인 연산으로 대체한다. 이 때 컬렉션 파이프라인 연산은 1.에서 만든 컬렉션 변수에서 시작하여 이전 연산의 결과를 기초로 연쇄적으로 수행된다.
3. 다했으면 반복문을 지운다.

<br>

### 8.8.3 예시
- 회사 지점 정보 csv 파일에서 인도 사무실들만 찾아서 도시명, 전화번호를 반환하는 코드다.
```js
// CSV
office, country, telephoe
Chigago, USA, +1 312 373 1000
...


function acquireData(input) {
  const lines = input.split('\n');
  let firstLine = ture;
  const result = [];
  for(const line of lines) {
    if(firstLine) {
      firstLine = false;
      continue;
    }
    if(line.trim() === '') continue;
    const record = line.split(',');
    if(record[1].trim() === 'India') {
      result.push({city: record[0].trim(), phone: record[2].trim()});
    }
  }
  return result;
}
```
- 반복문을 쓰니 `firstLine`, `result`같은 지역변수도 만들어 줘야하고, 어떤 일을 하는건지 파악이 쉽지 않다.
- 중간과정 생략하고 그냥 파이프라인으로 교체해보면 야래와 같다.(나는 책 예제에서 `지역변수 선언`을 제거하고 배열 디스트럭처링 문법도 적용하였다.)

```js
function acquireData(input) {
  const lines = input.split('\n'); // 이걸 인라인 하는것보다 이렇게 변수 이름으로 뭔지 나타내주는게 코드 로직이 더 잘 이해된다ㅣ
  return lines
    .slice(1)
    .filter(line => line.trim() !== '')
    .map(line => line.split(','))
    .filter(([,country]) => country.trim()=== 'India')
    .map(([city, ,phone]) => ({city, phone}));
}
```

<br>

### 8.9 죽은 코드 제거하기
- 사용되지 않는 코드는 스스로 `절대 호출되지 않으니 무시해도 되는 함수다`라고 알려주지 않는다. 누가 헷갈려서 사용되지 않는 코드를 열심히 고치고 왜 기능수정이 안되나 삽질할 수 있다.
- 이 코드가 필요해지면 어차피 git에서 가져올 수 있다.( 커밋 메시지 잘 쓰면 된다. 보통 찾을 일도 없다. )
- 주석으로 처리하는 법도 있지만 역시 지우고 필요하면 git에서 찾아쓰는게 낫다.

<br>

## 9. 데이터 조직화
### 9.1 변수 쪼개기
```js
// AS-IS
let temp = 2 * (height + width);
console.log(temp);
temp = height * width;
console.log(temp);

// TO-BE
const perimeter = 2 * (height + width);
console.log(perimeter);
const area = height * width;
console.log(area);
```
### 9.1.1 설명
- 변수에 값을 여러번 대입할 수 밖에 없는 것들이 있다.(`let`)
    1. 루프 변수: let i 로 되는거
    2. 수집(collecting) 변수: 메서드 동작 중간중간 값 저장(temp)
    3. 이외에 긴 코드의 결과를 저장하는 경우들
- 2, 3의 경우 둘 이상의 역할을 하는 변수라면 변수를 쪼개야 한다. 상수로 선언해서 재할당을 막는것이다.
<br>

### 9.1.2 절차
1. 변수를 선언한 곳과 값을 처음 대입하는 곳에서 변수 이름을 바꾼다.
2. 가능하면 불변으로 선언한다.
3. 이 변수에 두번째로 값을 대입하는 곳 앞까지의 모든 참조를 새로운 변수명으로 바꾼다.
4. 두 번째 대입 시 변수를 원래 이름으로 다시 선언한다.
5. 테스트
6. 반복한다.

<br>

### 9.1.3 예시
- 너무 뻔한 리팩토링이라 간단한 예제만 다룬다. 입력 매개변수의 값을 수정하는 경우를 리팩토링한다.
```js
// AS-IS, js에서 매개변수는 값에 의한 호출(call-by-value)라서 사실 오류가 있진 않다.
function discount(inputValue, quantity) {
  if(inputValue > 50) inputValue = inputValue - 2;
  if(quantity > 100) inputValue = inputValue - 1;
  return inputValue;
}

// TO-BE, 하지만 input과 result는 명백히 다른 역할을 하기 때문에 변수분리한다. result = inputValue; 부분에서 입력 값에 기초해서 결과값을 누적해서 계산한다는 사실이 명확히 드러난다.
function discount(inputValue, quantity) {
  let result = inputValue;
  if(inputValue > 50) result = inputValue - 2;
  if(quantity > 100) result = inputValue - 1;
  return result;
}
```

<br>

### 9.2 필드 이름 바꾸기
```js
// AS-IS
class Organiztaion {
  get name() {...}
}

// TO-BE
class Organiztaion {
  get title() {...}
}
```
### 9.2.1 설명
- 클래스의 필드나 게터세터 이름을 잘 지으면 가타부타 설명이나 flowchart 같은게 필요가 없다!

<br>

### 9.2.2 절차
1. 레코드의 유효 범위가 제한적이면 필드에 접근하는 모든 코드를 수정한 후 테스트하면 끝이다.
2. 레코드가 캡슐화가 안됐으면 캡슐화를 한다.
3. 캡슐화된 객체의 private 필드명을 변경하고, 그에 맞게 내부 메서드(ex. 게터세터)를 수정한다.
4. 테스트
5. 생성자의 매개변수 중 필드와 이름이 겹치는게 있다면 `함수 선언 바꾸기`(6.5)로 변경한다.
6. 접근자들의 디름도 바꿔준다.

<br>

### 9.2.3 예시
```js
const organization = {name: '애크미 구스베리', country: 'GB'};
```
- 위 객체에서 `name`을 `title`로 바꿔야 한다. 객체는 코드베이스 곳곳에서 사용되고, title을 바꾸는 곳도 있다!(최악이다. 타입이란게 없는듯?)
- 우선 캡슐화한다.
```js
class Organization {
  constructor(data) {
    this._name = data.name;
    this._country = data.country;
  }
  get name() { return this._name; }
  set name(aString) { this._name = aString; }
  get country() { return this._country; }
  set country(aCountryCode) { this._country = aCountryCode; }
}
const organization = new Organization({name: '애크미 구스베리', country: 'GB'});
```
- `입력 데이터 구조`와 `내부 데이터 구조`가 독립되면서 따로 작업이 가능해졌다.(추상화)
- 별도 필드를 정의하고 내부 메서드를 수정한다. 입력으로 name 외에 title도 받을수 있게도 해준다.
```js
class Organization {
  constructor(data) {
    this._title = data.title || data.name;
    this._country = data.country;
  }
  get name() { return this._title; }
  set name(aString) { this._title = aString; }
  // ..
}
```
- 이제 `Organization`을 쓰는쪽에 전부 찾아가서 새로운 이름인 `title`을 쓰도록 수정한다.
```js
const organization = new Organization({title: '애크미 구스베리', country: 'GB'});
```
- `name` 못받게 생성자를 바꾸고, name 접근자를 모두 title로 바꾼다.
```js
class Organization {
  constructor(data) {
    this._title = data.title;
    this._country = data.country;
  }
  get title() { return this._title; }
  set title(aString) { this._title = aString; }
  // ..
}
```
- 캡슐화를 하지 않았으면 이게 좀 어렵다.(name도, title도 쓰고 있으니까 스탭을 나누기가 애매해진다.(수정할때마다 계속 테스트는 깨질것))
- 솔직히 엄청 복잡한게 아니라면 뭐 그냥 해도 될 것 같다.(클래스 만들수 없는 경우도 많다.)

<br>

### 9.3 파생 변수를 질의 함수로 바꾸기
```js
// AS-IS
get discountedTotal(){ return this._discountedTotal; }
set discount(aNumber) {
  const old = this._discount;
  this._discount = aNumber;
  this._discountedTotal += old - aNumber; // 파생변수
}

// TO-BE
get discountedTotal(){ return this._baseTotal - this._discount; }
set discount(aNumber) { this._discount = aNumber; }
```

<br>

### 9.3.1 설명
- `가변 데이터`는 소프트웨어에 항상 문제를 일으킨다. 가변 데이터는 가급적 배제하고, 사용이 불가피하다면 유효 범위를 최대한 좁혀야 사이드 이펙트가 나지 않는다.
- 이를 위해, ***값을 쉽게 계산할 수 있는 변수는 모두 제거한다.*** 계산 과정 코드를 보여주는게 데이터 의미를 더 잘 나타낼 때도 있고, 정합성이나 이런거에 문제도 덜생긴다.
- 가변 데이터를 써도 되는 예외도 있다. 변형 연산(transformation operation) 에서다.
    1. 데이터 구조를 감싸며, 그 데이터를 기초로 계선 결과를 속성으로 제공하는 객체
    2. 데이터 구조를 받아 다른 데이터 구조로 변환해 반환하는 함수.(소스가 가변일 경우) 

  

<br>

### 9.3.2 절차
- 생략

<br>

### 9.3.3 예시
1. 간단한 예시(소스가 하나(adjustments))
```js
get production() { return this._production; }
applyAdjustment(anAdjustment) {
  this._adjustments.push(anAdjustment);
  this._production += anAdjustment.amount;
}
```
- 이 경우는 `데이터 중복`이다. adjustment를 적용하는 과정에서 직접 관련없는 누적 값 production도 갱신하는 경우다.
- 간단하게 할 수 있지만 우선 신중하게 `assertion`을 추가한다.
```js
get production() { 
  assert(this._production === this.calcuatedProduction);
  return this._production; 
}
get calculatedProduction() {
  return this._adjustments.reduce((sum, a) => sum + a.amount, 0);
}
```
- 테스트 해보고 assertion이 실패하지 않으면 아래와 같이 정리될 수 있다
```js
get production() { return this._adjustments.reduce((sum, a) => sum + a.amount, 0); }
applyAdjustment(anAdjustment) {
  this._adjustments.push(anAdjustment);
}
```

2. 조금 복잡한 예시(소스가 둘 이상)
```js
class ProductionPlan {
  constructor(production) {
    this._production = production;
    this._adjustments = [];
  }
  get production() { return this._production; }
  applyAdjustment(anAdjustment) {
    this._adjustments.push(anAdjustment);
    this._production += anAdjustment.amount;
  }
}
```
- production 계산에 생성자로 받은 production 값에 adjustments를 계산하게 되는 방식이다.(소스가 `production`, `adjustments`)
- 이 경우 이전과 동일한 `assertion` 적용할 경우, `production = 0`이 아닌 경우라면 다 실패했을 것이다.(잘 테스트 안하면 버그가 있을수도 있는것)
- `변수 쪼개기`(9.1)를 통해서 처리한다. assertion도 추가한다.
```js
class ProductionPlan {
  constructor(production) {
    // _production을 두개로 쪼갠다.
    this._initialProduction = production;
    this._productionAccumulator = 0;
    this._adjustments = [];
  }
  get production() { 
    assert(this.__productionAccumulator === this.calculatedProductionAccumulator);
    return this._initialProduction + this._productionAccumulator; 
  }
  applyAdjustment(anAdjustment) {
    this._adjustments.push(anAdjustment);
    this._productionAccumulator += anAdjustment.amount;
  }
  get calculatedProductionAccumulator() {
    return this._adjustments.reduce((sum, a) => sum + a.amount, 0);
  }
}
```
- `assertion` 통과되면 `calculatedProductionAccumulator`을 인라인하고 필요없는 변수는 제거하면 된다.
```js
get production() {
  return this._initialProduction + this.calculatedProductionAccumulator; 
}
```

<br>

### 9.4 참조를 값으로 바꾸기
```js
// AS-IS
class Product {
  applyDiscount(arg) { this._price.amount -= arg; }
}

// TO-BE
class Product {
  applyDiscount(arg) {
    this._price = new Money(this._price.amount - arg, this._price.currency);
  }
}
```
<br>

### 9.4.1 설명
- 중첩 객체를 취급할 때 `참조` or `값`으로 취급할 수 있다. 참조로 취급하면 중첩 객체 속성을 직접 조작할 것이고 값으로 취급하면 불변으로 취급해 객체를 통째로 바꿀것이다.
- 값 객체는 나 몰래 어디선가 객체 속성이 바뀔 것을 염려하지 않아도 되어서 안전한 편이다.
- 근데 이런 특성 때문에, 값 객체가 갱신될 때 이를 참조하는 다른 곳에서도 바뀐 객체란 걸 알려줘야 하는 문제도 있다.( ex 옵저버 패턴 )

<br>

### 9.4.2 절차
1. 후보 클래스가 불변인지, 혹은 불변이 될 수 있는지 확인한다.
2. 각각의 `세터를 하나씩 제거`(11.7)한다.
3. 이 값 객체의 필드들을 사용하는 동치성(equality) 비교 메서드를 만든다. (js에서는 직접 구현 필요함ㅠ)

<br>

### 9.4.3 예시
- 아래는 `Person`객체 내에서 `TelephoneNumber`객체를 중첩하는 경우다.
```js
class Person {
  constructor() {
    this._telephoneNumber = new TelephoneNumber();
  }
  get officeAreaCode() { return this._telephoneNumber.areaCode; }
  set officeAreaCode(arg) { this._telephoneNumber.areaCode = arg; }
  get officeNumber() { return this._telephoneNumber.number; }
  set officeNumber(arg) { this._telephoneNumber.number = arg; }
}
```
- `Person`의 setter가 `TelephoneNumber`의 setter를 이용해 속성을 직접 조작하고 있다(참조로 사용)
- 우선 `TelephoneNumber`를 불변으로 만들어야한다. ***생성자에서 속성을 무조건 초기화 하도록 하고, 세터는 제거하면 된다.*** 
  - ***`값` 이기 때문에 equals를 통해서 동치성 비교를 할 수 있어야 한다.***(이걸 기반으로 뭐 옵저버 패턴 같은거 쓸 수가 있는거다. 사실 setter 없으면 비교가 틀릴 일은 없긴 하지만 원칙은 이거 해줘야하는거다.)
```js
// 불변으로..
class TelephoneNumber {
  constructor(areaCode, number) {
    this._areaCode = areaCode;
    this._number = number;
  }
  get areaCode() { return this._areaCode; }
  get number() { return this._number; }

  equals(other) {
    if(!(other instanceof TelephoneNumber)) return false;
    return this.areaCode === other.areaCode && this.number === other.number;
  }
}

// equals의 테스트코드, 이런게 없으면 `TelephoneNumber`객체 변경시 equals가 깨지게 되는데, 깨진걸 인지하기 어렵다.
it('telephoe equals', function() {
  assert(new TelephoneNumber('312', '123-456').equals(new TelephoneNumber('312', '123-456')));
})

// 사용 측
class Person {
  // ...

  set officeArea(arg) { 
    // 참조를 통한 중첩 객체의 속성 갱신하는게 아닌 중첩 객체를 통째로 갱신한다.
    this._telephoneNumber = new TelephoneNumber(arg, this.offieNumber);
  }
  set officeNumber(arg) { 
    this._telephoneNumber = new TelephoneNumber(this.officeAreaCode, arg);
  }
}
```


<br>


### 9.5 값을 참조로 바꾸기
```js
// AS-IS
let customer = new Customer(customerData);

// TO-BE
let customer = customerRepository.get(customerData.id);
```

<br>

### 9.5.1 설명
- 하나의 데이터 구조 안에 논리적으로 같은 데이터 구조를 참조하는 레코드가 여러개 있는 경우가 있다.( 예를 들어 주문 목록(list)에 같은 고객이 요청한 주문이 섞여 있는 경우)
- 이럴 때 고객 객체를 `참조`/`값` 으로 다룰 수 있는데, 고객 객체가 갱신되지 않는 경우라면 어떤 방식이든 문제가 안된다. (참조의 경우 고객 객체를 각 레코드에 물리적으로 복사를 해서 쓰게 될거다)
- 근데 데이터를 갱신해야 할 경우, ***`참조`로 다루면 모든 복제본 참조에 가서 데이터를 빠짐없이 갱신해야 하는 문제가 생긴다.*** 이건 무척 어렵기 때문에 `값`으로 다루는게 편하다.
- `값`으로 다루는 경우 엔티티 하나당 객체도 하나만 존재하는데, 보통 이런 객체를 한데 모아서 클라이언트들의 접근을 관리해주는 일종의 저장소가 필요해진다. (`Repository` 레이어)

<br>

### 9.5.2 절차
1. 같은 부류에 속하는 객체들을 보관할 저장소를 만든다.
2. 생성자에서 이 부류의 객체들 중 특정 객체를 정확히 찾아내는 방법이 있는지 확인한다.
3. 호스트 객체의 생성자들을 수정하여 객체를 이 저장소에서 찾도록 한다. 
4. 테스트


<br>

### 9.5.3 예시
- 주문(`Order`)클래스가 있다. 객체 생성시 입력 데이터의 고객 ID를 이용해 고객(`Customer`)객체를 만든다.
```js
class Order {
  constructor(data) {
    this._customer = new Customer(data.customer);
    //...
  }

  get customer() { return this._customer; }
}

class Customer {
  constructor(id) {
    this._id = id;
  }
  get id() { return this._id; }
}
```
- `Customer`객체가 매 `Order` 생성시에 독립적으로 생성되는데, 고객을 수정해야 하는 경우, 어떻게 할지 막막해진다. `Order`외에도 `Customer`를 참조하는 곳이 있을수도 있다.
- `Repository` 레이어를 만든다.  (사실 보통은 db를 참조할 것이다.) 예제에서는 id 기반으로 등록/조회만 가능하면 된다.(보통은 CRUD일 것)
```js
let _repositoryData;

export function initialize() {
  _repositoryData = {};
  _repositoryData.customers = new Map();
}

export function registerCustomer(id) {
  if(!_repositoryData.customers.has(id)) {
    _repositoryData.customers.set(id, new Customer(id));
  return findCustomer(id);
  }
}

export function findCustomer(id) {
  return _repositoryData.customers.get(id);
}
```
- `Order`의 생성자는 아래와 같이 바꾼다.
```js
class Order {
  constructor() {
    this._number = data.number;
    this._customer = registerCustoer(data.customer);
    // ...
  }
}
```
- 이렇게 하면 ***`Order`의 생성자가 전역 저장소와 결합된다는 문제가 있다.*** 전역 객체는 신중히 다뤄야한다. 적절한 사용은 이로울 수 있지만 과용하면 독이된다.(애초에 레포지토리가 js 모듈 형태로 만들어져서 어쩔수가 없긴 하다. class로 만들었어야?). 불편하면 생성자 매개변수로 `repository`를 전달하자.(Spring Bean 처럼)

<br>

### 9.6 매직 리터럴 바꾸기
```js
// AS-IS
function potentialEnergy(mass, height) {
  return mass * 9.81 * height;
}

// TO-BE
const STANDARD_GRAVITY = 9.81;
function potentialEnergy(mass, height) {
  return mass * STANDARD_GRAVITY * height;
}
```
<br>

- eslint의 `no magic number`룰이다.
- 리터럴 값 보다는 값의 의미를 나타내는 이름으로 상수를 만들고 해당 상수를 쓰게 해야 한다.
- 리터럴을 상수로 바꾸는 것 외에 함수로 만드는것이 나은 것들도 있다.(어차피 근데 함수 구현에는 상수를 쓰게 될 것이다.)
  - `aValue === "M"`을 `aVlue === MALE_GENDER`로 바꾸는 것 보다 `isMale(aVlue)`라는 함수 호출로 바꾸는게 좋다.
- `const ONE = 1`같은 상수는 사실 의미가 없다. 의미가 달라질 것도 아니고 값이 달라질 가능성도 없다.

<br><br>

## 10. 조건부 로직 간소화

### 10.1 조건문 분해하기
```js
// AS-IS
if(!aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd)) 
  charge = quantity * plan.summerRate;
else
  charge = quantity * plan.regularRage + plan.regularServiceCharge;

// TO-BE
if(summer()) 
  charge = quantity * plan.summerRate;
else
  charge = quantity * plan.regularRage + plan.regularServiceCharge;
```

<br>

### 10.1.1 설명
- 거대 코드 블럭이 주어지면, 부위별로 분해하고, 분해된 각 덩어리를 `의도를 살린 이름의 함수 호출`로 바꿔준다. => 조건이 무엇인지 강조하고, 무엇을 분기했는지 딱 보면알게 된다.

<br>

### 10.1.2 절차
- ***조건식과 그 조건식에 딸린 조건절 각각을 함수로 추출한다.***

<br>

### 10.1.3 예시
- 생략


### 10.2 중복 조건식 통합하기
```js
// AS-IS
if(anEmployee.seniority < 2) return 0;
if(anEmployee.monthsDisabled < 12) return 0;
if(anEmployee.isPartTime < 0) return 0;

// TO-BE
if(isNotEligibleForDisability()) return 0;

function isNotEligibleForDisability() {
  return ((anEmployee.seniority < 2) 
        || (anEmployee.monthsDisabled < 12)
        || (anEmployee.isPartTime < 0));
}
```

<br>

### 10.2.1 설명
- 조건은 다르지만 그 결과로 수행해야 하는 동작이 똑같은 경우, 조건 검사를 하나로 통합하는 게 낫다.(무엇을 하는지 명확하게 딱 바로 알 수 있다.)
  - 물론 명확하게 분리해서 조건검사해야 하는 케이스도 존재한다.

<br>

### 10.2.2 절차
- 조건에 부수효과가 없는지 확인한다. 있다면 `질의함수와 변경 함수 분리하기`(11.1) 적용한다.
- 조건문 두 개를 논리 연산자로 결합하고 테스트한다.
- 조건이 하나가 될 때 까지 계속한다.
- 하나로 합쳐진 조건식을 함수로 추출할 지 고려해 본다.

<br>

### 10.2.3 예시
- 나열된 조건문은 OR로 통합, 중첩 조건문은 AND로 통합
- 상세 예시 생략

<br>

### 10.3 중첩 조건문을 보호 구문으로 바꾸기
```js
// AS-IS
function getPayAmount() {
  let result;
  if(isDead)
    result = {amount: 0, reasonCode: "SEP"};
  else {
    if(isSeperated) {
      result = {amount: 0, reasonCode: "RET"};
    } else {
      // 급여 계산 로직
      loren.ipsum(dolor.sitAmet) ;
      // ...
      result = getSumResult(dolor);
    }
  }
  return result;
}

// TO-BE
function getPayAmount() {
  if(isDead) return {amount: 0, reasonCode: "SEP"};
  if(isSeperated) return {amount: 0, reasonCode: "RET"};
  
  // 급여 계산 로직
  loren.ipsum(dolor.sitAmet) ;
  // ...
  return getSumResult(dolor);
}
```

<br>

### 10.3.1 설명
- 조건문은 두 가지 형태다. 두개는 의도하는 바가 다르므로 그게 코드에서 드러나야 좋다.
  1. 참/거짓 모두 정상 동작
  2. 한 쪽만 정상 동작
- 보통 1.의 경우에는 `if - else`를 쓰고, 2. 의 경우 if문으로 비정상 조건을 검사해서 함수에서 빠져나오게 한다. else는 없는 것이다. 2.에서 비정상 조건 검사해서 빠져나오는걸 `보호 구문(guard clause)`라고 한다.
- 위의 예시에서 살펴보면, `isDead`, `isSeperated`는 비정상인 경우인 것이다. 정상 동작은 중첩된 else문 하나 뿐이다! 따라서 ***비정상 케이스를 우선 if문 통해서 검사해서 빠르게 함수를 탈출시키고 정상동작은 그 후에 수행되도록 하는 것이다.***



<br>

### 10.3.2 절차
1. 교체할 조건 중 가장 바깥 것 부터 보호 구문으로 만든다. 
2. 테스트
3. 1~2 반복한다.
4. 같은 결과를 반환하는 보호 구문은 `조건식 통합`하는걸 고려한다.

<br>

### 10.3.3 예시
- 조건식을 반대로 만들어 적용하는 케이스도 있다.
```js
function adjustedCapital(anInstrument) {
  let result = 0;
  if(anInstrument.capital > 0) {
    if(anInstrument.interestRate > 0 && anInstrument.duration > 0) {
      result = (anInstrument.income / anInstrument.duration) * anInstrument.adjustmentFactor;
    }
  }
  return result;
}
```
- result 계산은 중첩 조건문 내에서만 계산되고(모두 true일 때) 하나라도 false면 보호 구문으로 함수를 빠져나오게 해야 한다. **기존에 작성된 조건과 반대되는 조건**을 만들어야 하는 것이다.
```js
function adjustedCapital(anInstrument) {
  if(anInstrument.capital <= 0 || anInstrument.interestRate <= 0 || anInstrument.duration <= 0) return 0;
  return (anInstrument.income / anInstrument.duration) * anInstrument.adjustmentFactor;
}
```
- 요런 조건문 반대로 하는 케이스는 실수하기 딱 좋은 것 같다. 테스트 코드 필수!

<br>

### 10.4 🔥조건부 로직을 다형성으로 바꾸기🔥
```js
// AS-IS
switch(bird.type) {
  case '유럽 제비':
    return '보통이다';
  case '아프리카 제비':
    return (bird.numberOfCounts > 2) ? '지쳤다' : '보통이다';
  case '노르웨이 파랑 앵무':
    return bird.voltage > 100 ? '그을렸다' : '예쁘다';
  default:
    return '알 수 없다';
}

// TO-BE
class EuropeanSwallow {
  get plumage() {
    return '보통이다';
  }
}

class AfricanSwallow {
  get plumage() {
    return this.numberOfCounts > 2 ? '지쳤다' : '보통이다'
  }
}
// ...
```
### 10.4.1 설명
- 복잡한 조건부 로직은 항상 너무 난해하다. 종종 클래스와 다형성으로 해결 가능한 부분이 있다.
  - `switch`문이 포함된 함수가 여러개 보이는 경우 => `case`별로 하나씩 클래스를 만들어서 공통 switch 로직의 중복을 없앨 수 있다.
  - 기본동작을 위한 `case`문과 그 변형 동작으로 구성된 로직 => `슈퍼클래스`를 만들고, 기본 동작은 `슈퍼클래스` 메서드에 구현하고, 변형 동작은 `서브클래스`에서 구현한다.

- 다형성은 좋긴 하지만 모든 조건부 로직을 이렇게 처리할 필요는 없다. 

<br>

### 10.4.2 절차
1. 다형적 동작을 표현할 클래스를 만들어 준다. 이왕이면 적합한 인스턴스를 알아서 만들어서 반환하는 ***팩터리 함수***도 같이 만든다.
2. 호출하는 코드에서 팩터리 함수 사용하게 한다.
3.  조건부 로직 함수를 슈퍼클래스로 옮긴다.
4. 서브클래스 중 하나를 선택하여, 조건부 로직 메서드를 오버라이드 한다. 
5. 각 조건절에 대한 서브클래스에 4.를 수행한다.
6. 슈퍼 클래스에는 기본 동작 부분만 남긴다. 슈퍼클래스가 추상 클래스면 메서드를 추상으로 선언하거나 서브클래스에서 구현하도록 에러를 던진다.


<br>

### 10.4.3 예시
- 신용 평가 기관에서 선박의 항해 투자 등급을 계산하는 코드.
- 위험요소(자연조건, 선장 항해 이력)과 잠재수익을 기초로 A, B로 판단한다.
```js
function rating(voyage, history) { // 투자등급
  const vpf = voyageProfitFactor(voyage, history);
  const vr = voyageRisk(voyage);
  const chr = captainHistoryRisk(voyage, history);

  if(vpf * 3 > (vr + chr * 2)) return "A";
  else return "B";
}

function voyageRisk(voyage) { // 항해 경로 위험요소
  let result = 1;
  if(voyage.length > 4) result += 2;
  if(voyage.length > 8) result += voyage.length - 8;
  if(['중국', '동인도'].includes(voyage.zone)) result += 4;
  return Math.max(result, 0);
}

function captainHistoryRisk(voyage, history) { // 선장의 항해 이력 위험요소
  let result = 1;
  if(history.length < 5) result += 4;
  result += history.filter(v => v.profit < 0).length;
  if(voyage.zone === '중국' && hasChina(history)) result -= 2; // 특수케이스
  return Math.max(result, 0);
}

function hasChina(history) { // 중국을 경유하는가?
  return history.some(v => "중국" === v.zone);
}

function voyageProfitFactor(voyage, history) { // 수익 요인
  let result = 2;
  if(voyage.zone === '중국') result += 1;
  if(voyage.zone === '동인도') result += 1;
  if(voyage.zone === '중국' && hasChina(history)) { // 특수케이스
    result += 3;
    if(history.length > 10) result += 1;
    if(voyage.length > 12) result += 1;
    if(voyage.length > 18) result -= 1;
  } else {
    if(history.length > 8) result += 1;
    if(voyage.length > 14) result -= 1;
  }
  return result;
}

// 호출 측
const voyage = {zone: '서인도', length: 10};
const history = [
  {zone: '동인도', profit: 5},
  {zone: '서인도', profit: 15},
  {zone: '중국', profit: -2},
  {zone: '서아프리카', profit: 7},
]
const myRating = rating(voyage, history);
```
- 복잡하다. 여기서 `기본로직`과 `특수한 상황의 로직`을 분리해야 한다. 특수한 상황 로직은 아래다.
  - 중국까지 항해해본 선장이 중국을 경유해 항해할 때 다루는 조건부 로직들.
- **특수한 상황을 검사하는 로직이 반복되어 기본 동작을 이해하는데 방해**가 되고 있다. 이를 분리하기 위해 다형성을 쓴다.
- 먼저 `Rating`이라는 클래스를 만들어 기본 동작을 모두 담는다.
```js
function rating(voyage, history) { // 투자등급
  return new Rating(voyage, history).value;
}

class Rating {
  constructor(voyage, history) {
    this.voyage = voyage;
    this.history = history;
  }

  get value() {
    const vpf = this.voyageProfitFactor;
    const vr = this.voyageRisk;
    const chr = this.captainHistoryRisk;
  
    if(vpf * 3 > (vr + chr * 2)) return "A";
    else return "B";
  }

  get voyageRisk() { // 항해 경로 위험요소
    let result = 1;
    if(this.voyage.length > 4) result += 2;
    if(this.voyage.length > 8) result += this.voyage.length - 8;
    if(['중국', '동인도'].includes(this.voyage.zone)) result += 4;
    return Math.max(result, 0);
  }

  get captainHistoryRisk() { // 선장의 항해 이력 위험요소
    let result = 1;
    if(this.history.length < 5) result += 4;
    result += this.history.filter(v => v.profit < 0).length;
    if(this.voyage.zone === '중국' && this.hasChinaHistory(this.history)) result -= 2;
    return Math.max(result, 0);
  }

  get voyageProfitFactor() { // 수익 요인
    let result = 2;
    if(this.voyage.zone === '중국') result += 1;
    if(this.voyage.zone === '동인도') result += 1;
    if(this.voyage.zone === '중국' && this.hasChinaHistory(this.history)) {
      result += 3;
      if(this.history.length > 10) result += 1;
      if(this.voyage.length > 12) result += 1;
      if(this.voyage.length > 18) result -= 1;
    } else {
      if(this.history.length > 8) result += 1;
      if(this.voyage.length > 14) result -= 1;
    }
    return result;
  }

  get hasChinaHistory() {// 중국을 경유하는가?
    return this.history.some(v => "중국" === v.zone);
  }
}
```
- 변형동작을 담당할 서브클래스를 만든다. 서브클래스는 `중국까지 항해해본 선장이 중국을 경유해 항해`하는 케이스다. 이를 팩토리 함수에서 구분하도록 한다.

```js
class ExperiencedChinaRating extends Rating {}

function createRating(voyage, history) {
  if(voyage.zone === '중국' && history.some(v => '중국' === v.zone)) {
    return new ExperiencedChinaRating(voyage, history);
  } else {
    return new Rating(voyage, history);
  }
}

function rating(voyage, history) { // 투자등급
  return createRating(voyage, history).value;
}
```
- 특수한 상황의 동작을 서브클래스로 옮긴다.(`voyageRisk`, `voyageProfitFactor`)

```js
class Rating {

  get voyageRisk() { // 항해 경로 위험요소
    let result = 1;
    if(this.voyage.length > 4) result += 2;
    if(this.voyage.length > 8) result += this.voyage.length - 8;
    // 🙅🏻‍♀️제거🙅🏻‍♀️ if(['중국', '동인도'].includes(this.voyage.zone)) result += 4;
    return Math.max(result, 0);
  }

  get voyageProfitFactor() { // 수익 요인
    let result = 2;
    if(this.voyage.zone === '중국') result += 1;
    if(this.voyage.zone === '동인도') result += 1;
    // 기본/특수 동작이 if/else로 각각 실행되는 경우 => 아예 해당 코드 블록을 함수로 추출
    result = this.voyageAndHistoryLengthFactor;
    return result;
  }

  // 기본동작
  get voyageAndHistoryLengthFactor() {
    let result = 0
    if (this.history.length > 8) result += 1;
    if (this.voyage.length > 14) result -= 1;
    return result;
  }
}

class ExperiencedChinaRating extends Rating {
  get captainHistoryRisk() {
    const result = super.captainHistoryRisk - 2;
    return Math.max(result, 0);
  }

  // 특수동작 overriding
  get voyageAndHistoryLengthFactor() {
    let result = 0;
    result += 3;
    if (this.history.length > 10) result += 1;
    if (this.voyage.length > 12) result += 1;
    if (this.voyage.length > 18) result -= 1;
    return result;
  }
}
```
- `voyageProfitFactor`가 좀 복잡한데, if/else 문으로 기본/특수 모두 각각의 동작을 하기 때문이다. 이 경우 해당 코드 블록을 함수(`voyageAndHistoryLengthFactor`)로 추출한 후 특수 동작부(if문의 true)를 `ExperiencedChinaRating`에서 오버라이딩 하도록 했다.

<br>

-  `voyageAndHistoryLengthFactor` 에서 And가 들어가는 부분에서 악취가 난다고 한다. 두가지 독립된 일을 수행하기 때문. 하나의 일만 하도록 분리해줘야 한다.

```js
class Rating {
  get voyageProfitFactor() { // 수익 요인
    let result = 2;
    if(this.voyage.zone === '중국') result += 1;
    if(this.voyage.zone === '동인도') result += 1;
    result += this.voyageLengthFactor;
    result += this.historyLengthFactor; // 문장을 호출한 곳으로 옮기기
    return result;
  }

  get voyageLengthFactor() {
    let result = 0
    if (this.history.length > 14) result -= 1;
    return result;
  }

  get historyLengthFactor() {
    return (this.voyage.length > 8) ? 1 : 0;
  }
}

class ExperiencedChinaRating extends Rating {
  get voyageProfitFactor() {
    return super.voyageProfitFactor + 3;
  }
  get voyageLengthFactor() {
    let result = 0;
    // result += 3;
    if (this.voyage.length > 12) result += 1;
    if (this.voyage.length > 18) result -= 1;
    return result;
  }

  get historyLengthFactor() {
    return (this.history.length > 10) ? 1 : 0;
  }
}
```
- 꽤 복잡한 과정이었다. 근데 개발하다 보면 이런식의 설계가 필요한 경우가 매우 많다는걸 체감할 수 있다. 잘 이해하도록 하자.

<br>


### 10.5 특이 케이스 추가하기
```js
if(aCustomer === '미확인 고객') customerName = '거주자';

class UnknownCustomer {
  get name() { return '거주자'; }
}
```

<br>

### 10.5.1 설명
- 위에 코드에서 처럼 데이터의 특정 값을 확인한 후 어떤 동작을 수행하는 코드가 여기저기 반복되고 있다면 이를 한 곳으로 모으는게 좋다. 이런걸 특이 케이스 패턴(Special Case Pattern)이라고 한다.
- 대표적인 특이 케이스는 널 처리다.

<br>

### 10.5.2 절차
1. 컨테이너(class)에 특이 케이스인지를 검사하는 속성을 추가한다. (`boolean`)
2. 특이 케이스 객체를 만든다. 이 객체는 특이 케이스 여부를 검사하는 속성만 포함하며, 특이케이스 클래스의 반환값은 `true`일 것이다.
3. 클라이언트에서 특이 케이스인지를 검사하는 모든 코드를 `함수로 추출(6.1)`한다.
4. 코드에 새로운 특이 케이스 대상을 추가한다. 변환함수를 써도 된다.(transform)
  - 이거는 `Customer`만 반환하던 곳에서 새로 만든 특이케이스 클래스(`UnknownCustomer`)도 반환하게 하라는 것.( 다형성 )
5. 특이 케이스를 검사하는 함수 본문을 특이 케이스 객체의 속성을 쓰도록 수정한다.
6. 테스트
7. `여러 함수를 클래스로 묶기(6.9)`나 `여러 함수를 변환 함수로 묶기(6.10)`를 적용해 특이 케이스를 처리하는 공통 로직을 새로운 요소로 옮긴다. (특이 케이스의 메서드, getter..)
  - 여기서 객체에서 `읽기`만 하는 거라면 굳이 클래스 안만들고, 4의 변환함수에서 필드만 바꿔준 리터럴 객체를 써도 된다.
8. 반복반복

<br>

### 10.5.3 예시
1. 전력회사는 전력이 필요한 현장(`Site`)인프라를 설치해 서비스를 제공한다. Stie는 고객(`Customer`) 클래스에 의존한다.
```js
class Site {
  get customer() { return this._customer; }
}

class Customer {
  get name() {...} // 이름
  get billingPlan() {...} // 요금제(읽기)
  set billingPlan(arg) {...} // 요금제(쓰기)
  get paymentHistory() {...} // 납부 이력
}


// 클라이언트 1
const aCustomer = site.customer;
let customerName;
if(aCustomer === '미확인 고객') customerName = '거주자';
else customerName = aCustomer.name;

// 클라이언트 2
const plan = (aCustomer === '미확인 고객') ? registry.billingPlans.basic : aCustomer.billingPlan;

// 클라이언트 3 (쓰기동작)
if(aCustomer !== '미확인 고객') aCustomer.billingPlan = newPlan; 


// 클라이언트 4
const weeksDelinquent = (aCustomer === '미확인 고객') ? 0 : aCustomer.paymentHistory.weeksDeliquentInLastYear;
```
- 1, 2 : 특이케이스 클래스와 특이케이스 여부 필드를 만든다
```js
class Customer {
  get isUnknown { return false; }
}
class UnknownCustomer {
  get isUnknown { return true; }
}
```
- 3 : 클라이언트에서 특이케이스 여부를 검사하는 코드를 함수로 추출한다. 이게 필요한 이유는 Customer 타입이  `Customer` 혹은  `'미확인 고객'`으로 아예 다르기 때문이다. 안전하게 가야한다.
```js
function isUnknown(arg) {
  if(!(arg instanceof Customer) || (arg === '미확인 고객')) {
    throw new Error(`잘못된 값과 비교: <${arg}>`);
  }
  return arg === '미확인 고객';
}

// 클라이언트 1
const aCustomer = site.customer;
let customerName;
if(isUnknwon(aCustomer)) customerName = '거주자';
else customerName = aCustomer.name;


// 클라 2,3,4 도..
```
- 4: 특이케이슬 일 때 Site에서 `UnknownCustomer` 객체 반환하도록 한다.
```js
class {
  get customer() {
    if(this._customer === '미확인 고객') ? new UnknownCutomer() : this._customer;
  }
}

function isUnknown(arg) {
  if(!(arg instanceof Customer) || (arg instanceof UnknownCustomer)) {
    throw new Error(`잘못된 값과 비교: <${arg}>`);
  }
  return arg.isUnknown;
}
```
- 테스트하고, 7: 특이 케이스를 처리하는 공통 로직을 옮긴다.
```js

class UnknownCustomer {
  get name() { return '거주자'; } // 클라이언트 1
  get billingPlan() { return registry.billingPlans.basic; } // 클라이언트2
  set billingPlan() { /* 아무것도 안한다. */} // 클라이언트3, 쓰기 => 리터럴 객체가 아닌 클래스로 처리해야하는 이유

  get paymenthistory() { return new NullPaymentHistory(); }

}
// 기존 0 으로 처리하던걸 객체화(이것도 다형성..)
class NullPaymentHistory {
  get weeksDelinquentInLastYear() { return 0; }
}


// 클라이언트 1
const aCustomer = site.customer;
const customerName = aCustomer.name; // 하나 더 나아가면 인라인 처리가 가능해진다.


// 클라이언트 2
const plan = aCustomer.billingPlan;

// 클라이언트 3 (쓰기동작)
if(aCustomer.isUnknown) aCustomer.billingPlan = newPlan; 


// 클라이언트 4 
const weeksDelinquent = aCustomer.paymentHistory.weeksDeliquentInLastYear;
```
- ***클라이언트 3은 쓰기 동작***이다. 미확인 고객은 쓰기를 하지 않기 때문에(물론 다른 클라이언트에서 있다면 처리해줘야 한다.) setter를 비운다.
- 클라이언트 4는 반환 타입이 `0` or `PaymentHistory.weeksDeliquentInLastYear`. 처리가 어려운데, 0을 래핑하는 `NullPaymentHistory` 객체를 만들어서 처리하였다. (Customer, UnknownCustomer와 마찬가지로 다형성으로 처리한 것)

- 종종 동작이 다른 튀는 클라이언트가 있을 수 있다.
```js
// 튀는 클라이언트
const name = !isUnknwon(aCustomer) ? aCustomer.name : '미확인 거주자';
```
- 이런거는 어쩔수가 없다. 클라이언트에서 다르게 처리하는수 밖에..
```js
const name = aCustomer.isUnknown ? aCustomer.name : '미확인 거주자';
```
이제 `isUnknown()` 함수는 안쓰기 때문에 `죽은 코드 제거하기(8.9)`로 없애준다.

2. 객체 리터럴 이용하기
- 여기에는 쓰기같은게 있어서 `UnknownCustomer`클래스로 처리했는데, 읽기만 있으면 그냥 객체 리터럴로 처리해도 된다. 훨씬 쉬우니까 결과만 보면..
```js
// AS-IS
class Site {
  get customer() { return this._customer; }
}

class Customer {
  get name() {...} // 이름
  get billingPlan() {...} // 요금제(읽기)
  set billingPlan(arg) {...} // 요금제(쓰기)
  get paymentHistory() {...} // 납부 이력
}

// TO-BE
class Site {
  get customer() { 
    return this._customer; === '미확인 고객' ? createUnknownCustoer() : this._customer(); 
  }
}
function createUnknownCustoer() {
  return {
    isUnknown: true, 
    name: '거주자',
    billingPlan: registery.billinPlans.basic,
    paymenthistory: {
      weeksDeliquentInLastYear: 0,
    }
  }
}
```
3. 이걸 변환함수로 처리해도 된다. 역시 결과만 보자면
```js
function enrichSite(inputSite) {
  const result = _.cloneDeep(inputSite);
  const unknownCustomer = {
    isUnknown: true,
    billingPlan: registery.billinPlans.basic,
    paymenthistory: {
      weeksDeliquentInLastYear: 0,
    }
  }

  if (isUnknown(result.customer)) result.customer = unknownCustomer;
  else result.customer.isUnknown = false;
  return result;
}

const rawSite = acquireSiteData();
const site = enrichSite(rawSite);
const aCustomer = site.customer;
// ...

```
- 본질은 같고 부가 정보만 덧붙이는 변환 함수는 `enrich`, 형태가 변화는건 `transform` 이라고 한다고 한다.


<br>

### 10.6 어서션 추가하기
```js
// AS-IS
if(this.discountRate) {
  base = base - (this.discountRate * base);
}

// TO-BE
aseert(this.discountRate >= 0)
if(this.discountRate) {
  base = base - (this.discountRate * base);
}
```

<br>

### 10.6.1 설명
- 특정 조건이 참일 때에만 제대로 동작하는 코드가 있을 수 있다. 예를들어 제곱근 계산은 입력이 양수일 때 만 제대로 동작한다.
- 이런게 코드에 항상 명시적으로 있진 않아서, 코드알고리즘을 보고 알아서 판단해야 하거나, 주석에 쓰기도 하는데, 어서션을 이용해서 코드에 표시하는게 최고다
- 어서션은 오류 찾기에 쓰기도 하지만, ***'프로그램이 어떤 상태임을 가정한 채 실행되는지'를 다른 개발자에게 알려주는 훌륭한 소통 도구이다.***

<br>

### 10.6.2 절차
1. 참이라고 가정하는 조건이 보이면 그 조건을 명시하는 어서션을 추가한다.

<br>

### 10.6.3 예시
```js
applyDiscount(aNumber) {
  return this.discountRate ? aNumber - (this.discountRate) : aNumber;
}
```
- 할인율은 양수여야만 한다. 
```js
applyDiscount(aNumber) {
  if(!this.discountRate) return aNumber;
  else {
    assert(this.discountRate > 0);
    return aNumber - (this.discountRate);
  }
}
```
- 근데 이런경우 discountRate의 세터에 assertion을 걸어주는게 좋다. `applyDiscount`에 걸어놔서 에러 떠봐야 또 원인을 분석해야 하는것이다.

> 어셔선 남발은 위험하다. 반드시 참이어야 것만 검사하자. 왜냐면 조건은 항상 미세하게 조정되기 때문이다.
> 저자는 프로그래머가 일으킬만한 오류에만 어서션을 쓴다고 한다. 데이터를 외부에서 읽어 온다면 그 값을 검사하는 작업은 어서션이 아니라 예외 처리로 대응하는 프로그램 로직의 일부로 다뤄야 한다. 데이터를 전적으로 신뢰할 수 있는 상황이 아니라면 말이다.

<br>

### 10.7 제어 플래그를 탈출문으로 바꾸기
```js
// AS-IS
for(const p of people) {
  if(!found) {  // => 제어 플래그
    if(p === '조커') {
      sendAlert();
      found = true;
    }
  }
}

// TO-BE
for(const p of people) {
  if(p === '조커') {
    sendAlert();
    break;
  }
}
```

<br>

### 10.7.1 설명
- `제어 플래그`란 코드의 동작을 변경하는데 사용되는 변수를 말하며, 어딘가에서 계산해서 설정한 후 다른 어딘가의 조건문에서 검사하는 형태로 쓰인다. 항상 악취다. => 제거해야 한다.

- `return`, `break`, `continue` 키워드를 적절히 써서 제어 플래그를 제거한다.
- 순서, 예시는 생략

<br>

## 11 API 리팩터링

### 11.1 질의 함수와 변경 함수 분리하기
```js
// AS-IS
function getTotalOutstandingAndSendBill() {
  const result = customer.invoices.reduce((total, each) => each.amount + total, 0);
  sendBill();
  return result;
}

// TO-BE
function totalOutstanding() {
  return customer.invoices.reduce((total, each) => each.amount + total, 0);
}
function sendBill() {
  emailGateway.send(formatBill(customer));
}
```

<br>

### 11.1.1 설명
- 함수는 외부에서 관찰할 수 있는 `겉보기 부수효과(observable side effect)`가 전혀 없는, 값을 반환하는 함수를 추구해야 한다.(순수함수) => 관리가 쉽고 버그를 만들지 않는다.
  - 예를들어 함수 반환값을 캐시하는 함수는 `겉보기 부수효과`가 있는걸까? => 캐시가 잘 구현됐다면 겉보기 부수효과는 없다.(`부수효과`는 있다. 객체 상태(캐시 필드)를 바꾸기 때문!) 어떤 순서로 호출하든 모든 호출에 항상 똑같은 값을 반환할 뿐이기 때문이다!
- 겉보기 부수효과가 있는 함수와 없는 함수는 명확히 구분하는게 좋은데, 이를 위해 질의 함수(읽기 함수)는 모두 부수효과가 없어야 한다는 규칙을 `명령-질의 분리(command-query seperation)`이라고 한다.
- 값을 반환하면서 부수효과도 있는 함수를 발견하면, 상태를 변경하는 부분과 질의하는 부분을 분리하려고 시도하자!

<br>

### 11.1.2 절차
1. 대상 함수를 복제하고 질의 목적에 충실한 이름을 짓든다.(이게 질의함수가 되는거다)
2. 새 질의 함수에서 부수효과를 모두 제거한다.
3. 정적검사 수행
4. 원래 함수(변경 함수)를 호출하는 곳을 모두 찾아서, 반환값을 사용한다면 질의 함수를 호출하도록 변경하고, 원래 함수를 호출하는 코드를 바로 아래 줄에 새로 추가한다. 매번 테스트한다.
5. 원래 함수에서 질의 관련 코드를 제거한다.
6. 테스트한다.

<br>

### 11.1.3 예시
- 이름 목록에서 악당을 찾아 반환하는(질의) 함수가 있다. 찾으면 경고를 울린다.(부수효과)
```js
function alertForMiscreant(people) {
  for(const p of people) {
    if(['조커', '사루만'].includes(p)) {
      setOffAlarms();
      return p;
    }
  }
}
// 클라이언트
const found = alertForMiscreant(people);
```
- 1,2 : 대상함수 복제하고 부수효과 제거한다.
```js
function findMiscreant(people) {
    for(const p of people) {
    if(['조커', '사루만'].includes(p)) {
      return p;
    }
  }
}
```
- 4: 원래함수 호출측에서 값을 사용하는 부분이 있으면 질의 함수로 대체하고, 바로 원래 함수를 호출하도록 한다.
```js
// 클라이언트
const found = findMiscreant(people);
alertForMiscreant(people);
```

- 5: 원래 함수에서 질의 관련 코드는 제거한다.(값 반환)
```js
function alertForMiscreant(people) {
  for(const p of people) {
    if(['조커', '사루만'].includes(p)) {
      setOffAlarms();
      return;
    }
  }
}
```
- 더 가다듬기 => `findMiscreant()`, `alertForMiscreant()`함수에 중복이 많다. 변경 함수에서 질의 함수를 사용하도록 하면 좋다.(`알고리즘 교체하기(7.9)`)
```js
function alertForMiscreant(people) {
  if(findMiscreant(people)) setOffAlarms();
}
```


<br>

### 11.2 함수 매개변수화하기
```js
// AS-IS
function tenPercentRaise(aPerson) {
  aPerson.salary = aPerson.salary.multiply(1.1);
}
function fivePercentRaise(aPerson) {
  aPerson.salary = aPerson.salary.multiply(1.05);
}

// TO-BE
function raise(aPerson, factor) {
  aPerson.salary = aPerson.salary.multiply(1 + factor);
}
```

<br>

### 11.2.1 설명
- 두 함수의 로직이 아주 비슷하고 리터럴 값만 다르면, 그 리터럴 값을 매개변수로 받도록 하는게 훨 좋다.

<br>

### 11.2.2 절차
1. 비슷한 함수 중 하나를 선택한다.
2. `함수 선언 바꾸기(6.5)`로 리터럴들을 매개변수로 추가한다.
3. 이 함수를 호출하는 곳 모두에 적절한 리터럴 값을 추가한다.
4. 테스트한다.
5. 매개변수로 받은 값을 사용하도록 함수 본문을 수정한다. 매번 테스트한다.
6. 비슷한 다른 함수를 호출하는 코드를 찾아 매개변수화된 함수를 호출하도록 수정한다. 역시 테스트한다.

<br>

### 11.2.3 예시
```js
function baseCharge(usage) {
  if(usage < 0) return usd(0);
  const amount = bottomBand(usage) * 0.03 + midBand(usage) * 0.05 + topBand(usage) * 0.07;
  return usd(amount)
}

function bottomBand(usage) {
  return Math.min(usage, 100);
}

function midBand(usage) {
  return usage > 100 ? Math.min(usage, 200) - 100 : 0;
}

function topBand(usage) {
  return usage > 200 ? usage - 200 : 0 ;
}
```
- bottom, mid, top 세개를 매개변수화 하려면 기본 예제보다는 복잡하다. 여기서는 매개변수를 두개를 쓰면 해결된다.
```js
function baseCharge(usage) {
  if(usage < 0) return usd(0);
  const amount = withBand(usage, 0, 100) * 0.03 + withBand(usage, 100, 200) * 0.05 + withBand(usage, 200, Infinity) * 0.07;
  return usd(amount)
}

function withBand(usage, bottom, top) {
  return usage > bottom ? Math.min(usage, top) - bottom : 0;
}
```
- 로직을 보고 잘 생각해보면 항상 답은 나온다.

<br>


### 11.3 🔥플래그 인수 제거하기
> 개인적으로, 플래그 인수를 항상 사용해 왔었는데(이게 좋다고 생각했다.) 이걸 없애는 쪽으로 사고를 전환할 필요가 있다!
```js
// AS-IS
function setDimension(name, value) {
  if(name === 'height') {
    this._height = value;
    return;
  }
  if(name === 'width') {
    this._width = value;
    return;
  }
}

// TO-BE
function setHeight(value) {this._height = value;}
function setWidth(value) {this._width = value;}
```

<br>

### 11.3.1 설명
- `플래그 인수(flag argument)`란 호출되는 함수가 실행할 로직을 호출하는 쪽에서 선택하기 위해 전달하는 인수다.
- 플래그 인수는 ***호출할 수 있는 함수들이 무엇이고, 어떻게 호출해야 하는지를 이해하기 어려워 지기 때문에 좋지 않다.***
- 인수가 다 플래그 인수는 아니다. 플래그 인수가 되려면 호출하는 쪽에서 ***'프로그램에서 사용되는 데이터가 아닌' 리터럴 값을 건네야 하고***, 호출되는 함수는 그 인수를 다른 함수에 전달하는 데이터가 아닌, ***제어 흐름을 결장하는데 사용***해야 한다.

- 함수 하나에서 플래그 인수를 둘 이상 사용하면, 플래그 인수를 써야 하는게 맞을 수 있다. 안쓰면 m*n 개 만큼의 함수를 구현해야 하기 때문. 하지만 다른 관점에서 보면 함수 하나가 너무 많은 일을 처리하고 있다는 신호이기도 하므로, 같은 로직을 조합해내는 더 간단한 함수를 만들 방법을 고민해 봐야 한다.

<br>


### 11.3.2 절차
1. 매개변수로 주어질 수 있는 값 각각에 대응하는 명시적 함수를 생성한다.
  - 주가 되는 함수에 깔끔한 분배 조건문이 포함되어 있다면 `조건문 분해하기(10.1)`로 명시적함수들을 생성한다. 그렇지 않으면 `래핑 함수` 형태로 만든다.(위험을 줄일 수 있다)
2. 원래 함수를 호출하는 코드를 모두 찾아서 각 리터럴 값에 대응되는 명시적 함수를 호출하도록 수정한다.

<br>

### 11.3.3 예시
- `래핑 함수` 형태로 처리하는 예..
```js
function deliveryDate(anOrder, isRush) {
  let result;
  let deliveryTime;
  if(anOrder.deliveryState === 'MA' || anOrder.deliveryState === 'CT')
    deliveryTime = isRush ? 1 : 2;
  else if(anOrder.deliveryState === 'NY' || anOrder.deliveryState === 'NH')
    deliveryTime = 2;
    if(anOrder.deliveryState === 'NH' && !isRush)
      deliveryTime = 3;
  else if(isRush)
    deliveryTime = 3;
  else if(anOrder.deliveryState === 'ME')
    //...기타등등..
}
```
- 플래그 인수인 `isRush`는 코드 깊숙한 곳 군데군데에 사용되고 있다. 함수가 깔끔하게 `if(isRush) {...} else { ... }` 형태였다면 조건문 분해하기로 명시적 함수를 생성했겠지만, 이 예에서 이렇게 만드는 과정은 리스크가 있기 때문에 `래핑 함수`로 처리한다.
```js
function rushDeliveryDate(anOrder) { return deliveryDate(anOrder, true);}
function regularDeliveryDate(anOrder) { return deliveryDate(anOrder, false);}
```

<br>

### 11.4 객체 통째로 넘기기
```js
// AS-IS
const low = aRoom.daysTempRange.low;
const hight = aRoom.daysTempRange.high;
if(aPlan.withinRange(low, high))

// TO-BE
if(aPlan.withinRange(aRoom.daysTempRage))
```
<br>

### 11.4.1 설명
- 레코드를 통째로 넘기면 변화에 대응하기 쉽다. 꼭 쓰는것만 넘길 필요도 없다. 안쓰는건 그냥 둬도 된다!
- 함수가 레코드 자체에 의존하기를 원치 않을 경우 이 리팩터링을 하지 않는데, 레코드와 함수가 서로 다른 모듈에 속한 상황이면 특히 그렇다.
- 어떤 객체로부터 값 몇 개를 얻은 후 그 값들로만 무언가를 하는 로직이 있다면, 그 로직을 객체(class) 안으로 집어넣어야 함을 알려주는 악취로 봐야 한다! 따라서 데이터 더미를 객체(class)로 묶은 후 적용하는게 좋다.

<br>

### 11.4.2 절차
1. 매개변수들을 원하는 형태로 받는 빈 함수를 만든다.
2. 새 함수의 본문에서는 원래 함수를 호출하도록 하며, 새 매개변수와 원래 함수의 매개변수를 매핑한다.
3. 정적 검사 수행
4. 모든 호출자가 새 함수를 사용하게 수정한다. 매번 테스트 한다.
  - 이 때 매개변수를 spread해서 전달하기 위해 뽑아내던 코드같은거 제거하면 된다.
5. 호출자를 모두 수정했으면, `원래 함수를 인라인(6.2)` 한다.
6. 새 함수의 이름을 적절히 수정하고 모든 호출자에 반영한다.

<br>

### 11.4.3 예시
```js
const low = aRoom.daysTempRange.low;
const high = aRoom.daysTempRange.high;
if(!aPlan.withinRange(low, high))
  alert('방 온도가 지정 범위를 벗어났습니다.');

class HeatingPlan {
  withinRange(bottom, top) {
    return (bottom >= this._temperatureRange.low) && (top <= this._temperatureRange.high);
  }
}
```
- 과정은 복잡한데, 간단한건 그냥 간단하게 할 수 있다. 복잡한 경우에는 위의 절차를 따른다.
```js
if(!aPlan.withinRange(aRoom.daysTempRange))
  alert('방 온도가 지정 범위를 벗어났습니다.');

class HeatingPlan {
  withinRange(aNumberRange) {
    return (aNumberRange.high >= this._temperatureRange.low) && (aNumberRange.low <= this._temperatureRange.high);
  }
}
```


<br>

### 11.5 매개변수를 질의 함수로 바꾸기
```js
// AS-IS
availableVacation(anEmployee, anEmployee.grade);

function availableVacation(anEmployee, grade) {...}

// TO-BE
availableVacation(anEmployee);

function availableVacation(anEmployee) {
  const grade = anEmployee.grade;
  ...
}
```

<br>

### 11.5.1 설명
- 매개변수는 다른 코드와 마찬가지로 중복은 피하는게 좋고, 짧을수록 이해하기 쉽다.
- 호출하는 쪽을 간소하게 만들고, 함수에서 필요한걸 질의하도록 해서 책임을 함수로 옮긴다.
- 매개변수를 질의 함수로 바꾸지 말아야 하는 경우도 있다
  - 매개변수를 제거하면 피호출 함수에 원치 않는 의존성이 생길 때. => 잘 이해가 안간다.

- 이 리팩터링시 조건은, 대상 함수가 `참조 투명`(referential transparency)해야 한다는 것이다. => input이 같으면 output도 같다는 것. 즉 전역 ***'변수같은걸 참조하는 방식이면 안된다는 것'이다***

<br>

### 11.5.2 절차
1. 필요하다면 대상 매개변수의 값을 계산하는 코드를 `별도의 함수로 추출(6.1)`해놓는다.
2. 함수 본문에서 대상 매개변수로의 참조를 모두 찾아서 그 값을 계산해주는 표현식을 참조하도록 한다.
3. `함수 선언 바꾸기(6.5)`로 대상 매개변수를 제거한다.

<br>

### 11.5.3 예시
```js
class Order {
  get finalPrice() {
    const basePrice = this.quantity * this.itemPrice;
    let discountLevel;
    if(this.quantity > 100) discountLevel = 2
    else discountLevel = 1;
    return this.discountPrice(basePrice, discountLevel);
  }

  discountPrice(basePrice, discountLevel) {
    switch(discountLevel) {
      case 1: return basePrice * 0.95;
      case 2: return basePrice * 0.9;
    }
  }
}
```
- `임시 변수를 질의 함수로 바꾸기(7.4)`(discountLevel)를 적용하고 `매개변수를 질의 함수로 바꾸기`를 한다.
```js
class Order {
  get finalPrice() {
    const basePrice = this.quantity * this.itemPrice;
    return this.discountPrice(basePrice);
  }

  // 임시 변수를 질의 함수로 바꾸기(7.4)
  get discountLevel() {
    return (this.quantity > 100) ? 2: discountLevel = 1;
  }

  discountPrice(basePrice) {
    switch(this.discountLevel) {  // 매개변수를 질의 함수로 바꾸기
      case 1: return basePrice * 0.95;
      case 2: return basePrice * 0.9;
    }
  }
}
```

<br>


### 11.6 질의 함수를 매개변수로 바꾸기
```js
// AS-IS
targetTemperature(aPlan);
function targetTemperature(aPlan) {
  currentTemperature = thermostat.currentTemperature;
  ...
}

// TO-BE
targetTemperature(aPlan);
function targetTemperature(aPlan, currentTemperature) {
  ...
}
```

<br>

### 11.6.1 설명
- `매개변수를 질의 함수로 바꾸기(11.5)`의 반대 리팩토링
- 함수 내에 전역변수 참조나 같은 모듈 내에서도 제거하길 윈하는 원소를 참조하는 경우 등 상황에서는 해당 참조를 매개변수로 바꿔주는게 좋다.


<br>

### 11.6.2 절차
1. `변수 추출하기(6.3)`로 질의 코드를 함수 본문의 나머지 코드와 분리한다.
2. 함수 본문 중 해당 질의를 호출하지 않는 코드들을 별도의 `함수로 추출(6.1)`한다.
3. 방금 만든 `변수를 인라인(6.4)` 하여 제거한다.
4. 원래 `함수도 인라인(6.2)` 한다.
5. 새 함수의 이름을 원래 함수의 이름으로 고쳐준다.

<br>

### 11.6.3 예시
```js
class HeatingPlan {
  get targetTemperature() {
    if(thermostat.selectedTemperature > this._max) return this._max;
    else if(thermostat.selectedTemperature < this._min) return this._min;
    else return thermostat.selectedTemperature;
  }
}

// 호출
if(thePlan.targetTemperature > thermostat.currentTemperature) setToHeat();
else if(thePlan.targetTemperature < thermostat.currentTemperature) setToCool();
else setOff();
```
- `HeatingPlan`의 `targetTemperature`이 전역변수 `thermostat.selectedTemperature`를 참조하고 있다. 이 참조를 매개변수로 만들어서 참조 투명성을 가지는 함수로 탈바꿈 시키자.
```js
class HeatingPlan {
  targetTemperature(selectedTemperature) {
    if(selectedTemperature > this._max) return this._max;
    else if(selectedTemperature < this._min) return this._min;
    else return selectedTemperature;
  }
}

// 호출
if(thePlan.targetTemperature(thermostat.selectedTemperature) > thermostat.currentTemperature) setToHeat();
else if(thePlan.targetTemperature(thermostat.selectedTemperature)  < thermostat.currentTemperature) setToCool();
else setOff();
```

<br>


### 11.7 세터 제거하기
```js
// AS-IS
class Person {
  get name() {...}
  set name(aString) {...}
}

// TO-BE
class Person {
  get name() {...}
}
```

<br>

### 11.7.1 설명
- 세터의 존재는 필드가 수정될 수 있음을 의미한다. 필드가 수정되길 원하지 않을 때 세터를 제거하자.
- 이 때 필드 값 세팅은 오로지 생성자를 통해서만 한다.

### 11.7.2 절차
1. 설정할 값을 생성자에서 받지 않는다면, 해당 값을 받을 매개변수를 생성자에 추가한다. 그리고 생성자에서 적절한 세터를 호출한다.
2. 생성자 밖에서 세터 호출하는곳을 찾아 제거하고, 대신에 새로운 생성자를 사용하도록 한다.
3. (생성자에서)세터 메서드를 인라인 한다. 가능하다면 해당 필드를 불변으로 만든다.
4. 테스트

### 11.7.3 예시
- 간단해서 생략. `Person` 클래스에 id 필드가 있는데, 이건 수정되면 안되는 값이기 때문에 세터를 제거한다.

<br>


### 11.8 생성자를 팩터리 함수로 바꾸기
```js
// AS-IS
leadEngineer = new Employee(document.leadEngineer, 'E');

// TO-BE
leadEngineer = createEngineer(document.leadEngineer);
```
<br>

### 11.8.1 설명
- 생성자는 제약이 있다. 반드시 생성자를 정의한 클래스의 인스턴스를 반환해야 하고, 서브클래스 인스턴스나 프락시를 반환할 수 없다. 문법도 고정되어 있고, 일반 함수가 오길 기대하는 자리에는 쓰기 어렵다.
- 팩터리 함수에는 이런 제약이 없기 때문에 좋다.

<br>

### 11.8.2 절차
1. 팩터리 함수를 만든다. 팩터리 함수 본문에서 원래의 생성자를 호출한다.
2. 생성자 호출하던 코드를 팩터리 함수 호출로 바꾼다.
3. 테스트한다.
4. 생성자의 가시 범위가 최소가 되도록 제한한다.(private)

<br>

### 11.8.3 예시
- 직원(`Employee`) 유형을 다루는 예제
```js
class Employee {
  constructor(name, typeCode) {
    this._name = name;
    this._typeCode = typeCode;
  }

  get name() {return this._name;}
  get type() {
    return Employee.legalTypeCodes[this._typeCode];
  }
  static get legalTypeCodes() {
    return {'E': 'Engineer', 'M', 'Manager', 'S': 'Salesperson'};
  }
}

// 사용
candidate = new Employee(document.name, document.empType);
const leadEngineer = new Employee(document.leadEngineer, 'E');

```
- 팩터리 함수를 만들고 생성자 호출을 대체한다.
```js
function createEmployee(name, typeCode) {
  return new Employee(name, typeCode);
}
candidate = createEmployee(document.name, document.empType);
const leadEngineer = createEmployee(document.leadEngineer, 'E');
```

- 두번째 호출에서, 리터럴 값`'E'` 를 전달하는건 악취다. 대신 ***직원 유형을 팩터리 함수의 이름에 녹이는 방식이 좋다.***
```js
function createEngineer(name) {
  return new Employee(name, 'E');
}
const leadEngineer = createEngineer(document.leadEngineer);
```

<br>


### 11.9 🔥함수를 명령으로 바꾸기
```js
// AS-IS
function score(candidate, medicalExam, scoringGuide) {
  let result = 0;
  let healthLevel = 0;
  ...
}

// TO-BE
class Scorer {
  constructor(candidate, medicalExam, scoringGuide) {
    this._candidate = candidate;
    this._medicalExam = medicalExam;
    this._scoringGuide = scoringGuide;
  }

  execute() {
    this._result = 0;
    this._healthLevel = 0;
    ...
  }
}
```

<br>

### 11.9.1 설명
- 함수를 그 함수만을 위한 객체 안으로 캡슐화 할 때, 이 객체를 `명령 객체` 혹은 단순이 `명령`(command)라고 한다. 명령은 대부분 하나의 메서드로 이뤄져있다.
  > `명령`은 커맨드(명령) 패턴에서의 커맨드와 같다
- `명령`은 평범한 함수 메커니즘보다 훨씬 유연하게 함수를 제어하고 표현할 수 있다.
  - undo 같은 보조연산 제공 가능
  - 수명 주기를 더 정밀하게 제어하는데 필요한 매개변수를 만들어주는 메서드 제공 가능
  - 상속과 훅을 이용해 사용자 맞춤으로 만들 수 있다.
  - `일급 함수`를 지원하지 않는 언어에서 `일급 함수`를 흉내낼 수 있다.
  - `중첩 함수`를 지원하지 않는 언어에서 명령에 메서드를 여러개 만들어서 `중첩 함수`역할을 대체할 수 있다.
- 이런 ***유연성은 복잡성을 키우고 얻는 대가***다. 대부분의 상황에서는 `일급 함수`(순수함수)가 더 낫다.

<br>

### 11.9.2 절차
1. 대상 함수의 기능을 옮길 빈 클래스를 만든다.
2. 빈 클래스를 함수로 옮긴다.
3. 함수의 인수들은 명령의 필드로 만든다. 생성자에서 받을지는 고민해본다.

<br>

### 11.9.3 예시
- 명령은 보통 길고 **복잡한 함수를 잘게 쪼개서 이해하거나 수정하기 쉽게 만드는데**에 좋다.
- 건강보험 애플리케이션에서 사용하는 점수 계산 함수를 예로 든다.
```js
function score(candidate, medicalExam, scoringGuide) {
  let result = 0;
  let healthLevel = 0;
  let highMedicalRiskFlag = false;
  if(medicalExam.isSmoker) {
    healthLevel += 10;
    highMedicalRiskFlag = true;
  }
  let certificationGrade = 'regular';
  if(scoringGuide.stateWithLowCertification(candidate.originState)) {
    certificationGrade = 'low';
    result -=5;
  }
  
  // ...

  result -= Math.max(healthLevel - 5, 0);
  return result;
}
```
- 우선 클래스를 하나 만들고(`Scorer`) 메서드를 만들어서 함수와 시그니쳐를 맞춘다.
```js
class Scorer {
  execute(candidate, medicalExam, scoringGuide) {
    let result = 0;
    let healthLevel = 0;
    let highMedicalRiskFlag = false;
    if(medicalExam.isSmoker) {
      healthLevel += 10;
      highMedicalRiskFlag = true;
    }
    let certificationGrade = 'regular';
    if(scoringGuide.stateWithLowCertification(candidate.originState)) {
      certificationGrade = 'low';
      result -=5;
    }
  
    //...
  
    result -= Math.max(healthLevel - 5, 0);
    return result;
  }
}

function score(candidate, medicalExam, scoringGuide) {
  return new Scorer().execute(candidate, medicalExam, scoringGuide);
}
```
- 이건 간단한 예였지만, 보통 복잡한 함수를 명령으로 만들때는 여러가지 라이프사이클 관리라던가, 상태라던가.. 이런게 복잡하게 필요해서다. 따라서 함수 인자들을 모두 생성자로 받아서 필드로 다루는게 (보통)좋다.
```js
class Scorer {
  constructor(candidate, medicalExam, scoringGuide) {
    this._candidate = candidate;
    this._medicalExam = medicalExam;
    this._scoringGuide = scoringGuide;
  }
  
  execute() {
    let result = 0;
    let healthLevel = 0;
    let highMedicalRiskFlag = false;
    if(this._medicalExam.isSmoker) {
      healthLevel += 10;
      highMedicalRiskFlag = true;
    }
    let certificationGrade = 'regular';
    if(this._scoringGuide.stateWithLowCertification(this._candidate.originState)) {
      certificationGrade = 'low';
      result -=5;
    }
  
    //...
  
    result -= Math.max(healthLevel - 5, 0);
    return result;
  }
}

function score(candidate, medicalExam, scoringGuide) {
  return new Scorer(candidate, medicalExam, scoringGuide).execute();
}
```
- 이 리팩터링의 본래 목적은 복잡한 함수를 잘게 나누는 것이다. 
- 메서드 내의 (필요한)모든 지역변수(상태)를 필드로 바꾼다.
```js
class Scorer {
  execute() {
    this._result = 0;
    this._healthLevel = 0;
    this._highMedicalRiskFlag = false;
    if(this._medicalExam.isSmoker) {
      this._healthLevel += 10;
      this._highMedicalRiskFlag = true;
    }
    this._certificationGrade = 'regular';
    if(this._scoringGuide.stateWithLowCertification(this._candidate.originState)) {
      this._certificationGrade = 'low';
      result -=5;
    }
  
    //...
  
    this._result -= Math.max(this._healthLevel - 5, 0);
    return this._result;
  }
}
```
- 이렇게 하면 복잡한 함수의 부분 부분을 `함수 추출하기(6.1)`하기가 쉬워진다.
```js
class Scorer {
    execute() {
    this._result = 0;
    this._healthLevel = 0;
    this._highMedicalRiskFlag = false;
    this.scoreSmoking();
    this._certificationGrade = 'regular';
    if(this._scoringGuide.stateWithLowCertification(this._candidate.originState)) {
      this._certificationGrade = 'low';
      result -=5;
    }
  
    //...
  
    this._result -= Math.max(this._healthLevel - 5, 0);
    return this._result;
  }

  scoreSmoking() {  // 함수 추출히가기 쉽다!!
    if (this._medicalExam.isSmoker) {
      this._healthLevel += 10;
      this._highMedicalRiskFlag = true;
    }
  }
}
```
- 이런건 자바스크립트에서는 `중첩 함수`로 처리해도 되긴 한다. 근데 저자는 명령이 더 좋다고 한다. 서브 함수들을 테스트와 디버깅에 활용할 수 있기 때문이라고!

> 명령이라는건 결국 [Command 패턴](https://gmlwjd9405.github.io/2018/07/07/command-pattern.html) 구현하는건데, 보통 java에서 커맨드패턴 구현하는 목적의 경우가 ***js에서는 함수가 일급 객체이기 때문에 함수 전달하는게 훨씬 직관적***이다.( ex 콜백함수 등록). js에서 Command 패턴 구현하는건 진짜 기능이 길고 의존관계가 복잡하고 라이프사이클 관리같은걸 해야할 때 뿐일듯 하다.


<br>


### 11.10 명령을 함수로 바꾸기
```js
// AS-IS
class ChargeCalculator {
  constructor(customer, usage) {
    this._customer = customer;
    this._usage = usage;
  }
  execute() {
    return this._customer.rate * this._usage;
  }
}

// TO-BE
function charge(customer, usage) {
  return customer.rate * usage;
}
```

<br>

### 11.10.1 설명
- 커맨드 패턴 좋지만, 복잡도를 올린다. 간단한건 함수로 처리한다.

<br>

### 11.10.2 절차
1. 명령을 생성하는 코드와 명령의 실행 메서드를 호출하는 코드를 함께 함수로 추출한다.
2. 명령의 실행 함수가 호출하는 보조 `메서드들 각각을 인라인(6.2)`한다.
3. `함수 선언 바꾸기`(6.5)로 생성자의 매개변수 모두를 실행 메서드로 옮긴다.
4. 명령의 실행 메서드에서 참조하는 필드들 대신 대응하는 매개변수를 사용하게 바꾼다.
5. 생성자 호출과 명령의 실행 메서드 호출을 호출자(대체함수) 안으로 인라인한다.
6. 테스트
7. 클래스 제거한다.

<br>

### 11.10.3 예시
- 그냥 역순이기 때문에 생략. 실제로 번거롭게 커맨드 만들고 아니다 싶어 지울일도 잘 없을듯?

<br>

### 11.11 수정된 값 반환하기
```js
// AS-IS
let totalAscent = 0;
calculateAscent();

function calculateAscent() {
  for(let i = 1; i < points.length; i++) {
    const verticalChange = points[i].elevation - points[i-1].elevation;
    totalAscent += (verticalChange > 0) ? verticalChange : 0;
  }
}

// TO-BE
const totalAscent = calculateAscent();

function calculateAscent() {
  let result = 0
  for(let i = 1; i < points.length; i++) {
    const verticalChange = points[i].elevation - points[i-1].elevation;
    result += (verticalChange > 0) ? verticalChange : 0;
  }
  return result;
}
```

<br>

### 11.11.1 설명
- 데이터가 여기저기서 참조되어 수정된다면 흐름을 알기가 너무 어려워진다. 데이터가 수정되면 그 사실을 명확히 알려주는게 중요하다.
- 여기서 좋은 방법이, 변수를 갱신하는 함수라면 수정된 값을 반환하게 하는 것이다. 
- 어쨋거나 결국 참조 투명성을 지키는게 중요한듯하다.

<br>

### 11.11.2 절차
1. 함수가 수정된 값을 반환하게 하여 호출자가 그 값을 자신의 변수에 저장하게 한다.
2. 테스트.
3. 피호출 함수 안에 반환할 값을 가리키는 새로운 변수를 선언한다.
4. 테스트
5. 계산과 선언이 동시에 이뤄지도록 통합한다.
6. 테스트
7. 피호출 함수의 변수 이름을 새 역할에 어울리게 바꾼다.

<br>

### 11.11.3 예시
- 간단한거라 생략한다. 위에 예제로 충분

<br>

### 11.12 오류 코드를 예외로 바꾸기
```js
// AS-IS
if(data) 
  return new ShippingRules(data);
else 
  return -23;

// TO-BE
if(data)
  return new ShippingRules(data);
else
  throw new OrderProcessingError(-23);
```

<br>

### 11.12.1 설명
- 옛날에는 오류 코드(error code)를 쓰는게 보편적이었다.
  - 함수 호출시 오류 코드를 반환할 수 있고
  - 오류 코드 검사 코드를 추가한다.
  - 직접 처리하거나, 콜스택 위로 계속 던진다.(`return`)
- 예외는 적절한 예외 핸들러를 찾을 때까지 콜스택을 타고 알아서 전파된다. 일일이 검사해서 다시 던질 필요는 없다. ***이런 예외의 독자적인 흐름은 프로그램의 나머지에서 오류 발생에 따른 복잡한 상황에 대처하는 코드를 작성하거나 읽을 일이 없어지게 한다.***
- 예외는 정확히 ***'예상 밖의 동작'***일 때만 써야 한다. 
  - 예외를 던지는 코드를 프로그램 종료 코드로 바꿔도 프로그램이 여전히 정상 동작할지를 따져봐야 한다! => 이건 동의할 수가 없다. FE에서 api호출시 404하나 뜬다고 프로그램 죽여야하나?

- 절차/예시는 일반적이므로 생략. 나는 에러코드 안던진다.

<br>

### 11.13 예외를 사전확인으로 바꾸기 
```java
// AS-IS
double getValueForPeriod(int periodNumber) {
  try {
    return values[periodNumber];
  } catch(ArrayIndexOutOfBoundsException e) {
    return 0;
  }
}

// TO-BE
double getValueForPeriod(int periodNumber) {
  return (periodNumber >= values.length) ? 0 : values[periodNumber];
}
```

<br>

### 11.13.1 설명
- 예외는 '뜻밖의 오류'라는, 말 그대로 예외적으로 동작할 때 쓰여야 한다. **함수 수행 시 문제가 될 수 있는 조건을 함수 호출 전에 검사할 수 있다면, 예외를 던지는 대신 호출하는 곳에서 조건을 검사해야 한다.**
  - 예를들어, api 호출시 200을 줄지 404를 줄지는 체크할 수가 없다. => 예외

- 절차/예시는 생략한다.

<br>

## 12. 상속 다루기
### 12.1 메서드 올리기
```js
// AS-IS
class Employee{...}

class SalesPerson extends Employee {
  get name() {...}
}
class Engineer extends Employee {
  get name() {...}
}

// TO-BE
class Employee {
  get name() {...}
}
class SalesPerson {...}
class Engineer {...}
```

<br>

### 12.1.1 설명
- 중복은 위험하다. 한쪽의 변경이 다른쪽에는 반영되지 않을 수 있기 때문. 하지만 중복을 찾는게 쉽지 않다.(완전 똑같은건 잘 없다.) `메서드 올리기`는 중복을 제거하는데 유용하다.
- 다른 두 클래스 각각의 메서드가 거의 같은 일을 할 경우, `함수 매개변수화(11.2)`를 통해 하나의 메서드로 만들고 `메서드 올리기` 할 수 있다.
- 두 메서드가 흐름이 비슷하지만 세부 내용이 다르면 `템플릿 메서드 만들기`를 고려한다.([템플릿 메서드 패턴](https://gmlwjd9405.github.io/2018/07/13/template-method-pattern.html))

<br>

### 12.1.2 절차
1. 똑같이 동작하는 메서드인지 면밀히 살핀다.
- 실질적으로 하는 일이 같은데 코드가 다르면, 본문 코드가 같아질 때 까지 리팩터링 한다.
2. 메서드 안에서 호출하는 다른 메서드와 참조하는 필드들을 슈퍼클래스에서도 호출/참조할 수 있는지 확인한다.
3. 메서드 시그니처가 다르면 `함수 선언 바꾸기(6.5)`로 슈퍼클래스에서 사용하고 싶은 형태로 통일한다.
4. 슈퍼클래스에 새로운 메서드를 생성하고 대상 메서드의 코드를 복붙한다.
5. 정적 검사
6. 서브클래스 중 하나의 메서드를 제거한다.
7. 테스트
8. 모든 서브클래스의 메서드가 없어질 때까지 다 제거하고 테스트한다.

### 12.1.3 예시
```js
class Party {}
class Employee extends Party {
  get annualCost() {
    return this.monthlyCost * 12;
  }
  get monthlyCost() {...};
}
class Department extends Party {
  get totalAnnualCost() {
    return this.monthlyCost * 12;
  }
  get monthlyCost() {...};
}
```
- 2: `monthlyCost()`는 서브클래스에만 정의되어 있다. 정적언어(Java)였으면 `Party`에 추상 메서드 정의해야 하지만 js에서는 괜찮다.
- 3: 두 메서드의 이름은 다르지만, 하는 동작은 같다. 함수 선언바꾸기로 통일한다. 4: 슈퍼클래스에 새로운 메서드도 넣는다. 이후 서브클래스의 `annualCost()`를 하나씩 제거하고 테스트하면 된다.
```js
class Employee extends Party {
  get monthlyCost() {...};
}
class Department extends Party {
  get monthlyCost() {...};
}
class Party {
  get annualCost() {
    return this.monthlyCost * 12;
  }
}
```
- js는 추상 메서드가 없기 때문에 이렇게 끝나지만, ts에서는 추상 메서드를 넣어줘야한다.(이것도 같은 동작이라면 그냥 슈퍼클래스에 구현한다.) js에서는 여기서 아래와 같이도 처리할 수 있긴 하다
```js
class Party {
  get monthlyCost() {
    throw new SubclassResponsibilityError();
  }
}
``` 

<br>

### 12.2 필드 올리기
```java
// JAVA
// AS-IS
class Employee{...}
class SalesPerson extends Employee {
  private String name;
}
class Engineer extends Employee {
  private String name;
}

// TO-BE
class Employee{
  protected String name;
}
class SalesPerson extends Employee {}
class Engineer extends Employee {}
```

<br>

### 12.2.1 설명
- 서브클래스가 나중에 독립적으로 개발되거나 하면, 필드 중복이 왕왕 일어난다. 이 때 필드 이름은 다르지만 역할이 같은 경우도 있으니 잘 살펴보아야 한다.
- 필드를 위로 올리면, 1. 데이터 중복 선언을 없애고, 2. 해당 필드를 사용하는 동작을 슈퍼클래스로 옮길 수 있다.

<br>

### 12.3 생성자 본문 올리기
```js
// AS-IS
class Party {...}
class Employee extends Party {
  constructor(name, id, monthlyCost) {
    super();
    this._id = id;
    this._name = name;
    this._monthlyCost = monthlyCost;
  }
}

// TO-BE
class Party {
  constructor(name) {
    this._name = name;
  }
}
class Employee extends Party {
  constructor(name, id, monthlyCost) {
    super(name);
    this._id = id;
    this._monthlyCost = monthlyCost;
  }
}
```

<br>

### 12.3.1 설명
- 생성자는 다루기 까다로워, 하는 일이 많지 않을수록 좋다.
- 서브클래스들에서 같은 기능의 메서드를 발견하면 `메서드 올리기`를 적용하듯, 생성자 중복로직도 올릴 수 있다. 

<br>

### 12.3.2 절차
1. 슈퍼클래스에 생성자가 없다면 하나 정의한다.
2. `문장 슬라이드하기(8.6)`로 공통 문장 모두를 super() 호출 직후로 옮긴다.
3. 공통 코드를 슈퍼클레스에 추가하고 서브클래스에서 제거한다. 생성자 매개변수 중 공통 코드에서 참조하는 값들을 모두 super로 건넨다.
4. 테스트
5. 생성자 시작 부분으로 옮길 수 없는 공통 코드에는 `함수 추출하기(6.1)`와 `메서드 올리기(12.1)`를 차례로 적용한다.

<br>

### 12.3.3 예시
- 절차 중 5.에 해당하는것만 본다.
```js
class Employee {
  constructor(name) {...}
  get isPrivileged() {...}
  assignCar() {...}
}

class Manager extends Employee {
  constructor(name, grade) {
    super(name);
    this._grade = grade;
    if(this.isPrivileged) this.assingCar(); // 모든 서브클래스가 수행
  }
  get isPrivileged() {
    return this._grade > 4;
  }
}
```
- `isPrivileged()`의 구현은 서브클래스마다 달라지는데, `Manager`에서는 반드시 `this._grade = grade;`를 한 후 호출이 되어야하는 제약사항이 있다. 따라서 해당 코드를 Employee로 옮길 수 없는것이다. 여기에서 
  > 5. 생성자 시작 부분으로 옮길 수 없는 공통 코드에는 `함수 추출하기(6.1)`와 `메서드 올리기(12.1)`를 차례로 적용한다.
- 를 적용할 수 있는것이다. 결과는 아래와 같다.
```js
class Employee {
  constructor(name) {...}
  get isPrivileged() {...}
  assignCar() {...}
  finishConstruction() {  // 메서드올리기(12.1) 
    if(this.isPrivileged) this.assingCar();   // 함수추출하기(6.1)
  }
}

class Manager extends Employee {
  constructor(name, grade) {
    super(name);
    this._grade = grade;
    this.finishConstruction();
  } 
  get isPrivileged() {
    return this._grade > 4;
  }
}
```

<br>

### 12.4 메서드 내리기
```js
// AS-IS
class Employee {
  get quota {...}
}
class Engineer extends Employee {...}
class SalesPerson extends Employee {...}

// TO-BE
class Employee {...}

class Engineer extends Employee {...}
class SalesPerson extends Employee {
  get quota {...}
}
```

<br>

### 12.4.1 설명
- 특정 서브클래스(들)와만 관련된 메서드는 슈퍼클래스에서 서브클래스로 내리는게 좋다.
- 호출자가 서브클래스 타입을 정확히 알 때만 사용해야 하고, 그렇지 못한 상황이라면 서브클래스에 따라 다르게 동작하는 슈퍼클래스의 기민적인 조건부 로직을 `다형성(10.4)`으로 바꿔야 한다. (이게 정확하게 무슨말인지 잘 모르겠다.)

<br>


### 12.5 필드 내리기
```js
// AS-IS
class Employee {
  private String quota;
}
class Engineer extends Employee {...}
class SalesPerson extends Employee {...}

// TO-BE
class Employee {...}

class Engineer extends Employee {...}
class SalesPerson extends Employee {
  protected String quota;
}
```
- 특정 서브클래스(들)에서만 사용되는 필드는 해당 서브클래스(들)로 옮기자.

<br>

### 12.6 타입 코드를 서브클래스로 바꾸기
```js
// AS-IS 
function createEmployee(name, type) {
  return new Employee(name, type);
}

// TO-BE
function createEmployee(name, type) {
  switch(type) {
    case 'engineer': return new Engineer(name);
    case 'salesperson': return new SalesPerson(name);
    ...
  }
}
```
<br>

### 12.6.1 설명
- 소프트웨어에서 비슷한 대상들을 특정 특성에 따라 구분해야 할 경우가 있다. 직원을 담당업무로 구분(엔지니어, 관리자, 영업자)하거나 주문을 시급성으로 구분(급함, 보통)하기도 한다. 이런 곳에 타입코드(`type code`)필드가 쓰인다.
- 타입 코드 만으로 불편한 경우, `서브클래스`가 필요할 때가 생긴다. 서브클래스가 되면 아래와 같은 장점이 생긴다.
  - 조건에 따라 다르게 동작하도록 `다형성`을 제공할 수 있다.
  - 특정 타입에서만 의미가 있는 값을 사용하는 필드나 메서드가 있을 때 유용하다.
    - 예를들어 `판매 목표`는 `영업자`객체에게만 유용하다.
    - 이런 상황에선 서브클래스를 만들고, 서브클래스만 해당 필드를 갖게 한다(`필드 내리기(12.5)`)

- 이 리팩토링은 두 가지 유형으로 이뤄진다.
    1. 대상 클래스에 직접 적용(대상 클래스를 서브클래싱)
    2. 타입 코드 자체에 적용(타입 코드를 원시값이 아닌 class로 정의하는 형태)
- `2. 타입 코드 자체에 적용`의 방식이 필요한 이유는, 예를들어 타입 코드(업무 유형)을 다른 용도로 쓰고 싶을 수 있기 때문이다. 또한, 유형이 불변일 때도 직접 서브클래싱 방식은 이용할 수 없다.(?)

<br>

### 12.6.2 절차
1. 타입 코드 필드를 자가 캡슐화 한다.
2. 타입 코드 값 하나를 선택하여 그 값에 해당하는 서브클래스를 만든다. 타입 코드 게터 메서드를 오버라이드 하여 해당 타입 코드의 리터럴 값을 반환하게 한다.
3. 매개변수로 받은 타입 코드와 방금 만든 서브클래스를 매핑하는 선택 로직을 만든다.
4. 테스트한다.
5. 타입 코드 값 각각에 대해 서브클래스 생성, 선택로직 추가를 반복하고 테스트한다.
6. 타입 코드 필드를 제거한다.(선택사항)
7. 테스트한다.
8. 타입 코드 접근자를 이용하는 메서드 모두에 `메서드 내리기(12.4)`와 `조건부 로직을 다형성으로 바꾸기(10.4)`를 적용한다.


<br>

### 12.6.3 예시
1. 직접 상속의 경우(서브클래싱)
- 직원 코드를 리팩터링한다.
```js
class Employee {
  constructor(name, type){
    this.validateType(type);
    this._name = name;
    this._type = type;
  }

  validateType(arg) {
    if(!['engineer', 'manager', 'salesperson'].includes(arg)) {
      throw new Error(`${arg}라는 직원 유형은 없습니다.`);
    }
  }
  toString() {return `${this._name}(${this._type})`};
}
```
- 1: 타입 코드 변수를 자가 캡슐화(6.6)한다.
```js
class Employee {
  ...

  get type() { return this._type; }
  toString() {return `${this._name}(${this.type})`};
}
```
- 타입 코드 하나('engineer')를 골라 서브클래싱한다.
```js
class Engineer extends Employee {
  get type() {return 'engineer';}
}
```
- 이제 이걸 사용하도록 해야 한다. 자바스크립트에서는 `Employee`의 생성자에서도 `Engineer`인스턴스를 반환하는 식으로 할 수 있으나, 좋은 방식이 아니다. 
- 3: `생성자를 팩터리 함수로 바꾸고(11.8)` 'engineer'타입을 `Engineer`인스턴스에 매핑한다.
```js
function createEmployee(name, type) {
  switch(type) {
    case 'engineer': return new Engineer(name, type);
  }
  return new Employee(name, type);
}
```
- 5: 남은 유형도 똑같이 한다.
```js
class SalesPerson extends Employee {
  get type() {return 'salesperson';}
}

class Manager extends Employee {
  get type() {return 'manager';}
}

function createEmployee(name, type) {
  switch(type) {
    case 'engineer': return new Engineer(name, type);
    case 'salesperson': return new SalesPerson(name, type);
    case 'manager': return new Manager(name, type);
  }
  return new Employee(name, type);
}
```
- 6: 모든 타입에 적용했으면, 타입코드 필드와 슈퍼클래스의 게터를 제거한다.
```js
class Employee {
  constructor(name){
    this._name = name;
  }
  toString() {return `${this._name}(${this.type})`}; // 제거하지 않았는데, type게터가 서브클래스에는 존재하기 때문. 어차피 Employee 인스턴스는 아래에서 보다시피 만들지 않는다.(_type을 type으로 게터 쓰도록 만든 이유는 Employee의 type필드를 지우기 위함이었다!)
}

function createEmployee(name, type) {
  switch(type) {
    case 'engineer': return new Engineer(name);
    case 'salesperson': return new SalesPerson(name);
    case 'manager': return new Manager(name);
    default: throw new Error(`${type}라는 직원 유형은 없습니다.`);
  }
}
```
- 서브클래스의 `type 게터`는 지워도 되나, 이걸 참조하는 다른 코드가 있을수도 있기 때문에(`toString()`) 지워야 할 경우,8: `조건부 로직을 다형성으로 바꾸기(10.4)`,`메서드 내리기(12.4)`를 적용해서 문제를 해결할 수 있다.
  - 여기서는 toString을 (필요한)각 서브클래스에 구현하고 메서드 내 `this.type`을 하드코딩(`'engineer'`, ...) 해주는 방식으로 `type 게터` 제거 가능하다.
  
<br>

2. 간접 상속의 경우(타입을 클래스로)
- 처음 상황으로 돌아간다. `Employee`를 상속하는 `아르바이트`,`정직원` 클래스가 이미 존재해서 직접 상속으로 `Engieer`, `Manger`, `Salesperson` 객체를 만드는 방식으로는 타입 문제를 대처하기가 어렵다.
- 직원 유형을 변경하고 싶다는 점(`불변`)도 직접 상속을 쓰고싶지 않은 이유다

```js
class Employee {
  constructor(name, type){
    this.validateType(type);
    this._name = name;
    this._type = type;
  }

  validateType(arg) {
    if(!['engineer', 'manager', 'salesperson'].includes(arg)) {
      throw new Error(`${arg}라는 직원 유형은 없습니다.`);
    }
  }

  get type() { return this._type; }
  set type(arg) {return this._type = arg;} // 불변, 통째로 바꿔야 한다.

  get capitalizedType() {
    return this._type.charAt(0).toUpperCase() + this._type.substr(1).toLowerCase();
  }
  toString() {return `${this._name}(${this.capitalizedType})`};
}
```
- 1: 타입 코드를 객체로 바꾼다. (`기본형을 객체로 바꾸기(7.3)`)
```js
class Employee {
  ...

  get typeString() { return this._type.toString();}
  get type() { return this._type; }
  set type(arg) {return this._type = new EmployeeType(arg);} // 불변, 통째로 바꿔야 한다.

  get capitalizedType() {
    return this.typeString.charAt(0).toUpperCase() + this.typeString.substr(1).toLowerCase();
  }
  toString() {return `${this._name}(${this.capitalizedType})`};
}

class EmployeeType {
  constructor(aString) {
    this._value = aString;
  }
  toString() {return this._value;}
}
```
- `EmployeeType`클래스를 만들었고, `set type()`에서 원시값을 객체로 바꾸도록 했다. type의 string값이 필요한경우, `typeString`게터를 쓴다.
- 이제 직원 유형을 하나씩 리팩토링한다.
```js
class Employee {
  ...

  set type(arg) {return this._type = Employee.createEmployeeType(arg)} 
  static createEmployeeType(aString) {
    switch(aString) {
      case 'engineer': return new Engineer();
      case 'salesperson': return new SalesPerson();
      case 'manager': return new Manager();
      default: throw new Error(`${aString}라는 직원 유형은 없습니다.`);
    }
  }

  ...
}
class Engineer extends EmployeeType {
  toString() { return 'engineer'; }
}
class Manager extends EmployeeType {
  toString() { return 'manager'; }
}
class SalesPerson extends EmployeeType {
  toString() { return 'salesPerson'; }
}
```
- 여기까지 했으면 빈 `EmployeeType`을 제거할 수도 있다. 하지만 다양한 서브클래스의 접점이 되어서 관계를 알려주기 때문에, 그냥 두는게 좋다. 
- 그리고 `EmployeeType`클래스는 공통 기능을 옮겨놓기에도 편하다. 예를들어 `Employee`클래스의 `capitalizedType()`메서드는 `EmployeeType`에서 해주는게 편하다.
```js
class EmployeeType {
  get capitalizedName() {
    return this.toString().charAt(0).toUpperCase() + this.toString().substr(1).toLowerCase();
  }
}

class Employee {
  toString() {
    return `${this._name}(${this.type.capitalizedType})`;
  }
}
```

<br>

### 12.7 서브클래스 제거하기
```js
// AS-IS
class Person {
  get genderCode() { return 'X'; }
}
class Male extends Person {
  get genderCode() { return 'M'; }
}
class Female extends Person {
  get genderCode() { return 'F'; }
}

// TO-BE
class Person {
  get genderCode() { return this._genderCode; }
}
```

<br>

### 12.7.1 설명
- 서브클래싱은 원래 데이터 구조와 다른 변종을 만들거나, 종류에 따라 동작이 달라지게 하는 유용한 메커니즘이다. 그런데 시간이 지나면서 변종이 다른 모듈로 이동하거나 해서 서브클래스가 더이상 필요가 없을 때가 있다. 서브클래스는 거추장스럽고, 코드를 이해하기 어렵게만 만들게 되는 것이다. 이 때 `서브클래스 제거하기`를 한다.

<br>

### 12.7.2 절차
1. 서브클래스의 생성자를 `팩터리 함수로 바꾼다.(11.8)`
2. 서브클래스의 타입을 검사하는 코드가 있다면, 그 검사 코드에 `함수 추출하기(6.1)`와 `함수 옮기기(8.1)`를 적용해 슈퍼클래스로 옮긴다.
3. 서브클래스의 타입을 나타내는 필드를 슈퍼클래스에 만든다.
4. 서브클래스를 참조하는 메서드가 방금 만든 타입 필드를 이용하도록 수정한다.
5. 서브클래스를 지운다.
6. 테스트한다.

### 12.7.3 예시
- `Person` 클래스를 리팩토링한다.
```js
class Person {
  constructor(name) {
    this._name = name;
  }
  get name() {return this._name;}
  get genderCode() {return 'X';}
}

class Male extends Person {
  get genderCode() {return 'M';}
}

class Female extends Person {
  get genderCode() {return 'F';}
}

// 클라이언트
function loadFromData(data) {
  const result = [];
  data.forEach(aRecord => {
    let p;
    switch(aRecord.gender) {
      case 'M': p = new Male(aRecord.name); break;
      case 'F': p = new Female(aRecord.name); break;
      default: p = new Person(aRecord.name);
    }
    result.push(p);
  });
  return result;
}

const numberOfMales = people.filter(p => p instanceof Male).length
```
- 서브클래스가 하는 일이 타입코드 구분밖에 없다면 존재이유가 없다.
- ***무언가의 표현 방법을 바꿀 때, 먼저 현재의 표현을 캡슐화하여 이 변화가 클라이언트 코드에 주는 영향을 최소화 해야 한다.*** 1: 서브클래스 만들기의 캡슐화는 `생성자를 팩터리 함수로 바꾸기(11.8)`이다.
```js
function loadFromData(data) {
  return data.map(aRecord => createPerson(aRecord));
}

function createPerson(aRecord) {
  switch(aRecord.gender) {
    case 'M': return new Male(aRecord.name);
    case 'F': return new Female(aRecord.name);
    default: return new Person(aRecord.name);
  }
}
```
- `변수 인라인(6.4)`, `반복문을 파이프라인으로 바꾸기(8.6)`등도 적용했다.
- `numberOfMales`에서는 `instanceof`를 쓰고 있다. 구린내가 난다. 2: 타입 검사 코드를 `함수로 추출(6.1)`한 후 Person으로 옯긴다.(`함수 옮기기(8.1)`)
```js
class Person {
  ...
  get isMale() {
    return this instanceof Male; 
  }
}

...

const numberOfMales = people.filter(p => p.isMale).length
```
- 3: 서브클래스에 성별 코드를 추가한다. 이건 생성자 매개변수로 받아 설정해야 한다.
```js
class Person {
  constructor(name, genderCode) {
    this._name = name;
    this._genderCode = genderCode || 'X';
  }
  get genderCode() {return this._genderCode; }
}
```
- 4: 그 뒤 서브클래스를 참조하는 메서드가 방금 만든 타입 필드를 쓰도록 한다. => 남성인 경우의 로직을 슈퍼클래스를 옮긴다. (Male/Female의 생성자, `instanceof Male`)
```js
function createPerson(aRecord) {
  switch(aRecord.gender) {
    case 'M': return new Person(aRecord.name, 'M');
    case 'F': return new Person(aRecord.name, 'F');
    default: return new Person(aRecord.name, 'X');
  }
}
class Person {
  constructor(name, genderCode) {
    this._name = name;
    this._genderCode = genderCode ;
  }
  get genderCode() {return this._genderCode; }
}
```
- 5: 서브클래스를 제거하고, 6: 테스트한다

> 배운점: 클라코드 리팩토링 시 캡슐화가 중요하다.(생성자 => 팩터리 함수 등..) 여기저기서 산발적으로 쓰일 수 있는 코드는 캡슐화를 미리미리 해놔야 이런 변경에 자유롭다는걸 느낀다.(서브클래스 생성자, 타입코드 필드에 따른 분기처리, 기타 등등..) 리팩터링 할 때 하면 역시나 손이 많이간다.

<br>

### 12.8 슈퍼클래스 추출하기
```js
// AS-IS
class Department {
  get totalAnnualCost() {...}
  get name() {...}
  get haedCount() {...}
}
class Employee {
  get annualCost() {...}
  get name() {...}
  get id() {...}
}

// TO-BE
class Party {
  get name() {...}
  get annualCost() {...}
}
class Department extends Party {
  get annualCost() {...}
  get haedCount() {...}
}
class Employee extends Party {
  get annualCost() {...}
  get id() {...}
}
```

<br>

### 12.8.1 설명
- 비슷한 일을 하는 두 클래스가 있으면 상속 메커니즘을 이용해 비슷한 부분(필드, 메서드)을 슈퍼클래스로 옮길 수 있다.
- 슈퍼클래스 추출하기의 대안으로 `클래스 추출하기(7.5)`가 있다. 이는 중복을 `위임`으로 해결하는 것이다. 둘 중 적절한걸 선택하면 된다.

<br>

### 12.8.2 절차
1. 빈 슈퍼클래스를 만들고 원래 클래스가 이를 상속하게 한다.
2. 테스트
3. `생성자 본분 올리기(12.3)`, `메서드 올리기(12.1)`, `필드 올리기(12.2)`를 차례로 적용해 공통 원소를 슈퍼클래스로 옮긴다.
4. 서브클래스에 남은 메서드들을 검토한다. 공통되는 부분이 있으면 `함수로 추출(6.1)`한 다음 `메서드 올리기(12.1)`을 적용한다.
5. 원래 클래스들을 사용하는 코드를 검토하여 슈퍼클래스의 인터페이스를 사용하게 할지 고민해본다. 

<br>

### 12.8.3 예시
- `Employee`, `Departement` 두 클래스에 '연간비용', '월간비용', '이름'이라는 공통기능이 보인다. 
```js
class Employee {
  constructor(name, id, monthlyCost) {
    this._id = id;
    this._name = name;
    this._monthlyCost = monthlyCost;
  }
  get monthlyCost() { return this._monthlyCost; } // 월간비용
  get name() { return this._name; } // 이름
  get id() { return this._id; }

  get annualCost() { // 연간 비용
    return this.monthlyCost * 12; 
  }
}

class Department {
  constructor(name, staff) {
    this._name = name;
    this._staff = staff;
  }
  get staff() { return this._staff.slice(); }
  get name() { return this._name; } // 이름
  get totalMonthlyCost() { // 총 월간비용
    return this.staff 
      .map(e => e.monthlyCost)
      .reduce((sum, cost) => sum + cost);
  }
  get headCount() {
    return this.staff.length;
  }
  get totalAnnualCost() { // 총 연간비용
    return this.totalMonthlyCost * 12;
  }
}
```
- 1: 슈퍼클래스(`Party`)를 만들고 클래스들이 이를 상속하도록 한다.
- 3: 공통부분(`name`)을 생성자본문 -> 메서드 -> 필드 올리기를 통해 슈퍼클래스로 옮긴다.
```js
class Party {
  constructor(name) {
    this._name = name;
  }
  get name() { return this._name; }
}
class Employee {
  constructor(name, id, monthlyCost) {
    super(name);
    ...
  }
}
class Department extends Party {
  constructor(name, staff) {
    super(name);
    ...
  }
}
```
- 다음으로 구현로직이 비슷한 연간 메서드(`annualCost`)를 옮긴다. 
  - 먼저 이름이 다른 월간/연간 비용 산출 메서드를 `함수 선언 바꾸기(6.5)`로 이름을 통일하고
  - 구현이 같은 연간 비용 산출 메서드는 `메서드 올리기(12.1)`로 슈퍼클래스로 옮긴다. 
- 다 하고나면 아래와 같아진다.
```js
class Party {
  constructor(name) {
    this._name = name;
  }
  get name() { return this._name; }
  get annualCost() {
    return this.monthlyCost * 12;
  }
}
class Employee extends Party {
  constructor(name, id, monthlyCost) {
    super(name);
    this._id = id;
    this._monthlyCost = monthlyCost;
  }
  get monthlyCost() { return this._monthlyCost; }
  get id() { return this._id; }
}

class Department extends Party {
  constructor(name, staff) {
    super(name);
    this._staff = staff;
  }
  get staff() { return this._staff.slice(); }
  get monthlyCost() {
    return this.staff
      .map(e => e.monthlyCost)
      .reduce((sum, cost) => sum + cost);
  }
  get headCount() {
    return this.staff.length;
  }
}
```

<br>

### 12.9 계층 합치기
```js
// AS-IS
class Employee {...}
class SalesPerson extends Employee {...}

// TO-BE
class Employee {...}
```

<br>

### 12.9.1 설명
- 클래스 계층구조를 만들고 시간이 지나다 보면 자식클래스와 부모클래스가 거의 같아서 상속이 필요없는 경우도 생긴다. 둘을 하나로 합치면 된다.

<br>

### 12.9.2 절차
1. 두 클래스 중 제거할 것을 고른다(이름이 좋은걸로)
2. 필드/메서드 올리기/내리기를 적용해서 모든 요소를 하나의 클래스로 합친다.
3. 제거할 클래스를 참조하던 모든 코드를 남겨질 클래스를 참조하도록 바꾼다.
4. 빈 클래스를 제거한다.
5. 테스트한다.

<br>

### 12.10 🔥 서브클래스를 위임으로 바꾸기
```js
// AS-IS
class Order {
  get daysToShip() {
    return this._warehouse.daysToShip;
  }
}
class PriorityOrder extends Order {
  get daysToShip() {
    return this._priorityPlan.daysToShip;
  }
}

// TO-BE
class Order {
  get daysToShip() {
    return (this._priorityDelegate)
      ? this._priorityDelegate.daysToShip
      : this._warehouse.daysToShip;
  }
}
class PriorityDelegate {
  get daysToShip() {
    return this._priorityPlan.daysToShip;
  }
}
```

<br>

### 12.10.1 설명
> 거의 같은 디자인 패턴 : [Strategy Pattern](https://gmlwjd9405.github.io/2018/07/06/strategy-pattern.html) => `Delegate` 객체 만들어서 위임하듯이 `Strategy` 객체를 만들어서 동작을 위임한다.


- 공통 데이터와 동작을 슈퍼클래으세 모으는 `상속`에는 단점이 있다. 한 번만 쓸 수 있다는 것이다.
  - 무언가가 달라지는 이유가(type code, subclass)여러개여도 그중 단 하나의 이유만 선택해 기준을 삼아야 한다. (ex 사람 객체를 '나이대'와 '소득 수준'에 따라 나누고싶다면 서브클래스는 젊은이와 어르신이 되거나 부자와 서민이 되어야 한다. ***둘 다가 안된다!***)
  - 또, 상속은 클래스들의 관계를 아주 강하게 결합한다. 
    - 부모 수정시 자식의 기능이 바뀔수있다. 따라서 자식이 부모를 어떻게 상속해서 쓰는지 잘 이해하고 변경해야만 한다. 이 클래스들의 개발 주체가 다르다면?

- `위임(delegate)`는 이 문제를 모두 해결해준다. ***상속보다 결합도가 훨씬 약하다.*** 
- "(클래스) 상속보다는 (객체) 컴포지션을 사용하라!" 라는 말이 있다. composition은 위임과 같은 말이다. 상속을 쓰면 안된다는 말은 아니고, ***'상속으로 접근하다가 문제가 생기면 위임으로 갈아타라'***는 말이다.
- 서브클래스를 위임으로 바꾸는 모든 경우 **위임을 계층구조로 설계할 필요는 없다.** 하지만 위임에 계층구조를 쓰면 유용할 때가 많다.

<br>

### 12.10.2 절차
1. 생성자를 호출하는 곳이 많다면 `생성자를 팩터리 함수로 바꾼다.(11.8)`
2. 위임으로 활용할 빈 클래스를 만든다. ***이 클래스의 생성자는 서브클래스에 특화된 데이터를 전부 받아야 하며, 보통은 슈퍼클래스를 가리키는 `역참조(back reference)`도 필요하다.***
3. 위임을 저장할 필드를 슈퍼클래스에 추가한다.
4. 서브클래스 생성 코드를 수정하여 위임 인스턴스를 생성하고 위임 필드에 대입해 초기화한다.
  - 보통 이건 팩터리 함수에서 한다. 서브클래스가 생성할 위임 인스턴스가 명확하다면 생성자 내부에서 해도 된다.
5. 서브클래스의 메서드 중 위임 클래스로 이동할 것을 고른다.
6. `함수 옮기기(8.1)`를 적용해 위임 클래스로 옮긴다. 원래 메서드에서 위임하는 코든는 냅둔다.
  - 이 메서드가 사용하는 원소 중 위임으로 옴ㄹ겨야 하는게 있으면 함께 옮긴다.

7. 서브클래스 외부에도 원래 메서드를 호출하는 코드(method overriding 한거라면..)가 있다면 서브클래스의 위임 코드를 슈퍼클래스로 옮긴다. 이 때 위임이 존재하는지 검사하는 보호코드로 감싸야 한다. 호출하는 외부 코드가 없으면 원래 메서드는 죽은 코드이므로 제거한다.
8. 테스트
9. 서브클래스의 모든 메서드가 옮겨질 때까지 5~8 반복한다.
10. 서브클래스들의 생성자를 호출하는 코드를 찾아서 슈퍼클래스의 생성자를 사용하도록 수정한다.
11. 테스트
12. 서브클래스를 삭제한다.

<br>

### 12.10.3 예시
1. 서브클래스가 하나일 때, 위임에 계층구조가 필요없다
- 공연에 대해 일반 예약(`Booking`)과 돈을 더 내는 프리미엄 예약(`PremiumBooking`)이 있다. 상속 구조를 가진다.
```js
class Booking {
  constructor(show, date) {
    this._show = show;
    this._date = date;
  }

  get hasTalkback() {
    return this._show.hasOwnProperty('talkback') && !this.isPeakDay;
  }
  get basePrice() {
    let result = this._show.price;
    if(this.isPeakDay) result += Math.round(result * 0.15);
    return result;
  }
}

class PremiumBooking extends Booking {
  constructor(show, date, extras) {
    super(show, date);
    this._extras = extras;
  }

  get hasTalkback() { // 구현이 다름
    return this._show.hasOwnProperty('talkback');
  }
  get basePrice() { // super 클래스 참조해서 새로운 구현
    return Math.round(super.basePrice + this._extras.premiumFee);
  }
  get hasDinner() {// 프리미엄만 제공하는 기능
    return this._extras.hasOwnProperty('dinner') && !this.isPeakDay;
  }
}

// 클라이언트
aBooking = new Booking(show, date);
aBooking = new PremiumBooking(show, date, extras);
```
- 예약 객체들이 상속으로 잘 구현되었다. 지금은 문제가 없지만 아래와 같은 경우 문제가 생길 수 있다.
  - 상속을 사용해야 할 다른 이유가 생길 경우(서브클래스로 나누려는 새로운 기준의 대두)
  - `Booking` <-> `PremiumBooking`의 동적으로 전환해야 하는 경우( `aBooking.bePremium()` 같은 방식으로 바꾸고 싶다)
    - 완전히 새로운 인스턴스를 생성하는 방식으로도 할 수 있지만, 데이터 구조를 수정해야 하는 경우도 발생하기 마련이다.
- 대충 이런경우에 서브클래스를 위임으로 바꾸면 좋다
- 1: 생성자를 팩터리 함수로 바꾼다.
```js
function createBooking(show, date) {
  return new Booking(show, date);
}

function createPremiumBookin(show, date, extras) {
  return new PremiumBooking(show, date, extras); 
}
// 클라이언트
aBooking = createBooking(show, date);
aBooking = createPremiumBookin(show, date, extras);
```
- 2: 위임 클래스를 만든다. 서브클래스가 사용하던 매개변수와 예약 객체로의 역참조를 매개변수로 받는다
```js
class PremiumBookingDelegate {
  constructor(hostBooking, extras) {
    this._host = hostBooking;
    this._extras = extras;
  }
}
```
- 3,4: 새로운 위임을 예약 객체와 연결한다. 프리미엄 예약을 생성하는 팩터리함수를 수정해야 한다.
```js
class Booking {
  _bePremium(extras) {
    this._premiumDelegate = new PremiumBookingDelegate(this, extras);
  }
}
function createPremiumBookin(show, date, extras) {
  const result = new PremiumBooking(show, date, extras); 
  result._bePremium(extras);
  return result;
}
```
- `_bePremium()`으로 _를 붙임으로서 이 메서드가 나중에 Booking의 공개 인터페이스가 되면 안된다는 의도를 밝힌다. 만약 리팩터링의 목적이 일반 예약과 프리미엄 예약을 동적으로 변환할 수 있게 하는거라면 이 메서드는  public이어도 된다.

<br>

- 5: 기능을 옮긴다. 쉬운 순서대로 한다. 먼저 `hasTalkback()`이다. 
  - 6: `함수 옮기기(8.1)`를 이용해 메서드를 위임으로 옮기고 슈퍼클래스의 데이터를 참조하는건 `_host`를 통하도록 고친다.
  - 7: 테스트하고 서브클래스의 `hasTalkback()`은 삭제한다.
  - 8: 슈퍼클래스에서 위임이 존재하면 위임을 사용하는 분배로직을 `hasTalkback()`에 추가한다.
```js
// 6
class PremiumBookingDelegate {
  get hasTalkback() {
    return this._host._show.hasOwnProperty('talkback');
  }
}

// 7 삭제..

// 8
class Booking {
  get hasTalkback() {
    return this._premiumDelegate 
      ? this._premiumDelegate.hasTalkback 
      : this._show.hasOwnProperty('talkback') && !this.isPeakDay;
  }
}
```

<br>

- 5: 다음으로 `basePrice()`다. `super`를 호출하는 부분이 다르다. 앞선 `hasTalback()`과 같이 `this._host.basePrice`를 호출하는 식으로 바뀌면 무한 재귀에 빠진다.아래와 같은 선택지가 있다.
  - 슈퍼클래스의 계산 로직을 `함수로 추출(6.4)`하여, ***가격 계산과 분배 로직을 분리하는 방식***
    ```js
    class Booking {
      get basePrice() { // 위임로직
        return this._premiumDelegate
          ? this._premiumDelegate.basePrice 
          : this._privateBasePrice;
      }
      
      get _privateBasePrice() { // basePrice 계산 로직
        let result = this._show.price;
        if(this.isPeakDay) result += Math.round(result * 0.15);
        return result;
      }
    }

    class PremiumBookingDelegate {
      get basePrice() {
        return Math.round(this._host._privateBasePrice + this._extras.premiumFee);
      }
    }
    ```
  - ***위임의 메서드를 기반 메서드의 확장 형태로 재호출***
    ```js
    class Booking {
      get basePrice() {
        let result = this._show.price;
        if(this.isPeakDay) result += Math.round(result * 0.15);
        return this._premiumDelegate 
          ? this._premiumDelegate.extendBasePrice(result)
          : result;
      }
    }

    class PremiumBookingDelegate {
      extendBasePrice(base) { // 기반 메서드의 확장 형태!
        return Math.round(base + this._extras.premiumFee);
      }
    }
    ```
  - 둘 다 상관없으나, 저자는 코드가 짧다는 이유로 후자를 선호한다고 한다.(메서드 수가 적다!)

<br>

- 5: 마지막으로 서브클래스에만 존재하는 메서드 `hasDinner()`를 옮긴다.
  - 수퍼클래스(Booking)에는 `hasDinner()`은 없던 메서드이기 때문에 구현해줘야 한다.
  - 위임이 없을 경우 undefined를 반환한다. 다른 객체지향 언어라면 에러를 던졌을 테지만, ***js에서는 존재하지 않는 속성에 접근하면 `undefined`를 반환하는게 기본동작이기 때문에 이걸 따른다.***
```js
class Booking {
  get hasDinner() {
    return this._premiumDelegate
      ? this._premiumDelegate.hasDinner
      : undefined;
  }
}

class PremiumBookingDelegate {
  get hasDinner() {
    return this._extras.hasOwnProperty('dinner') && !this.isPeakDay;
  }
}
```
- 10~12: 서브클래스의 동작을 모두 옮겼기 때문에 팩터리 메서드가 슈퍼클래스를 반환하도록 하고, 테스트 후 서브클래스는 삭제한다!
```js
function createPremiumBookin(show, date, extras) {
  const result = new Booking(show, date); 
  result._bePremium(extras);
  return result;
}
```
- 코드가 좀 복잡해진것처럼 보일 수도 있으나, **예약을 동적으로 프리미엄 예약으로 바꿀 수 있고, 상속은 다른 목적으로 사용할 수 있게 되었다는 장점을 얻었다.**

<br>

2. 서브클래스가 여러 개일 때(위임에 계층구조 적용)
```js
function createBird(data) {
  switch (data.type) {
    case '유럽 제비':
      return new EuropeanSwallow(data);
    case '아프리카 제비':
      return new AfricanSwallow(data);
    case '노르웨이 파랑 앵무':
      return new NorwegianBlueParrot(data);
    default:
      return new Bird(data);
  }
}

class Bird {
  constructor(data) {
    this._name = data.name;
    this._plumage = data.plumage;
  }
  get name() {return this._name;}
  get plumage() {
    return this._plumage || '보통이다';
  }
  get airSpeedVelocity() {return null;}
}
class EuropeanSwallow extends Bird {
  get airSpeedVelocity() {return 35;}
}
class AfricanSwallow extends Bird {
  constructor(data) {
    super(data);
    this._numberOfCoconuts = data.numberOfCoconuts;
  }
  get airSpeedVelocity() {
    return 40 - 2 * this.numberOfCoconuts;
  }
}
class NorwegianBlueParrot extends Bird {
  constructor(data) {
    super(data);
    this._voltage = data.voltage;
    this._isNailed = data.isNailed;
  }
  get plumage() {
    if(this._voltage > 100) return '그을렸다';
    else return this._plumage || '예쁘다';
  }
  get airSpeedVelocity() {
    return (this._isNailed) ? 0 : 10 + this._voltage / 10;
  }
}
```
- 조류 객체는 종으로 서브클래싱 되어있다. 이 코드를 야생조류(`WildBird`)와 사육조류(`CaptivityBird`)로 구분지어 서브클래싱 하기 위해 크게 수정될 예정이다. ***상속은 한번 만 쓸 수 있기 때문에, 현재의 종에 따른 분류를 포기해야 한다.*** 상속을 위임으로 바꿔야 한다.

<br>

- 간단한 것 부터 하나씩 진행한다. `EuropeanSwallow`가 제일 쉽다.
  - 2: 위임 객체(`EuropeanSwallowDelegate`)를 만들고
  - 3,4: 위임 필드를 슈퍼클래스에 저장하는 코드를 추가하고(여기선 생성자에서 `selectSpeciesDelegate()`를 통해 한다.)
  - 5,6: 서브클래스 메서드를 위임에 옮긴다. 
  - 10~12: 서브클래스 생성자 호출을 슈퍼클래스 생성자 호출로 바꾸고 서브클래스 제거한다.
  - 슈퍼클래스 참조도 없는 간단한거라 한번에 한다.
```js
class Bird {
  constructor(data) {
    this._name = data.name;
    this._plumage = data.plumage;
    this._speciesDelegate = this.selectSpeciesDelegate(data); // 4
  }
  selectSpeciesDelegate(data) { // 3
    switch(data.type) {
      case '유럽 제비':
        return new EuropeanSwallowDelegate();
      default: return null;
    }
  }
  get airSpeedVelocity() {
    return this._speciesDelegate ? this._speciesDelegate.airSpeedVelocity : null;
  }
}

class EuropeanSwallowDelegate { // 2
  get airSpeedVelocity() {return 35;} // 5~6
}

// EuropeanSwallow 클래스는 제거 ( 10~12 )
function createBird(data) {
  switch (data.type) {
    case '아프리카 제비':
      return new AfricanSwallow(data);
    case '노르웨이 파랑 앵무':
      return new NorwegianBlueParrot(data);
    default:
      return new Bird(data);
  }
}
```

<br>

- 다음으로 `AfricanSwallow` 차례다
  - 차이로는 서브클래스에서만 가지고 있던 데이터(`numberOfCoconuts`)를 위임에서도 쓸 수 있게 생성자로 전달한다는 점이다.
```js
class Bird {
  selectSpeciesDelegate(data) {
    switch(data.type) {
      case '유럽 제비':
        return new EuropeanSwallowDelegate();
      case '아프리카 제비':
          return new AfricanSwallowDelegate(data);  // 3
      default: return null;
    }
  }
}
class AfricanSwallowDelegate { // 2
  // 위임의 생성자에서 서브클래스에서 참조하던 데이터(numberOfCoconuts)를 받는다.
  constructor(data) { // 5~6
    this._numberOfCoconuts = data.numberOfCoconuts;
  }
  get airSpeedVelocity() { // 5~6
    return 40 - 2 * this.numberOfCoconuts;
  }
}

// 서브클래스 제거 10~12
function createBird(data) { 
  switch (data.type) {
    case '노르웨이 파랑 앵무':
      return new NorwegianBlueParrot(data);
    default:
      return new Bird(data);
  }
}
```

<br>

- 다음은 `NorwegianBlueParrot`이다
```js
class Bird {
  selectSpeciesDelegate(data) {
    switch(data.type) {
      case '유럽 제비':
        return new EuropeanSwallowDelegate();
      case '아프리카 제비':
          return new AfricanSwallowDelegate(data);
      case '노르웨이 파랑 앵무':
          return new NorwegianBlueParrotDelegate(data, this);
      default: return null;
    }
  }
  get plumage() {
    return this._plumage || '보통이다';
  }
}
class NorwegianBlueParrot extends Bird {
  get plumage() {
    return this._speciesDelegate.plumage;
  }
}

class NorwegianBlueParrotDelegate {
  constructor(data, bird) {
    this.bird = bird; // 슈퍼클래스 역참조
    this._voltage = data.voltage;
    this._isNailed = data.isNailed;
  }
  
  get plumage() {
    if(this._voltage > 100) return '그을렸다';
    else return this._bird._plumage || '예쁘다';
  }

  get airSpeedVelocity() {
    return (this._isNailed) ? 0 : 10 + this._voltage / 10;
  }
}
```
  - 까다로운 점은 `NorwegianBlueParrot`이 오버라이드 하는 `plumage()`를 어떻게 제거할 것이냐다. 
    1. 이렇게하면 `plumage()`가 없는 Delegate에서 오류가 난다. 
        ```js
        class Bird {
          get plumage() {
            if(this._speciesDelegate)
              return this._speciesDelegate.plumage;
            else 
              return this._plumage || '보통이다';
          }
        }
        ```
    2. 위임이 `NorwegianBlueParrotDelegate` 타입 객체인지 검사하는 방식으로 처리
          ```js
          class Bird {
            get plumage() {
              if(this._speciesDelegate instanceof NorwegianBlueParrotDelegate) 
                return this._speciesDelegate.plumage;
              else 
                return this._plumage || '보통이다';
            }
          }
          ```
      - 이렇게 `instanceof NorwegianBlueParrotDelegate`로 클래스를 꼭 집어서 검사하는건 절대 좋지 않다.(악취가 난다)
    3. 기본값을 두고, `NorwegianBlueParrot`만 따로 취급하는 방법
        ```js
        class Bird {
          get plumage() {
            if(this._speciesDelegate)
              return this._speciesDelegate.plumage;
            else 
              return this._plumage || '보통이다';
          }
        }
        class EuropeanSwallowDelegate {
          get plumage() {
            return this._plumage || '보통이다';
          }
        }
        class AfricanSwallowDelegate {
          get plumage() {
            return this._plumage || '보통이다';
          }
        }
        ```
        - 기본 메서드가 여러 Delegate클래스에 중복되어야 한다. 몇몇 생성자에서 역참조 대입하는 코드도 중복될 수 있다.
      4. 이 중복을 해결하는 자연스러운 방법이 `상속`이다. 위임 객체들을 계층구조로 만든다.
          ```js
          function createBird(data) {
            return new Bird(data);
          }

          class Bird {
            constructor(data) {
              this._name = data.name;
              this._plumage = data.plumage;
              this._speciesDelegate = this.selectSpeciesDelegate(data);
            }
            selectSpeciesDelegate(data) {
              switch(data.type) {
                case '유럽 제비':
                  return new EuropeanSwallowDelegate(data, this);
                case '아프리카 제비':
                  return new AfricanSwallowDelegate(data, this);
                case '노르웨이 파랑 앵무':
                  return new NorwegianBlueParrotDelegate(data, this);
                default: 
                  return new SpeciesDelegate(data, this);
              }
            }
            get name() {return this._name;}
            get plumage() { this._speciesDelegate.plumage;}
            get airSpeedVelocity() {
              return this.this._speciesDelegate.airSpeedVelocity;
            }
          }

          class SpeciesDelegate {
            constructor(data, bird) {
              this._bird = bird;
            }
            get plumage() {
              return this._bird._plumage || '보통이다.';
            }
            get airSpeedVelocity() {
              return null;
            }
          }

          class EuropeanSwallowDelegate extends SpeciesDelegate {
            get airSpeedVelocity() {return 35;}
          }

          class AfricanSwallowDelegate extends SpeciesDelegate{
            constructor(data, bird) {
              super(data, bird)
              this._numberOfCoconuts = data.numberOfCoconuts;
            }
            get airSpeedVelocity() {
              return 40 - 2 * this.numberOfCoconuts;
            }
          }

          class NorwegianBlueParrotDelegate extends SpeciesDelegate{
            constructor(data, bird) {
              super(data, bird);
              this._voltage = data.voltage;
              this._isNailed = data.isNailed;
            }
            
            get plumage() {
              if(this._voltage > 100) return '그을렸다';
              else return super.plumage || '예쁘다';
            }

            get airSpeedVelocity() {
              return (this._isNailed) ? 0 : 10 + this._voltage / 10;
            }
          }
          ```
        - 위임 객체들이 `SpeciesDelegate`를 상속하도록 했다. 기본 동작은 모두 `SpeciesDelegate`에 넣었고 Bird에서도 `selectSpeciesDelegate`에서 기본으로 `SpeciesDelegate`를 생성하도록 했다. ***위임 객체가 무조건 있기 때문에 위임 객체 존재 여부 검사 로직도 필요가 없어졌다! 상속 구조로 기본 동작의 반복도 제거된다!*** 

<br>

- 원래의 서브클래스들을 위임 구조로 교체했지만 `SpeciesDelegate`에는 여전히 처음 구조와 매우 비슷한 계층구조가 존재한다. ***옮겨진 종 계층구조는 더 엄격하게 종과 관련된 내용만 다루게 되었다.*** 종과 관련된 내용만 위임에 남고, 종과 상관없는 공통 코드는 `Bird`와 미래의 서브클래스들에 남는다!

### 12.11 슈퍼클래스를 위임으로 바꾸기
```js
// AS-IS
class List {...}
class Stack extends List {...}

// TO-BE
class Stack {
  constructor() {
    this._storage = new List();
  }
}
class List {...}
```

<br>

### 12.11.1 설명
- 상속이 잘못 사용된 대표적인 예는 Java의 `Stack`클래스다.
  - `List`의 인터페이스는 분명 `Stack`과 차이가 있는데, `Stack`이 `List`를 상속함으로써 `List`의 모든 인터페이스가 노출된다.
- 슈퍼클래스의 모든 기능들이 서브클래스에 어울리지 않는다면, 그 기능을 상속을 통해 이용하면 안된다는 신호다!
- 제대로된 상속이라면 서브클래스의 인스턴스를 슈퍼클래스의 인스턴스로 취급할 수 있어야 한다.
- 서브클래스 방식 모델링이 합리적일 때에도 슈퍼클래스로 바꾸기도 한다.
  - 슈퍼/서브 클래스는 강결합된 상태라, 슈퍼클래스 수정시 서브클래스가 쉽게 망가지기 때문이다.
- 위임의 단점은, 사용할 호스트의 함수를 모두 전달 함수(fowarding function)으로 만들어야 한다는 것이다. 귀찮은 일이다.

<br>

### 12.11.2 절차
1. 슈퍼클래스 객체를 참조하는 필드를 서브클래스에 만든다. 이 위임 참조를 새로운 슈퍼클래스 인스턴스로 초기화한다.
2. 슈퍼클래스의 동작 각각에 대응하는 전달 함수를 서브클래스에 만든다.
3. 슈퍼클래스의 동작 모두가 전달 함수로 오버라이드 되었다면 상속 관계를 끊는다.

<br>

### 12.11.3 예시
- 고문서 도서관의 데이터 예시다.
- 고문서 두루마리(`Scroll`)과 이를 논리적으로 분류하는 카탈로그(`CatalogItem`) 클래스가 있다.두루마리는 사본이 있을수 있다.
```js
class CatalogItem {
  constructor(id, title, tags) {
    this._id = id;
    this._title = title;
    this._tags = tags;
  }
  get id() { return this._id; }
  get title() { return this._title; }
  hasTag(arg) { return this._tags.includes(arg); }
}

class Scroll extends CatalogItem {
  constructor(id, title, tags, dateLastCleaned) {
    super(id, title, tags);
    this._lastCleaned = dateLastCleaned;
  }
  needsCleaning(targetDate) {
    const threshold = this.hasTag('revered') ? 700 : 1500;
    return this.daysSinceLastCleaning(targetDate) > threshold;
  }
  daysSinceLastCleaning(targetDate) {
    return this._lastCleaned.until(targetDate, ChronoUnit.DAYS);
  }
}
```
- 모델링에서 실수는, Scroll과 CatalogItem에 차이가 있다는 것이다. 스크롤 사본이 여러개임에도 카탈로그 아이템은 하나뿐인 경우다. (왜 문젠지 아직 이해는 안간다..)
- 위임으로 변경한다.
```js
class Scroll {
  constructor(id, title, tags, dateLastCleaned) {
    this._catalogItem = new CatalogItem(id, title, tags); // 위임 참조 추가
    this._lastCleaned = dateLastCleaned;
  }
  
  ...

  // forwarding functions 추가..
  get id() { return this._catalogItem._id; } 
  get title() { return this._catalogItem._title; }
  hasTag(arg) { return this._catalogItem._tags.includes(arg); }
}
```
- 더 개선할 점이 있다. Scroll은 CatalogItem의 고유 인스턴스를 하나식 갖게 되었다. 하지만 더 나은 모델이 있다. 사본 Scroll이 모두 하나의 CatalogItem을 참조하게 하는 것이다. `값을 참조로 바꾸기(9.5)`를 적용한다는 것이다. (상속에서 위임으로 바꾼 원인을 다시 깨는 이유는 나도 이해가 안간다. 그냥 예제로 이해한다.)
- 고려해야할 점은 CatalogItem이 Scroll의 id를 사용하고 있다는 점이다. 이부분을 고려해서 리팩터링 해보면 아래와 같다.
```js
class Scroll {
  constructor(id, dateLastCleaned, catalogID, catalog) {
    this._id = id;
    this._catalogItem = catalog.get(catalogID);
    this._lastCleaned = dateLastCleaned;
  }
  ...
}
```
- Scroll 생성자에 넘겨준 id는 Scroll의 id다. 나머지 CatalogItem 관련인자는 제거하고, 새로운 catalogID, catalog(레포지토리 같은 객체인듯)인자를 전달해서 CatalogItem 인스턴스를 가져온다.

<br>

