# todo-service

## 빠른 시작

### 컨테이너 생성

```
docker-compose up -d
```

위의 명령어를 입력해 docker image 생성 후 컨테이너를 생성합니다.

### 컨테이너 삭제

```
docker-compose down
```

위의 명령어를 입력해 컨테이너를 삭제합니다.

### API 요청

#### ping

http://localhost:3003/ping

## 개요

할일 관리에 대한 서비스를 제공합니다.

## 특이사항

1. MySQL Replication 환경을 지원합니다.
1. TypeORM을 사용해서 DB 조회 및 수정을 지원합니다.
1. RESTFUL 형식의 API를 제공합니다.

## Stack

1. node:v14.16.1
1. npm
1. nest.js
1. typeorm
1. mysql:5.7.16
1. vscode

## 시작하기

### 개발 환경

1. .env.dev 파일에 특이사항이 있는 경우 수정합니다.
1. VSCode 디버그 창 내부에 있는 NestJS start 버튼을 눌러 시작합니다.
1. TypeORM을 통해서 todo service에서 사용하는 MySQL Table이 정상적으로 생성 되었는지 확인합니다.

### QA/Production 환경

1. README.md 파일 내 환경변수 표를 참고해 자신의 서버 환경에 알맞은 OS 환경변수를 설정합니다.
1. `npm i && npm run start:prod` 명령을 이용해서 todo service를 시작합니다.

## TypeORM 사용해 DB Schema 동기화

### 클래스 파일 생성

![TypeORM을 사용한 클래스 파일 생성](./readme/img/create-typeorm-migration-class.png)

`npm run create-migration-dev -n 생성할_클래스_파일명` 명령어를 사용해서 동기화에 사용될 클래스 파일을 생성한다.

### 클래스 파일 구현

![MigrationInterface 구현 클래스](./readme/img/realize-interface.png)

생성된 `up`, `down` 메소드의 내부를 채워줍니다.

- up: DB Schema 동기화시 실행될 SQL
- down: DB Schema 동기화 롤백시 실행될 SQL

### DB Schema 동기화 실행

![Migration 수행](./readme/img/run-migration-command.png)

`npm run run-migrations-dev` 명령어를 실행하고, DB Schema 동기화 명령이 정상 동작 되었음을 확인합니다.

### DB Schema 동기화 취소

![Migration revert 실행](./readme/img/revert-migration-command.png)
`npm run revert-migrations-dev` 명령어를 사용해 DB Schema 동기화 명령을 취소합니다.

### 질의응답

#### QA/Prod 환경에선 DB Schema 동기화 명령어를 어떻게 샐행하나요?

- `npm run start:prod` 명령을 통해 Todo 서비스 구동전 `npm run run-migrations` 명령어가 실행됩니다. 관련 내용은 Dockerfile을 참고하세요.

#### 수행된 DB Schema 동기화 작업을 취소하거나, 특정 동기화 작업을 취소하고 싶을땐 어떻게 해야하나요?

- DB Schema 동기화 작업은 단방향적으로 진행 되어야합니다. 특정 동기화 작업을 취소하는건 불가능하거나, 가능하더라도 권장하지 않습니다.

- 새로운 DB Schema 동기화 클래스 파일을 생성후 메소드 구현을 위한 SQL을 입력하는게 가장 권장되는 방법입니다.

## 환경 변수

### 환경 변수 표 범례

| 구성 요소     | 설명                                                                          |
| ------------- | ----------------------------------------------------------------------------- |
| Variable      | 환경 변수 이름                                                                |
| dev           | 환경 변수가 개발 환경에서 사용되는지 여부                                     |
| qa/prod       | 환경 변수가 qa, production 환경에서 사용되는지 여부                           |
| Default value | 시스템 환경 변수를 사용해 환경 변수를 정하지 않았을 때 기본적으로 적용되는 값 |
| Example       | 환경 변수 값으로 들어갈 수 있는 예시의 나열                                   |
| Explanation   | 환경 변수에 대한 설명                                                         |

### 환경 변수 표

| Variable           | dev | qa/prod | Default value | Example                 | Explanation                                                                         |
| ------------------ | :-: | :-----: | :-----------: | ----------------------- | ----------------------------------------------------------------------------------- |
| NODE_ENV           | ✅  |   ✅    |               | development, production | `NodeJS 실행 환경` 을 설정하는 값으로, 미리 선언한 npm 스크립트로 값이 설정됩니다.  |
| STAGES             | 🚫  |   ✅    |               | qa, prod                | `k8s에서` 실행 환경에 맞는 svc를 연결 및 디버깅을 위해 사용되는 값입니다.           |
| SERVER_PORT        | ✅  |   ✅    |     3000      | 3000, 3003              | `HTTP listen port`를 지정하기 위해서 사용되는 값입니다.                             |
| DB_MASTER_HOST     | ✅  |   ✅    |               | localhost               | `DB 주소`로 `MASTER 환경`에서 사용되는 값입니다.                                    |
| DB_MASTER_PORT     | ✅  |   ✅    |     3306      | 3306                    | `DB port`로 `MASTER 환경`에서 사용되는 값입니다.                                    |
| DB_MASTER_USERNAME | ✅  |   ✅    |               | root                    | `DB 계정명`으로 `MASTER 환경`에서 사용되는 값입니다.                                |
| DB_MASTER_PASSWORD | ✅  |   ✅    |               | example                 | `DB 계정의 비밀번호`로 `MASTER 환경`에서 사용되는 값입니다.                         |
| DB_MASTER_DATABASE | ✅  |   ✅    |     belf      | belf                    | `DB명`으로 `MASTER 환경`에서 사용되는 값입니다.                                     |
| DB_SLAVE_HOST      | ✅  |   ✅    |               | localhost               | `DB 주소`로 `SLAVE 환경`에서 사용되는 값입니다.                                     |
| DB_SLAVE_PORT      | ✅  |   ✅    |     3306      | 3306                    | `DB port`로 `SLAVE 환경`에서 사용되는 값입니다.                                     |
| DB_SLAVE_USERNAME  | ✅  |   ✅    |               | root                    | `DB 계정명`으로 `SLAVE 환경`에서 사용되는 값입니다.                                 |
| DB_SLAVE_PASSWORD  | ✅  |   ✅    |               | example                 | `DB 계정의 비밀번호`로 `SLAVE 환경`에서 사용되는 값입니다.                          |
| DB_SLAVE_DATABASE  | ✅  |   ✅    |     belf      | belf                    | `DB명`으로 `SLAVE 환경`에서 사용되는 값입니다.                                      |
| DB_SYNCHRONIZE     | ✅  |   ✅    |     false     | true, false             | DB 스키마와 entity 코드의 `자동 동기화(기존 스키마의 정보가 삭제됨)` 설정 값입니다. |
