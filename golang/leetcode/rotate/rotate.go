package rotate

func rotate(nums []int, k int) {
	nlen := len(nums)
	if nlen < k {
		return
	}
	if k == 0 {
		return
	}
	_num := make([]int, nlen)
	for i := 0; i < nlen; i++ {
		_num[i] = nums[i]
	}
	for i := 0; i < nlen; i++ {
		if i >= k {
			nums[i] = _num[i-k]
		} else {
			nums[i] = _num[nlen-k+i]
		}
	}
}
