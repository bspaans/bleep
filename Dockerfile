FROM golang:1.12.1

WORKDIR /go/src/app

COPY . .

RUN apt-get update && apt-get install -y mingw-w64


ENV GO111MODULE=on
ENV CGO_ENABLED=1
ENV CC=/usr/bin/x86_64-w64-mingw32-gcc
ENV GOOS=windows
ENV CGO_LDFLAGS="-lmingw32 -lSDL2"
ENV CGO_FLAGS="-D_REENTRANT"

RUN cp -r ./dist/SDL2-2.0.9/x86_64-w64-mingw32 /usr && \
    cp -r ./dist/SDL2_mixer-2.0.4/x86_64-w64-mingw32 /usr && \ 
    go build -x main.go
