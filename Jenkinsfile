pipeline{
  agent any

    stages {
        stage ('checkout git'){
            steps {
            git branch: 'main',
                url: 'https://github.com/adityavaste/jenkins-server.git'
        }
    }
    }
}