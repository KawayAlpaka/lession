

vars = [1,2,3]


def remove_one(val):
  if val in vars:
    vars.remove(val)


def update():
  # vars.clear()
  # vars.append(4)
  vars.extend([5,6])


