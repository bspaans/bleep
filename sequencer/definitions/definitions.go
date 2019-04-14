package definitions

import (
	"fmt"
)

func parseDuration(d interface{}, granularity int) (uint, error) {
	switch d.(type) {
	case string:
		v := d.(string)
		if v == "Whole" {
			return Whole(granularity), nil
		} else if v == "Half" {
			return Half(granularity), nil
		} else if v == "Quarter" {
			return Quarter(granularity), nil
		} else if v == "Eight" {
			return Eight(granularity), nil
		} else if v == "Sixteenth" {
			return Sixteenth(granularity), nil
		} else if v == "Thirtysecond" {
			return Thirtysecond(granularity), nil
		}
	case int:
		return uint(d.(int) * granularity), nil
	case float64:
		return uint(d.(float64) * float64(granularity)), nil
	}
	return 0, fmt.Errorf("Unknown duration type '%v'", d)
}

func Whole(granularity int) uint {
	return uint(granularity) * 4
}
func Half(granularity int) uint {
	return uint(granularity) * 2
}
func Quarter(granularity int) uint {
	return uint(granularity)
}
func Eight(granularity int) uint {
	return uint(granularity / 2)
}
func Sixteenth(granularity int) uint {
	return uint(granularity / 4)
}
func Thirtysecond(granularity int) uint {
	return uint(granularity / 8)
}
