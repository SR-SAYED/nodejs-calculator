pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/your-repo/nodejs-calculator.git'  // Replace with your repo URL
            }
        }
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("yourdockerhub/nodejs-calculator")
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-hub-credentials') {
                        dockerImage.push("latest")
                    }
                }
            }
        }
    }
}
