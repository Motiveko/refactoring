# Refactoring 2판
## 학습방법
- 리팩토링 책을 따라서 코드 작성 - 리팩토링 - 커밋(코드와 함께 리팩토링한 내용을 Readme 추가)

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
_ 