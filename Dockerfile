FROM golang:1.12.1

WORKDIR /go/src/app

COPY . .

ENV GO111MODULE=on

RUN apt-get update && apt-get install -y mingw-w64

RUN go build
