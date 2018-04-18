package rotate

import "fmt"

func rotate(matrix [][]int) {
	l1 := len(matrix)
	// var _matrix [][]int
	// //克隆一个二维数组
	// for i := 0; i < l1; i++ {
	// 	l2 := len(matrix[i])
	// 	var _a []int
	// 	for j := 0; j < l2; j++ {
	// 		_a = append(_a, matrix[i][j])
	// 	}
	// 	_matrix = append(_matrix, _a)
	// }
	// fmt.Printf("%v \n", _matrix)

	//第一步-转置
	for i := 0; i < l1; i++ {
		l2 := len(matrix[i])
		for j := i; j < l2; j++ {
			_t := matrix[i][j]
			matrix[i][j] = matrix[j][i]
			matrix[j][i] = _t
		}
	}
	// fmt.Printf("%v \n", matrix)
	// //第二步-行互换（逆时针90度的方案）
	// for i := 0; i < l1/2; i++ {
	// 	fmt.Printf("i:%d \n", i)
	// 	_t := matrix[i]
	// 	matrix[i] = matrix[l1-1-i]
	// 	matrix[l1-1-i] = _t
	// }

	//第二步-列互换（顺时针90度的方案）
	for i := 0; i < l1; i++ {
		l2 := len(matrix[i])
		for j := 0; j < l2/2; j++ {
			_t := matrix[i][j]
			matrix[i][j] = matrix[i][l2-1-j]
			matrix[i][l2-1-j] = _t
		}

	}
	// fmt.Printf("%v \n", matrix)
}

func productExceptSelf(nums []int) []int {
	l1 := len(nums)
	output := make([]int, l1)
	for i := 0; i < l1; i++ {
		s := 1
		for j := 0; j < l1; j++ {
			if i != j {
				s = s * nums[j]
			}
		}
		output[i] = s
	}
	return output
}
