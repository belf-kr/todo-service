# todo-service

할일 관리에 대한 서비스를 제공합니다.  
Mysql Replication 환경에 연결할 수 있도록 되어 있으며 주로 typeorm을 이용하여 데이터를 가공할 수 있도록 RESTful API를 제공합니다.

# Stack

1. node:v14.16.1
1. vscode
1. nest.js
1. typeorm
1. mysql:5.7.16
1. docker

# 빠른 시작

1. 사용할 mysql server 활성화 및 환경변수를 수정합니다.
1. `npm i && npm run start:dev` 를 이용해 nestjs를 시작합니다.

# 환경 변수

| Variable           | dev | qa/prod | Usage                                                                                                    | Default   | Example         |
| ------------------ | :-: | :-----: | -------------------------------------------------------------------------------------------------------- | --------- | --------------- |
| STAGES             |  ✔  |    ✔    | `NodeJS 실행 환경에서` 실행 환경의 구분을 위해 사용되는 값입니다.                                        | null      | local, qa, prod |
| DB_MASTER_HOST     |  ✔  |    ✔    | `DB 연결을 위한 주소로 MASTER 환경에서` 사용되는 값입니다.                                               | localhost | localhost       |
| DB_MASTER_PORT     |  ✔  |    ✔    | `DB 연결을 위한 포트 번호로 MASTER 환경에서` 사용되는 값입니다.                                          | 3306      | 3306            |
| DB_MASTER_USERNAME |  ✔  |    ✔    | `DB 계정명으로 MASTER 환경에서` 사용되는 값입니다.                                                       | root      | root            |
| DB_MASTER_PASSWORD |  ✔  |    ✔    | `DB 계정의 비밀번호로 MASTER 환경에서` 사용되는 값입니다.                                                | example   | example         |
| DB_MASTER_DATABASE |  ✔  |    ✔    | `연결을 할 DB명으로 MASTER 환경에서` 사용되는 값입니다.                                                  | belf      | belf            |
| DB_SLAVE_HOST      |  ✔  |    ✔    | `DB 연결을 위한 주소로 SLAVE 환경에서` 사용되는 값입니다.                                                | localhost | localhost       |
| DB_SLAVE_PORT      |  ✔  |    ✔    | `DB 연결을 위한 포트 번호로 SLAVE 환경에서` 사용되는 값입니다.                                           | 3306      | 3307            |
| DB_SLAVE_USERNAME  |  ✔  |    ✔    | `DB 계정명으로 SLAVE 환경에서` 사용되는 값입니다.                                                        | root      | root            |
| DB_SLAVE_PASSWORD  |  ✔  |    ✔    | `DB 계정의 비밀번호로 SLAVE 환경에서` 사용되는 값입니다.                                                 | example   | example         |
| DB_SLAVE_DATABASE  |  ✔  |    ✔    | `연결을 할 DB명으로 SLAVE 환경에서` 사용되는 값입니다.                                                   | belf      | belf            |
| DB_SYNCHRONIZE     |  ✔  |    ✖    | `DB 스키마를 entity 코드와 자동 동기화(기존 스키마의 정보가 삭제됨) 할지를 물어볼 때` 사용되는 값입니다. | false     | false, true     |
