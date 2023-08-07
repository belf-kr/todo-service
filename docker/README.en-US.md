# MySQL

[한국어(KR)](./README.md) | [`English`](./README.en-US.md)

It is a DBMS used by physical services, QA test servers, and local test environments, and it is product from the Oracle.

Provides instructions for configuring MySQL using Docker for local, fast DB environment configuration.

## Docker installation

Anyone who has preconfigured their `Docker` environment on their development PC may skip that section.

### Mac OS

It is recommended to install through the `brew` package manager.

```shell
brew install docker
```

### Windows OS

It is recommended that you configure the `Docker` environment in the `wsl` environment and then use the Docker Desktop program to interlock it.

### Linux

[Official Docker Homepage](https://docs.docker.com/engine/install/) recommends that you follow the instructions for each distribution.

## Build MySQL Docker image

We need a Docker image to operate the `Docker container`.

At this point, the existing `Docker image` is not uploaded to a repository such as Github, so you need to create it in your own development environment.

### How to build Docker image (MySQL)

Go to the **docker/mysql/master** directory inside the **root** directory of the project and enter the command below to build the `Docker image`.

```shell
docker build -t belf-todo-service-db .
```

The above command means creating a `Docker image` named belf-todo-service-db using the Dockerfile file.

If `Docker image` is successfully created, inputting the command below will output the information related to `Docker image` as shown below.

```shell
docker images
```

![Apperence that Belf's MySQL DB Docker image was created](docker-image-list.png)

## Creating and Deleting Docker Containers

To run the generated `Docker image`, you must create a `Docker container` based on the `Docker image`.

### Creating Docker container(MySQL)

Move into the **/docker/mysql/master** directory and run the command below.

```shell
    docker-compose up -d
```

The above command means that `Docker container` is created in the background based on the file `docker-compose.yml`.

### Delete Docker container(MySQL)

Move into the **docker** directory and run the command below.

```shell
    docker-compose down
```

The above command means deleting `Docker container` based on the file `docker-compose.yml`.

### Check if Docker container is created

Enter the command below into the terminal to see the current status of the `Docker container`.

```shell
docker ps -a
```

The picture below is an example of the execution result displayed when you enter the above command.

![docker container execution status example picture](docker-container-status.png)

**Name of container**, **Docker image** used when container was created, **Time generated**, **Status**, **Port information** linked to development PC, **Name of container**, etc. are available.