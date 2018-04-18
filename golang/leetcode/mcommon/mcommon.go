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
