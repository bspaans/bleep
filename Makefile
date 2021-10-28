
.PHONY: go-test run record

build:
	go build -o bleep

go-test:
	go test -v ./...

run:
	go run main.go

record:
	go run main.go --record
