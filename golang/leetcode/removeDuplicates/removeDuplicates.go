package main

import (
	"fmt"
)

func removeDuplicates(nums []int) int {
	var j = 0
	for i := 1; i < len(nums); i++ {
		if nums[j] == nums[i] {
			nums = append(nums[:i], nums[i+1:]...)
			i--
		} else {
			j++
		}
	}
	return len(nums)
}

func main() {
	nums := []int{0, 0, 1, 1, 1, 2, 2, 3, 3, 4}
	len := removeDuplicates(nums)
	fmt.Println(nums)
	fmt.Println(len)
}
