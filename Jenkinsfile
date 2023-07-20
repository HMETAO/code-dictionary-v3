pipeline {
    agent any

    stages {
        stage('pullCode') {
            steps {
                echo 'pullCode'
                checkout([$class: 'GitSCM', branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[credentialsId: '74cf0183-bf63-42bb-aca8-b04fd564a5ae', url: 'git@gitee.com:HMETAO/code-dictionary-v3.git']]])
            }
        }

        stage('buildDockerImages & pullDockerImages') {
            steps {
                echo 'buildDockerImages'
                sh 'docker images -q "registry.cn-hangzhou.aliyuncs.com/hmetao_docker/vue-code-dictionary-v3" > /dev/null && docker rmi "registry.cn-hangzhou.aliyuncs.com/hmetao_docker/vue-code-dictionary-v3" || echo "Image registry.cn-hangzhou.aliyuncs.com/hmetao_docker/vue-code-dictionary-v3 not found. Skipping deletion."'
                sh 'docker build -t registry.cn-hangzhou.aliyuncs.com/hmetao_docker/vue-code-dictionary-v3 -f Dockerfile .'
                withCredentials([usernamePassword(credentialsId: '213b39c7-770e-4802-afc1-b769eb2dafb1', passwordVariable: 'password', usernameVariable: 'username')]) {
                    // some block
                    sh "docker login --username=${username} --password=${password} registry.cn-hangzhou.aliyuncs.com"
                    sh "docker push registry.cn-hangzhou.aliyuncs.com/hmetao_docker/vue-code-dictionary-v3"
                    echo '镜像上传成功'
                }
            }
        }
        stage("deleteBuildImages"){
            steps{
              sh 'docker ps -a | grep "Exited" | awk \'{print $1 }\' > /dev/null && docker rm $(docker ps -a | grep "Exited" | awk \'{print $1 }\') || echo \'not find none container\''
               sh 'docker images | grep "none" | awk \'{print $3}\' > /dev/null && docker rmi $(docker images | grep "none" | awk \'{print $3 }\') || echo \'not find none images\''
            }
        }
         stage('publicObject') {
            steps {
                echo 'publicObject'
                sshPublisher(publishers: [sshPublisherDesc(configName: 'master_server', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: "/opt/jenkins_shell/front/deploy-front.sh", execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
            }
        }
    }
}
