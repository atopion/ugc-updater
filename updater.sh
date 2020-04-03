echo "Starting update script."

cd /home/$USER/UGC/UGC-repository

docker-compose -f build/tmp/docker/docker-compose.yml down

git -v pull origin master

./gradlew -v setupDockerFiles
./gradlew -v buildDocker

docker-compose -f build/tmp/docker/docker-compose.yml up -d

echo "Finished update script."