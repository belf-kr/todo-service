# todo-service

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
1. docker

## 빠른 시작

### 개발 환경

1. .env.dev 파일에 특이사항이 있는 경우 수정합니다.
1. `npm i && npm run start:dev` 명령을 이용해 todo service를 시작합니다.
1. TypeORM을 통해서 todo service에서 사용하는 MySQL Table이 정상적으로 생성 되었는지 확인합니다.

### QA/production 환경

1. README.md 파일 내 환경변수 표를 참고해 자신의 서버 환경에 알맞은 OS 환경변수를 설정합니다.
1. `npm i && npm run start:prod` 명령을 이용해서 todo service를 시작합니다.

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
