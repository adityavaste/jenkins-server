pipeline {
    agent any
    
    environment {
        ACCOUNT_ID ="900840136675"
        IMAGE_NAME = "cloudtech"
        IMAGE_TAG = "${BUILD_NUMBER}"
    }
    
    stages {

        stage('Checkout Git') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/adityavaste/jenkins-server.git'
            }
        }

        stage('Verify Repository') {
            steps {
                sh 'pwd'
                sh 'ls -la'
                sh 'git branch'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'node -v'
                sh 'npm -v'
                sh 'npm install'
            }
        }

        stage('Build Application') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Trivy Scan') {
            steps {
                sh 'trivy fs --format json -o trivy-report.json .'
            }
        }

        stage('docker build') {
            steps {
                sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
            }
        }

        stage('Trivy Image Scan') {
            steps {
                sh '''
        trivy image \
        --format json \
        -o trivy-image-report.json \
        ${IMAGE_NAME}:${IMAGE_TAG}
        '''
    }
}

        stage('Push Image to ECR') {
            steps {
        withCredentials([[ $class: 'AmazonWebServicesCredentialsBinding',
            credentialsId: '04d8c364-cb1e-49e2-9923-bdf192261ae3']]) {

            sh '''
            aws ecr get-login-password --region ap-south-1 | \
            docker login --username AWS \
            --password-stdin ${ACCOUNT_ID}.dkr.ecr.ap-south-1.amazonaws.com

            docker tag ${IMAGE_NAME}:${IMAGE_TAG} \
            ${ACCOUNT_ID}.dkr.ecr.ap-south-1.amazonaws.com/cloudtech:${IMAGE_TAG}

            docker push \
            ${ACCOUNT_ID}.dkr.ecr.ap-south-1.amazonaws.com/cloudtech:${IMAGE_TAG}
            '''
        }
    }
}

    }

    post {
        always {
           archiveArtifacts artifacts: '*.json', fingerprint: true
        }
    }

        
}