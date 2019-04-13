## AWS에서 Serverless Express서버 배포하기

Amplify를 통해서 간단하고 빠르게 Serverless Express환경을 배포할 수 있습니다.<br>
Amplify는 AWS 관련 서비스 설정을 도와줍니다.<br>

### 사용되는 AWS 서비스

**CloudFormation** : 서비스들을 Stack으로 일괄적으로 관리 <br>
**S3** : Lambda에서 실행될 코드를 업로드 <br>
**Lambda** : Serverless 환경에서 코드를 실행 <br>
**API Gateway** : Request를 받고 Lambda 함수를 실행

- Amplify CLI 설치

```
$ npm install -g @aws-amplify/cli

$ amplify configure
```

- Amplify 초기화

용도에 맞게 아래의 설정을 변경하세요 <br>
프로젝트 이름 : amplifyexpresslambda <br>
개발 환경 : dev <br>
IDE : Visual Studio Code <br>

```
$ amplify init

? Enter a name for the project > amplifyexpresslambda
? Enter a name for the environment > dev
? Choose your default editor: > Visual Studio Code
? Choose the type of app that you're building > javascript
Please tell us about your project
? What javascript framework are you using > react
? Source Directory Path:  > src
? Distribution Directory Path: > build
? Build Command: > npm.cmd run-script build
? Start Command: > npm.cmd run-script start
```

- Amplify api 기능 추가

```
$ amplify add api

? Please select from one of the below mentioned services REST
? Provide a friendly name for your resource to be used as a label for this category in the project: amplifyexpress
? Provide a path (e.g., /items) /api
? Choose a Lambda source Create a new Lambda function
? Provide a friendly name for your resource to be used as a label for this category in the project: amplifyexpress
? Provide the AWS Lambda function name: amplifyexpress
? Choose the function template that you want to use: Serverless express function (Integration with Amazon API Gateway)
? Do you want to edit the local lambda function now? No
Succesfully added the Lambda function locally
? Restrict API access No
? Do you want to add another path? No
Successfully added resource amplifyexpress locally
```

- Amplify 설정을 AWS에 배포

```
$ amplify push
```

위의 명령어로 AWS에서 배포된 서비스들을 확인하실 수 있습니다. <br>
CloudFormation에 amplifyexpresslambda 관련 Stack <br>
Lambda에서 amplifyexpress-dev 함수 <br>
S3에 amplifyexpresslambda-deploy

- Express 개발

**/amplify/backend/function/amplifyexpress/src/app.js** 파일에 <br>
express 서버 코드가 생성됩니다.

- 변경사항 배포

```
amplify push
```

- 테스트

```
amplify function invoke amplifyexpress
```

초기에 생성되는 localhost:3000/api 경로를 통해서 로컬환경에서 테스트를 할 수 있습니다
