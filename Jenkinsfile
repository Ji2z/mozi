pipeline {
	agent none
	options { skipDefaultCheckout(false) }
	stages {
		stage('git pull') {
			agent any
			steps {
				checkout scm
			}
		}
		stage('Docker build') {
			agent any
			steps {
				script {
                    try {
						sh 'docker build -t frontend:latest /var/jenkins_home/workspace/S05P21A603/frontend'
						sh 'docker build -t backend:latest /var/jenkins_home/workspace/S05P21A603/backend'
					}catch(e) {
                    } 
				}
			}
		}
		stage('Docker run') {
			agent any
			steps {
                // Docker에 이미 이름이 frontend, backend인 컨테이너가 있다면 stop
				sh 'docker ps -f name=frontend -q | xargs --no-run-if-empty docker container stop'
				sh 'docker ps -f name=backend -q | xargs --no-run-if-empty docker container stop'
				
                // 이름이 frontend, backend인 컨테이너 삭제 
				sh 'docker container ls -a -f name=frontend -q | xargs -r docker container rm'
				sh 'docker container ls -a -f name=backend -q | xargs -r docker container rm'
				
                // 이미지 일괄 삭제
				sh 'docker images -f dangling=true && docker rmi -f $(docker images -f dangling=true -q)' 

                // 컨테이너 실행
				sh 'docker run -d --name frontend -p 80:80 -p 443:443 frontend:latest'
				sh 'docker run -d --name backend -p 8080:8080 backend:latest'
			}
		}
	}
}