package plusone

func plusOne(digits []int) []int {
	l1 := len(digits)
	var r []int
	var j = 1
	for i := l1 - 1; i >= 0; i-- {
		if j > 0 {
			if digits[i] == 9 {
				r = append([]int{0}, r...)
			} else {
				r = append([]int{digits[i] + j}, r...)
				j = 0
			}
		} else {
			r = append([]int{digits[i]}, r...)
		}
	}
	if j > 0 {
		r = append([]int{1}, r...)
	}
	return r
}

func plusOne2(digits []int) []int {
	var r []int
	l1 := len(digits)
	pNum := 0
	for i := 0; i < l1; i++ {
		pNum *= 10
		pNum += digits[i]
	}
	rNum := pNum + 1
	for rNum > 0 {
		r = append([]int{rNum % 10}, r...)
		rNum = rNum / 10
	}
	return r
}
