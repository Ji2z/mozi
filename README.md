#### 특화 프로젝트

# 주제
*시각장애인을 위한 음료 구분 서비스*           
```
개요 : 캔 음료수에 있는 점자로는 시각장애인에게 충분한 정보를 제공하고 있지 않음          
서비스 : 음료 사진을 카메라로 인식하여 음료명, 제조사명, 종류 등의 정보를 제공         
확장 : 음료수를 목표로 시작하여 달성한다면 과자, 컵라면 등으로 확장
```

* * *
# Convention

### Git Convention
|이름|설명|종류|
|-----|------|---|
|feat|새로운 기능 추가|기능|
|fix||버그 수정, 기능 수정|기능|
|docs|문서 수정에 대한 커밋(READMD.md)|그 외|
|refactor|코드 리팩토링 (변수명 수정, 코드 스타일 변경 등)|개선|
|build|빌드 관련 파일 수정에 대한 커밋|그 외|
|design|CSS 등 사용자 UI 디자인 변경|기능|
|resource|이미지 리소스 등 코드와 상관없는 리소스 추가|그 외|
|test|테스트 코드, 리팩토링 테스트 코드 추가|그 외|
|delete|파일 또는 코드, 리소스 제거|그 외|
|rename|파일 혹은 폴더명을 수정하거나 옮기는 작업|그 외|
|!BREAKING CHANGE|커다란 API 변경 (API의 arguments, return 값의 변경, DB 테이블 변경, 급하게 치명적인 버그를 고쳐야 하는 경우)|기능|

### Git Branch
- master : 배포
- develop : 기능
- feature : 기능 추가 ( feature/FE-login , feature/BE-login )

### Code Convention
- 변수명 : Camel Case




