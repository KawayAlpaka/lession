package intersect

func intersect(nums1 []int, nums2 []int) []int {
	var r []int
	for i := 0; i < len(nums1); i++ {
		var f = false
		for j := 0; j < len(nums2); j++ {
			if len(nums1) == 0 || len(nums2) == 0 {
				return r
			}
			if nums1[i] == nums2[j] {
				r = append(r, nums1[i])
				nums1 = append(nums1[:i], nums1[i+1:]...)
				nums2 = append(nums2[:j], nums2[j+1:]...)
				j--
				f = true
			}
			if len(nums1) <= i {
				return r
			}
		}
		if f {
			i--
		}
	}
	return r
}
