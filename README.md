# todo-service

할일 관리에 대한 기능을 제공합니다.

# Stack

1. node:v14.16.1
1. vscode
1. nest.js

# 환경 변수

## Local 환경

| Variable           | dev | qa/prod | Usage                                                           | Default   | Example   |
| ------------------ | :-: | :-----: | --------------------------------------------------------------- | --------- | --------- |
| DB_MASTER_HOST     |  ✔  |    ✖    | `DB 연결을 위한 주소로 MASTER 환경에서` 사용되는 값입니다.      | localhost | localhost |
| DB_MASTER_PORT     |  ✔  |    ✖    | `DB 연결을 위한 포트 번호로 MASTER 환경에서` 사용되는 값입니다. | 3306      | 3306      |
| DB_MASTER_USERNAME |  ✔  |    ✖    | `DB 계정명으로 MASTER 환경에서` 사용되는 값입니다.              | root      | root      |
| DB_MASTER_PASSWORD |  ✔  |    ✖    | `DB 계정의 비밀번호로 MASTER 환경에서` 사용되는 값입니다.       | example   | example   |
| DB_MASTER_DATABASE |  ✔  |    ✖    | `연결을 할 DB명으로 MASTER 환경에서` 사용되는 값입니다.         | belf      | belf      |
| DB_SLAVE_HOST      |  ✔  |    ✖    | `DB 연결을 위한 주소로 SLAVE 환경에서` 사용되는 값입니다.       | localhost | localhost |
| DB_SLAVE_PORT      |  ✔  |    ✖    | `DB 연결을 위한 포트 번호로 SLAVE 환경에서` 사용되는 값입니다.  | 3306      | 3306      |
| DB_SLAVE_USERNAME  |  ✔  |    ✖    | `DB 계정명으로 SLAVE 환경에서` 사용되는 값입니다.               | root      | root      |
| DB_SLAVE_PASSWORD  |  ✔  |    ✖    | `DB 계정의 비밀번호로 SLAVE 환경에서` 사용되는 값입니다.        | example   | example   |
| DB_SLAVE_DATABASE  |  ✔  |    ✖    | `연결을 할 DB명으로 SLAVE 환경에서` 사용되는 값입니다.          | belf      | belf      |

# History

## 프로젝트 생성 방법

공식도구인 `@nestjs/cli` 를 사용했습니다.

```shell
nest new api-gateway
```

## pipeline

### origin인 `front-server` 와 다른점

내부망에서 돌기 때문에 아래의 선언이 삭제되었습니다.  
즉, `ingress-basic` ns와 관련있는 리소스가 남아있으면 안됩니다.

1. `.github.workflows` 디렉터리의 `aks apply service for ingress` 삭제
1. `k8s` 디렉터리의 `-external.yaml` 시리즈 리소스 삭제
