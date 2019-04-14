package util

import "fmt"

func WrapError(in string, err error) error {
	return fmt.Errorf("%s > %s", in, err.Error())
}
