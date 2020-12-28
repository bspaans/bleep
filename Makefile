
.PHONY: vet go-test run record

vet:
	go vet
	golangci-lint run

go-test:
	go test -v ./...

run:
	go run main.go

record:
	go run main.go --record
