package movezeroes

func moveZeroes(nums []int) {
	l1 := len(nums)
	oNum := 0
	for i := 0; i < l1; i++ {
		vi := i - oNum
		if nums[vi] == 0 {
			nums = append(nums[:vi], nums[vi+1:]...)
			nums = append(nums, 0)
			oNum++
		}
	}
}
