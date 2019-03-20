from matrix.Matrix import Matrix
from vector.Vector import Vector

if __name__ == "__main__":

    matrix = Matrix([[1, 2], [3, 4]])
    print(matrix)
    print("matrix.shape = {}".format(matrix.shape()))
    print("matrix.size = {}".format(matrix.size()))
    print("len(matrix) = {}".format(len(matrix)))
    print("matrix[0][1] = {}".format(matrix[0, 1]))
    print("matrix.row_vector(0) = {}".format(matrix.row_vector(0)))
    print("matrix.col_vector(1) = {}".format(matrix.col_vector(1)))

    matrix2 = Matrix([[5, 6], [7, 8]])
    matrix22 = Matrix([[5, 6], [7, 8]])
    print(matrix2)
    print("matrix eq matrix2:{}".format(matrix == matrix2))
    print("matrix2 eq matrix22:{}".format(matrix2 == matrix22))

    print("add matrix + matrix2:\n{}".format(matrix + matrix2))
    print("subtract matrix - matrix2: \n{}".format(matrix - matrix2))
    print("scalar-mul 2 * matrix:\n{}".format(2 * matrix))
    print("scalar-mul matrix * 2:\n{}".format(matrix * 2))
    print("Matrix.zero(2, 3):\n{}".format(Matrix.zero(2, 3)))

    T = Matrix([[1.5, 0], [0, 2]])
    p = Vector([5, 3])
    print("T.dot(p) = \n{}".format(T.dot(p)))

    P = Matrix([[0, 4, 5], [0, 0, 3]])
    print("T.dot(P) = \n{}".format(T.dot(P)))

    print("A.dot(B) = \n{}".format(matrix.dot(matrix2)))
    print("B.dot(A) = \n{}".format(matrix2.dot(matrix)))

    print("P.T = \n{}".format(P.T()))

    I = Matrix.identity(2)
    print(I)
    print("A.dot(I) = \n{}".format(matrix.dot(I)))
    print("I.dot(A) = \n{}".format(I.dot(matrix)))