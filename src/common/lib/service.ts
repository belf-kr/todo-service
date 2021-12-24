/**
 * k8s Service Dns에 맞는 Url를 생성해주는 함수입니다.
 * (기본 스키마: "http://todo-service.qa.svc.cluster.local:3000/")
 * @param svc k8s service 이름
 * @param port k8s service 포트
 * @returns k8s service 에 연결할 수 있는 url
 */
export function K8sServiceDNS(svc: string, port: number): string {
  const nodeEnv = process.env.NODE_ENV;
  const ns = process.env.STAGES;

  if (!nodeEnv) {
    throw new Error(`NODE_ENV 환경 변수 값이 지정되지 않았습니다.`);
  }

  let url = undefined;
  switch (nodeEnv) {
    case "development":
      // TODO: 해당 주소가 사용되고 있는 주소인지 확인하는 방어코드 필요
      url = `http://localhost:${port}`;
      break;
    case "docker":
      url = `http://host.docker.internal:${port}`;
      break;
    default:
      if (!ns) {
        throw new Error(`STAGES 환경 변수 값이 지정되지 않았습니다.`);
      }
      url = `http://${svc}.${ns}.svc.cluster.local:${port}`;
      break;
  }

  console.log(`${svc} 서비스가 ${url} 주소로 바인딩에 성공하였습니다.`);
  return url;
}
