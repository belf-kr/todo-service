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

1. 환경에 맞게 환경 변수를 수정합니다.
1. mysql server를 활성화합니다.
1. `npm i && npm run start:dev` 를 이용해 nestjs를 시작합니다.

# 환경 변수

| Variable           | dev | qa/prod | Default | Example                 | Usage                                                                                                    |
| ------------------ | :-: | :-----: | :-----: | ----------------------- | -------------------------------------------------------------------------------------------------------- |
| STAGES             |  ✖  |    ✔    |   🤷‍♂️    | qa, prod                | `k8s에서` 실행 환경에 맞는 svc를 연결 및 디버깅을 위해 사용되는 값입니다.                                |
| NODE_ENV           |  ✔  |    ✔    |   🤷‍♂️    | development, production | `NodeJS 실행 환경` 을 설정하는 값 nestjs가 실행전에 값이 있어야 합니다.                                  |
| DB_MASTER_HOST     |  ✔  |    ✔    |   🤷‍♂️    | localhost               | `DB 연결을 위한 주소로 MASTER 환경에서` 사용되는 값입니다.                                               |
| DB_MASTER_PORT     |  ✔  |    ✔    |   🤷‍♂️    | 3306                    | `DB 연결을 위한 포트 번호로 MASTER 환경에서` 사용되는 값입니다.                                          |
| DB_MASTER_USERNAME |  ✔  |    ✔    |   🤷‍♂️    | root                    | `DB 계정명으로 MASTER 환경에서` 사용되는 값입니다.                                                       |
| DB_MASTER_PASSWORD |  ✔  |    ✔    |   🤷‍♂️    | example                 | `DB 계정의 비밀번호로 MASTER 환경에서` 사용되는 값입니다.                                                |
| DB_MASTER_DATABASE |  ✔  |    ✔    |   🤷‍♂️    | belf                    | `연결을 할 DB명으로 MASTER 환경에서` 사용되는 값입니다.                                                  |
| DB_SLAVE_HOST      |  ✔  |    ✔    |   🤷‍♂️    | localhost               | `DB 연결을 위한 주소로 SLAVE 환경에서` 사용되는 값입니다.                                                |
| DB_SLAVE_PORT      |  ✔  |    ✔    |   🤷‍♂️    | 3307                    | `DB 연결을 위한 포트 번호로 SLAVE 환경에서` 사용되는 값입니다.                                           |
| DB_SLAVE_USERNAME  |  ✔  |    ✔    |   🤷‍♂️    | root                    | `DB 계정명으로 SLAVE 환경에서` 사용되는 값입니다.                                                        |
| DB_SLAVE_PASSWORD  |  ✔  |    ✔    |   🤷‍♂️    | example                 | `DB 계정의 비밀번호로 SLAVE 환경에서` 사용되는 값입니다.                                                 |
| DB_SLAVE_DATABASE  |  ✔  |    ✔    |   🤷‍♂️    | belf                    | `연결을 할 DB명으로 SLAVE 환경에서` 사용되는 값입니다.                                                   |
| DB_SYNCHRONIZE     |  ✔  |    ✖    |  false  | false                   | `DB 스키마를 entity 코드와 자동 동기화(기존 스키마의 정보가 삭제됨) 할지를 물어볼 때` 사용되는 값입니다. |
