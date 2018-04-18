package mcommon

// IsEqual 对比两个整形数组是否相同
func IsEqual(nums1 []int, nums2 []int) bool {
	l1 := len(nums1)
	l2 := len(nums2)
	if l1 != l2 {
		return false
	}
	for i := 0; i < l1; i++ {
		if nums1[i] != nums2[i] {
			return false
		}
	}
	return true
}

// Is2Equal 对比两个二维整形数组是否相同
func Is2Equal(nums1 [][]int, nums2 [][]int) bool {
	l1 := len(nums1)
	l2 := len(nums2)
	if l1 != l2 {
		return false
	}
	for i := 0; i < l1; i++ {
		l11 := len(nums1[i])
		l21 := len(nums2[i])
		if l11 != l21 {
			return false
		}
		for j := 0; j < l2; j++ {
			if nums1[i][j] != nums2[i][j] {
				return false
			}
		}
	}
	return true
}
