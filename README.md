# todo-service

할일 관리에 대한 기능을 제공합니다.

# Stack

1. node:v14.16.1

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
