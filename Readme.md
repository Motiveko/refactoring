# Refactoring 2판
## 학습방법
- 리팩토링 책을 따라서 코드 작성 - 리팩토링 - 커밋(코드와 함께 리팩토링한 내용을 Readme 추가)

<br>

## 1. 리팩터링 첫 번째 예시
### 1.4 statement() 함수 쪼개기
- 함수 추출하기
- 함수를 추출할 땐 유효범위를 벗어나는 변수를 확인하고, 이를 매개변수로 전달한다.(IDE에서 보통 해준다)
- 매개변수의 역할이 뚜렷하지 않을 때 부정관사(a/an)을 붙인다.(performance => aPerformance)