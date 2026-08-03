pipeline {
    agent any
    
    
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
                sh "docker build -t cloudtech:${Build Number} ."
            }
        }

        stage('Trivy Image Scan') {
             steps {
                sh '''
        trivy image \
          --format json \
          -o trivy-image-report.json \
          cloudtech:${BUILD_NUMBER}
        '''
    }
}
    }

    post {
        always {
           archiveArtifacts artifacts: '*.json', fingerprint: true
        }
    }

        
}